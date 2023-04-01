export default class Exponent{
  constructor(sentence) {
    this.sentence = sentence;
  }
  descompose(){
    const numbers = this.sentence.split('^');
    return Math.pow(numbers[0],numbers[1]);
  }
  render(){
    const div = document.createElement('div');
    div.innerHTML = this.descompose();
    return div;
  }

}