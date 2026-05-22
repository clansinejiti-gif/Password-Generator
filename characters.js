const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:'\",.<>/?";

let pass1El = document.getElementById("pass1");
let pass2El = document.getElementById("pass2");
let passDiv = document.getElementById("pass-div");
let lengthInput = document.getElementById("numChoosen");
let errorMsg = document.getElementById("error-msg");

const checkboxes = {
    lowercase: document.getElementById("lowercase"),
    uppercase: document.getElementById("uppercase"),
    numbers: document.getElementById("numbers"),
    symbols: document.getElementById("symbols")
};

function getAllowedChars() {
    let chars = "";
    if (checkboxes.lowercase.checked) chars += lowercase;
    if (checkboxes.uppercase.checked) chars += uppercase;
    if (checkboxes.numbers.checked) chars += numbers;
    if (checkboxes.symbols.checked) chars += symbols;
    
    return chars || lowercase + uppercase; // fallback
}

function generatePassword(length) {
    const allowed = getAllowedChars();
    let password = "";
    
    for (let i = 0; i < length; i++) {
        password += allowed[Math.floor(Math.random() * allowed.length)];
    }
    return password;
}

function generatePass() {
    let length = parseInt(lengthInput.value);
    
    // Clear previous error
    errorMsg.style.display = "none";
    
    // Validation
    if (isNaN(length) || length < 8) {
        errorMsg.textContent = "❌ Minimum password length is 8";
        errorMsg.style.display = "block";
        lengthInput.value = 8;
        return;
    }
    
    if (length > 22) {
        errorMsg.textContent = "❌ Maximum password length is 22";
        errorMsg.style.display = "block";
        lengthInput.value = 22;
        return;
    }

    passDiv.style.display = "flex";
    
    pass1El.textContent = generatePassword(length);
    pass2El.textContent = generatePassword(length);
    lengthInput.value = null;
}

function copyText1() {
    const text = pass1El.textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Copied: ' + text);
    });
}

function copyText2() {
    const text = pass2El.textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Copied: ' + text);
    });
}

// Allow pressing Enter
lengthInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") generatePass();
});