const numberInput = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
];

function displayOutput(text) {
    output.textContent = text;
}

function convertToRoman(num) {
    let result = '';
    
    for (const { value, numeral } of romanNumerals) {
        while (num >= value) {
            result += numeral;
            num -= value;
        }
    }
    
    return result;
}

function validateInput(inputValue) {
    // Check if input is empty or not a number
    if (!inputValue || isNaN(inputValue)) {
        return "Please enter a valid number";
    }

    const num = parseInt(inputValue);

    // Check for negative numbers
    if (num < 1) {
        return "Please enter a number greater than or equal to 1";
    }

    // Check for numbers greater than 3999
    if (num >= 4000) {
        return "Please enter a number less than or equal to 3999";
    }

    return null; // No validation errors
}

function handleConversion() {
    const inputValue = numberInput.value;
    
    // Validate input
    const validationError = validateInput(inputValue);
    if (validationError) {
        displayOutput(validationError);
        return;
    }

    // Convert number to roman numeral
    const num = parseInt(inputValue);
    const romanNumeral = convertToRoman(num);
    displayOutput(romanNumeral);
}

// Event Listeners
convertBtn.addEventListener('click', handleConversion);

numberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleConversion();
    }
});