const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const screenWidth = canvas.width;
const screenHeight = canvas.height;

const playerSize = 50;
let playerPos = { x: screenWidth / 2, y: screenHeight - playerSize * 2 };
const playerSpeed = 5;

const enemySize = 50;
let enemyPos = { x: Math.random() * (screenWidth - enemySize), y: 0 };
const enemySpeed = 5;

const foodSize = 30;
let foodPos = { x: Math.random() * (screenWidth - foodSize), y: Math.random() * (screenHeight - foodSize) };

let score = 0;

document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
    switch (e.key) {
        case "ArrowLeft":
            if (playerPos.x > 0) playerPos.x -= playerSpeed;
            break;
        case "ArrowRight":
            if (playerPos.x < screenWidth - playerSize) playerPos.x += playerSpeed;
            break;
        case "ArrowUp":
            if (playerPos.y > 0) playerPos.y -= playerSpeed;
            break;
        case "ArrowDown":
            if (playerPos.y < screenHeight - playerSize) playerPos.y += playerSpeed;
            break;
    }
}

function drawPlayer() {
    ctx.fillStyle = "green";
    ctx.fillRect(playerPos.x, playerPos.y, playerSize, playerSize);
}

function drawEnemy() {
    ctx.fillStyle = "red";
    ctx.fillRect(enemyPos.x, enemyPos.y, enemySize, enemySize);
}

function drawFood() {
    ctx.fillStyle = "blue";
    ctx.fillRect(foodPos.x, foodPos.y, foodSize, foodSize);
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function detectCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y;
}

function update() {
    ctx.clearRect(0, 0, screenWidth, screenHeight);

    drawPlayer();
    drawEnemy();
    drawFood();
    drawScore();

    enemyPos.y += enemySpeed;
    if (enemyPos.y > screenHeight) {
        enemyPos = { x: Math.random() * (screenWidth - enemySize), y: 0 };
    }

    const playerRect = { x: playerPos.x, y: playerPos.y, width: playerSize, height: playerSize };
    const enemyRect = { x: enemyPos.x, y: enemyPos.y, width: enemySize, height: enemySize };
    const foodRect = { x: foodPos.x, y: foodPos.y, width: foodSize, height: foodSize };

    if (detectCollision(playerRect, enemyRect)) {
        alert("Game Over!");
        document.location.reload();
    }

    if (detectCollision(playerRect, foodRect)) {
        score += 1;
        foodPos = { x: Math.random() * (screenWidth - foodSize), y: Math.random() * (screenHeight - foodSize) };
    }

    requestAnimationFrame(update);
}

update();
