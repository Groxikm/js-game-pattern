
const platforms = [
    { x: 0, y: gameHeight - 100, width: gameWidth, height: 20, color: 'green' },
    { x: 200, y: gameHeight - 200, width: 100, height: 20, color: 'green' },
];


function drawPlatforms() {
    platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}