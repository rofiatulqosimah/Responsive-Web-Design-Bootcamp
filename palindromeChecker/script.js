const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const result = document.getElementById('result');

function cleanString(str) {
    return str.replace(/[\W_]/g, '').toLowerCase();
}

function checkPalindrome(str) {
    const cleanStr = cleanString(str);
    return cleanStr === cleanStr.split('').reverse().join('');
}

function animateResult(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 100);
}

function showResult(text, isPalindrome) {
    const originalText = text;
    result.textContent = `${originalText} ${isPalindrome ? 'is' : 'is not'} a palindrome`;
    result.className = isPalindrome ? 'result-success' : 'result-error';
    animateResult(result);
}

checkBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    
    if (!text) {
        alert('Please input a value');
        return;
    }

    const isPalindrome = checkPalindrome(text);
    showResult(text, isPalindrome);
});

textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkBtn.click();
    }
});

// Easter egg animation
textInput.addEventListener('input', () => {
    checkBtn.style.transform = 'rotate(' + (Math.random() * 2 - 1) + 'deg)';
});