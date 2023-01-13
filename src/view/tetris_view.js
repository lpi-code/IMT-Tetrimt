import { CELL_SIZE } from "../model/settings.js";



export class TetrisView extends Object {
    #canvasContext;
    #cellSize = CELL_SIZE;
    constructor() {
        super();
        this.#canvasContext = document
            .getElementById("tetris-canvas")
            .getContext("2d");
    }


    drawCell(x, y, color) {
        // Draw with canva
        this.#canvas.fillStyle = color;
        this.#canvas.fillRect(x*this.#cellSize, y*this.#cellSize, this.#cellSize, this.#cellSize);

    }

    drawGrid(grid){
        // Draw with canva
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                // Draw the cell
                this.drawCell(i, j, grid[i][j]);
            }
        }
    }

}