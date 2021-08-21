// TODO
// * Dynamic Starting Spot
// * Dynamic Apple
// * High Score

let board = document.getElementById("board");
let status = document.getElementById("status");
let startGameButton = document.getElementById('startGame');

let boardSize = 20;

let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ], //Row,Col coords oldest to newest
    direction: 'r' //u,d,l,f => up, down, left, right
};

let gameState = {
    apple: [3,4],
    snake: snake,
    gameRunning: false,
    score: 0
};

let interval;

function initSnake(){
    //TODO Randomize Start Position
    snake.body = [ [10, 5], [10, 6], [10, 7], [10, 8] ];

    snake.direction = "r";
};

function renderBoard(){
    board.innerHTML = ""; // Clear Board
    let cell1 = "lightCell";
    let cell2 = "darkCell";
    for(let row = 0; row < boardSize; row++){
        let rowTR = document.createElement('tr');
        for(let col = 0; col < boardSize; col++){
            let colTD = document.createElement('td');
            if(col % 2 == 0){
                colTD.className = cell1;;
            }else{
                colTD.className = cell2;
            }
            let position = [row,col];
            
            if(checkIsApple(position)){
                colTD.className = "apple";
            }

            if(checkIsSnake(position))
            {
                colTD.className = "snakeBit";
            }
            rowTR.appendChild(colTD);
        }
        board.appendChild(rowTR);

        //Rotate Cells TODO: Better Way
        let tempCell = cell1;
        cell1 = cell2;
        cell2 = tempCell;
    }
}

function checkIsSnake(position){
    for(let i = 0; i < snake.body.length; i++)
    {
        if(snake.body[i].toString() == position.toString()) return true;
    }
    return false;
}

function checkIsApple(position){
    return(gameState.apple.toString() == position.toString());
}

function moveSnake(){
    let head = snake.body[snake.body.length - 1]; // get last added cell so we know where to go next
    let newCell = [];
    switch(snake.direction)
    {
        case 'u':
            newCell = [head[0] - 1, head[1]];
            break;
        case 'd':
            newCell = [head[0] + 1, head[1]];
            break;
        case 'l':
            newCell = [head[0], head[1] - 1];
            break;
        case 'r':
            newCell = [head[0], head[1] + 1];
            break;
    }
    if(newCell[0] < 0 || newCell[0] > boardSize - 1 || newCell[1] < 0 || newCell[1] > boardSize - 1 || checkIsSnake(newCell)){
        stopGame();
    }else{
        snake.body.push(newCell);
        if(checkIsApple(newCell)){
            gameState.score++;
        } else {
            snake.body.shift(); //Pop off tail if no apple ate.
        }
    }
}

function inputHandler(event){
    switch(event.code){
        case "KeyW":
        case "ArrowUp":
            //Up
            if(snake.direction != 'd'){
                snake.direction = 'u';
            }
            break;
        case "KeyS":
        case "ArrowDown":
            //Down
            if(snake.direction != 'u'){
                snake.direction = 'd';
            }
            break;
        case "KeyA":
        case "ArrowLeft":
            //Left
            if(snake.direction != 'r'){
                snake.direction = 'l';
            }
            break;
        case "KeyD":
        case "ArrowRight":
            //Right
            if(snake.direction != 'l'){
                snake.direction = 'r';
            }
            break;
        default:
            //DO NOTHING
            break;
    }
}

function tickGame(){
    moveSnake();
    renderBoard();
    updateStatus();
}

function reset(){
    gameState.gameRunning = true;
    gameState.score = 0;

    status.style.display = "flex";
    startGameButton.style.display = "none";

    initSnake();
    interval = setInterval(tickGame, 500);
}

function onLoad(){
    renderBoard();
    status.style.display = "none";
}

function updateStatus(){
    if(gameState.gameRunning){
        status.innerHTML = "Current Score: " + gameState.score;        
    }else{
        status.innerHTML = "GAME OVER! Your Score: " + gameState.score;
    }
}

function stopGame(){
    clearInterval(interval);
    gameState.gameRunning = false;
    startGameButton.style.display = "flex";
}

startGameButton.addEventListener("click",reset);
document.addEventListener("DOMContentLoaded", onLoad());
document.addEventListener("keydown", inputHandler)

