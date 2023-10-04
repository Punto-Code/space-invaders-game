## Week 4: Spawning and Managing Enemy Movement

### Conceptual Overview (15-20 minutes)

#### 1. Enemy Spawning and Positioning
  - How games dynamically create enemies.
  - Positioning enemies so they do not overlap.

#### 2. Using `Set` in JavaScript
  - Introducing the `Set` data structure.
  - Ensuring unique values for enemy spawning coordinates.

#### 3. Timed Events and Enemy Actions
  - Using `setInterval` to create timed enemy actions.
  - Managing and clearing intervals.

#### 4. Enemy Shooting Mechanics
  - Implementing shooting logic for enemies.
  - Managing enemy bullets.

  ### Conceptual Overview for Lesson 4

---

#### 1. Spawning: Bringing Enemies to the Stage

In video games, *spawning* refers to the moment when a new entity, such as an enemy, item, or obstacle, is placed into the game world. When it comes to an array of enemies, their appearance should be regulated and strategic to introduce a progressive challenge to the player.

**Example**: Picture a beehive. Initially calm, but when disturbed, bees begin to emerge, one after the other, each buzzing in from different directions. In our game, spawning enemies is akin to releasing these bees. They appear at various positions, making the game space more dynamic and challenging.

In this lesson, we'll guide our enemy spaceships into the game, carefully ensuring they do not overlap and maintain a harmonious, yet challenging presence on the stage. To do this, we'll be tracking enemies within an array, just like we do with bullets. We'll also need to keep track of available spawning positions to make sure that new enemies don't spawn on top of existing enemies.

---

### 2. Managing Available Positions with `Set`

When spawning entities in a game, it's crucial to manage their initial positions to prevent overlaps and ensure a balanced setup. The `Set` object in JavaScript provides a straightforward way to keep track of unique values, which in this context, will be our available spawning positions.

#### **Example**

Envision a classroom with a limited number of desks. When a student (enemy spaceship) enters the room, they choose a desk (position) to sit at. The desk is then no longer available to others until the student leaves the room. Using a `Set`, we can efficiently manage these available desks to ensure each student has their own space.

#### **Utilizing `Set` in JavaScript**

##### Adding an Item:

When a spaceship is destroyed, its position becomes available again for new enemies to occupy.

```javascript
let availablePositions = new Set();
availablePositions.add("150,300");  // x,y coordinates are stored as a string.
```

##### Removing an Item:

When an enemy spaceship spawns, we'll remove its position from our `Set` of available positions.

```javascript
availablePositions.delete("150,300");  // The position is now occupied by an enemy.
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

#### 4. Ensuring Fair Play with Strategic Enemy Attacks

An integral part of game design is ensuring that enemy attacks are strategic, fair, and provide a balanced challenge. Our enemies should not just be obstacles; they should enhance the player's experience by providing calculated resistance.

**Example**: Think of playing dodgeball. The balls come at you in a manner that you can dodge if you're alert and strategic, not all at once, but in a way that keeps the game exciting and challenging.

In our digital universe, the enemy spaceships will unleash their attacks, not haphazardly, but with a cadence and pattern that demand skill and strategy from the player, ensuring the game is challenging, fair, and fun.

### Space Invaders Codealong (40-45 minutes)

---

### 1. Setting Up Enemy Logic

#### 1.1. **Enemy Class Definition**
  - Define the properties and methods of the Enemy class.
   
#### 1.2. **Enemy Element Creation**
  - Define how enemies will be visually represented on the screen.

#### 1.3. **Enemy Movement**
  - Implement logic for moving enemies.

📝 **Manual Testing**: Verify that an enemy can be created and drawn on the screen.

### 1. Setting Up Enemy Logic

#### 1.1. **Enemy Class Definition**

Creating an enemy involves defining a class that determines how the enemy behaves and interacts with other game elements. Here, we'll focus on creating an enemy that can move and be rendered in the game area.

##### Steps:

- **Step 1**: Define the `Enemy` class with a constructor that initializes its properties.

First, you'll need to create a file called `enemy.js` inside of the `scripts` directory and link to it within the `index.html` file.

```javascript
// scripts/enemy.js
class Enemy {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.width = 50;  // Arbitrary width
    this.height = 50; // Arbitrary height
    this.speed = 100; // Units per second
    this.element = this.createElement();
  }
}
```

#### 1.2. **Enemy Element Creation**

Creating a visual representation of the enemy using HTML elements allows us to visualize them in the game area.

##### Steps:

- **Step 2**: Add a method to create and style the enemy element, and add it to the game area.

```javascript
class Enemy {
  // ... Previous code ...

  createElement() {
    const el = document.createElement("img");
    el.src = "path_to_your_enemy_image.png";
    el.style.width = `${this.width}px`;
    el.style.height = `${this.height}px`;
    el.style.position = "absolute";
    document.getElementById("game").appendChild(el);
    return el;
  }
}
```

#### 1.3. **Enemy Movement**

Ensuring the enemy can move is vital to creating dynamic and engaging gameplay. Here, the enemy will move downwards at a steady pace.

##### Steps:

- **Step 3**: Implement a `move` method to update the enemy's position.

```javascript
class Enemy {
  // ... Previous code ...

  move(deltaTime) {
    this.y += this.speed * (deltaTime / 1000); // Move downwards
  }
}
```

- **Step 4**: Implement a `draw` method to render the enemy at its new position.

```javascript
class Enemy {
  // ... Previous code ...

  draw() {
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}
```

#### 📝 **Manual Testing**

After implementing these sections, let’s validate our progress:

- **Step 5**: Create an instance of the `Enemy` class and test it.

```javascript
const testEnemy = new Enemy({ x: 100, y: 100 });
testEnemy.createElement();
```

- **Step 6**: Move and draw the enemy in your game loop, ensuring it appears and moves downwards.

```javascript
let lastTime = 0;
function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  
  testEnemy.move(deltaTime);
  testEnemy.draw();
  
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
```

- **Step 7**: Observe the behavior of the enemy in the browser. It should appear at `(100, 100)` and move downwards steadily.

Now that you have successfully set up the basic logic for the `Enemy` class, you can proceed to the next section of your code-along, where you will manage multiple enemies and interact with them. This foundational knowledge will be crucial as we proceed to add further complexity and interactions to our game.

---

### 2. Enemy Spawning

#### 2.1. **Defining Spawn Points**
  - Define the points where enemies can potentially spawn.

#### 2.2. **Using Set for Spawn Points**
  - Explain the usage of `Set` to manage unique spawn points.
   
#### 2.3. **Randomized Spawning**
  - Implement logic to randomly select a spawn point.

📝 **Manual Testing**: Manually create enemies at different spawn points and verify their positions.

---

### 3. Managing Multiple Enemies

#### 3.1. **Enemy Array Initialization**
  - Initialize an array to manage multiple enemies.

#### 3.2. **Adding and Removing Enemies**
  - Implement logic to dynamically add and remove enemies from the game.

📝 **Manual Testing**: Verify that enemies can be added dynamically and are managed correctly.

---

### 4. Enemy Shooting Mechanics

#### 4.1. **Enemy Bullet Logic**
  - Implement shooting logic for enemies.

#### 4.2. **Managing Enemy Bullets**
  - Implement logic to manage enemy bullets.

📝 **Manual Testing**: Verify that enemies can shoot bullets and that bullets are managed correctly.

---

### 5. Timed Enemy Actions

#### 5.1. **Timed Shooting**
  - Use `setInterval` to make enemies shoot at regular intervals.
   
#### 5.2. **Managing Intervals**
  - Ensure intervals are cleared when no longer needed (e.g., enemy is destroyed).

📝 **Manual Testing**: Ensure enemies shoot at regular intervals and intervals are managed properly.

---

### 6. Integrating Enemies into the Game Loop

#### 6.1. **Updating Enemies**
  - Implement logic to update enemies during the game loop.

#### 6.2. **Handling Enemy-Bullet Interactions**
  - Implement logic for what happens when enemy bullets interact with the player.

📝 **Manual Testing**: Verify that enemies and enemy bullets are updated during the game loop.

---

### Additional Notes:

- **Challenges and Variations**: Consider providing students with challenges or variations to try out after the lesson to solidify their understanding and challenge their new skills. For example, adjusting the rate of enemy fire, implementing different enemy types, or creating levels with increasing difficulty.
   
- **Recap and Homework**: Summarize the main points of the lesson and consider assigning homework or practice exercises to solidify the learning and prepare students for the next lesson.

This comprehensive lesson plan for Week 4 should provide a strong foundation for students to understand enemy spawning, shooting, and managing multiple enemies in a game scenario while also being introduced to the `Set` data structure and timed events using `setInterval`. Throughout the lesson, the emphasis on manual testing ensures that students are verifying their work as they go, reinforcing learning through immediate application and feedback.