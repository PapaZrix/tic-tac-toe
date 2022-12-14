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
    // DOM elements
    const playBtn1 = document.querySelector(".two-btn");
    const playBtn2 = document.querySelector(".ai-btn");
    const gameBoard1 = document.querySelector(".game-board");
    const gameBoard2 = document.querySelector(".game-board-ai");
    const gameMessage = document.querySelector(".game-message");
    const restartBtn = document.querySelector(".restart-button");
    const backBtn = document.querySelector(".back");
    const playGameDiv = document.querySelector(".play-game");
    const twoPlayerCells = document.querySelectorAll(".board-cell");
    const boardCellsAi = document.querySelectorAll(".board-cell-ai");

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

    // Add signs to DOM board
    twoPlayerCells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            if (gameController.getIsOver() || e.target.innerHTML) return;
            gameController.play(parseInt(e.target.dataset.index));
            renderGameBoard();
        })
    })

    // Start Player vs AI mode
    playBtn2.addEventListener("click", (e) => {
        setGameDisplayWithAi();
        if (gameController.getIsOver()) return;
        gameController.playAi();
        renderAiGameBoard();
    })

    restartBtn.addEventListener("click", (e) => {
        gameBoard.resetBoard();
        gameController.resetGame();
        renderGameBoard();
        renderAiGameBoard();
        displayTurnUpdate("Player X turn");
    })

    backBtn.addEventListener("click", (e) => {
        gameBoard1.style.display = "none";
        gameBoard2.style.display = "none";
        gameMessage.style.display = "none";
        restartBtn.style.display = "none";
        backBtn.style.display = "none";
        playGameDiv.style.display = "flex";
        gameBoard.resetBoard();
        gameController.resetGame();
        renderGameBoard();
        renderAiGameBoard();
        displayTurnUpdate("Player X turn");
    })


    return {displayTurnUpdate, displayWinnerText};
})();

const gameController = (() => {
    const boardCellsAi = document.querySelectorAll(".board-cell-ai");
    const aiCells = [...boardCellsAi];
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

    // Player vs Player code
    const play = (boardIndex) => {
        gameBoard.addSign(boardIndex, currentPlayer());
        if (checkWinnner()) {
            displayController.displayWinnerText(`Player ${currentPlayer()} wins!`);
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

    // Player vs AI code

    // Get all remaining empty board cells
    const getEmptyCells = () => {
        return aiCells.filter((cell) => cell.innerHTML === "");
    }

    const generateRandomMove = (min, max) => Math.floor(Math.random() * (max - min) + min);

    const playAi = () => {
        aiCells.forEach((cell) => {
            cell.addEventListener("click", () => {
                if (currentPlayer() === "X" && cell.innerHTML === "" && getIsOver() === false) {
                    cell.innerHTML = currentPlayer();
                    turn++;
                    if (currentPlayer() === "O" && getEmptyCells().length > 0 && getIsOver() === false) {
                        if (checkWinnnerX()) {
                            isOver = true;
                            displayController.displayTurnUpdate("Player X wins!");
                            return;
                        }
                        getEmptyCells()[generateRandomMove(0, getEmptyCells().length)].innerHTML = currentPlayer();
                        turn++;
                    }
                }
                if (checkWinnnerX()) {
                    isOver = true;
                    displayController.displayTurnUpdate("Player X wins!");
                    return;
                }
                if (checkWinnnerO()) {
                    isOver = true;
                    displayController.displayTurnUpdate("Player O wins!");
                    return;
                }
                if (isTie()) {
                    displayController.displayTurnUpdate("It's a tie!");
                } 
            })
        })
    }
    
    const checkWinnnerX = () => {
        return winConditions.some((condition) => {
            return condition.every((index) => {
                return aiCells[index].innerHTML === "X";
            })
        })
    }

    const checkWinnnerO = () => {
        return winConditions.some((condition) => {
            return condition.every((index) => {
                return aiCells[index].innerHTML === "O";
            })
        })
    }

    const isTie = () => {
        return aiCells.every((cell) => {
            return cell.innerHTML === "X" || cell.innerHTML === "O";
        })
    }

    // Utility functions 
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

    return {play, getIsOver, resetGame, playAi}
})();