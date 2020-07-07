# sudokuapi
The system's purpose is to generate, validate and solve Sudoku grids and puzzles. The sudoku API follows conventional HTTP response codes to indicate the success or failure of an API request.

## API Endpoints and Requests Structure
| Request type | URI                                                  | Description                              | Path Parameters | Body Parameters                         |
| ------------ | ---------------------------------------------------- | ---------------------------------------- | --------------- | --------------------------------------- |
| GET          | `https://sudokuapi.herokuapp.com/generateGrid/:size` | Generate a random sudoku grid.           | size: number    |                                         |
| POST         | `https://sudokuapi.herokuapp.com/validateGrid`       | Validate a sudoku grid.                  |                 | grid: number[][]                        |
| POST         | `https://sudokuapi.herokuapp.com/createPuzzle`       | Create a sudoku puzzle from sudoku grid. |                 | numberOfClues: number, grid: number[][] |
| POST         | `https://sudokuapi.herokuapp.com/solvePuzzle`        | Solve a sudoku puzzle.                   |                 | grid: number[][]                        |
| POST         | `https://sudokuapi.herokuapp.com/generateSudoku`     | Generate a new sudoku puzzle.            |                 | size: number, numberOfClues: number     |