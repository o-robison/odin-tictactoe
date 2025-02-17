function gameBoard() {
    const rows = 3;
    const cols = 3;
    const board = [];

    for(var i=0; i<rows; i++){
        board[i] = [];
        for(var j=0; j<cols; j++) {
            board[i][j] = null;
        }
    }
    
    const getBoard = () => board;

    const placeMark = (row, col, player) {
        board[row][col] = player;
    };

    const displayBoard = () {
        console.log(board);
    };

    return { getBoard, placeMark, displayBoard };
}

function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = gameBoard();
}