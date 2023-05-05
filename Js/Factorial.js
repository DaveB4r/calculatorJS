export default class Factorial{
  constructor(number){
    this.number = number;
    this.arr = [];
  }
  factor(n){
    if(n > 1){
      let fact = n * (n-1);
      this.arr.push(fact);
      return this.factor((n-2));
    }else{
      return 1;
    }
  }
  render(){
    this.factor(this.number);
    return this.arr.reduce((a,b)=> a*b);
  }
}