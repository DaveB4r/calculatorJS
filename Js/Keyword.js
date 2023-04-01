export default class Keyword {
  render(){
    let container = document.createElement('div');
    let content = `
    <div class="container-keyword">
      <div class="row-keyword">
        <div class="button-keyword btn-dark" title="Clear">C</div>
        <div class="button-keyword btn-dark" title="Square Root">&#8730;</div>
        <div class="button-keyword btn-dark" title="Fraction">1/2</div>
        <div class="button-keyword btn-dark" title="Rule of three" id="ro3">RO3</div>
      </div>
      <div class="row-keyword">
        <div class="button-keyword btn-dark" title="Prime Number">P</div>
        <div class="button-keyword btn-dark" title="Exponent">^</div>
        <div class="button-keyword btn-dark" title="Descompose">D</div>
        <div class="button-keyword btn-dark" title="Delete">←</div>
      </div>
      <div class="row-keyword">
        <div class="button-keyword btn-dark">1</div>
        <div class="button-keyword btn-dark">2</div>
        <div class="button-keyword btn-dark">3</div>
        <div class="button-keyword btn-dark" title="Substract">-</div>
      </div>
      <div class="row-keyword">
        <div class="button-keyword btn-dark">4</div>
        <div class="button-keyword btn-dark">5</div>
        <div class="button-keyword btn-dark">6</div>
        <div class="button-keyword btn-dark" title="Add">+</div>
      </div>
      <div class="row-keyword">
        <div class="button-keyword btn-dark">7</div>
        <div class="button-keyword btn-dark">8</div>
        <div class="button-keyword btn-dark">9</div>
        <div class="button-keyword btn-dark" title="Multiply" id="product">X</div>
      </div>
      <div class="row-keyword">
        <div class="button-keyword btn-dark">.</div>
        <div class="button-keyword btn-dark">0</div>
        <div class="button-keyword btn-dark" title="Equality">=</div>
        <div class="button-keyword btn-dark" title="Divide">/</div>
      </div>
    </div>
    `
    container.innerHTML = content;
    return container;
  }
}