## Week 3: Player Movement and Shooting

**Summary:**
- [Conceptual Overview](#concepts-15-20-minutes)
- [1. Bullet Class: Introduction and Dynamics](#1-bullet-class-introduction-and-dynamics)
- [2. Managing Bullets in the Game: A Technical Deep Dive](#2-managing-bullets-in-the-game-a-technical-deep-dive)
- [3. Player Shooting Mechanics and Integration](#3-player-shooting-mechanics-and-integration)

---

### Concepts (15-20 minutes)

#### 1. Dynamic Element Creation with `document.createElement`

In many games, especially those that involve interactions like shooting or spawning new enemies, there's a need to create new visual elements on the fly. In JavaScript, we have a powerful tool at our disposal: `document.createElement`.

Using `document.createElement`, we can dynamically generate new DOM elements without having them initially present in our HTML markup.

**Example**: Imagine you have a magic hat, and every time you wave a wand, a rabbit appears out of it. The hat is our game, the wand wave is an action (like pressing a button), and the rabbit is the new game element we create using `document.createElement`.

In our game, we'll use this technique to create bullets every time the player shoots. This allows for dynamic gameplay where the number of game elements can change based on player actions.

#### 2. Cooldowns and Time Management

In the world of gaming, a cooldown is a period after a particular action during which that action cannot be used again. Think of it like needing to wait a few seconds before you can fire a powerful laser from your spaceship again.

**Example**: Think of a water gun that takes 5 seconds to recharge after you've sprayed all its water. Once you've sprayed, you can't immediately spray again. You have to wait (or "cooldown") for 5 seconds before you can use it again.

In our game, we use this concept for shooting bullets. By implementing a cooldown system, we prevent the player from shooting bullets continuously and make the game more challenging.

#### 3. Movement: Update and Redraw

Every moving object in a game gives an illusion of motion. This illusion is achieved by continuously updating the object's position and then redrawing it at its new location.

**Example**: Think of a flipbook animation. Each page of the flipbook shows a character in a slightly different position. When you flip through the book rapidly, the character appears to move, but in reality, you're just seeing a series of static images shown in rapid succession.

In our game, each frame (or page, in the case of our flipbook analogy) is a moment in time. In each frame, we update our object's positions based on their speed and then redraw them at their new coordinates.

#### 4. Managing Collections of Objects

Games often involve multiple interactive elements. Managing these elements individually would be cumbersome. Instead, we group similar objects, like bullets or enemies, into collections (like arrays) to manage them together.

**Example**: Think of a toy box filled with different kinds of toys. If you wanted to play with all the toy cars, you wouldn't want to dig through the entire box looking for each car. Instead, you'd wish the cars were all kept together in a smaller box inside the bigger toy box. In our game, arrays are like these smaller boxes, helping us organize and manage our game elements efficiently.

In this lesson, we'll use arrays to manage our bullets. As we shoot bullets, we'll add them to our collection. If a bullet goes off the screen or hits an enemy, we'll remove it from our collection.

## Space Invaders Codealong (40-45 minutes)

---

### 1. Updating the Game Loop

The game loop is essential for updating game state and redrawing elements on the screen. Let's enhance our game loop to accommodate bullet mechanics.

In the `Game` class:

#### 1.1. **Initialization of Bullet Array**: Start by initializing an array to manage bullets.
```js
this.bullets = [];
```

#### 1.2. **Game Loop Enhancements**: Modify the game loop to accommodate shooting mechanics and bullet updates.
```js
if (this.keyStates[" "]) {
  // Player shooting logic will go here
} else {
  // Cooldown refreshing logic will go here
}
// Bullet movement logic will go here
```

📝 **Manual Testing**: For now, the game should run smoothly with player movement. No visible changes, but ensure there are no console errors and you can still move the player.

---

### 2. Bullet Class: The Basics

Time to define our bullets!

#### 2.1. **Bullet Definition**: In a new file named `bullet.js`, define the `Bullet` class.
```js
// scripts/bullet.js
class Bullet {
  constructor({ x, y, width, height, color, speed }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.element = this.createElement();
  }
}
```

The bullet constructor allows for the coordinates, dimensions and color of bullets to be set by passing an object with the corresponding properties. We'll see some examples in a minute.

#### 2.2. **Bullet Element Creation**: Add a method to generate the bullet's visual representation.

The `createElement` method will be in charge of creating the bullet element that will be visible in the game area. We'll give it a className of "bullet", so that we can style it appropriately. We'll also assign its styles based on the bullet instance's properties: color, width, height, x, and y.

```js
createElement() {
  const el = document.createElement("div");
  el.className = "bullet";
  el.style.backgroundColor = this.color;
  el.style.width = `${this.width}px`;
  el.style.height = `${this.height}px`;
  el.style.borderRadius = "50%";
  el.style.transform = `translate(${this.x}px, ${this.y}px)`;
  return el;
}
```

#### 2.3. Positioning Bullet elements

In order for the coordinates to be accurately positioned via the transform/translate style property, we need to make sure that all bullets are absolutely positioned within the game container at the same point. That way, the translations due to x and y values will place each bullet in the proper place consistently. All values for x and y are relative to the top left of the game area, so we'll absolutely position all game elements to the top left.

```css
#player {
  width: 50px;
  height: 50px;
}

#player, .bullet {
  position: absolute;
  top: 0;
  left: 0;
}
```

#### 2.4. Moving Bullets

Bullets, much like our player, will move on the screen. We'll use a similar logic: update the bullet's position based on its speed and redraw it.

```js
move(deltaTime) {
  this.y += this.speed.y * deltaTime/1000;
  this.x += this.speed.x * deltaTime/1000;
}

draw() {
  this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
}
```

The movement is the result of updating an object's coordinates and then visually redrawing it at its new position on the screen. Note that in this case our speed has both an `x` and a `y` property. This means that we can use the bullet constructor to create bullets that move horizontally as well as vertically by passing in a speed that looks something like this:

```js
const bulletSpeed = {
  x: 1,
  y: -10
}
```

#### 2.5. Keeping Bullets In-Bounds

As bullets travel, some might fly off the screen if they don't collide with other game elements first. We need a mechanism to detect this so the game isn't tracking a bunch of bullets that are no longer relevant. We'll incorporate the width and height of the bullet (`this.width` and `this.height`) in our calculations so that we don't consider a bullet out of range until it is entirely invisible from within the game area.

```js
isOutOfBounds(containerHeight, containerWidth) {
  // this.y is between -this.height and containerHeight + this.height
  const isInYRange = (-this.height < this.y) && (this.y < containerHeight + this.height);
  // this.x is between -this.width and containerWidth + this.width
  const isInXRange = (-this.width < this.x) && (this.x < containerWidth + this.width);
  // return true if the bullet is not within both x and y range
  return !(isInYRange && isInXRange);
}
```

This method checks if a bullet is outside the game area. If it is, we'll want to remove it. We'll want to use this method inside of our game loop.

#### 2.6. **Load the bullet script in index.html**

```html
<script src="scripts/game.js"></script>
<script src="scripts/bullet.js"></script>
<script src="scripts/player.js"></script>
<script src="scripts/main.js"></script>
```

📝 **Manual Testing**: There won't be any bullets yet, but ensure the new file is linked and no console errors arise.

---

#### 3. Managing Bullets in the Game

Next, we'll integrate bullet management into the game. We've already added an empty array of `this.bullets` to the game, now we need to add logic for adding and removing bullets from the game. We're using the `this.bullets` array to track bullets that are on screen at the time, so every time a new bullet is shot, it should be added to the array. Every time a bullet leaves the screen, it should be removed from the array.

##### 3.1 **Adding Bullets**: Introduce a method to add bullets to the game.
We'll add this method below the `Game` constructor in `scripts/game.js`.
```js
// scripts/game.js
addBullet(bullet) {
  this.bullets.push(bullet);
  this.container.appendChild(bullet.element);
}

- `this.bullets.push(bullet)`: This adds the bullet instance to our array.
  
- `this.container.appendChild(bullet.element)`: This is where the magic happens. The `appendChild()` method is a standard DOM API function that adds a child element to a parent element. In our case, we're adding the bullet's visual representation (`bullet.element`) to our game container. Now, it'll be visually present in our game.

📌 **Note**: The `appendChild()` function is vital in web game development. It allows us to dynamically add elements to our game screen. In our game, every time the player shoots, we're creating a new `Bullet` instance and adding it to the DOM, making it visible to the player.
```

##### 3.2. **Removing Bullets**: Introduce a method to remove bullets from the game.
We'll add this next method directly below `addBullet`.
```js
removeBullet(bullet) {
  const index = this.bullets.indexOf(bullet);
  if (index > -1) {
    // remove 1 bullet from the array starting at the index of the bullet we found
    this.bullets.splice(index, 1);
    bullet.element.remove();
  }
}
```

- `this.bullets.indexOf(bullet)`: This finds the index of the bullet in our array. If it's not present, it returns `-1`. The `bullet` will most likely be present when this method is called, but it's always good to guard against the possibility that it isn't!

- `this.bullets.splice(index, 1)`: The `splice()` method removes elements from an array. We're removing the bullet instance from our array by removing 1 element from the array starting at the index of the bullet that we found using `indexOf`.

- `bullet.element.remove()`: This is another essential DOM method. It completely removes an element from the DOM. So, our bullet's visual representation is taken off the game screen.

📌 **Note**: The `remove()` method is crucial for cleaning up our game and ensuring we're not bogging down the browser with unnecessary elements. In a game where hundreds or thousands of bullets might be shot, cleaning up off-screen or irrelevant bullets is a performance necessity.

##### 3.3 **Bullet Update Logic**: Implement bullet movement and removal logic.

The game loop should ensure that all bullets move between every frame, check if they're now out of bounds, and remove them if necessary. We'll store this logic in a method called `updateBullets`.
```js
// scripts/game.js
updateBullets(deltaTime) {
  this.bullets.forEach((bullet) => {
    bullet.move(deltaTime);
    if (bullet.isOutOfBounds(this.container.clientHeight, this.container.clientWidth)) {
      this.removeBullet(bullet);
    } else {
      bullet.draw();
    }
  });
}
```

In order for this method to do anything for us, we need to make sure we call it from the game loop!

```js
if (this.keyStates[" "]) {
  // Player shooting logic will go here
} else {
  // cooldown refreshing logic will go here
}
this.updateBullets(deltaTime);
```

📝 **Manual Testing**: Pressing the space key won't shoot bullets yet, but we can create one manually to make sure movement works as expected:

```js
// scripts/main.js
const gameContainer = document.getElementById("game");
const player = new Player({ x: 300, y: 590 });
const game = new Game({
  container: gameContainer,
  player: player,
});
game.start();
// add a bullet after the game starts
game.addBullet(new Bullet({
  x: 300,
  y: 540,
  width: 6,
  height: 10,
  color: "red",
  speed: {
    x: 0, 
    y: -10,
  }
}))
```

Notice that a bullet appears and slowly moves towards the top of the game area. Try changing the value of the bullet's `speed.y` property to expirement with different speeds.

```js
speed: {
  x: 0, 
  y: -200,
}
```

Notice that the bullet now moves much more quickly to the top of the game area. Feel free to remove this code after testing it out as we won't be needing it for the final game!

---

### 4. Player Shooting Mechanics

Finally, we want to empower the player to shoot bullets. Players should be able to shoot by holding down the space bar, but they will have a cooldown to limit the rate at which new bullets can be fired.

#### 4.1. **Cooldown System**: 

In the `Player` class, update the constructor:

```js
this.firingCooldown = 150;
this.lastShotTime = -this.firingCooldown;
```
We're starting with the lastShotTime as `-this.firingCooldown`, which is `-150` in this case, so that our cooldown is not active to start and the player can shoot right away.

#### 4.2. **Cooldown Logic**: Implement the cooldown mechanism for shooting.

Every game action, especially one as impactful as shooting, typically has a cooldown to prevent spamming and balance the gameplay.

We'll add the `shootIfReady` method to the `Player` class below `move` and `draw` in the `scripts/player.js`:

```js
shootIfReady(deltaTime) {
  // update the timeSinceLast shot by adding the deltaTime amount
  this.lastShotTime += deltaTime;
  // if the time since our last shot has met or exceeded the cooldown
  if (this.lastShotTime >= this.firingCooldown) {
    // then we'll reset the time since our last shot to 0 
    this.lastShotTime = 0;
    // and fire a bullet
    return this.shoot();
  }
  // we return null from this method if no shot is fired so we know
  // when we call the method whether or not a bullet was fired
  return null;
}
```

- `this.lastShotTime += deltaTime`: Here, we're incrementing the `lastShotTime` by the time elapsed since the last frame. It's essentially a timer counting up.
  
- The condition `this.lastShotTime >= this.firingCooldown` checks if enough time (in milliseconds) has passed since the last shot. If it has, the player is ready to shoot again.
  
- Inside the condition, we reset `this.lastShotTime` to zero and call the `shoot()` method to fire a bullet. The `shoot()` method returns the bullet that is fired.

Note also that we're returning either the bullet returned from `this.shoot()` or `null` from this method. This is important, because this method can return a truthy or a falsey value depending on whether the player was in fact ready to shoot when it was called. We'll take advantage of this within the `Game` loop:

- whenever a player is holding the spacebar during a frame, we'll call `shootIfReady()` and store the result in a variable `bullet`
- We can use an if statement, to ensure that:
  - if the `bullet` variable is truthy (not null)
    - we can call the `addBullet` method to add it to the array of bullets that the game is tracking every frame. 
  - if the `bullet` variable is not truthy (is null)
    - we don't call `addBullet`, ensuring that we're not adding empty elements to the game's array of bullets

#### 4.3 **Updating the Cooldown

If the player isn't shooting, we still need to keep updating our cooldown timer.

```js
refreshCooldown(deltaTime) {
  this.lastShotTime += deltaTime;
}
```

- This method simply keeps our `lastShotTime` ticking up with every frame. 
- If the player decides to shoot
  - the `shootIfReady` method will check the `this.lastShotTime` timer to determine whether a bullet can be fired
- If the player is moving without shooting
  - the `refreshCooldown` method will update the `lastShotTime` by `deltaTime` (the amount of time passed in the frame) 

#### 4.4. **Bullet Positioning**: Calculate where the bullet should originate from.

To make our shooting more realistic, we want bullets to appear from the center of our ship. This method calculates that position.

```js
center() {
  return {
    x: this.x + this.width / 2,
    y: this.y + this.height / 2,
  };
}
```

- `this.x + this.width / 2`: This calculates the horizontal (x) center of our player ship.
  
- `this.y + this.height / 2`: Similarly, this calculates the vertical (y) center.

#### 4.4 **Shooting a Bullet**: `shoot()`

Once the player is ready to shoot (based on our cooldown logic), this method is called. Remember that the `x=0, y=0` position is at the top left of the game area. Increasing `x` will move an element towards the right and increasing `y` will move an element towards the bottom.

When we create the new bullet, we want to position it at the top center of the player's ship, so we need to calculate this position by setting `x` and `y` for the bullet based on the `x` and `y` position of the ship. (an image or diagram might be helpful here)

We can use the `center()` method to ensure that the bullet's x coordinate aligns with the center of the ship. For the vertical position, the player's `y` coordinate aligns with the top of the ship.

```js
shoot() {
  const bulletWidth = 6;
  const bulletHeight = 10;
  return new Bullet({
    x: this.center().x - bulletWidth/2,
    y: this.y - bulletHeight,
    width: bulletWidth,
    height: bulletHeight,
    color: "red",
    speed: { x: 0, y: -200 },
  });
}
```

- First, we define the dimensions of our bullet.
  
- Next, we create a new instance of our `Bullet` class.
  - For the bullet's x position (`x: this.center().x - bulletWidth/2`), we use the player's center and adjust for half the bullet's width to ensure it appears centered. We need to do this because the x and y coordinates of both the player and the bullet refer to the top left corner of the bullet element. So, if we just used `this.center().x`, the bullets would actually be a bit off-center to the right of the ship. Feel free to try out this method without the `-bulletWidth/2` and see for yourself!
  
  - For the y position (`y: this.y - bulletHeight`), we make the bullet appear slightly above the player's top edge.

Finally, we need to update the game loop to make use of these methods and call them at just the right time.

---

#### 5. Integrating Player Shooting with the Game Loop

In this step, we'll make sure that when the player is holding down the space bar they'll be able to fire bullets according to the cooldown.

**Game Loop Shooting Integration**: In the game loop, finalize the shooting logic.
```js
if (this.keyStates[" "]) {
  const bullet = this.player.shootIfReady(deltaTime);
  if (bullet) {
    this.addBullet(bullet);
  }
} else {
  this.player.refreshCooldown(deltaTime);
}
```

📝 **Manual Testing**: Play the game! You should now be able to move the player and shoot bullets seamlessly. Feel free to experiment with different values for the speed of bullets and the firing cooldown to see how it affects the game.

---

By now, you should have a deep understanding of how bullets are managed in the game. You've learned how to dynamically add and remove elements in the DOM, use arrays to manage game objects, and integrate all of these into a continually updating game loop.