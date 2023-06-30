let num1 = '', num2 = '', operator = '';
let operatorExist = false;

const digits = Array.from(document.querySelector('#digits').children);
const display = document.querySelector('#display');
const operators = Array.from(document.querySelector('#operators').children);


digits.forEach(digit => digit.addEventListener('click', function () {
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
            operator = operatorInArray;
            operatorExist = true;
            display.textContent += ' ' + operatorInArray.innerHTML + ' ';
        }
    }));

const clear = document.querySelector('#clear');

clear.addEventListener('click', function () {
    operandString = '';
    display.textContent = '';
    operatorExist = false;
});

let add = (a, b) => (a + b);

let subtract = (a, b) => (a - b);

let multiply = (a, b) => a * b;

let division = (a, b) => b ? a / b : 'NaN';

function operate() {
    let res;
    num1 = Number(prompt('First number'));
    num2 = Number(prompt('Second number'));
    operator = prompt('+ - * / ?');
    switch (operator) {
        case '+': res = add(num1, num2);
            break;
        case '-': res = subtract(num1, num2);
            break;
        case '*': res = multiply(num1, num2);
            break;
        case '/': res = division(num1, num2);
            break;
    }
    console.log(res);
}
