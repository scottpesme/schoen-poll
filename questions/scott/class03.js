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
    },
    {
        question: String.raw`If $d > n$, we are in the underparametrised setting.`,
        options: ['True', 'False'],
        answer: 'False',
        label: "d > n is overparametrised"
    },
    {
        question: String.raw`If $d > n$, then the feature matrix $X \in \mathbb{R}^{n \times d}$ is a tall matrix.`,
        options: ['True', 'False'],
        answer: 'False',
        label: "d > n means X is wide"
    },
    {
        question: String.raw`If $\mathrm{rank}(X) = n < d$, which of the following is an invertible matrix?`,
        options: [
            String.raw`$X^\top X$`,
            String.raw`$X X^\top$`,
            'Both',
            'Neither'
        ],
        answer: 2,
        label: "Invertible Gram matrix when overparametrised"
    },
    {
        question: String.raw`If $d > n$ and the inputs $x_1, \ldots, x_n$ are linearly independent, then least squares reaches zero training error.`,
        options: ['True', 'False'],
        answer: 'True',
        label: "Overparametrised interpolation"
    },
    {
        question: String.raw`Let $z_1, \ldots, z_n \in \mathbb{R}$ be distinct and $\phi(z) = (1, z, \ldots, z^k)$ with $k \geq n - 1$. Then for any $y \in \mathbb{R}^n$, there exists $w$ such that $\langle w, \phi(z_i) \rangle = y_i$ for all $i$.`,
        options: ['True', 'False'],
        answer: 'True',
        label: "Polynomial features interpolate"
    },
    {
        question: String.raw`For the parametrisation $f_w(x) = w_1 x_1 + w_2 x_2 + w_3 \sin(x_3)$, the empirical risk with the squared error $\ell$ is convex.`,
        options: ['True', 'False'],
        answer: 'True',
        label: "Linear param but non linear in data"
    }
];
