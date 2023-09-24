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

      this.player.draw();

      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }
}
