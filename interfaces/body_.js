export class Body_ {
    constructor(x, y, dx,dy,speed,width, height, color) {
        if (this.constructor === Body_) {
            throw new Error("Drawable is an abstract class and cannot be instantiated directly.");
        }
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(ctx) {
        throw new Error("Draw method must be implemented.");
    }
}