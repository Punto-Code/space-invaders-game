class Enemy {
  constructor({ x, y, speed, firingCooldown }) {
    this.x = x;
    this.y = y;
    this.spawnPoint = { x: x, y: y };
    this.width = 46;
    this.height = 83;
    this.speed = speed;
    this.element = this.createElement();
    this.draw();
    this.firingCooldown = firingCooldown;
    this.timeSinceLastShot = firingCooldown / 2;
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

  explode() {
    game.sounds.enemyExplosion.play();
    this.element.classList.add("exploded");
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
    game.sounds.enemyShot.play();
    return new Bullet({
      x: this.center().x - bulletWidth / 2,
      y: this.y + this.height - bulletHeight / 2,
      width: bulletWidth,
      height: bulletHeight,
      color: "red",
      speed: { x: 0, y: this.speed.y * 2 },
    });
  }

  shootIfReady(deltaTime) {
    // update the timeSinceLast shot by adding the deltaTime amount
    this.timeSinceLastShot += deltaTime;
    // if the time since our last shot has met or exceeded the cooldown
    if (this.timeSinceLastShot >= this.firingCooldown) {
      // then we'll reset the time since our last shot to 0
      this.timeSinceLastShot = 0;
      // and fire a bullet
      return this.shoot();
    }
    // we return null from this method if no shot is fired so we know
    // when we call the method whether or not a bullet was fired
    return null;
  }
}