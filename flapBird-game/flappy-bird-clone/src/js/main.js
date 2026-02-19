// This file serves as the entry point for the game. It initializes the game, creates instances of the Game, Bird, and Pipe classes, and starts the game loop.

import Game from './Game.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);
game.start();