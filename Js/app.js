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
const number1Block = document.createElement('div'); 
const number2Block = document.createElement('div');
let numbersArray = [];
let numberToRender = 0;
const blockToRenderNumber1 = document.createElement('div');
blockToRenderNumber1.classList.add('number-block');
const blockToRenderNumber2 = document.createElement('div');
blockToRenderNumber2.classList.add('number-block');
let number1 = '';
let number2 = '';
let results = '';
const obtainNumber = (n,r = 0) =>{
  let number = '';
  for(let i = 0; i < n.childNodes.length - r; i++){
    number += n.childNodes[i].innerHTML;
  }
  return number;
}
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
})
// buttons functions
buttons.forEach(btn => {  
    btn.addEventListener('click', () => {
      if(!isNaN(Number(btn.innerHTML)) || btn.innerHTML === ','){
        numbersArray.push(btn.innerHTML);
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
      }else if(btn.innerHTML === '←'){
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
            screen.appendChild(separator());
            totalDiv.innerHTML = subs.substracting();
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
          }
        }
        if(number1Block.classList.value != '' && number2Block.classList.value != ''){// old way
          totalDiv.className = 'result';   
          number1 = obtainNumber(number1Block);
          number2 = obtainNumber(number2Block);              
        }else if(operator === '/' && number1Block.classList.value != ''){ // Divide
          let sentence = number1Block.childNodes;
          let dividend = '';
          let divider = '';
          sentence.forEach(element=>{
            if(element.className === '') dividend += element.textContent;
            if(element.className === 'divide_number') divider += element.textContent;
          })
          const divide = new Divider(dividend, divider);
          totalDiv.className = 'result-division';
          totalDiv.innerHTML = divide.render();
          screen.appendChild(totalDiv);
        }else if(operator === '^' && number1Block.classList.value != ''){ // Exponent
          const number = obtainNumber(number1Block);  
          const exponent = new Exponent(number);
          screen.appendChild(separator());
          screen.appendChild(exponent.render());
        }else if(operator === '√' && number1Block.classList.value != ''){ // square
          const number = obtainNumber(number1Block);
          const square = new Square(number);
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
      }else if(btn.innerHTML === '/'){ // multiply
        dividing = true;
        operator = '/'; 
        const divideRender = document.createElement('span');
        divideRender.className = 'divideSeparator';      
        number1Block.appendChild(divideRender);
      }else if(btn.innerHTML === '^'){ // exponent
        operator = '^'; 
        const exponentRender = document.createElement('span');
        exponentRender.innerHTML = ` ^`;       
        number1Block.appendChild(exponentRender);
        screen.appendChild(number1Block);
      }else if(btn.innerHTML === '√'){
        operator = '√';
        const sqrtRender = document.createElement('span');
        sqrtRender.innerHTML = ` √`;
        number1Block.appendChild(sqrtRender);
        screen.appendChild(number1Block);
      }else if(btn.innerHTML === 'P'){ // Prime Number
        if(number1Block.classList.value != ''){
          number1 = obtainNumber(number1Block);
          const numberPrime = new Prime(number1);
          screen.appendChild(numberPrime.render()); 
        }
      }
    });
});


