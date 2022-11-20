'use strict'

function init2DArray(m, n) {
    const arr = new Array(m);
    for (let i = 0; i < m; i++) {
        arr[i] = new Array(n).fill(0);
    }

    return arr;
}

function fill2DArray(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].fill(val);
    }

    return arr;
}

function eraseEdge(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i][0] = 0;
        arr[i][arr[i].length-1] = 0;
    }

    for (let j = 0; j < arr.length; j++) {
        arr[0][j] = 0;
        arr[arr.length-1][j] = 0;
    }
}

export class Game {
    constructor(squareSize, nx, ny) {
        this.nx = nx;
        this.ny = ny;
        this.squareSize = squareSize;
        this.width = nx * squareSize;
        this.height = ny * squareSize;
        this.board = init2DArray(this.ny + 2, this.nx + 2);
        this.neighbours = init2DArray(this.ny + 2, this.nx + 2);
    }

    initBoard(coords, ix, iy) {
        for (const coord of coords) {
            this.board[iy + coord[0] + 1][ix + coord[1] + 1] = 1;
        }
    }

    blinker(ix, iy, type=0) {
        let coords;
        switch (type) {
            case 0:
                coords = [[0, 0], [0, 1], [0, 2]];
                break;
            case 1:
                coords = [[0, 0], [1, 0], [2, 0]];
                break;
            default:
                new Error(`unsopported value ${type} for type`);
        }

        this.initBoard(coords, ix, iy);
    }

    toad(ix, iy, type=0) {
        let coords;
        switch (type) {
            case 0:
                coords = [[0, 0], [0, 1], [0, 2], [1, 1], [1, 2], [1, 3]];
                break;
            case 1:
                coords = [[0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2]];
                break;
            case 2:
                coords = [[0, 0], [1, 0], [2, 0], [1, 1], [2, 1], [3, 1]];
                break;
            case 3:
                coords = [[1, 0], [2, 0], [3, 0], [0, 1], [1, 1], [2, 1]];
                break;
            default:
                new Error(`unsopported value ${type} for type`);
        }

        this.initBoard(coords, ix, iy);
    }

    countNeighbours() {
        fill2DArray(this.neighbours, 0);
    
        for (let iy = 1; iy < this.ny + 1; iy++) {
            for (let ix = 1; ix < this.nx + 1; ix++) {
                this.neighbours[iy][ix] = this.board[iy][ix-1] + this.board[iy][ix+1] + this.board[iy-1][ix] + this.board[iy+1][ix]
                                        + this.board[iy-1][ix-1] + this.board[iy-1][ix+1] + this.board[iy+1][ix-1] + this.board[iy+1][ix+1];
            }
        }
    }

    step() {
        this.countNeighbours();
    
        for (let ix = 1; ix < this.nx + 1; ix++) {
            for (let iy = 1; iy < this.ny + 1; iy++) {
                if (this.neighbours[iy][ix] == 3 || (this.board[iy][ix] == 1 && this.neighbours[iy][ix] == 2)) {
                    this.board[iy][ix] = 1;
                } else {
                    this.board[iy][ix] = 0;
                }
            }
        }

        eraseEdge(this.board); 
    }

    stepAndDraw() {
        this.countNeighbours();
    
        for (let ix = 1; ix < this.nx + 1; ix++) {
            for (let iy = 1; iy < this.ny + 1; iy++) {
                if (this.board[iy][ix] == 1 && this.neighbours[iy][ix] != 2 && this.neighbours[iy][ix] != 3) {
                    this.board[iy][ix] = 0;
                    fill(255);
                    rect((ix - 1) * this.squareSize + 1, (iy - 1) * this.squareSize + 1, this.squareSize, this.squareSize);
                } else if (this.board[iy][ix] == 0 && this.neighbours[iy][ix] == 3) {
                    this.board[iy][ix] = 1;
                    fill(50);
                    rect((ix - 1) * this.squareSize + 1, (iy - 1) * this.squareSize + 1, this.squareSize, this.squareSize);
                }
            }
        }

        eraseEdge(this.board);
    }

    drawMesh() {
        for (let ix = 0; ix <= this.nx; ix++) {
            line(ix * this.squareSize + 1, 1, ix * this.squareSize + 1, this.height + 1);
        }
        
        for (let iy = 0; iy <= this.ny; iy++) {			
            line(1, iy * this.squareSize + 1, this.width + 1, iy * this.squareSize + 1);
        }
    }

    draw() {
        for (let ix = 1; ix < this.nx + 1; ix++) {
            for (let iy = 1; iy < this.ny + 1; iy++) {
                if (this.board[iy][ix] == 1) {
                    fill(50);
                } else {
                    fill(255);
                }
                rect((ix - 1) * this.squareSize + 1, (iy - 1) * this.squareSize + 1, this.squareSize, this.squareSize);
            }
        }
    }

    click(mouseX, mouseY) {
        const ix = Math.floor(mouseX / this.squareSize);
        const iy = Math.floor(mouseY / this.squareSize);
        console.log(ix, iy);

        if (this.board[iy + 1][ix + 1]) {
            this.board[iy + 1][ix + 1] = 0;
            fill(255);
        } else {
            this.board[iy + 1][ix + 1] = 1;
            fill(50);
        }

        rect(ix * this.squareSize + 1, iy * this.squareSize + 1, this.squareSize, this.squareSize);
    }
}
