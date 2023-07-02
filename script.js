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

const digits = Array.from(document.querySelectorAll('.digit'));
const display = document.querySelector('#display');
const operators = Array.from(document.querySelectorAll('.operator'));
const equalBtn = document.querySelector('#equal');
const clearBtn = document.querySelector('#clear');
const percentageBtn = document.querySelector('#percentage');
const previousAnswerBtn = document.querySelector('#ans');
const res = document.querySelector('#result');
const audio = document.querySelector('audio');

document.querySelectorAll('button').forEach( 
    button => button.addEventListener('click', function(){
    audio.currentTime = 0;
    audio.play();
}));

digits.forEach(digit => digit.addEventListener('click', function () {
    //clear previous numbers if next operation is to be started
    if (startnextOperation === true) {
        clearFn();
    }
    if(display.textContent === '0'){
        display.textContent = '';
    }
    //if operand1 input not done, input it
    if (operatorExist === false) {
        operand1 += digit.innerHTML;
    }
    //else input operand2
    else {
        operand2 += digit.innerHTML;
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
        else if (operatorExist === true || startnextOperation === true) {
            let nextOperator = operatorInArray.innerHTML;
            operate(Number(operand1), Number(operand2), operator);
            operator = nextOperator;
            display.textContent = lastResult + ' ' + nextOperator + ' ';
            operand1 = lastResult;
            operand2 = '';
            startnextOperation = false;
        }
    }));

equalBtn.addEventListener('click', function () {
    // only operate when both numbers have been inputted
    if (operand1 !== '' && operand2 !== '') {
        operate(Number(operand1), Number(operand2), operator);
        
    }
});

clearBtn.addEventListener('click', clearFn);

//reset all flags and variables EXCEPT lastResult
function clearFn() {
    display.textContent = '0';
    res.textContent = '0';
    resetVariables();
}


percentageBtn.addEventListener('click', function(){
    console.log('here');
    operand1 = Number(operand1)/100;
    res.textContent = operand1;
    display.textContent = operand1;
});

//use lastResult for next operations
previousAnswerBtn.addEventListener('click', function () {
    //if display already contains 0, don't add another 0
    if(display.textContent === '0')
        return;
    //for using lastresult completely as operand1
    if (startnextOperation === true) {
        operand1 = lastResult;
        display.textContent = operand1;
    }
    //for adding lastresult to existing operand1
    else if (operatorExist === false && startnextOperation === false) {
        operand1 = parseInt(operand1).toString()
        operand1 += lastResult;
        display.textContent = operand1;
    }
    //for adding lastresult to operand2
    else if (operatorExist === true) {
        operand2 += lastResult;
        display.textContent += lastResult;
    }
});

function resetVariables(){
    startnextOperation = false;
    operatorExist = false;
    operand1 = 0;
    operand2 = '';
    result = '';
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

function operate(operand1, operand2, operator) {
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
        if(!Number.isInteger(result))
            result = result.toPrecision(4);
        res.innerHTML = result;
        startnextOperation = true;
        lastResult = result;
    }
    else {
        operand2 = '';
        display.textContent = operand1 + ' ' + operator + ' ' ;
    }
}
