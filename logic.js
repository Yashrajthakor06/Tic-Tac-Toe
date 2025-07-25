document.addEventListener('DOMContentLoaded', function() {
    const menu=document.querySelector(".menu");
const toggle=document.querySelector(".toggle");
toggle.addEventListener("click",()=>{
  menu.classList.toggle("active");
})
    const board = document.getElementById('board');
    const messageModal = document.getElementById('messageModal');
    const messageModalText = document.getElementById('messageModalText');
    const newGameBtn = document.getElementById('newGameBtn');
    const resetBtn = document.getElementById('resetBtn');
    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function renderBoard() {
        board.innerHTML = '';
        boardState.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.index = index;
            cellElement.textContent = cell;
            cellElement.addEventListener('click', handleCellClick);
            board.appendChild(cellElement);
        });
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (boardState[index] === '' && gameActive) {
            boardState[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                showWinMessage(`Player ${currentPlayer} wins!`);
                gameActive = false;
            } else if (boardState.every(cell => cell !== '')) {
                showDrawMessage('It\'s a draw!');
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateTurnMessage();
            }
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    function showWinMessage(msg) {
        messageModalText.textContent = msg;
        messageModal.style.display = 'flex';
        highlightWinningCells();
    }

    function highlightWinningCells() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        winPatterns.forEach(pattern => {
            const [a, b, c] = pattern;
            const cells = document.querySelectorAll(`.cell[data-index="${a}"], .cell[data-index="${b}"], .cell[data-index="${c}"]`);
            cells.forEach(cell => {
                cell.style.backgroundColor = '#4caf50';
                cell.style.color = '#fff';
            });
        });
    }

    function showDrawMessage(msg) {
        messageModalText.textContent = msg;
        messageModal.style.display = 'flex';
    }

    function hideMessage() {
        messageModal.style.display = 'none';
    }

    function resetGame() {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        hideMessage();
        renderBoard();
        updateTurnMessage();
    }

    function updateTurnMessage() {
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    newGameBtn.addEventListener('click', resetGame);
    resetBtn.addEventListener('click', resetGame);
    messageModal.addEventListener('click', hideMessage);
    resetGame(); // Initialize the game
});
