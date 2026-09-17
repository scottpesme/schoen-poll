# Schoen Poll Overview

Schoen Poll is a static, Firebase-backed live polling system for lectures or presentations. Participants use a clicker page, an admin controls the poll from a remote page, and a separate results page renders live vote bubbles for projection, OBS, or embedding in a slide deck.

## Main Pages

- `index.html`: Participant clicker. Users sign in anonymously, listen to `state/live`, and submit or remove one answer per question. The question text and the answer buttons are typeset with KaTeX, so they can contain LaTeX.
- `clicker.html`: Alias that redirects to `index.html`.
- `admin.html`: Admin remote. Google-authenticated admins launch prepared questions (from `config.js`) or plain option sets, show or hide the question text on the results page, close or reopen voting, reveal or hide results, show the QR code, add private history labels, simulate votes, adjust result bubble size, and select a results-page style. It listens to `state/live`, `state/display`, `questions/{questionId}`, and `questions/{questionId}/answers`.
- `remote.html`: Alias that redirects to `admin.html`.
- `results.html`: Projector/overlay page. It loads D3, the KaTeX stylesheet, `schoen-poll.js`, and `schoen-poll.css` to render the question, the answer options, and the live results. It listens to `state/live`, `state/display`, and `questions/{questionId}/answers`.
- `history.html`: Admin-only history page. It reads past questions, shows their (typeset) question text, computes or reuses cached tallies, renders stacked result bars, lets admins edit private question labels, and can recalculate results or delete all questions from a given day. It reads `state/live`, `questions`, and each relevant `questions/{questionId}/answers` subcollection, but does not use live listeners.

## Shared Files

- `config.js`: Firebase config, clicker URL used for the QR code, result bubble colors, prepared questions, preset answer-option buttons, and named results-page styles. Each results style defines its background, label and question appearance; the first style is the fallback.
- `adminauth.js`: Shared Google admin authentication helper. It checks admin status by attempting to read the admin-only `state/display` document.
- `schoen-poll.js`: Results overlay logic. It listens to Firestore state and answers, renders the question banner, then renders a D3 force simulation of answer bubbles. Answer labels are HTML overlaid on the SVG (not SVG text), so their LaTeX can be typeset. The bubbles and the labels hide with `visibility` rather than `display`, so the SVG keeps its size for layout.
- `mathtext.js`: Shared LaTeX helper. It exposes `setMathText` and `renderMath`. Math is written between `$...$` (inline) or `$$...$$` (displayed). KaTeX is imported dynamically, so a page still works (showing the LaTeX source) if the CDN is unreachable; text set before KaTeX arrives is typeset as soon as it loads.
- `schoen-poll.css`: Styling for the results overlay, question banner, labels, QR modal, and unobtrusive login button. `#spChart` (bubbles) and `#spLabels` (options) start hidden and are shown independently by `schoen-poll.js`. Outlined text is painted in two layers (stroke underneath, fill on top), since HTML has no `paint-order`.
- `README.md`: Setup and Firebase rules documentation.

## Firestore Shape

- `state/live`
  - `active_question_id`: id of the current question document.
  - `status`: usually `open`, `closed`, or `complete`.
  - `options`: array of answer labels for the current question.
  - `question`: optional question text for the current question (absent when the admin launched a bare set of options). It may contain LaTeX. Publicly readable, so that clickers can show it.
  - `colorClickers`: optional admin-controlled boolean. When true, participant clickers color their page background according to the selected answer.
- `state/display`
  - `reveal`: whether the vote bubbles are visible. The answer options are not affected: they stay on screen for as long as the question runs.
  - `showQuestion`: whether the question text is visible on the results page. Independent of `reveal`.
  - `showQR`: whether the QR code is visible.
  - `bubbleSize`: optional multiplier for result bubbles.
  - `resultStyleId`: id of a style from `resultStyles` in `config.js`. A missing or unknown id selects the first configured style.
- `questions/{questionId}`
  - `timestamp`: creation timestamp.
  - `question`: optional question text, copied from the prepared question at launch.
  - `label`: optional private admin-facing label for history and recall.
  - `options`: answer labels for that question.
  - `finalTallies`: cached result object, when available.
  - `totalVotes`: cached total vote count, when available.
- `questions/{questionId}/answers/{userId}`
  - `choice`: selected answer label.
  - `timestamp`: server timestamp.

## Runtime Flow

1. The admin opens `admin.html` and signs in with Google.
2. `adminauth.js` verifies admin access by reading `state/display`.
3. The admin launches a prepared question (question text plus answers, from `preparedQuestions` in `config.js`), a preset set of options, or custom comma-separated options.
4. `admin.html` creates a document in `questions`, then writes the active question to `state/live`.
5. Participants open `index.html`, sign in anonymously, listen to `state/live`, and see the question text (if any) and the active options, with their LaTeX typeset.
6. Each participant writes their answer to `questions/{questionId}/answers/{userId}`.
7. `admin.html` listens to those answers for the live doughnut chart and vote count.
8. `results.html` listens to `state/live`, `state/display`, and answers. It applies the selected results style live, shows the question text while `showQuestion` is true, shows the answer options for as long as the question is running (`status` is `open` or `closed`), and adds the D3 bubbles grouped by option when `reveal` is true. Launching a prepared question turns `showQuestion` on and `reveal` off, so the question and its options go up on the screen while the votes stay hidden. No vote counts are printed: the bubbles are the result.
9. Revealing answers only changes their visibility. When the admin finishes a question, one batch clears its cached tallies, sets `state/live.status` to `complete`, and resets both `state/display.reveal` and `state/display.showQuestion` to false. Reopening or reactivating also clears cached tallies.
10. `history.html` later reads questions and answers from the server, caches tallies (including zero votes) for questions that are no longer live, and displays grouped history by day. Each day's **Recalculate results** button bypasses its cached tallies and replaces them with a fresh count of the answers. Questions with zero votes have no result card, but their day remains available for recalculation and deletion.

## Notes

- This is designed to be hosted as static files, for example through GitHub Pages.
- Firebase Authentication must allow Google sign-in for admins and anonymous sign-in for participants.
- Firestore rules are central to the design: public read access is only for `state/live`, participants can only read/write their own answer documents, and admin-only pages rely on admin access to protected documents.
- The documented rules do not enforce poll closure on answer writes. Late changes can still make cached history stale; use **Recalculate results** for the affected day. History is a snapshot and does not refresh automatically.
- The same `colors` palette from `config.js` is used by the results bubbles, the admin chart, history bars, and optional colored clicker backgrounds.
- Question text and answer options support LaTeX everywhere they are displayed (clicker buttons, results page, admin remote, history). The admin doughnut chart is drawn by Chart.js on a canvas, so its slice labels show the raw text instead.
- Results styles in `config.js` control `backgroundColor`, `labelColor`, `labelSize`, `labelOutlineColor`, `labelOutlineWidth`, `questionColor`, and `questionSize`. Bubble size remains a separate live slider setting in `state/display`.
- `results.html` is intentionally usable as an overlay source, including in OBS or embedded in presentation tooling.
