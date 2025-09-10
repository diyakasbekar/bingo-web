const board1 = document.getElementById("board1");
const board2 = document.getElementById("board2");
const drawBtn = document.getElementById("draw-btn");
const drawnDisplay = document.getElementById("drawn-number");
const popup = document.getElementById("winner-popup");

const size = 5;
let drawnNumbers = [];
let remainingNumbers = Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

// Generate boards
function createBoard(board) {
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = numbers[i];
    cell.dataset.number = numbers[i];
    board.appendChild(cell);
  }
}

createBoard(board1);
createBoard(board2);

// Handle number draw
drawBtn.addEventListener("click", () => {
  if (remainingNumbers.length === 0) return;

  const drawn = remainingNumbers.pop();
  drawnDisplay.textContent = drawn;
  drawnNumbers.push(drawn);

  markBoards(drawn);
});

function markBoards(number) {
  document.querySelectorAll(`#board1 .cell, #board2 .cell`).forEach(cell => {
    if (parseInt(cell.dataset.number) === number) {
      cell.classList.add("marked");
    }
  });

  // Check win for each player
  if (checkWin(board1)) {
    showWinner("Player 1");
  } else if (checkWin(board2)) {
    showWinner("Player 2");
  }
}

function checkWin(board) {
  const cells = Array.from(board.children);
  let matrix = [];

  for (let i = 0; i < size; i++) {
    matrix.push(cells.slice(i * size, (i + 1) * size));
  }

  for (let i = 0; i < size; i++) {
    if (matrix[i].every(cell => cell.classList.contains("marked"))) return true; // row
    if (matrix.every(row => row[i].classList.contains("marked"))) return true;   // column
  }

  if (matrix.every((row, i) => row[i].classList.contains("marked"))) return true;             // diagonal \
  if (matrix.every((row, i) => row[size - 1 - i].classList.contains("marked"))) return true;  // diagonal /

  return false;
}

function showWinner(player) {
  popup.textContent = `🎉Congrats! ${player} is the winner!`;
  popup.style.display = "block";
  drawBtn.disabled = true;

  setTimeout(() => {
    popup.style.display = "none";
    location.reload();
  }, 5000);
}
