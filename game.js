const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let drawableObjects = [];
let moveableObjects = [];

const player = new Class.Player(150, canvas.height - 150, 50, 50, 100, 50, 50, 'red');
const platforms = [
    new Class.Platform(0, canvas.height - 100, canvas.width, 20, 'green'),
    new Class.Platform(200, canvas.height - 200, 100, 20, 'green')
];

function addObject(obj, isMovable = false) {
    drawableObjects.push(obj);
    if (isMovable) {
        moveableObjects.push(obj);
    }
}

addObject(player, true);

platforms.forEach(platform => addObject(platform));

const controller = new Controller(canvas, player);

// Game loop
let lastTime = 0;
let isRunning = true;

function update(timestamp) {
    if (isRunning) {
        let dt = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        clearCanvas();
        moveObjects(moveableObjects, dt);

        controller.update();
        drawObjects(drawableObjects);

        requestAnimationFrame(update);
    }
}

requestAnimationFrame(update);

// Event listeners for handling input
document.addEventListener('keydown', handleInput);
document.addEventListener('keyup', handleInput);
document.addEventListener('touchstart', handleInput);
document.addEventListener('touchmove', handleInput);
document.addEventListener('mousedown', handleInput);
document.addEventListener('mousemove', handleInput);
document.addEventListener('mouseup', handleInput);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawObjects(objects) {
    objects.forEach(obj => obj.draw(ctx));
}

function moveObjects(objects, dt) {
    objects.forEach(obj => obj.move(dt));
}

function handleInput(e) {
    controller.handleInput(e);
}
