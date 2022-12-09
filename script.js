const gameBoard = (() => {
    
    const board = ["", "", "", "", "", "", "", "", ""];

    const addSign = (index, sign) => {
        board[index] = sign;
    }

    const getBoardCell = (index) => {
        return board[index];
    }

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return {addSign, getBoardCell, resetBoard};
})();

const Player = (name, sign) => {
    return {name, sign};
}

const displayController = (() => {
    // DOM
    const playBtn1 = document.querySelector(".two-btn");
    const playBtn2 = document.querySelector(".ai-btn");
    const gameBoard1 = document.querySelector(".game-board");
    const gameBoard2 = document.querySelector(".game-board-ai");
    const gameMessage = document.querySelector(".game-message");
    const restartBtn = document.querySelector(".restart-button");
    const backBtn = document.querySelector(".back");
    const playGameDiv = document.querySelector(".play-game");
    const twoPlayerCells = document.querySelectorAll(".board-cell");
    const boardCellsAi = document.querySelectorAll(".boad-cell-ai");

    // Initial display > just the mode choice
    gameBoard1.style.display = "none";
    gameBoard2.style.display = "none";
    gameMessage.style.display = "none";
    restartBtn.style.display = "none";
    backBtn.style.display = "none";

    // Set up DOM for 2 player game
    const setGameDisplayTwoPlayers = () => {
        playGameDiv.style.display = "none";
        gameMessage.style.display = "block";
        gameBoard1.style.display = "grid";
        gameBoard2.style.display = "none";
        restartBtn.style.display = "flex";
        backBtn.style.display = "flex";
    }

    // Set up DOM for player vs AI
    const setGameDisplayWithAi = () => {
        playGameDiv.style.display = "none";
        gameMessage.style.display = "block";
        gameBoard1.style.display = "none";
        gameBoard2.style.display = "grid";
        restartBtn.style.display = "flex";
        backBtn.style.display = "flex";
    }

    const renderGameBoard = () => {
        for (let i = 0; i < twoPlayerCells.length; i++) {
            twoPlayerCells[i].innerHTML = gameBoard.getBoardCell(i);
        }
    }

    const renderAiGameBoard = () => {
        for (let i = 0; i < boardCellsAi.length; i++) {
            boardCellsAi[i].innerHTML = gameBoard.getBoardCell(i);
        }
    }

    const displayWinnerText = (winner) => {
        gameMessage.textContent = winner;
    }

    const displayTurnUpdate = (message) => {
        gameMessage.textContent = message;
    }

    // Start Player vs Player mode
    playBtn1.addEventListener("click", (e) => {
        setGameDisplayTwoPlayers();
        if (gameController.getIsOver()) return;
        renderGameBoard();
    })

    // Start Player vs AI mode
    playBtn2.addEventListener("click", (e) => {
        setGameDisplayWithAi();
        if (gameController.getIsOver()) return;
        renderAiGameBoard();
    })

    return {displayTurnUpdate, displayWinnerText};
})();

const gameController = (() => {
    const playerOne = Player("playerOne", "X");
    const playerTwo = Player("playerTwo", "O");
    let isOver = false;
    let turn = 0;
    const maxTurns = 8;
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Two Player code
    const play = (boardIndex) => {
        gameBoard.addSign(boardIndex, currentPlayer());
        if (checkWinnner()) {
            displayController.displayWinnerText(`Player ${currentPlayer()} wins!}`);
            isOver = true;
            return;
        }
        if (turn == maxTurns) {
            displayController.displayWinnerText(`It's a draw!`);
            isOver  = true;
            return;
        }
        turn++;
        displayController.displayTurnUpdate(`Player ${currentPlayer()} turn`);
    }

    const checkWinnner = () => {
        return winConditions.some((condition) => {
            return condition.every((index) => {
                return gameBoard.getBoardCell(index) === currentPlayer();
            })
        })
    }

    const currentPlayer = () => {
        return turn % 2 == 0 ? playerOne.sign : playerTwo.sign;
    }

    const getIsOver = () => {
        return isOver; 
    }

    const resetGame = () => {
        turn = 0;
        isOver = false;
    }

    return {play, getIsOver, resetGame}
})();