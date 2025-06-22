document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];
    let gameActive = true;

    
    function createBoard() {
        board.innerHTML = '';
        gameState.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.setAttribute('data-index', index);
            cellElement.addEventListener('click', handleCellClick);
            board.appendChild(cellElement);
        });
    }

    
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) return;

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        checkResult();
    }

    
    function checkResult() {
        let roundWon = false;

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;

            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            status.textContent = `Jogador ${currentPlayer} venceu!`;
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            status.textContent = 'Empate!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Vez do jogador: ${currentPlayer}`;
    }

    
    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `Vez do jogador: ${currentPlayer}`;
        createBoard();
    }

    resetButton.addEventListener('click', resetGame);

    
    createBoard();
});