// This file contains data structure of game element
import {CELL_SIZE, GRID_WIDTH, GRID_HEIGHT} from './settings.js';
import {isTetroPosValid} from './misc.js';
class Tetronimos{
    constructor(array = [], color = 'green', x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.repArray = array; // A grid of 0 and 1
    }
    getColorGrid() {
        // Return a grid with the color of the tetronimos
        // WARNING : It is not 0 and 1
        // [
        //    [0,       FFFFF, 0]
        //    [FFFFFF,  FFFFF, FFFFFF] 
        // ]
        let grid = [];
        for (let i = 0; i < this.repArray.length; i++) {
            let row = [];
            for (let j = 0; j < this.repArray[i].length; j++) {
                if (this.repArray[i][j] === 1) {
                    row.push(this.color);
                } else {
                    row.push(0);
                }
            }
            grid.push(row);
        }
        return grid;
    }

    isMoveDownPossible(grid) {
        // Check if the tetronimos can fall
        if (!((this.x + this.repArray.length) < GRID_HEIGHT))
            return false;
        for (let i = 0; i < this.repArray.length; i++) {
            for (let j = 0; j < this.repArray[i].length; j++) {
                if (this.repArray[i][j] == 1 && grid[this.x + i + 1][this.y + j] != 0) {
                    return false;
                }
            }
        }
        return true;
        
    }

    move(grid, direction) {
        // Move the tetronimos to the left or right or down
        // Raise error if movement is not possible
        let newX = this.x;
        let newY = this.y;
        if (direction === 'left') {
            newY -= 1;
        } else if (direction === 'right') {
            newY += 1;
        } else if (direction === 'down') {
            newX += 1;
        } else {
            throw new Error('Invalid direction');
        }
        if (!isTetroPosValid(grid, newX, newY, this.repArray)) {
            throw new Error('Movement not possible');
        }
        this.x = newX;
        this.y = newY;
    }

    fall(grid){
        // move down once
        this.move(grid, "down")
    }

    falafel(grid) {
        // Fall the tetronimos to the bottom
        // Raise error if movement is not possible
        while (this.isMoveDownPossible(grid)) {
            this.move(grid, 'down')
        }
    }


    rotateClockwise(grid, nbRot = 1) {
        // Rotate 90 clockwise
        // Raise error if rotation is not possible
        let newArray;
        for (let i = 0; i < nbRot; i++) {
             newArray = this.repArray[0].map((val, index) => this.repArray.map(row => row[index]).reverse());
        }
        if (!isTetroPosValid(grid, this.x, this.y, newArray)) {
            throw new Error('Rotation not possible');
        }
        this.repArray = newArray;
    }

    popRow(row) {
        // Rox represent a row in the grid (not the tetronimos)
        // Remove a row from the tetronimos if needed
        // => return true if the tetronimos is now empty
        
        if (row < this.y || row >= this.y + this.repArray.length) {
            return false;
        }
        let newArray = [];
        let rowToRemove = row - this.y;
        this.repArray.pop(rowToRemove);
        this.repArray = newArray;
        if (newArray.length === 0) {
            return true;
        }
    }

    center() {
        // place the tetronimos in the center of the grid
        this.x = 0;
        this.y = Math.floor((GRID_WIDTH - this.repArray[0].length) / 2);
    }
}   

export class TetrominoI extends Tetronimos {
    constructor(x, y) {
        super([[1,1,1,1]], 'cyan', x, y);
    }
}

export class TetrominoSquare extends Tetronimos {
    constructor(x, y) {
        super([[1,1],[1,1]], 'yellow', x, y);
    }
}

export class TetrominoT extends Tetronimos {
    constructor(x, y) {
        super([[1,1,1],[0,1,0]], 'purple', x, y);
    }
}

export class TetrominoL extends Tetronimos {
    constructor(x, y) {
        super([[1,1,1],[1,0,0]], 'orange', x, y);
    }
}

export class TetrominoJ extends Tetronimos {
    constructor(x, y) {
        super([[1,1,1],[0,0,1]], 'blue', x, y);
    }
}

export class TetrominoS extends Tetronimos {
    constructor(x, y) {
        super([[0,1,1],[1,1,0]], 'green', x, y);
    }
}

export class TetrominoZ extends Tetronimos {
    constructor(x, y) {
        super([[1,1,0],[0,1,1]], 'red', x, y);
    }
}

export class FullGrid extends Tetronimos {
    constructor() {
        super(new Array(4).fill(new Array(GRID_WIDTH).fill(1)), 'red');
    }
}
