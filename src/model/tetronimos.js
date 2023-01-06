// This file contains data structure of game element
import {CELL_SIZE} from './settings.js';
function Tetronimos(array = [], color = 'green', x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.repArray = array;
    this.rotate90 = function(nbRot = 1) {
        // Prerequisite: rotation is possible 
        // Rptate 90 clockwise
        for (let i = 0; i < nbRot; i++) {
            newArray = this.repArray[0].map((val, index) => this.repArray.map(row => row[index]).reverse());
        }
    }
    this.draw = function(context) {
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
    