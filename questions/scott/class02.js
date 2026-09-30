// Class 2
// See README.md ("Prepared questions and LaTeX") for the format of each entry.
export default [
    {
        question: "A convex function always has a global minimum.",
        options: ['True', 'False'],
        answer: 'False',
        label: "Convex function and minima"
    },
    {
        question: String.raw`Whatever the dataset $(x_i, y_i)_{i \in \{1, \ldots, n\}} \in \mathbb{R}^d \times \mathbb{R}$, there exists a function $f$ such that $f(x_i) = y_i$ for all $i$.`,
        options: ['True', 'False'],
        answer: 'False',
        label: "Non interpolatable datasets"
    },
    {
        question: String.raw`Consider the empirical risk $L(w) = \sum_{i=1}^n \ell(f_w(x_i), y_i)$ where $\ell$ corresponds to the squared error. Then $L(w) = 0$ if and only if $f_w(x_i) = y_i$ for all $i \in \{1, \ldots, n\}$.`,
        options: ['True', 'False'],
        answer: 'True',
        label: "Zero risk means interpolation"
    },
    {
        question: String.raw`Let $f$ be a convex function which has a global minimiser $w^\star$. Then $f$ is differentiable at $w^\star$ and $\nabla f(w^\star) = 0$.`,
        options: ['True', 'False'],
        answer: 'False',
        label: "Convex function and gradient = 0"
    },
    {
        question: String.raw`For the parametrisation $f_w(x) = w_1 x_1 + w_2 x_2 + w_3 \sin(x_3)$, the empirical risk with the squared error $\ell$ is convex.`,
        options: ['True', 'False'],
        answer: 'True',
        label: "Linear param but non linear in data"
    },
    {
        question: String.raw`For the parametrisation $f_w(x) = w_1 x_1 + w_2 x_2 + \sin(w_3) x_3$, the empirical risk with the squared error $\ell$ is convex.`,
        options: ['True', 'False'],
        answer: 'False',
        label: "Non linear parametrisation"
    }
];
