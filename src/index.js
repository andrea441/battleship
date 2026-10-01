import './styles.css';
import { Game } from './game.js';
import { Player } from './player.js';

// Vamos a hacer que jale el start game
const startButton = document.getElementById('start-game');
const startPanel = document.getElementById('start-panel');
const boardsPanel = document.getElementById('boards-panel');
const playerBoard = document.getElementById('player-board');

startButton.addEventListener('click', () => {
  startPanel.classList.add('hidden');
  boardsPanel.classList.remove('hidden');
});

// Vamos a crear a los jugadores
const user = new Player('real');
const computer = new Player('computer');

const userBoard = user.board;

userBoard.placeShip(3, [0, 3], false);
userBoard.placeShip(3, [5, 3], true);

userBoard.receiveAttack([0, 3]);
userBoard.receiveAttack([0, 2]);

// Vamos a generar las grids de los tableros
const userBoardEl = document.querySelector('#player-board');
const enemyBoardEl = document.querySelector('#enemy-board');

for (let i = 0; i < 100; i++) {
  const x = Math.trunc(i / 10);
  const y = i % 10;

  const cellStatus = userBoard.board[x][y];

  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.row = x;
  cell.dataset.column = y;

  if (cellStatus.ship && cellStatus.hit) cell.classList.add('hit');
  else if (cellStatus.ship) cell.classList.add('ship');
  else if (cellStatus.hit) cell.classList.add('missed');

  userBoardEl.appendChild(cell);
}

for (let i = 0; i < 100; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');

  enemyBoardEl.appendChild(cell);
}
