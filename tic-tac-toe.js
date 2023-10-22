let BOARD = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
]

/**
 * When this variable is of modulo 2 it means that is the X turn.
 * If it is not then vice-versa.
 */
let CURRENT_PLAY = 0
let GAME_OVER = false

const resetBoard = () => {
    BOARD = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ]

    CURRENT_PLAY = 0
    GAME_OVER = false

    const statusDiv = document.getElementById("status")
    statusDiv.classList.remove("you-won")
    statusDiv.innerHTML = "Move your mouse over a square and click to play an X or an O."
}

window.addEventListener('load', () => {
    const divs = document.querySelectorAll("#board div")
    divs.forEach(handleBoardTile)

    const resetBtn = document.querySelector(".controls button.btn")
    resetBtn.addEventListener('click', (e) => {
        e.preventDefault();

        resetBoard()
        divs.forEach(div => {
            div.innerHTML = ""
            div.classList.remove("X", "O")
        })
    })
})

const handleBoardTile = (div, i) => {
    const classList = div.classList

    // Add styles
    classList.add("square")

    // Add logic
    div.addEventListener('click', () => {
        if (GAME_OVER)
            return

        if (classList.contains("X") || classList.contains("O"))
            return;

        if (CURRENT_PLAY % 2 == 0) {
            div.innerHTML = "X"
            classList.add("X")
            BOARD[parseInt(i / 3)][i % 3] = 0
        } else {
            div.innerHTML = "O"
            classList.add("O")
            BOARD[parseInt(i / 3)][i % 3] = 1
        }

        CURRENT_PLAY++;

        const statusDiv = document.getElementById("status");
        switch (checkWin()) {
            case 0: {
                statusDiv.innerHTML = "Congratulations! X is the winner!";
                statusDiv.classList.add("you-won");
                GAME_OVER = true
                break;
            }
            case 1: {
                statusDiv.innerHTML = "Congratulations! O is the winner!";
                statusDiv.classList.add("you-won");
                GAME_OVER = true
                break;
            }
            default: {
                break;
            }
        }
    })

    div.addEventListener('mouseover', () => {
        classList.add("hover")
    })

    div.addEventListener('mouseout', () => {
        classList.remove("hover")
    })
}

const checkWin = () => {
    // Check rows
    let consecX = 0
    let consecO = 0

    const checkTile = (tile) => {
        switch (tile) {
            case 0: {
                consecX++;
                consecO = 0;
                break;
            }
            case 1: {
                consecO++;
                consecX = 0;
                break;
            }
            default: {
                break;
            }
        }
    }

    const isWin = () => {
        if (consecX == 3)
            return 0;
        else if (consecO == 3)
            return 1;
    }

    // Check Rows
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            checkTile(BOARD[i][j])
            // Check for win to save some compute time
            let winner = isWin()
            if (winner != undefined)
                return winner
        }
    }

    consecO = 0;
    consecX = 0;

    // Check Columns
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            checkTile(BOARD[i][j])
            let winner = isWin()
            if (winner != undefined)
                return winner
        }
    }

    consecO = 0;
    consecX = 0;

    // Diagonal Checks
    for (let i = 0; i < 3; i++) {
        checkTile(BOARD[i][i])
        let winner = isWin()
        if (winner != undefined)
            return winner
    }

    consecO = 0;
    consecX = 0;

    for (let i = 0, j = 2; i < 3; i++, j--) {
        checkTile(BOARD[i][j])
        let winner = isWin()
        if (winner != undefined)
            return winner
    }

    // If there is no win
    return -1;
}

