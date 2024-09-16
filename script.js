
const X_CLASS = 'x';
const O_CLASS = 'o';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const popupRestartButton = document.getElementById('popupRestartButton');
const newGameButton = document.getElementById('newGameButton');
const winnerPopup = document.getElementById('winnerPopup');
const popupMessage = document.getElementById('popup-message');

// Score elements
const xScoreElement = document.getElementById('x-score');
const oScoreElement = document.getElementById('o-score');

// Scores
let xScore = 0;
let oScore = 0;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let oTurn;

startGame();

restartButton.addEventListener('click', startGame);
popupRestartButton.addEventListener('click', () => {
    winnerPopup.style.display = 'none';
    startGame();
});

newGameButton.addEventListener('click', () => {
    winnerPopup.style.display = 'none';
    startGame();
});

function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.innerText = '';  // Clear any text content in the cells
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
        updateScore(currentClass);  // Update score when there's a winner
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        popupMessage.innerText = "It's a Draw!";
    } else {
        popupMessage.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    winnerPopup.style.display = 'flex';
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.innerText === 'X' || cell.innerText === 'O';  // Check if all cells are filled
    });
}

function placeMark(cell, currentClass) {
    cell.innerText = currentClass === X_CLASS ? 'X' : 'O';  // Place 'X' or 'O' as inner text
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].innerText === (currentClass === X_CLASS ? 'X' : 'O');
        });
    });
}

function updateScore(winnerClass) {
    if (winnerClass === X_CLASS) {
        xScore++;
        xScoreElement.innerText = xScore;  // Update the X score on the screen
    } else if (winnerClass === O_CLASS) {
        oScore++;
        oScoreElement.innerText = oScore;  // Update the O score on the screen
    }
}