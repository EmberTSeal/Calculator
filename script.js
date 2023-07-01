let num1 = '', num2 = '', operator = '';
let result = '';
let lastResult = '';
let operatorExist = false;
let startnextOperation = false;
let start = false;

const digits = Array.from(document.querySelectorAll('.digit'));
const display = document.querySelector('#display');
const operators = Array.from(document.querySelectorAll('.operator'));
const equalBtn = document.querySelector('#equal');
const clearBtn = document.querySelector('#clear');
const previousAnswerBtn = document.querySelector('#ans');
const res = document.querySelector('#result');

digits.forEach(digit => digit.addEventListener('click', function () {
    if(start === false){
        start = true; 
        display.textContent = '';
    }
    if (startnextOperation === true) {
        clearFn();
    }
    if (operatorExist === false) {
        num1 += digit.innerHTML;
    }
    else {
        num2 += digit.innerHTML;
    }
    display.textContent += digit.innerHTML;
}));

operators.forEach(operatorInArray =>
    operatorInArray.addEventListener('click', function () {
        if (startnextOperation === true) {
            operator = operatorInArray.innerHTML;
            startnextOperation = false;
            num1 = lastResult;
            num2 = '';
            display.textContent = num1 + ' ' + operator + ' ';
            operatorExist = true;
        }
        else if (operatorExist === false) {
            operator = operatorInArray.innerHTML;
            operatorExist = true;
            display.textContent += ' ' + operator + ' ';
        }
        else if (operatorExist === true) {
            let nextOperator = operatorInArray.innerHTML;
            operate(Number(num1), Number(num2), operator);
            operator = nextOperator;
            display.textContent = lastResult + ' ' + nextOperator + ' ';
            num1 = lastResult;
            num2 = '';
            startnextOperation = false;
        }
    }));

equalBtn.addEventListener('click', function () {
    if (num1 != '' && num2 != '') {
        operate(Number(num1), Number(num2), operator);
    }
});

clearBtn.addEventListener('click', clearFn);

function clearFn() {
    start = false;
    display.textContent = '0';
    startnextOperation = false;
    operatorExist = false;
    num1 = '';
    num2 = '';
    result = '';
    res.textContent = '0';
}

previousAnswerBtn.addEventListener('click', function () {
    if (startnextOperation === true) {
        num1 = lastResult;
        display.textContent = num1;
    }
    else if (operatorExist === false && startnextOperation === false) {
        num1 += lastResult;
        display.textContent = num1;
    }
    else if (operatorExist === true) {
        num2 = lastResult;
        display.textContent += num2;
    }
})

let add = (a, b) => (a + b);

let subtract = (a, b) => (a - b);

let multiply = (a, b) => a * b;

function division(a, b) {
    if (b != 0) {
        return (a / b);
    }
    else {
        alert('Division by 0 not allowed!');
        return 'Undefined';
    }
}

function operate(num1, num2, operator) {
    switch (operator) {
        case '+': result = add(num1, num2);
            break;
        case '-': result = subtract(num1, num2);
            break;
        case '*': result = multiply(num1, num2);
            break;
        case '/': result = division(num1, num2);
            break;
    }
    if (result !== 'Undefined') {
        if(!Number.isInteger(result))
            result = result.toPrecision(4);
        res.innerHTML = result;
        startnextOperation = true;
        lastResult = result;
    }
    else {
        num2 = '';
    }
}
