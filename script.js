//use 0 as firstNumber by default
let firstNumber = 0;    
let secondNumber = '';
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

// to play audio for when clicking a button
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
    //to erase the 0 in display
    if(display.textContent === '0'){
        display.textContent = '';
    }
    //if first number input not done, input it
    if (operatorExist === false) {
        firstNumber += digit.innerHTML;
    }
    //else input second number
    else {
        secondNumber += digit.innerHTML;
    }
    display.textContent += digit.innerHTML;
}));

percentageBtn.addEventListener('click', function(){
    console.log('here');
    firstNumber = Number(firstNumber)/100;
    res.textContent = firstNumber;
    display.textContent = firstNumber;
});

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
            operate(Number(firstNumber), Number(secondNumber), operator);
            operator = nextOperator;
            display.textContent = lastResult + ' ' + nextOperator + ' ';
            firstNumber = lastResult;
            secondNumber = '';
            startnextOperation = false;
        }
    }));

equalBtn.addEventListener('click', function () {
    // only operate when both numbers have been inputted
    if (firstNumber !== '' && secondNumber !== '') {
        operate(Number(firstNumber), Number(secondNumber), operator);
        
    }
});

clearBtn.addEventListener('click', clearFn);

//reset all flags and variables EXCEPT lastResult
function clearFn() {
    display.textContent = '0';
    startnextOperation = false;
    operatorExist = false;
    firstNumber = 0;
    secondNumber = '';
    result = '';
    res.textContent = '0';
}

//use lastResult for next operations
previousAnswerBtn.addEventListener('click', function () {
    //if it already contains 0, don't add another 0
    if(display.textContent === '0')
        return;
    //for using lastresult completely as firstNumber
    if (startnextOperation === true) {
        firstNumber = lastResult;
        display.textContent = firstNumber;
    }
    //for adding lastresult to existing firstNumber
    else if (operatorExist === false && startnextOperation === false) {
        firstNumber = parseInt(firstNumber).toString()
        firstNumber += lastResult;
        display.textContent = firstNumber;
    }
    //for adding lastresult to secondNumber
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
        default: result = 'Undefined';
    }
    // only display result if it is a number
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
