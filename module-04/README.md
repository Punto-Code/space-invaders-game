## Module 4: Spawning and Managing Enemy Movement

### Table of Contents
1. [Conceptual Overview](#conceptual-overview-15-20-minutes)
    - [Enemy Spawning and Positioning](#spawning-bringing-enemies-to-the-stage)
    - [Using `Set` in JavaScript](#managing-available-positions-with-set)
    - [Timed Events and Enemy Actions](#3.-Timed-Events-and-Enemy-Actions)
2. [Space Invaders Codealong](#space-invaders-codealong-40-45-minutes)
    - [Setting Up Enemy Logic](#1-setting-up-enemy-logic)
    - [Tracking Multiple Enemies](#2-tracking-multiple-enemies)
    - [Enemy Spawn Locations](#3-enemy-spawn-locations)

### Conceptual Overview (15-20 minutes)
### Spawning: Bringing Enemies to the Stage

In video games, _spawning_ refers to the moment when a new entity, such as an enemy, item, or obstacle, is placed into the game world. When it comes to an array of enemies, their appearance should be regulated and strategic to introduce a progressive challenge to the player.

**Example**: Picture a beehive. Initially calm, but when disturbed, bees begin to emerge, one after the other, each buzzing in from different directions. In our game, spawning enemies is akin to releasing these bees. They appear at various positions, making the game space more dynamic and challenging.

In this lesson, we'll guide our enemy spaceships into the game, carefully ensuring they do not overlap and maintain a harmonious, yet challenging presence on the stage. To do this, we'll be tracking enemies within an array, just like we do with bullets. We'll also need to keep track of available spawning positions to make sure that new enemies don't spawn on top of existing enemies.

---

### Managing Available Positions with `Set`

When spawning entities in a game, it's crucial to manage their initial positions to prevent overlaps and ensure a balanced setup. The `Set` object in JavaScript provides a straightforward way to keep track of unique values, which in this context, will be our available spawning positions.

#### **Example**

Envision a classroom with a limited number of desks. When a student (enemy spaceship) enters the room, they choose a desk (position) to sit at. The desk is then no longer available to others until the student leaves the room. Using a `Set`, we can efficiently manage these available desks to ensure each student has their own space.

#### **Utilizing `Set` in JavaScript**

##### Adding an Item:

When a spaceship is destroyed, its position becomes available again for new enemies to occupy.

```javascript
let availablePositions = new Set();
availablePositions.add("150,300"); // x,y coordinates are stored as a string.
```

##### Removing an Item:

When an enemy spaceship spawns, we'll remove its position from our `Set` of available positions.

```javascript
availablePositions.delete("150,300"); // The position is now occupied by an enemy.
```

##### Getting and Removing a Random Item:

When spawning a new enemy, we want to select a random available position and subsequently remove it from our `Set` to prevent others from spawning there.

```javascript
function getAndRemoveRandomPosition(availablePositions) {
  const positionsArray = Array.from(availablePositions);
  const randomIndex = Math.floor(Math.random() * positionsArray.length);
  const randomPosition = positionsArray[randomIndex];

  // Remove the selected position from the set.
  availablePositions.delete(randomPosition);

  return randomPosition;
}
```

##### Practical Application:

Envision having predefined spawn positions for enemies and you wish to select one, ensuring it is immediately occupied and unavailable to subsequent enemies.

```javascript
// Preset potential spawn positions.
let availablePositions = new Set(["100,100", "200,100", "300,100", "400,100"]);

// Select a random position for a new enemy.
let newEnemyPosition = getAndRemoveRandomPosition(availablePositions);

// Now, `newEnemyPosition` can be used to spawn a new enemy,
// ensuring no other enemy can spawn at the same spot.
```

#### **Relevance in Game Development**

In our space-invaders game, utilizing a `Set` to manage available enemy spawning positions ensures a coherent and smooth gameplay experience. When an enemy spawns, it occupies a unique position, and when it is destroyed, that position becomes available again for future use. This dynamic keeps the game field orderly and enhances the visual and interactive appeal of the game.

---

#### 3. Timed Actions using `setInterval`

Time management is crucial in games to create rhythmic patterns or intervals for certain actions, such as enemy attacks. `setInterval` enables us to execute a function repeatedly, starting after a specified delay, and then continuing to run it at that same delay.

**Example**: Envision a fountain that erupts every 10 minutes. Visitors can anticipate the beautiful display and plan to watch it because it follows a set interval. In our game, `setInterval` is the mechanism that allows our enemies to fire at consistent intervals, introducing a predictable yet demanding obstacle for the player to navigate.

---

### Space Invaders Codealong (40-45 minutes)

---

### 1. Setting Up Enemy Logic

#### 1.1. **Enemy Class Definition**

Creating an enemy involves defining a class that determines how the enemy behaves and interacts with other game elements. Here, we'll focus on creating an enemy that can move and be rendered in the game area.

Define the `Enemy` class with a constructor that initializes its properties. First, you'll need to create a file called `enemy.js` inside of the `scripts` directory and link to it within the `index.html` file.

```html
<!-- bottom of index.html -->
<script src="scripts/game.js"></script>
<script src="scripts/bullet.js"></script>
<script src="scripts/enemy.js"></script>
<script src="scripts/player.js"></script>
<script src="scripts/main.js"></script>
```

```javascript
// scripts/enemy.js
class Enemy {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.width = 50; // Arbitrary width
    this.height = 50; // Arbitrary height
    this.speed = 100; // Units per second
  }
}
```

#### 1.2. **Enemy Element Creation**

Creating a visual representation of the enemy using HTML elements allows us to visualize them in the game area.
Add a method to create and style the enemy element, and add it to the game area. Call this method from within the constructor and assign it to `this.element` so that we can track each element connected to an enemy instance.

```javascript
class Enemy {
  constructor({ x, y, speed }) {
    this.x = x;
    this.y = y;
    this.width = 46; // this is the width of our enemy image asset
    this.height = 83; // this is the height of our enemy image asset
    this.speed = speed;
    this.element = this.createElement();
  }

  createElement() {
    const el = document.createElement("div");
    el.className = "enemy";
    el.style.width = `${this.width}px`;
    el.style.height = `${this.height}px`;
    return el;
  }
}
```

We'll also need to add some css for the background image of the enemy element.

```css
.enemy {
  background-image: url("https://res.cloudinary.com/dm5zvhgto/image/upload/v1695268027/punto-code/space-invaders/images/transparent-enemy_fru5cg.png");
}
```

We can consolidate our background size and positioning logic to work for all game elements:

```css
#player, .bullet, .enemy {
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center;
}
```

#### 1.3. **Enemy Movement**

Ensuring the enemy can move is vital to creating dynamic and engaging gameplay. While we may not always have enemies move within the game area, it's important that we give ourselves the option for enemy ships to move in the future. For our testing, the enemy will move downwards at a steady pace.

Implement a `move` method to update the enemy's position.

```javascript
class Enemy {
  // ... Previous code ...

  move(deltaTime) {
    this.y += this.speed.y * (deltaTime / 1000); // Move vertically
    this.x += this.speed.x * (deltaTime / 1000); // Move horizontally
  }
}
```

#### 1.4 **Drawing the Enemy in its new Position**

Implement a `draw` method to render the enemy at its new position. Make sure to call this method from the constructor as well

```javascript
class Enemy {
  constructor({x, y, speed}) {
    // ... Previous code ...
    this.draw();
  }

  draw() {
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}
```

Remember that for this part to work properly, all game elements must be absolutely positioned relative to the top left of the game area. This is done so all elements are translated from the same point.

### 1.5 Removing enemies when they leave the game area.

Finally, we'll need logic to remove enemies from the game area when they are no longer visible. We can use the same logic here that we used for the `Bullet` class.

```js
isOutOfBounds(containerHeight, containerWidth) {
  // this.y is between -this.height and containerHeight + this.height
  const isInYRange = (-this.height < this.y) && (this.y < containerHeight + this.height);
  // this.x is between -this.width and containerWidth + this.width
  const isInXRange = (-this.width < this.x) && (this.x < containerWidth + this.width);
  // return true if the enemy is not within both x and y range
  return !(isInYRange && isInXRange);
}
```

Later on, we'll use this method to check if an enemy is out of bounds and remove it if it is.

### 1.6 📝 **Manual Testing**

After implementing these sections, let’s validate our progress:

#### 1.6.1 Create an instance of the `Enemy` class and test it.

```javascript
// scripts/main.js
const testEnemy = new Enemy({ 
  x: 100, 
  y: -83, 
  speed: { x: 0, y: 100 } 
});
```

When we open the game in the browser we should see the enemy on the screen, but it won't be moving yet.

##### 1.6.2 Update the Enemy within the Game Loop

Move and draw the enemy within your game loop, ensuring it appears and moves downwards.

```javascript
// scripts/game.js
  start() {
    // ...
    const gameLoop = () => {
      // ...
      this.player.draw();

      // add this logic below drawing the player
      testEnemy.move(deltaTime);
      testEnemy.draw();
      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }


```

#### 1.6.3 Observe in the Browser

Observe the behavior of the enemy in the browser. It should appear at `(100, -83)` and move downwards steadily.

Now that you have successfully set up the basic logic for the `Enemy` class, you can proceed to the next section of your code-along, where you will manage multiple enemies and interact with them. This foundational knowledge will be crucial as we proceed to add further complexity and interactions to our game.

## 2. Tracking Multiple Enemies 

What we have so far works fine for a single test enemy, but we'll need to be able to track multiple enemies in the game area at once, just like we do with bullets.

### 2.1 Tracking enemies in an array

We'll need to update the `Game` constructor to track an array of enemies

```js
class Game {
  constructor({ container, player }) {
    // ...
    this.bullets = [];
    this.enemies = [];
  }
}
```

### 2.2 Adding enemies to the game

We'll add enemies to the game just like we added bullets.

```js
addEnemy(enemy) {
  this.enemies.push(enemy);
  this.container.appendChild(enemy.element);
}
```

### 2.3 Removing enemies from the game

We'll also need logic for removing enemies from the game. This will also mirror the logic for removing bullets.

```js
removeEnemy(enemy) {
  const index = this.enemies.indexOf(enemy);
  if (index > -1) {
    // remove 1 enemy from the array starting at the index of the enemy we found
    this.enemies.splice(index, 1);
    enemy.element.remove();
  }
}
```

### 2.4 Updating Enemies Each Frame

For every frame, we need to update the positions of each bullets and each enemy spaceship. Eventually, we'll also need to trigger explosions if bullets collide with spaceships, but we'll just handle movement for now.

We'll do this by creating an `updateEnemies` function. Inside of the function, we'll move each of the enemies, then remove it if it's out of bounds and draw it again in its new position if it's not:

```js
updateEnemies(deltaTime) {
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
      enemy.draw();
    }
  });
}
```

And we'll need to call this method from within our game loop. So, replace the following:

```js
testEnemy.move(deltaTime);
testEnemy.draw();
```

with this:

```js
this.updateEnemies(deltaTime);
```

#### 📝 **Manual Testing**

In order to see the enemy moving as before, we'll need to call the addEnemy method and pass in our testEnemy. Let's update main.js:

```js
game.addEnemy(testEnemy);
```

Now, when you open the browser, you should see the enemy moving as before. But, we can now add multiple enemies to the game at once, try adding a `setInterval` function to main.js around the code for creating new enemies and adding them to the game:

```js
setInterval(() => {
  const testEnemy = new Enemy({
    x: 100,
    y: -83,
    speed: { x: 0, y: 100 },
  });
  game.addEnemy(testEnemy);
}, 3000)
```

Now we see a new enemy ship appearing every 3 seconds! But all the ships are coming from the same position. Later today, we'll make it more interesting by introducing multiple spawn positions and randomly choosing one for each new ship. 

In practice, however, we don't want to have the enemy spawning logic inside of `main.js`, because then we won't have control over it from within the game. For example, let's say we wanted to make enemies spawn more quickly later on in the game. To do that, we need to make sure that we're triggering spawning from within our game loop.

### 2.5 Spawning Enemies within the Game Loop

To integrate enemy spawning into the game loop, we'll need to introduce a few changes:

1. Add `timeSinceLastSpawn`, and `spawnInterval` properties to the Game constructor.
2. Add a `spawnEnemies` method to the game which will use `deltaTime` to determine if it's time to call `addEnemy`.
3. Call `this.spawnEnemies(deltaTime)` from within the `updateEnemies` method so that the game loop will cause enemies to spawn when it's time.

#### 2.5.1. Adding Properties to track spawn times

We'll need to add these properties to the constructor:
```js
class Game {
  constructor({ container, player }) {
    // ...
    this.timeSinceLastSpawn = 3000;
    this.spawnInterval = 3000;
  }
}
```

#### 2.5.2. Spawning enemies

Now, let's add the `spawnEnemies` method, using `deltaTime` in combination with the game's `timeSinceLastSpawn` and `spawnInterval` to determine if we should add a new enemy.

```js
spawnEnemies(deltaTime) {
  this.timeSinceLastSpawn += deltaTime;
  if (this.timeSinceLastSpawn >= this.spawnInterval) {
    this.addEnemy(
      new Enemy({
        x: 100,
        y: -83,
        speed: { x: 0, y: 100 },
      })
    );
    this.timeSinceLastSpawn = 0;
  }
}
```

This method works by increasing the `timeSinceLastSpawn` by `deltaTime` each frame, then spawning an enemy and resetting `timeSinceLastSpawn` if the time has met or exceeded the `spawnInterval`. So, the `spawnInterval` determines how quickly new enemies spawn. If we decrease the `spawnInterval`, then enemies spawn more quickly.

Right now, all our enemies are still spawning from the same position. Let's make the game more interesting by having enemies spawn in random locations.

---

### 3. Enemy Spawn Locations

#### 3.1 Create and link spawn.js

We'll be adding the following logic to a new file called `spawn.js` that will hold logic for tracking and determining enemy spawn positions. Once you've created the file, make sure to link it within the `index.html` file: 

```html
<script src="scripts/game.js"></script>
<script src="scripts/bullet.js"></script>
<script src="scripts/enemy.js"></script>
<script src="scripts/player.js"></script>
<script src="scripts/spawn.js"></script>
<script src="scripts/main.js"></script>
```

#### 3.2. **Defining Spawn Points**

We'll define the spawn points as objects with `x` and `y` properties. Let's add the following code to our new `spawn.js` file:

```javascript
// scripts/spawn.js
const spawnPoints = [
  { x: 0, y: -83 },
  { x: 40, y: -83 },
  { x: 80, y: -83 },
  { x: 120, y: -83 },
  { x: 160, y: -83 },
  { x: 200, y: -83 },
  { x: 240, y: -83 },
  { x: 280, y: -83 },
  { x: 320, y: -83 },
  { x: 360, y: -83 },
  { x: 400, y: -83 },
  { x: 440, y: -83 },
  { x: 480, y: -83 },
  { x: 520, y: -83 },
  { x: 560, y: -83 },
  { x: 600, y: -83 },
];
```
📝 **Note**: Ensure the `x` values account for enemy width to prevent partial off-screen spawns.

#### 3.3. Using Set for Spawn Points

Convert your spawn points to a `Set` and manipulate the `Set` directly.

```javascript
const availableSpawnPoints = new Set(spawnPoints);
```

#### 3.4 Generating Randomized Spawn Points

Define a function that selects a random spawn point and removes it from the set of available spawn points.

```javascript
function getRandomSpawnPoint() {
  const pointsArray = Array.from(availableSpawnPoints);
  const randomPoint = pointsArray[Math.floor(Math.random() * pointsArray.length)];
  availableSpawnPoints.delete(randomPoint);
  return randomPoint;
}
```

#### 3.5. Adding spawn points back to the pool

##### 3.5.1. Define a function called `addSpawnPoint`
When ships are destroyed or fly out of the game area, their spawn points should be added back to the pool of available spawn points.

```javascript
function addSpawnPoint(point) {
  availableSpawnPoints.add(point);
}
```

##### 3.5.2 Tracking Enemy spawn points

In order to be able to restore a spawn point when an enemy leaves the game, we need to store spawn points when enemies are created
```js
// scripts/enemy.js
class Enemy {
  constructor({ x, y, speed }) {
    this.x = x;
    this.y = y;
    this.spawnPoint = { x: x, y: y };
    // ...
  }

  // ... 
}
```

##### 3.5.3. Restoring Spawn Points when Enemies are Removed

Next, we'll use this `spawnPoint` and the `addSpawnPoint` function when an enemy is removed from the game:

```js
// scripts/game.js
removeEnemy(enemy) {
  const index = this.enemies.indexOf(enemy);
  if (index > -1) {
    // remove 1 enemy from the array starting at the index of the enemy we found
    this.enemies.splice(index, 1);
    addSpawnPoint(enemy.spawnPoint);
    enemy.element.remove();
  }
}
```


#### 3.6 📝 **Manual Testing**

##### 3.6.1. Use the `getRandomSpawnPoint` function when spawning enemies

Upon spawning multiple enemies, they should appear at varied `x` coordinates along the top of the game area. We can position new enemies within the `spawnEnemies` function to make this happen.


```javascript
// scripts/game.js
spawnEnemies(deltaTime) {
  this.timeSinceLastSpawn += deltaTime;
  if (this.timeSinceLastSpawn >= this.spawnInterval) {
    const spawnPoint = getRandomSpawnPoint();
    this.addEnemy(
      new Enemy({
        x: spawnPoint.x,
        y: spawnPoint.y,
        speed: { x: 0, y: 100 },
      })
    );
    this.timeSinceLastSpawn = 0;
  }
}
```

##### 3.6.2 Verify random spawning in the browser

Validate the enemies' positions and ensure they spawn at the top of the game area at varying `x` coordinates.

Ensure that, when an enemy is removed, new enemies can spawn at that location. We can see this more easily if we reduce the spawnInterval for the game:

```js
this.spawnInterval = 500;
```

After making this change, you can see that enemies spawn from the top at random positions and that positions are not reused until an enemy has left the game area through the bottom. At this point, enemies can spawn and move and the player can move and shoot, but the bullets fly right through enemy ships! In the next lesson, we'll be adding collision logic, so that we can destroy enemy ships.

---

### Summary

During this week's lesson, we delved into the functionality of spawning and managing enemies, a pivotal aspect of our Space Invaders game. We explored the concept of spawning, learning how to manage the positions of multiple entities dynamically using the `Set` data structure in JavaScript. The lesson elucidated the utilization of timed events, like `setInterval`, to facilitate enemy actions, such as shooting, to be carried out at specific intervals, creating a rhythmic and challenging gameplay for the user.

We implemented the learned concepts in the codealong section, establishing the foundational logic for enemy entities in our game - ensuring they can be created, moved, and rendered within the game area. Furthermore, we introduced a mechanism to handle multiple enemies, employing an array to track and manage them, and implementing logic for their spawning, movement, and removal from the game.

In the upcoming lessons, we'll delve deeper into making our game more interactive and challenging, introducing concepts like collision detection and enemy shooting mechanics. The foundational knowledge from this lesson will pave the way for enhancing the dynamic and interactive elements of our game, ensuring a progressively challenging and engaging user experience.