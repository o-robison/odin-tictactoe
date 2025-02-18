function GameBoard() {
    const rows = 3;
    const cols = 3;
    const board = [];

    for(let i=0; i<rows; i++){
        board[i] = [];
        for(let j=0; j<cols; j++) {
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

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = GameBoard();
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

    const checkSet = (array) => {
        let set = new Set(array);
        if(set.size===1) {
            if(!set.has(undefined)) return true;
        }
        return false;
    };

    const checkRows = (matrix) => {
        for (let row of matrix) {
            if(checkSet(row)) return true;
        }
        return false;
    };

    const checkDiags = (matrix) => {
        let vals = [];
        for (let i=0; i<3; i++) {
            vals.push(matrix[i][i]);
        }
        if(checkSet(vals)) return true;

        vals = [];
        for (let i=0; i<3; i++) {
            for (let j=2; j>-1; j--) {
                vals.push(matrix[i][j]);
            }
        }
        if(checkSet(vals)) return true;

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
        if(checkDiags(board.getBoard())) return true;
        return false;
    };

    const playRound = (row, col) => {
        console.log(`Marking row ${row} column ${col} with an ${getActivePlayer().token}`);
        if (!board.placeMark(row, col, getActivePlayer().token)){
            console.log("Space occupied, try again");
        } else {
            if(checkWinner()) {
                return true;
            }
            switchActivePlayer();
            displayNewRound();
        }
        return false;
    };

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

(function ScreenController() {
    let game = undefined;
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");
    let isWinner = false;
    const modal = document.querySelector("dialog");
    modal.showModal();

    const startButton = document.querySelector("#startGame");

    const updateScreen = (someoneWon = false) => {
        boardDiv.innerHTML = "";
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        if(isWinner) playerTurnDiv.textContent = `${activePlayer.name} is the winner!`;
        else playerTurnDiv.textContent = `${activePlayer.name}'s turn.`

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.col = colIndex;
                cellButton.dataset.row = rowIndex;
                cellButton.textContent = cell;
                if(cell==="X") cellButton.classList.add("x");
                else if (cell==="O") cellButton.classList.add("o");
                if(!isWinner) cellButton.addEventListener("click", clickHandlerBoard);
                else cellButton.removeEventListener("click", clickHandlerBoard);
                boardDiv.appendChild(cellButton);
            });
        });
    };

    const clickHandlerBoard = (e) => {
        const selectedRow = e.target.dataset.row;
        if(!selectedRow) return;
        const selectedCol = e.target.dataset.col;

        if(game.playRound(selectedRow, selectedCol)) isWinner = true;
        updateScreen();
    };

    const clickHandlerModal = (e) => {
        e.preventDefault();
        const playerOneName = document.querySelector("#playerOneName").value;
        const playerTwoName = document.querySelector("#playerTwoName").value;
        game = GameController(playerOneName, playerTwoName);
        updateScreen();
        modal.close();
    };

    startButton.addEventListener("click", clickHandlerModal);

})();