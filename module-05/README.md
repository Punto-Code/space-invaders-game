## Module 5: Handling Collisions and Explosions

## Table of Contents

1. [Conceptual Overview](#conceptual-overview-15-20-minutes)
   - [Collision Detection](#collision-detection)
   - [Explosions and Visual Feedback](#explosions-and-visual-feedback)
2. [Space Invaders Codealong](#space-invaders-codealong-40-45-minutes)
   - [Collision Detection](#1-collision-detection)
   - [Handling Explosions](#2-handling-explosions)
   - [Restarting the Game](#3-restarting-the-game)
   - [Making Enemies Shoot](#4-making-enemies-shoot)

## Conceptual Overview (15-20 minutes)

### Collision Detection

In the gaming world, collision detection plays a pivotal role in enhancing interactivity and realism. It involves determining whether two or more entities (e.g., player, bullet, enemy) come into contact or overlap during gameplay.

**Example**: Imagine a game of pool. The interaction between balls, their movement post-collision, and even scoring all hinge on accurately detecting when and how the balls collide. Likewise, in our space-invaders game, detecting collisions between bullets and spaceships or between the player and enemies will dictate game progression, scoring, and player feedback.

We'll be implementing collision detection using bounding boxes in 2D space, specifically utilizing the Axis-Aligned Bounding Box (AABB) method. Here's a breakdown of the method and its logic:

#### `hasCollision(objectA, objectB)`

This method is meant to check whether `objectA` is colliding with `objectB`.

#### `getBoundingClientRect()`

```javascript
const rectA = objectA.element.getBoundingClientRect();
const rectB = objectB.element.getBoundingClientRect();
```

The `getBoundingClientRect()` method returns a `DOMRect` object providing information about the size of an element and its position relative to the viewport. The `DOMRect` object has properties like `left`, `right`, `top`, and `bottom` that give the x and y coordinates of the rectangle's edges.

#### Non-Collision Logic

The conditions for a non-collision (in AABB) are:

1. The left edge of box A is to the right of the right edge of box B.
2. The right edge of box A is to the left of the left edge of box B.
3. The top edge of box A is below the bottom edge of box B.
4. The bottom edge of box A is above the top edge of box B.

If any of these conditions are true, box A and box B are not colliding.

```js
return (
  rectA.left > rectB.right || // rectA is to the right of rectB
  rectA.right < rectB.left || // rectA is to the left of rectB
  rectA.top > rectB.bottom || // rectA is below rectB
  rectA.bottom < rectB.top // rectA is above rectB
);
```

This logic checks that the rectangles are not in collision with one another.

#### Visualization

If you visualize two rectangles (A and B) in a 2D space:

- If A's left edge is to the right of B's right edge, A is entirely to the right of B.
- If A's right edge is to the left of B's left edge, A is entirely to the left of B.
- If A's top edge is below B's bottom edge, A is entirely below B.
- If A's bottom edge is above B's top edge, A is entirely above B.

If any of these cases is true, then we don't have a collision. Conversely, if none of these cases is true, then we do have a collision.

#### Collision Logic

So, if all of the above conditions are **not** true, then we have a collision. We can express that logically by reversing these conditions (using `<` and `>` instead of `>` and `<`, respectively) and checking that **all** are met to check for a state of collision instead of non-collision.

```javascript
return (
  rectA.left < rectB.right && // left of A is left of right of B
  rectA.right > rectB.left && // right of A is right of left of B
  rectA.top < rectB.bottom && // top of A is above bottom of B
  rectA.bottom > rectB.top // bottom of A is below top of B
);
```

#### Explanation in Simple Terms

Let's say rectA is a bullet and rectB is a spaceship.

- **First Condition** `rectA.left < rectB.right`: This checks if the left edge of the bullet is to the left of the right edge of the spaceship.
- **Second Condition** `rectA.right > rectB.left`: This checks if the right edge of the bullet is to the right of the left edge of the spaceship.

- If both of these first two conditions are true, it means the objects intersect along the horizontal axis. This means that the bullet's left and right boundaries overlap the left and right boundaries of the spaceship.
- **Third Condition** `rectA.top < rectB.bottom`: This checks if the top edge of the bullet is above the bottom edge of the spaceship.
- **Fourth Condition** `rectA.bottom > rectB.top`: This checks if the bottom edge of the bullet is below the top edge of the spaceship.

- If both of these final two conditions are true, it means that the objects intersect along the vertical axis. This means that the bullets top and bottom boundaries overlap the top and bottom boundaries of the spaceship.

All these conditions need to be `true` for a collision to occur. If any of them are `false`, it means the objects are not colliding. This is a common and efficient way to check for collisions between rectangular objects in 2D games.

---

### Explosions and Visual Feedback

A splendid explosion following a successful hit provides visual and auditory feedback to the player, signaling a successful action while also enhancing the game's aesthetic and emotional impact.

**Example**: Picture a fireworks show. The explosions illuminate the night sky, providing a visual spectacle and a sense of celebration or achievement. In our game, explosions act similarly, rewarding players with satisfying visual feedback upon successfully hitting an enemy.

In this module, we'll explore how to detect collisions and create an explosion effect, providing valuable feedback and elevating the gaming experience.

```js
explode() {
  this.element.classList.add("exploded")
}
```

---

### Space Invaders Codealong (40-45 minutes)

---

### 1. Collision Detection

#### 1.1. **Detecting Collisions**

Collision detection is fundamental to interactive and dynamic gameplay. It allows us to determine when game entities (bullets, enemies, player) interact, enabling us to script consequential actions, such as reducing health, scoring points, or triggering explosions.

In this case, we have a few types of collisions that will be relevant:

- Enemy collides with the Player
- Bullet collides with an Enemy
- Bullet collides with the Player

At the moment, the enemy spaceships can't shoot, but we'll handle all three cases anyway. Because the Game is tracking all of these entities, it should contain the collision detection logic as well.

#### 1.2. `hasCollision(objectA, objectB)`

Let's add a method called `hasCollision` to the Game class. It will take two arguments, objectA and objectB. These will receive an instance of Enemy, Player, or Bullet as we check collisions during each frame.

```js
// scripts/game.js
hasCollision(objectA, objectB) {
  const rectA = objectA.element.getBoundingClientRect();
  const rectB = objectB.element.getBoundingClientRect();

  return (
    rectA.left < rectB.right && // left of A is left of right of B
    rectA.right > rectB.left && // right of A is right of left of B
    rectA.top < rectB.bottom && // top of A is above bottom of B
    rectA.bottom > rectB.top    // bottom of A is below top of B
  );
}
```

We need to use this method to recognize the 3 types of collisions we specified above. We'll want to incorporate the check inside of methods that are already getting called every frame within our game loop.

| Objects           | where we'll check for collisions |
| :---------------- | -------------------------------- |
| Enemy <-> Player  | updateEnemies                    |
| Bullet <-> Enemy  | updateBullets                    |
| Bullet <-> Player | updateBullets                    |

#### 1.3. Handling Collisions Between Enemy and Player

```js
updateEnemies(deltaTime) {
  this.spawnEnemies(deltaTime);
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
      // add conditional logic to check for collision here
      if(this.hasCollision(enemy, this.player)) {
        console.log("Enemy collides with player!");
      } else {
        enemy.draw();
      }
    }
  });
}
```

Now, open up the browser and navigate the player so that it collides with one of the enemies. The enemy should stop moving and you should see the message printed to the console.

#### 1.4. Handling collisions between Bullets and Enemies

Within the `updatebullets` method, we'll check for collisions between each bullet and the player along with all enemy spaceships.

```js
updateBullets(deltaTime) {
  this.bullets.forEach((bullet) => {
    bullet.move(deltaTime);
    if (
      bullet.isOutOfBounds(
        this.container.clientHeight,
        this.container.clientWidth
      )
    ) {
      this.removeBullet(bullet);
    } else {
      // check for collisions between this bullet and any enemy
      this.enemies.forEach((enemy) => {
        if (this.hasCollision(bullet, enemy)) {
          console.log("bullet hits enemy");
        }
      })
      bullet.draw();
    }
  });
}
```

Open up the browser with the console open and try firing at enemy spaceships. When a collision occurs, you should see the "bullet hits enemy" message appear in the console.

#### 1.5. Handling Collisions Between Bullets and the Player

Below the enemy collision detection inside `updateBullets`, we also need to check for collisions between each bullet and the player. 

```js
// check for collisions between this bullet and any enemy
this.enemies.forEach((enemy) => {
  if (this.hasCollision(bullet, enemy)) {
    console.log("bullet hits enemy");
  }
})
// check for collisions between this bullet and the player
if (this.hasCollision(bullet, this.player)) {
  console.log("bullet hits player");
}
bullet.draw();
```

After adding this code, return to the browser and fire a few shots at enemy spaceships. Notice that the "bullet hits player" message is logged whenever we shoot! That's not right!

We only want to check collisions between the player and bullets that are moving downwards, not bullets that are fired upwards towards enemies.

```js
// check for collisions between this bullet and the player
if (bullet.speed.y > 0 && this.hasCollision(bullet, this.player)) {
  console.log("bullet hits player");
}
```

Return to the browser now and verify that you can fire bullets without triggering this "bullet hits player" console log. 

### 2. Handling Explosions

#### 2.1. Making Enemy Ships Explode

When a bullet collides with an enemy, it should explode. What this means is that the ship will stop moving and its background image will be replaced by the background image of an explosion and then will disappear after a short time.

The game is in charge of tracking and moving enemies, so we'll need to remove the enemy when it collides with a bullet. For changing the image background, we'll add destruction logic to the `Enemy` class in the method called `explode()` that will handle replacing the image with an image of an explosion and then remove the element from the DOM after a 2000 millisecond timeout. We'll swap the backgrounds by adding an `exploded` class to the enemy element.

```js
// scripts/enemy.js
explode() {
  this.element.classList.add("exploded")
}
```

We'll add the `.exploded` class to our stylesheet to replace the background image. For now, we'll use the same explosion background for both the player and the enemy elements:

```css
.enemy.exploded,
#player.exploded {
  background-image: url("https://res.cloudinary.com/dm5zvhgto/image/upload/v1695268034/punto-code/space-invaders/images/explosion-transparent_arvhvk.png");
}
```

We're using a compound selector here because we want to more specifically target the element that has the exploded class added to it so that the background-image overrides the original background-image. Feel free to read more about [CSS specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) if you like.

Next, we'll want to call this method from within `updateBullets` if a collision occurs between a bullet and an enemy.

```js
// scripts/game.js
// check for collisions between this bullet and any enemy
this.enemies.forEach((enemy) => {
  if (this.hasCollision(bullet, enemy)) {
    enemy.explode();
    this.removeEnemy(enemy);
    this.removeBullet(bullet);
  }
})
```

Now, if we go back to the browser and shoot at enemy ships, we'll notice that they disappear immediately when hit by a bullet. In order for us to see the explosion, we need to delay in removing the enemy element for 2 seconds:

```js
// scripts/game.js
removeEnemy(enemy) {
  const index = this.enemies.indexOf(enemy);
  if (index > -1) {
    // remove 1 enemy from the array starting at the index of the enemy we found
    this.enemies.splice(index, 1);
    addSpawnPoint(enemy.spawnPoint);
    setTimeout(() => {
      enemy.element.remove();
    }, 2000)
  }
}
```

Now, when we revisit the browser, we should see explosions every time we hit an enemy ship with one of our bullets!  The explosions will disappear after 2 seconds.

#### 2.2. Making the Player Explode Upon Collision

When the player's ship collides with an enemy ship or with a bullet, it should explode as well. 

We'll need another `explode()` method inside the `Player` class:

```js
explode() {
  this.element.classList.add("exploded");
}
```

##### 2.2.1 Exploding on Collision with a Bullet

We can add the bullet collision code within the `updateBullets` method:

```js
// check for collisions between this bullet and the player
if (bullet.speed.y > 0 && this.hasCollision(bullet, this.player)) {
  this.player.explode();
}
```

We won't be able to set this out yet because we haven't given our enemies the ability to shoot. We'll have to come back and test this later after our enemies can shoot.

##### 2.2.2 Exploding on Collision with an Enemy Ship

We can also add this explosion method to our `updateEnemies` method so that if a collision occurs between an enemy and the player we trigger an explosion of both the enemy and the player in that case.

```js
// scripts/game.js (within updateEnemies else clause)
if (this.hasCollision(enemy, this.player)) {
  this.player.explode();
  enemy.explode();
} else {
  enemy.draw();
}
```

Now, if we go back to the browser and let an enemy ship fly into us, both ships will explode! However, when this happens, ships are still flying around and we don't have a way of starting again. We can even move our exploded ship around and fire bullets!

### 3. Restarting the Game

We need to introduce the idea of stopping, restarting and resetting the game. 

#### 3.1 Paused styles

If the game is paused, we'll give it a class called 'paused' that will darken the background a bit.

```css
#game.paused:before {
  filter: brightness(50%);
}
```


#### 3.2. Pausing and Unpausing

To pause and unpause the game, the game needs to know whether it is paused or not. So, let's add an isPaused property to the constructor.

```js
// scripts/game.js
class Game {
  constructor({ container, player }) {
    // ....
    this.isPaused = false;
  }
}
```

Then we'll add a method called `togglePause()` that will switch the game from paused to unpaused:

```js
// scripts/game.js
togglePause() {
  this.isPaused = !this.isPaused;
  if(this.isPaused) {
    this.container.classList.add("paused");
  } else {
    this.container.classList.remove("paused");
  }
}
```

If we switch to the browser now and call:

```js
game.togglePause();
```

We can see that the game are darkens. But, the ships are still moving! To pause the game, we need to adjust the game loop so we only update any ship, bullet, or player movement if the game is not paused.

```js
// scripts game.js
start() {
  this.setupPlayerControls();
  let lastTime = 0;
  const gameLoop = (timeStamp) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    // all updating logic should run when game is unpaused
    if (!this.isPaused) {
      if (this.keyStates.ArrowLeft) {
        this.player.move("left", deltaTime);
      }
      if (this.keyStates.ArrowRight) {
        this.player.move("right", deltaTime);
      }
      if (this.keyStates[" "]) {
        const bullet = this.player.shootIfReady(deltaTime);
        if (bullet) {
          this.addBullet(bullet);
        }
      } else {
        this.player.refreshCooldown(deltaTime);
      }
      this.updateBullets(deltaTime);

      this.player.draw();

      this.updateEnemies(deltaTime);
    }

    requestAnimationFrame(gameLoop);
  };
  requestAnimationFrame(gameLoop);
}
```

Now, when we return to the browser and run:

```js
game.togglePause()
```

We see that the ships, bullets, and player all stop moving!  We also can't fire bullets or move the ship while the game is paused, because all the logic for handling keyStates is inside of the conditional statement we added.

#### 3.3. Using the Keyboard to Pause and Unpause

Now that we know we've got the logic down for pausing and unpausing the game, we want to be able to do so from the keyboard. 

Let's make it so pressing the "p" key will pause/unpause the game. So, let's take a look at the `setupPlayerControls()` method and add to the `keydownHandler`.

```js
setupPlayerControls() {
  this.keydownHandler = (e) => {
    if (this.keyStates.hasOwnProperty(e.key)) {
      this.keyStates[e.key] = true;
    }
    if(e.key === "p" || e.key === "P") {
      this.togglePause();
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

Go back to the browser and try out pausing and unpausing the game using the "p" key.

#### 3.4. Pausing the game upon Player Destruction

The game should be paused if the player's ship explodes. 

```js
// scripts/game.js 
// inside updateEnemies
if (this.hasCollision(enemy, this.player)) {
  this.player.explode();
  this.togglePause();
  enemy.explode();
} else {
  enemy.draw();
}

// inside updateBullets
if (bullet.speed.y > 0 && this.hasCollision(bullet, this.player)) {
  this.player.explode();
  this.togglePause();
}
```

Now, go back to the browser and let an enemy collide with the player. You'll see that both explode and the game pauses!

#### 3.5 Resetting the Game from Pause

If the game is paused, we want to allow the game to be reset to the starting position.

Define a method called `reset()` for both the player and the game.

```js
// scripts/player.js
reset() {
  this.x = 300;
  this.element.classList.remove("exploded");
  this.draw();
}
```

- `this.x` sets the ship's coordinate back to starting position
- removing the `exploded` makes the ship image appear again
- `this.draw()` displays the ship in the starting position

For the game, we want to:
- reset the player 
- remove all bullets 
- remove all enemies and restore their spawn points
- unpause the game if it is paused

```js
reset() {
  this.player.reset();
  this.bullets.forEach(bullet => {
    bullet.element.remove();
  })
  this.bullets = [];
  this.enemies.forEach(enemy => {
    enemy.element.remove();
    addSpawnPoint(enemy.spawnPoint);
  })
  this.enemies = [];
  if (this.isPaused) {
    this.togglePause();
  }
}
```

Now, go over to the browser and let the player collide with an enemy. Open up the console and type:

```js
game.reset()
```

The game should now start over.

#### 3.6 Resetting from the keyboard

Just as with pausing, we'd like to be able to reset the game from the keyboard as well. Let's modify `setupPlayerControls`

```js
setupPlayerControls() {
  this.keydownHandler = (e) => {
    if (this.keyStates.hasOwnProperty(e.key)) {
      this.keyStates[e.key] = true;
    }
    if (e.key === "p" || e.key === "P") {
      this.togglePause();
    }
    if (e.key === "r" || e.key === "R") {
      this.reset();
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

Now, we can press the "r" key in the browser to reset the game. If we wanted to make sure that this can only happen from the paused state, so that the game is not reset accidentally while playing, we could add a logical operator to our condition:

```js
if (e.key === "r" || e.key === "R") {
  this.isPaused && this.reset();
}
```

Now, we can press the "r" key while playing and nothing happens, but when the game is paused, whether because we paused with the "p" key or we collided with an enemy ship, we can reset the game by pressing the "r" key.

### 4. Making Enemies Shoot

For enemies, shooting will work with a similar mechanic to players. The main difference will be that the shooting rate will be determined by the game, so that we'll be able to increase the firing rate by decreasing the cooldown for firing as the game progresses. 

#### 4.1. The `shoot()` method

We'll add a method to the `Enemy` class that will return a bullet moving downwards a bit faster than the enemy.

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
    speed: { x: 0, y: this.speed.y + 100 },
  });
}
```

For the y dimension of the speed, we're adding to `this.speed.y` so that the bullet will move faster towards the bottom of the game area than the enemy ship is moving.

#### 4.2. Adding a `firingCooldown` and `lastShotTime`

We need to track the time passed since the enemy ship's last shot. That way, we can generate another bullet when the ship is ready to shoot again. We want to be able to control the cooldown from the `Game` class, so we'll add the `firingCooldown` as an argument to the constructor.

```js
// scripts/enemy.js
constructor({ x, y, speed, firingCooldown }) {
  this.x = x;
  this.y = y;
  this.spawnPoint = { x: x, y: y };
  this.width = 46;
  this.height = 83;
  this.speed = speed;
  this.element = this.createElement();
  this.draw();
  this.firingCooldown = firingCooldown;
  this.timeSinceLastShot = firingCooldown/2;
}
```

We'll then set the enemy firing cooldown when we create enemies from the `Game` class.

```js
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
        firingCooldown: 3000,
      })
    );
    this.timeSinceLastSpawn = 0;
  }
}
```

#### 4.3. Adding `shootIfReady()`

We'll add the `shootIfReady()` method to the `Enemy` class. This method will look identical to the `shootIfReady()` method in the Player class for now.

```js
shootIfReady(deltaTime) {
  // update the timeSinceLast shot by adding the deltaTime amount
  this.timeSinceLastShot += deltaTime;
  // if the time since our last shot has met or exceeded the cooldown
  if (this.timeSinceLastShot >= this.firingCooldown) {
    // then we'll reset the time since our last shot to 0
    this.timeSinceLastShot = 0;
    // and fire a bullet
    return this.shoot();
  }
  // we return null from this method if no shot is fired so we know
  // when we call the method whether or not a bullet was fired
  return null;
}
```

#### 4.4. Calling `shootIfReady` within `updateEnemies`

In order to generate bullets that the game will track, we'll need to call `shootIfReady` on each enemy within the `updateEnemies` method. We only want the enemy to shoot if they're not out of bounds and also not colliding with the player, so we'll add thisl ogic where we have the `.draw()` logic that runs after we've eliminated both of those possibilities.

```js
updateEnemies(deltaTime) {
  this.spawnEnemies(deltaTime);
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
      // add conditional logic to check for collision here
      if (this.hasCollision(enemy, this.player)) {
        this.player.explode();
        this.togglePause();
        enemy.explode();
      } else {
        enemy.draw();
        const newBullet = enemy.shootIfReady(deltaTime);
        if(newBullet) {
          this.addBullet(newBullet);
        }
      }
    }
  });
```

Now, when we run the game in the browser, we'll see ships spawning from the top and then exploding when they enter the middle of the game area. This is because our collision logic is judging the enemy bullets to be colliding with their ship when they are fired! We need to do a similar update to our collision logic for enemies that we did for the player earlier, when we checked both for collision and direction of the bullet within `updateBullets`:

```js
// scripts/game.js
updateBullets(deltaTime) {
  // ...
  // check for collisions between this bullet and 
  // any enemy if the bullet is moving upwards
  // indicating it was fired by the player
  this.enemies.forEach((enemy) => {
    if (bullet.speed.y < 0 && this.hasCollision(bullet, enemy)) {
      enemy.explode();
      this.removeEnemy(enemy);
      this.removeBullet(bullet);
    }
  });

  // check for collisions between this bullet and 
  // the player if the bullet is moving downwards
  // indicating it was fired by an enemy
  if (bullet.speed.y > 0 && this.hasCollision(bullet, this.player)) {
    this.player.explode();
  }
  bullet.draw();
  // ...
}
```

If you open up the browser now and play the game, enemies should spawn in random positions and then fire at a regular interval. Bullets fired by enemies will cause the player's ship to explode if they collide. Bullets fired by the player will cause enemy ships to explode if they collide. In the next lesson, we'll explore adding a score and difficulty levels to the game.