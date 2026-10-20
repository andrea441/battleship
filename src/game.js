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

    try {
      const length = this.shipsToPlace[this.shipCurrentIndex].size;

      this.user.board.placeShip(length, coordinates, this.isVertical);
      this.shipCurrentIndex++;

      if (this.shipCurrentIndex >= 5) {
        this.phase = 'player-turn';
        this.message = "It's player's turn!";
        return;
      }

      const shipName = this.shipsToPlace[this.shipCurrentIndex].name;
      this.message = `Player has to place ${shipName}.`;
    } catch (error) {
      this.message = error.message;
    }
  }

  getPlayerShipPlacement(coordinates) {
    if (this.phase !== 'setup' || this.shipCurrentIndex >= 5) return;

    const length = this.shipsToPlace[this.shipCurrentIndex].size;

    return this.user.board.getShipPlacement(
      length,
      coordinates,
      this.isVertical
    );
  }

  attackEnemyBoard(coordinates) {
    if (this.phase !== 'player-turn') return;

    this.computer.board.receiveAttack(coordinates);
    this.phase = 'computer-turn';

    // hay que jugar el turno de la computadora lol
  }

  generateRandomEnemyShips() {
    for (const ship of this.shipsToPlace) {
      while (true) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        const isVertical = Math.random() < 0.5;

        const size = ship.size;

        const placement = this.computer.board.getShipPlacement(
          size,
          [x, y],
          isVertical
        );

        if (placement.isValid) {
          this.computer.board.placeShip(size, [x, y], isVertical);
          break;
        }
      }
    }
  }

  playComputerTurn() {
    if (this.phase !== 'computer-turn') return;

    const availableCells = this.user.board.getAvailableCoords();

    const randomCoordinates =
      availableCells[Math.floor(Math.random() * availableCells.length)];

    this.user.board.receiveAttack(randomCoordinates);
    this.phase = 'player-turn';
    this.message = "Computer attacked, it's player's turn!";
  }

  startGame() {
    this.phase = 'setup';
    this.shipCurrentIndex = 0;

    this.generateRandomEnemyShips();

    const shipName = this.shipsToPlace[this.shipCurrentIndex].name;

    this.message = `Player has to place ${shipName}.`;
  }
}

export { Game };
