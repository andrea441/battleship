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
    // Revisar que las coordenadas estén dentro del rango + Revisar que ningún espacio esté ocupado
    const positions = this.#getShipCoords(length, coordinates, isVertical);
    const isValid = positions.every((position) =>
      this.#checkValidity(position)
    );

    if (!isValid) throw new Error('Invalid coordinates');

    // Ya todo es válido, generar un barco de longitud y meterlo en todas las positions generadas
    const ship = new Ship(length);
    positions.forEach(([x, y]) => (this.board[x][y].ship = ship));
  }

  receiveAttack() {}

  allShipSunk() {}

  #checkValidity([x, y]) {
    if (x < 0 || x > 9 || y < 0 || y > 9) return false;
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
