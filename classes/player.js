const player = {
    x: 50,
    y: gameHeight - 150,
    width: 50,
    height: 50,
    color: 'red',
    speed: 5,
    dx: 0,
    dy: 0
};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    // Check for canvas boundaries
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > gameWidth) player.x = gameWidth - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > gameHeight) player.y = gameHeight - player.height;
}