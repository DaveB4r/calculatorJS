export default class Input{
  render(number, className){
    let input = document.createElement('input');
    input.setAttribute('value', number);
    input.className = className;
    input.type = 'text';
    return input;
  }
}