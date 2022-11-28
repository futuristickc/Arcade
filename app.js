let gameboard = document.querySelector(".thegameboard");
let turn = 1;
let win = -1;
let switchPlayer = document.querySelector(".messagesection");

const matrix = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
];

gameboard.addEventListener("click", playAction);

function playAction(event) {
    if (event.target.innerHTML != "")
        return;
    if (win != -1)
        return;

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
        if (matrix[i][0] == matrix[i][1] == matrix[i][2])
            win = matrix[i][0];

        /* this is to check the column winner*/
        if (matrix[0][i] == matrix[1][i] == matrix[2][i])
            win = matrix[0][i];
    }
    /*this is to check diagonal winner*/
    if (matrix[0][0] == matrix[1][1] == matrix[2][2])
        win = matrix[1][1];
    if (matrix[0][2] == matrix[1][1] == matrix[2][0])
        win = matrix[1][1];

    endgame();
}

function endgame() {
    if (win != -1) {
        return switchPlayer.innerHTML = "Player " + turn + "has won the game";
    }
}

