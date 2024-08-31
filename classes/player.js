var Interface = Interface || {};
var Class = Class || {};

Class.Player = class Player extends Interface.Body_ {
    constructor(x, y, dx,dy,speed,width, height, color) {
        super(x, y, dx,dy,speed,width, height, color);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        // Check for canvas boundaries (assuming canvas context is available globally)
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;
    }
    changeVelocity(dx, dy) {
        this.dx += dx;
        this.dy += dy;
    }
}


