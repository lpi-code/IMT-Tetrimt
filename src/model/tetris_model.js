
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
        this.#currentTetrominos = null;
        this.loadNextTetrominos();
        this.loadScore();
    }

    //Executed when the current tetrominos has reached the "ground" 
    update()
    {
        this.loadNextTetrominos();
    }

    //Update value of the main grid
    updateMainGrid()
    {
        
    }

    //The apparition of the Tetrominos in the grid
    addTetrominosInGrid()
    {
        //Not finish btw
        const width = this.#currentTetrominos.repArray.length;
        const height = this.#currentTetrominos.repArray[0].length;

        let currentX = this.#currentTetrominos.x
        let currentY = this.#currentTetrominos.y

        for (let i = 0; i < CELL_COUNT_X; i++) {
            for (let j = 0; j < CELL_COUNT_Y; j++) {
              if (this.#currentTetrominos.repArray)
                this.#mainGrid[i][j] = cell;
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
        this.#nextTetrominos =  null;
    }

    loadScore()
    {
        this.#score = 0;
    }

    

}