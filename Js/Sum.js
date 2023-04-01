export default class Sum {
  constructor(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
  }
  adding() {
    return Number(this.num1) + Number(this.num2);
  }
}