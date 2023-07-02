let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = '';
let lastResult = 0;
let operatorExist = false;  //flag to determine if first number and operator input is done.
let startnextOperation = false; //continue to next operation
let startFirstTime = false;

const digits = Array.from(document.querySelectorAll('.digit'));
const display = document.querySelector('#display');
const operators = Array.from(document.querySelectorAll('.operator'));
const equalBtn = document.querySelector('#equal');
const clearBtn = document.querySelector('#clear');
const previousAnswerBtn = document.querySelector('#ans');
const res = document.querySelector('#result');
const audio = document.querySelector('audio');

document.querySelectorAll('button').forEach( 
    button => button.addEventListener('click', function(){
    audio.currentTime = 0;
    audio.play();
}));

digits.forEach(digit => digit.addEventListener('click', function () {
    //to erase the 0 in display
    if(startFirstTime === false){
        startFirstTime = true; 
        display.textContent = '';
    }
    if (startnextOperation === true) {
        clearFn();
    }
    if (operatorExist === false) {
        firstNumber += digit.innerHTML;
    }
    else {
        secondNumber += digit.innerHTML;
    }
    display.textContent += digit.innerHTML;
}));

operators.forEach(operatorInArray =>
    operatorInArray.addEventListener('click', function () {
        if (startnextOperation === true) {
            operator = operatorInArray.innerHTML;
            startnextOperation = false;
            firstNumber = lastResult;
            secondNumber = '';
            display.textContent = firstNumber + ' ' + operator + ' ';
            operatorExist = true;
        }
        if (operatorExist === false) {
            if(startFirstTime === false){
                firstNumber = 0;
            }
            operator = operatorInArray.innerHTML;
            operatorExist = true;
            display.textContent += ' ' + operator + ' ';
        }
        else if (operatorExist === true) {
            let nextOperator = operatorInArray.innerHTML;
            operate(Number(firstNumber), Number(secondNumber), operator);
            operator = nextOperator;
            display.textContent = lastResult + ' ' + nextOperator + ' ';
            firstNumber = lastResult;
            secondNumber = '';
            startnextOperation = false;
        }
    }));

equalBtn.addEventListener('click', function () {
    if (firstNumber != '' && secondNumber != '') {
        operate(Number(firstNumber), Number(secondNumber), operator);
    }
});

clearBtn.addEventListener('click', clearFn);

function clearFn() {
    startFirstTime = false;
    display.textContent = '0';
    startnextOperation = false;
    operatorExist = false;
    firstNumber = '';
    secondNumber = '';
    result = '';
    res.textContent = '0';
}

previousAnswerBtn.addEventListener('click', function () {
    if (startnextOperation === true) {
        firstNumber = lastResult;
        display.textContent = firstNumber;
    }
    else if (operatorExist === false && startnextOperation === false) {
        firstNumber += lastResult;
        display.textContent = firstNumber;
    }
    else if (operatorExist === true) {
        secondNumber += lastResult;
        display.textContent += lastResult;
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

function operate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case '+': result = add(firstNumber, secondNumber);
            break;
        case '-': result = subtract(firstNumber, secondNumber);
            break;
        case '*': result = multiply(firstNumber, secondNumber);
            break;
        case '/': result = division(firstNumber, secondNumber);
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
        secondNumber = '';
    }
}
