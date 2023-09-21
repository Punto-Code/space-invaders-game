class Player {
  constructor({ x, y }) {
    this.element = document.getElementById("player");
    this.speed = 5;
    this.x = x || 0;
    this.y = y || 0;
    this.positionElement(this.x, this.y);
  }

  positionElement(x, y) {
    this.x = x;
    this.y = y;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}
