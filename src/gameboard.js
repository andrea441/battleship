import { Ship } from './ship.js';

class Gameboard {
  constructor() {
    const board = [];

    for (let i = 0; i < 10; i++) {
      board.push(Array(10).fill(null));
    }

    this.board = board;
  }

  placeShip(length, coordinates, isVertical) {
    // Revisar que las coordenadas estén dentro del rango
    // Revisar que ningún espacio esté ocupado
  }

  receiveAttack(coordinates) {}

  allShipSunk() {}
}

export { Gameboard };
