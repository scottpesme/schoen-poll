// Copy/paste info from Firebase. Make sure to keep the word "export".
export const firebaseConfig = {
  apiKey: "AIzaSyAo7wH_udIr_Px14hoJs4DnmAyerdOr7SQ",
  authDomain: "online-polls-fc050.firebaseapp.com",
  projectId: "online-polls-fc050",
  storageBucket: "online-polls-fc050.firebasestorage.app",
  messagingSenderId: "445607454235",
  appId: "1:445607454235:web:3393f299fb797d5998fabe"
};

// Specify the URL to the clicker here, for the QR code.
export const clickerUrl = "https://scottpesme.github.io/schoen-poll/";


// Custom color palette for displaying the results (bubbles)
export const colors = ["#4C72B0", "#55A868", "#8172B2", "#64B5CD", "#CCB974", "#C44E52"];
// export const colors = ["#02468E", "#007355", "#86228F", "#B88700", "#B63A4A", "#00869A"]; // goodnotes colors
// export const colors = ["#02468E", "#007355", "#86228F", "#D55E00", "#B79F00", "#4E8CFF"]; // goodnotes colors


// Questions prepared ahead of time.
// They show up at the top of the admin remote's launchpad, ready to launch.
//
// Each entry accepts:
//   question: the text shown on the results page and on the clickers (optional),
//   options:  the answer buttons (required),
//   label:    a private label for the history page (optional; defaults to the question).
//
// Both `question` and `options` support LaTeX: write inline math between $...$
// and displayed math between $$...$$. Use String.raw`...` (as below) so that
// backslashes do not need to be escaped; with ordinary quotes, write "\\pi".
export const preparedQuestions = [
    {
        question: String.raw`Is $\sum_{n=1}^{\infty} \frac{1}{n}$ convergent?`,
        options: ['Yes', 'No', 'Unsure'],
        label: "Harmonic series"
    },
    {
        question: String.raw`Every continuous $f : [0,1] \to \mathbb{R}$ is bounded.`,
        options: ['True', 'False']
    },
    {
        question: String.raw`What is $\frac{d}{dx} \left( x^x \right)$?`,
        options: [
            String.raw`$x \, x^{x-1}$`,
            String.raw`$x^x \ln x$`,
            String.raw`$x^x (1 + \ln x)$`,
            String.raw`$x^x$`
        ],
        label: "Derivative of x^x"
    }
];


// Define buttons with preset options
export const presetButtons = [
    ['Yes', 'No'],
    ['True', 'False'],
    ['Yes', 'No', 'Unsure'],
    ['True', 'False', 'Unsure'],
    ['Oui', 'Non'],
    ['Vrai', 'Faux'],
    ['Oui', 'Non', '...?'],
    ['Vrai', 'Faux', '...?'],
    ['A', 'B', 'C', 'D']
];


// Results-page styles.
// Define as many as you like, and give them unique ids of your choice.
// They are selectable under the advanced admin tools (admin remote).
// The first style is the fallback when no valid style is selected.
// questionColor / questionSize style the prepared question shown at the top.
export const resultStyles = [
    {
        id: "none",
        label: "None",
        backgroundColor: "",            // "empty" may be useful for transparency
        labelColor: "#2c3e50",
        labelSize: "3.5rem",
        labelOutlineColor: "#ffffff",
        labelOutlineWidth: 15,
        questionColor: "#2c3e50",
        questionSize: "2.6rem"
    },
    {
        id: "white-bg",
        label: "White bg",
        backgroundColor: "#ffffff",
        labelColor: "#2c3e50",
        labelSize: "3.5rem",
        labelOutlineColor: "#ffffff",
        labelOutlineWidth: 15,
        questionColor: "#2c3e50",
        questionSize: "2.6rem"
    },
    {
        id: "black-bg",
        label: "Black bg",
        backgroundColor: "#000000",     // "black" is transparent when using a projector
        labelColor: "#ffffff",
        labelSize: "3.5rem",
        labelOutlineColor: "#000000",
        labelOutlineWidth: 15,
        questionColor: "#ffffff",
        questionSize: "2.6rem"
    }
];
