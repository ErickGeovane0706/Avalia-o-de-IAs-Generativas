# Flappy Bird Clone

This project is a clone of the popular Flappy Bird game, built using HTML5 Canvas, CSS, and Vanilla JavaScript. The game features a player-controlled bird that must navigate through pipes while avoiding collisions.

## Project Structure

```
flappy-bird-clone
├── src
│   ├── index.html        # HTML structure for the game
│   ├── style.css         # Styles for the game interface
│   └── js
│       ├── Game.js       # Game logic and management
│       ├── Bird.js       # Bird mechanics and rendering
│       ├── Pipe.js       # Pipe generation and rendering
│       └── main.js       # Entry point for the game
├── .gitignore            # Files to ignore in Git
└── README.md             # Project documentation
```

## Features

- **Object-Oriented Programming**: The game is structured using classes for better organization and maintainability.
- **Real Physics**: Implements gravity and jump mechanics for the bird.
- **Dynamic Obstacles**: Pipes are generated dynamically with random heights.
- **Collision Detection**: The game checks for collisions between the bird and pipes.
- **Scoring System**: Players earn points for successfully navigating through pipes.

## How to Run the Game

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd flappy-bird-clone
   ```
3. Open `src/index.html` in a web browser to start playing.

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)

## Acknowledgments

This project is inspired by the original Flappy Bird game and serves as a learning exercise in game development using web technologies.