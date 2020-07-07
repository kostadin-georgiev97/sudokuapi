class Generator {

    constructor(sudoku) {
        this.grid = [[0]];
        this._SIZE = Number.parseInt(sudoku._SIZE.toString());
        this._NUM_BOXES = Number.parseInt(sudoku._NUM_BOXES.toString());
        this._BOX_SIZE = this._SIZE / Math.sqrt(this._NUM_BOXES);
    }

    generate() {
        /* STEP 1 - Initialize an empty grid. */
        this.initialize();

        /* STEP 2 - Generate a random solution and populate the grid with it. */
        this.fillGrid();

        /* STEP 3 - Apply random transformations. */
        this.transform();

        return this.grid;
    }

    /**
     * Initialize a grid of the correct size filled with 0s.
     */
    initialize() {
        this.grid = Array(this._SIZE).fill().map(() => Array(this._SIZE).fill(0));
    }

    fillGrid() {
        let row = -1,
            col = -1;
        let isEmpty = true;

        for (let i = 0; i < this._SIZE; i++) {
            for (let j = 0; j < this._SIZE; j++) {
                if (this.grid[i][j] == 0 ) {
                    row = i;
                    col = j;
                    isEmpty = false;
                    break;
                }
            }
            if (!isEmpty) {
                break;
            }
        }

        if (isEmpty) {
            return true;
        }

        let availableNumbers = Array.from(Array(this._SIZE), (_, i) => i + 1);
        // Shuffle availabel numbers.
        for (let i = availableNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableNumbers[i], availableNumbers[j]] = [availableNumbers[j], availableNumbers[i]];
        }

        for (let i = 0; i < availableNumbers.length; i++) {
            if (this.isSafe(row, col, availableNumbers[i])) {
                this.grid[row][col] = availableNumbers[i];
                if (this.fillGrid()) {
                    return true;
                } else {
                    this.grid[row][col] = 0;
                }
            }
        }

        return false;
    }

    isSafe(row, col, num) {
        // Check row
        for (let i = 0; i < this._SIZE; i++) {
            if (this.grid[row][i] == num) {
                return false;
            }
        }

        // Check col
        for (let i = 0; i < this._SIZE; i++) {
            if (this.grid[i][col] == num) {
                return false;
            }
        }

        // Check box
        let sqrt = Math.sqrt(this._SIZE);
        let boxRow = row - row % sqrt;
        let boxCol = col - col % sqrt;
        for (let r = boxRow; r < boxRow + sqrt; r++) {
            for (let c = boxCol; c < boxCol + sqrt; c++) {
                if (this.grid[r][c] == num) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Apply a random amount (between 2000 and 10000) of transformations.
     * Two valid grids are essentially the same if one can be derived from the other.
     * The approximate number of distinct solutions derived for a 9x9 grid are 3,359,232.
     * https://en.wikipedia.org/wiki/Mathematics_of_Sudoku#Enumerating_essentially_different_Sudoku_solutions
     * 
     * The following operations are Sudoku preserving symmetries and always translate a valid grid into another valid grid:
        1. Relabeling symbols.
        2. Band permutations.
        3. Row permutations within a band.
        4. Stack permutations.
        5. Column permutations within a stack.
        6. Reflection.
        7. Transposition.
        8. Rotation.
     */
    transform() {
        let numTransformations = Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000;
        for (let i = 0; i < numTransformations; i++) {
            this.singleTransformation();
        }
    }

    /**
     * Choose a random transformation and execute it.
     */
    singleTransformation() {
        // Choose a random transformation (from 8 available).
        let typeOfTransformation = Math.floor((Math.random() * 8) + 1);

        switch (typeOfTransformation) {
            case 1:
                this.relabel();
                break;
            case 2:
                this.bandPermutation();
                break;
            case 3:
                this.rowPermutation();
                break;
            case 4:
                this.stackPermutation();
                break;
            case 5:
                this.colPermutation();
                break;
            case 6:
                this.reflection();
                break;
            case 7:
                this.transposition();
                break;
            case 8:
                this.rotation();
                break;
        }
    }

    /**
     * TRANSFORMATION #1:
     * 
     * Relabel symbols (e.g. 9s become 4s and vice versa).
     * Note that the function swaps only two numbers in the grid.
     */
    relabel() {
        // Choose a random number.
        let a = Math.floor((Math.random() * this._SIZE) + 1);
        // Choose a different random number.
        let b = Math.floor((Math.random() * this._SIZE) + 1);
        while (b == a) {
            b = Math.floor((Math.random() * this._SIZE) + 1);            
        }

        // Swap all a's and b's in the grid.
        for (let row = 0; row < this._SIZE; row++) {
            for (let col = 0; col < this._SIZE; col++) {
                if (this.grid[row][col] == a) {
                    this.grid[row][col] = b;
                } else if (this.grid[row][col] == b) {
                    this.grid[row][col] = a;
                }
            }
        }
    }

    /**
     * TRANSFORMATION #2:
     * 
     * Choose random 2 bands (rows of boxes) and swap them.
     */
    bandPermutation() {
        let numBands = Math.sqrt(this._NUM_BOXES);
        // Choose a random band
        let band1 = Math.floor((Math.random() * numBands) + 1);
        // Choose different random band
        let band2 = Math.floor((Math.random() * numBands) + 1);

        while (band2 == band1) {
            band2 = Math.floor((Math.random() * numBands) + 1);            
        }

        // row1 and row2 are the row indices of the top-left cells of band1 and band2.
        let row1 = (band1 - 1) * this._BOX_SIZE,
            row2 = (band2 - 1) * this._BOX_SIZE;

        for (let row = 0; row < this._BOX_SIZE; row++) {
            for (let col = 0; col < this._SIZE; col++) {
                let temp = this.grid[row + row1][col];
                this.grid[row + row1][col] = this.grid[row + row2][col];
                this.grid[row + row2][col] = temp;
            }
        }
    }

    /**
     * TRANSFORMATION #3:
     * 
     * Row permutations - shuffle the rows within a band.
     */
    rowPermutation() {
        let numBands = Math.sqrt(this._NUM_BOXES);
        // Choose a random band
        let band = Math.floor((Math.random() * numBands) + 1);
        // The row index of the top-left cell of the band.
        let firstRow = (band - 1) * this._BOX_SIZE;
        // Collection of all rows in the band.
        let rowsInBand = [];

        // Push all rows within the band in an array.
        for (let row = firstRow; row < firstRow + this._BOX_SIZE; row++) {
            rowsInBand.push(this.grid[row]);
        }

        // Shuffle the array of rows within the band.
        for (let i = rowsInBand.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rowsInBand[i], rowsInBand[j]] = [rowsInBand[j], rowsInBand[i]];
        }

        // Replace the rows in the sudoku grid with the shuffled rows.
        for (let row = firstRow; row < firstRow + this._BOX_SIZE; row++) {
            this.grid[row] = rowsInBand[row - firstRow];
        }
    }

    /**
     * TRANSFORMATION #4:
     * 
     * Choose 2 random stacks (vertically aligned boxes) and swap them.
     */
    stackPermutation() {
        let numStacks = Math.sqrt(this._NUM_BOXES);
        // Choose a random stack
        let stack1 = Math.floor((Math.random() * numStacks) + 1);
        // Choose different random band
        let stack2 = Math.floor((Math.random() * numStacks) + 1);

        while (stack1 == stack2) {
            stack2 = Math.floor((Math.random() * numStacks) + 1);            
        }

        // col1 and col2 are the col indices of the top-left cells of stack1 and stack2.
        let col1 = (stack1 - 1) * this._BOX_SIZE,
            col2 = (stack2 - 1) * this._BOX_SIZE;

        for (let col = 0; col < this._BOX_SIZE; col++) {
            for (let row = 0; row < this._SIZE; row++) {
                let temp = this.grid[row][col + col1];
                this.grid[row][col + col1] = this.grid[row][col + col2];
                this.grid[row][col + col2] = temp;
            }
        }
    }

    /**
     * TRANSFORMATION #5:
     * 
     * Column permutations - shuffle the columns within a random stack.
     */
    colPermutation() {
        let numStacks = Math.sqrt(this._NUM_BOXES);
        // Choose a random stack
        let stack = Math.floor((Math.random() * numStacks) + 1);
        // The col index of the top-left cell of the stack.
        let firstCol = (stack - 1) * this._BOX_SIZE;
        // Collection of all columns in the stack.
        let colsInStack = [];

        // Push all columns within the stack in an array.
        for (let col = firstCol; col < firstCol + this._BOX_SIZE; col++) {
            let colArr = [];
            for (let row = 0; row < this._SIZE; row++) {
                colArr.push(this.grid[row][col]);
            }
            colsInStack.push(colArr);
        }

        // Shuffle the array of columns within the stack.
        for (let i = colsInStack.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [colsInStack[i], colsInStack[j]] = [colsInStack[j], colsInStack[i]];
        }

        // Replace the columns in the sudoku grid with the shuffled columns.
        for (let col = firstCol; col < firstCol + this._BOX_SIZE; col++) {
            for (let row = 0; row < this._SIZE; row++) {
                this.grid[row][col] = colsInStack[col - firstCol][row];
            }
        }
    }

    /**
     * TRANSFORMATION #6:
     * 
     * Reflection (flip the grid accross a line of symmetry - horizontally, vertically or diagonally).
     */
    reflection() {
        let rnd = Math.round(Math.random());

        if (rnd == 0) {
            // Flip horizontally (across the the middle column).
            this.grid = this.grid.map((row) => {
                return row.reverse();
            });
        } else {
            // Flip vertically (across the the middle row).
            this.grid = this.grid.reverse();
            return this.grid;
        }
    }

    /**
     * TRANSFORMATION #7:
     * 
     * Transposition (rows become columns and columns become rows).
     */
    transposition() {
        this.grid = this.grid[0].map((_, colIndex) => this.grid.map(row => row[colIndex]));
    }

    /**
     * TRANSFORMATION #8:
     * 
     * Rotate the grid 90 degrees to the right between 1 and 3 times.
     */
    rotation() {
        let count = Math.floor((Math.random() * 3) + 1);

        for (let i = 0; i < count; i++) {
            this.grid = this.grid[0].map((val, index) => this.grid.map(row => row[index]).reverse());
        }
    }
    
}

module.exports = Generator;