const playerFactory = require('./player');
const gameboardFactory = require('./gameboard');



const display1 = document.getElementById('player-1');
const display2 = document.getElementById('player-2');

const displayManager = (function () {
    const status = document.querySelector("#status");

    function renderBoard(disp, board, clickHandler) {
        renderSquares(disp, board, clickHandler);
        renderShips(disp, board);
    }

    function renderSquares(disp, board, clickHandler) {
        const [width, height] = board.getDimensions();
        while (disp.firstChild) {
            disp.removeChild(disp.lastChild);
        }

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const square = document.createElement('div');
                square.classList.add('square');

                let marker = board.squareStatus(x, y);

                switch (marker) {
                    case board.SQUARE.MISS:
                        square.textContent = 'O';
                        break;

                    case board.SQUARE.HIT:
                        square.textContent = 'X';
                        break

                    default:
                        break;
                }
                square.setAttribute("style", `grid-area: ${x + 1} / ${y + 1} / span 1 / span 1`);
                square.addEventListener('click', () => {
                    clickHandler(x, y);
                })
                disp.appendChild(square);
            }
        }
    }

    function renderShips(disp, board) {
        const shipPositions = board.shipPositions;
        for (shipPos of shipPositions) {
            if (shipPos.ship.isSunk()) {
                let ship = document.createElement('div');
                ship.classList.add('ship');
                const xStart = shipPos.x;
                const yStart = shipPos.y;
                const xEnd = xStart + shipPos.ship.length * shipPos.dir[0];
                const yEnd = yStart + shipPos.ship.length * shipPos.dir[1];

                ship.setAttribute("style", `grid-area: ${xStart + 1} / ${yStart + 1} / ${xEnd + 1} / ${yEnd + 1};`);
                disp.appendChild(ship);
            }
        }
    }

    function setStatus(text) {
        status.textContent = text;
    }

    return {
        renderBoard,
        setStatus,
    }

})();



const gameManager = (function () {
    let gameOver = false;
    let p1 = playerFactory();
    let p2 = playerFactory();
    let b1 = gameboardFactory();
    let b2 = gameboardFactory();
    let activePlayerNum = 1;
    p1.setBoard(b1);
    p1.setEnemy(b2);
    p2.setBoard(b2);
    p2.setEnemy(b1);

    p1.setupBoard();
    p2.setupBoard();


    const recieveClick = (playerNum, x, y) => {
        if (playerNum != activePlayerNum && !gameOver) {
            let player = _getPlayer(activePlayerNum);
            if (player.getEnemy().squareStatus(x, y) == player.getBoard().SQUARE.NONE) {
                player.attack(x, y);
                renderBoards();
                if (p2.getBoard().allSunk()) {
                    gameOver = true;
                    displayManager.setStatus("You win!")
                } else {
                    p2.attack(...p2.nextAttack());
                    renderBoards();
                    if (p1.getBoard().allSunk()) {
                        gameOver = true;
                        displayManager.setStatus("Computer wins!");
                    }
                }
            }
        }
    }

    function renderBoards() {
        displayManager.renderBoard(display1, b1, recieveClick.bind(null, 1));
        displayManager.renderBoard(display2, b2, recieveClick.bind(null, 2));
    }

    function _swapActive() {
        activePlayerNum = activePlayerNum == 1 ? 2 : 1;
    }

    function _getPlayer(num) {
        if (num == 1) {
            return p1;
        } else {
            return p2;
        }
    }

    return {
        renderBoards,
    }

})();

gameManager.renderBoards();