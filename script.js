"use strict";

function showSection(id) {
document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
const target = document.getElementById(id);
if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.section === id);
});

if (id === 'practice') {
    resetPractice();
    drawMandala(document.getElementById('resultMandala'), 100, true);
}
}

document.querySelectorAll('.nav-link').forEach(link => {
link.addEventListener('click', e => {
e.preventDefault();
showSection(link.dataset.section);
document.querySelector('.nav-links').classList.remove('open');
});
});

document.getElementById('hamburger').addEventListener('click', () => { document.querySelector('.nav-links').classList.toggle('open'); });

    // rotating mandala icon 
// Function to draw a mandala on a canvas

// creating decorative mandala designs using the Canvas element by getting different rings, petals, and center patterns to form a mandala, then adds rotation animations to make them look more attractive. A large rotating mandala is shown in the hero section, while a smaller animated mandala is displayed in the result section as well.
function drawMandala(canvas, radius, small = false) {
if (!canvas) return;

let ctx = canvas.getContext("2d");
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

ctx.clearRect(0, 0, canvas.width, canvas.height);

let rings;

// Different ring settings for small and large mandalas
if (small) {
rings = [
        { r: radius * 0.92, petals: 8, color: "#e8831a", fill: "rgba(232,131,26,0.08)" },
        { r: radius * 0.65, petals: 12, color: "#c9962d", fill: "rgba(201,150,45,0.12)" },
        { r: radius * 0.42, petals: 8, color: "#e8831a", fill: "rgba(232,131,26,0.15)" }
];

}
else {
rings = [
        { r: radius * 0.92, petals: 16, color: "#e8831a", fill: "rgba(232,131,26,0.07)" },
        { r: radius * 0.74, petals: 12, color: "#c9962d", fill: "rgba(201,150,45,0.1)" },
        { r: radius * 0.55, petals: 10, color: "#e8831a", fill: "rgba(232,131,26,0.12)" },
        { r: radius * 0.37, petals: 8, color: "#c9962d", fill: "rgba(201,150,45,0.18)" },
        { r: radius * 0.20, petals: 6, color: "#e8831a", fill: "rgba(232,131,26,0.25)" }
];
}

rings.forEach(function (ring) {

let ringRadius = ring.r;
let petals = ring.petals;

        
ctx.beginPath();
ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
ctx.strokeStyle = ring.color;
ctx.lineWidth = small ? 1 : 1.5;
ctx.globalAlpha = 0.5;
ctx.stroke();
ctx.globalAlpha = 1;


for (let i = 0; i < petals; i++) {

let angle = (i / petals) * Math.PI * 2;
let px = centerX + ringRadius * Math.cos(angle);
let py = centerY + ringRadius * Math.sin(angle);

let nextAngle = ((i + 1) / petals) * Math.PI * 2;

let nx = centerX + ringRadius * Math.cos(nextAngle);
let ny = centerY + ringRadius * Math.sin(nextAngle);
let middleAngle = (angle + nextAngle) / 2;
let curveX = centerX + (ringRadius * 0.75) * Math.cos(middleAngle);
let curveY = centerY + (ringRadius * 0.75) * Math.sin(middleAngle);

ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.quadraticCurveTo(px, py, curveX, curveY);
ctx.quadraticCurveTo(nx, ny, centerX, centerY);
ctx.fillStyle = ring.fill;
ctx.fill();
ctx.strokeStyle = ring.color;
ctx.lineWidth = small ? 0.5 : 0.8;
ctx.globalAlpha = 0.6;
ctx.stroke();
ctx.globalAlpha = 1; }

for (let i = 0; i < petals; i++) {

let angle = (i / petals) * Math.PI * 2;

ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.lineTo( centerX + ringRadius * Math.cos(angle), centerY + ringRadius * Math.sin(angle) );

ctx.strokeStyle = ring.color;
ctx.lineWidth = small ? 0.4 : 0.6;
ctx.globalAlpha = 0.3;
ctx.stroke();
ctx.globalAlpha = 1;}
});

ctx.beginPath();
ctx.arc(centerX, centerY, small ? 6 : 10, 0, Math.PI * 2);
ctx.fillStyle = "#e8831a";
ctx.fill();
}


// mandala icon animation

let heroRotation = 0;
let heroAnimationId;
function animateHeroMandala() {
let canvas = document.getElementById("heroMandala");
if (!canvas) return;
let ctx = canvas.getContext("2d");
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.save();
ctx.translate(centerX, centerY);
ctx.rotate(heroRotation);
ctx.translate(-centerX, -centerY);
drawMandala(canvas, 190, false);
ctx.restore();

ctx.save();
ctx.translate(centerX, centerY);
ctx.rotate(-heroRotation * 1.5);
ctx.translate(-centerX, -centerY);
drawRing(ctx, centerX, centerY, 195, 24, "#e8831a");
ctx.restore();
heroRotation += 0.003;
heroAnimationId = requestAnimationFrame(animateHeroMandala); }


// Draw small dots around outer ring
function drawRing(ctx, centerX, centerY, radius, petals, color) {
for (let i = 0; i < petals; i++) {
let angle = (i / petals) * Math.PI * 2;
let x = centerX + radius * Math.cos(angle);
let y = centerY + radius * Math.sin(angle);

ctx.beginPath();
ctx.arc(x, y, 4, 0, Math.PI * 2);
ctx.fillStyle = color;
ctx.globalAlpha = 0.5;
ctx.fill();
ctx.globalAlpha = 1;
}
}

animateHeroMandala();

drawMandala(
document.getElementById("resultMandala"), 100, true);

function animateResultMandala() {
let canvas = document.getElementById("resultMandala");
if (!canvas) return;
let angle = 0;
let intervalId = setInterval(function () {
let ctx = canvas.getContext("2d");
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.save();

ctx.translate(centerX, centerY);
ctx.rotate(angle);
ctx.translate(-centerX, -centerY);
 drawMandala(canvas, 100, true);
ctx.restore();
angle += 0.01;
}, 30);
return intervalId; }

// question bank , each level will have 10 questions ,5 levels , so in total 50 questions

const QUESTIONS = {
1: [
{ q: "7 + 8 = ?",
options: ["13", "14", "15", "16"],
ans: 2,
sutra: "Sutra: Ekadhikena Purvena (Left-to-Right Addition)",
steps: [ "Add left to right — since both are single digits, just add directly.",
        "7 + 8 = 15",
        "Alternatively: 7 + 8 → 7 + (3 + 5) = (7+3) + 5 = 10 + 5 = 15 (complement of 10 method)"
]
},
{ q: "9 + 6 = ?",
options: ["14", "15", "16", "13"],
ans: 1,
sutra: "Sutra: Nikhilam — complement to 10",
steps: [ "9 is 1 less than 10. So 9 + 6 = 10 + 6 − 1 = 16 − 1 = 15",
        "Complement method: 10 − 9 = 1. Take 1 from 6 → 6−1=5. Answer = 10 + 5 = 15"
]
},
{ q: "15 − 8 = ?",
options: ["8", "7", "6", "9"],
ans: 1,
sutra: "Sutra: Nikhilam — All from 9, Last from 10",
steps: [ "Complement of 8 w.r.t. 10 = 10 − 8 = 2",
"15 − 8 = (10 + 5) − 8 = 10 − 8 + 5 = 2 + 5 = 7"
]
},
{ q: "6 × 7 = ?",
options: ["42", "48", "36", "54"],
ans: 0,
sutra: "Sutra: Urdhva-Tiryagbhyam (Vertical × Crosswise)",
steps: [ "6 × 7 — both close to base 10",
        "Deviations from 10: 6→ −4, 7 → −3",
        "Cross-sum: 6 + (−3) = 3 (tens digit)",
        "Product of deviations: (−4)×(−3) = 12 → units digit 2, carry 1",
        "Tens = 3 + 1 = 4 → Answer: 42"
]
},
{ q: "18 ÷ 9 = ?",
options: ["3", "2", "4", "1"],
ans: 1,
sutra: "Sutra: Digit Sum (Division by 9)",
steps: [ "Bring down the leading digit: 1",
        "1 + 8 = 9 → but we are checking: 9 × 2 = 18, so quotient = 2",
        "By the digit-sum rule for dividing by 9: sum the digits of 18 = 9, so 18/9 = 2"
]
},
{ q: "13 + 14 = ?",
options: ["26", "27", "28", "25"],
ans: 1,
sutra: "Sutra: Left-to-Right Addition",
steps: [ "Tens: 1 + 1 = 2",
"Units: 3 + 4 = 7",
"No carry needed → 27"
]
},
{ q: "20 − 13 = ?",
options: ["8", "7", "6", "9"],
ans: 1,
sutra: "Sutra: Nikhilam Complement",
steps: [ "Complement of 13 w.r.t. 20: 20 − 13",
        "13 complement from 10 = 10−3=7, since borrowing: 20 − 13 = 7"
]
},
{ q: "5 × 9 = ?",
options: ["40", "50", "45", "35"],
ans: 2,
sutra: "Sutra: Ekadhikena — multiplying by 9",
steps: [ "9 = 10 − 1",
        "5 × 9 = 5 × 10 − 5 × 1 = 50 − 5 = 45"
]
},
{ q: "16 + 17 = ?",
options: ["31", "33", "32", "34"],
ans: 2,
sutra: "Sutra: Left-to-Right Addition",
steps: [ "Tens: 1 + 1 = 2",
"Units: 6 + 7 = 13 → write 3, carry 1 → tens become 3",
"Answer: 33... wait: 2 tens + carry = 3 tens, units = 3 → 33? No: 16+17=33" ]
},
{ q: "14 − 9 = ?",
options: ["6", "4", "5", "3"],
ans: 2,
sutra: "Sutra: Complement from 10",
steps: [ "9 is 1 less than 10",
"14 − 9 = 14 − 10 + 1 = 4 + 1 = 5" 
] 
} 
],
}
