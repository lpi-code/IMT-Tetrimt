import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH } from "./../model/settings.js";



export class TetrisView extends Object {
    #canvasTetrisContext;
    #canvasNextPieceContext;
    #cellSize = CELL_SIZE;
    #currentLineClearAnimation = [];
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
        if (color != 0) {
            canvasContext.strokeStyle = color;
            // neon effect
            canvasContext.shadowBlur = 10;
            canvasContext.shadowColor = color;
            canvasContext.lineWidth = 2;
            canvasContext.strokeRect(x * this.#cellSize, y * this.#cellSize, this.#cellSize-3, this.#cellSize-3);
        } else if (color == "black") {
            canvasContext.fillStyle = "black";
            canvasContext.shadowBlur = 0;
            
            canvasContext.fillRect(x * this.#cellSize, y * this.#cellSize, this.#cellSize, this.#cellSize);
        }
            

    }

    drawGrid(canvasContext, grid){
        // Draw with canva
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, CELL_SIZE*GRID_WIDTH, CELL_SIZE*GRID_HEIGHT);
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                // Draw the cell
                this.drawCell(canvasContext, j, i, grid[i][j]);
            }
        }
        // Animation if ther are cleared lines
        let promiseList = [];
        for (let i = 0; i < this.#currentLineClearAnimation.length; i++) {
            // spawn animation
            promiseList.push(this.lineClearAnimation(this.#currentLineClearAnimation[i]));
            
        }            
        // await all animation
        Promise.all(promiseList).then(() => {
            this.#currentLineClearAnimation = [];        
        });
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
        this.#canvasTetrisContext.fillText("GAME\nOVER", GRID_WIDTH*CELL_SIZE/2, GRID_HEIGHT*CELL_SIZE/2);
    }

    async lineClearAnimation(line){
        return new Promise(async (resolve) => {
            for (let i = 0; i < GRID_WIDTH; i++) {
                this.drawCell(this.#canvasTetrisContext, i, line, "white");
                await new Promise(resolveM => setTimeout(resolveM, 20));
            }
            for (let i = 0; i < GRID_WIDTH; i++) {
                this.drawCell(this.#canvasTetrisContext, i, line, "black");
            }
            await new Promise(resolveM => setTimeout(resolveM, 200));
            for (let i = 0; i < GRID_WIDTH; i++) {
                this.drawCell(this.#canvasTetrisContext, i, line, "white");
            }
            await new Promise(resolveM => setTimeout(resolveM, 200));
            resolve();
            
        
           
        });
    }

    startLineClearAnimation(line){
        this.#currentLineClearAnimation.push(line);
    }

}
    
