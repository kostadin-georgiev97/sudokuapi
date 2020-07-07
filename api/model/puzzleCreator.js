const Solver = require("./solver");

class PuzzleCreator {

    constructor(sudoku) {
        this.grid = sudoku.grid;
        this._SIZE = Number.parseInt(sudoku._SIZE.toString());
        this._NUM_BOXES = Number.parseInt(sudoku._NUM_BOXES.toString());
        this._BOX_SIZE = this._SIZE / Math.sqrt(this._NUM_BOXES);
        this.countSolutions = 0;
    }

    createPuzzle(numberOfClues) {
        let cellsToRemove = this._SIZE * this._SIZE - numberOfClues;
        this.removeCells(cellsToRemove);
        return this.grid;
    }

    removeCells(cellsToRemove) {
        if (cellsToRemove > 0) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);

            if (this.grid[row][col] != 0) {
                let temp = this.grid[row][col];
                this.grid[row][col] = 0;

                if (this.hasSingleSolution()) {
                    cellsToRemove--;
                    this.removeCells(cellsToRemove);
                } else {
                    this.grid[row][col] = temp;
                    this.removeCells(cellsToRemove);
                }
            } else {
                this.removeCells(cellsToRemove);
            }
        }
    }

    hasSingleSolution() {
        let solver = new Solver(this._SIZE, this.grid);
        solver.solveUnique();

        if (solver.solutionsCount == 1) {
            return true;
        }
        return false;
    }

}

module.exports = PuzzleCreator;