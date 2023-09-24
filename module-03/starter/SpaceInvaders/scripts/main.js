const gameContainer = document.getElementById("game");
const player = new Player({ x: 300, y: 590 });
const game = new Game({
  container: gameContainer,
  player: player,
});
game.start();
