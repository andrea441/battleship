import { Ship } from '../src/ship.js';

test('ship has the specified length', () => {
  const ship = new Ship(3);

  expect(ship.length).toBe(3);
});

test('ship doesnt sink if you dont land enough hits', () => {
  const ship = new Ship(4);

  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(false);
});

test('ship sinks if you land the necessary number of hits', () => {
  const ship = new Ship(4);

  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});
