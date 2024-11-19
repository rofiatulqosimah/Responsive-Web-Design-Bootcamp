const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

function validatePhoneNumber(number) {
    // Regular expression for valid US phone numbers
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;
    
    // Remove any non-alphanumeric characters for initial check
    const cleanNumber = number.replace(/[^\w\s-()]/g, '');
    
    // Check if the number starts with any digit other than 1
    if (/^[02-9]/.test(cleanNumber)) {
        return false;
    }
    
    // Check if the number contains exactly 10 digits (without country code)
    // or 11 digits (with country code '1')
    const digitCount = cleanNumber.replace(/\D/g, '').length;
    if (digitCount !== 10 && digitCount !== 11) {
        return false;
    }
    
    // If it has 11 digits, the first must be 1
    if (digitCount === 11 && !cleanNumber.startsWith('1')) {
        return false;
    }
    
    return regex.test(number);
}

function displayResult(number, isValid) {
    resultsDiv.textContent = `${isValid ? 'Valid' : 'Invalid'} US number: ${number}`;
    resultsDiv.style.color = isValid ? '#2f855a' : '#c53030';
}

checkBtn.addEventListener('click', () => {
    const phoneNumber = userInput.value.trim();
    
    if (!phoneNumber) {
        alert('Please provide a phone number');
        return;
    }
    
    const isValid = validatePhoneNumber(phoneNumber);
    displayResult(phoneNumber, isValid);
});

clearBtn.addEventListener('click', () => {
    userInput.value = '';
    resultsDiv.textContent = '';
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkBtn.click();
    }
});