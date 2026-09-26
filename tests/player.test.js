import { Player } from '../src/player.js';

test('player type assigns correctly', () => {
  const real = new Player('real');
  const computer = new Player('computer');

  expect(real.type).toBe('real');
  expect(computer.type).toBe('computer');
});

test('assigning a type other than real or computer throws error', () => {
  expect(() => new Player('hi')).toThrow();
});

test('different players have different boards', () => {
  const real = new Player('real');
  const computer = new Player('computer');

  expect(computer.board === real.board).toBe(false);
});
