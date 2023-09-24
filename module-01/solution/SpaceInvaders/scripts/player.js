class Player {
  constructor({ x, y }) {
    this.element = document.getElementById("player");
    this.speed = 150;
    this.x = x || 0;
    this.y = y || 0;
    this.draw();
  }

  draw() {
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}
