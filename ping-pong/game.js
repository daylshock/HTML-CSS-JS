// Game elements
const gameContainer = document.getElementById('game-container');
const paddleLeft = document.getElementById('paddle-left');
const paddleRight = document.getElementById('paddle-right');
const ball = document.getElementById('ball');
const scoreElement = document.getElementById('score');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');

// Game variables
let gameRunning = false;
let leftScore = 0;
let rightScore = 0;

// Paddle positions
let leftPaddleY = 200;
let rightPaddleY = 200;
const paddleHeight = 100;
const paddleWidth = 15;

// Ball position and speed
let ballX = 390;
let ballY = 240;
let ballSpeedX = 4;
let ballSpeedY = 4;
const ballSize = 20;

// Game area dimensions
const gameWidth = 800;
const gameHeight = 500;

// Key states
const keys = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false
};

// Event listeners
startButton.addEventListener('click', startGame);

document.addEventListener('keydown', (e) => {
    if (e.key in keys) {
        keys[e.key] = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key in keys) {
        keys[e.key] = false;
    }
});

// Start game function
function startGame() {
    startScreen.style.display = 'none';
    gameRunning = true;
    resetBall();
    gameLoop();
}

// Game loop
function gameLoop() {
    if (!gameRunning) return;

    movePaddles();
    moveBall();
    checkCollisions();
    updatePositions();

    requestAnimationFrame(gameLoop);
}

// Move paddles based on key states
function movePaddles() {
    // Left paddle (W/S keys)
    if (keys.w && leftPaddleY > 0) {
        leftPaddleY -= 8;
    }
    if (keys.s && leftPaddleY < gameHeight - paddleHeight) {
        leftPaddleY += 8;
    }

    // Right paddle (Up/Down arrows)
    if (keys.ArrowUp && rightPaddleY > 0) {
        rightPaddleY -= 8;
    }
    if (keys.ArrowDown && rightPaddleY < gameHeight - paddleHeight) {
        rightPaddleY += 8;
    }
}

// Move ball
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

// Check collisions with walls and paddles
function checkCollisions() {
    // Top and bottom walls
    if (ballY <= 0 || ballY >= gameHeight - ballSize) {
        ballSpeedY = -ballSpeedY;
    }

    // Left paddle
    if (ballX <= 20 + paddleWidth &&
        ballX >= 20 &&
        ballY + ballSize >= leftPaddleY &&
        ballY <= leftPaddleY + paddleHeight) {

        // Calculate bounce angle based on where ball hits paddle
        const hitPosition = (ballY - leftPaddleY) / paddleHeight;
        const bounceAngle = hitPosition * Math.PI - Math.PI / 2;

        // Increase speed slightly and change direction
        const speed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY) * 1.05;
        ballSpeedX = Math.cos(bounceAngle) * speed;
        ballSpeedY = Math.sin(bounceAngle) * speed;

        // Ensure ball doesn't get stuck
        ballX = 20 + paddleWidth;
    }

    // Right paddle
    if (ballX + ballSize >= gameWidth - 20 - paddleWidth &&
        ballX + ballSize <= gameWidth - 20 &&
        ballY + ballSize >= rightPaddleY &&
        ballY <= rightPaddleY + paddleHeight) {

        // Calculate bounce angle based on where ball hits paddle
        const hitPosition = (ballY - rightPaddleY) / paddleHeight;
        const bounceAngle = hitPosition * Math.PI - Math.PI / 2;

        // Increase speed slightly and change direction
        const speed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY) * 1.05;
        ballSpeedX = -Math.cos(bounceAngle) * speed;
        ballSpeedY = Math.sin(bounceAngle) * speed;

        // Ensure ball doesn't get stuck
        ballX = gameWidth - 20 - paddleWidth - ballSize;
    }

    // Left wall (right player scores)
    if (ballX <= 0) {
        rightScore++;
        updateScore();
        resetBall();
    }

    // Right wall (left player scores)
    if (ballX >= gameWidth - ballSize) {
        leftScore++;
        updateScore();
        resetBall();
    }
}

// Update DOM elements positions
function updatePositions() {
    paddleLeft.style.top = leftPaddleY + 'px';
    paddleRight.style.top = rightPaddleY + 'px';
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

// Update score display
function updateScore() {
    scoreElement.textContent = `${leftScore} : ${rightScore}`;
}

// Reset ball to center
function resetBall() {
    ballX = gameWidth / 2 - ballSize / 2;
    ballY = gameHeight / 2 - ballSize / 2;

    // Random direction
    ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 4;
    ballSpeedY = (Math.random() * 2 - 1) * 4;

    // Small delay before next round
    setTimeout(() => { }, 500);
}