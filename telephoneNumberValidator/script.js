document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const checkBtn = document.getElementById('check-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultsDiv = document.getElementById('results-div');

    function validatePhoneNumber(phoneNumber) {
        // Remove all whitespace first to check if empty
        if (!phoneNumber.trim()) {
            alert("Please provide a phone number");
            return false;
        }

        // Regular expression for valid US phone number formats
        const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[-\s]?(\d{3})[-\s]?(\d{4})$/;
        
        // Check for invalid country code
        if (phoneNumber.trim().startsWith('2') || 
            phoneNumber.trim().startsWith('0') || 
            phoneNumber.trim().startsWith('-') ||
            phoneNumber.trim().startsWith('11')) {
            return false;
        }

        return phoneRegex.test(phoneNumber);
    }

    function displayResult(number, isValid) {
        resultsDiv.textContent = `${isValid ? 'Valid' : 'Invalid'} US number: ${number}`;
        resultsDiv.className = isValid ? 'results valid' : 'results invalid';
    }

    checkBtn.addEventListener('click', function() {
        const phoneNumber = userInput.value;
        if (!phoneNumber.trim()) {
            alert("Please provide a phone number");
            return;
        }
        const isValid = validatePhoneNumber(phoneNumber);
        displayResult(phoneNumber, isValid);
    });

    clearBtn.addEventListener('click', function() {
        userInput.value = '';
        resultsDiv.textContent = '';
        resultsDiv.className = 'results';
    });

    // Add enter key support
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkBtn.click();
        }
    });
});