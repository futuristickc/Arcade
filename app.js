//*********** DOM SELECTORS **************
const whosTurn = document.querySelector('.playerTurn');
const gameBoard = document.querySelectorAll('#board');
const restart = document.querySelector('.restart');


//*********** STATE **************
let state = {};
const resetState = () => {
    state.board = ["", "", "", "", "", "", "", "", ""];
    state.players = ['', ''];
};

let currentPlayer = state.player;
/*let currentPlayer = () => {
    Math.floor(Math.random() * whosTurn.length);
    whosTurn[chooseRandom].classList.toggle('selected');
}*/

//*********** GLOBAL VARIABLES **************
let gameActive = true; //not allow anymore sqaures to be clicked when game is won or draw
const winningMessage = () => `It's over, ${currentPlayer} is the Champion!`;
const drawMessage = () => `It's a draw, you guys suck!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



// whosTurn.innerHTML = currentPlayerTurn();


//*********** DOM MANIPULATORS **************
const renderBoard = () => {
    //make sure the board is clear.
    board.innerHTML = '';
    //iterate through the state.board
    for (let i = 0; i < state.board.length; i++) {
        const cell = state.board[i];
        //create elements for each cell
        const cellElements = document.createElement('div');
        //add a class to that element then adding an attribute
        cellElements.classList.add('cell');
        cellElements.setAttribute('data-cell-index', [i]);
        //just displaying text in the cell
        cellElements.innerText = cell;
        //appending(adding) the div element with class cell as a child to the main element that has the id board
        board.appendChild(cellElements);
        //console.log(i);
        //console.log('cell is: ', cell);
    };
};

const renderPlayer = () => {
    let text;
    //want to have text we can see to display current player
    //conditionally render players
    //if there are no players we want to display an input (so someone ca put thier name in)
    if (!state.players[0] || !state.players[1]) {
        text = `
        <input name="player1" placeholder="Enter Player 1" />
        <input name="player2" placeholder="Enter Player 2" />
        <button class="start">Start Game</button>
        `;
    } else {
        // if we do have players
        /*const chooseRandom = Math.floor(Math.random() * whosTurn.length);
        whosTurn[chooseRandom].classList.toggle('selected');*/
        text = currentPlayerTurn();
    }
    whosTurn.innerHTML = text;

};


//*********** HELPER FUNCTIONS **************
function takeTurns(clickedCell, clickedCellIndex) {
    state.board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function changePlayers() {
    currentPlayer = currentPlayer === state.players[0] ? state.players[1] : state.players[0];
    whosTurn.innerHTML = currentPlayerTurn();
}


//*********** GAME LOGIC win/start/restart **************
function whoWon() {
    let win = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningCombo[i];
        let a = state.board[winCondition[0]];
        let b = state.board[winCondition[1]];
        let c = state.board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            win = true;
            break
        }
    }

    if (win) {
        whosTurn.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let draw = !state.board.includes("");
    if (draw) {
        whosTurn.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    changePlayers();
}

function startGame(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    //console.log('this is state.board:', state.board);
    if (state.board[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    takeTurns(clickedCell, clickedCellIndex);
    whoWon();
}

function restartGame() {
    gameActive = true;
    const cells = document.querySelectorAll('.cell')
    currentPlayer = state.players[0];
    state.board = ["", "", "", "", "", "", "", "", ""];
    whosTurn.innerHTML = currentPlayerTurn();
    cells.forEach(cell => cell.innerHTML = "");
}


//*********** EVENT LISTENERS **************
whosTurn.addEventListener('click', (event) => {
    //console.log('this is the event from playerTurn', event.target);
    if (event.target.className === 'start') {
        //get the input of player 1
        const player1Input = document.querySelector('input[name=player1]');
        //get the value from the input
        //console.log('this is the value: ', player1Input.value);
        const player1Value = player1Input.value;
        state.players[0] = player1Value;

        // Doing the samething for player 2
        const player2Input = document.querySelector('input[name=player2]');
        //get the value from the input
        //console.log(player2Input.value);
        const player2Value = player2Input.value;
        state.players[1] = player2Value;
        //console.log('this is the value: ', player1Value);
        //console.log('this is the value: ', player2Value);

        render();
    }
});

gameBoard.forEach(cell => cell.addEventListener('click', startGame));

restart.addEventListener('click', restartGame);


//*********** Renders **************
const render = () => {
    renderBoard();
    renderPlayer();
};


//*********** BootStrapping **************
resetState();
// startGame();
render();
