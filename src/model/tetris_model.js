
import {GRID_WIDTH, GRID_HEIGHT, SMALL_GRID_SIZE, CELL_SIZE} from './settings.js';
import {
    TetrominoI,
    TetrominoSquare,
    TetrominoT,
    TetrominoL,
    TetrominoJ,
    TetrominoS,
    TetrominoZ


} from './tetronimos.js';

export class TetrisModel extends Object {

    #mainGrid;
    #smallGrid;
    #nextTetrominos;
    #currentTetrominos;
    #score;
    

    constructor() {
        super();
        this.initMainGrid();
        this.initSmallGrid();
    }


    //Initial load of the Tetris Model
    initGame(){
        this.initMainGrid();
        this.initSmallGrid();
        this.#currentTetrominos = this.getRandomTetronimos();
        this.#nextTetrominos = this.getRandomTetronimos();
    }

    resetGame(){
        this.#currentTetrominos = null;
        this.#nextTetrominos = null;
        this.#score = 0;
    }

    //Executed when the current tetrominos has reached the "ground" 
    hitTheFloor()
    {
        this.addTetrominosInGrid(); //Add the tetrominos in the main grid
        this.loadNextTetrominos();
        completeLines = [];
        scoreMultiplier = 1;
        for (let i = 0; i < GRID_HEIGHT; i++) {
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

    initMainGrid()
    {
        this.#mainGrid = new Array();
        for (let i = 0; i < GRID_HEIGHT; i++) {
            for (let j = 0; j < GRID_WIDTH; j++) {
              if (!this.#mainGrid[i]) this.#mainGrid[i] = new Array(); 
              this.#mainGrid[i][j] = 0;
            }
        } 
    }

    initSmallGrid()
    {
        this.#smallGrid = new Array();
        for (let i = 0; i < SMALL_GRID_SIZE; i++) {
            for (let j = 0; j < SMALL_GRID_SIZE; j++) {
              if (!this.#smallGrid[i]) this.#smallGrid[i] = new Array(); 
              this.#smallGrid[i][j] = 0;
            }
        } 
    }

    loadNextTetrominos()
    {
        this.#currentTetrominos = this.#nextTetrominos;
        this.#nextTetrominos = this.getRandomTetronimos();
    }

    initScore()
    {
        this.#score = 0;
    }

    isLineCompleted(y){
        return this.#mainGrid[y].every(cell => cell != 0)
    }

    deleteLine(y){
        this.#mainGrid.splice(y, 1); // Delete the line
        this.#mainGrid.unshift(new Array(GRID_WIDTH).fill(0)); // Add a new line at the top
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

    falafel(){
        this.#currentTetrominos.falafel(this.#mainGrid);
    }

    getRandomTetronimos() {
        // Return a new random tetronimos
        let tetronimos = [TetrominoI, TetrominoSquare, TetrominoT, TetrominoL, TetrominoJ, TetrominoS, TetrominoZ];
        let rand = Math.floor(Math.random() * tetronimos.length);
        let x = 0;
        let y = 0;
        return new tetronimos[rand](x, y);
    }

    getShowableGrid(){
        // Return the grid with the current tetrominos
        let grid = this.#mainGrid;
        if (!this.#currentTetrominos) return grid;
        const width = this.#currentTetrominos.repArray.length;
        const height = this.#currentTetrominos.repArray[0].length;
        for (
            let i = this.#currentTetrominos.x; 
            i < width + this.#currentTetrominos.x;
            i++) {
                for (
                    let j = this.#currentTetrominos.y; 
                    j < height + this.#currentTetrominos.y;
                    j++) {
                        if (this.#currentTetrominos.repArray[i-this.#currentTetrominos.x][j-this.#currentTetrominos.y] != 0)
                        grid[i][j] = this.#currentTetrominos.color;
                    }
                }
        console.log(grid);
        return grid;
    }

    getNextPieceGrid(){
        // Return the samll grid with the next tetrominos
        let grid = this.#smallGrid;
        if (!this.#nextTetrominos) return grid;
        return this.#nextTetrominos.repArray;
    }

    getScore(){ return this.#score;}
    
}   