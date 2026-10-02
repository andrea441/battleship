import './styles.css';
import { Game } from './game.js';
import { generateBoard, renderBoard } from './DOM.js';

const game = new Game();

// Vamos a hacer que jale el start game
const startButton = document.getElementById('start-game');
const startPanel = document.getElementById('start-panel');
const boardsPanel = document.getElementById('boards-panel');
const playerBoard = document.getElementById('player-board');
const verticalButton = document.getElementById('vertical');
const horizontalButton = document.getElementById('horizontal');

startButton.addEventListener('click', () => {
  startPanel.classList.add('hidden');
  boardsPanel.classList.remove('hidden');

  generateBoard('user');
  generateBoard('computer');

  game.startGame();
});

verticalButton.addEventListener('click', () => {
  game.isVertical = true;

  verticalButton.classList.add('selected');
  horizontalButton.classList.remove('selected');
});

horizontalButton.addEventListener('click', () => {
  game.isVertical = false;

  horizontalButton.classList.add('selected');
  verticalButton.classList.remove('selected');
});

playerBoard.addEventListener('click', (event) => {
  if (!event.target.classList.contains('cell')) return;

  const row = Number(event.target.dataset.row);
  const column = Number(event.target.dataset.column);

  game.placePlayerShip([row, column]);
  renderBoard('user', game.user.board);
});
