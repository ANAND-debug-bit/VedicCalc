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

