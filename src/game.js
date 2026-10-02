import { Player } from './player.js';

class Game {
  constructor() {
    this.user = new Player('real');
    this.computer = new Player('computer');

    this.phase = 'not-started';
    this.shipsToPlace = [
      { name: 'Carrier', size: 5 },
      { name: 'Battleship', size: 4 },
      { name: 'Destroyer', size: 3 },
      { name: 'Submarine', size: 3 },
      { name: 'Patrol Boat', size: 2 },
    ];

    this.shipCurrentIndex = 0;
    this.isVertical = false;
    this.message = null;
  }

  placePlayerShip(coordinates) {
    if (this.phase !== 'setup') return;

    const length = this.shipsToPlace[this.shipCurrentIndex].size;

    this.user.board.placeShip(length, coordinates, this.isVertical);
    this.shipCurrentIndex++;

    if (this.shipCurrentIndex === 5) this.phase = 'player-turn';
  }

  startGame() {
    this.phase = 'setup';
    this.shipCurrentIndex = 0;

    const shipName = this.shipsToPlace[this.shipCurrentIndex].name;

    this.message = `Player has to place ${shipName}`;
  }
}

export { Game };
