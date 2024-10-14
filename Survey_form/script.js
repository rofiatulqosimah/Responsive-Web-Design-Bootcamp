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

function startQuiz() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('nextBtn').style.display = 'block';
    displayQuestion();
}

function displayQuestion() {
    document.getElementById('question').textContent = questions[currentQuestion];
    resetOptions();
    updateProgress();
}

function selectOption(option) {
    const buttons = document.querySelectorAll('.option');
    buttons.forEach(button => button.classList.remove('selected'));

    const selectedButton = document.querySelector(`.option:nth-child(${option})`);
    selectedButton.classList.add('selected');

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
    if (!document.querySelector('.option.selected')) {
        alert('Silakan pilih salah satu opsi sebelum melanjutkan.');
        return;
    }

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
    const feedbackForm = document.getElementById('feedbackForm');
    const chartContainer = document.getElementById('chartContainer');

    quiz.style.display = 'none';
    nextBtn.style.display = 'none';

    const maxScore = Math.max(scores.auditori, scores.visual, scores.kinestetik);
    let gaya = [];
    let tips = [];

    if (scores.auditori === maxScore) {
        gaya.push('Auditori');
        tips.push("Cobalah belajar dengan mendengarkan kuliah, podcast, atau diskusi. Anda juga bisa mencoba membaca materi sambil mendengarkan musik yang menenangkan.");
    }
    if (scores.visual === maxScore) {
        gaya.push('Visual');
        tips.push("Manfaatkan gambar, diagram, dan video saat belajar. Menggunakan warna dan penandaan di catatan Anda juga bisa membantu.");
    }
    if (scores.kinestetik === maxScore) {
        gaya.push('Kinestetik');
        tips.push("Cobalah untuk melakukan aktivitas fisik saat belajar, seperti mencatat dengan tangan, atau belajar sambil bergerak.");
    }

    result.innerHTML = `
        <h2>Yeay! Ini adalah hasil tes kamu:</h2>
        <p>Gaya belajar dominan kamu adalah: <span style="color: #ff6b6b;">${gaya.join(' dan ')}</span></p>
        <p>${tips.join(' ')}</p>
        <p>Skor Auditori: ${scores.auditori}</p>
        <p>Skor Visual: ${scores.visual}</p>
        <p>Skor Kinestetik: ${scores.kinestetik}</p>
        <p>Tanggal tes: ${new Date().toLocaleDateString()}</p>
    `;

    chartContainer.style.display = 'block';
    createRadarChart();

    feedbackForm.style.display = 'block';
}

function createRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Auditori', 'Visual', 'Kinestetik'],
            datasets: [{
                label: 'Skor Gaya Belajar',
                data: [scores.auditori, scores.visual, scores.kinestetik],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 20,
                    stepSize: 5
                }
            }
        }
    });
}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;

    document.getElementById('submissionResult').innerHTML = `
        <p>Terima kasih, ${name}! Pendapat Anda telah dikirim.</p>
        <p>Kami menghargai masukan Anda untuk meningkatkan layanan kami.</p>
    `;

    document.getElementById('form').reset();
});

function resetOptions() {
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
        button.classList.remove('selected');
    });
}

function updateProgress() {
    const progressElement = document.getElementById('progress');
    progressElement.textContent = `Pertanyaan ${currentQuestion + 1} dari ${questions.length}`;
}

document.getElementById('quiz').style.display = 'none';
document.getElementById('nextBtn').style.display = 'none';