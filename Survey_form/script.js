const questions = [
    "Saya lebih suka belajar dengan mendengarkan penjelasan.",
    "Saya lebih mudah mengingat sesuatu jika melihatnya secara visual.",
    "Saya suka belajar dengan melakukan aktivitas fisik atau praktek langsung.",
    "Saya lebih suka berdiskusi dengan teman-teman saat belajar.",
    "Saya lebih mudah memahami materi jika membaca buku atau catatan.",
    "Saya suka mendengarkan musik saat belajar.",
    "Saya lebih suka menggambar atau membuat diagram untuk memahami sesuatu.",
    "Saya lebih suka belajar di luar ruangan atau sambil bergerak.",
    "Saya lebih mudah mengingat informasi jika menuliskannya.",
    "Saya suka bermain peran atau simulasi saat belajar."
];

let currentQuestion = 0;
let scores = {
    auditori: 0,
    visual: 0,
    kinestetik: 0
};

function displayQuestion() {
    document.getElementById('question').textContent = questions[currentQuestion];
}

function selectOption(option) {
    const score = 4 - (option - 1);
    if (currentQuestion % 3 === 0) {
        scores.auditori += score;
    } else if (currentQuestion % 3 === 1) {
        scores.visual += score;
    } else {
        scores.kinestetik += score;
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const quiz = document.getElementById('quiz');
    const nextBtn = document.getElementById('nextBtn');
    const result = document.getElementById('result');

    quiz.style.display = 'none';
    nextBtn.style.display = 'none';

    const maxScore = Math.max(scores.auditori, scores.visual, scores.kinestetik);
    let gaya = '';

    if (scores.auditori === maxScore) {
        gaya += 'Auditori ';
    }
    if (scores.visual === maxScore) {
        gaya += 'Visual ';
    }
    if (scores.kinestetik === maxScore) {
        gaya += 'Kinestetik ';
    }

    result.innerHTML = "Gaya belajar kamu adalah: <span style="color: #ff6b6b;">${gaya}</span><br>
                        Skor Auditori: ${scores.auditori}<br>
                        Skor Visual: ${scores.visual}<br>
                        Skor Kinestetik: ${scores.kinestetik}";
}

displayQuestion();