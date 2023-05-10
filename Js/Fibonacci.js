export default class Fibonacci{
  constructor(number) {
    this.number = Number(number);
    this.result = 0;
  }
  fibo(n){
    return n < 1 ? 0 
          : n === 1 ? 1 
          : this.fibo(n-1) + this.fibo(n-2);
  }
  render(){ 
    return this.fibo(this.number);
  }
}