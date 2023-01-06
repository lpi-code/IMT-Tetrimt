// This file contains data structure of game element
import {CELL_SIZE} from './settings.js';
class Tetronimos{
    constructor(array = [], color = 'green', x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.repArray = array;
        this.rotate90 = function(grid, nbRot = 1) {
            // Rotate 90 clockwise
            // Raise error if rotation is not possible
            for (let i = 0; i < nbRot; i++) {
                newArray = this.repArray[0].map((val, index) => this.repArray.map(row => row[index]).reverse());
            }
            for (let i = 0; i < newArray.length; i++) {
                for (let j = 0; j < newArray[i].length; j++) {
                    if (newArray[i][j] === 1 && grid[this.x + j][this.y + i] === 1) {
                        throw new Error('Rotation not possible');
                    }
                }
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
        this.isFallPossible = function(grid) {
            // Check if the tetronimos can fall
            for (let i = 0; i < this.repArray.length; i++) {
                for (let j = 0; j < this.repArray[i].length; j++) {
                    if (this.repArray[i][j] === 1 && grid[this.x + j][this.y + i + 1] === 1) {
                        return false;
                    }
                }
            }
            return true;
        }
    }   

}
    