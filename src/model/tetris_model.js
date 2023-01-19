
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
    #gridCallback;
    #scoreCallback;
    #gameoverCallback;
    #fallDaemon;

    constructor(gridCallback, scoreCallback, gameoverCallback) {
        super();
        this.#gridCallback = gridCallback;
        this.#scoreCallback = scoreCallback;
        this.#gameoverCallback = gameoverCallback;
        this.initSmallGrid();
        this.initMainGrid();
    }

    init(){
        this.#gridCallback();
        this.#score = 0;
    }


    //Initial load of the Tetris Model
    initGame(){
        this.#currentTetrominos = this.getRandomTetronimos();
        this.#nextTetrominos = this.getRandomTetronimos();
        this.#gridCallback();
        // start fall daemon
        let fallCallback = () => this.fall();
        this.#fallDaemon = setInterval(fallCallback, 1000);
    }

    resetGame(){
        this.#currentTetrominos = null;
        this.#nextTetrominos = null;
        this.initMainGrid();
        this.initSmallGrid();
        this.#score = 0;
        this.#gridCallback();
        // stop fall daemon
        clearInterval(this.#fallDaemon);
    }

    gameOver(){
        clearInterval(this.#fallDaemon);
    }

    //Executed when the current tetrominos has reached the "ground" 
    hitTheFloor()
    {
        if (this.#mainGrid[0][5] != 0 || this.#mainGrid[0][6] != 0 ) this.#gameoverCallback(); 
        console.log("hit the floor!");
        this.addTetrominosInGrid(); //Add the tetrominos in the main grid
        this.loadNextTetrominos();
        let completeLines = [];
        let scoreMultiplier = 1;
        for (let i = 0; i < GRID_HEIGHT; i++) {
            if (this.isLineCompleted(i)){
                this.deleteLine(i);
                completeLines++;
                this.#score += 100*scoreMultiplier;
                scoreMultiplier++;
            }
        }
        this.#scoreCallback();

        
        // Check if a line is completed
    }

    fall(){
        // move down once
        if (!this.#currentTetrominos.isMoveDownPossible(this.#mainGrid)){
            console.log("move down not possible anymore");
            this.hitTheFloor();
        }
        this.#currentTetrominos.move(this.#mainGrid, "down");
        this.#gridCallback();
    }

    //Update value of the main grid

    //The apparition of the Tetrominos in the grid
    addTetrominosInGrid()
    {
        // Make the tetrominos appear in grid local to the model
        this.#mainGrid = this.getShowableGrid();
        this.#gridCallback();
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
        this.#currentTetrominos.center();
        this.#nextTetrominos = this.getRandomTetronimos();
    }

    isLineCompleted(y){
        return this.#mainGrid[y].every(cell => cell != 0)
    }

    deleteLine(y){
        this.#mainGrid.splice(y, 1); // Delete the line
        this.#mainGrid.unshift(new Array(GRID_WIDTH).fill(0)); // Add a new line at the top
        this.#gridCallback();
    }

    moveLeft(){
        try{
            this.#currentTetrominos.move(
                this.#mainGrid,
                "left"
            )
            this.#gridCallback();
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
            this.#gridCallback();
        }catch(e){
            console.log(e);
        }
    }

    rotateClockwise(){
        this.#currentTetrominos.rotateClockwise(this.#mainGrid);
        this.#gridCallback();
    }

    falafel(){
        // Move the tetrominos to the bottom
        // Fall fell fallen
        this.#currentTetrominos.falafel(this.#mainGrid);
        if (!this.#currentTetrominos.isMoveDownPossible(this.#mainGrid)){
            this.hitTheFloor();
        }
        this.#gridCallback();
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
        let grid = JSON.parse(JSON.stringify(this.#mainGrid)); // Deep copy of the grid
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
        return grid;
    }

    getNextPieceGrid(){
        // Return the samll grid with the next tetrominos
        let grid = JSON.parse(JSON.stringify(this.#smallGrid)); // Deep copy of the grid
        if (!this.#nextTetrominos) return grid;
        const width = this.#nextTetrominos.repArray.length;
        const height = this.#nextTetrominos.repArray[0].length;
        const xGap = Math.round((SMALL_GRID_SIZE - width)/2);
        const yGap = Math.round((SMALL_GRID_SIZE - height - 1)/2);
        for (
            let i = this.#nextTetrominos.x; 
            i < width + this.#nextTetrominos.x;
            i++) {
                for (
                    let j = this.#nextTetrominos.y; 
                    j < height + this.#nextTetrominos.y;
                    j++) {
                        if (this.#nextTetrominos.repArray[i-this.#nextTetrominos.x][j-this.#nextTetrominos.y] != 0)
                        grid[i + xGap][j + yGap] = this.#nextTetrominos.color;
                    }
                }
        return grid;
    }

    getScore(){ return this.#score;}
    
}   