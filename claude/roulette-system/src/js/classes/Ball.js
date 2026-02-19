class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = 0;
        this.friction = 0.98; // Friction coefficient for deceleration
        this.gravity = 0.1; // Simulated gravity effect
        this.isMoving = false;
    }

    update() {
        if (this.isMoving) {
            this.velocity *= this.friction; // Apply friction
            this.y += this.velocity; // Update position based on velocity
            this.velocity += this.gravity; // Apply gravity effect

            if (this.velocity < 0.1) { // Stop if velocity is low enough
                this.isMoving = false;
                this.velocity = 0;
            }
        }
    }

    startMoving(initialVelocity) {
        this.velocity = initialVelocity;
        this.isMoving = true;
    }

    stop() {
        this.isMoving = false;
        this.velocity = 0;
    }

    resetPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        ctx.fillStyle = 'gold';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}