const userBoardEl = document.querySelector('#player-board');
const computerBoardEl = document.querySelector('#enemy-board');
const messagePlaceholder = document.querySelector('#game-message');

const verticalButton = document.getElementById('vertical');
const horizontalButton = document.getElementById('horizontal');

export function generateBoard(type) {
  const boardElement = type === 'user' ? userBoardEl : computerBoardEl;

  for (let i = 0; i < 100; i++) {
    const x = Math.trunc(i / 10);
    const y = i % 10;

    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = x;
    cell.dataset.column = y;

    boardElement.appendChild(cell);
  }
}

export function renderBoard(type, board) {
  const boardElement = type === 'user' ? userBoardEl : computerBoardEl;

  for (let i = 0; i < 100; i++) {
    const x = Math.trunc(i / 10);
    const y = i % 10;

    const cellStatus = board.board[x][y];

    const cell = boardElement.querySelector(
      `.cell[data-row="${x}"][data-column="${y}"]`
    );

    cell.classList.remove('hit', 'ship', 'missed');

    if (cellStatus.ship && cellStatus.hit) cell.classList.add('hit');
    else if (cellStatus.hit) cell.classList.add('missed');

    if (type === 'user') {
      if (cellStatus.ship) cell.classList.add('ship');
    }

    userBoardEl.appendChild(cell);
  }
}

export function renderMessage(message) {
  messagePlaceholder.textContent = message;
}

export function renderPositionButton(isVertical) {
  if (isVertical) {
    verticalButton.classList.add('selected');
    horizontalButton.classList.remove('selected');
  } else {
    horizontalButton.classList.add('selected');
    verticalButton.classList.remove('selected');
  }
}

export function renderShipPreview(coordinates, isValid) {
  for (const [x, y] of coordinates) {
    const cell = userBoardEl.querySelector(
      `.cell[data-row="${x}"][data-column="${y}"]`
    );

    if (!cell) return;

    if (isValid) {
      cell.classList.add('valid');
    } else {
      cell.classList.add('invalid');
    }
  }
}

export function clearShipPreview() {
  const previewCells = document.querySelectorAll('.valid, .invalid');

  previewCells.forEach((cell) => {
    cell.classList.remove('valid', 'invalid');
  });
}
