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
    this.enemySpeed = {
      x: 0,
      y: 50,
    };
    this.enemyFiringCooldown = 3000;
    this.isPaused = false;
    this.isGameOver = false;
    this.score = 0;
    this.level = 1;
    this.scoreTargetForLevelUp = this.calculatePoints(1);
  }

  updateScore(points) {
    this.score += points;
    if (this.score >= this.scoreTargetForLevelUp) {
      this.levelUp();
      this.scoreTargetForLevelUp = this.calculatePoints(this.level);
    }
    this.updateTopBar({
      score: this.score,
    });
  }

  addHighScore(name, score) {
    return db.scores.add({
      name: name,
      score: score,
    });
  }

  async getHighScores() {
    return await db.scores.orderBy("score").reverse().toArray();
  }

  async displayHighScores() {
    const highScoresDiv = document.getElementById("highScoresList");
    const scores = await this.getHighScores();
    highScoresDiv.classList.add("gameOver");

    highScoresDiv.innerHTML = ""; // Clear previous scores

    scores.forEach((score) => {
      const scoreDiv = document.createElement("div");
      scoreDiv.textContent = `${score.name}: ${score.score}`;
      highScoresDiv.appendChild(scoreDiv);
    });
  }

  async handleGameOver() {
    this.isGameOver = true;
    this.togglePause();
    const messageElement = document.getElementById("message-display");
    messageElement.innerHTML = `Game Over! You scored ${this.score}<br/>`;
    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.addEventListener("click", (e) => {
      this.reset();
    });
    messageElement.append(playAgainButton);
    window.setTimeout(async () => {
      const name = window.prompt("Enter your name to store your high score!");
      if (name) {
        await this.addHighScore(name, this.score);
        await this.displayHighScores();
      }
    }, 3000);
  }

  updateTopBar({ level, score, message }) {
    if (level) {
      const levelElement = document.getElementById("level-display");
      levelElement.textContent = `Level: ${level}`;
    }
    if (score) {
      const scoreElement = document.getElementById("score-display");
      scoreElement.textContent = `Score: ${score}`;
    }
    const messageElement = document.getElementById("message-display");
    if (message) {
      messageElement.textContent = message;
    } else if (message === "") {
      messageElement.innerHTML = "";
    }
  }

  levelUp() {
    this.level += 1;
    this.enemySpeed.y *= 1.02;
    this.enemyFiringCooldown = Math.max(150, this.enemyFiringCooldown * 0.98);
    this.spawnInterval = Math.max(750, this.spawnInterval * 0.95);
    this.player.levelUp();
    this.updateTopBar({
      level: this.level,
      message: `Congratulations! You reached level ${this.level}`,
    });
    setTimeout(() => {
      if (!this.isGameOver) {
        this.updateTopBar({
          message: "",
        });
      }
    }, 3000);
  }

  calculatePoints(level) {
    let x = 0.1;
    let y = 1.8;
    return Math.round((level / x) ** y);
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
    document.getElementById("highScoresList").classList.remove("gameOver");
    this.timeSinceLastSpawn = 3000;
    this.spawnInterval = 3000;
    this.enemySpeed = {
      x: 0,
      y: 50,
    };
    this.enemyFiringCooldown = 3000;
    this.isPaused = false;
    this.isGameOver = false;
    this.score = 0;
    this.level = 1;
    this.updateTopBar({
      score: this.score,
      level: this.level,
      message: "",
    });
    this.scoreTargetForLevelUp = this.calculatePoints(1);
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
            this.updateScore(Math.floor(enemy.y));
            this.removeEnemy(enemy);
            this.removeBullet(bullet);
          }
        });

        // check for collisions between this bullet and the player
        if (bullet.speed.y > 0 && this.hasCollision(bullet, this.player)) {
          this.player.explode();
          this.handleGameOver();
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
          enemy.explode();
          this.handleGameOver();
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
          speed: this.enemySpeed,
          firingCooldown: this.enemyFiringCooldown,
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
