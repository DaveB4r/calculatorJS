export default class NumberCalc {
  constructor(number) {
    this.number = number;
  }
  render(classAdded){
    const span = document.createElement('span');
    if(classAdded != '') span.classList.add(classAdded);
    span.innerText = this.number;
    return span;
  }
}