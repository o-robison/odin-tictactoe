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

    const placeMark = (row, col, token) => {
        board[row][col] = token;
    };

    const displayBoard = () => {
        console.log(board);
    };

    return { getBoard, placeMark, displayBoard };
}

function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = gameBoard();
    const players = [
        {
            name: playerOneName,
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ];
    
    let activePlayer = players[0];
    const switchActivePlayer = () => {
        if (activePlayer===players[0]) activePlayer = players[1];
        else activePlayer = players[0];
    };
    const getActivePlayer = () => activePlayer;

    const displayNewRound = () => {
        board.displayBoard();
        console.log(`${getActivePlayer().name}'s turn.'`);
    };

    const playRound = (row, col) => {
        console.log(`Marking row ${row} column ${col} with an ${getActivePlayer().token}`);
        board.placeMark(row, col, getActivePlayer().token);
        switchActivePlayer();
        displayNewRound();
    };

    return {
        playRound
    };
}

const game = gameController();