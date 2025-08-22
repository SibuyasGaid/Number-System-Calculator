// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function showMenu() {
    showPage('menu');
}

// Option 1: Convert Decimal to Binary/Octal/Hex
function convertFromDecimal() {
    const decimal = parseInt(document.getElementById('decimal-input').value);
    const result = document.getElementById('decimal-result');
    
    if (isNaN(decimal)) {
        result.innerHTML = '<span class="error">Please enter a valid decimal number!</span>';
        result.style.display = 'block';
        return;
    }

    const binary = decimal.toString(2);
    const octal = decimal.toString(8);
    const hex = decimal.toString(16).toUpperCase();

    result.innerHTML = `
        <span class="success">Conversion Results:</span>
        Decimal: ${decimal}
        Binary: ${binary}
        Octal: ${octal}
        Hexadecimal: ${hex}
    `;
    result.style.display = 'block';
}

// Option 2: Convert to Decimal
function convertToDecimal() {
    const base = parseInt(document.getElementById('base-select').value);
    const number = document.getElementById('base-input').value.trim();
    const result = document.getElementById('to-decimal-result');

    if (!number) {
        result.innerHTML = '<span class="error">Please enter a number!</span>';
        result.style.display = 'block';
        return;
    }

    try {
        const decimal = parseInt(number, base);
        if (isNaN(decimal)) {
            throw new Error('Invalid number for selected base');
        }

        const baseName = base === 2 ? 'Binary' : base === 8 ? 'Octal' : 'Hexadecimal';
        
        result.innerHTML = `
            <span class="success">Conversion Result:</span>
            ${baseName}: ${number.toUpperCase()}
            Decimal: ${decimal}
        `;
        result.style.display = 'block';
    } catch (error) {
        result.innerHTML = '<span class="error">Invalid number for the selected base!</span>';
        result.style.display = 'block';
    }
}

// Option 3: Add Numbers
function addNumbers() {
    const firstBase = parseInt(document.getElementById('first-base').value);
    const secondBase = parseInt(document.getElementById('second-base').value);
    const firstNumber = document.getElementById('first-number').value.trim();
    const secondNumber = document.getElementById('second-number').value.trim();
    const result = document.getElementById('add-result');

    if (!firstNumber || !secondNumber) {
        result.innerHTML = '<span class="error">Please enter both numbers!</span>';
        result.style.display = 'block';
        return;
    }

    try {
        const firstDecimal = parseInt(firstNumber, firstBase);
        const secondDecimal = parseInt(secondNumber, secondBase);
        
        if (isNaN(firstDecimal) || isNaN(secondDecimal)) {
            throw new Error('Invalid numbers');
        }

        const sum = firstDecimal + secondDecimal;
        const baseName1 = getBaseName(firstBase);
        const baseName2 = getBaseName(secondBase);

        result.innerHTML = `
            <span class="success">Addition Result:</span>
            ${baseName1} ${firstNumber.toUpperCase()} (${firstDecimal} in decimal)
            + ${baseName2} ${secondNumber.toUpperCase()} (${secondDecimal} in decimal)
            = ${sum} (decimal)
            
            Result in different bases:
            Decimal: ${sum}
            Binary: ${sum.toString(2)}
            Octal: ${sum.toString(8)}
            Hexadecimal: ${sum.toString(16).toUpperCase()}
        `;
        result.style.display = 'block';
    } catch (error) {
        result.innerHTML = '<span class="error">Invalid numbers for their respective bases!</span>';
        result.style.display = 'block';
    }
}

function getBaseName(base) {
    switch(base) {
        case 2: return 'Binary';
        case 8: return 'Octal';
        case 16: return 'Hexadecimal';
        default: return 'Decimal';
    }
}

// Option 4: Encode Message
function encodeMessage() {
    const message = document.getElementById('encode-message').value;
    const key = parseInt(document.getElementById('encode-key').value);
    const result = document.getElementById('encode-result');

    if (!message || isNaN(key)) {
        result.innerHTML = '<span class="error">Please enter both message and secret key!</span>';
        result.style.display = 'block';
        return;
    }

    const encodedDecimal = [];
    const encodedHex = [];

    for (let i = 0; i < message.length; i++) {
        const charCode = message.charCodeAt(i);
        const encoded = charCode + key;
        encodedDecimal.push(encoded);
        encodedHex.push(encoded.toString(16).toUpperCase());
    }

    result.innerHTML = `
        <span class="success">Encoding Result:</span>
        Original Message: "${message}"
        Secret Key: ${key}
        
        Encoded (Decimal): ${encodedDecimal.join(', ')}
        Encoded (Hexadecimal): ${encodedHex.join(', ')}
    `;
    result.style.display = 'block';
}

// Option 5: Decode Message
function decodeMessage() {
    const encodedInput = document.getElementById('decode-message').value.trim();
    const key = parseInt(document.getElementById('decode-key').value);
    const result = document.getElementById('decode-result');

    if (!encodedInput || isNaN(key)) {
        result.innerHTML = '<span class="error">Please enter both encoded values and secret key!</span>';
        result.style.display = 'block';
        return;
    }

    try {
        const encodedValues = encodedInput.split(',').map(val => val.trim());
        let decodedMessage = '';
        let isHex = false;

        // Check if input is hexadecimal
        if (encodedValues.some(val => /[a-fA-F]/.test(val))) {
            isHex = true;
        }

        for (let value of encodedValues) {
            let numValue;
            if (isHex) {
                numValue = parseInt(value, 16);
            } else {
                numValue = parseInt(value);
            }
            
            if (isNaN(numValue)) {
                throw new Error('Invalid encoded values');
            }
            
            const originalCharCode = numValue - key;
            decodedMessage += String.fromCharCode(originalCharCode);
        }

        result.innerHTML = `
            <span class="success">Decoding Result:</span>
            Encoded Values: ${encodedInput}
            Secret Key: ${key}
            Format: ${isHex ? 'Hexadecimal' : 'Decimal'}
            
            Decoded Message: "${decodedMessage}"
        `;
        result.style.display = 'block';
    } catch (error) {
        result.innerHTML = '<span class="error">Invalid encoded values! Please check your input format.</span>';
        result.style.display = 'block';
    }
}

// Clear results when switching pages
function clearResults() {
    document.querySelectorAll('.result').forEach(result => {
        result.style.display = 'none';
    });
}

// Add event listeners to clear results when inputs change
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', clearResults);
    });
});
