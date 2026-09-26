import { Gameboard } from './gameboard.js';
class Player {
  constructor(type) {
    if (type !== 'real' && type != 'computer') {
      throw new Error('Invalid player type.');
    }

    this.type = type;
    this.board = new Gameboard();
  }
}

export { Player };
