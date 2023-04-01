export default class Divider{
  constructor(dividend, divider) {
    this.dividend = dividend;
    this.divider = divider;
  }
  calculate(){
    return this.dividend / this.divider;
  }
  render(){
    return this.calculate();
  }
}