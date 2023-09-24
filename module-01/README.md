## Module 1 - Introduction and Setup

### Introduction:

Welcome to Week 1 of our Space Invaders game development course! This week, we'll set the foundation for our game and dive deep into some core JavaScript concepts, including classes and instances. By the end of this session, you'll have a basic project structure and an understanding of how to create and work with classes in JavaScript.

### Concepts (15-20 minutes):

#### 1. Introduction to Game Development:

- Why make games?
- Overview of the game development process.

#### 2. Classes in JavaScript:

- What is a class?
- Why do we need classes in programming?
- Creating a class: Constructor, properties, and methods.

#### 3. Instances:

- What is an instance?
- How to create an instance of a class.
- How instances relate to the class.

#### 4. The `this` Keyword:

- Understanding the `this` keyword in JavaScript.
- How `this` works within classes and methods.

Certainly! Visual aids can be instrumental in illustrating complex concepts like classes and instances. Let's enhance the "Concepts" section with descriptions and links to visual representations:

### Concepts (15-20 minutes):

#### 1. Introduction to Game Development:

- The magic behind video games.
- Structure of a basic game.

#### 2. Classes in JavaScript:

- **What is a Class?**  
  A class in programming can be thought of as a blueprint for creating objects. It's a template that defines certain properties and methods that the created objects (instances) will have.
  - **Visual Representation**:  
    ![Class as Blueprint](https://res.cloudinary.com/dlzuobe8h/image/upload/v1695262761/puntoCode/house-blueprint-with-spanish-titles-stucco-walls-vector-19000805_tiq1n4.jpg)  
    _Think of a class as a blueprint for a house. The blueprint (class) defines the structure and features of the house, but it isn't a house you can live in._

#### 3. Instances:

- **What is an Instance?**  
  An instance is a specific realization of any object. It's created from a class blueprint and is an actual object you can interact with.
  - **Visual Representation**:  
    ![Instances of a Class as Houses in a Tract](https://res.cloudinary.com/dlzuobe8h/image/upload/v1695263751/puntoCode/Tract-House_hwnlxe.jpg)  
    _Using the blueprint (class), we can build many houses (instances). Each house, while similar in structure, is unique and separate from the others._

#### 4. Classes and Instances in JavaScript:

- **ASCII Art Representation**:
  ```
  Class (Blueprint)       Instance (Object)
  +----------------+       +--------------+
  |                |       |              |
  |  Properties    |       |  Properties  |
  |  Methods       |  ==>  |  Methods     |
  |                |       |              |
  +----------------+       +--------------+
  ```
  _In the context of JavaScript, think of a class as a set of instructions and an instance as the actual object created using those instructions._

---

```js
// the class is a blueprint
class House {
  constructor(bedrooms, bathrooms) {
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
  }
}

// we use the blueprint to make a new instance with the `new` keyword
const myHouse = new House(4, 2);
console.log(myHouse.bedrooms); // logs 4
```

### The `this` Keyword in JavaScript:

In programming, especially when working with classes and objects, there's often a need to refer to the current object. In JavaScript, the `this` keyword serves this purpose. It refers to the object that's currently being interacted with or the object that the current code belongs to.

#### In the Context of Classes:

When you're inside a class, the `this` keyword refers to the instance of the class (the created object).

In the code above:

```js
class House {
  constructor(bedrooms, bathrooms) {
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
  }
}
```

- The `House` class has a constructor that accepts two parameters: `bedrooms` and `bathrooms`.
- Inside the constructor, we use the `this` keyword to refer to the current instance of the `House` class.
- `this.bedrooms = bedrooms;` means that we're setting the `bedrooms` property of the current `House` object to the value passed into the constructor.

#### Visual Explanation:

Imagine you're in a factory that builds cars. The blueprint (class) outlines where the engine goes, where the wheels are attached, etc. When you're assembling a specific car (an instance), and the blueprint says, "Attach the engine here," you don't attach it to the blueprint; you attach it to the car you're currently working on. In this analogy, `this` refers to the car you're currently assembling.

#### Practical Example:

When you create a new instance of the `House` class:

```js
const myHouse = new House(4, 2);
```

- The `new` keyword tells JavaScript to create a new object from the `House` blueprint.
- This means that the constructor of the `House` class runs, setting the `bedrooms` and `bathrooms` properties of the `myHouse` object using the `this` keyword.

As a result, when you access the properties of the `myHouse` object:

```js
console.log(myHouse.bedrooms); // logs 4
```

You're retrieving the values that were set using the `this` keyword inside the constructor.

---

## Codealong (40-45 minutes):

### 1. Setting up our Project:

#### **1.1 Create a New Folder:**

- Open Visual Studio Code (VS Code).
- Go to `File` > `Open Folder...`.
- Choose a location on your computer and create a new folder named `SpaceInvaders`. This will be the root directory for our game.
- Open the `SpaceInvaders` folder in VS Code.

#### **1.2 Initialize the Basic HTML Structure:**

- In VS Code, right-click on the `SpaceInvaders` folder in the Explorer pane.
- Select `New File` and name it `index.html`.

- Add the basic HTML structure to `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Space Invaders</title>
    <link rel="stylesheet" href="styles/main.css" />
  </head>
  <body>
    <div id="game">
      <img
        id="player"
        src="https://res.cloudinary.com/dm5zvhgto/image/upload/v1695268028/punto-code/space-invaders/images/ship-transparent_eo3jce.png"
        alt="Player's Spaceship"
      />
      <!-- Other game elements will be added here in the future -->
    </div>

    <script src="scripts/player.js"></script>
    <script src="scripts/main.js"></script>
  </body>
</html>
```

#### **1.3 Setting up the Stylesheet:**

- In the `SpaceInvaders` folder, create a new folder and name it `styles`.
- Inside the `styles` folder, create a new file named `main.css`.
- Begin with some basic styling:

```css
body {
  font-family: "Arial", sans-serif;
  background-color: #000;
  color: #fff;
  text-align: center;
}

#game {
  position: relative;
  width: 644px;
  height: 644px;
  margin: 0 auto;
  background-image: url("https://res.cloudinary.com/dm5zvhgto/image/upload/v1695268032/punto-code/space-invaders/images/background_zsveg3.webp");
  background-repeat: no-repeat;
  background-size: cover;
}

#player {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
}
```

#### **1.4 Introducing the Player Class:**

- In the `SpaceInvaders` folder, create a new folder and name it `scripts`.
- Inside the `scripts` folder, create a new file named `player.js`.
- Add the basic structure of the `Player` class:

```js
class Player {
  constructor() {
    this.element = document.getElementById("player");
    this.speed = 150;
    this.x = 0;
    this.y = 0;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}
```

Here, the player's `element` is linked directly to the HTML element with the ID `player`. The values for `x` and `y` represent the distance between the player and the top left of the game container.

#### **1.5 Testing the Player Class:**

- In the `scripts` folder, create another file named `main.js`.
- Add the following code to create an instance of the `Player` class:

```js
const player = new Player();
console.log(`x: ${player.x} y: ${player.y}`); // logs x: 0 y: 0
```

### Manual Testing:

#### **1.6 Initialization:**

- Action: Open the `index.html` file in a browser.
- Expected: Ensure no errors pop up in the browser's console (F12 or right-click -> Inspect -> Console).

#### **1.7 Player Instance:**

- Action: In the browser's console, check the log messages.
- Expected: The message `x 0 y 0` should be logged, indicating that our `Player` class and its properties were initialized correctly. You should also see the player's spaceship at the top left of the game area.

#### **1.8 Moving the player element:**

We want to be able to interact with our player instance and actually see the player's ship move on the screen. So, let's introduce a new method to the Player class.

```js
class Player {
  // ...

  draw() {
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}
```

Now, we can try this method in the console to move the player on the screen.

```js
player.x = 300;
player.y = 590;
player.draw();
```

Notice that the player's ship is now at the bottom center of the game area. If we want to be able to set the starting position of the player upon initialization, we can add some arguments to the constructor:

```js
// scripts/player.js
class Player {
  constructor({ x, y }) {
    this.element = document.getElementById("player");
    this.speed = 150;
    this.x = x;
    this.y = y;
    this.draw();
  }

  draw() {
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}

// scripts/main.js
const player = new Player({ x: 300, y: 590 });
console.log(`x: ${player.x} y: ${player.y}`); // logs x: 300 y: 590
```

We can move the ship around by updating the coordinates and calling the `draw()` method like so:

```js
player.x = 20;
player.draw();
```

If we run this in our browser console, we can see that the ship moves to 20 pixels from the edge of the game area.

By the end of this codealong, you will have set up the game's visuals, linked necessary assets, and started to tie together the visual elements with the underlying code structure through the `Player` class. In the next lesson, we'll explore the game loop and introduce player movement.
