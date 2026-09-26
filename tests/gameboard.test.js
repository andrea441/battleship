import { Gameboard } from '../src/gameboard.js';

test('board dimensions are 10x10', () => {
  const gameboard = new Gameboard();

  expect(gameboard.board.length).toBe(10);

  for (let i = 0; i < 10; i++) {
    expect(gameboard.board[i].length).toBe(10);
  }
});

test('board allows placing vertical ship', () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(3, [2, 4], true);

  const placedShip = gameboard.board[2][4].ship;

  expect(gameboard.board[3][4].ship).toBe(placedShip);
  expect(gameboard.board[4][4].ship).toBe(placedShip);

  expect(gameboard.board[2][4].hit).toBe(false);
  expect(gameboard.board[3][4].hit).toBe(false);
  expect(gameboard.board[4][4].hit).toBe(false);
});

test('board allows placing horizontal ship', () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(4, [1, 2], false);

  const placedShip = gameboard.board[1][2].ship;

  expect(gameboard.board[1][3].ship).toBe(placedShip);
  expect(gameboard.board[1][4].ship).toBe(placedShip);
  expect(gameboard.board[1][5].ship).toBe(placedShip);

  expect(gameboard.board[1][2].hit).toBe(false);
  expect(gameboard.board[1][3].hit).toBe(false);
  expect(gameboard.board[1][4].hit).toBe(false);
  expect(gameboard.board[1][5].hit).toBe(false);
});

test('board doesnt allow to place a ship outside its limits', () => {
  const gameboard = new Gameboard();

  expect(gameboard.placeShip(2, [8, 1], true)).toThrow();
});

test('board can properly attack a square with boat', () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(2, [3, 4], true);

  gameboard.receiveAttack([3, 4]);

  expect(gameboard.board[3][4].hit).toBe(true);
  expect(gameboard.board[3][4].hit).toBe(true);
});

test('board can properly attack a square without boat', () => {
  const gameboard = new Gameboard();

  gameboard.receiveAttack([4, 5]);

  expect(gameboard.board[4][5].hit).toBe(true);
});

test('board with standing ships', () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(2, [1, 2], true);

  expect(gameboard.allShipSunk()).toBe(false);
});

test('board without standing ships', () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(3, [0, 4], false);

  gameboard.receiveAttack([0, 4]);
  gameboard.receiveAttack([1, 4]);
  gameboard.receiveAttack([2, 4]);

  expect(gameboard.allShipSunk()).toBe(true);
});
