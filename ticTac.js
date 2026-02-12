const player_x_class = 'x';
const player_0_class = 'circle';
const winning_combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement =document.getElementById('winningMessageText');
let isPlayer_0_Turn = false;

startGame();

restartButton.addEventListener('click',startGame);

function startGame() {
    isPlayer_0_Turn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(player_x_class);
        cell.classList.remove(player_0_class);
        cell.removeEventListener('click', handleCellClick);
        cell.addEventListener('click', handleCellClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show');
}

function handleCellClick(e) {
    const cell = e.target;
    const curentClass = isPlayer_0_Turn ? player_0_class : player_x_class
    placeMark(cell,curentClass)
    if(checkWin(curentClass)){
        endGame(false);
    } else if (isDraw()){
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = `It's a draw!`;
    } else {
        winningMessageTextElement.innerText = `Player with ${isPlayer_0_Turn ? "0's": "X's"} wins!`;
    }
     cellElements.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
    winningMessageElement.classList.add('show'); 
}

function isDraw() {
    return[...cellElements].every(cell => {
        return cell.classList.contains(player_x_class) || cell.classList.contains(player_0_class)
    })
}

function placeMark(cell, curentClass) {
    cell.classList.add(curentClass)
}

function swapTurns() {
    isPlayer_0_Turn =  !isPlayer_0_Turn;
}

function setBoardHoverClass() {
    boardElement.classList.remove(player_x_class);
    boardElement.classList.remove(player_0_class);
    if(isPlayer_0_Turn) {
        boardElement.classList.add(player_0_class);
    } else {
        boardElement.classList.add(player_x_class);
    }
}

function checkWin(currentClass) {
    return winning_combinations.some(combinnation => {
        return combinnation.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function restartGame () {
     board = ["", "", "", "", "", "", "", "", ""];

     square.forEach( s => {
        s.textContent ="";
        s.classList.remove("o", "x");
     });

     const msg = document.getElementById("winner-message");
     msg.style.display = none;
     msg.classList.remove("win-x", "win-o");

     document.getElementById("game").style.display = "grid";

};