export default class Square{
  constructor(sentence) {
    this.sentence = sentence;
  }
  calculate(){
    const numbers = this.sentence.split('√');
    let result = 0;
    if(Number(numbers[0]) === 2 || numbers[0] === ''){ // square root
      result = Math.sqrt(Number(numbers[1]));
    }
    else if(Number(numbers[0]) === 3 ){ // cube root
      result = Math.cbrt(Number(numbers[1]));
    }
    return result;  
  }
  render(){
    const div = document.createElement('div');
    div.className = 'result';
    div.innerHTML = this.calculate();
    return div;
  }
}