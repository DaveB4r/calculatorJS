import Screen from "./Screen.js";
import Keyword from "./Keyword.js";
import Multiply from "./Multiply.js";
import NumberCalc from "./NumberCalc.js";
import Sum from "./sum.js";
import Substract from "./Substract.js";
import Theme from "./Theme.js";
import Divider from "./Divide.js";
import Prime from "./Prime.js";
import Exponent from "./Exponent.js";
import Square from "./Square.js";
const themeIcon = new Theme();
document.body.appendChild(themeIcon.render());
const theme = document.getElementById('theme');
const root = document.getElementById('root');
const screen = new Screen().render();
const keyword = new Keyword().render();
root.appendChild(screen);
root.appendChild(keyword);
const buttons = document.querySelectorAll('.button-keyword');
let operate = false;
let operator = '';
const number1Block = document.createElement('div');
const number2Block = document.createElement('div');
let number1 = '';
let number2 = '';
let results = '';
let dividing = false;
let classAdded = '';
const obtainNumber = (n,r = 0) =>{
  let number = '';
  for(let i = 0; i < n.childNodes.length - r; i++){
    number += n.childNodes[i].innerHTML;
  }
  return number;
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
      if(!isNaN(Number(btn.innerHTML)) || btn.innerHTML === '.'){
        const myNumber = new NumberCalc(btn.innerHTML);
        if(!operate){
          number1Block.className = 'number1';
          if(dividing) classAdded = 'divide_number'
          number1Block.appendChild(myNumber.render(classAdded));
          screen.appendChild(number1Block);  
        }else{
          number2Block.className = 'number2';
          number2Block.appendChild(myNumber.render());
          screen.appendChild(number2Block);  
        }
      }else if(btn.innerHTML === '←'){
        if(number1Block.childNodes.length > 0 && number2Block.childNodes.length === 0){
          if(isNaN(number1Block.childNodes[number1Block.childNodes.length - 1])) operate = false; 
          number1Block.childNodes[number1Block.childNodes.length - 1].remove();
        } 
        if(number2Block.childNodes.length > 0) number2Block.childNodes[number2Block.childNodes.length - 1].remove();
      }else if(btn.innerHTML === 'C'){ // Clear
        window.location.reload();
      }else if(btn.innerHTML === '='){ // Equality
        const totalDiv = document.createElement('div');
        if(number1Block.classList.value != '' && number2Block.classList.value != ''){// if I have 2 blocks
          totalDiv.className = 'number2';   
          number1 = obtainNumber(number1Block, 1);
          number2 = obtainNumber(number2Block);              
          if(operator === '*'){ // Multiply
            screen.appendChild(separator());
            const multi = new Multiply(number1, number2);
            let total = 0;
            results = multi.processMultiply();
            results.forEach(num => {              
              if(results.length > 1){
                const resultDiv = document.createElement('div');
                resultDiv.className = 'number2';
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
          }else if(operator === '+'){ // Sum
            const sum = new Sum(number1, number2);
            screen.appendChild(separator());
            totalDiv.innerHTML = sum.adding();
            screen.appendChild(totalDiv);
          }else if(operator === '-'){ // Substract
            const subs = new Substract(number1, number2);
            screen.appendChild(separator());
            totalDiv.innerHTML = subs.substracting();
            screen.appendChild(totalDiv);
          }
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
        operator = '*'; 
        const multiRender = document.createElement('span');
        multiRender.innerHTML = ` X`;       
        number1Block.appendChild(multiRender);
        screen.appendChild(number1Block);
      }else if(btn.innerHTML === '+'){ // adding
        operate = true;
        operator = '+'; 
        const sumRender = document.createElement('span');
        sumRender.className = 'sum-symbol';
        sumRender.innerHTML = ` +`;       
        number1Block.appendChild(sumRender);
        screen.appendChild(number1Block);
      }else if(btn.innerHTML === '-'){ // substracting
        operate = true;
        operator = '-'; 
        const lessRender = document.createElement('span');
        lessRender.className = 'sum-symbol';
        lessRender.innerHTML = ` -`;       
        number1Block.appendChild(lessRender);
        screen.appendChild(number1Block);
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


