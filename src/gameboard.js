import { Ship } from './ship.js';

class Gameboard {
  constructor() {
    const board = [];

    for (let i = 0; i < 10; i++) {
      board.push(
        Array.from({ length: 10 }, () => ({
          ship: null,
          hit: false,
        }))
      );
    }

    this.board = board;
  }

  placeShip(length, coordinates, isVertical) {
    const positions = this.#getShipCoords(length, coordinates, isVertical);
    const isValid = positions.every(
      (position) => this.#isInBounds(position) && this.#isCellEmpty(position)
    );

    if (!isValid) throw new Error('Invalid coordinates');

    const ship = new Ship(length);
    positions.forEach(([x, y]) => (this.board[x][y].ship = ship));
  }

  receiveAttack([x, y]) {
    if (!this.#isInBounds([x, y])) throw new Error('Invalid coordinates');
    if (this.board[x][y].hit) return;

    this.board[x][y].hit = true;
    if (this.board[x][y].ship) this.board[x][y].ship.hit();
  }

  allShipSunk() {}

  #isInBounds([x, y]) {
    if (x < 0 || x >= this.board.length) return false;
    if (y < 0 || y >= this.board[x].length) return false;

    return true;
  }

  #isCellEmpty([x, y]) {
    if (this.board[x][y].ship !== null) return false;

    return true;
  }

  #getShipCoords(length, [x, y], isVertical) {
    const newCoords = [];

    for (let i = 0; i < length; i++) {
      const coord = isVertical ? [x + i, y] : [x, y + i];
      newCoords.push(coord);
    }

    return newCoords;
  }
}

export { Gameboard };
