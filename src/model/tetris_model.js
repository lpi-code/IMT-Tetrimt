
import {CELL_COUNT_X, CELL_COUNT_Y} from '/settings.js';

export class TetrisModel extends Object {

    #mainGrid;
    #nextTetrominos;
    #currentTetrominos;
    #score;
    

    constructor() {
        super();
        this.loadComponents();
    }


    //Initial load of the Tetris Model
    loadComponents() {
        this.loadMainGrid();
        this.#currentTetrominos = this.getRandomTetronimos();
        this.#nextTetrominos = this.getRandomTetronimos();
        this.loadScore();
    }

    //Executed when the current tetrominos has reached the "ground" 
    hitTheFloor()
    {
        this.addTetrominosInGrid(); //Add the tetrominos in the main grid
        this.loadNextTetrominos();
        completeLines = [];
        scoreMultiplier = 1;
        for (let i = 0; i < CELL_COUNT_Y; i++) {
            if (this.isLineCompleted(i)){
                this.deleteLine(i);
                completeLines++;
                this.score += 100*scoreMultiplier;
                scoreMultiplier++;
            }
        }

        
        // Check if a line is completed
    }

    fall(){
        // move down once
        this.#currentTetrominos.fall();
        if (!this.#currentTetrominos.isMoveDownPossible(this.#mainGrid)){
            this.hitTheFloor();
        }
    }

    //Update value of the main grid

    //The apparition of the Tetrominos in the grid
    addTetrominosInGrid()
    {
        // Make the tetrominos appear in grid local to the model
        const width = this.#currentTetrominos.repArray.length;
        const height = this.#currentTetrominos.repArray[0].length;

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
              if (this.#currentTetrominos.repArray)
                this.#mainGrid[i+this.#currentTetrominos.x][j + this.#currentTetrominos.y] = cell;
            }
        } 
    }

    //When a horizontal line is completed by the player 
    updateScore(points)
    {
        this.#score += points;
    }

    loadMainGrid()
    {
        this.#mainGrid = new Array();
        for (let i = 0; i < CELL_COUNT_X; i++) {
            for (let j = 0; j < CELL_COUNT_Y; j++) {
              if (!this.#mainGrid[i]) this.#mainGrid[i] = new Array(); 
              this.#mainGrid[i][j] = 0;
            }
        } 
    }

    loadNextTetrominos()
    {
        this.#currentTetrominos = this.#nextTetrominos;
        this.#nextTetrominos = this.getRandomTetronimos();
    }

    loadScore()
    {
        this.#score = 0;
    }

    isLineCompleted(y){
        return this.#mainGrid[y].every(cell => cell != 0)
    }

    deleteLine(y){
        this.#mainGrid.splice(y, 1); // Delete the line
        this.#mainGrid.unshift(new Array(CELL_COUNT_X).fill(0)); // Add a new line at the top
    }

    moveLeft(){
        try{
            this.#currentTetrominos.move(
                this.#mainGrid,
                "left"
            )
        }catch(e){
            console.log(e);
        }
    }

    moveRight(){
        try{
            this.#currentTetrominos.move(
                this.#mainGrid,
                "right"
            )
        }catch(e){
            console.log(e);
        }
    }

    rotateClockwise(){
        this.#currentTetrominos.rotateClockwise(this.#mainGrid);
    }

    getRandomTetronimos() {
        // Return a new random tetronimos
        let tetronimos = [TetronimoI, TetrominoSquare, TetrominoT, TetrominoL, TetrominoJ, TetrominoS, TetrominoZ];
        let rand = Math.floor(Math.random() * tetronimos.length);
        // Center the tetronimos
        let x = Math.floor(GRID_WIDTH / 2) - 1;
        let y = 0;
        return new tetronimos[rand](x, y);
    }
    

}