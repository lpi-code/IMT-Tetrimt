// This file contains data structure of game element
import {CELL_SIZE} from './settings.js';
export class Tetronimos{
    constructor(array = [], color = 'green', x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.repArray = array; // A grid of 0 and 1

        this.getColorGrid = function() {
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

        this.isFallPossible = function(grid) {
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

        this.move = function(grid, direction) {
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

        this.rotate90 = function(grid, nbRot = 1) {
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

        this.popRow = function(row) {
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
           
        this.draw = function(context) {
            // Prerequisite: rotation is possible
            // Draw the tetronimos to the canvas
            for (let i = 0; i < this.repArray.length; i++) {
                for (let j = 0; j < this.repArray[i].length; j++) {
                    if (this.repArray[i][j] === 1) {
                        context.fillStyle = this.color;
                        context.fillRect(this.x + j * CELL_SIZE, this.y + i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    }
                }
            } 
        }
    }   

}
