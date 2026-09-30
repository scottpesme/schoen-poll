// Class 3
// See README.md ("Prepared questions and LaTeX") for the format of each entry.
export default [
    {
        question: String.raw`For $\lambda > 0$, the quantity $(X^\top X + \lambda I)^{-1} X^\top y$ is equal to:`,
        options: [
            String.raw`$X^\top (X X^\top + \lambda I)^{-1} y$`,
            String.raw`$X (X X^\top + \lambda I)^{-1} y$`,
            String.raw`$X^\top (X^\top X + \lambda I)^{-1} y$`
        ],
        answer: 1,
        label: "Ridge regression"
    }
];
