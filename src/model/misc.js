import {CELL_SIZE, GRID_WIDTH, GRID_HEIGHT} from './settings.js';

export function isTetroPosValid(grid, x, y, repArray){
    // Check if the tetronimos can be placed at the given position

    // Out of bound check
    if (x < 0 || y >= GRID_WIDTH || y < 0 || x >= GRID_HEIGHT) {
        return false;
    }

    // Collision check
    for (let i = 0; i < repArray.length; i++) {
        for (let j = 0; j < repArray[i].length; j++) {
            if (repArray[i][j] == 1 && grid[x + i][y + j] != 0) {
                return false;
            }
        }
    }
    
    return true;
}