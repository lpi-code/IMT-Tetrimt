


export class TetrisView extends Object {
    #canvas;
    constructor() {
        super();
        this.#canvas = document.getElementById("tetris-canvas");
    }

    drawCell(x, y, color, size) {
        // Draw with canva
        this.#canvas.fillStyle = color;
        this.#canvas.fillRect(x, y, size, size);
    }

    drawGrid(grid){
        // Draw with canva
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                // Draw the cell
                this.drawCell(i, j, grid[i][j], CELL_SIZE);
            }
        }
    }

}