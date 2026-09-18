// Shared LaTeX helper, built on KaTeX (loaded from a CDN, like D3 and Firebase).
//
// Any text written by the admin (question text, answer options) goes through
// here before it is displayed, so that math between $...$ or $$...$$ is
// typeset instead of shown as raw source.

// Loaded dynamically, and deliberately not awaited: if the CDN is unreachable
// (flaky lecture-hall Wi-Fi), pages keep working and simply show the LaTeX
// source instead of breaking on a failed import.
// `mathReady` settles once KaTeX is in (or has failed to come in): callers that
// need to measure typeset text can wait on it.
let renderMathInElement = null;
export const mathReady = import("https://cdn.jsdelivr.net/npm/katex@0.16/dist/contrib/auto-render.mjs")
    .then((module) => { renderMathInElement = module.default; })
    .catch((error) => console.error("KaTeX could not be loaded; showing LaTeX source instead.", error));

const katexCssUrl = "https://cdn.jsdelivr.net/npm/katex@0.16/dist/katex.min.css";

// Which delimiters count as math. Order matters: $$ must be tried before $.
const delimiters = [
    { left: "$$", right: "$$", display: true },
    { left: "\\[", right: "\\]", display: true },
    { left: "$", right: "$", display: false },
    { left: "\\(", right: "\\)", display: false }
];

// KaTeX needs its stylesheet for the fonts. Pages normally link it in <head>,
// but results.html is meant to be copy-pasted into other setups, so add it here
// too if it is missing (harmless when it is already there).
ensureKatexCss();
function ensureKatexCss() {
    if (document.querySelector('link[data-schoen-poll-katex]')) return;
    if (document.querySelector(`link[href="${katexCssUrl}"]`)) return;

    const link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = katexCssUrl;
    link.dataset.schoenPollKatex = "true";
    document.head.appendChild(link);
}

// Typeset any math already present inside an element (in place).
export function renderMath(element) {
    if (!element) return element;

    if (!renderMathInElement) {
        // Still loading: the raw text stays visible, and is typeset on arrival.
        mathReady.then(() => typeset(element));
        return element;
    }

    typeset(element);
    return element;
}

function typeset(element) {
    if (!renderMathInElement) return;
    try {
        renderMathInElement(element, { delimiters, throwOnError: false });
    } catch (error) {
        console.error("KaTeX rendering failed:", error);
    }
}

// Put text into an element and typeset its math.
// Always goes through textContent first, so the source is never treated as HTML.
export function setMathText(element, text) {
    if (!element) return element;
    element.textContent = text == null ? "" : String(text);
    return renderMath(element);
}

