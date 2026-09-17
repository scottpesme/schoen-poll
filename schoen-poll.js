import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import { firebaseConfig, clickerUrl, colors, resultStyles } from "./config.js";
import { initAdminAuth } from "./adminauth.js";
import { setMathText } from "./mathtext.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. State & D3 Variables
let unsubscribeLiveState = null;
let unsubscribeDisplayState = null; // Listener for the presentation flags
let unsubscribeAnswers = null;
let simulation;
let nodes = [];
let currentOptions = [];
let currentRadius = 12;
let baseBubbleSize = 1.0;
let currentQuestionId = null;
let currentQuestionText = "";
let showQuestion = false;
let labelCounters = new Map(); // option -> the <span>s displaying its tally

// 3. Wait for the DOM to load before grabbing elements
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById('schoenPollOverlay');
    const labelLayer = document.getElementById('spLabels');
    const questionBanner = document.getElementById('schoenPollQuestion');
    const qrContainer = document.getElementById('schoenPollQRContainer');
    const qrImage = document.getElementById('spQRimage');
    const qrUrl = document.getElementById('spQRurl');

    // Authentication Logic
    initAdminAuth(app, db, {
        loginSection: document.getElementById('schoenPollLoginSection'),
        loginBtn: document.getElementById('spLoginBtn'),
        authMessage: document.getElementById('spAuthMessage')
    }, {
        onAdminSuccess: (user) => {
            startListening();
        },
        onLoggedOut: () => {
            if (simulation) simulation.stop();
            if (unsubscribeLiveState) unsubscribeLiveState();
            if (unsubscribeDisplayState) unsubscribeDisplayState();
            if (unsubscribeAnswers) unsubscribeAnswers();
            overlay.style.visibility = "hidden"; // this way, SVG retains its size.
            qrContainer.classList.add('hidden'); // this would not be ok for the SVG.
            questionBanner.classList.add('hidden');
        }
    });

    // 4. Firebase Listeners
    function startListening() {
        
        // 1. Listen to Live State (Core Poll Data)
        if (unsubscribeLiveState) unsubscribeLiveState();
        unsubscribeLiveState = onSnapshot(doc(db, "state", "live"), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();

                // The prepared question text, if the admin launched one
                const nextQuestionText = typeof data.question === "string" ? data.question : "";
                if (nextQuestionText !== currentQuestionText) {
                    currentQuestionText = nextQuestionText;
                    renderQuestion(currentQuestionText);
                }
                updateQuestionVisibility();

                // If the question ID changed, reset the swarm
                if (data.active_question_id && data.active_question_id !== currentQuestionId) {
                    currentQuestionId = data.active_question_id; // Store the new ID
                    initSwarm(data.options);
                    listenToAnswers(data.active_question_id);
                }
            }
        });

        // 2. Listen to Display State (Presentation Flags)
        if (unsubscribeDisplayState) unsubscribeDisplayState();
        unsubscribeDisplayState = onSnapshot(doc(db, "state", "display"), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                
                // Toggle visibility based on the 'reveal' boolean
                // We also check currentQuestionId to ensure a poll is actually loaded
                if (data.reveal && currentQuestionId) {
                    overlay.style.visibility = "visible";
                } else {
                    overlay.style.visibility = "hidden";
                }

                // Show/hide the question text (independent of the results)
                showQuestion = data.showQuestion === true;
                updateQuestionVisibility();

                // Show/hide the QR code
                if (data.showQR) {
                    // Generate the QR code URL using the API
                    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(clickerUrl)}`;
                    qrUrl.innerHTML = clickerUrl;
                    qrContainer.classList.remove('hidden');
                } else {
                    qrContainer.classList.add('hidden');
                }

                // Listen for bubble size changes
                const newBaseSize = data.bubbleSize || 1.0;
                if (newBaseSize !== baseBubbleSize) {
                    baseBubbleSize = newBaseSize;
                    updateBubbleSizes(); // Re-calculate and nudge the physics engine
                }

                applyResultStyle(data.resultStyleId);
            }
        });
    }

    function applyResultStyle(resultStyleId) {
        const style = resultStyles.find((candidate) => candidate.id === resultStyleId) || resultStyles[0];
        if (!style) return;

        const root = document.documentElement;
        document.body.style.backgroundColor = style.backgroundColor;
        root.style.setProperty('--sp-label-color', style.labelColor);
        root.style.setProperty('--sp-label-size', style.labelSize);
        root.style.setProperty('--sp-label-outline-color', style.labelOutlineColor);
        root.style.setProperty('--sp-label-outline-width', `${style.labelOutlineWidth}px`);
        root.style.setProperty('--sp-question-color', style.questionColor || style.labelColor);
        root.style.setProperty('--sp-question-size', style.questionSize || "2.6rem");
    }

    // 4b. The prepared question banner
    function renderQuestion(text) {
        questionBanner.replaceChildren();
        if (!text) return;
        questionBanner.appendChild(buildOutlinedMath(text).outlined);
    }

    function updateQuestionVisibility() {
        questionBanner.classList.toggle('hidden', !(showQuestion && currentQuestionText));
    }

    // 5. D3 Physics & Drawing Logic
    function initSwarm(options) {
        if (simulation) simulation.stop();
        currentOptions = options;
        nodes = [];

        const svg = d3.select("#spChart");
        svg.selectAll("*").remove(); // Wipe clean
        
        // Use clientWidth/Height of the container to scale dynamically
        const container = document.getElementById("spChart");
        const width = container.clientWidth || 900;
        const height = container.clientHeight || 400;

        // Adjust side margins based on the number of options
        // If 2 options: margin is 30% of width (keeps them closer to center)
        // If 4+ options: margin is 10% of width (spreads them out more)
        const marginFactor = options.length <= 2 ? 0.30 : (options.length === 3 ? 0.20 : 0.10);
        const margin = width * marginFactor;

        const xScale = d3.scalePoint()
            .domain(options)
            .range([margin, width - margin]);

        const colorScale = d3.scaleOrdinal()
            .domain(options)
            .range(colors);

        // Draw classy text labels at the bottom.
        // They are HTML overlaid on the SVG (1:1 with its pixels), so that
        // LaTeX in the options can be typeset.
        drawLabels(options, xScale, 0.75 * height);

        simulation = d3.forceSimulation(nodes)
            .force("x", d3.forceX(d => xScale(d.choice)).strength(0.10))
            .force("y", d3.forceY(height / 2 - 30).strength(0.05))
            .force("collide", d3.forceCollide(currentRadius + 1).strength(1).iterations(3))
            .velocityDecay(0.35)
            .on("tick", ticked);

        function ticked() {
            const circles = svg.selectAll("circle").data(nodes, d => d.id);
            circles.enter()
                .append("circle")
                .merge(circles)
                .attr("r", currentRadius)
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .attr("fill", d => colorScale(d.choice));
            circles.exit().remove();
        }
    }

    // Lay out one HTML label per option, centered on its column of bubbles.
    function drawLabels(options, xScale, y) {
        labelLayer.replaceChildren();
        labelCounters = new Map();

        options.forEach(option => {
            const label = document.createElement('div');
            label.className = 'sp-label';
            label.style.left = `${xScale(option)}px`;
            label.style.top = `${y}px`;

            // Each layer of the outline carries its own copy of the tally.
            const { outlined, layers } = buildOutlinedMath(option);
            const counters = layers.map(layer => {
                const counter = document.createElement('span');
                counter.className = 'sp-label-count';
                counter.textContent = " (0)";
                layer.appendChild(counter);
                return counter;
            });

            label.appendChild(outlined);
            labelLayer.appendChild(label);
            labelCounters.set(option, counters);
        });
    }

    function listenToAnswers(questionId) {
        if (unsubscribeAnswers) unsubscribeAnswers();

        unsubscribeAnswers = onSnapshot(collection(db, "questions", questionId, "answers"), (snapshot) => {
            const newVotesMap = new Map();
            const tallies = new Map(currentOptions.map(opt => [opt, 0]));

            snapshot.forEach(doc => {
                const choice = doc.data().choice;
                newVotesMap.set(doc.id, choice);
                if (tallies.has(choice)) tallies.set(choice, tallies.get(choice) + 1);
            });

            currentOptions.forEach(opt => {
                const counters = labelCounters.get(opt);
                if (counters) counters.forEach(span => span.textContent = ` (${tallies.get(opt)})`);
            });

            nodes = nodes.filter(n => newVotesMap.has(n.id));

            const width = document.getElementById("spChart").clientWidth || 900;

            newVotesMap.forEach((choice, id) => {
                const existingNode = nodes.find(n => n.id === id);
                if (existingNode) {
                    existingNode.choice = choice;
                } else {
                    nodes.push({ 
                        id: id, choice: choice, 
                        x: width / 2 + (Math.random() - 0.5) * 50, 
                        y: -5, vy: 3 
                    });
                }
            });

            updateBubbleSizes();

            if (simulation) {
                simulation.force("collide", d3.forceCollide(currentRadius + 1).strength(1).iterations(3));
                simulation.nodes(nodes);
                simulation.alpha(0.8).restart();
            }
        });
    }
});

// Helper to resize bubbles instantly when the size slider moves
function updateBubbleSizes() {
    if (!nodes.length) return;
    
    // 1. Calculate the new radius
    currentRadius = Math.max(4, Math.min(25, 350 / Math.sqrt(Math.max(1, nodes.length)))) * baseBubbleSize;
    
    // 2. Apply it to the physics engine
    if (simulation) {
        simulation.force("collide", d3.forceCollide().radius(currentRadius + 1).iterations(2));
        simulation.alpha(0.3).restart(); 
    }
}

// Paint the same (LaTeX-typeset) text twice: a thick stroke underneath, then the
// fill on top. This is the HTML equivalent of SVG's paint-order: stroke, and it
// keeps text readable over slides, bubbles or a projected board.
function buildOutlinedMath(text) {
    const outlined = document.createElement('span');
    outlined.className = 'sp-outlined';

    const layers = ['sp-outline-stroke', 'sp-outline-fill'].map(className => {
        const layer = document.createElement('span');
        layer.className = className;
        setMathText(layer, text);
        if (className === 'sp-outline-stroke') layer.setAttribute('aria-hidden', 'true');
        outlined.appendChild(layer);
        return layer;
    });

    return { outlined, layers };
}
