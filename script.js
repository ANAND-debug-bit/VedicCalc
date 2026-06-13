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


