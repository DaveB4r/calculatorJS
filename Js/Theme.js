export default class Theme{
  render(){
    const div = document.createElement("div");
    div.innerHTML = `<span id='theme' class='dark'></span>`;

    div.className = "theme-icon";
    return div;
  }
}