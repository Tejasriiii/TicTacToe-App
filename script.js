const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const newGameBtn = document.getElementById("new-game");

let currentPlayer = "X";
let gameActive = true;
let cells = ["", "", "", "", "", "", "", "", ""];

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    cellElement.textContent = cell;
    board.appendChild(cellElement);
  });
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }

  return cells.includes("") ? null : "Draw";
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  renderBoard();

  const winner = checkWinner();
  if (winner) {
    gameActive = false;
    if (winner === "Draw") {
      status.textContent = "It's a Draw!";
      showModal("It's a Draw!");
    } else {
      status.textContent = `Player ${winner} Wins!`;
      showModal(`🎉 Player ${winner} Wins!`);
    }
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  status.textContent = "Player X's turn";
  renderBoard();
}

function showModal(message) {
  modalMessage.textContent = message;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  resetGame();
}

board.addEventListener("click", handleClick);
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", closeModal);

renderBoard();
