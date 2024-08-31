AbstractClass.Body_ = class Body_ {
    constructor(x, y, dx, dy, speed, width, height, color) {
        if (this.constructor === AbstractClass.Body_) {
            throw new Error("Body_ is an abstract class and cannot be instantiated directly.");
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

    move(dt) {
        this.x += this.dx * dt;
        this.y += this.dy * dt;

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
};