export default class Descompose{
  constructor() {
    this.descomposition = [];
  }
  primeNumbers(){
    let prime = true;
    let pimeArray = [];
    for(let i = 2; i < 101; i++){
      for(let j = 2; j < i; j++){
        if(i % j === 0){
          prime = false;
          break;
        }
      }
      if(prime) pimeArray.push(i);
      prime = true;
    } 
    return pimeArray;    
  }
  descompose(num){
    if(num != 1){
      for(let prime of this.primeNumbers()){
        if(num % prime === 0){
          let result = num / prime;
          this.descomposition.push([num,prime]);
          this.descompose(result);
          break;
        }
      }
    }
    if(this.descomposition.length < 1) this.descomposition.push([num,num]);
    return this.descomposition;
  }

  render(num){
    let descomponing = this.descompose(num);
    let div = document.createElement('div');
    div.className = 'descompose';
    for(let i of descomponing){
      div.innerHTML += `<div><span>${i[0]}</span><span class="descompose-line">${i[1]}</span></div>`;
    }
    return div;
  }
}