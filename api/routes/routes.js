var express = require('express');
var router = express.Router();
const controller = require("../controller/controller");

// Generate a random sudoku grid.
router.get('/generateGrid/:size', (req, res) => {
    let size = JSON.parse(req.params.size);
    res.status(200).json({
        "grid": controller.generateGrid(size)
    });
});

// Validate a sudoku grid.
router.post('/validateGrid', (req, res) => {
    let grid = JSON.parse(req.body.grid);
    res.status(200).json({
        "isValid": controller.validateGrid(grid)
    });
});

// Create a sudoku puzzle from sudoku grid.
router.post('/createPuzzle', (req, res) => {
    let numberOfClues = JSON.parse(req.body.numberOfClues);
    let grid = JSON.parse(req.body.grid);
    res.status(200).json({
        "grid": controller.createPuzzle(grid, numberOfClues)
    });
});

// Solve a sudoku puzzle.
router.post('/solvePuzzle', (req, res) => {
    let grid = JSON.parse(req.body.grid);
    
    res.status(200).json({
        "solutions": controller.solvePuzzle(grid)
    });
});

// Generate a new sudoku puzzle.
router.post('/generateSudoku', (req, res) => {
    let size = JSON.parse(req.body.size);
    let numberOfClues = JSON.parse(req.body.numberOfClues);
    res.status(200).json({
        "grid": controller.generateSudoku(size, numberOfClues)
    });
});

module.exports = router;