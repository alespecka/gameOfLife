'use strict';

import {Game} from './game.js';

const squareSize = 25;

const width = document.querySelector(".gameArea").offsetWidth;
const nx = Math.floor(width / squareSize);

// const nx = 60;
const ny = 30;
const game = new Game(squareSize, nx, ny);

let gamePaused = true;

function click() {
    game.click(mouseX, mouseY);
}

function setup() {
    // game.blinker(3, 3, 1)
    // game.toad(5, 5, 3);

    // game.blinker(1, 0, 1)
    // game.toad(3, 3, 1)
    // game.toad(4, 0, 0);

    // game.blinker(4, 3, 1)
    // game.blinker(5, 2, 0)
    // game.toad(8, 3, 0);

    const canvas = createCanvas(game.width + 2, game.height + 2);
    canvas.parent("canvas");
    canvas.mouseClicked(click);
    
    strokeWeight(1);

    game.drawMesh();
    game.draw();

    frameRate(4);
}

function draw() {
    if (gamePaused) return;

    // game.step();
    // game.draw();
    game.stepAndDraw();
}

function pauseGame() {
    if (gamePaused) {
        gamePaused = false;
        document.getElementById("pauseButton").innerHTML = "Pause";
    } else {
        gamePaused = true;
        document.getElementById("pauseButton").innerHTML = "Resume";
    }
}

function step() {
    if (gamePaused) {
        game.stepAndDraw();
    }
}

function clearIt() {
    game.clear();
}

function sliderChange() {
    const val = document.getElementById("slider").value;
    console.log(val);
    const freq = Math.pow(2, val);
    document.getElementById("sliderValue").innerHTML = freq;
    frameRate(freq);
}

window.setup = setup;
window.draw = draw;
window.step = step;
window.pauseGame = pauseGame;
window.clearIt = clearIt;
window.sliderChange = sliderChange;

// function main() {
//     const nx = 4;
//     const ny = 4;
//     const squareSize = 25;

//     game = new Game(squareSize, nx, ny);

//     game.blinker(0, 0, 1)

//     console.log(game.board);
//     game.step();
//     console.log(game.board);
//     game.step();
//     console.log(game.board);
// }
