import { Player } from './player.js';

class Game {
  constructor() {
    this.user = new Player('real');
    this.computer = new Player('computer');
    this.currentPlayer = this.player;
  }

  placeShip() {
    this.user.placeShip(3);
  }
}

export { Game };
