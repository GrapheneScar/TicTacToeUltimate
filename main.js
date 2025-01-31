const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.dataset.index);

    if (gameBoard[index] !== '' || !gameActive) return;

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    checkWinner();
    togglePlayer();
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            drawWinningLine(combination);
            endGame(gameBoard[a]);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        endGame(null);
    }
}

function drawWinningLine(combination) {
    const boardRect = board.getBoundingClientRect();
    const startCell = board.children[combination[0]];
    const endCell = board.children[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const startX = startRect.left + startRect.width / 2 - boardRect.left;
    const startY = startRect.top + startRect.height / 2 - boardRect.top;
    const endX = endRect.left + endRect.width / 2 - boardRect.left;
    const endY = endRect.top + endRect.height / 2 - boardRect.top;

    const line = document.createElement('div');
    line.classList.add('winning-line');
    line.style.setProperty('--start-x', `${startX}px`);
    line.style.setProperty('--start-y', `${startY}px`);
    line.style.setProperty('--end-x', `${endX}px`);
    line.style.setProperty('--end-y', `${endY}px`);
    board.appendChild(line);
}


function endGame(winner) {
    gameActive = false;
    if (winner) {
        message.textContent = `Player ${winner} wins!`;
    } else {
        message.textContent = "It's a draw!";
    }
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = '';
    board.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'win');
    });
    const winningLine = board.querySelector('.winning-line');
    if (winningLine) {
        winningLine.remove();
    }
}

board.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', restartGame);
