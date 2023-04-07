export default class Input{
  set(number){
    return this.number = number;
  }
  get(){
    return this.number;
  }
  render(className){
    let input = document.createElement('input');
    input.setAttribute('value', this.number);
    input.className = className;
    input.type = 'text';
    return input;
  }
}