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

})();

const gameController = (() => {

})();