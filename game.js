// no usage of AbstractClass is expected here :)
var Class = Class || {};

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = new Class.Player(50, canvas.height - 150, 50, 50, 'red');
const platforms = [
    new Class.Platform(0, canvas.height - 100, canvas.width, 20, 'green'),
    new Class.Platform(200, canvas.height - 200, 100, 20, 'green')
];

let drawableObjects = [player, ...platforms];
let moveableObjects =  [player];

const controller = new Controller(canvas, player);

function drawObjects(drawableObjects) {
    drawableObjects.forEach(obj => obj.draw(ctx));
}

function moveObjects(moveableObjects) {
    moveableObjects.forEach(obj => obj.move(ctx));
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    if (isRunning) {
        clearCanvas();
        moveObjects(moveableObjects);
        controller.update(); // Update the controller (and draw the joystick if needed)
        drawObjects(drawableObjects);
        requestAnimationFrame(update);
    }
}

// Handle input events
function handleInput(e) {
    controller.handleInput(e);
}

// Event listeners for both keyboard and touch/mouse
document.addEventListener('keydown', handleInput);
document.addEventListener('keyup', handleInput);
document.addEventListener('touchstart', handleInput);
document.addEventListener('touchmove', handleInput);
document.addEventListener('mousedown', handleInput);
document.addEventListener('mousemove', handleInput);
document.addEventListener('mouseup', handleInput);


let isRunning = true;
update();