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

    return {displayTurnUpdate, displayWinnerText};
})();

const gameController = (() => {

})();