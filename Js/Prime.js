export default class Prime{
  constructor(number) {
    this.number = number;
  }
  isPrime(){
    const div = document.createElement('div');
    const answer = document.createElement('p');
    let prime = `The number ${this.number} is a prime number`;
    for(let i = 2 ; i < this.number ; i++){
      if(this.number % i === 0) prime = `The number ${this.number} isn't a prime number`;
    }
    answer.innerHTML = prime;
    div.appendChild(answer);
    return div;
  }
  render(){ 
    return this.isPrime();
  }
}