const board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
let currentPlayer = 1;
let gameEnd = false;
let scores = {
  one: 0,
  two: 0,
  draws: 0
}; // [draws, player1, player2]
const cells = document.querySelectorAll('td');

function checkWin() {
  // check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
      return true;
    }
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
      return true;
    }
  }

  // check diagonals
  if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
    return true;
  }
  if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
    return true;
  }

  return false;
}

function checkDraw() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

function resetGame() {
  board.forEach((row) => row.fill(0));
  currentPlayer = 1;
  gameEnd = false;
  cells.forEach((cell) => (cell.textContent = ''));
  document.querySelector('#message').textContent = '';
}

function handleCellClick(event) {
  if (gameEnd) return;
  const cell = event.target;
  const row = cell.parentNode.rowIndex;
  const col = cell.cellIndex;
  if (board[row][col] !== 0) {
    return;
  }
  board[row][col] = currentPlayer;
  cell.textContent = currentPlayer === 1 ? 'X' : 'O';

  cell.classList.remove(`player-1`);
  cell.classList.remove(`player-2`);
  cell.classList.add(`player-${currentPlayer}`);

  if (checkWin()) {
    document.querySelector('#message').textContent = `Player ${currentPlayer} wins!`;
    updateScore(currentPlayer, 1);
    gameEnd = true;
  } else if (checkDraw()) {
    document.querySelector('#message').textContent = 'Game is a draw!';
    updateScore(-1, 1);
    gameEnd = true;
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }
  console.log(`p1: ${scores[0]} p2: ${scores[1]}`);

}
/**
 * 
 * @param {number} player 
 * @param {number} points 
 */
function updateScore(player, points) {
  if (player > scores.length) return console.error("Player number out of bounds");

  if (player == 0) {
    scores.one += points;
  } else
    if (player == 1) {
      scores.two += points;
    } else
      if (player == -1) {
        scores.draws += points;
      }

  document.getElementById("score-one").textContent = `Player 1: ${scores.one}`;
  document.getElementById("score-two").textContent = `Player 2: ${scores.two}`;
  document.getElementById("score-draws").textContent = `Draws: ${scores.draws}`;

}

cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
document.querySelector('#reset-button').addEventListener('click', resetGame);