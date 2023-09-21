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

### Codealong (40-45 minutes):

#### 1. Setting up our Project:
- Create a new folder for our game project.
- Inside this folder, create a new file named `index.html`.
- Set up the basic HTML structure.
  
#### 2. Introducing the Player Class:
To understand classes and instances, we'll start by creating a simple `Player` class for our game.

- Create a new JavaScript file named `player.js`.
- Inside `player.js`, create a `Player` class with the following properties: `name` and `score`.
- Add a method `increaseScore` that increases the player's score.
  
#### 3. Testing our Player Class:
- Link the `player.js` file to our `index.html`.
- In a new JavaScript file named `main.js`, create a new instance of the Player class.
- Display the player's name and score on the webpage.
- Increase the player's score using the `increaseScore` method and verify that the score updates correctly on the webpage.

### Manual Testing:

#### 1. Display Player Information:
- Action: Open the `index.html` file in a browser.
- Expected: The player's name and initial score should be displayed.

#### 2. Test Score Increase:
- Action: Use the `increaseScore` method to add points to the player's score.
- Expected: The displayed score should update to reflect the new value.

#### 3. Check Console for Errors:
- Action: Open the browser's developer console (usually F12 or right-click -> Inspect -> Console).
- Expected: No errors related to our game code should be displayed.

### Conclusion:
Great job on completing Week 1! You've set up your game project, learned about classes and instances in JavaScript, and created a basic Player class for our game. Next week, we'll delve deeper into game elements and start building our game world!

---

This README serves as both a guide for the lesson and a reference for students. By including a manual testing section, we ensure that students can verify their progress and catch any potential issues early on. As we proceed with the next lessons, we'll continue with this format, gradually introducing more advanced concepts and building upon the game's features.