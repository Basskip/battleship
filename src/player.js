const playerFactory = () => {
    let myBoard, enemy;

    function setBoard(board) {
        myBoard = board;
    }

    function setEnemy(board) {
        enemy = board;
    }

    function getBoard() {
        return myBoard;
    }

    function getEnemy() {
        return enemy;
    }

    function attack(x, y) {
        enemy.recieveAttack(x, y);
    }

    function nextAttack() {
        let attacks = validAttacks(enemy);
        return attacks[Math.floor(Math.random() * attacks.length)];
    }

    function validAttacks(grid) {
        let validAttacks = [];
        const [width, height] = grid.getDimensions();
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if (grid.squareStatus(x, y) == grid.SQUARE.NONE) {
                    validAttacks.push([x, y]);
                }
            }
        }
        return validAttacks;
    }

    function setupBoard() {
        let shipLengths = [5, 4, 3, 3, 2];
        let shipDirs = [[1, 0], [0, 1]]
        let [width, height] = myBoard.getDimensions();

        let toPlace, placed;
        while (shipLengths.length > 0) {
            toPlace = shipLengths.pop();
            placed = false;
            while (!placed) {
                placed = myBoard.placeShip(randomInt(width), randomInt(height), toPlace, shipDirs[randomInt(shipDirs.length)]);
            }
            
        }
    }


    return {
        attack,
        setBoard,
        setEnemy,
        nextAttack,
        validAttacks,
        getBoard,
        getEnemy,
        setupBoard,
    }
}

function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = playerFactory;