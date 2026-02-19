class Pipe {
    constructor(x, gap, height) {
        this.x = x;
        this.gap = gap;
        this.height = height;
        this.width = 50; // Width of the pipe
        this.passed = false; // To check if the bird has passed the pipe
    }

    update(speed) {
        this.x -= speed; // Move the pipe to the left
    }

    draw(ctx) {
        ctx.fillStyle = 'green'; // Color of the pipes
        ctx.fillRect(this.x, 0, this.width, this.height); // Top pipe
        ctx.fillRect(this.x, this.height + this.gap, this.width, ctx.canvas.height); // Bottom pipe
    }

    reset(x) {
        this.x = x; // Reset pipe position
        this.height = Math.floor(Math.random() * (ctx.canvas.height - this.gap - 20)) + 10; // Random height
        this.passed = false; // Reset passed status
    }

    checkCollision(bird) {
        // Check for collision with the pipes
        if (bird.x + bird.width > this.x && bird.x < this.x + this.width) {
            if (bird.y < this.height || bird.y + bird.height > this.height + this.gap) {
                return true; // Collision detected
            }
        }
        return false; // No collision
    }
}