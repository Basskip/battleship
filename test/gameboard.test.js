const gameboardFactory = require('../src/gameboard');

let gameboard;

beforeEach(() => {
    gameboard = gameboardFactory();
})

test('gameboard can place ships', () => {
    
    expect(gameboard).toHaveProperty('placeShip');
})

test('gameboard can recieve attack', () => {
    let gameboard = gameboardFactory(2,2);
    gameboard.placeShip(0,0,1,[0,0]);
    gameboard.recieveAttack(0,0);
    expect(gameboard.squareStatus(0,0)).toBe(gameboard.SQUARE.HIT);
    expect(gameboard.squareStatus(0,1)).toBe(gameboard.SQUARE.NONE);
    expect(gameboard.squareStatus(1,0)).toBe(gameboard.SQUARE.NONE);
    expect(gameboard.squareStatus(1,1)).toBe(gameboard.SQUARE.NONE);
})

test('position on ship', () => {
    
    expect(gameboard.positionOnShip(
        {
            x: 0,
            y: 0,
            ship: {
                length: 4
            },
            dir: [1, 0]
        }, 0, 0
    )).toBe(0);
})

test('position on ship 2', () => {
    
    expect(gameboard.positionOnShip(
        {
            x: 0,
            y: 0,
            ship: {
                length: 4
            },
            dir: [1, 0]
        }, 3, 0
    )).toBe(3);
})

test('ship in square', () => {
    
    gameboard.placeShip(0,0,4,[1,0]);
    expect(gameboard.shipInSquare(0,0)).toBeTruthy();
})

test('all ships sunk', () => {
    
    gameboard.placeShip(0,0,1,[0,0]);
    gameboard.recieveAttack(0,0);
    expect(gameboard.allSunk()).toBe(true);
})

test('allSunk returns false when some ships still OK', () => {
    
    gameboard.placeShip(0,0,1,[0,0]);
    gameboard.recieveAttack(0,1);
    expect(gameboard.allSunk()).toBe(false);
})

test('2 ships all sunk', () => {
    
    gameboard.placeShip(0,0,1,[0,0]);
    gameboard.placeShip(1,1,1,[0,0]);
    gameboard.recieveAttack(0,0);
    expect(gameboard.allSunk()).toBe(false);
    gameboard.recieveAttack(1,1);
    expect(gameboard.allSunk()).toBe(true);
})

test('gameboard rejects overlapping placements', () => {
    expect(gameboard.placeShip(0,0,1,[0,0])).toBe(true);
    expect(gameboard.placeShip(0,0,1,[0,0])).toBe(false);
})

test('gameboard rejects overlapping placements 2', () => {
    expect(gameboard.placeShip(0,0,3,[1,0])).toBe(true);
    expect(gameboard.placeShip(2,2,3,[0,-1])).toBe(false);
})