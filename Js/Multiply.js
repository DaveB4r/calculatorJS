export default class Multiply {
  constructor(n1, n2) {
    this.n1 = n1;
    this.n2 = n2;
  }
  processMultiply(){
    let number = this.n2;
    let splitNumber = String(number).split('');
    let zeros = '';
    let result = 0;
    let resultArray = [];
    splitNumber.reverse();
    splitNumber.forEach((num,key) => {
      result = this.n1 * num;
      if(key > 0){
        zeros += '0';
      }
      result = String(result) + zeros;
      resultArray.push(String(result));
    })
    return resultArray;
  }
}