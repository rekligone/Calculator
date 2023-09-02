let operator;
let number1 = '';
let number2 = null;
let operatorNow = null;
let result = null;
let operatorCount = 0;
let numberPressed = false;
let equalPressed = false;

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
const operatorDisplay = document.querySelector('#displayOperator');

function add(num1, num2){
    if(parseInt(num1 + num2) !== num1 + num2){
        return (num1 + num2).toFixed(3);
    }
    return num1 + num2;
}

function substract(num1, num2){
    if(parseInt(num1 - num2) !== num1 - num2){
        return (num1 - num2).toFixed(3);
    }
    return num1 - num2;
}

function multiply(num1, num2){
    if(parseInt(num1 * num2) !== num1 * num2){
        return (num1 * num2).toFixed(3);
    }
    return num1 * num2;
}

function divide(num1, num2){
    if(parseInt(num1 / num2) !== num1 / num2){
        return (num1 / num2).toFixed(3);
    }
    return num1 / num2;
}

function operate(operator, num1, num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    operatorDisplay.textContent = ''
    switch (operator){
        case "+":
            return add(num1, num2);
        case "-":
            return substract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            if(num2 === 0){
                display.textContent = 'I can\'t :(';
                return display.textContent
            }else{
                return divide(num1, num2);
            }
    }
}

function numberFirst(number){
    if(number1.length < 7){
        if(operatorNow === null){
        number1 += `${number}`
        display.textContent = number1;
        number2 = ''
        }else{
            numberSecond(number)
        }
    }else if(operatorNow !== null){
        numberSecond(number)
    }
}

function operatorPressed(operator){
    if (operatorCount === 0){
        operatorDisplay.textContent = number1 + ' ' + operator;
        operatorNow = operator;
        display.textContent = '0';
        operatorCount = 1;
        numberPressed = false;
    }else if (operatorCount === 1 && numberPressed === true){
        result = operate(operatorNow, number1, number2)
        operatorDisplay.textContent = result + ' ' + operator;
        operatorCount = 2;
        number2 = '';
        operatorNow = operator;
        numberPressed = false;
    }else if(operatorCount === 2 && numberPressed === true){
        if(number2 !== null){
            result = operate(operatorNow, result, number2)
        }
        operatorDisplay.textContent = result + ' ' + operator;
        number2 = '';
        operatorNow = operator;
        numberPressed = false;
    }
}

function numberSecond(number){
    if(number2.length < 7){
        number2 += `${number}`;
        display.textContent = number2;
    }
}

function clear(){
    operator;
    number1 = '';
    number2 = null;
    operatorNow = null;
    result = null;
    operatorCount = 0;
    numberPressed = false;
    equalPressed = false;
    if (display.textContent === 'I can\'t :('){

    }else if(display.textContent.length > 10){
        const fontSize = document.querySelector('#display')
        fontSize.style.fontSize = '32px';
        display.textContent = 'I don\'t have enough space!'
    }else{
        display.textContent = 0;
    }
    operatorDisplay.textContent = '';
}

function addDot(){
    if (result !== null){
        operatorDisplay.textContent = result + ' ' + operatorNow;
    }
    if(operatorNow === null && `${number1}`.includes('.') === false){
        if(+display.textContent === 0){
            number1 = '0';
        }
        number1 += `.`;
        display.textContent = number1;
    }else if(operatorNow !== null && `${number2}`.includes('.') === false){
        if(number2 === '' || number2 === null){
            number2 = '0';
        }
        number2 += `.`;
        display.textContent = number2;
    }
}

function del(number){
        if(number !== '' && number !== 0 && numberPressed === true){
            number = Array.from(number);
            number = number.splice(1, number.length - 1).join('')
            console.log(number)
            display.textContent = number
            if (Array.from(number).length === 0){
                number = ''
                display.textContent = number
            }
        }
        return number
}

for (let i = 0; i < buttons.length ; i++){
    buttons[i].addEventListener('click', () => {
        if(buttons[i].className === 'operand'){
            const fontSize = document.querySelector('#display')
            fontSize.style.fontSize = '64px';
            if(equalPressed === true){
                number2 = '';
            }
            if(numberPressed === false){
                numberPressed = true;
                numberFirst(buttons[i].textContent);
            }else{
                numberFirst(buttons[i].textContent);
            }
        }else if(buttons[i].className === 'operator'){
            if (numberPressed === true){
                operatorPressed(buttons[i].textContent);
            }else if(equalPressed === true){
                equalPressed = false;
                numberPressed = true;
                operatorPressed(buttons[i].textContent);
            }
        }else if(buttons[i].id === 'equal'){
            if (numberPressed === true && number2 !== ''){
                if(operatorCount === 1){
                    if(operate(operatorNow, number1,  number2) === 'I can\'t :('){
                        clear()
                    }else{
                        result = operate(operatorNow, number1, number2);
                        operatorCount = 2;
                    }
                }else{
                    if(operate(operatorNow, result, number2) === 'I can\'t :('){
                        clear()
                    }else{
                    console.log(result)
                    result = operate(operatorNow, result, number2);
                    }
                }
                if(display.textContent === 'I can\'t :('){
                }else{
                    display.textContent = result
                    number2 = null;
                    numberPressed = false;
                    equalPressed = true;
                }
                if(display.textContent.length > 10){
                    clear()
                }
            }
        }else if(buttons[i].id === 'dot'){
                addDot()
        }else if(buttons[i].id === 'clear'){
            clear()
        }else{
            if(operatorNow === null){
                number1 = del(number1)
            }else{
                number2 = del(number2)
            }
            
        }
    });
}