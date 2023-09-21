# Space Invaders Module 2: Game Loop and Player Movement

## Lesson Overview

In Week 2, we'll delve deeper into the world of game development by introducing the game loop and event listeners. We'll build on our `Game` class to include these new elements and take our `Player` class to the next level.

## Learning Objectives

- Understand the concept and importance of a game loop.
- Learn how to use JavaScript event listeners for interactive gameplay.
- Reinforce foundational knowledge from Week 1.

## Concepts

### Introduction to Game Loops

- **What is a Game Loop?**: The heartbeat of every game, controlling the game flow.
- **`requestAnimationFrame`**: A built-in JavaScript method that allows us to create smooth animations.

### Event Listeners in JavaScript

- **What are Event Listeners?**: Code that listens for specific events like key presses or mouse clicks.
- **Common Events for Games**: `keydown`, `keyup`, `click`, etc.

## Space Invaders Codealong (40-45 minutes)

### 1. Introduce `Game` class

#### **1.1 Create Game.js File:**
- Create a new JavaScript file named `Game.js` inside the `scripts` folder.

#### **1.2 Basic Game Class:**
- Add a basic `Game` class structure in `Game.js`:

```js
class Game {
    constructor() {
        // initialization code here
    }

    start() {
        // game loop code here
    }
}
```

#### **1.3 Initialize Game:**
- In `main.js`, create a new instance of the `Game` class and call its `start` method.

### 2. Create Main Game Loop

#### **2.1 Add `start` Method:**
- Implement a basic game loop in the `start` method using `requestAnimationFrame`.

```js
start() {
    // call the game loop function here
    requestAnimationFrame(this.gameLoop);
}

gameLoop() {
    // game logic here

    // continue the game loop
    requestAnimationFrame(this.gameLoop);
}
```

#### **2.2 Test the Game Loop:**
- Add a `console.log("Game Loop Running");` inside the `gameLoop` method to verify it's running.

### 3. Add Event Listeners for Player Movement

#### **3.1 Update Player.js:**
- Update the `Player` class to include methods for movement (`moveLeft`, `moveRight`, etc.).

#### **3.2 Add Event Listeners:**
- In `main.js`, add event listeners for keyboard events to move the player.

```js
window.addEventListener('keydown', function(event) {
    // call player movement methods based on key pressed
});
```

## Manual Testing

### Initialization

- **Action**: Open the `index.html` file in a browser.
- **Expected**: Ensure no errors pop up in the browser's console.

### Game Loop Test

- **Action**: Look for the "Game Loop Running" message in the console.
- **Expected**: This message should appear, confirming the game loop is working.

### Player Movement Test

- **Action**: Use keyboard keys to move the player.
- **Expected**: The player should move according to the key pressed.

---

Feel free to adjust the README to better match your teaching style or to add any additional exercises or explanations.