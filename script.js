let num1, num2, operator;

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
