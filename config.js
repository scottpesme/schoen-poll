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
//   answer:   the correct answer (optional), either its text or its position in
//             the list, counting from 1. The admin remote can then box it on the
//             results page. It is never sent to the clickers.
//   label:    a private label for the history page (optional; defaults to the question).
//
// Both `question` and `options` support LaTeX: write inline math between $...$
// and displayed math between $$...$$. Use String.raw`...` (as below) so that
// backslashes do not need to be escaped; with ordinary quotes, write "\\pi".
export const preparedQuestions = [
    {
        question: "Will AI have beneficial impacts on our society?",
        options: ['Yes for sure', 'Probably', "I don't think so", 'Absolutely not'],
        label: "Q1"
    },
    {
        question: "The amount of text read by ChatGPT amounts to",
        options: [
            '10 copies of War and Peace',
            String.raw`$10^{7}$ copies of War and Peace`,
            String.raw`$10^{10}$ copies of War and Peace`,
            String.raw`$10^{100}$ copies of War and Peace`
        ],
        answer: 2,
        label: "Q2"
    },
    {
        question: "The human brain has more connections than ChatGPT has weights?",
        options: ['True', 'False'],
        answer: 'True',
        label: "Q3"
    },
    {
        question: "Machines will one day be conscious",
        options: [
            'Probably',
            "I don't think so",
            'Stupid question, machines cannot be conscious by definition'
        ],
        label: "Q4"
    },
    {
        question: String.raw`What is the gradient of $w \mapsto \langle w, x \rangle$?`,
        options: [
            String.raw`$w$`,
            String.raw`$x$`,
            String.raw`$w + x$`,
            "What's a gradient?"
        ],
        answer: 2,
        label: "Q5"
    },
    {
        question: String.raw`What is $w \mapsto w^\top A w$ equal to?`,
        options: [
            String.raw`$\sum_{i, j = 1}^d A_{ij} w_i w_j$`,
            String.raw`$\sum_{i=1}^d A_{ij} w_i w_j$`,
            String.raw`$|| A w ||^2$`,
            "I don't know"
        ],
        answer: 1,
        label: "Q6"
    },
    {
        question: String.raw`What is the gradient of $w \mapsto w^\top A w$?`,
        options: [
            String.raw`$A w$`,
            String.raw`$2 A w$`,
            String.raw`$(A + A^\top) w$`,
            "Still don't know what a gradient is"
        ],
        answer: 3,
        label: "Q7"
    },
    {
        question: String.raw`$w \mapsto \Vert w \Vert^2$ is a convex function`,
        options: ['True', 'False', "I don't know"],
        answer: 'True',
        label: "Q8"
    },
    {
        question: String.raw`$w \mapsto w^\top A w$ is a convex function`,
        options: ['True', 'False', "I don't know"],
        answer: 'False',
        label: "Q9"
    },
    {
        question: String.raw`$w \mapsto \exp(w)$ is a convex function`,
        options: ['True', 'False', "I don't know"],
        answer: 'True',
        label: "Q10"
    },
    {
        question: String.raw`$w \mapsto \ln (w)$ is a convex function`,
        options: ['True', 'False', "I don't know"],
        answer: 'False',
        label: "Q11"
    },
    {
        question: String.raw`Suppose $f$ is convex and differentiable. Which minimal condition guarantees that $w^\star$ is a global minimiser?`,
        options: [
            String.raw`$\nabla f(w^\star) = 0$ (gradient = 0)`,
            String.raw`$\nabla^2 f(w^\star) = 0$ (Hessian = 0)`,
            String.raw`$\nabla f(w^\star) = 0$ AND $\nabla^2 f(w^\star) = 0$`,
            "I don't know"
        ],
        answer: 1,
        label: "Q12"
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
// correctColor is the box drawn around the correct answer when it is revealed.
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
        questionSize: "2.6rem",
        correctColor: "#099869"
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
        questionSize: "2.6rem",
        correctColor: "#099869"
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
        questionSize: "2.6rem",
        correctColor: "#2ee59d"
    }
];
