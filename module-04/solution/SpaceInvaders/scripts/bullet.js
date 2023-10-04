class Bullet {
  constructor({ x, y, width, height, color, speed }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.element = this.createElement();
  }

  createElement() {
    const el = document.createElement("div");
    el.className = "bullet";
    el.style.backgroundColor = this.color;
    el.style.width = `${this.width}px`;
    el.style.height = `${this.height}px`;
    el.style.borderRadius = "50%";
    el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    return el;
  }

  move(deltaTime) {
    this.y += this.speed.y * deltaTime/1000;
    this.x += this.speed.x * deltaTime/1000;
  }

  draw() {
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  isOutOfBounds(containerHeight, containerWidth) {
    // this.y is between -this.height and containerHeight + this.height
    const isInYRange = (-this.height < this.y) && (this.y < containerHeight + this.height);
    // this.x is between -this.width and containerWidth + this.width
    const isInXRange = (-this.width < this.x) && (this.x < containerWidth + this.width);
    // return true if the bullet is not within both x and y range
    return !(isInYRange && isInXRange);
  }
}
