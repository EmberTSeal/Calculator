let num1 = '', num2 = '', operator = '';
let result;
let operatorExist = false;
let nextOperation = false;

const digits = Array.from(document.querySelector('#digits').children);
const display = document.querySelector('#display');
const operators = Array.from(document.querySelector('#operators').children);
const equal = document.querySelector('#equal');
const clear = document.querySelector('#clear');


digits.forEach(digit => digit.addEventListener('click', function () {
    if(nextOperation === true){
        nextOperation = false;
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
        if (operatorExist === false) {
            operator = operatorInArray.innerHTML;
            operatorExist = true;
            display.textContent += ' ' + operator + ' ';
        }
    }));

equal.addEventListener('click', function(){
    if(num1!='' && num2!=''){
        operate(Number(num1), Number(num2), operator);
    }
});

clear.addEventListener('click', clearFn);

function clearFn(){
        display.textContent = '';
        operatorExist = false;
        num1 = '';
        num2 = '';
        result = '';
}

let add = (a, b) => (a + b);

let subtract = (a, b) => (a - b);

let multiply = (a, b) => a * b;

let division = (a, b) => b ? a / b : 'NaN';

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
    const res = document.createElement('div');
    res.textContent = result;
    display.append(res);
    nextOperation = true;
}
