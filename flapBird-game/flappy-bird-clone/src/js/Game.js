class Game {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.bird = new Bird(this);
        this.pipes = [];
        this.score = 0;
        this.isGameOver = false;
        this.frame = 0;
        this.pipeGap = 100;
        this.pipeWidth = 50;
        this.init();
    }

    init() {
        document.body.appendChild(this.canvas);
        this.canvas.width = 400;
        this.canvas.height = 600;
        this.start();
    }

    start() {
        this.isGameOver = false;
        this.score = 0;
        this.frame = 0;
        this.pipes = [];
        this.generatePipes();
        this.loop();
    }

    loop() {
        if (!this.isGameOver) {
            this.update();
            this.draw();
            requestAnimationFrame(() => this.loop());
        }
    }

    update() {
        this.bird.update();
        this.updatePipes();
        this.checkCollision();
        this.frame++;
    }

    draw() {
        this.ctx.fillStyle = '#70c5ce';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.bird.draw();
        this.drawPipes();
        this.drawScore();
    }

    generatePipes() {
        const pipeHeight = Math.floor(Math.random() * (this.canvas.height - this.pipeGap - 20)) + 20;
        this.pipes.push({
            x: this.canvas.width,
            top: pipeHeight,
            bottom: this.canvas.height - pipeHeight - this.pipeGap
        });
    }

    updatePipes() {
        if (this.frame % 90 === 0) {
            this.generatePipes();
        }
        this.pipes.forEach(pipe => {
            pipe.x -= 2;
        });
        this.pipes = this.pipes.filter(pipe => pipe.x + this.pipeWidth > 0);
    }

    drawPipes() {
        this.pipes.forEach(pipe => {
            this.ctx.fillStyle = '#8B4513';
            this.ctx.fillRect(pipe.x, 0, this.pipeWidth, pipe.top);
            this.ctx.fillRect(pipe.x, this.canvas.height - pipe.bottom, this.pipeWidth, pipe.bottom);
        });
    }

    checkCollision() {
        this.pipes.forEach(pipe => {
            if (this.bird.x + this.bird.width > pipe.x && this.bird.x < pipe.x + this.pipeWidth) {
                if (this.bird.y < pipe.top || this.bird.y + this.bird.height > this.canvas.height - pipe.bottom) {
                    this.isGameOver = true;
                }
            }
        });
    }

    drawScore() {
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 20);
    }
}