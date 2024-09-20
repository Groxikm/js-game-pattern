Class.Platform = class Platform extends AbstractClass.Body_ {
    constructor(x, y, width, height, color) {
        super(x, y, 0, 0, 0, width, height, color); // dx and dy are 0 because platform is stationary
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};
