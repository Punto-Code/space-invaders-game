const gameContainer = document.getElementById("game");
const player = new Player({ x: 300, y: 590 });
const game = new Game({
  container: gameContainer,
  player: player,
});
game.start();
const db = new Dexie("HighScoresDB");

db.version(1).stores({
  scores: "++id, name, score",
});
