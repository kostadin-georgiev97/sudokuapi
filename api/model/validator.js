class Validator {

    /**
     * A Validator object is associated with a sudoku object and its isValid() method is 
     * @param {*} sudoku 
     */
    constructor(sudoku) {
        this.sudoku = sudoku;
    }

    /**
     * Validate sudoku grid.
     */
    isValid() {
        return this.checkRows() && this.checkCols() && this.checkSquares();
    }

    /**
     * Validate all rows.
     */
    checkRows() {
        for (let row = 0; row < this.sudoku._SIZE; row++) {
            if (!this.isValidRow(row)) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Check that a row contains only valid and unique values.
     * 
     * Value of 0 is considered an empty value.
     * @param {*} row 
     */
    isValidRow(row) {
        let rowSet = new Set();
        
        for (let col = 0; col < this.sudoku._SIZE; col++) {
            let currentVal = this.sudoku.grid[row][col];

            // Check that the value is a valid number.
            if (currentVal < 0 || currentVal > this.sudoku._SIZE) {
                return false;
            }

            // Check that the value is unique (if other than 0).
            if (currentVal != 0 && rowSet.has(currentVal)) {
                return false;
            } else {
                rowSet.add(currentVal);
            }
        }

        return true;
    }

    /**
     * Validate all columns.
     */
    checkCols() {
        for (let col = 0; col < this.sudoku._SIZE; col++) {
            if (!this.isValidCol(col)) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Check that a column contains only valid and unique values.
     * 
     * Value of 0 is considered an empty value.
     * @param {*} col
     */
    isValidCol(col) {
        let colSet = new Set();
        
        for (let row = 0; row < this.sudoku._SIZE; row++) {
            let currentVal = this.sudoku.grid[row][col];

            // Check that the value is a valid number.
            if (currentVal < 0 || currentVal > this.sudoku._SIZE) {
                return false;
            }

            // Check that the value is unique (if other than 0).
            if (currentVal != 0 && colSet.has(currentVal)) {
                return false;
            } else {
                colSet.add(currentVal);
            }
        }

        return true;
    }

    /**
     * Validate all subsquares.
     */
    checkBoxes() {
        // Calculate the length / height of a subsquare.
        let boxSize = this.sudoku._SIZE / Math.sqrt(this.sudoku._NUM_BOXES);

        for (let row = 0; row < this.sudoku._SIZE; row += boxSize) {
            for (let col = 0; col < this.sudoku._SIZE; col += boxSize) {
                if (!this.isValidBox(row, col)) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Check that a subsquare contains only valid and unique values.
     * 
     * Value of 0 is considered an empty value.
     * @param {*} row - This is the row of the top-left cell of the subsquare.
     * @param {*} col - This is the column of the top-left cell of the subsquare.
     */
    isValidBox(row, col) {
        // Calculate the length / height of a subsquare.
        let boxSize = this.sudoku._SIZE / Math.sqrt(this.sudoku._NUM_BOXES);
        let boxSet = new Set();

        for (let sRow = row; sRow < row + boxSize; sRow++) {
            for (let sCol = col; sCol < col + boxSize; sCol++) {
                let currentVal = this.sudoku.grid[sRow][sCol];

                // Check that the value is a valid number.
                if (currentVal < 0 || currentVal > this.sudoku._SIZE) {
                    return false;
                }

                // Check that the value is unique (if other than 0).
                if (currentVal != 0 && boxSet.has(currentVal)) {
                    return false;
                } else {
                    boxSet.add(currentVal);
                }
            }
        }

        return true;
    }

}

module.exports = Validator;