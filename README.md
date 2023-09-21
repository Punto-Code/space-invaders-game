## Week 1: Introduction and Setup
- **Concepts:**
  - Introduction to game development.
  - Overview of the game (Space Invaders).
  - Introduction to the programming environment.
- **Features/Tasks:**
  - Setting up the development environment.
  - Initializing the project structure.
- **Classes/Methods:**
  - None (setup lesson)

## Week 2: Game Framework and Player Introduction
- **Concepts:**
  - Basic game loops.
  - Introduction to game sprites.
- **Features/Tasks:**
  - Initialize the main game container.
  - Introduce the player's spaceship.
- **Classes/Methods:**
  - `main.js`: Initialization
  - `Player`: Constructor, `createElement`

## Week 3: Player Movement and Shooting
- **Concepts:**
  - Handling player input.
  - Game mechanics for shooting.
- **Features/Tasks:**
  - Player movement (left and right).
  - Player shooting bullets.
- **Classes/Methods:**
  - `Player`: `move`, `update`, `shootIfReady`, `shoot`

## Week 4: Bullets and Collisions
- **Concepts:**
  - Physics in games.
  - Collision detection basics.
- **Features/Tasks:**
  - Bullet behavior and movement.
  - Basic collision detection.
- **Classes/Methods:**
  - `Bullet`: Constructor, `createElement`, `move`, `isOutOfBounds`, `update`

## Week 5: Introducing Enemies
- **Concepts:**
  - Basics of game AI.
  - Enemy spawning and movement.
- **Features/Tasks:**
  - Design and introduce enemy aliens.
  - Basic enemy movement.
- **Classes/Methods:**
  - `Enemy`: Constructor, `createElement`, `move`, `update`

## Week 6: Audio in Games
- **Concepts:**
  - Importance of audio.
  - Audio formats and controls.
- **Features/Tasks:**
  - Implement background music.
  - Add shooting and explosion sound effects.
- **Classes/Methods:**
  - `AudioController`: Constructor, play, pause methods
  - `Player` & `Enemy`: `setupSounds`

## Week 7: Game Logic and UI
- **Concepts:**
  - Game states (e.g., paused, game over).
  - UI elements in games.
- **Features/Tasks:**
  - Implement game pause and resume.
  - Display score and level.
- **Classes/Methods:**
  - `Game`: `togglePause`, `increaseScore`, `gameOver`
  - `UI`: Constructor, `display`

## Week 8: Enhancing Interactions and Finalizing Game Logic
- **Concepts:**
  - Enhancing user interactions.
  - Finalizing game logic and interactions.
- **Features/Tasks:**
  - Player and enemy collisions.
  - Enemy shooting.
- **Classes/Methods:**
  - `Player`: `onCollision`, `explode`
  - `Enemy`: `shoot`, `onCollision`, `explode`

## Week 9: Polishing and Final Touches
- **Concepts:**
  - Playtesting and feedback.
  - Game balance and difficulty tuning.
- **Features/Tasks:**
  - Playtest the game.
  - Add final touches, such as improved graphics or additional features.
- **Classes/Methods:**
  - Potential refinements based on feedback.

This structure provides a balanced mix of introducing concepts, hands-on coding, and refining the game. By extending to 9 lessons, students have more time to grasp each concept and apply it without feeling rushed.