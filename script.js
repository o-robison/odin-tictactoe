function gameBoard() {
    const rows = 3;
    const cols = 3;
    const board = [];

    for(var i=0; i<rows; i++){
        board[i] = [];
        for(var j=0; j<cols; j++) {
            board[i][j] = undefined;
        }
    }
    
    const getBoard = () => board;

    const placeMark = (row, col, token) => {
        if(board[row][col]===undefined){
            board[row][col] = token;
            return true;
        }
        else return false;
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
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const checkRows = (matrix) => {
        for (let row of matrix) {
            var set = new Set(row);
            if(set.size===1) {
                if(!set.has(undefined)) return true;
            }
        }
        return false;
    };

    const transposeMatrix = (matrix) => {
        //stackoverflow snippet, Fawad Ghafoor
        return matrix[0].map((col, i) => matrix.map(row => row[i]));
    };

    const checkWinner = () => {
        if(checkRows(board.getBoard())) return true;
        let transposedBoard = transposeMatrix(board.getBoard());
        if(checkRows(transposedBoard)) return true;
        //check diags
    };

    const playRound = (row, col) => {
        console.log(`Marking row ${row} column ${col} with an ${getActivePlayer().token}`);
        if (!board.placeMark(row, col, getActivePlayer().token)){
            console.log("Space occupied, try again");
        } else {
            if(checkWinner()) {
                alert(`Winner is ${getActivePlayer().name}`);
                return;
            }
            switchActivePlayer();
            displayNewRound();
        }
    };

    return {
        playRound
    };
}

const game = gameController();