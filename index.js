const generateBtn = document.getElementById('generateBtn');
const includeUpperEl = document.getElementById('uppercase');
const includeNumberEl = document.getElementById('numbers');
const includeSymbolEl = document.getElementById('symbols');
let includeUpper = null;
let includeNumber = null;
let includeSymbol = null;

let lowerAlphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let upperAlphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split("");


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const generatePassword = (passwordLength, includeUpper, includeNumber, includeSymbol) => {
    let passwordArr = [];
    passwordArr = passwordArr.concat(lowerAlphabets);

    if (includeUpper) {
        passwordArr = passwordArr.concat(upperAlphabets);
    }
    if (includeNumber) {
        passwordArr = passwordArr.concat(numbers);
    }
    if (includeSymbol) {
        passwordArr = passwordArr.concat(symbols);
    }

    let password = [];
    for (let i = 0; i < passwordLength; i++) {
        const random = getRndInteger(0, passwordArr.length);
        const passCharacter = passwordArr[random];
        password.push(passCharacter);
    }

    password = password.join("");
    return password;
};

const renderPassword = (password) => {
    const passwordEl = document.getElementById('password');
    passwordEl.innerText = password;
};

generateBtn.addEventListener("click", () => {
    const passwordLength = document.getElementById('range').value;
    includeUpper = includeUpperEl.checked ? true : false;
    includeNumber = includeNumberEl.checked ? true : false;
    includeSymbol = includeSymbolEl.checked ? true : false;

    const password = generatePassword(passwordLength, includeUpper, includeNumber, includeSymbol);

    renderPassword(password);
    resetTooltip();
});

const highlightCheckedBox = (event) => {
    const labelEl = event.target.previousElementSibling;
    if (event.target.checked == true) {
        labelEl.classList.remove("check");
    } else {
        labelEl.classList.add("check");
    }
};

function hoverTooltip(e) {
    const passwordEl = document.getElementById('password');
    if (passwordEl.innerText !== "") {
        document.getElementById("tooltip").style.display = "block";
        let x = e.clientX;
        let y = e.clientY;
        const offsetX = -500;
        const offsetY = -260;
        document.getElementById("tooltip").style.left = x + offsetX + "px";
        document.getElementById("tooltip").style.top = y + offsetY + "px";
    } else {
        document.getElementById("tooltip").style.display = "none";
    }
}

function resetTooltip() {
    navigator.clipboard.writeText("");
    let tooltip = document.getElementById('tooltip');
    tooltip.innerText = "Click to Copy!";
    tooltip.style.backgroundColor = "rgb(52, 42, 42)";
}

function copyPassword() {
    let password = document.getElementById('password');
    if (password.innerText !== "") {
        navigator.clipboard.writeText(password.innerText);
        let tooltip = document.getElementById('tooltip');
        tooltip.innerText = "Copied";
        tooltip.style.backgroundColor = "#c01c28";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const range = document.getElementById('range');
    const passRangeValue = document.getElementById('passRangeValue');
    passRangeValue.innerHTML = range.value;
    range.oninput = function () {
        passRangeValue.innerHTML = this.value;
    };
});