export default class Substract{
  constructor(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
  }
  substracting(){
    return Number(this.num1) - Number(this.num2);
  }
}