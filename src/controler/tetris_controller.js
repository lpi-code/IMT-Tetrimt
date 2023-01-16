import { TetrisModel } from "./../model/tetris_model.js";
import { TetrisView } from "./../view/tetris_view.js";

export class TetrisController extends Object {

    #mainView;
    #mainModel;
    #userLaunchGame = false;
    #musicEnabled = false;

    constructor() {
        super();
        this.#mainView = new TetrisView();
        this.#mainModel = new TetrisModel(this.drawGrids.bind(this));


        this.startGame();
        this.enableMusic();
    }

    drawGrids(){
        this.#mainView.drawBaseGrid(this.#mainModel.getShowableGrid());
        this.#mainView.drawNextPieceGrid(this.#mainModel.getNextPieceGrid());
    }

    //Listen to user keyboard input on the arrow keys
    //As always, everything is subjected to change
    detectArrowKeyInput()
    {
        document.addEventListener('keydown', ev  => {
            if (this.#userLaunchGame == false) return;
            switch(ev.key){
                case "ArrowLeft":
                    this.#mainModel.moveLeft();
                    break;
                case "ArrowUp":
                    this.#mainModel.rotateClockwise();
                    break;
                case "ArrowRight":
                    this.#mainModel.moveRight();
                    break;
                case "ArrowDown":
                    this.#mainModel.falafel();
                    break;
                default:
                    break;
            }
        });
    }

    //If the user hasn't declenched the start of the game yet, start it
    //Later on, the controller will have to change the value of #userLaunchGame to false when a game is over.
    startGame()
    {
        document.querySelector("#start").addEventListener("click", (e) => {
            if (this.#userLaunchGame == true) return;
            this.#userLaunchGame = true;
            this.detectArrowKeyInput();
            this.reset();
            this.#mainModel.initGame();
        });
        
    }

    enableMusic()
    {
        document.querySelector("#manage-sound").addEventListener("click", (e) => {
            this.#musicEnabled = ! this.#musicEnabled;
            if(this.#musicEnabled){
                document.querySelector("#audio").play();
            }
            else {
                document.querySelector("#audio").pause();
            }
        });
        
    }

    reset()
    {
        document.querySelector("#reset").addEventListener("click", (e) => {
            if (this.#userLaunchGame == false) return;
            this.#mainModel.resetGame();
            this.#userLaunchGame = false;
        });
    }

    refreshMainGrid(){
        this.#mainView.drawBaseGrid(this.#mainModel.getShowableGrid());
    }

    refreshSmallGrid(){
        this.#mainView.drawNextPieceGrid(this.#mainModel.getNextPieceGrid());
    }

    updateScore(){
        this.#mainView.changeScore(this.#mainModel.getScore());
    }

    

}