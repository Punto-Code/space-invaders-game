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
    this.enemies = [];
    this.timeSinceLastSpawn = 3000;
    this.spawnInterval = 3000;
    this.isPaused = false;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.container.classList.add("paused");
    } else {
      this.container.classList.remove("paused");
    }
  }

  reset() {
    this.player.reset();
    this.bullets.forEach((bullet) => {
      bullet.element.remove();
    });
    this.bullets = [];
    this.enemies.forEach((enemy) => {
      enemy.element.remove();
      addSpawnPoint(enemy.spawnPoint);
    });
    this.enemies = [];
    if (this.isPaused) {
      this.togglePause();
    }
  }

  hasCollision(objectA, objectB) {
    const rectA = objectA.element.getBoundingClientRect();
    const rectB = objectB.element.getBoundingClientRect();

    return (
      rectA.left < rectB.right && // left of A is left of right of B
      rectA.right > rectB.left && // right of A is right of left of B
      rectA.top < rectB.bottom && // top of A is above bottom of B
      rectA.bottom > rectB.top // bottom of A is below top of B
    );
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
        // check for collisions between this bullet and any enemy
        this.enemies.forEach((enemy) => {
          if (bullet.speed.y < 0 && this.hasCollision(bullet, enemy)) {
            enemy.explode();
            this.removeEnemy(enemy);
            this.removeBullet(bullet);
          }
        });

        // check for collisions between this bullet and the player
        if (bullet.speed.y > 0 && this.hasCollision(bullet, this.player)) {
          this.player.explode();
          this.togglePause();
        }
        bullet.draw();
      }
    });
  }

  addEnemy(enemy) {
    this.enemies.push(enemy);
    this.container.appendChild(enemy.element);
  }

  removeEnemy(enemy) {
    const index = this.enemies.indexOf(enemy);
    if (index > -1) {
      // remove 1 enemy from the array starting at the index of the enemy we found
      this.enemies.splice(index, 1);
      addSpawnPoint(enemy.spawnPoint);
      setTimeout(() => {
        enemy.element.remove();
      }, 2000);
    }
  }

  updateEnemies(deltaTime) {
    this.spawnEnemies(deltaTime);
    this.enemies.forEach((enemy) => {
      enemy.move(deltaTime);
      if (
        enemy.isOutOfBounds(
          this.container.clientHeight,
          this.container.clientWidth
        )
      ) {
        this.removeEnemy(enemy);
      } else {
        // add conditional logic to check for collision here
        if (this.hasCollision(enemy, this.player)) {
          this.player.explode();
          this.togglePause();
          enemy.explode();
        } else {
          enemy.draw();
          const newBullet = enemy.shootIfReady(deltaTime);
          if (newBullet) {
            this.addBullet(newBullet);
          }
        }
      }
    });
  }

  spawnEnemies(deltaTime) {
    this.timeSinceLastSpawn += deltaTime;
    if (this.timeSinceLastSpawn >= this.spawnInterval) {
      const spawnPoint = getRandomSpawnPoint();
      this.addEnemy(
        new Enemy({
          x: spawnPoint.x,
          y: spawnPoint.y,
          speed: { x: 0, y: 50 },
          firingCooldown: 3000
        })
      );
      this.timeSinceLastSpawn = 0;
    }
  }

  setupPlayerControls() {
    this.keydownHandler = (e) => {
      if (this.keyStates.hasOwnProperty(e.key)) {
        this.keyStates[e.key] = true;
      }
      if (e.key === "p" || e.key === "P") {
        this.togglePause();
      }
      if (e.key === "r" || e.key === "R") {
        this.isPaused && this.reset();
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

      // all updating logic should run when game is unpaused
      if (!this.isPaused) {
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

        this.updateEnemies(deltaTime);
      }

      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }
}
