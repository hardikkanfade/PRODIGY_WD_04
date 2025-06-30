const board = document.getElementById('board');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let gameState = Array(9).fill("");
let gameActive = true;

function createBoard() {
  board.innerHTML = '';
  gameState.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.setAttribute('data-index', index);
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', handleCellClick);
    board.appendChild(cellDiv);
  });
}

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (!gameState[index] && gameActive) {
    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWinner()) {
      statusText.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (!gameState.includes("")) {
      statusText.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  return winCombos.some(combo => 
    combo.every(index => gameState[index] === currentPlayer)
  );
}

function resetGame() {
  gameState = Array(9).fill("");
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

createBoard();
