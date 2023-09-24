# Space Invaders Module 2: Game Loop and Player Movement

## Lesson Overview

In Week 2, we'll delve deeper into the world of game development by introducing the game loop and event listeners. We'll build on our `Game` class to include these new elements and take our `Player` class to the next level.

## Learning Objectives

- Understand the concept and importance of a game loop.
- Learn how to use JavaScript event listeners for interactive gameplay.
- Reinforce foundational knowledge from Week 1.

## Concepts

### Introduction to Game Loops

#### What is a Game Loop?

A game loop is the heart of every video game. It's a loop that keeps running as long as the game is active, updating all aspects of the game, such as player position, enemy movement, and much more.

- **Purpose**: To keep the game running smoothly by coordinating updates to game state, redrawing the screen, and handling user input.
- **Components**: Generally consists of three main parts:
  1. **Update**: Where the game's logic is updated (e.g., player moves, enemy spawns).
  2. **Draw**: Where the updated game state is rendered visually.
  3. **Timing**: Control how often the update and draw steps happen.

#### `requestAnimationFrame`

`requestAnimationFrame` is a method built into JavaScript that lets you run a function approximately 60 times per second, making it ideal for smooth animations in games.

- **Why Use It**: Unlike `setTimeout` or `setInterval`, `requestAnimationFrame` is optimized for animations, providing a smoother visual experience.
- **How It Works**: You pass a callback function into `requestAnimationFrame`, and it gets called before the next repaint of the browser window.

We'll be using `requestAnimationFrame` within the game loop to handle drawing the game area as time passes.

### Event Listeners in JavaScript

#### What are Event Listeners?

Event listeners in JavaScript are pieces of code that "listen" for specific events to happen, like a mouse click or a key press. When the specified event occurs, the listener triggers a function.

- **Syntax**: `element.addEventListener('event', function)`.
- **Types of Events**: Mouse events (`click`, `mouseover`), keyboard events (`keydown`, `keyup`), form events (`submit`, `change`), etc.

#### Common Events for Games

In gaming, certain events are particularly useful for capturing user input and making the game interactive.

- **Keyboard Events**:
  - `keydown`: Triggered when a key is pressed down.
  - `keyup`: Triggered when a key is released.
- **Mouse Events**:
  - `click`: Triggered when the mouse is clicked.
  - `mousemove`: Triggered when the mouse is moved.

## Space Invaders Codealong (40-45 minutes)

### Part 1: Setting Up the `Game` Class and Player Controls

#### Step 1.1: Create the Game.js File

1. Open Visual Studio Code (VS Code).
2. Navigate to the `scripts` folder in your project.
3. Create a new JavaScript file named `game.js`.

#### Step 1.2: Initialize the `Game` Class and Add Player Controls

1. Open the `game.js` file.
2. Add the following code to initialize the `Game` class with key states and the `setupPlayerControls` method:

```js
class Game {
  constructor({ container, player }) {
    this.container = container;
    this.player = player;
    this.isPaused = false;
    this.keyStates = {
      ArrowLeft: false,
      ArrowRight: false,
      " ", false,
    }
  }
}
```

### Part 2: Implementing Player Controls and the Game Loop

#### Step 2.1: Add `setupPlayerControls` Method to `Game` Class

1. Inside the `Game` class, add the `setupPlayerControls` method to handle keydown and keyup events.

```js
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
```

The goal here is to make sure that the game knows if we're holding down one of the player control keys. If we are, then we can tell the player to move (or later shoot) when the next frame occurs.

#### Step 2.2: Introduce the `start` Method with Game Loop

1. Add a `start` method to the `Game` class to initialize player controls and implement the game loop.

```js
start() {
  this.setupPlayerControls();
  let lastFrameTimestamp = 0;
  // our gameLoop is a callback function we'll use with
  // requestAnimationFrame. It takes as an argument the
  // current time elapsed since the animation began
  const gameLoop = (timeStamp) => {
    // calculate the amount of time that has passed
    // since the last frame was drawn and update it
    // to the new timestamp
    const deltaTime = timestamp - lastFrameTimestamp;
    lastFrameTimestamp = timestamp;

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
```

#### Step 2.3: Update the `Player` Class with a `move` methods

1. Open `Player.js`.
2. Add a `move` method that includes `deltaTime` for smooth motion. Use `this.x` and `this.y` for position.

```js
move(direction, deltaTime) {
  const delta = this.speed * (deltaTime/1000);
  if (direction === "left") {
    this.x = Math.max(0, this.x - delta);
  } else if (direction === "right") {
    // Skip gameWidth for now
    this.x = this.x + delta;
  }
}
```

### Part 3: Initializing the `Game` and `Player` Classes in `main.js`

1. Add a `script` tag to `index.html` loading our new `game.js` file.
2. Open `main.js`.
3. Create a `gameContainer` constant and set it to the div found in `index.html`
4. Create new instances of `Game` and `Player`, and initialize them.


```html
    <!-- ... -->
    <script src="scripts/game.js"></script>
    <script src="scripts/player.js"></script>
    <script src="scripts/main.js"></script>
  </body>
</html>
```

```js
// scripts/main.js
const gameContainer = document.getElementById("game")
const player = new Player({ x: 300, y: 590 });
const game = new Game({
  container: gameContainer, 
  player: player
});
game.start();
```

## Manual Testing

### Initialization

- **Action**: Open `index.html` in a browser.
- **Expected**: No errors should appear in the console.

### Player Controls and Movement

- **Action**: Hold down the left or right arrow keys.
- **Expected**: The player should move smoothly in the direction you're holding.



### Part 4: Adding Boundary Constraints
Adding boundary constraints is a crucial aspect of game development. To prevent the ship from moving off the right edge of the game area, we can modify the `move` method in the `Player` class to account for the game area width.

#### Step 4.1: Update the `move` Method in `Player` Class

1. Open `Player.js`.
2. Modify the `move` method to add a condition that prevents the ship from moving beyond the right edge of the game area. For this example, let's assume the game area width is 664 pixels. This will be refined in later lessons.

```js
move(direction, deltaTime) {
    const delta = this.speed * deltaTime / 1000;
    if (direction === "left") {
        this.x = Math.max(0, this.x - delta);
    } else if (direction === "right") {
        // Add the boundary constraint for the right edge
        this.x = Math.min(664 - this.width, this.x + delta);
    }
    // Removed the DOM manipulation from here
}
```

### Part 5: Test the Boundary Constraints

1. Run your game and try to move the ship beyond the right edge of the game area.
2. The ship should not be able to move beyond the right edge.

## Manual Testing

### Initialization

- **Action**: Open `index.html` in a browser.
- **Expected**: No errors should appear in the console.

### Player Controls and Movement

- **Action**: Hold down the left or right arrow keys.
- **Expected**: The player should move smoothly in the direction you're holding.

### Boundary Constraints

- **Action**: Try to move the ship beyond the right edge of the game area.
- **Expected**: The ship should not be able to move beyond the right edge.

---

This addition ensures that the player's ship won't go outside the game area, which is a good introduction to game constraints. 