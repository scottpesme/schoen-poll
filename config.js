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


// Sets of questions prepared ahead of time, typically one file per lecture.
// The admin remote has a menu to pick one: its questions then show up at the
// top of the launchpad, ready to launch. The remote remembers the last choice.
//
// Each set has:
//   name: what the menu shows,
//   file: the path to its file, relative to this folder.
//
// Keep your files in your own folder under questions/, so that colleagues
// sharing this poll do not edit each other's questions. Each file has one list
// of questions (`export default [...]`); see questions/scott/class01.js for an
// example, and README.md ("Prepared questions and LaTeX") for the format.
export const questionSets = [
    { name: "Scott – Class 2", file: "questions/scott/class02.js" },
    { name: "Scott – Class 1", file: "questions/scott/class01.js" },
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
