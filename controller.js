function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = -player.speed;
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        player.dy = -player.speed;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        player.dy = player.speed;
    }
}

function keyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right' ||
        e.key === 'ArrowLeft' || e.key === 'Left' ||
        e.key === 'ArrowUp' || e.key === 'Up' ||
        e.key === 'ArrowDown' || e.key === 'Down') {
        player.dx = 0;
        player.dy = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

let isRunning = false;

function startGame() {
    if (!isRunning) {
        isRunning = true;
        update();
    }
}

function pauseGame() {
    isRunning = false;
}

function resetGame() {
    isRunning = false;
    player.x = 50;
    player.y = gameHeight - 150;
    player.dx = 0;
    player.dy = 0;
    clearCanvas();
    drawPlayer();
    drawPlatforms();
}

// Button event listeners
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('pauseButton').addEventListener('click', pauseGame);
document.getElementById('resetButton').addEventListener('click', resetGame);

// Existing event listeners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);