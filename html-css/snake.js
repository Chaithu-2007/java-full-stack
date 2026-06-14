const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart");
const pauseButton = document.getElementById("pause");
const resumeButton = document.getElementById("resume");
const endButton = document.getElementById("end");

const box = 20;
const canvasSize = 400;

let snake = [];
let food = { x: 0, y: 0 };
let score = 0;
let direction = "RIGHT";
let game;
let isPaused = false;

function resetGame(){
    snake = [{x: 200, y: 200}];
    score = 0;
    scoreElement.textContent = score;
    direction = "RIGHT";
    isPaused = false;
    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    if(game){
        clearInterval(game);
    }

    game = setInterval(drawGame, 100);
}

document.addEventListener("keydown", changeDirection);
restartButton.addEventListener("click", resetGame);
pauseButton.addEventListener("click", () => {
    if(game && !isPaused){
        clearInterval(game);
        game = null;
        isPaused = true;
    }
});
resumeButton.addEventListener("click", () => {
    if(!game && isPaused){
        game = setInterval(drawGame, 100);
        isPaused = false;
    }
});
endButton.addEventListener("click", () => {
    if(game){
        clearInterval(game);
        game = null;
    }
    isPaused = false;
    alert("Game Ended!");
});

function changeDirection(event){

    if(event.key === "ArrowUp" && direction !== "DOWN"){
        direction = "UP";
    }

    if(event.key === "ArrowDown" && direction !== "UP"){
        direction = "DOWN";
    }

    if(event.key === "ArrowLeft" && direction !== "RIGHT"){
        direction = "LEFT";
    }

    if(event.key === "ArrowRight" && direction !== "LEFT"){
        direction = "RIGHT";
    }
}

function drawGame(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Snake
    for(let i=0;i<snake.length;i++){

        ctx.fillStyle = i===0 ? "lime" : "green";

        ctx.fillRect(
            snake[i].x,
            snake[i].y,
            box,
            box
        );
    }

    let headX = snake[0].x;
    let headY = snake[0].y;

    if(direction === "UP") headY -= box;
    if(direction === "DOWN") headY += box;
    if(direction === "LEFT") headX -= box;
    if(direction === "RIGHT") headX += box;

    // Eat food
    if(headX === food.x && headY === food.y){

        score++;
        scoreElement.textContent = score;

        food = {
            x: Math.floor(Math.random()*20)*box,
            y: Math.floor(Math.random()*20)*box
        };

    } else {
        snake.pop();
    }

    const newHead = {
        x: headX,
        y: headY
    };

    // Wall collision
    if(
        headX < 0 ||
        headY < 0 ||
        headX >= canvasSize ||
        headY >= canvasSize ||
        collision(newHead,snake)
    ){
        clearInterval(game);
        game = null;
        alert("Game Over! Score: " + score);
        return;
    }

    snake.unshift(newHead);
}

function collision(head,snake){

    for(let i=0;i<snake.length;i++){
        if(
            head.x === snake[i].x &&
            head.y === snake[i].y
        ){
            return true;
        }
    }

    return false;
}

resetGame();