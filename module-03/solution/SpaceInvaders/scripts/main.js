const gameContainer = document.getElementById("game");
const player = new Player({ x: 300, y: 590 });
const game = new Game({
  container: gameContainer,
  player: player,
});
game.start();
// game.addBullet(
//   new Bullet({
//     x: 300,
//     y: 540,
//     width: 6,
//     height: 10,
//     color: "red",
//     speed: {
//       x: 0,
//       y: -200,
//     },
//   })
// );
