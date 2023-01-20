import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH } from "./../model/settings.js";



export class TetrisView extends Object {
    #canvasTetrisContext;
    #canvasNextPieceContext;
    #cellSize = CELL_SIZE;

    constructor() {
        super();
        this.#canvasTetrisContext = document
            .querySelector("#tetris-grid")
            .getContext("2d");

        this.#canvasNextPieceContext = document
            .querySelector("#next-piece")
            .getContext("2d");
        
    }


    drawCell(canvasContext, x, y, color) {
        // Draw the border
        if (color != 0){
            canvasContext.strokeStyle = color;
            // neon effect
            canvasContext.shadowBlur = 15;
            canvasContext.shadowColor = color;
            canvasContext.lineWidth = 2;
            canvasContext.strokeRect(x * this.#cellSize, y * this.#cellSize, this.#cellSize-3, this.#cellSize-3);
        }

    }

    drawGrid(canvasContext, grid){
        // Draw with canva
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, CELL_SIZE*grid[0].length, CELL_SIZE*grid.length);
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                // Draw the cell
                this.drawCell(canvasContext, j, i, grid[i][j]);
            }
        }
    }

    drawBaseGrid(grid){
        this.drawGrid(this.#canvasTetrisContext, grid);
    }

    drawNextPieceGrid(grid){
        this.drawGrid(this.#canvasNextPieceContext, grid);
    }

    changeScore(newScore){
        document.querySelector("#score").textContent = newScore;
    }

    drawGameOver(){
        this.#canvasTetrisContext.fillStyle = "black";
        this.#canvasTetrisContext.fillRect(0, 0, CELL_SIZE*GRID_WIDTH, CELL_SIZE*GRID_HEIGHT);
        this.#canvasTetrisContext.shadowBlur = 0;
        this.#canvasTetrisContext.font = "30px Arial";
        this.#canvasTetrisContext.fillStyle = "red";
        this.#canvasTetrisContext.textAlign = "center";
        this.#canvasTetrisContext.fillText("GAME OVER", GRID_WIDTH*CELL_SIZE/2, GRID_HEIGHT*CELL_SIZE/2);
    }

}