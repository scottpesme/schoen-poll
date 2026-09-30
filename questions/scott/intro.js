// Class 1
// See README.md ("Prepared questions and LaTeX") for the format of each entry.
export default [
    {
        question: "Is this polling system working for you?",
        options: ['Yes', 'No'],
        label: "Q0"
    },
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
            'I don't think so',
            'Stupid question, machines cannot be conscious by definition'
        ],
        label: "Q4"
    }
];
