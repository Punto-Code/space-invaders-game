const gameContainer = document.getElementById("game");
const player = new Player({ x: 300, y: 590 });
const game = new Game({
  container: gameContainer,
  player: player,
  sounds: {
    backgroundMusic: new AudioController({
      src: "https://res.cloudinary.com/dm5zvhgto/video/upload/v1698872766/punto-code/space-invaders/audio/Horizon_by_Ikson_jmgqy7.mp3",
      volume: 0.2,
      isLoop: true,
    }),
    playerShot: new AudioController({
      src: "https://res.cloudinary.com/dm5zvhgto/video/upload/v1699243611/punto-code/space-invaders/audio/playerShot_tzodfl.wav",
      volume: 0.5,
    }),
    playerExplosion: new AudioController({
      src: "https://res.cloudinary.com/dm5zvhgto/video/upload/v1699243611/punto-code/space-invaders/audio/playerExplosion_funboh.wav",
      volume: 0.7,
    }),
    enemyShot: new AudioController({
      src: "https://res.cloudinary.com/dm5zvhgto/video/upload/v1699243611/punto-code/space-invaders/audio/enemyShot_vhuna1.wav",
      volume: 0.6,
    }),
    enemyExplosion: new AudioController({
      src: "https://res.cloudinary.com/dm5zvhgto/video/upload/v1699243611/punto-code/space-invaders/audio/enemyExplosion_jafxs1.wav",
      volume: 0.5,
    }),
    levelUp: new AudioController({
      src: "https://res.cloudinary.com/dm5zvhgto/video/upload/v1699644905/punto-code/space-invaders/audio/pickupCoin_n2bjgj.wav",
      volume: 0.5,
    }),
    gameOver: new AudioController({
      src: "https://res.cloudinary.com/dm5zvhgto/video/upload/v1699243611/punto-code/space-invaders/audio/gameOver_blcjpc.wav",
      volume: 0.7,
    }),
  },
});
document.getElementById("start-game").addEventListener("click", () => {
  game.start();
  document.querySelector("details").removeAttribute("open");
  document.getElementById("message-display").innerHTML = "";
});
document.getElementById("volume-slider").addEventListener("input", (e) => {
  AudioController.setVolumeForAll(Number(e.target.value) / 100);
});
const db = new Dexie("HighScoresDB");

db.version(1).stores({
  scores: "++id, name, score",
});