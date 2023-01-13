import { CELL_SIZE } from "./../model/settings.js";



export class TetrisView extends Object {
    #canvasTetrisContext;
    #canvasNextPieceContext;
    #cellSize = CELL_SIZE;
    constructor() {
        super();
        this.#canvasTetrisContext = document
            .querySelector("#tetris-canvas")
            .getContext("2d");

        this.#canvasNextPieceContext = document
            .querySelector("#next-piece")
            .getContext("2d");
        
    }


    drawCell(canvasContext, x, y, color) {
        // Draw with canva
        canvasContext.fillStyle = color;
        canvasContext.fillRect(x*this.#cellSize, y*this.#cellSize, this.#cellSize, this.#cellSize);

    }

    drawGrid(canvasContext, grid){
        // Draw with canva
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                // Draw the cell
                this.drawCell(canvasContext, i, j, grid[i][j]);
            }
        }
    }

    drawBaseGrid(grid){
        this.drawGrid(this.#canvasTetrisContext, grid);
    }

}