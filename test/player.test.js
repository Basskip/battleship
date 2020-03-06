const playerFactory = require('../src/player');
const gameboardFactory = require('../src/gameboard');

test('player can attack', () => {
    let player = playerFactory();
    expect(player).toHaveProperty('attack');
})

test('player attacks register', () => {
    let p1 = playerFactory();
    let p2 = playerFactory();
    let b1 = gameboardFactory();
    let b2 = gameboardFactory();
    p1.setBoard(b1);
    p2.setBoard(b2);
    p1.setEnemy(b2);
    p2.setEnemy(b1);
    b1.placeShip(0,0,1,[0,0]);
    p2.attack(0,0);
    expect(b1.allSunk()).toBe(true);
})

test('computer player can make attacks', () => {
    let player = playerFactory();
    expect(player).toHaveProperty('nextAttack');    
})

test('next attack is valid', () => {
    let player = playerFactory();
    let board = gameboardFactory(2,2);

    player.setEnemy(board);
    board.recieveAttack(0,0);
    board.recieveAttack(1,0);
    board.recieveAttack(0,1);
    expect(player.nextAttack()).toStrictEqual([1,1]);
})

test('correctly identifies valid attacks', () => {
    let player = playerFactory();
    let board = gameboardFactory(2,2);

    player.setEnemy(board);

    expect(player.validAttacks(board)).toStrictEqual([[0,0],[0,1],[1,0],[1,1]]);
})