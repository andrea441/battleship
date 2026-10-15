import './styles.css';
import { Game } from './game.js';
import * as DOM from './DOM.js';

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

  DOM.generateBoard('user');
  DOM.generateBoard('computer');

  game.startGame();

  DOM.renderMessage(game.message);
  DOM.renderPositionButton(game.isVertical);
});

verticalButton.addEventListener('click', () => {
  game.isVertical = true;

  DOM.renderPositionButton(game.isVertical);
});

horizontalButton.addEventListener('click', () => {
  game.isVertical = false;

  DOM.renderPositionButton(game.isVertical);
});

playerBoard.addEventListener('click', (event) => {
  if (!event.target.classList.contains('cell')) return;

  const row = Number(event.target.dataset.row);
  const column = Number(event.target.dataset.column);

  game.placePlayerShip([row, column]);
  DOM.renderBoard('user', game.user.board);
  DOM.renderMessage(game.message);
});

playerBoard.addEventListener('mouseover', (event) => {
  if (!event.target.classList.contains('cell')) return;

  if (game.phase !== 'setup') return;

  DOM.clearShipPreview();

  const row = Number(event.target.dataset.row);
  const column = Number(event.target.dataset.column);

  const placement = game.getPlayerShipPlacement([row, column]);
  DOM.renderShipPreview(placement.coordinates, placement.isValid);
});

playerBoard.addEventListener('mouseout', () => {
  DOM.clearShipPreview();
});
