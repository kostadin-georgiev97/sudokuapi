class Solver {

    constructor(size, grid) {
        this._SIZE = Number.parseInt(size.toString());
        this.grid = grid;
        this.solutionsCount = 0;
        this.distinctSolutions = [];
    }

    solve() {
        for (let row = 0; row < this._SIZE; row++) {
            for (let col = 0; col < this._SIZE; col++) {
                if (this.grid[row][col] == 0) {
                    for (let n = 1; n <= this._SIZE; n++) {
                        if (this.possible(row, col, n)) {
                            this.grid[row][col] = n;
                            this.solve();
                            this.grid[row][col] = 0;
                        }
                    }
                    return;
                }
            }
        }
        let sln = [];
        this.grid.forEach(row => {
            let rowArr = [];
            row.forEach(col => {
                rowArr.push(col.toString());
            });
            sln.push(rowArr);
        });
        this.distinctSolutions.push(sln);
    }

    solveUnique() {
        if (this.solutionsCount > 1) {
            return;
        }

        for (let row = 0; row < this._SIZE; row++) {
            for (let col = 0; col < this._SIZE; col++) {
                if (this.grid[row][col] == 0) {
                    for (let n = 1; n <= this._SIZE; n++) {
                        if (this.possible(row, col, n)) {
                            this.grid[row][col] = n;
                            this.solveUnique();
                            this.grid[row][col] = 0;
                        }
                    }
                    return;
                }
            }
        }
        this.solutionsCount++;
    }

    possible(row, col, n) {
        // Check row
        for (let i = 0; i < this._SIZE; i++) {
            if (this.grid[row][i] == n) {
                return false;
            }
        }

        // Check col
        for (let i = 0; i < this._SIZE; i++) {
            if (this.grid[i][col] == n) {
                return false;
            }
        }

        // Check box
        let sqrt = Math.sqrt(this._SIZE);
        let boxRow = row - row % sqrt;
        let boxCol = col - col % sqrt;
        for (let r = boxRow; r < boxRow + sqrt; r++) {
            for (let c = boxCol; c < boxCol + sqrt; c++) {
                if (this.grid[r][c] == n) {
                    return false;
                }
            }
        }

        return true;
    }

    hasEmptyCells() {
        for (let row = 0; row < this._SIZE; row++) {
            for (let col = 0; col < this._SIZE; col++) {
                if (this.grid[row][col] == 0) {
                    return true;
                }
            }
        }
        return false;
    }

}

module.exports = Solver;