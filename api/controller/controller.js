const Sudoku = require("../model/sudoku");

exports.generateGrid = (size) => {
    let sudoku = new Sudoku(size);
    sudoku.generate();
    if (sudoku.isValid()) {
        return sudoku.grid;
    } else {
        return null;
    }
}

exports.validateGrid = (grid) => {
    let sudoku = new Sudoku(grid.length);
    sudoku.grid = grid;
    return sudoku.isValid();
}

exports.createPuzzle = (grid, numberOfClues) => {
    let sudoku = new Sudoku(grid.length);
    sudoku.grid = grid;
    sudoku.createPuzzle(numberOfClues);
    if (sudoku.isValid()) {
        return sudoku.grid;
    } else {
        return null;
    }
}

exports.solvePuzzle = (grid) => {
    let sudoku = new Sudoku(grid.length);
    sudoku.grid = grid;
    return sudoku.solve();
}

exports.generateSudoku = (size, numberOfClues) => {
    let sudoku = new Sudoku(size);
    sudoku.generate();
    sudoku.createPuzzle(numberOfClues);
    if (sudoku.isValid()) {
        return sudoku.grid;
    } else {
        return null;
    }
}