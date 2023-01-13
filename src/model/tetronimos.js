// This file contains data structure of game element
import {CELL_SIZE} from './settings.js';

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
        for (let i = 0; i < this.repArray.length; i++) {
            for (let j = 0; j < this.repArray[i].length; j++) {
                if (this.repArray[i][j] === 1 && grid[this.x + j][this.y + i + 1] != 0) {
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
            newX -= 1;
        } else if (direction === 'right') {
            newX += 1;
        } else if (direction === 'down') {
            newY += 1;
        } else {
            throw new Error('Invalid direction');
        }
        for (let i = 0; i < this.repArray.length; i++) {
            for (let j = 0; j < this.repArray[i].length; j++) {
                // Collision check
                if (this.repArray[i][j] === 1 && grid[newX + j][newY + i] === 1) {
                    throw new Error('Movement not possible : collision');
                }

                // Out of bound check
                if (newX + j < 0 || newX + j >= GRID_WIDTH || newY + i < 0 || newY + i >= GRID_HEIGHT) {
                    throw new Error('Movement not possible : out of bound');
                }
            }
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
        let newY = this.y;
        while (this.isMoveDownPossible(grid)) {
            newY += 1;
        }
    }


    rotateClockwise(grid, nbRot = 1) {
        // Rotate 90 clockwise
        // Raise error if rotation is not possible
        for (let i = 0; i < nbRot; i++) {
            newArray = this.repArray[0].map((val, index) => this.repArray.map(row => row[index]).reverse());
        }
        for (let i = 0; i < newArray.length; i++) {
            for (let j = 0; j < newArray[i].length; j++) {
                // Collision check
                if (newArray[i][j] === 1 && grid[this.x + j][this.y + i] === 1) {
                    throw new Error('Rotation not possible : collision');
                }

                // Out of bound check
                if (this.x + j < 0 || this.x + j >= GRID_WIDTH || this.y + i < 0 || this.y + i >= GRID_HEIGHT) {
                    throw new Error('Rotation not possible : out of bound');
                }
            }
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
}   

export class TetronimoI extends Tetronimos {
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

getRandomTetronimos = function() {
    // Return a new random tetronimos
    let tetronimos = [TetronimoI, TetrominoSquare, TetrominoT, TetrominoL, TetrominoJ, TetrominoS, TetrominoZ];
    let rand = Math.floor(Math.random() * tetronimos.length);
    // Center the tetronimos
    let x = Math.floor(GRID_WIDTH / 2) - 1;
    let y = 0;
    return new tetronimos[rand](x, y);
}
