// Class 1
// See README.md ("Prepared questions and LaTeX") for the format of each entry.
export default [
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
