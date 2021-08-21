// let cells = document.getElementsByClassName("TD");
let board = document.getElementById("board");
let status = document.getElementById("status");
let gameArea = document.getElementById("gameArea");
let inputArea = document.getElementById("inputArea");
let isXTurn = true;
let boardWidth = 3;
let playerX = "ComputerX";
let playerO = "ComputerO";
let winnerFound = false;
let gameRunning = false;
let turnCounter = 0;
let isPlayerOAI = false;
let isPlayerXAI = false;

let player1Input = document.createElement("input");
player1Input.placeholder = "Enter Player 1 Name...";

let player2Input = document.createElement("input");
player2Input.placeholder = "Enter Player 2 Name...";

let startGameButton = document.getElementById('startGame');

function cellClick(event){
    if(event.target.tagName = "TD" && !winnerFound && gameRunning)
    {
        if(event.target.innerHTML == ""){
            if(isXTurn){
                event.target.innerHTML = "X";
                status.innerHTML = "It's " + playerO + "'s Turn"
            }else{
                event.target.innerHTML = "O";
                status.innerHTML = "It's " + playerX + "'s Turn"
            }
            isXTurn = !isXTurn;
        }
        checkWinCondition();
    }
}

function aiClick(){
    let moved = false;
    let cells = document.getElementsByTagName("TD");
    while(!moved){
        let moveNum = generateRandomMove();
        if(cells[moveNum].innerHTML == ""){
            if(isXTurn){
                cells[moveNum].innerHTML = "X";
                status.innerHTML = "It's " + playerO + "'s Turn"
            }else{
                cells[moveNum].innerHTML = "O";
                status.innerHTML = "It's " + playerX + "'s Turn"
            }
            moved = true;
            isXTurn = !isXTurn;
        }
    }
    checkWinCondition();
}

function generateRandomMove(){
    return Math.floor(Math.random() * 9);
}

function reset(){
    let vsP = document.createElement("p");
    vsP.innerHTML = " VS. ";
    inputArea.innerHTML = "";
    startGameButton.style.display = "flex";
    inputArea.insertBefore(player2Input, inputArea.firstChild);
    inputArea.insertBefore(vsP, inputArea.firstChild);
    inputArea.insertBefore(player1Input, inputArea.firstChild);

    status.innerHTML = "Enter Players Names, Blank for CPU";

    gameArea.style.display = "none";
}

function startGame(){
    let cells = document.getElementsByTagName("TD");
    for(let i = 0; i < cells.length; i++){
        cells[i].innerHTML = "";
    }

    if(player1Input.value == ""){
        playerX = "ComputerX";
        isPlayerXAI = true;
    }else{
        playerX = player1Input.value;
        isPlayerXAI = false;
    }

    if(player2Input.value == ""){
        playerO = "ComputerO";
        isPlayerOAI = true;
    }else{
        playerO = player2Input.value;
        isPlayerOAI = false;
    }

    if(flipCoin()){
        status.innerHTML = "It's " + playerX + "'s Turn"
        isXTurn = true;
    }else{
        status.innerHTML = "It's " + playerO + "'s Turn"
        isXTurn = false;
    }

    inputArea.innerHTML = playerX + " VS " + playerO + "!!!";
    winnerFound = false;
    gameRunning = true;
    turnCounter = 0;
    startGameButton.style.display = "none";
    gameArea.style.display = "flex";
}

function flipCoin()
{
    let coinFlip = Math.floor(Math.random() * 2);
    return (coinFlip == 1);
}

function checkWinCondition(){
    let cells = document.getElementsByTagName("TD");
    let winningPlayer = "";

    turnCounter++;
    if(turnCounter >= 9)
    {
        winnerFound = true;
        winningPlayer = "Draw"
    }
    for(let row = 0; row < boardWidth; row++)
    {
        //Check first item in row is filled
        if(cells[row * boardWidth].innerHTML != ""){
            if((cells[row * boardWidth].innerHTML == cells[(row*boardWidth) + 1].innerHTML) &&
                (cells[row * boardWidth].innerHTML == cells[(row*boardWidth) + 2].innerHTML)){
                    winningPlayer = cells[row*boardWidth].innerHTML;
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
                    winningPlayer = cells[col].innerHTML;
                    winnerFound = true;
                }
        }
    }
    //Check Diagonals
    if((cells[0].innerHTML != "" ) && cells[0].innerHTML == cells[4].innerHTML && cells[4].innerHTML == cells[8].innerHTML)
    {
        winningPlayer = cells[4].innerHTML;
        winnerFound = true;
    }
    if((cells[2].innerHTML != "" ) && cells[2].innerHTML == cells[4].innerHTML && cells[4].innerHTML == cells[6].innerHTML)
    {
        winningPlayer = cells[4].innerHTML;
        winnerFound = true;
    }

    if(winnerFound){
        if(winningPlayer == "Draw"){
            status.innerHTML = "The only way to win is not to play the game (DRAW!)"
        }else if(winningPlayer == "X"){
            status.innerHTML = "The Winner is " + playerX + "!"
        }else{
            status.innerHTML = "The Winner is " + playerO + "!"
        }
        gameRunning = false;
    }


}

function checkAIClick(){
    if(gameRunning){
        if((isXTurn && isPlayerXAI) || (!isXTurn && isPlayerOAI)){
            aiClick();
        }
    }       
}

setInterval(checkAIClick, 1000);

document.getElementById("restart").addEventListener("click",reset);
document.getElementById("board").addEventListener("click",cellClick);
startGameButton.addEventListener("click", startGame);
document.addEventListener("DOMContentLoaded", reset);
