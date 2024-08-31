Class.Player = class Player extends AbstractClass.Body_ {
    constructor(x, y, dx, dy, speed, width, height, color) {
        super(x, y, dx, dy, speed, width, height, color);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

};
