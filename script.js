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

    const checkWinner = () => {
        //check rows
        for (let row of board.getBoard()) {
            var set = new Set(row);
            if(set.size===1){
                if(!set.has(undefined)) return true;
            }
        }
        //check cols
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