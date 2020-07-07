const Generator = require("./generator");
const Validator = require("./validator");
const PuzzleCreator = require("./puzzleCreator");
const Solver = require("./solver");

class Sudoku {

    /**
     * This class represents a sudoku grid.
     * 
     * Basic terms (for a classic 9x9 sudoku):
     *  - The puzzle consists of 27 units - 9 rows, 9 columns and 9 boxes (3x3).
     *  - Each unit must contain the digits 1 through 9.
     *  - Every unit contains 9 cells.
     *  - Bands are 3 horizontally adjoining boxes. There are 3 bands: top, middle and bottom.
     *  - Stacks are 3 vertically adjoining boxes. There are 3 stacks: left, middle and rigth.
     *  - Puzzle clues are the numbers, which are already in the grid.
     * @param {*} size 
     */
    constructor(size) {
        this.grid = [[0]];
        this._SIZE = Number.parseInt(size.toString());
        switch (this._SIZE) {
            case 4:
                this._NUM_BOXES = 4;
                break;
            case 6:
                this._NUM_BOXES = 4;
                break;
            case 8:
                this._NUM_BOXES = 4;
                break;
            case 9:
                this._NUM_BOXES = 9;
                break;
            case 10:
                this._NUM_BOXES = 4;
                break;
            case 16:
                this._NUM_BOXES = 16;
                break;
            default:
                this._NUM_BOXES = 9;
                break;
        }
        this._BOX_SIZE = this._SIZE / Math.sqrt(this._NUM_BOXES);
    } 

    /**
     * Generate new sudoku grid.
     */
    generate() {
        let generator = new Generator(this);
        this.grid = generator.generate();
    }

    /**
     * Create a sudoku puzzle from a filled grid.
     */
    createPuzzle(numberOfClues) {
        let puzzleCreator = new PuzzleCreator(this);
        this.grid = puzzleCreator.createPuzzle(numberOfClues);
    }

    /**
     * Validate sudoku grid.
     */
    isValid() {
        let validator = new Validator(this);
        return validator.checkRows() && validator.checkCols() && validator.checkBoxes();;
    }

    /**
     * Solve a sudoku puzzle and return an array with any solutions found.
     */
    solve() {
        let solver = new Solver(this._SIZE, this.grid);
        solver.solve()
        let solutions = [];
        solver.distinctSolutions.forEach(solution => {
            let sArr = [];
            for (let row = 0; row < this._SIZE; row++) {
                let rArr = [];
                for (let col = 0; col < this._SIZE; col++) {
                    rArr[col] = Number.parseInt(solution[row][col]);
                }
                sArr[row] = rArr;
            }
            solutions.push(sArr);
        });
        return solutions;
    }

    toString() {
        let str = "\n";

        for (let row = 0; row < this._SIZE; row++) {
            for (let col = 0; col < this._SIZE; col++) {
                if (col == 0) {
                    str = str.concat(" ");
                }
                if (this.grid[row][col] != 0) {
                    str = str.concat(this.grid[row][col]);
                } else {
                    str = str.concat("-");
                }
                if ((col + 1) % this._BOX_SIZE == 0 && col < this._SIZE - 1) {
                    str = str.concat(" | ");
                } else {
                    str = str.concat(" ");
                }
            }
            if ((row + 1) % this._BOX_SIZE == 0 && row < this._SIZE - 1) {
                str = str.concat("\n");
                for (let j = 0; j < Math.sqrt(this._NUM_BOXES); j++) {
                    for (let i = 0; i < (this._BOX_SIZE * 2) + 1; i++) {
                        str = str.concat("-");
                    }
                    if (j != Math.sqrt(this._NUM_BOXES) - 1) {
                        str = str.concat("+");
                    }
                }
                str = str.concat("\n");
            } else {
                str = str.concat("\n");
            }
        }
        
        return str;
    }

}

module.exports = Sudoku;