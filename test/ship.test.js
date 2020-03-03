const shipFactory = require('../src/ship');

test('shipfactory returns an object', () => {
    expect(shipFactory()).toBeTruthy();
})

test('ships have a length', () => {
    let ship = shipFactory(3);
    expect(ship).toHaveProperty('length');
})

test('ships have the correct length', () => {
    let ship = shipFactory(2);
    expect(ship.length).toBe(2);
})

test('ships should be hittable', () => {
    let ship = shipFactory();
    expect(ship).toHaveProperty('hit');
})

test('ships should start unsunk', () => {
    let ship = shipFactory();
    expect(ship.isSunk()).toBe(false);
})

test('ships should be sinkable', () => {
    let ship = shipFactory();
    ship.hit(0);
    expect(ship.isSunk()).toBe(true);
})

test('a 3 length ship should only be sunk after the 3rd hit', () => {
    let ship = shipFactory(3);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toBe(false);
    ship.hit(2);
    expect(ship.isSunk()).toBe(true);
})