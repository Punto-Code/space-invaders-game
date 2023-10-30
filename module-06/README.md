# Module 6: Keeping Score

## Agenda

- Conceptual Overview
- [**Displaying Messages to the User**](#1-displaying-messages-to-the-user)
  - [Introduction to In-Game Messages](#11-introduction-to-in-game-messages)
  - [Adding a Score to the Game](#12-adding-a-score-to-the-game)
  - [Implementing a Score Display](#13-implementing-a-score-display)
  - [Showing Level Progression](#14-showing-level-progression)
- [**Adding Difficulty Levels**](#2-adding-difficulty-levels)
  - [Making the Game More Difficult](#21-making-the-game-more-difficult)
  - [Making the Player Stronger When Leveling Up](#22-making-the-player-stronger-when-leveling-up)
  - [Tying Levels to the Player's Score](#23-tying-levels-to-the-players-score)
- [**Handling Game Over**](#3-handling-game-over)
  - [Storing High Scores with Dexie.js](#31-storing-high-scores-with-dexiejs)
    - [Setup](#311-setup)
    - [Initializing the Database](#312-initializing-the-database)
    - [Adding a High Score](#313-adding-a-high-score)
    - [Retrieving High Scores](#314-retrieving-high-scores)
    - [Displaying High Scores on the Webpage](#315-displaying-high-scores-on-the-webpage)
  - [Displaying Game Over and Restart Prompts](#32-handling-game-over)
    - [handleGameOver](#321-handleGameOver)
    - [invoking handleGameOver](#322-invoking-handleGameOver)
    - [Hiding the Score and Game Over Message When Resetting the Game](#323-hiding-the-score-and-game-over-message-when-resetting-the-game)
    - [Updating the Top Bar Display](#324-updating-the-top-bar-display)
    - [Resetting the Difficulty Level](#325-resetting-the-difficulty-level)

Certainly! Here's a more in-depth concept overview that introduces the key ideas for this lesson, incorporating code snippets as in your example:

---

## Concept Overview

### 1. **Feedback Loops**

In video games, feedback keeps players informed about their progress and achievements. When you earn points, collect coins, or reach a checkpoint, the game often responds with sounds, visuals, or even text messages.

**Example**: Think of the "ding" sound when Mario collects a coin. It immediately tells the player they've done something right.

Here's a simple code snippet that could be used to play a sound effect when an achievement is unlocked:

```javascript
function playSoundEffect(soundFile) {
  let audio = new Audio(soundFile);
  audio.play();
}

playSoundEffect("coin-collected.mp3");
```

### 2. **Leveling Up**

As you progress in games, the difficulty often increases. This is known as "leveling up." New challenges are introduced, making the game more interesting.

**Example**: In many games, when you move to a higher level, enemies might move faster, or new obstacles might be introduced.

A simple code-based representation of this:

```javascript
function increaseDifficulty(level) {
  let enemySpeed = 1 + level * 0.1; // enemies move 10% faster with each level
  return enemySpeed;
}

let currentLevel = 5;
let speed = increaseDifficulty(currentLevel);
```

### 3. **Database Storage**

Databases store game data, like high scores, so players can pick up where they left off. Think of them as a digital diary that remembers all your game achievements.

**Example Code**:
Saving a player's score to a database might look something like this:

```javascript
function saveScore(playerName, score) {
  database.insert({ name: playerName, highScore: score });
}

saveScore("Alex", 5000);
```

### 4. **Game Over Mechanism**

When players lose all their lives or fail to complete a task, the game indicates that it's over. But don't worry, you can always start over!

**Example Code**:
A simple function to check if the player has any lives left:

```javascript
let playerLives = 3;

function checkGameOver() {
  if (playerLives <= 0) {
    console.log("Game Over!");
    // Additional code to stop the game and show a game over screen
  }
}

checkGameOver();
```

### 5. **Prompts**

Games often ask players questions or for decisions. These are called prompts. They might ask for your name, if you want to save your game, or if you'd like to play again.

**Example Code**:
A simple prompt asking the player for their name:

```javascript
let playerName = prompt("What's your name?");
console.log(`Welcome to the game, ${playerName}!`);
```

---

With these key concepts, we're set to dive deep into the coding section. Remember, understanding the why and how behind the code makes coding even more fun and meaningful! 🚀🎮

### 1. Displaying Messages to the User:

#### 1.1. Introduction to In-Game Messages

In many games, players are provided with real-time feedback about their progress, achievements, and state of the game. This feedback can come in the form of scores, level progression, hints, or even game over messages. By displaying these messages, you enhance the user experience by keeping players informed and engaged. We'll be displaying the score and level information just above the top of the game area.

```js
// index.html
<div id="top-bar">
  <span id="level-display">Level: 1</span>
  <span id="message-display"></span>
  <span id="score-display">Score: 0</span>
</div>
```

For the CSS, we'll need to add in some styles so that the level will display at the top left and the score at the top right.

```css
/* styles/main.css */
#top-bar {
  display: flex;
  justify-content: space-between;
  width: 644px;
  height: 24px;
  margin: 0 auto;
}
```

#### 1.2. Adding a Score to the Game

In order for the score and levels to be displayed, we need to be tracking them as the game progresses.

```js
class Game {
  constructor({ container, player }) {
    // ...
    this.isPaused = false;
    this.isGameOver = false;
    this.score = 0;
    this.level = 1;
  }
}
```

#### 1.3. Implementing a Score Display

Now that we've got a place in our HTML to display it, let's
Next, within the `Game` class, we'll have a method to update the score:

```javascript
// scripts/game.js
updateScore(points) {
  this.score += points;
  const scoreElement = document.getElementById("score-display");
  scoreElement.textContent = `Score: ${this.score}`;
}
```

This method will be called whenever we destroy a ship. We'll add a number of points to the score according to the position of the ship. The `y` coordinate of the enemy ship will be the amount of points that we add to the score. This means that the lower down the ship reaches when destroyed the more points it will be worth when destroyed.

```js
// scripts/game.js inside of updateBullets()
this.enemies.forEach((enemy) => {
  if (bullet.speed.y < 0 && this.hasCollision(bullet, enemy)) {
    enemy.explode();
    this.updateScore(Math.floor(enemy.y));
    this.removeEnemy(enemy);
    this.removeBullet(bullet);
  }
});
```

#### 1.4. Showing Level Progression

Just like the score, we have a place in the game's HTML structure to display the current level. We'll want a method that will level up the player when they reach a certain score. When the level up happens, we'll also want to display the update and congratulate the player. We'll want the message to the player to hide itself 3 seconds later.

In the `Game` class, we'll add the `levelUp` method.

```javascript
levelUp() {
  this.level += 1;
  const levelElement = document.getElementById("level-display");
  levelElement.textContent = `Level: ${this.level}`;
  const messageElement = document.getElementById("message-display");
  messageElement.textContent = `Congratulations! You reached level ${this.level}`;
  setTimeout(() => {
    if (!this.isGameOver) {
      messageElement.textContent = "";
    }
  }, 3000)
}
```

### 2. Adding Difficulty Levels

#### 2.1. Making the Game More Difficult

When the player levels up, we'll also want to increase the difficulty level a bit. There are a few things we could do to make the game harder.

We can:

- decrease the spawn interval so that new enemies are spawned more quickly
- increase the enemy speed so enemies fly closer to the player more quickly
- decrease the enemy firing cooldown so they fire bullets more often

The spawnInterval is already a property of the Game object, so we can decrease it every time a level up occurs like so:

```js
this.spawnInterval -= 150;
```

But, the rest of our spawning logic is hard-coded currently. Here's what the spawnEnemies method looks like now:

```js
spawnEnemies(deltaTime) {
  this.timeSinceLastSpawn += deltaTime;
  if (this.timeSinceLastSpawn >= this.spawnInterval) {
    const spawnPoint = getRandomSpawnPoint();
    this.addEnemy(
      new Enemy({
        x: spawnPoint.x,
        y: spawnPoint.y,
        speed: { x: 0, y: 50 },
        firingCooldown: 3000,
      })
    );
    this.timeSinceLastSpawn = 0;
  }
}
```

The enemy speed and firingCooldown are being set here to values defined within this method. If we want them to be able to change when the player levels up, then we can instead store them as properties of the game within the constructor:

```js
// scripts/game.js
constructor({ container, player }) {
  // ...
  this.spawnInterval = 3000;
  this.enemySpeed = {
    x: 0,
    y: 50
  }
  this.enemyFiringCooldown = 3000;
  // ...
}
```

Then, we can incorporate those values into the `spawnEnemies` method:

```js
// scripts game.js
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
```

Finally, we can increase the enemy speed and decrease the firing cooldown within `levelUp`:

```js
// scripts/game.js
levelUp() {
  this.level += 1;
  this.enemySpeed.y += 2;
  this.enemyFiringCooldown -= 150;
  const levelElement = document.getElementById("level-display");
  levelElement.textContent = `Level: ${this.level}`;
  const messageElement = document.getElementById("message-display");
  messageElement.textContent = `Congratulations! You reached level ${this.level}`;
  setTimeout(() => {
    messageElement.textContent = "";
  }, 3000);
}
```

If we head over to the browser now, we can open up the game and call `game.levelUp()` in the console a couple of times to see the difference. When you do that, you can see that the enemies are moving more quickly and firing faster as the level increases. If we keep things as they are, then the player's ship doesn't get any more powerful as they level up. We can make things a bit more interesting by making our player's ship more powerful as it levels up as well!

#### 2.2. Making the Player Stronger When Leveling Up

The player's constructor is currently tracking a speed and firing cooldown. It looks like this:

```js
constructor({ x, y }) {
  this.element = document.getElementById("player");
  this.speed = 150;
  this.width = 50;
  this.height = 50;
  this.x = x || 0;
  this.y = y || 0;
  this.draw();
  this.firingCooldown = 150;
  this.lastShotTime = -this.firingCooldown;
}
```

We can also add in a `bulletSpeed` property that the player can fire faster bullets as they level up as well. The player is already able to fire pretty quickly at the beginning of the game, so let's increase the initial firing cooldown so the firing rate is slower at first and we can decrease it as the player levels up to incresae the firing rate.

```js
// scripts/player.js
constructor({ x, y }) {
  this.element = document.getElementById("player");
  this.speed = 150;
  this.width = 50;
  this.height = 50;
  this.x = x || 0;
  this.y = y || 0;
  this.draw();
  this.firingCooldown = 500;
  this.bulletSpeed = {x: 0, y: -200};
  this.lastShotTime = -this.firingCooldown;
}
```

We need to make sure we're using the `bulletSpeed` property to assign to new bullets that we create in the `shoot()` method:

```js
// scripts/player.js
shoot() {
  const bulletWidth = 6;
  const bulletHeight = 10;
  return new Bullet({
    x: this.center().x - bulletWidth / 2,
    y: this.y - bulletHeight / 2,
    width: bulletWidth,
    height: bulletHeight,
    color: "red",
    speed: this.bulletSpeed
  });
}
```

Now, we can adjust these numbers whenever the player levels up. We'll put all this logic together in a method called `levelUp()` within the `Player` class:

```js
// scripts/player.js

levelUp() {
  this.speed = Math.round(this.speed * 1.015);
  this.firingCooldown = Math.max(50, Math.round(this.firingCooldown * 0.95));
  this.bulletSpeed.y = Math.max(-300, Math.round(this.bulletSpeed.y * 1.02));
}
```

Finally, this method should be called whenever the `levelUp()` method in game is called, so the player gets stronger as the enemies do.

```js
// scripts/game.js
levelUp() {
  this.level += 1;
  this.enemySpeed.y += 2;
  this.enemyFiringCooldown -= 150;
  this.player.levelUp();
  const levelElement = document.getElementById("level-display");
  levelElement.textContent = `Level: ${this.level}`;
  const messageElement = document.getElementById("message-display");
  messageElement.textContent = `Congratulations! You reached level ${this.level}`;
  setTimeout(() => {
    messageElement.textContent = "";
  }, 3000);
}
```

Now, we can test out the difficulty levels by adding a setInterval to main.js. What we'll do here is to set up a script that will call `levelUp` on the game every 7 seconds, allowing us to test multiple difficulty levels pretty quickly.

```js
// scripts/main.js
setInterval(() => {
  game.levelUp();
}, 7000);
```

Now, head over to the browser and attempt to play the game. You'll start to notice with the current configuration that levels 13 and 14 become very difficult because the enemy firing cooldown is decreasing a bit too quickly. At the current rate of decrease, by level 20 the enemy ships would have no firing cooldown at all! So, let's adjust the rate it changes within game's `levelUp()` method to be exponential instead of linear. That way, the cooldown will decrease more gradually as it nears 0.

```js
this.enemyFiringCooldown = Math.max(150, this.enemyFiringCooldown * 0.95);
```

With these parameters, you'll notice that the game gets harder around levels 10-15, but actually gets a bit easier as the levels increase because the player's strength grows in a way that outpaces the enemy strength. In particular, the enemy ships and bullets aren't getting faster at the same rate as the player's ship and bullets. So, let's adjust the parameters:

```js
// scripts/game.js
this.enemySpeed.y *= 1.02;
```

And, we need to make the enemy bullet speed change as a product of the speed instead of a sum, so the bullets get faster in a way that makes them harder to dodge. So instead of adding `100` to the ship's y speed when we create bullets inside of `Enemy.shoot()` we can multiply it by 2:

```js
// scripts/enemy.js
shoot() {
  const bulletWidth = 6;
  const bulletHeight = 10;
  return new Bullet({
    x: this.center().x - bulletWidth / 2,
    y: this.y + this.height - bulletHeight / 2,
    width: bulletWidth,
    height: bulletHeight,
    color: "red",
    // speed: { x: 0, y: this.speed.y + 100 }
    speed: { x: 0, y: this.speed.y * 2 },
  });
}
```

Now when we play the game, enemies ships get faster and fire faster bullets as well. The next step will be to tie leveling up to the player's score instead of our setInterval.

#### 2.3. Tying Levels to the Player's Score

We'll want to connect the level to the player's score. There's a formula that we can use to calculate the score or EXP points needed to level up:

```
(level/x)^y
```

We take the level, divide by a constant x and then take that to the power of y. We can adjust the values of x and y to change the experience points scale.

##### 2.3.1. `calculatePoints(level)`

Let's add a method to our Game class to calculate the EXP points needed to reach a certain level. We'll use this method to set the score we're looking for in order to progress to the next level.

```js
// scripts/game.js
calculatePoints(level) {
  let x = 0.05;
  let y = 1.8;
  return Math.round((level/x)**y);
}
```

Calling this method with a level as an argument will give us the score needed to level up. In order to track this and trigger a level up when the score exceeds that amount, we need to add a property to the game to track the points we need to level up.

```js
// scripts/game.js
class Game {
  constructor({ container, player }) {
    // ...
    this.score = 0;
    this.level = 1;
    this.pointsToLevelUp = this.calculatePoints(1);
  }
}
```

Next, whenever we update the score with the `updateScore` method, we'll compare it to the `pointsToLevelUp` and invoke `game.levelUp()` if the score meets or exceeds it. We also need to reset the `pointsToLevelUp` after we've changed the level, so that we only level up after we've reached the next point target.

```js
// scripts/game.js
updateScore(points) {
  this.score += this.level;
  if(this.score >= this.pointsToLevelUp) {
    this.levelUp();
    this.pointsToLevelUp = this.calculatePoints(this.level)
  }
  const scoreElement = document.getElementById("score-display");
  scoreElement.textContent = `Score: ${this.score}`;
}
```

Finally, now that we've added this, we can remove the `setInterval` in the main.js file that we used for testing.

```js
// scripts/main.js
// ...
game.start();
// setInterval(() => {
//   game.levelUp();
// }, 7000);
```

Now, we can visit the game in the browser and play a bit to test out the leveling up mechanic. You may notice that it takes a lot longer to level up with the current settings than it did when we were testing the game. If we'd like to make the levels progress more quickly, we can adjust the values for x and y within our `calculatePoints` function. If we want the game to progress more quickly through the levels, we can increase x. This will decrease the amount of points needed to reach the next level.

```js
calculatePoints(level) {
  let x = 0.1;
  let y = 1.8;
  return Math.round((level / x) ** y);
}
```

### 3. Handling Game Over

Once the player's ship explodes, we'll want to display a Game Over Message and prompt the user to enter their name to save their high score.

#### 3.1. Storing High Scores with Dexie.js

##### 3.1.1. Setup

Before we start, you need to include Dexie.js in your project. Dexie.js is a code library that will let us use a browser based database called indexedDB to store high scores. We'll include the script tag directly in our HTML.

For direct inclusion:

```html
<!-- index.html -->
<script src="https://unpkg.com/dexie@latest/dist/dexie.min.js"></script>
<!-- other scripts below -->
```

We'll also want to add a div below the game div to display the high scores:

```html
<!-- index.html -->
<div id="highScoresList"></div>

<script src="https://unpkg.com/dexie@latest/dist/dexie.min.js"></script>
```

We'll use some css to hide this div while the game is running in such a way that we can display it by adding the `gameOver` class to it when the game ends.

```css
/* styles/main.css */
#highScoresList {
  display: none;
}
#highScoresList.gameOver {
  display: block;
}
```

##### 3.1.2. Initializing the Database

Let's start by creating a new database named "HighScoresDB". We'll define a store named "scores" with `id` as an auto-incremented key, and `score` as an indexed property.

```javascript
// scripts/main.js below game.start();
const db = new Dexie("HighScoresDB");

db.version(1).stores({
  scores: "++id, name, score",
});
```

##### 3.1.3. Adding a High Score

To add a high score, we use the `add` method. With our setup, each score will get a unique `id` automatically. Let's add a method called `addHighScore` to the Game class.

```javascript
// scripts/game.js
addHighScore(name, score) {
  return db.scores.add({
    name: name,
    score: score
  });
}
```

##### 3.1.4. Retrieving High Scores

To retrieve high scores sorted from highest to lowest, we'll use the `orderBy` method on the `score` property and then reverse the results. Notice, we're using a keyword called `async` here before the function. Because interacting with a database can take a while, the dexie library uses a data type called a promise to govern interactions. The `await` keyword is used to indicate that we're waiting for the promise to resolve (or be fulfilled). Whenever we see the `await` keyword, we need to use the `async` keyword in the surrounding function.

```javascript
// scripts/game.js
async getHighScores() {
  return await db.scores.orderBy('score').reverse().toArray();
}
```

We'll use this function to display the stored high scores below the game area when the game is over.

##### 3.1.5. Displaying High Scores on the Webpage

We'll add a new function here called `displayHighScores` that will handle

```javascript
// scripts/game.js
async displayHighScores() {
  const highScoresDiv = document.getElementById('highScoresList');
  const scores = await getHighScores();
  highScoresDiv.classList.add("gameOver");

  highScoresDiv.innerHTML = ''; // Clear previous scores

  scores.forEach(score => {
    const scoreDiv = document.createElement('div');
    scoreDiv.textContent = `${score.name}: ${score.score}`;
    highScoresDiv.appendChild(scoreDiv);
  });
}
```

#### 3.2 Handling Game Over

When the player dies, we need to trigger the game over mechanic. We'll want to do a few things.

##### 3.2.1. `handleGameOver`

We'll define a method to perform all of the tasks necessary to end the game.

We need to:

- set `isGameOver` to `true`
- set `isPaused` to `true`
- display a game over message and a button to restart the game
- prompt the user to enter their name to score their high score
- if the name prompt is entered blank, do nothing
- if the name prompt is entered
  - invoke `addHighScore` with the player's name and high score
  - invoke `displayHighScores` to display the scores below the game area

```js
// scripts/game.js
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
  const name = window.prompt("Enter your name to store your high score!");
  if (name) {
    await this.addHighScore(name, this.score);
    await this.displayHighScores();
  }
}
```

##### 3.2.2 invoking `handleGameOver`

We'll want to call this method from within the player's collision logic.

```js
// scripts/game.js within `updateBullets`
// check for collisions between this bullet and the player
if (bullet.speed.y > 0 && this.hasCollision(bullet, this.player)) {
  this.player.explode();
  this.togglePause();
  this.handleGameOver();
}
```

We also need to do this from within the method that checks for collisions between the player and enemy ships.

```js
// scripts/game.js within `updateEnemies`
// add conditional logic to check for collision here
if (this.hasCollision(enemy, this.player)) {
  this.player.explode();
  this.togglePause();
  enemy.explode();
  this.handleGameOver();
} else { // ...
```

In both of these cases, `handleGameOver` will pause the game, so we can remove `this.togglePause();`

```js
// scripts/game.js within `updateBullets`
// check for collisions between this bullet and the player
if (bullet.speed.y > 0 && this.hasCollision(bullet, this.player)) {
  this.player.explode();
  this.handleGameOver();
}
```

```js
// scripts/game.js within `updateEnemies`
// add conditional logic to check for collision here
if (this.hasCollision(enemy, this.player)) {
  this.player.explode();
  enemy.explode();
  this.handleGameOver();
} else { // ...
```

Now, if you go the browser and play, you'll notice that if the player dies, the prompt appears right away and the explosion(s) don't render! In order to make sure the explosions are displayed first, we can wrap the prompt and the following logic within a `setTimeout`, allowing the explosions to render first before the name prompt is displayed:

```js
// scripts/game.js within `handleGameOver`
messageElement.append(playAgainButton);
window.setTimeout(async () => {
  const name = window.prompt("Enter your name to store your high score!");
  if (name) {
    await this.addHighScore(name, this.score);
    await this.displayHighScores();
  }
}, 3000);
```

##### 3.2.3. Hiding the Score and Game Over Message When Resetting the Game

Now, when a user clicks on the button to reset the game, we want the scores list to disappear and the game over message as well. We also need to reset the score to 0 and the level to 1.

```js
// scripts/game.js
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
  document.getElementById("message-display").textContent = "";
  this.score = 0;
  this.level = 1;
}
```

##### 3.2.4. Updating the Top Bar Display

While we did just update the score and the level, we haven't updated the difficulty parameters for firing cooldown, spawn interval, and actually updating the displayed text in the top bar.

Let's start by adding a method for updating the top bar and using it all of the places that we're currently doing that.
This method will only update parts of the top bar that we include in our arguments

```js
// scripts/game.js
updateTopBar({ level, score, message }) {
  if (level) {
    const levelElement = document.getElementById("level-display");
    levelElement.textContent = `Level: ${level}`;
  }
  if (score || score === 0) {
    const scoreElement = document.getElementById("score-display");
    scoreElement.textContent = `Score: ${score}`;
  }
  const messageElement = document.getElementById("message-display");
  if (message) {
    messageElement.textContent = message;
  } else if(message === "") {
    messageElement.innerHTML = "";
  }
}
```

```js
// scripts/game.js in levelUp()
levelUp() {
  // ...
  this.player.levelUp();
  this.updateTopBar({
    level: this.level,
    message: `Congratulations! You reached level ${this.level}`
  })
  setTimeout(() => {
    if (!this.isGameOver) {
      this.updateTopBar({
        message: ""
      });
    }
  }, 3000);
  // ...
}

// scripts/game.js in updateScore()
updateScore(points) {
  this.score += points;
  if (this.score >= this.scoreTargetForLevelUp) {
    this.levelUp();
    this.scoreTargetForLevelUp = this.calculatePoints(this.level);
  }
  this.updateTopBar({
    score: this.score,
  })
}

// scripts/game.js within reset()

reset() {
  // ...
  document.getElementById("highScoresList").classList.remove("gameOver");
  this.score = 0;
  this.level = 1;
  this.updateTopBar({
    score: this.score,
    level: this.level,
    message: ""
  });
}
```

##### 3.2.5. Resetting the Difficulty Level

To reset the difficulty level, we'll need to set the parameters to their initial values

```js
// scripts/game.js in reset()
reset() {

  // ...
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
    message: ""
  });
  this.scoreTargetForLevelUp = this.calculatePoints(1);
}
```

We also need to make sure we reset the player's firing cooldown and bullet speed when the game resets:

```js
// scripts/player.js
reset() {
  this.x = 300;
  this.element.classList.remove("exploded");
  this.draw();
  this.firingCooldown = 500;
  this.bulletSpeed = { x: 0, y: -200 };
  this.lastShotTime = -this.firingCooldown;
}
```

### Testing It Out

Now, head over to the browser and play the game for a bit.

- When you reach a high enough level that you start to notice the changes in movement speed, end the game early
- Go through the process of adding your score, you should see it appear at the bottom.
- Click the Play again button at the top of the screen and you should see
  - the level reset to 1
  - the score reset to 0
  - the high scores disappear below the game area

## Conclusion:

Well done on completing Module 6! You've successfully implemented a scoring system, leveled up the game's difficulty, and added a game-over mechanism. The foundation of your space shooter game is now robust and provides players with an engaging experience.

In the next module, we'll be diving into the world of sound. Sound effects and music play a crucial role in creating an immersive gaming experience. We'll learn how to incorporate various sound effects for actions like shooting, explosions, and leveling up, as well as adding background music to set the mood of the game. Get ready to elevate your game to the next level with audio enhancements! 🎵🚀
