import Screen from "./Screen.js";
import Keyword from "./Keyword.js";
import Multiply from "./Multiply.js";
import Sum from "./sum.js";
import Substract from "./Substract.js";
import Theme from "./Theme.js";
import Divider from "./Divide.js";
import Prime from "./Prime.js";
import Exponent from "./Exponent.js";
import Square from "./Square.js";
import Input from "./Input.js";
const themeIcon = new Theme();
document.body.appendChild(themeIcon.render());
const theme = document.getElementById('theme');
const root = document.getElementById('root');
const screen = new Screen().render();
const keyword = new Keyword().render();
const inputNumber1 = new Input;
const inputNumber2 = new Input;
root.appendChild(screen);
root.appendChild(keyword);
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
  if(fractional) return `${integerWithPoint}.${fractional}`;
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
//working with keyboard
document.addEventListener('keydown', e =>{
  let keyValue = e.key;
  console.log(keyValue);
  if(!isNaN(keyValue)){
    addNumberToInput(keyValue);    
  }else if(keyValue === 'Escape'){
    window.location.reload();
  }else if(keyValue === 'Backspace'){
    removing();
  }
});
// buttons functions
buttons.forEach(btn => {  
    btn.addEventListener('click', () => {
      if(!isNaN(Number(btn.innerHTML)) || btn.innerHTML === ','){
        addNumberToInput(btn.innerHTML);
      }else if(btn.innerHTML === '←'){
        removing();        
      }else if(btn.innerHTML === 'C'){ // Clear
        window.location.reload();
      }else if(btn.innerHTML === '='){ // Equality
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('result');
        if(operate && operator !== ''){ // new way
          if(operator === '+'){ // Sum
            const sum = new Sum(inputNumber1.get().replaceAll('.',''), inputNumber2.get().replaceAll('.',''));
            screen.appendChild(separator());
            totalDiv.innerHTML = sum.adding();
            screen.appendChild(totalDiv);
          }else if(operator === '-'){
            const subs = new Substract(inputNumber1.get().replaceAll('.',''), inputNumber2.get().replaceAll('.',''));
            totalDiv.innerHTML = subs.substracting();
            screen.appendChild(separator());
            screen.appendChild(totalDiv);
          }else if(operator === '*'){
            const multi = new Multiply(inputNumber1.get().replaceAll('.',''), inputNumber2.get().replaceAll('.',''));
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
            totalDiv.innerHTML = total;
            screen.appendChild(totalDiv);
          }else if(operator === '/'){
            const divide = new Divider(inputNumber1.get().replaceAll('.',''), inputNumber2.get().replaceAll('.',''));
            totalDiv.innerHTML = divide.render();
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
      }else if(btn.innerHTML === 'X'){ // multiply
        operate = true;
        numbersArray = [];
        operator = '*'; 
        const multiRender = document.createElement('span');
        multiRender.innerHTML = ` x`;       
        blockToRenderNumber1.appendChild(multiRender);
        screen.appendChild(blockToRenderNumber1);
      }else if(btn.innerHTML === '+'){ // adding
        operate = true;
        numbersArray = [];
        operator = '+'; 
        const sumRender = document.createElement('span');
        sumRender.className = 'sum-symbol';
        sumRender.innerHTML = ` +`;    
        blockToRenderNumber1.appendChild(sumRender);
        screen.appendChild(blockToRenderNumber1);
      }else if(btn.innerHTML === '-'){ // substracting
        operate = true;
        numbersArray = [];
        operator = '-'; 
        const lessRender = document.createElement('span');
        lessRender.className = 'sum-symbol';
        lessRender.innerHTML = ` -`;       
        blockToRenderNumber1.appendChild(lessRender);
        screen.appendChild(blockToRenderNumber1);
      }else if(btn.innerHTML === '/'){ // dividing
        operate = true;
        numbersArray = [];
        operator = '/'; 
        const divideRender = document.createElement('span');
        divideRender.className = 'sum-symbol';
        divideRender.innerHTML = ' ÷'      
        blockToRenderNumber1.appendChild(divideRender);
        screen.appendChild(blockToRenderNumber1);
      }else if(btn.innerHTML === '^'){ // exponent
        operator = '^'; 
        const exponentRender = document.createElement('span');
        exponentRender.innerHTML = '^'; 
        numbersArray.push('^');      
        blockToRenderNumber1.appendChild(exponentRender);
        screen.appendChild(blockToRenderNumber1);
      }else if(btn.innerHTML === '√'){
        operator = '√';
        const sqrtRender = document.createElement('span');
        sqrtRender.innerHTML = ` √`;
        numbersArray.push('√');
        blockToRenderNumber1.appendChild(sqrtRender);
        screen.appendChild(blockToRenderNumber1);
      }else if(btn.innerHTML === 'P'){ // Prime Number
        const numberPrime = new Prime(numbersArray.join(''));
        screen.appendChild(numberPrime.render());
      }
    });
});