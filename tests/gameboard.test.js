import { Gameboard } from '../src/gameboard.js';
import { Ship } from '../src/ship.js';

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

  expect(gameboard.board[2][4].ship).toBeInstanceOf(Ship);
  expect(gameboard.board[3][4].ship).toBeInstanceOf(Ship);
  expect(gameboard.board[4][4].ship).toBeInstanceOf(Ship);

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

  expect(gameboard.board[1][2].ship).toBeInstanceOf(Ship);
  expect(gameboard.board[1][3].ship).toBeInstanceOf(Ship);
  expect(gameboard.board[1][4].ship).toBeInstanceOf(Ship);
  expect(gameboard.board[1][5].ship).toBeInstanceOf(Ship);

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

  expect(() => gameboard.placeShip(2, [10, 1], true)).toThrow();
});

test('board can properly attack a square with ship', () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(2, [3, 4], true);

  gameboard.receiveAttack([3, 4]);

  expect(gameboard.board[3][4].hit).toBe(true);
  expect(gameboard.board[3][4].ship.hits).toBe(1);
});

test('board can properly attack a square without boat', () => {
  const gameboard = new Gameboard();

  gameboard.receiveAttack([4, 5]);

  expect(gameboard.board[4][5].hit).toBe(true);
  expect(gameboard.board[4][5].ship).toBe(null);
});

test('board can not attack and already attacked square', () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(2, [6, 1], true);

  gameboard.receiveAttack([6, 1]);
  gameboard.receiveAttack([6, 1]);

  expect(gameboard.board[6][1].ship.hits).toBe(1);
});

test('attack throws an exception if coords are invalid', () => {
  const gameboard = new Gameboard();

  expect(() => gameboard.receiveAttack([11, 10])).toThrow();
});

test('empty board ships should not be sunk', () => {
  const gameboard = new Gameboard();

  expect(gameboard.allShipSunk()).toBe(false);
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
  gameboard.receiveAttack([0, 5]);
  gameboard.receiveAttack([0, 6]);

  expect(gameboard.allShipSunk()).toBe(true);
});
