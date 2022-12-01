let gameboard = document.querySelector(".thegameboard");
let switchPlayer = document.querySelector(".messagesection");
let turn = 1;
let win = -1;

const matrix = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
];

gameboard.addEventListener("click", playAction);

function playAction(event, row, col) {
    if (event.target.innerHTML != "")
        return;
    if (win != -1)
        return;

    matrix[row, col] = turn;


    if (turn % 2 === 1) {
        event.target.innerHTML = "X";
        switchPlayer.innerHTML = "It is Player 2's turn";
        turn = 2;
    } else {
        event.target.innerHTML = "O";
        switchPlayer.innerHTML = "It is Player 1's turn"
        turn = 1;
    }


    for (let i = 0; i < 3; i++) {
        /* this is to check the row winner*/
        if (matrix[i][0] == matrix[i][1] && matrix[i][1] == matrix[i][2])
            win = matrix[i][0];

        /* this is to check the column winner*/
        if (matrix[0][i] == matrix[1][i] && matrix[1][i] == matrix[2][i])
            win = matrix[0][i];
    }
    /*this is to check diagonal winner*/
    if (matrix[00] == matrix[11] == matrix[22])
        win = matrix[11];
    if (matrix[02] == matrix[11] == matrix[20])
        win = matrix[11];

    if (win != -1) {
        switchPlayer.innerHTML = "Player " + turn + "has won the game";
    }
}



/*endgame();


function endgame() {
    if (win != -1) {
        return switchPlayer.innerHTML = "Player " + turn + "has won the game";
    }
}*/
