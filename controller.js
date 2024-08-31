Class.Joystick = class Joystick extends AbstractClass.Body_ {
    constructor(x, y, width, height, color) {
        super(x, y, 0, 0, 0, width, height, color); // dx, dy, and speed are set to 0 as the joystick itself doesn't move
        this.direction = ''; // Track the direction based on input
    }

    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'blue';

        if (this.direction === 'right') {
            ctx.fillRect(this.x + this.width / 2, this.y, this.width / 2, this.height);
        } else if (this.direction === 'left') {
            ctx.fillRect(this.x, this.y, this.width / 2, this.height);
        } else if (this.direction === 'up') {
            ctx.fillRect(this.x, this.y, this.width, this.height / 2);
        } else if (this.direction === 'down') {
            ctx.fillRect(this.x, this.y + this.height / 2, this.width, this.height / 2);
        }
    }

    updateDirection(dx, dy) {
        if (dx > 0) {
            this.direction = 'right';
        } else if (dx < 0) {
            this.direction = 'left';
        } else if (dy < 0) {
            this.direction = 'up';
        } else if (dy > 0) {
            this.direction = 'down';
        } else {
            this.direction = ''; // No movement
        }
    }
}

//controller
class Controller {
    constructor(canvas, player) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.player = player;
        this.joystick = null; // Joystick will be created only if needed
        this.controlType = null; // Will be determined based on user input

        this.awaitInputType(); // Start listening for the input type
    }

    awaitInputType() {
        const handleFirstInput = (e) => {
            if (e instanceof KeyboardEvent) {
                this.controlType = 'keyboard';
            } else if (e instanceof TouchEvent || e instanceof MouseEvent) {
                this.controlType = 'touch';
                this.initializeJoystick();
            }

            // Remove the event listeners after the first input is detected
            window.removeEventListener('keydown', handleFirstInput);
            window.removeEventListener('touchstart', handleFirstInput);
            window.removeEventListener('mousedown', handleFirstInput);
        };

        // Listen for the first input event
        window.addEventListener('keydown', handleFirstInput);
        window.addEventListener('touchstart', handleFirstInput);
        window.addEventListener('mousedown', handleFirstInput);
    }

    initializeJoystick() {
        // Joystick is fixed in the bottom left corner of the canvas
        const joystickWidth = 100;
        const joystickHeight = 100;
        this.joystick = new Class.Joystick(20, this.canvas.height - joystickHeight - 20, joystickWidth, joystickHeight, 'white');
    }

    update() {
        if (this.controlType === 'touch' && this.joystick) {
            this.joystick.draw(this.ctx);
        }
    }

    handleInput(e) {
        if (this.controlType === 'keyboard') {
            this.handleKeyboardInput(e);
        } else if (this.controlType === 'touch') {
            this.handleTouchInput(e);
        }
    }

    handleKeyboardInput(e) {
        if (e.type === 'keydown') {
            if (e.key === 'ArrowRight' || e.key === 'Right') {
                this.player.dx = this.player.speed;
            } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                this.player.dx = -this.player.speed;
            } else if (e.key === 'ArrowUp' || e.key === 'Up') {
                this.player.dy = -this.player.speed;
            } else if (e.key === 'ArrowDown' || e.key === 'Down') {
                this.player.dy = this.player.speed;
            }
        } else if (e.type === 'keyup') {
            if (['ArrowRight', 'Right', 'ArrowLeft', 'Left', 'ArrowUp', 'Up', 'ArrowDown', 'Down'].includes(e.key)) {
                this.player.dx = 0;
                this.player.dy = 0;
            }
        }
    }

    handleTouchInput(e) {
        if (!this.joystick) return;

        const touch = e.touches ? e.touches[0] : e;
        const rect = this.canvas.getBoundingClientRect();
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;

        if (touchX > this.joystick.x + this.joystick.width / 2) {
            this.player.dx = this.player.speed;
            this.joystick.updateDirection(this.player.dx, 0);
        } else if (touchX < this.joystick.x + this.joystick.width / 2) {
            this.player.dx = -this.player.speed;
            this.joystick.updateDirection(this.player.dx, 0);
        } else {
            this.player.dx = 0;
        }

        if (touchY > this.joystick.y + this.joystick.height / 2) {
            this.player.dy = this.player.speed;
            this.joystick.updateDirection(0, this.player.dy);
        } else if (touchY < this.joystick.y + this.joystick.height / 2) {
            this.player.dy = -this.player.speed;
            this.joystick.updateDirection(0, this.player.dy);
        } else {
            this.player.dy = 0;
        }
    }
}