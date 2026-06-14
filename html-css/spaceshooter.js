const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");

let score = 0;

// Player
const player = {
    x: 225,
    y: 540,
    width: 50,
    height: 40,
    speed: 6
};

let bullets = [];
let enemies = [];

const keys = {};

// Keyboard controls
document.addEventListener("keydown", (e)=>{
    keys[e.key] = true;

    if(e.code === "Space"){
        bullets.push({
            x: player.x + player.width/2 - 2,
            y: player.y,
            width: 4,
            height: 10
        });
    }
});

document.addEventListener("keyup",(e)=>{
    keys[e.key] = false;
});

// Create enemies
function spawnEnemy(){
    enemies.push({
        x: Math.random() * 450,
        y: -40,
        width: 40,
        height: 40,
        speed: 2 + Math.random()*2
    });
}

setInterval(spawnEnemy,1000);

// Draw player
function drawPlayer(){
    ctx.fillStyle = "cyan";

    ctx.beginPath();
    ctx.moveTo(player.x + 25, player.y);
    ctx.lineTo(player.x, player.y + 40);
    ctx.lineTo(player.x + 50, player.y + 40);
    ctx.closePath();
    ctx.fill();
}

// Draw bullets
function drawBullets(){
    ctx.fillStyle = "yellow";

    bullets.forEach((bullet,index)=>{
        bullet.y -= 8;

        ctx.fillRect(
            bullet.x,
            bullet.y,
            bullet.width,
            bullet.height
        );

        if(bullet.y < 0){
            bullets.splice(index,1);
        }
    });
}

// Draw enemies
function drawEnemies(){
    ctx.fillStyle = "red";

    enemies.forEach((enemy,index)=>{
        enemy.y += enemy.speed;

        ctx.fillRect(
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );

        if(enemy.y > canvas.height){
            alert("Game Over!\nScore: " + score);
            document.location.reload();
        }
    });
}

// Collision
function checkCollisions(){

    bullets.forEach((bullet,bIndex)=>{

        enemies.forEach((enemy,eIndex)=>{

            if(
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ){

                bullets.splice(bIndex,1);
                enemies.splice(eIndex,1);

                score += 10;
                scoreElement.textContent = score;
            }
        });
    });
}

// Update player movement
function movePlayer(){

    if(keys["ArrowLeft"] && player.x > 0){
        player.x -= player.speed;
    }

    if(
        keys["ArrowRight"] &&
        player.x + player.width < canvas.width
    ){
        player.x += player.speed;
    }
}

// Main game loop
function gameLoop(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    movePlayer();

    drawPlayer();
    drawBullets();
    drawEnemies();

    checkCollisions();

    requestAnimationFrame(gameLoop);
}

gameLoop();