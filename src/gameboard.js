const ship = require('./ship')

const gameboardFactory = (x = 10, y = 10) => {
    const WIDTH = x;
    const HEIGHT = y;

    const SQUARE = {
        NONE: 'none',
        MISS: 'miss',
        HIT: 'hit',
    }

    let grid = new Array(x);
    for (let i = 0; i < x; i++) {
        grid[i] = new Array(y).fill(SQUARE.NONE);
    }

    let shipPositions = [];

    const placeShip = (x, y, len, dir) => {
        const newPos = {
            x,
            y,
            ship: ship(len),
            dir
        }
        const squares = _shipSquares(newPos);
        for (square of squares) {
            let [xCandidate, yCandidate] = square;
            if ( xCandidate > WIDTH - 1 || yCandidate > HEIGHT -1 || shipInSquare(xCandidate, yCandidate)) {
                return false;
            }
        }
        shipPositions.push(newPos);
        return true;
    };

    const recieveAttack = (x, y) => {
        let shipPosition = shipInSquare(x, y);
        if (shipPosition != null) {
            const pos = positionOnShip(shipPosition, x, y);
            shipPosition.ship.hit(pos);
            grid[x][y] = SQUARE.HIT;
        } else {
            grid[x][y] = SQUARE.MISS;
        }
    };

    const squareStatus = (x, y) => {
        return grid[x][y];
    };

    const getDimensions = () => {
        return [x, y];
    }

    function shipInSquare(x, y) {
        for (const shipPosition of shipPositions) {
            if (positionOnShip(shipPosition, x, y) != null) {
                return shipPosition;
            }
        }
        return null;
    }

    function positionOnShip(ship, x, y) {
        let xStart = ship.x;
        let yStart = ship.y;
        let xStep = ship.dir[0];
        let yStep = ship.dir[1];

        for (let i = 0; i < ship.ship.length; i++) {
            let xPos = xStart + i * xStep;
            let yPos = yStart + i * yStep;
            if (xPos == x && yPos == y) {
                return i;
            }
        }
        return null;
    }

    function _shipSquares(ship) {
        let squares = [];
        let xStart = ship.x;
        let yStart = ship.y;
        let xStep = ship.dir[0];
        let yStep = ship.dir[1];

        for (let i = 0; i < ship.ship.length; i++) {
            let xPos = xStart + i * xStep;
            let yPos = yStart + i * yStep;
            squares.push([xPos, yPos]);
        }
        return squares;
    }

    function allSunk() {
        return shipPositions.every(pos => pos.ship.isSunk());
    }

    return {
        SQUARE,
        placeShip,
        recieveAttack,
        squareStatus,
        shipInSquare,
        positionOnShip,
        allSunk,
        getDimensions,
        shipPositions,
    }
}

module.exports = gameboardFactory;