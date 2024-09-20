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

        // Path variables
        this.path = null;
        this.currentPointIndex = 0;
        this.reversing = false;
    }

    draw(ctx) {
        throw new Error("Draw method must be implemented.");
    }

    move(dt) {
        // If path is set, move towards the next point
        if (this.path && this.path.length > 0) {
            const target = this.path[this.currentPointIndex];

            // Calculate the distance to the target point
            const distanceX = target.x - this.x;
            const distanceY = target.y - this.y;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            // Set velocity to move towards the target point
            if (distance > 0) {
                this.dx = (distanceX / distance) * this.speed;
                this.dy = (distanceY / distance) * this.speed;
            }

            this.x += this.dx * dt;
            this.y += this.dy * dt;

            // Check if the object is close enough to the target point (considered 'reached')
            if (distance <= this.speed * dt) {
                this.x = target.x;
                this.y = target.y;

                this.updateNextPoint();
            }
        }

        // Boundary checks (assuming canvas context is available globally)
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;
    }

    setPath(path) {
        this.path = path;
        this.currentPointIndex = 0;
        this.reversing = false;
    }

    updateNextPoint() {
        if (!this.reversing) {
            this.currentPointIndex++; // Move to the next point
            if (this.currentPointIndex >= this.path.length) {
                this.reversing = true; // Start reversing if the end is reached
                this.currentPointIndex = this.path.length - 2; // Go to the second-last point
            }
        } else {
            this.currentPointIndex--; // Move backwards through the path
            if (this.currentPointIndex < 0) {
                this.reversing = false; // Start moving forward if the beginning is reached
                this.currentPointIndex = 1; // Go to the second point
            }
        }
    }

    changeVelocity(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }
};
