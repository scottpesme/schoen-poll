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
    },
    {
        question: "Did everyone manage to connect to the poll?",
        options: ['Yes', 'No'],
        label: "Warm-up"
    },
    {
        question: String.raw`Let $A \in \mathbb{R}^{n \times n}$ be symmetric positive definite and let $x_k$ be the iterates of gradient descent on $f(x) = \tfrac{1}{2} x^\top A x - b^\top x$ with a fixed step size $1/L$. Does $x_k$ converge for every starting point $x_0$?`,
        options: ['Yes, always', 'Only if $A$ is invertible', 'No'],
        label: "Long question, gradient descent"
    },
    {
        question: String.raw`Which value does this limit take? $$\lim_{n \to \infty} \left( 1 + \frac{x}{n} \right)^n$$`,
        options: [String.raw`$1$`, String.raw`$e^x$`, String.raw`$x$`, String.raw`$+\infty$`],
        label: "Display math limit"
    },
    {
        question: String.raw`The matrix $\begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}$ is invertible.`,
        options: ['True', 'False'],
        label: "Singular matrix"
    },
    {
        question: String.raw`If $f$ is differentiable and $f'(x_0) = 0$, then $x_0$ is a local minimum of $f$.`,
        options: ['True', 'False', 'Unsure'],
        label: "Critical points"
    },
    {
        question: String.raw`Quelle est la dérivée de $\ln(x^2)$ ?`,
        options: [String.raw`$\frac{1}{x^2}$`, String.raw`$\frac{2}{x}$`, String.raw`$\frac{2}{x^2}$`, String.raw`$2 \ln x$`],
        label: "En francais"
    },
    {
        question: String.raw`How many eigenvalues (with multiplicity) does a real $5 \times 5$ matrix have in $\mathbb{C}$?`,
        options: [String.raw`$5$`, String.raw`$\leq 5$`, String.raw`It depends on the matrix`],
        label: "Counting eigenvalues"
    },
    {
        question: String.raw`Is $\{(x, y) \in \mathbb{R}^2 : xy = 1\}$ a smooth manifold?`,
        options: ['Yes', 'No'],
        label: "Hyperbola manifold"
    },
    {
        question: String.raw`Rank these in increasing order of growth as $n \to \infty$: $n \log n$, $n^{1.1}$, $2^{\log_2 n}$.`,
        options: [
            String.raw`$2^{\log_2 n} < n \log n < n^{1.1}$`,
            String.raw`$n \log n < 2^{\log_2 n} < n^{1.1}$`,
            String.raw`$2^{\log_2 n} < n^{1.1} < n \log n$`
        ],
        label: "Long options, growth rates"
    },
    {
        question: "Shall we take a five-minute break?",
        options: ['Yes, please', 'No, keep going'],
        label: "Break?"
    },
    {
        question: String.raw`What is $w \mapsto w^\top A x$ equal to?`,
        options: [
            String.raw`$\sum_{i, j = 1}^d A_{ij} w_i w_j$`,
            String.raw`$\sum_{i=1}^d A_{ij} w_i w_j$`,
            String.raw`$|| A w ||^2$`,
            "I don't know"
        ],
        label: "Q6"
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
