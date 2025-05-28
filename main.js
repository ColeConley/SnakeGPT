// script.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
};

let direction = "RIGHT";
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if (key == 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key == 38 && direction !== "DOWN") direction = "UP";
    else if (key == 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key == 40 && direction !== "UP") direction = "DOWN";
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "lime";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction == "LEFT") headX -= box;
    if (direction == "UP") headY -= box;
    if (direction == "RIGHT") headX += box;
    if (direction == "DOWN") headY += box;

    if (headX == food.x && headY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box,
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: headX,
        y: headY,
    };

    if (
        headX < 0 || headX >= canvas.width ||
        headY < 0 || headY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert("Game Over! Score: " + score);
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 390);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(draw, 100);
