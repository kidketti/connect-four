var player1 = "R";
var player2 = "Y"
var currentPlayer = player1;
var gameFinish = false;
var board;
var rows = 6;
var col = 7;
var colArr;

window.onload = function(){
    createGame();
}

function createGame(){
    board = [];
    colArr = [5, 5, 5, 5, 5, 5, 5];

    for(var r = 0; r < rows; r++){
        var row = [];
        
        for(var c = 0; c < col; c++){
            row.push(' ');

            var slot = document.createElement("div");
            slot.id = r.toString() + "-" + c.toString();
            slot.classList.add("slot");
            slot.addEventListener("click", setMark);
            document.getElementById("board").append(slot);
        }
        board.push(row);
    }
}

function setMark(){
    if(gameFinish){
       return;
    }

    var coord = this.id.split("-");
    var r = parseInt(coord[0]);
    var c = parseInt(coord[1]);
    r = colArr[c];
    
    board[r][c] = currentPlayer;
    var slot = document.getElementById(r.toString() + "-" + c.toString());
    
    if(currentPlayer == player1){
        slot.classList.add("rMarker");
        currentPlayer = player2;
    }
    else{
        slot.classList.add("yMarker");
        currentPlayer = player1;
    }

    r--; 
    colArr[c] = r;

    checkAll();
}

function setWin(r, c){
    var win = document.getElementById("win");
    if(board[r][c] == player1){
        win.innerText = "Red Wins!";
    }
    else{
        win.innerText = "Yellow Wins!";
    }

    gameFinish = true;
}

function checkHor(){
    for(var r = 0; r < rows; r++){
        for(var c = 0; c < col - 3; c++){
            if(board[r][c] != ' ' && board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
                setWin(r, c);
            }
        }
    }
}

function checkVert(){
    for(var r = 0; r < rows - 3; r++){
        for(var c = 0; c < col; c++){
            if(board[r][c] != ' ' && board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]){
                setWin(r, c);
            }
        }
    }
}

function checkDiag(){
    for(var r = 0; r < rows - 3; r++){
        for(var c = 0; c < col - 3; c++){
            if(board[r][c] != ' ' && board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3] || 
                board[r][c] != ' ' && board[r][c] == board[r+1][c-1] && board[r+1][c-1] == board[r+2][c-2] && board[r+2][c-2] == board[r+3][c-3]){
                setWin(r, c);
            }
        }
    }
}

function checkAll(){
    if(checkHor() || checkVert() || checkDiag()){
        return;
    }
    else{
        checkTie();
    }
}

function checkTie() {
    var tie = document.getElementById("win")
    for (var i = 0; i <= colArr.length; i++) {
        if (colArr[i] >= 0) {
            return;
        }
    }

    tie.innerText = "Tie Game!";
    gameFinish = true;
}

function closeGame(){
    openedWindow.close();
}