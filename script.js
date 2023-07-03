//use 0 as operand1 by default
let operand1 = 0;
let operand2 = '';
let operator = '';
let result = '';

//for storing the result of last calculation
let lastResult = 0;
//flag to determine if first number and operator input is done
let operatorExist = false;
//flag to determine if one operation ended and next operation can be continued
let startnextOperation = false;
//if reset has been performed
let reset = false;
//to prevent overflow
const maxInputSize = 16;
//to increase screenSize after this size
const maxCharsInLine = 22;

const digits = Array.from(document.querySelectorAll('.digit'));
const display = document.querySelector('#display');
const operators = Array.from(document.querySelectorAll('.operator'));
const equalBtn = document.querySelector('#equal');
const deleteBtn = document.querySelector('#delete');
const clearBtn = document.querySelector('#clear');
const percentageBtn = document.querySelector('#percentage');
const dotBtn = document.querySelector('#dot');
const previousAnswerBtn = document.querySelector('#ans');
const res = document.querySelector('#result');
const audio = document.querySelector('audio');

function increaseScreenSize() {
    document.querySelector('.calculator').style.height = '450px';
    document.querySelector('#display-box').style.height = '100px';
}

document.querySelectorAll('button').forEach(
    button => button.addEventListener('click', function () {
        audio.currentTime = 0;
        audio.play();
    }));

digits.forEach(digit => digit.addEventListener('click', function () {
    //clear previous numbers if next operation is to be started
    if (startnextOperation === true) {
        clearFn();
    }
    if (display.textContent === '0') {
        display.textContent = '';
    }
    //if operand1 input not done, input it
    if (operatorExist === false) {
        if (operand1.toString().length === maxInputSize)
            return;
        operand1 += digit.innerHTML;
        operand1 = parseFloat(operand1).toString();

    }
    //else input operand2
    else {
        if (operand2.toString().length === maxInputSize)
            return;
        else if (operand2.toString().length + operand1.toString().length === maxCharsInLine) {
            increaseScreenSize();
        }
        operand2 += digit.innerHTML;
        operand2 = parseFloat(operand2).toString();
    }
    display.textContent += digit.innerHTML;
}));

operators.forEach(operatorInArray =>
    operatorInArray.addEventListener('click', function () {
        //for first operation: if operator hasn't been inputted yet
        if (operatorExist === false) {
            operator = operatorInArray.innerHTML;
            operatorExist = true;
            display.textContent += ' ' + operator + ' ';
        }
        //to enable chaining operations together, evaluating a pair at one time
        else if ((operatorExist === true && operand2 !== '') || startnextOperation === true) {
            let nextOperator = operatorInArray.innerHTML;
            operate();
            operator = nextOperator;
            display.textContent = lastResult + ' ' + nextOperator + ' ';
            operand1 = lastResult;
            operand2 = '';
            startnextOperation = false;
        }
        //clicking operators multiple times
        else if (operatorExist === true && operand2 === '') {
            operator = operatorInArray.innerHTML;
            display.textContent = operand1 + ' ' + operator + ' ';
        }
    }));


clearBtn.addEventListener('click', clearFn);

//reset all flags, variables and screensize [EXCEPT lastResult]
function clearFn() {
    display.textContent = '0';
    res.textContent = '0';
    resetVariables();
}

function resetVariables() {
    startnextOperation = false;
    operatorExist = false;
    operand1 = 0;
    operand2 = '';
    result = '';
    document.querySelector('.calculator').style.height = '';
    document.querySelector('#display-box').style.height = '';
    reset = true;
}

deleteBtn.addEventListener('click', function () {
    //if operand1 completely deleted, display should have 0
    if (operatorExist === false && operand1 !== '') {
        operand1 = deleteFromLast(operand1);
        if (operand1 === '') {
            display.textContent = '0';
            operand1 = 0;
        }
        else
            display.textContent = operand1;
    }
    //if operand2 completely deleted, display should have nothing in its place
    else if (operand2 !== '' && operatorExist === true) {
        operand2 = deleteFromLast(operand2);
        updateFullDisplay();
    }
    //to delete the operator
    else if (operatorExist === true && operand2 === '') {
        operator = '';
        operatorExist = false;
        display.textContent = operand1 + ' ';
    }
});

function deleteFromLast(operand) {
    operand = Array.from(operand);
    operand.pop();
    operand = operand.join('');
    return operand;
}

percentageBtn.addEventListener('click', function () {
    if (operatorExist === false) {
        operand1 = Number(operand1) / 100;
        display.textContent = operand1;
    }
    else if (operand2 !== '') {
        operand2 = Number(operand2) / 100;
        updateFullDisplay();
    }
});

dotBtn.addEventListener('click', function () {
    if (operatorExist === false) {
        operand1 = addDot(operand1);
        display.textContent = operand1;
    }
    else {
        operand2 = addDot(operand2);
        updateFullDisplay();
    }
});

function addDot(operand) {
    let dotExists = Array.from(operand.toString()).indexOf('.');
    //display as '0.22' instead of '.22'
    if (operand === '')
        operand += '0';
    //do not add more than one dot
    if (dotExists === -1)
        operand += '.';
    return operand;
}

previousAnswerBtn.addEventListener('click', function () {
    //do not allow for large results
    if (lastResult.toString().length >= maxInputSize) {
        return;
    }
    //to disable 0 duplication
    if (display.textContent === '0' && lastResult === 0)
        return;
    //for using lastresult completely as operand1
    if (startnextOperation === true || reset === true) {
        operand1 = lastResult;
        display.textContent = operand1;
        startnextOperation = false;
        operator = '';
        operand2 = '';
        operatorExist = false;
        if (reset === true)
            reset = false;
    }
    //for adding lastresult to existing operand1
    else if (operatorExist === false && startnextOperation === false) {
        operand1 = parseFloat(operand1).toString();
        if (lastResult >= 0)
            operand1 += lastResult;
        else {
            operand1 += Math.abs(lastResult);
        }
        display.textContent = operand1;
    }
    //for adding lastresult to operand2
    else if (operatorExist === true) {
        if (operand2 === '') {
            operand2 = lastResult;
        }
        //if operand2 already contains some digits
        else {
            operand2 = parseFloat(operand2).toString();
            if (lastResult >= 0)
                operand2 += lastResult;
            else {
                operand2 += Math.abs(lastResult);
            }
        }
        updateFullDisplay();
    }
});

equalBtn.addEventListener('click', function () {
    // only operate when both numbers and operator have been inputted
    if (operand1 !== '' && operand2 !== '' && operator!=='') {
        operate();

    }
});

function operate() {
    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);
    switch (operator) {
        case '+': result = add(operand1, operand2);
            break;
        case '-': result = subtract(operand1, operand2);
            break;
        case '*': result = multiply(operand1, operand2);
            break;
        case '/': result = division(operand1, operand2);
            break;
        default: result = 'error';
    }
    // only display result if it is a number
    if (result !== 'error') {
        if (!Number.isInteger(result))
            //round to 6 digits if result is not an integer
            result = Math.round((result + Number.EPSILON) * 1000000) / 1000000;
        res.innerHTML = result;
        startnextOperation = true;
        lastResult = result;
    }
    else {
        operand2 = '';
        display.textContent = operand1 + ' ' + operator + ' ';
    }
}

let add = (a, b) => (a + b);

let subtract = (a, b) => (a - b);

let multiply = (a, b) => a * b;

function division(a, b) {
    if (b != 0) {
        return (a / b);
    }
    else {
        res.style.fontSize = '25px';
        res.textContent = "ERROR: DIVISION BY 0";
        return 'error';
    }
}

function updateFullDisplay() {
    display.textContent = operand1 + ' ' + operator + ' ' + operand2;
}
