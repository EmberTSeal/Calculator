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

const digits = Array.from(document.querySelectorAll('.digit'));
const display = document.querySelector('#display');
const operators = Array.from(document.querySelectorAll('.operator'));
const equalBtn = document.querySelector('#equal');
const deleteBtn = document.querySelector('#delete');
const clearBtn = document.querySelector('#clear');
const percentageBtn = document.querySelector('#percentage');
const previousAnswerBtn = document.querySelector('#ans');
const res = document.querySelector('#result');
const audio = document.querySelector('audio');

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
        operand1 += digit.innerHTML;
        operand1 = parseInt(operand1).toString();
    }
    //else input operand2
    else {
        operand2 += digit.innerHTML;
        operand2 = parseInt(operand2).toString();
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
        else if ((operatorExist === true && operand2!=='')|| startnextOperation === true) {
            let nextOperator = operatorInArray.innerHTML;
            operate();
            operator = nextOperator;
            display.textContent = lastResult + ' ' + nextOperator + ' ';
            operand1 = lastResult;
            operand2 = '';
            startnextOperation = false;
        }
        //clicking operators multiple times
        else if(operatorExist === true && operand2 === ''){
            operator = operatorInArray.innerHTML;
            display.textContent = operand1 + ' ' + operator + ' ';
        }
    }));

equalBtn.addEventListener('click', function () {
    // only operate when both numbers have been inputted
    if (operand1 !== '' && operand2 !== '') {
        operate();

    }
});

clearBtn.addEventListener('click', clearFn);

//reset all flags and variables EXCEPT lastResult
function clearFn() {
    display.textContent = '0';
    res.textContent = '0';
    resetVariables();
}

deleteBtn.addEventListener('click', function () {
    //to delete first number
    if (operatorExist === false && operand1 !== '') {
        operand1 = deleteFromLast(operand1);
        if (operand1 === '') {
            display.textContent = '0';
            operand1 = 0;
        }
        else
            display.textContent = operand1;
    }
    else if (operand2 !== '' && operatorExist === true) {
        operand2 = deleteFromLast(operand2);
        display.textContent = operand1 + ' ' + operator + ' ' + operand2;
    }
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
    console.log('here');
    operand1 = Number(operand1) / 100;
    res.textContent = operand1;
    display.textContent = operand1;
});

//use lastResult for next operations
previousAnswerBtn.addEventListener('click', function () {
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
        if(reset === true)
            reset = false;
    }
    //for adding lastresult to existing operand1
    else if (operatorExist === false && startnextOperation === false) {
        operand1 = parseInt(operand1).toString();
        if (lastResult >= 0)
            operand1 += lastResult;
        else {
            operand1 += Math.abs(lastResult);
        }
        display.textContent = operand1;
    }
    //for adding lastresult to operand2
    else if (operatorExist === true) {
        if (operand2 === ''){
            operand2 = lastResult;
        }   
        else {
            operand2 = parseInt(operand2).toString();
            if (lastResult >= 0)
                operand2 += lastResult;
            else {
                operand2 += Math.abs(lastResult);
            }
        }
        display.textContent = operand1 + ' ' + operator + ' ' + operand2;
    }
});

function resetVariables() {
    startnextOperation = false;
    operatorExist = false;
    operand1 = 0;
    operand2 = '';
    result = '';
    reset = true;
}


let add = (a, b) => (a + b);

let subtract = (a, b) => (a - b);

let multiply = (a, b) => a * b;

function division(a, b) {
    if (b != 0) {
        return (a / b);
    }
    else {
        res.textContent = "ERROR!";
        return 'error';
    }
}

function operate() {
    operand1 = parseInt(operand1);
    operand2 = parseInt(operand2);
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
            result = result.toPrecision(4);
        res.innerHTML = result;
        startnextOperation = true;
        lastResult = result;
    }
    else {
        operand2 = '';
        display.textContent = operand1 + ' ' + operator + ' ';
    }
}
