class Player {
  constructor({ x, y }) {
    this.element = document.getElementById("player");
    this.speed = 150;
    this.width = 50;
    this.height = 50;
    this.x = x || 0;
    this.y = y || 0;
    this.draw();
    this.firingCooldown = 500;
    this.bulletSpeed = { x: 0, y: -200 };
    this.lastShotTime = -this.firingCooldown;
  }

  levelUp() {
    this.speed = Math.round(this.speed * 1.015);
    this.firingCooldown = Math.max(50, Math.round(this.firingCooldown * 0.95));
    this.bulletSpeed.y = Math.max(-300, Math.round(this.bulletSpeed.y * 1.02));
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

  shootIfReady(deltaTime) {
    // update the timeSinceLast shot by adding the deltaTime amount
    this.lastShotTime += deltaTime;
    // if the time since our last shot has met or exceeded the cooldown
    if (this.lastShotTime >= this.firingCooldown) {
      // then we'll reset the time since our last shot to 0
      this.lastShotTime = 0;
      // and fire a bullet
      return this.shoot();
    }
    // we return null from this method if no shot is fired so we know
    // when we call the method whether or not a bullet was fired
    return null;
  }

  refreshCooldown(deltaTime) {
    this.lastShotTime += deltaTime;
  }

  center() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }

  shoot() {
    const bulletWidth = 6;
    const bulletHeight = 10;
    return new Bullet({
      x: this.center().x - bulletWidth / 2,
      y: this.y - bulletHeight / 2,
      width: bulletWidth,
      height: bulletHeight,
      color: "red",
      speed: this.bulletSpeed,
    });
  }

  explode() {
    this.element.classList.add("exploded");
  }

  reset() {
    this.x = 300;
    this.element.classList.remove("exploded");
    this.draw();
    this.firingCooldown = 500;
    this.bulletSpeed = { x: 0, y: -200 };
    this.lastShotTime = -this.firingCooldown;
  }
}
