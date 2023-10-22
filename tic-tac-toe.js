const BOARD = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
]

/**
 * When this variable is of modulo 2 it means that is the X turn.
 * If it is not then vice-versa.
 */
let CURRENT_PLAY = 0

window.addEventListener('load', () => {
    const divs = document.querySelectorAll("#board div")
    divs.forEach((div, i) => {
        const classList = div.classList

        // Add styles
        classList.add("square")

        // Add logic
        div.addEventListener('click', () => {
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

            CURRENT_PLAY++
        })

        div.addEventListener('mouseover', () => {
            classList.add("hover")
        })

        div.addEventListener('mouseout', () => {
            classList.remove("hover")
        })
    })
})

