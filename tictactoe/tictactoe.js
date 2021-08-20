// let cells = document.getElementsByClassName("TD");
let board = document.getElementById("board");
let status = document.getElementById("status");
let isXTurn = true;
let boardWidth = 3;
let playerX = "ComputerX";
let playerO = "ComputerO";
let winnerFound = false;

/* TODO
Name Entry
Computer Player
let state = {
    players: ["X","O"],
    board: ["","","","","","","","",""]
};

function buildInitialState(){
    state = {players: ["X","O"],
    board: ["","","","","","","","",""]};
}

function renderState(){
    for(let row = 0; row < boardWidth; row++){
        let newTRElement = document.createElement("tr");
        for(let col = 0; col < boardWidth; col++){
            let newTDElement = document.createElement("td");
            newTDElement.innerHTML = state.board[row]
            newTRElement.appendChild(document.createElement("td"));
        }
        board.appendChild(newTRElement);
    }
}*/

function cellClick(event){
    if(event.target.tagName = "TD" && !winnerFound)
    {
        if(event.target.innerHTML == ""){
            if(isXTurn){
                event.target.innerHTML = "X";
                status.innerHTML = "It's O's Turn";
            }else{
                event.target.innerHTML = "O";
                status.innerHTML = "It's X's Turn";
            }
            isXTurn = !isXTurn;
        }
        checkWinCondition();
    }
}

function reset(){
    let cells = document.getElementsByTagName("TD");
    for(let i = 0; i < cells.length; i++){
        cells[i].innerHTML = "";
    }

    if(flipCoin()){
        status.innerHTML = "It's X's Turn"
        isXTurn = true;
    }else{
        status.innerHTML = "It's O's Turn"
        isXTurn = false;
    }
    winnerFound = false;
}

function flipCoin()
{
    let coinFlip = Math.floor(Math.random() * 2);
    return (coinFlip == 1);
}

function checkWinCondition(){
    let cells = document.getElementsByTagName("TD");
    for(let row = 0; row < boardWidth; row++)
    {
        //Check first item in row is filled
        if(cells[row * boardWidth].innerHTML != ""){
            if((cells[row * boardWidth].innerHTML == cells[(row*boardWidth) + 1].innerHTML) &&
                (cells[row * boardWidth].innerHTML == cells[(row*boardWidth) + 2].innerHTML)){
                    status.innerHTML = "The Winner is " + cells[row*boardWidth].innerHTML;
                    winnerFound = true;
                }
        }
    }
    //Check Columns
    for(let col = 0; col < boardWidth; col++)
    {
        //Check first item in col is filled
        if(cells[col].innerHTML != ""){
            if((cells[col].innerHTML == cells[col + boardWidth].innerHTML) &&
                (cells[col].innerHTML == cells[col + (boardWidth * 2)].innerHTML)){
                    status.innerHTML = "The Winner is " + cells[col].innerHTML;
                    winnerFound = true;
                }
        }
    }
    //Check Diagonals
    if((cells[0].innerHTML != "" ) && cells[0].innerHTML == cells[4].innerHTML && cells[4].innerHTML == cells[8].innerHTML)
    {
        status.innerHTML = "The Winner is " + cells[4].innerHTML;
        winnerFound = true;
    }
    if((cells[2].innerHTML != "" ) && cells[2].innerHTML == cells[4].innerHTML && cells[4].innerHTML == cells[6].innerHTML)
    {
        status.innerHTML = "The Winner is " + cells[4].innerHTML;
        winnerFound = true;
    }
}

document.getElementById("restart").addEventListener("click",reset);
document.getElementById("board").addEventListener("click",cellClick);
