class Game {
  constructor({ container, player }) {
    this.container = container;
    this.player = player;
    this.isPaused = false;
    this.keyStates = {
      ArrowLeft: false,
      ArrowRight: false,
      " ": false,
    };
    this.bullets = [];
  }

  addBullet(bullet) {
    this.bullets.push(bullet);
    this.container.appendChild(bullet.element);
  }

  removeBullet(bullet) {
    const index = this.bullets.indexOf(bullet);
    if (index > -1) {
      // remove 1 bullet from the array starting at the index of the bullet we found
      this.bullets.splice(index, 1);
      bullet.element.remove();
    }
  }

  updateBullets(deltaTime) {
    this.bullets.forEach((bullet) => {
      bullet.move(deltaTime);
      if (
        bullet.isOutOfBounds(
          this.container.clientHeight,
          this.container.clientWidth
        )
      ) {
        this.removeBullet(bullet);
      } else {
        bullet.draw();
      }
    });
  }

  setupPlayerControls() {
    this.keydownHandler = (e) => {
      if (this.keyStates.hasOwnProperty(e.key)) {
        this.keyStates[e.key] = true;
      }
    };
    this.keyupHandler = (e) => {
      if (this.keyStates.hasOwnProperty(e.key)) {
        this.keyStates[e.key] = false;
      }
    };
    window.addEventListener("keydown", this.keydownHandler);
    window.addEventListener("keyup", this.keyupHandler);
  }

  start() {
    this.setupPlayerControls();
    let lastTime = 0;
    const gameLoop = (timeStamp) => {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;

      if (this.keyStates.ArrowLeft) {
        this.player.move("left", deltaTime);
      }
      if (this.keyStates.ArrowRight) {
        this.player.move("right", deltaTime);
      }
      if (this.keyStates[" "]) {
        const bullet = this.player.shootIfReady(deltaTime);
        if (bullet) {
          this.addBullet(bullet);
        }
      } else {
        this.player.refreshCooldown(deltaTime);
      }
      this.updateBullets(deltaTime);

      this.player.draw();

      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }
}
