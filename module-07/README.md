## Agenda: Lesson 7 - Integrating Sound in Video Games

- [**1. Conceptual Overview**](#1-conceptual-overview)
  * [1.1 Concept Overview: The `<audio>` Element and Its Methods](#11-concept-overview-the-audio-element-and-its-methods)
    + [1.1.1 Key Properties](#111-key-properties)
    + [1.1.2 Key Methods](#112-key-methods)
    + [1.1.3 Integrating Sound in Web Applications](#113-integrating-sound-in-web-applications)
  * [1.2 Concept Overview: Static Properties in Classes](#12-concept-overview-static-properties-in-classes)
    + [1.2.1 Static Properties](#121-static-properties)
    + [1.2.2 Practical Application in Our Game](#122-practical-application-in-our-game)
  * [1.3 Finding Sounds and Music for Your Game](#13-finding-sounds-and-music-for-your-game)
    + [1.3.1 Free Audio Resource Websites](#131-free-audio-resource-websites)
    + [1.3.2 Understanding Licensing](#132-understanding-licensing)
    + [1.3.3 Providing Proper Attribution](#133-providing-proper-attribution)
    + [1.3.4 Editing and Customizing Sounds](#134-editing-and-customizing-sounds)
    + [1.3.5 Remember the Importance of Cohesiveness](#135-remember-the-importance-of-cohesiveness)
    + [1.3.6 Always Test With Your Target Audience](#136-always-test-with-your-target-audience)

- [**2. AudioController Class Breakdown**](#2-audiocontroller-class-breakdown)
  * [2.1 Creating the AudioController](#21-creating-the-audiocontroller)

- [**3. Integrating Sounds into the Game**](#3-integrating-sounds-into-the-game)
  * [3.2 Adding a Credits Page](#32-adding-a-credits-page)
  * [3.3 Requiring User Action to Start the Game and Music](#33-requiring-user-action-to-start-the-game-and-music)
    + [3.3.1 Remove game.start() from main.js](#331-remove-gamestart-from-mainjs)
    + [3.3.2 Add a Button to Start the Game](#332-add-a-button-to-start-the-game)
    + [3.3.3 Fixing the First Enemy Spawn Bug](#333-fixing-the-first-enemy-spawn-bug)
  * [3.4 Playing Background Music upon Game Start](#34-playing-background-music-upon-game-start)
  * [3.5 Adding Sounds for Shots and Explosions](#35-adding-sounds-for-shots-and-explosions)
    + [3.5.1 Adding Explosion Sounds](#351-adding-explosion-sounds)
    + [3.5.2 Adding Shot Sounds](#352-adding-shot-sounds)
  * [3.6 Adding Game Over and Level Up Sounds](#36-adding-game-over-and-level-up-sounds)
    + [3.6.1 Adding a Level Up Sound](#361-adding-a-level-up-sound)
    + [3.6.2 Making the Sound Play on Level Up](#362-making-the-sound-play-on-level-up)
    + [3.6.3 Adding the Game Over Sound](#363-adding-the-game-over-sound)
    + [3.6.4 Playing the Game Over Sound when the Game Ends](#364-playing-the-game-over-sound-when-the-game-ends)

- [**4. Adding Global Volume Controls**](#4-adding-global-volume-controls)
  * [4.1 The `setVolumeForAll` Method](#41-the-setvolumeforall-method)
  * [4.2 Adding Volume Control to the UI](#42-adding-volume-control-to-the-ui)
  * [4.3 Connecting the Volume Control to the Game](#43-connecting-the-volume-control-to-the-game)

---

### 1. Conceptual Overview

Sound plays a critical role in video games. It provides feedback, sets the mood, and can make gameplay more immersive and engaging. Whether it's the chime of collecting a coin, the dramatic music during a boss fight, or the ambient sounds of a virtual world, audio adds depth and emotion to the gaming experience.

### 1.1 Concept Overview: The `<audio>` Element and Its Methods

The HTML5 `<audio>` element allows us to embed sound content in web documents. Beyond just playing sound, this element provides a plethora of methods to control and manipulate audio.

**Example**: Imagine an online music player. You can press "Play" to start a song, "Pause" to stop it temporarily, or even "Stop" to halt it entirely. The `<audio>` element provides methods to perform all these actions and more.

#### 1.1.1 Key Properties:

1. **`src` (Source)**:
  - Specifies the URL of the audio file.
  - It's like pointing your music player to a specific song or track.
  ```javascript
  const audioElement = new Audio();
  audioElement.src = "path/to/your/audiofile.mp3";
  ```

2. **`loop`**:
  - A boolean property that makes the audio play continuously in a loop when set to `true`.
  - Like setting your playlist to "Repeat One".
  ```javascript
  audioElement.loop = true;  // The audio will keep playing on repeat.
  ```

3. **`volume`**:
  - Controls the loudness of the audio. It accepts a value between 0.0 (silent) and 1.0 (full volume).
  - It's the volume knob for your audio.
  ```javascript
  audioElement.volume = 0.5;  // Sets the volume to half.
  ```

#### 1.1.2 Key Methods:

1. **`play()`**:
  - Starts playback of the audio.
  - If you've ever pressed the "Play" button on a music player, you've essentially invoked this method.
  ```javascript
  audioElement.play();
  ```

2. **`pause()`**:
  - Pauses the current playback.
  - It's like hitting the "Pause" button during a song.
  ```javascript
  audioElement.pause();
  ```

3. **`currentTime`**:
  - Gets or sets the current playback position, in seconds.
  - If you've ever scrubbed through a track to a specific point, you've manipulated this property.
  ```javascript
  audioElement.currentTime = 30;  // Jump to 30 seconds into the audio.
  ```

#### 1.1.3 Integrating Sound in Web Applications:

The `<audio>` element, combined with its properties and methods, offers developers robust control over the auditory experience in web applications. Whether it's playing a background track, triggering sound effects in response to user actions, or allowing users to control playback, the `<audio>` element is the cornerstone of web audio.

In this lesson, we'll leverage these properties and methods to seamlessly integrate sound into our game, enhancing the overall gaming experience.

### 1.2. Concept Overview: Static Properties in Classes

In the world of object-oriented programming, classes are blueprints for creating objects (a particular data structure), providing initial values for state (properties) and implementations of behavior (methods). Sometimes, however, we want a property or method to belong to the class itself, rather than any specific instance of the class. This is where static properties and methods come into play.

**Example**: Think of a factory that produces toys. Each toy it produces might have its own color, size, or model number. But what if the factory has a counter that keeps track of the total number of toys produced, regardless of their individual attributes? This counter would be like a static property—it belongs to the factory (class) itself, not any specific toy (instance).

#### 1.2.1 Static Properties:

1. **Definition**:
   - Static properties are properties of a class, not of an instance of a class.
   - They are shared among all instances of a class.
   
2. **Usage**:
   - Static properties are useful when you need a value to be shared and consistent across all instances.
   - For example, if you have a class representing a bank account, and you want to maintain a global interest rate applicable to all accounts, you'd use a static property.

   ```javascript
   class BankAccount {
     static interestRate = 0.05;  // 5% interest rate for all accounts
   }
   ```

3. **Access**:
   - Since static properties belong to the class itself, they are accessed using the class name.
   
   ```javascript
   console.log(BankAccount.interestRate);  // Outputs: 0.05
   ```

#### 1.2.2. Practical Application in Our Game:

In the context of our game, we'll be using an `AudioController` class with a static property, `sounds`, to store all audio instances. This design choice allows us to have a centralized collection of all sounds. By having this shared collection, we can implement features like adjusting the volume for all sounds at once, which would be challenging without such a centralized approach.

```javascript
class AudioController {
  static sounds = [];
  
  // ... rest of the class
}

// Adjusting volume for all sounds:
AudioController.setVolumeForAll(0.5);  // Sets volume to half for all sounds
```

Utilizing static properties, as in the example above, enhances our code's clarity and maintainability while providing a mechanism to interact with shared data across instances.

### 1.3. Finding Sounds and Music for Your Game

When creating a game, the atmosphere, emotions, and overall experience can be significantly enhanced with the right sound and music. However, finding quality audio assets that you can use without incurring costs or legal issues can be a challenge. Here's a guide to help you navigate this process:

#### 1.3.1. **Free Audio Resource Websites**:
   
   There are several websites where you can find free sounds and music tracks for your games. Some popular options include:

   - [**Freesound**](https://freesound.org/): A collaborative database of Creative Commons Licensed sounds.
   - [**Incompetech**](https://incompetech.com/music/royalty-free/music.html): Royalty-free music by Kevin MacLeod.
   - [**OpenGameArt**](https://opengameart.org/art-search-advanced?keys=&field_art_type_tid%5B%5D=12&sort_by=count&sort_order=DESC): A repository with game graphics, music, and sounds.
   - [**Free Music Archive (FMA)**:](https://freemusicarchive.org/home) A library of high-quality, legal audio downloads.
   - [**jsfxr**:](https://sfxr.me/) Jsfxr is an online 8 bit sound maker and sfx generator. All you need to make retro sound effects with jsfxr is a web browser.
   - [**Ikson's Music Library**](https://ikson.com/music): An independent music producer from Sweden who produces and releases his own music under a permissive license

#### 1.3.2. **Understanding Licensing**:

   Not all "free" sounds and music are free to use in any way you want. It's crucial to understand the licensing attached to an audio file:

   - **Creative Commons Licenses**: These are public copyright licenses that enable free distribution of copyrighted work. They come with different conditions, such as requiring attribution, not using the work for commercial purposes, or not making derivative works.
   - **Royalty-Free**: This doesn't mean the asset is free, but once you've acquired it (either by purchasing or by other means), you don't need to pay royalties when you use it.

#### 1.3.3. **Providing Proper Attribution**:

   Many free resources require you to give credit to the creator. Here's how you can do it properly:

   - **Follow the License Requirements**: Always read the license to understand how you should provide credit. Some creators might have specific ways they want to be acknowledged.
   - **In-Game Credits**: A common practice is to have a "Credits" section in your game where you list all the assets you've used and their creators.
   - **Documenting Sources**: As you collect assets for your game, keep a document where you note down where each asset came from and its license. This will be handy later when you're adding credits and ensures you don't use an asset you're unsure about.

#### 1.3.4. **Editing and Customizing Sounds**:

   Sometimes, you might not find the exact sound you want. In such cases, you can:

   - **Use Audio Editing Software**: Tools like Audacity (which is free) can help you edit and customize sounds to fit your needs.
   - **Combine Sounds**: You can overlay or sequence multiple sounds to create the desired effect.
   
#### 1.3.5. **Remember the Importance of Cohesiveness**:

   While it's exciting to have access to so many audio assets, always keep in mind the mood and theme of your game. You wouldn't want to use a cheerful jingle in a horror game or a spooky sound in a children's game. Consistency in your audio choices will make your game feel more polished and immersive.

#### 1.3.6. **Always Test With Your Target Audience**:

   Once you've selected and implemented sounds and music, playtest your game with potential players. Their feedback on the audio can be invaluable in refining the overall experience.

---

Remember, the audio in a game, just like its visuals and mechanics, plays a significant role in defining its identity and ensuring a memorable experience for the player. Choose wisely and always respect the work of the creators by giving proper credit!

### 2. **AudioController Class Breakdown**

When we build out this portion of the game, we'll want a means of controlling the audio in an Object-Oriented way. To do that, we'll create an `AudioController` class. These are the different parts of the class:

- **`constructor({ src, isLoop, volume })`**: When we create a new instance of `AudioController`, we provide it with the source of the audio file (`src`), whether it should loop (`isLoop`), and its volume (`volume`). This function sets up our audio and adds it to the collection of all sounds.

- **`play()`**: This method restarts the audio from the beginning and then plays it.

- **`pause()`**: As the name suggests, this method pauses the audio.

- **`setVolume(percentage)`**: Adjusts the volume of the audio to the given level. It accepts values between 0 (mute) and 1 (maximum volume).

- **`static setVolumeForAll(percentage)`**: A class method that adjusts the volume of all sounds in the game by a given multiplier. For example, using a multiplier of 0.5 would halve the volume of all sounds.

- **`static mute()`**: A class method that mutes all sounds in the game.

#### 2.1. Creating the AudioController

First, we'll need to add a new script called `audioController.js` to the scripts directory. We'll then need to link it to our index.html file:

```html
<!-- index.html -->
<script src="https://unpkg.com/dexie@latest/dist/dexie.min.js"></script>
<script src="scripts/audioController.js"></script>
<script src="scripts/game.js"></script>
<script src="scripts/bullet.js"></script>
<script src="scripts/enemy.js"></script>
<script src="scripts/player.js"></script>
<script src="scripts/spawn.js"></script>
<script src="scripts/main.js"></script>
```

Then, we'll add in the AudioController with the constructor

```js
// scripts/audioController.js
class AudioController {
  static sounds = [];

  constructor({ src, isLoop, volume }) {
    this.baseVolume = volume || 1.0;
    this.audio = new Audio(src);
    this.audio.loop = isLoop || false;
    this.audio.volume = this.baseVolume;
    AudioController.sounds.push(this);
  }

  play() {
    this.audio.currentTime = 0;
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }
  // ...
}
```

Let's test it out by playing a little background music. Open up main.js and add the following code:

```js
// scripts/main.js
const bgMusic = new AudioController({ 
  src: "https://res.cloudinary.com/dm5zvhgto/video/upload/v1698872766/punto-code/space-invaders/audio/Horizon_by_Ikson_jmgqy7.mp3",
  volume: 0.7,
  isLoop: true,
})

```

When you open up the browser, go to the console and run this code and you should hear the music playing

```js
bgMusic.play();
```

Typing in

```js
bgMusic.pause()
```

will stop the music. 

**Note for later**: Never versions of Google Chrome will block media from automatically playing upon loading a page, requring some user action to occur first. In our case, we can prompt the user to start the game when the page loads rather than starting it automtically. This will just involve starting the game off in paused state and using

### 3. Integrating Sounds into the Game

There are different ways to integrates sounds into a game. In our case, we'll give each sound a name when we create the new game instance. This will allow us to create a separate AudioController for all of the important sounds in the game in a single place. This is good because it will allow us to swap out sounds for the game from a single place in our code.

We'll create new instances of the AudioController class and pass them into an object called `sounds` that we'll use when creating a new game

```js
// scripts/main.js
// ...
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
  },
});
game.start();
// ...
```

#### 3.2. Adding a Credits Page

For our game, we'll add a credits.html file that will list all of the sounds and music that we're using for the game along with links to the source and its license.

```html
<!-- credits.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Space invaders Credits</title>
  <style>
    .container {
      width: 80%;
      margin: 0 auto;
      max-width: 1000px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Credits</h1>
    <p>Background Music: Horizon by <a href="https://ikson.com/usage-policy">Ikson</a></p>

    <p><a href="index.html">Back to Game</a></p>
  </div>

</body>
</html>
```

Add a link to the credits page to the `index.html` file:

```html
<!-- index.html -->
<!-- ... -->
<body>
  <a href="credits.html">Credits</a>
<!-- ... -->
```

#### 3.3. Requiring User Action to Start the Game and Music

We want to adjust the game slightly so that the user can press a button to start the game and we'll start the music at the same time.

##### 3.3.1. Remove game.start() from main.js

If we remove the `game.start()` expression from main.js, then the game won't automatically start.

##### 3.3.2. Add a Button to Start the Game

First, we'll add a button to the message display to start the game.

```html
<!-- index.html -->	
<!-- ... -->
<span id="message-display"><button id="start-game">Start Game</button></span>
<!-- ... -->
```

We can improve the player experience by expanding the details element describing the controls when the page loads.

```html
<!-- index.html -->
<details open>
  <!-- ... -->
</details>
```

Then, we add some javascript to ensure that when the player clicks the button to start the game, the details element is collapsed and the start game button is removed as well.


```js
// scripts/main.js
document.getElementById("start-game").addEventListener("click", () => {
  game.start();
  document.querySelector("details").removeAttribute("open");
  document.getElementById("message-display").innerHTML = "";
})
```

Now, when we return to the browser and start the game, we should see the Start Game Button disappear and the Controls Legend collapse. But, you'll also notice that the first enemy is appearing in the middle of the game area, not appearing from the top. 


##### 3.3.3. Fixing the First Enemy Spawn Bug

The bug is caused by the way that `window.requestAnimationFrame` works. In particular, the first timestamp passed to the requestAnimationFrame callback is relative to when the window was loaded. This means that the calculation of `deltaTime` will be larger for the first frame than for any subsequent frame. This causes the enemy ship to move much more in the first frame than in every subsequent frame. The difference is due to the way that `deltaTime` is calculated related to `lastTime` which we initialize to 0 in this case. 

Instead of starting `lastTime` as 0, we can start it as the first value for timeStamp by declaring it with no initial value inside of `start()` but outside of the callback, then assigning it a value of `timeStamp` if it hasn't already been assigned a value. We'll use the `||=` operator to do this. 

The `||=` operator works something like this:

```js
let x;
x ||= 2; // => x || x = 2
```

In this example, if `x` has a truthy value, then no assignment happens. If `x` doesn't have a truthy value, then it is assigned the value of `2`.

So, inside of the game loop in our `start()` method, we can assign the `lastTime` a value in a similar way.

```js
// scripts/game.js inside of start() method
start() {
  this.setupPlayerControls();
  let lastTime;
  const gameLoop = (timeStamp) => {
    lastTime ||= timeStamp;
    // ...
```

After making this change, revisit the game in the browser and you'll see that the first enemy spawns and appears from the top of the game area as before.

#### 3.4. Playing Background Music upon Game Start

Before we start playing sounds along with game events, we need to associate the sounds from the game initialization within the Game class constructor.

```js
// scripts/game.js constructor
class Game {
  constructor({ container, player, sounds }) {
    this.container = container;
    this.player = player;
    this.sounds = sounds;
    this.isPaused = true;
    // ...
```

After we've associated the sounds with the game, we can trigger them at the appropriate time. In the `start()` method, we can start the background music.

```js
// scripts/game.js start()
start() {
  this.setupPlayerControls();
  this.sounds.backgroundMusic.play();
  let lastTime;
  // ...
```

We also want this music to play/pause when we play/pause the game. So, let's update `togglePause`

```js
togglePause() {
  this.isPaused = !this.isPaused;
  if (this.isPaused) {
    this.container.classList.add("paused");
    this.sounds.backgroundMusic.pause();
  } else {
    this.container.classList.remove("paused");
    this.sounds.backgroundMusic.play();
  }
}
```

Now, go to the browser, start the game and you should hear the background music. Pause the game, the music should stop and then start the game again and the music should start again. Notice, however that the music starts from the beginning again instead of where we left off. Currently, the `play()` method in the `AudioController` will reset the playhead of the audio to 0 before playing. This is good for sound effects, but not as good for music, so let's take a look at the `AudioController` and add a `resume()` method for music.

```js
// scripts/audioController.js
class AudioController {
  // ...

  pause() {
    this.audio.pause();
  }

  resume() {
    this.audio.play();
  }
  // ...
}
```

Now, let's use the `resume()` method in our `togglePause` method:

```js
togglePause() {
  this.isPaused = !this.isPaused;
  if (this.isPaused) {
    this.container.classList.add("paused");
    this.sounds.backgroundMusic.pause();
  } else {
    this.container.classList.remove("paused");
    this.sounds.backgroundMusic.resume();
  }
}
```

#### 3.5. Adding Sounds for Shots and Explosions

We'll want the important events in the game to have accompanying sounds. So, let's trigger the sounds when they should occur. We already have methods in the `Enemy` and `Player` classes devoted to shooting (`shoot()`) and explosions (`explode()`) so we'll use those to play the sounds.

##### 3.5.1. Adding Explosion Sounds

For the explosions, we'll modify the `explode()` methods in both Game and Player

```js
// scripts/player.js
class Player {
  // ...  
  explode() {
    game.sounds.playerExplosion.play()
    this.element.classList.add("exploded");
  }
  // ...
}
```

Now, we'll do something very similar for enemies within the `Enemy` class. 

```js
// scripts/enemy.js
class Enemy {
  // ...
  explode() {
    game.sounds.enemyExplosion.play();
    this.element.classList.add("exploded");
  }
  // ...
}
```

Head over to the browser and try shooting at enemy ships. You should hear the explosion when a collision occurs. Now, let one of the bullets hit your ship, you'll hear a different explosion sounds in this case.

##### 3.5.2 Adding Shot Sounds

Now, let's make sure that we hear a sound also when shots are fired by the player or the enemy. For this change, we'll probably want to adjust the enemy and player shoot() methods.

```js
// scripts/player.js
class Player {
  // ...
  shoot() {
    const bulletWidth = 6;
    const bulletHeight = 10;
    game.sounds.playerShot.play()
    return new Bullet({
      x: this.center().x - bulletWidth / 2,
      y: this.y - bulletHeight / 2,
      width: bulletWidth,
      height: bulletHeight,
      color: "red",
      speed: this.bulletSpeed,
    });
  }
  // ...
}
```

This is very similar for enemies as well.

```js
// scripts/enemy.js
class Enemy {
  // ... 

  shoot() {
    const bulletWidth = 6;
    const bulletHeight = 10;
    game.sounds.enemyShot.play()
    return new Bullet({
      x: this.center().x - bulletWidth / 2,
      y: this.y + this.height - bulletHeight / 2,
      width: bulletWidth,
      height: bulletHeight,
      color: "red",
      speed: { x: 0, y: this.speed.y * 2 },
    });
  }
  // ...
}
```

#### 3.6. Adding Game Over and Level Up Sounds

We also want to give an audio indication when the game is over and when the player levels up. Let's start with leveling up.

##### 3.6.1. Adding a Level Up Sound

Because this is a new sound in the game, we'll want to introduce it to the `game.sounds` collection. This is a good time to use the [jsfxr website](https://sfxr.me/) if you want to experiment and customize your sound. Try visiting the website and then following these steps:

1. Click on one of the buttons along the left hand side of the screen.
2. Click another button (or the same button again for a variation) until you find one you like. For this purpose, you can try Jump, PowerUp, or Pickup/Coin and you should find something you like there.
3. Once you've found a sound you like, Right-Click on the download link at the top of the right hand column and select "Copy Link Address" from the menu that appears.
4. Take the copied link and paste it into the `levelUp` audioController src in the code below to replace paste_here_betweeen_quotes.

```js
// scripts/main.js
// ...
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
      src: "paste_here_betweeen_quotes",
      volume: 0.5
    })
  },
});
// ...
```

Note that the copied link will be a very very long string of characters. If you'd like to avoid that, you can also download the file from the website and then upload it to a site like cloudinary.com. Cloudinary offers a free plan that will be more than enough to support your game assets and will keep your code free of large files. This will also allow you to run the game faster in browsers because Cloudinary will store your assets in multiple computers throughout its content delivery network (CDN for short). Cloudinary will make sure that your players will load the assets from the computer that is closest to them in the physical world, cutting down on load times.

I've used Cloudinary to upload the file that I downloaded from jsfxr, so here's what I added to sounds in `main.js`:

```js
// scripts/main.js
// ...
const game = new Game({
  // ...
  sounds: {
    // ...
    levelUp: new AudioController({
      src: "https://res.cloudinary.com/dm5zvhgto/video/upload/v1699644905/punto-code/space-invaders/audio/pickupCoin_n2bjgj.wav",
      volume: 0.5,
    }),
  },
});
// ...
```

##### 3.6.2 Making the Sound Play on Level Up

Now that we've got the sound added to the `game` instance, we can play it when the user levels up.

```js
// scripts/game.js
class Game {
  // ...
  levelUp() {
    // ...
    this.updateTopBar({
      level: this.level,
      message: `Congratulations! You reached level ${this.level}`,
    });
    this.sounds.levelUp.play();
    // ...
  }
  // ...
}
```

Now, head over the browser and blow up a few enemy ships. When you level up, you should hear your sound playing now!

##### 3.6.3. Adding the Game Over Sound

Again, our first step is going to be to add the sound to the `game` instance within `main.js`

```js
// scripts/main.js
// ...
const game = new Game({
  // ...
  sounds: {
    // ...
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
// ...
```

After that, we can make sure to play the sound at the appropriate time.

##### 3.6.4. Playing the Game Over Sound when the Game Ends

Next, we can hook this sound up to the `handleGameOver()` method so it plays at the appropriate time.

```js
// scripts/game.js
class Game {
  // ...
  async handleGameOver() {
    this.isGameOver = true;
    this.sounds.gameOver.play();
    // ...
  }
  // ...
}
```

Now, head back to the browser and play for a little bit, level up a couple of times, then let your ship be destroyed. You should hear your ship explode and the game over sound as well.

### 4. Adding Global Volume Controls

Now that we've got the sounds integrated into our gameplay, we want to give the user some control over the volume of the game. Some players may wish to play without sound, or just make things quieter, and we want to make this possible.

- Add a `setVolumeForAll` method to `audioController`
- Add a volume icon and a slider input to control volume to index.html
- Add an event listener in main.js that will invoke the setVolumeForAll method when the slider input is changed.

#### 4.1. The `setVolumeForAll` Method

This method's job will be to adjust the volumes of all of the sounds that have been created by the `AudioController` class. We'll define this as a static method, to indicate that it should be called on the class itself, rather than on an individual instance. This is important so we can adjust all sounds at once.

```js
// scripts/audioController.js
class AudioController {
  // ...
  static setVolumeForAll(multiplier) {
    return AudioController.sounds.map((sound) => {
      sound.audio.volume = sound.audio.volume * multiplier;
      return sound;
    });
  }
}
```

This method will iterate over all of the sounds that have been created and added to the static sounds property within the constructor. 

#### 4.2. Add A Volume Icon and Slider Input to Control Volume

We'll add the volume slider below the game area and above the controls legend inside of the details tag.

```html
<!-- index.html -->
<!-- ... -->
&#128266;<input id="volume-slider" type="range" min="0" max="100" value="100" />
<details open>
<!-- ... -->
```

#### 4.3. Add an Event Listener in `main.js` to Trigger the Volume Change

We want the volume of the sounds to change when the slider is adjusted. So, we'll add an event listener to `main.js` to call our `setVolumeForAll` method with the new value when it changes.

```js
document.getElementById("volume-slider").addEventListener("input", (e) => {
  AudioController.setVolumeForAll(Number(e.target.value)/100);
})
```

Notice here that we're using the `"input"` event type. We're doing this so that the volume will change as we move the slider. If we picked the `"change"` event type, the volume won't change until we let go of the slider. 

Check it out in the browser and see now that we can adjust the volume of the sounds by moving the slider when the game is playing.

---

### Conclusion

In this lesson, we explored how to enhance the gaming experience through sound integration. Here are the key takeaways:

1. The `<audio>` element and its methods and properties allow for dynamic audio control in web applications.
2. Static properties in classes are useful for shared data across instances.
3. Sourcing and legally using sounds and music is crucial for game development.
4. The `AudioController` class provides a structured way to manage game sounds.
5. Integrating sounds effectively requires thoughtful placement and testing with your target audience.
6. Providing user control over game audio improves the overall user experience.

Sound is not just an add-on but an integral part of game development. It adds depth, emotion, and engagement to the gaming experience, making it more immersive and enjoyable. Remember to always respect the work of audio creators and provide proper attribution where required. Happy coding!