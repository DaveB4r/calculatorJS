import Screen from "./Screen.js";
import Keyboard from "./Keyboard.js";
import Multiply from "./Multiply.js";
import Sum from "./sum.js";
import Substract from "./Substract.js";
import Theme from "./Theme.js";
import Divider from "./Divide.js";
import Prime from "./Prime.js";
import Exponent from "./Exponent.js";
import Square from "./Square.js";
import Input from "./Input.js";
import Descompose from "./Descompose.js";
import Factorial from "./Factorial.js";
const themeIcon = new Theme();
document.body.appendChild(themeIcon.render());
const theme = document.getElementById('theme');
const root = document.getElementById('root');
const screen = new Screen().render();
const keyboard = new Keyboard().render();
const inputNumber1 = new Input;
const inputNumber2 = new Input;
root.appendChild(screen);
root.appendChild(keyboard);
const buttons = document.querySelectorAll('.button-keyword');
let operate = false;
let operator = '';
let numbersArray = [];
let numberToRender = 0;
const blockToRenderNumber1 = document.createElement('div');
blockToRenderNumber1.classList.add('number-block');
const blockToRenderNumber2 = document.createElement('div');
blockToRenderNumber2.classList.add('number-block');
let results = '';
const addThousandsSeparator = number =>{
  const [integer, fractional] = number.toString().split(',');
  const integerWithPoint = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if(fractional) return `${integerWithPoint},${fractional}`;
  else return integerWithPoint
}
const separator = () =>{
  let div = document.createElement('div');
  div.innerHTML = '<hr>';
  return div
} 
// change theme 
theme.addEventListener('click', () =>{
  theme.classList.toggle('dark');
  theme.classList.toggle('light');
  if(theme.className === 'dark'){
    document.body.className = "dark-theme"
    buttons.forEach(btn =>{
      btn.classList.toggle("btn-dark");
      btn.classList.toggle("btn-light");
    })
  }else{
    document.body.className = "light-theme"
    buttons.forEach(btn =>{
      btn.classList.toggle("btn-dark");
      btn.classList.toggle("btn-light");
    })
  }
});
// adding numbers to calculator
const addNumberToInput = num => {
  numbersArray.push(num);
  numberToRender = numbersArray.join('');
  if(!operate){
    inputNumber1.set(addThousandsSeparator(numberToRender));
    blockToRenderNumber1.innerHTML = inputNumber1.render('input-number1').outerHTML;   
    screen.appendChild(blockToRenderNumber1);  
  }else{
    inputNumber2.set(addThousandsSeparator(numberToRender));
    blockToRenderNumber2.innerHTML = inputNumber2.render('input-number2').outerHTML;
    screen.appendChild(blockToRenderNumber2);  
  }
}
// backSpace
const removing = () =>{
  if(inputNumber2.get() !== undefined && inputNumber2.get() !== ''){
    numbersArray.pop();
    inputNumber2.set(addThousandsSeparator(numbersArray.join('')));
    blockToRenderNumber2.innerHTML = inputNumber2.render('input-number2').outerHTML;
    screen.appendChild(blockToRenderNumber2);  
  }else{
    if(blockToRenderNumber1.childNodes[1]){
      blockToRenderNumber1.childNodes[1].remove();
      operate = false;
    } 
    else{
      let numberToRender = inputNumber1.get();
      numberToRender = numberToRender.replaceAll('.','');
      numberToRender = numberToRender.substring(0, numberToRender.length - 1);
      numbersArray.pop();
      inputNumber1.set(addThousandsSeparator(numberToRender));
      blockToRenderNumber1.innerHTML = inputNumber1.render('input-number1').outerHTML;   
      screen.appendChild(blockToRenderNumber1);
      blockToRenderNumber2.remove();
    }          
  }
}
//Render basics operations
const renderOperating = symbol => {
  let symbolToRender = '';
  switch (symbol) {
    case '*':
      symbolToRender = ' x'
      break;
    case '+':
      symbolToRender = ' +'
      break;
    case '-':
      symbolToRender = ' -'
      break;
    case '/':
      symbolToRender = ' ÷'
      break;
  
    default:
      break;
  }
  operate = true;
  numbersArray = [];
  operator = symbol; 
  const renderOperator = document.createElement('span');
  renderOperator.innerHTML = symbolToRender;       
  blockToRenderNumber1.appendChild(renderOperator);
  screen.appendChild(blockToRenderNumber1);
  
}
const operating = () =>{
  const totalDiv = document.createElement('div');
  totalDiv.classList.add('result');
  if(operate && operator !== ''){ // new way
    const number1 = inputNumber1.get().replaceAll('.','').replaceAll(',','.');
    const number2 = inputNumber2.get().replaceAll('.','').replaceAll(',','.');
    if(operator === '+'){ // Sum
      const sum = new Sum(number1, number2);
      screen.appendChild(separator());
      totalDiv.innerHTML = addThousandsSeparator(sum.adding());
      screen.appendChild(totalDiv);
    }else if(operator === '-'){
      const subs = new Substract(number1, number2);
      totalDiv.innerHTML = addThousandsSeparator(subs.substracting());
      screen.appendChild(separator());
      screen.appendChild(totalDiv);
    }else if(operator === '*'){
      const multi = new Multiply(number1, number2);
      screen.appendChild(separator());
      let total = 0;
      results = multi.processMultiply();
      results.forEach(num => {              
        if(results.length > 1){
          const resultDiv = document.createElement('div');
          resultDiv.className = 'result';
          resultDiv.innerHTML = num;
          screen.appendChild(resultDiv);
        }
        total += Number(num);
      });
      if(results.length > 1){
        screen.appendChild(separator());           
      }
      totalDiv.innerHTML = addThousandsSeparator(total);
      screen.appendChild(totalDiv);
    }else if(operator === '/'){
      const divide = new Divider(number1, number2);
      totalDiv.innerHTML = addThousandsSeparator(divide.render());
      screen.appendChild(separator());
      screen.appendChild(totalDiv);
    }
  }else if(operator === '^'){ // Exponent
    const exponent = new Exponent(numberToRender);
    screen.appendChild(separator());
    screen.appendChild(exponent.render());
  }else if(operator === '√'){ // square
    const square = new Square(numberToRender);
    screen.appendChild(separator());
    screen.appendChild(square.render());
  }
}
//working with keyboard
document.addEventListener('keydown', e =>{
  let keyValue = e.key;
  if(!isNaN(keyValue)){
    addNumberToInput(keyValue);    
  }else if(keyValue === 'Escape'){
    window.location.reload();
  }else if(keyValue === 'Backspace'){
    removing();
  }else if(keyValue === '*'){
    renderOperating('*');
  }else if(keyValue === '+'){
    renderOperating('+');
  }else if(keyValue === '-'){
    renderOperating('-');
  }else if(keyValue === '/'){
    renderOperating('/');
  }else if(keyValue === 'Enter'){
    operating();
  }else if(keyValue === '.'){
    addNumberToInput(',');
  }
});
// buttons functions

buttons.forEach(btn => {  
    btn.addEventListener('click', () => {
      if(!isNaN(Number(btn.innerHTML)) || btn.innerHTML === ','){
        addNumberToInput(btn.innerHTML);
      }else if(btn.innerHTML === '←'){ //Back space
        removing();        
      }else if(btn.innerHTML === 'C'){ // Clear
        window.location.reload();
      }else if(btn.innerHTML === '='){ // Equality
        operating();
      }else if(btn.innerHTML === 'X'){ // multiply
        renderOperating('*');
      }else if(btn.innerHTML === '+'){ // adding
        renderOperating('+');
      }else if(btn.innerHTML === '-'){ // substracting
        renderOperating('-');
      }else if(btn.innerHTML === '/'){ // dividing
        renderOperating('/');
      }else if(btn.innerHTML === '^'){ // exponent
        operator = '^'; 
        const exponentRender = document.createElement('span');
        exponentRender.innerHTML = '^'; 
        numbersArray.push('^');      
        blockToRenderNumber1.appendChild(exponentRender);
        screen.appendChild(blockToRenderNumber1);
      }else if(btn.innerHTML === '√'){ // square
        operator = '√';
        const sqrtRender = document.createElement('span');
        sqrtRender.innerHTML = ` √`;
        numbersArray.push('√');
        blockToRenderNumber1.appendChild(sqrtRender);
        screen.appendChild(blockToRenderNumber1);
      }else if(btn.innerHTML === 'P'){ // Prime Number
        const numberPrime = new Prime(numbersArray.join(''));
        screen.appendChild(numberPrime.render());
      }else if(btn.innerHTML === 'D'){ // Descomposing
        const numberToDescompose = new Descompose();
        screen.appendChild(numberToDescompose.render(numbersArray.join('')));
      }else if(btn.innerHTML === '!'){
        const factorialRender = document.createElement('span');
        factorialRender.innerHTML = '!';
        const factor = new Factorial(numbersArray.join(''));
        numbersArray.push('!');
        blockToRenderNumber1.appendChild(factorialRender);
        screen.appendChild(blockToRenderNumber1);
        screen.appendChild(separator());
        const divFactorial = document.createElement('div');
        divFactorial.className = 'result';
        divFactorial.innerHTML = addThousandsSeparator(factor.render());
        screen.appendChild(divFactorial);
      }
    });
});