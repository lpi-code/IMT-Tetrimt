import { TetrisModel } from "./../model/tetris_model.js";
import { TetrisView } from "./../view/tetris_view.js";

export class TetrisController extends Object {

    #mainView;
    #mainModel;
    #userLaunchGame = false;
    #musicEnabled = false;

    constructor() {
        super();
        this.#mainModel = new TetrisModel();
        this.#mainView = new TetrisView();
        this.drawGrids();


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
                    this.drawGrids();
                    console.log("Left Key is pressed, this should activate move the piece to the left (-1 in x)");
                    break;
                case "ArrowUp":
                    this.#mainModel.rotateClockwise();
                    this.drawGrids();
                    console.log("Up Key is pressed, this should activate the rotation");
                    break;
                case "ArrowRight":
                    this.#mainModel.moveRight();
                    this.drawGrids();
                    console.log("Right Key is pressed, this should activate move the piece to the right (+1 in x)");
                    break;
                case "ArrowDown":
                    this.drawGrids();
                    this.#mainModel.falafel();
                    console.log("Down Key is pressed, this should accelerate the fall of the tetrominos");
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
            console.log("Start !");
            this.#userLaunchGame = true;
            this.detectArrowKeyInput();
            this.reset();
            this.#mainModel.initGame();
            this.drawGrids();
        });
        
    }

    enableMusic()
    {
        document.querySelector("#manage-sound").addEventListener("click", (e) => {
            this.#musicEnabled = ! this.#musicEnabled;
            if(this.#musicEnabled){
                console.log("Music enable !");
                document.querySelector("#audio").play();
            }
            else {
                console.log("Music disable =(")
                document.querySelector("#audio").pause();
            }
        });
        
    }

    reset()
    {
        document.querySelector("#reset").addEventListener("click", (e) => {
            if (this.#userLaunchGame == false) return;
            this.#mainModel.resetGame();
            this.drawGrids();
            this.#userLaunchGame = false;
            console.log("reset !");
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