class Bird {
    constructor(canvasHeight) {
        this.x = 50;
        this.y = canvasHeight / 2;
        this.width = 34;
        this.height = 24;
        this.gravity = 0.6;
        this.lift = -15;
        this.velocity = 0;
        this.image = new Image();
        this.image.src = 'path/to/bird-image.png'; // Replace with actual image path
    }

    jump() {
        this.velocity += this.lift;
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        // Prevent the bird from falling below the canvas
        if (this.y + this.height >= canvasHeight) {
            this.y = canvasHeight - this.height;
            this.velocity = 0;
        }

        // Prevent the bird from flying above the canvas
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}