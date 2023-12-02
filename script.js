let num1 = ""
let num2 = ""
let operator

function add(num1, num2) {
    return num1 + num2;
}
function subtract(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    if (num2 == 0) {
        return "ERROR"
    } else {
        return num1 / num2;
    }
}
function operate(num1, num2, operator) {
    if (operator === '+') {
        return add(num1, num2)
    }
    else if (operator === '-') {
        return subtract(num1, num2)
    }
    else if (operator === '*') {
        return multiply(num1, num2)
    }
    else if (operator === '/') {
        return divide(num1, num2)
    }
}
const n1 = document.querySelectorAll('.number');
const numbers = Array.from(n1);

const display = document.querySelector('.display')

let num = "";
let flag = true;

numbers.forEach(function(number) {
    number.addEventListener('click', function() {
        flag = true;
        if (operator === undefined && flag === true) {
            num = number.textContent;
            num1 += num;
            display.textContent = num1;
        } else if(flag === true) {
            num = number.textContent;
            num2 += num;
            display.textContent = num2;
        }
    })
})

const eval = document.querySelector('.evaluate');
eval.addEventListener('click', function() {
    flag = false;
    if (num2 === "") {
        display.textContent = num1;
    } else if (num2 != "" || num2 === 0) {
        num1 = Number(num1);
        num2 = Number(num2);
        num1 = operate(num1, num2, operator);
        num1 = roundResult(num1);
        display.textContent = num1;
        if (num1 === "ERROR") {
            num1 = "";
            operator = undefined;
        }
        num2 = "";
    }
})

const operators = Array.from(document.querySelectorAll('.operators'));
operators.forEach(function(operation) {
    operation.addEventListener('click', function() {
        flag = false;
        num1 = String(num1);
        num2 = String(num2);
        if (num1 != "") {
            if (num2 != "") {
                if (num1.charAt(num1.length - 1) == '.') {
                    num1 += "0";
                }
                if (num2.charAt(num2.length - 1) == '.') {
                    num2 += "0";
                }
                num1 = Number(num1);
                num2 = Number(num2);
                num1 = operate(num1, num2, operator);
                num1 = roundResult(num1);
                display.textContent = num1;
                if (num1 === "ERROR") {
                    num1 = "";
                    operator = undefined;
                }
                num2 = "";
            }
            operator = operation.textContent;
        }
    })
})

const clear = document.querySelector('.clear');
clear.addEventListener('click', function () {
    num1 = "";
    num2 = "";
    operator = undefined;
    display.textContent = "0";
})

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', function() {
    if (!display.textContent.includes(".")) {
        if (display.textContent == num1) {
            display.textContent += ".";
            num1 = display.textContent;
        } else {
            display.textContent += ".";
            num2 = display.textContent;
        }
    } else {
        display.textContent = display.textContent;
    }
})

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

const del = document.querySelector('.delete');
del.addEventListener('click', function() {
    if (display.textContent == num1) {
        num1 = num1.toString().slice(0, -1);
    } else {
        num2 = num2.toString().slice(0, -1);
    }
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === "") {
        display.textContent = "0";
    }
})