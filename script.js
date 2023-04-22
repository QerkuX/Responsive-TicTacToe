var score = document.getElementById("score").children
var pieces = document.getElementsByClassName("piece")
var figures = ['X', 'O']
var colors = ["#ee8695", "#4a7a96"]
var turn = 0 // X - 0 | O - 1
var move = 0
var blockMoves = false
var winPatterns = [
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [0, 1, 2]
]

function reset(){
    for (var i = 0; i < pieces.length; i++){
        pieces[i].textContent = '';
    }
    
    blockMoves = false
    turn = 0
    move = 0
}

function end(winner){
    if (winner != 2)
        score[turn].textContent = parseInt(score[turn].textContent) + 1

    blockMoves = true
}

function checkIfEnded(){
    move++;
    for (var i = 0; i < winPatterns.length; i++){

        // checks all win patterns
        if (pieces[winPatterns[i][0]].textContent == pieces[winPatterns[i][1]].textContent && pieces[winPatterns[i][1]].textContent == pieces[winPatterns[i][2]].textContent && pieces[winPatterns[i][2]].textContent != '')
            end(turn)
    }

    if (move == 9)
        end(2) // 2 means draw
}

function placeFigures(index){
    if (blockMoves)
        return 0
    
    if (pieces[index].textContent == ''){
        pieces[index].textContent = figures[turn]
        pieces[index].style.color = colors[turn]
    }

    checkIfEnded()
    turn = Math.abs(turn-1) // oscillates between 0 and 1
}

for (var i = 0; i < pieces.length; i++){
    pieces[i].addEventListener("click", placeFigures.bind(this, i), false)
}

document.getElementById("reset").addEventListener("click", reset, false)