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
        this.#mainModel = new TetrisModel(
            this.drawGrids.bind(this), 
            this.updateScore.bind(this), 
            this.gameOver.bind(this), 
            this.lineClearAnimation.bind(this));

        this.#mainModel.init();
        this.detectArrowKeyInput();
        document.querySelector("#manage-sound").addEventListener("click", (e) => { this.toggleMusic()});
        document.querySelector("#start").addEventListener("click", (e) => { this.toggleGameState()});
    }

    drawGrids(){
        this.#mainView.drawBaseGrid(this.#mainModel.getShowableGrid());
        this.#mainView.drawNextPieceGrid(this.#mainModel.getNextPieceGrid());
    }

    updateScore(){
        this.#mainView.changeScore(this.#mainModel.getScore());
    }

    gameOver(){
        this.#mainView.drawGameOver();
    }

    detectArrowKeyInput()
    {
        document.addEventListener('keydown', ev  => {

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
                    this.#mainModel.fall();
                    break;
                case "Enter":
                    this.toggleGameState();
                    break;
                case "m":
                    this.toggleMusic();
                    break;    
                case " ":
                    this.#mainModel.falafel();
                    break;
                default:
                    break;
            }
        });
    }

    toggleGameState(){
        this.#userLaunchGame = ! this.#userLaunchGame;
        if (this.#userLaunchGame == true){
            document.querySelector("#start").firstChild.className = "bx bx-reset";
            this.#mainModel.initGame();
        }
        else{
            document.querySelector("#start").firstChild.className = "bx bx-play";
            this.#mainModel.resetGame();
        }
    }

    toggleMusic(){
        this.#musicEnabled = ! this.#musicEnabled;
        if(this.#musicEnabled){
            document.querySelector("#audio").play();
            document.querySelector("#manage-sound").firstChild.className = "bx bx-stop";
        }
        else {
            document.querySelector("#audio").pause();
            document.querySelector("#manage-sound").firstChild.className = "bx bxs-music";
        }
    }

    refreshMainGrid(){
        this.#mainView.drawBaseGrid(this.#mainModel.getShowableGrid());
    }

    refreshSmallGrid(){
        this.#mainView.drawNextPieceGrid(this.#mainModel.getNextPieceGrid());
    }

    lineClearAnimation(line){
        this.#mainView.startLineClearAnimation(line);
    }
}