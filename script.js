 "use strict"; //just tryin out to make debugging easier 

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
} }

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
ans: 1,
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

2: [
{ q: "47 + 36 = ?",
options: ["82", "83", "84", "81"],
ans: 1,
sutra: "Sutra: Left-to-Right Addition",
steps: [ "Tens: 4 + 3 = 7",
"Units: 7 + 6 = 13 → write 3, carry 1 → tens 7 becomes 8",
"Answer: 83"
]
},
{ q: "98 + 97 = ?",
options: ["194", "195", "196", "193"],
ans: 1,
sutra: "Sutra: Nikhilam (Base 100)",
steps: [ "Base = 100. Deviations: 98 → −2, 97 → −3",
        "Sum of deviations: −2 + (−3) = −5",
        "2 × 100 − 5 = 200 − 5 = 195"
]
},
{ q: "100 − 63 = ?",
options: ["47", "37", "38", "27"],
ans: 1,
sutra: "Sutra: Nikhilam — All from 9, Last from 10",
steps: [ "All digits of 63 from 9 except last from 10",
        "9 − 6 = 3 (tens), 10 − 3 = 7 (units)",
        "Answer: 37"
]
},
{ q: "54 × 11 = ?",
options: ["595", "594", "604", "584"],
ans: 1,
sutra: "Sutra: Multiply by 11 — Insert digit sum in middle",
steps: [ "Digits of 54: 5 and 4. Sum = 9",
        "Place 9 between 5 and 4 → 594"
]
},
{ q: "23 × 21 = ?",
options: ["483", "463", "473", "493"],
ans: 0,
sutra: "Sutra: Urdhva-Tiryagbhyam (2-digit × 2-digit)",
steps: [ "Units × Units: 3 × 1 = 3",
        "Cross: (2×1) + (3×2) = 2 + 6 = 8",
        "Tens × Tens: 2 × 2 = 4",
        "Read left to right: 4 | 8 | 3 = 483"
]
},
{ q: "75 − 48 = ?",
options: ["28", "27", "26", "29"],
ans: 1,
sutra: "Sutra: Complement Subtraction",
steps: [ "Complement of 48 w.r.t. 100: all-from-9, last-from-10 → 52",
"75 + 52 = 127 → drop leading 1 → 27"
]
},
{ q: "99 × 99 = ?",
options: ["9800", "9801", "9802", "9799"],
ans: 1,
sutra: "Sutra: Nikhilam Near-Base Multiplication (Base 100)",
steps: [ "Deviations from 100: both −1",
        "Cross-sum: 99 + (−1) = 98 (left part)",
        "Product of deviations: (−1) × (−1) = 01 (right part, 2 digits)",
        "Answer: 98 | 01 = 9801"
]
},
{ q: "132 ÷ 11 = ?",
options: ["11", "12", "13", "14"],
ans: 1,
sutra: "Sutra: Paravartya — Division by 11",
steps: [ "Divisor 11. Flag digit: 1",
        "Bring down 1. Next: 3 − 1×1 = 2. Next: 2×10 + 2 = 22 − 1×2... quotient digit: 12",
        "12 × 11 = 132 ✓ → Answer: 12"
]
},
{ q: "65² = ?",
options: ["4255", "4225", "4235", "4215"],
ans: 1,
sutra: "Sutra: Ekadhikena — Square of number ending in 5",
steps: [ "Left part = 6. Next number = 7",
        "6 × 7 = 42",
        "Append 25 → 4225"
]
},
{ q: "82 + 79 = ?",
options: ["162", "161", "160", "163"],
ans: 1,
sutra: "Sutra: Base 100 Nikhilam Addition",
steps: [ "Deviations from 100: 82 → −18, 79 → −21",
"Sum of deviations: −18 + (−21) = −39",
"2 × 100 − 39 = 200 − 39 = 161"
]
}
],

3: [
{ q: "347 + 286 = ?",
options: ["632", "633", "634", "631"],
ans: 1,
sutra: "Sutra: Left-to-Right Addition with carry",
steps: [ "Hundreds: 3 + 2 = 5",
        "Tens: 4 + 8 = 12 → write 2, carry 1 → hundreds: 5+1=6",
        "Units: 7 + 6 = 13 → write 3, carry 1 → tens: 2+1=3",
        "Answer: 633"
]
},
{ q: "1000 − 374 = ?",
options: ["626", "636", "624", "616"],
ans: 0,
sutra: "Sutra: Nikhilam — All from 9, Last from 10",
steps: [ "9 − 3 = 6 (hundreds)",
        "9 − 7 = 2 (tens)",
        "10 − 4 = 6 (units)",
        "Answer: 626"
]
},
{ q: "43 × 47 = ?",
options: ["2021", "2020", "1921", "2121"],
ans: 0,
sutra: "Sutra: Ekadhikena — Special case (same tens, units add to 10)",
steps: [ "Units digits: 3 + 7 = 10 ✓. Tens digit = 4",
        "Left part: 4 × (4+1) = 4 × 5 = 20",
        "Right part: 3 × 7 = 21 (two digits: 21)",
        "Answer: 20 | 21 = 2021"
]
},
{ q: "998 × 997 = ?",
options: ["995006", "995012", "994012", "996006"],
ans: 0,
sutra: "Sutra: Nikhilam Near-Base Multiplication (Base 1000)",
steps: [ "Deviations from 1000: 998 → −2, 997 → −3",
        "Cross-sum: 998 + (−3) = 995 (left part)",
        "Product of deviations: (−2)×(−3) = 006 (right, 3 digits)",
        "Answer: 995 | 006 = 995006"
]
},
{ q: "2178 ÷ 9 = ?",
options: ["240, remainder 6", "241, remainder 9", "242 remainder 0", "243 remainder 1"],
ans: 2,
sutra: "Sutra: Division by 9 — Digit propagation method",
steps: [ "Bring down 2 → quotient: 2",
        "2 + 1 = 3 → quotient: 3... wait, recalculate: 2, 2+1=3 no — standard digit sum:",
        "2 | 2+1=3 | 3+7=10 → write 0 carry 1 → 3 becomes 4 | 0+8=8 → rem 8? No: let's recount",
        "Digits: 2,1,7,8. Bring 2 → q=2. 2+1=3 → q=3. 3+7=10 → q=1 carry1 → 3+1=4. Remainder: 1+8=9 → remainder is 9 → so quotient=241, remainder=9; adjust: 241+1=242, remainder 0",
        "Answer: 242 remainder 0 → 2178 ÷ 9 = 242"
]
},
{ q: "523 − 278 = ?",
options: ["244", "246", "245", "247"],
ans: 2,
sutra: "Sutra: Complement Subtraction",
steps: [ "Complement of 278 w.r.t. 1000: 9−2=7, 9−7=2, 10−8=2 → 722",
        "523 + 722 = 1245 → drop leading 1 → 245"
]
},
{ q: "75 × 75 = ?",
options: ["5265", "5725", "5625", "5525"],
ans: 2,
sutra: "Sutra: Ekadhikena — Square ending in 5",
steps: [
"Left part = 7. Next = 8",
"7 × 8 = 56",
"Append 25 → 5625"
]
},
{ q: "32 × 38 = ?",
options: ["1216", "1116", "1316", "1416"],
ans: 0,
sutra: "Sutra: Ekadhikena — Same tens, units add to 10",
steps: [ "Units: 2 + 8 = 10 ✓. Tens digit = 3",
        "Left part: 3 × 4 = 12",
        "Right part: 2 × 8 = 16",
        "Answer: 12 | 16 = 1216"
]
},
{ q: "456 + 378 = ?",
options: ["833", "834", "835", "832"],
ans: 1,
sutra: "Sutra: Left-to-Right Group Addition",
steps: [
        "Hundreds: 4 + 3 = 7",
        "Tens: 5 + 7 = 12 → write 2, carry 1 → hundreds: 7+1=8",
        "Units: 6 + 8 = 14 → write 4, carry 1 → tens: 2+1=3",
        "Answer: 834"
]
},
{ q: "864 ÷ 12 = ?",
options: ["70", "72", "74", "68"],
ans: 1,
sutra: "Sutra: Paravartya (Flag Method) — Divisor 12",
steps: [ "Main divisor = 1, flag = 2",
        "8 ÷ 1 → trial 7, but try 7: 7 × 2 = 14. Partial rem: 8−7=1, bring 6: 16−14=2",
        "2 ÷ 1 → trial 2: 2 × 2 = 4. Partial rem: 2−2=0, bring 4: 4−4=0",
        "Quotient: 72, remainder: 0 → Answer: 72"
]
}
],

4: [
{ q: "4532 + 3789 = ?",
options: ["8320", "8321", "8322", "8319"],
ans: 1,
sutra: "Sutra: Grouping & Digit Sum Verification",
steps: [ "Thousands + Hundreds: 45 + 37 = 82",
        "Tens + Units: 32 + 89 = 121 → write 21, carry 1 → 82+1=83",
        "Combine: 83 | 21 = 8321",
        "Digit-sum check: (4+5+3+2)+(3+7+8+9)=14+27=41→5; 8+3+2+1=14→5 ✓"
]
},
{ q: "10000 − 3746 = ?",
options: ["6253", "6254", "6255", "6243"],
ans: 1,
sutra: "Sutra: Nikhilam — All from 9, Last from 10",
steps: [ "9 − 3 = 6",
        "9 − 7 = 2",
        "9 − 4 = 5",
        "10 − 6 = 4",
        "Answer: 6254"
]
},
{q: "97 × 96 = ?",
options: ["9310", "9312", "9212", "9412"],
ans: 1,
sutra: "Sutra: Nikhilam Near-Base Multiplication (Base 100)",
steps: [ "Deviations from 100: 97 → −3, 96 → −4",
        "Cross-sum: 97 + (−4) = 93 (left part)",
        "Product: (−3) × (−4) = 12 (right part, 2 digits)",
        "Answer: 93 | 12 = 9312"
]
},
{ q: "123 × 121 = ?",
options: ["14882", "14883", "14863", "14982"],
ans: 1,
sutra: "Sutra: Urdhva-Tiryagbhyam (3-digit × 3-digit, vertical-cross)",
steps: [ "Units × Units: 3 × 1 = 3",
        "Cross 1 (tens): (2×1) + (3×2) = 2+6 = 8",
        "Cross 2 (hundreds): (1×1) + (2×2) + (3×1) = 1+4+3 = 8",
        "Cross 3 (thousands): (1×2) + (2×1) = 2+2 = 4... wait → (1×2)+(2×1)=4? No: (1×2)+(2×1) for positions",
        "Left cross: 1×2 + 2×1 = 4; Leftmost: 1×1=1. Final: 1 | 4 | 8 | 8 | 3 = 14883"
]
},
{ q: "2135 ÷ 23 = ?",
options: ["91 r 22", "92 r 19", "93 r 16", "90 r 25"],
ans: 1,
sutra: "Sutra: Dhvajanka Flag Method",
steps: [ "Divisor = 23. Main digit = 2, Flag = 3",
        "21 ÷ 2 → trial 9. 9×3=27. 21 − 9×2=3, bring: 33−27=6",
        "6÷2 → trial 3. 3×3=9. 6−3×2=0, bring: 05−9 → negative, try 2",
        "Quotient = 92, remainder: check 92×23=2116, 2135−2116=19",
        "Answer: 92 remainder 19"
]
},
{ q: "9876 − 4567 = ?",
options: ["5308", "5309", "5208", "5310"],
ans: 1,
sutra: "Sutra: Complement + Left-to-Right",
steps: [ "Complement of 4567 from 10000: 9−4=5, 9−5=4, 9−6=3, 10−7=3 → 5433",
        "9876 + 5433 = 15309 → drop leading 1 → 5309"
]
},
{ q: "48 × 52 = ?",
options: ["2495", "2496", "2395", "2556"],
ans: 1,
sutra: "Sutra: (a+b)(a−b) = a² − b² Algebraic Vedic Application",
steps: [ "48 = 50 − 2, 52 = 50 + 2",
        "(50−2)(50+2) = 50² − 2² = 2500 − 4 = 2496"
]
},
{ q: "3456 ÷ 9 = ?",
options: ["383 r 9", "384 r 0", "384 r 1", "385 r 1"],
ans: 1,
sutra: "Sutra: Division by 9 — Digit Propagation",
steps: [ "Digits: 3, 4, 5, 6",
        "Bring 3 → q=3. 3+4=7 → q=7. 7+5=12 → write q=2 carry 1 → 7 becomes 8. 2+6=8... remainder = 8? No:",
        "More carefully: 3456 ÷ 9 = 384 exactly (384×9=3456)",
        "Digit sum: 3+4+5+6=18 → 18÷9=2? No, 384. Bring 3; 3+4=7, 7+5=12 carry1→q goes 3,8; 2+6+carry=8... remainder 0",
        "Answer: 384 remainder 0"
]
},
{ q: "625² = ?",
options: ["390625", "390525", "390725", "380625"],
ans: 0,
sutra: "Sutra: Ekadhikena — Square ending in 5 (3-digit)",
steps: [ "Number = 625. Ending in 5.",
        "Left part = 62. Next = 63",
        "62 × 63 = 3906 (use Urdhva: 6×6=36, cross: 6×3+2×6=30, units: 2×3=6 → 3906)",
        "Append 25 → 390625"
]
},
{q: "567 + 894 = ?",
options: ["1461", "1461", "1460", "1462"],
ans: 0,
sutra: "Sutra: Left-to-Right Group Addition",
steps: [ "Hundreds: 5+8=13 → note carry possibility",
        "Tens: 6+9=15 → write 5, carry 1 → hundreds: 13+1=14",
        "Units: 7+4=11 → write 1, carry 1 → tens: 5+1=6",
        "Final: 14 | 6 | 1 = 1461"
]
}
],

5: [
{ q: "9987 + 9876 = ?",
options: ["19863", "19862", "19864", "19853"],
ans: 0,
sutra: "Sutra: Nikhilam — near-base 10000 addition",
steps: [ "Base = 10000. Deviations: 9987 → −13, 9876 → −124",
        "Sum of deviations: −13 + (−124) = −137",
        "2 × 10000 − 137 = 20000 − 137 = 19863"
]
},
{ q: "123 × 124 = ?",
options: ["15252", "15262", "15162", "15352"],
ans: 0,
sutra: "Sutra: Urdhva-Tiryagbhyam (3-digit × 3-digit)",
steps: [ "Units: 3×4=12 → write 2, carry 1",
        "Cross-1 (tens): (2×4)+(3×2)=8+6=14, +1 carry=15 → write 5, carry 1",
        "Cross-2 (hundreds): (1×4)+(2×2)+(3×1)=4+4+3=11, +1=12 → write 2, carry 1",
        "Cross-3: (1×2)+(2×1)=4, +1=5",
        "Leftmost: 1×1=1",
        "Combine: 1 | 5 | 2 | 5 | 2 = 15252"
]
},
{ q: "100000 − 34567 = ?",
options: ["65432", "65433", "65434", "65332"],
ans: 1,
sutra: "Sutra: Nikhilam — All from 9, Last from 10 (5 digits)",
steps: [ "9−3=6, 9−4=5, 9−5=4, 9−6=3, 10−7=3",
        "Answer: 65433"]
},
{ q: "998 × 994 = ?",
options: ["992012", "992016", "993012", "992012"],
ans: 0,
sutra: "Sutra: Nikhilam Near-Base (Base 1000)",
steps: [ "Deviations from 1000: 998 → −2, 994 → −6",
        "Cross-sum: 998 + (−6) = 992 (left part)",
        "Product of deviations: (−2)×(−6) = 012 (right, 3 digits)",
        "Answer: 992 | 012 = 992012"
]
},
{ q: "4-digit: 2345 × 11 = ?",
options: ["25785", "25795", "25895", "26795"],
ans: 1,
sutra: "Sutra: Multiply by 11 — Extended Rule",
steps: [ "Write first digit: 2",
"Sum pairs: 2+3=5, 3+4=7, 4+5=9",
"Write last digit: 5",
"Reading left to right: 2 | 5 | 7 | 9 | 5 = 25795"
]
},
{ q: "16384 ÷ 128 = ?",
options: ["126", "128", "130", "124"],
ans: 1,
sutra: "Sutra: Urdhva Straight Division",
steps: [ "128 = 2^7. 16384 = 2^14",
        "2^14 ÷ 2^7 = 2^7 = 128",
        "Vedic verification: 128 × 128 = 16384 (near-base square check)"
]
},
{ q: "777 + 888 + 999 = ?",
options: ["2663", "2664", "2665", "2654"],
ans: 1,
sutra: "Sutra: Sankalana-Vyavakalanabhyam (Addition & Subtraction)",
steps: [ "Observe: 777 = 7×111, 888 = 8×111, 999 = 9×111",
        "(7+8+9) × 111 = 24 × 111",
        "24 × 111 = 24 × 100 + 24 × 11 = 2400 + 264 = 2664"
]
},
{ q: "987² = ?",
options: ["974168", "974169", "973169", "975169"],
ans: 1,
sutra: "Sutra: Nikhilam — Squaring near base 1000",
steps: [ "Base = 1000. Deviation = −13",
        "Left part: 987 + (−13) = 974",
        "Right part: (−13)² = 169 (3 digits)",
        "Answer: 974 | 169 = 974169"
]
},
{ q: "12345 − 6789 = ?",
options: ["5555", "5556", "5556", "5455"],
ans: 1,
sutra: "Sutra: Complement Subtraction",
steps: [ "Complement of 6789 from 10000: 9−6=3, 9−7=2, 9−8=1, 10−9=1 → 3211",
        "12345 − 6789 = 12345 − 10000 + 3211 = 2345 + 3211 = 5556"
]
},
{ q: "143 × 77 = ?",
options: ["11011", "10911", "11111", "11211"],
ans: 0,
sutra: "Sutra: Anurupyena (Proportionality) + Urdhva",
steps: [ "77 = 7 × 11. So 143 × 77 = 143 × 7 × 11",
        "143 × 7 = 1001",
        "1001 × 11: insert digit sums → 1 | 1+0=1 | 0+0=0 | 0+1=1 | 1 = 11011",
        "Answer: 11011"
] } ] }

// practice state on the site 

let currentLevel = null;
let selectedMinutes = null;
let timerInterval = null;
let secondsLeft = 0;
let currentQIndex = 0;
let score = { correct: 0, wrong: 0 };
let questions = [];
let resultMandalaInterval = null;

function resetPractice() {
clearInterval(timerInterval);
clearInterval(resultMandalaInterval);
timerInterval = null;

document.getElementById('practiceHome').style.display = 'block';
document.getElementById('cbtView').style.display = 'none';
document.getElementById('resultView').style.display = 'none';
document.getElementById('timerSetup').style.display = 'none';

document.querySelectorAll('.level-card').forEach(c => c.classList.remove('selected'));
document.querySelectorAll('.timer-opt').forEach(b => b.classList.remove('active'));
document.getElementById('customTimeRow').style.display = 'none';
document.getElementById('customMinInput').value = '';
document.getElementById('startTestBtn').disabled = true;

currentLevel = null;
selectedMinutes = null;
currentQIndex = 0;
score = { correct: 0, wrong: 0 }; }

// clicking on the level cards
document.querySelectorAll('.level-card').forEach(card => { card.addEventListener('click', () => {
currentLevel = parseInt(card.dataset.level);

document.querySelectorAll('.level-card').forEach(c => c.classList.remove('selected'));
card.classList.add('selected');
document.getElementById('selectedLevelName').textContent = `Level ${currentLevel}`;
document.getElementById('timerSetup').style.display = 'flex';
selectedMinutes = null;
document.getElementById('startTestBtn').disabled = true;
document.querySelectorAll('.timer-opt').forEach(b => b.classList.remove('active'));
document.getElementById('customTimeRow').style.display = 'none';
document.getElementById('customMinInput').value = '';
document.getElementById('timerSetup').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
});

// Timer option click
document.querySelectorAll('.timer-opt').forEach(btn => { btn.addEventListener('click', () => {
document.querySelectorAll('.timer-opt').forEach(b => b.classList.remove('active'));
btn.classList.add('active');

if (btn.dataset.min === 'custom') { document.getElementById('customTimeRow').style.display = 'flex';
selectedMinutes = null; document.getElementById('startTestBtn').disabled = true;
} else { document.getElementById('customTimeRow').style.display = 'none';
selectedMinutes = parseInt(btn.dataset.min); document.getElementById('startTestBtn').disabled = false;
}
});
});

document.getElementById('customMinInput').addEventListener('input', function () { const val = parseInt(this.value);
if (val >= 1 && val <= 60) { selectedMinutes = val;
document.getElementById('startTestBtn').disabled = false;} else {
selectedMinutes = null; document.getElementById('startTestBtn').disabled = true;}
});

document.getElementById('backFromTimer').addEventListener('click', () => { document.getElementById('timerSetup').style.display = 'none';
document.querySelectorAll('.level-card').forEach(c => c.classList.remove('selected')); currentLevel = null;
});

document.getElementById('startTestBtn').addEventListener('click', startTest);

function startTest() { if (!currentLevel || !selectedMinutes) return;
questions = shuffle([...QUESTIONS[currentLevel]]);
currentQIndex = 0;
score = { correct: 0, wrong: 0 };
secondsLeft = selectedMinutes * 60;

document.getElementById('practiceHome').style.display = 'none';
document.getElementById('cbtView').style.display = 'block';
document.getElementById('resultView').style.display = 'none';

document.getElementById('cbtLevelLabel').textContent = `Level ${currentLevel}`;
startTimer();
renderQuestion(); }

function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[arr[i], arr[j]] = [arr[j], arr[i]]; }
return arr;}

function startTimer() { updateTimerDisplay();
timerInterval = setInterval(() => { secondsLeft--; updateTimerDisplay();

if (secondsLeft <= 0) { clearInterval(timerInterval);
timerInterval = null; endTest(true); } }, 1000); }

function updateTimerDisplay() {
const mins = Math.floor(secondsLeft / 60);
const secs = secondsLeft % 60;
const label = document.getElementById('timerLabel');
label.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
label.classList.toggle('warning', secondsLeft <= 30);
}

function renderQuestion() {
const q = questions[currentQIndex];
const total = questions.length;

document.getElementById('cbtQCounter').textContent = `Q ${currentQIndex + 1} / ${total}`;
document.getElementById('cbtProgressBar').style.width = `${((currentQIndex + 1) / total) * 100}%`;
document.getElementById('cbtQText').textContent = q.q;

const optContainer = document.getElementById('cbtOptions');
optContainer.innerHTML = '';
const labels = ['A', 'B', 'C', 'D'];
q.options.forEach((opt, i) => {
const btn = document.createElement('button');
btn.className = 'cbt-option-btn';
btn.innerHTML = `<span class="option-label">${labels[i]}</span>${opt}`;
btn.addEventListener('click', () => answerQuestion(i, btn));
optContainer.appendChild(btn); });

document.getElementById('cbtSolutionBox').style.display = 'none';
document.getElementById('nextQBtn').style.display = 'none';}

function answerQuestion(chosen, clickedBtn) { const q = questions[currentQIndex];
const allBtns = document.querySelectorAll('.cbt-option-btn'); allBtns.forEach(b => (b.disabled = true));

const isCorrect = chosen === q.ans;

if (isCorrect) { score.correct++;
clickedBtn.classList.add('correct'); }
else {score.wrong++;
clickedBtn.classList.add('wrong');
allBtns[q.ans].classList.add('correct');}

showSolution(q, isCorrect); }

function showSolution(q, isCorrect) { const box = document.getElementById('cbtSolutionBox');
box.style.display = 'block';

const verdict = document.getElementById('solutionVerdict');
verdict.textContent = isCorrect ? '✓ Correct!' : '✗ Incorrect — Correct answer: ' + q.options[q.ans];
verdict.className = isCorrect ? 'verdict-correct' : 'verdict-wrong';

document.getElementById('solSutra').textContent = q.sutra;

const stepsEl = document.getElementById('solSteps');
stepsEl.innerHTML = '';
q.steps.forEach((step, i) => {
const div = document.createElement('div');
div.className = 'step';
div.innerHTML = `<span class="step-n">${i + 1}</span><span>${step}</span>`;
stepsEl.appendChild(div); });

const nextBtn = document.getElementById('nextQBtn');
nextBtn.style.display = 'flex';
nextBtn.textContent = currentQIndex < questions.length - 1 ? 'Next Question →' : 'See Results →';
box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });}

document.getElementById('nextQBtn').addEventListener('click', () => { currentQIndex++;
if (currentQIndex < questions.length) { renderQuestion();
document.querySelector('.cbt-body').scrollIntoView({ behavior: 'smooth', block: 'start' });}

else {endTest(false);} });

// ending of the test
function endTest(timedOut) { clearInterval(timerInterval);
timerInterval = null;

document.getElementById('cbtView').style.display = 'none';
document.getElementById('resultView').style.display = 'block';

const total = questions.length;
const pct = Math.round((score.correct / total) * 100);

document.getElementById('rsCorrect').textContent = score.correct;
document.getElementById('rsWrong').textContent = score.wrong + (total - score.correct - score.wrong);
document.getElementById('rsPct').textContent = pct + '%';

let title = 'Test Complete!';
let msg = '';

if (timedOut) title = 'Time Up!';

// complement after the test based on the score 

if (pct === 100) {
msg = 'Perfect score! You have mastered the Vedic sutras of this level. The ancient mathematicians would be proud.';}
else if (pct >= 80) {
msg = 'Excellent work! Your command of Vedic techniques is strong. A bit more practice and you will achieve mastery.';}  
else if (pct >= 60) {
msg = 'Good effort! Revisit the learning sections for the methods where you stumbled. Vedic maths rewards consistent practice.';}
else if (pct >= 40) {
msg = 'Keep going! Study the sutra explanations in the learning sections and try again. Every repetition builds speed.';}
else {
msg = 'The journey begins! Read through each method carefully, study the worked examples, then return to test yourself.';}

document.getElementById('resultTitle').textContent = title;
document.getElementById('resultMsg').textContent = msg;

resultMandalaInterval = animateResultMandala();
document.getElementById('resultView').scrollIntoView({ behavior: 'smooth', block: 'start' }); }

document.getElementById('retryBtn').addEventListener('click', () => { clearInterval(resultMandalaInterval);
drawMandala(document.getElementById('resultMandala'), 100, true); startTest();
});

showSection('home');

// :) 
