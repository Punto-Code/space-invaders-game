class Player {
  constructor({ x, y }) {
    this.element = document.getElementById("player");
    this.speed = 150;
    this.width = 74;
    this.height = 74;
    this.x = x || 0;
    this.y = y || 0;
    this.draw();
  }

  move(direction, deltaTime) {
    const delta = this.speed * (deltaTime / 1000);
    if (direction === "left") {
      this.x = Math.max(0, this.x - delta);
    } else if (direction === "right") {
      this.x = Math.min(664 - this.width, this.x + delta);
    }
  }

  draw() {
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}
