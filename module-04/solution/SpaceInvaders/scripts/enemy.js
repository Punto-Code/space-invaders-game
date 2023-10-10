class Enemy {
  constructor({ x, y, speed }) {
    this.x = x;
    this.y = y;
    this.spawnPoint = { x: x, y: y };
    this.width = 46;
    this.height = 83;
    this.speed = speed;
    this.element = this.createElement();
    this.draw();
  }

  createElement() {
    const el = document.createElement("div");
    el.className = "enemy";
    el.style.width = `${this.width}px`;
    el.style.height = `${this.height}px`;
    return el;
  }

  move(deltaTime) {
    this.y += this.speed.y * (deltaTime / 1000); // Move vertically
    this.x += this.speed.x * (deltaTime / 1000); // Move horizontally
  }

  draw() {
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  isOutOfBounds(containerHeight, containerWidth) {
    // this.y is between -this.height and containerHeight + this.height
    const isInYRange =
      -this.height < this.y && this.y < containerHeight + this.height;
    // this.x is between -this.width and containerWidth + this.width
    const isInXRange =
      -this.width < this.x && this.x < containerWidth + this.width;
    // return true if the enemy is not within both x and y range
    return !(isInYRange && isInXRange);
  }
}
