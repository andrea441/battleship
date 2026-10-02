const userBoardEl = document.querySelector('#player-board');
const computerBoardEl = document.querySelector('#enemy-board');

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
    else if (cellStatus.ship) cell.classList.add('ship');
    else if (cellStatus.hit) cell.classList.add('missed');

    userBoardEl.appendChild(cell);
  }
}
