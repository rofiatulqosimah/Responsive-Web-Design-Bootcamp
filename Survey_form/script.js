function calculateResult() {
    const q1 = document.getElementById('q1').value;
    const q2 = document.getElementById('q2').value;
    const q3 = document.getElementById('q3').value;

    let visualCount = 0;
    let auditoryCount = 0;
    let kinestheticCount = 0;

    // Counting answers
    const answers = [q1, q2, q3];
    answers.forEach(answer => {
        if (answer === 'visual') visualCount++;
        if (answer === 'auditory') auditoryCount++;
        if (answer === 'kinesthetic') kinestheticCount++;
    });

    // Determining the result
    let result = '';
    if (visualCount >= auditoryCount && visualCount >= kinestheticCount) {
        result = 'You are a Visual Learner! You learn best through images, diagrams, and reading.';
    } else if (auditoryCount >= visualCount && auditoryCount >= kinestheticCount) {
        result = 'You are an Auditory Learner! You learn best by listening to explanations and discussions.';
    } else {
        result = 'You are a Kinesthetic Learner! You learn best through hands-on activities and direct experiences.';
    }

    // Display result
    document.getElementById('learningStyle').textContent = result;
    document.getElementById('result').style.display = 'block';
    document.getElementById('survey').style.display = 'none';
}