const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');

const roulette = new Roulette(ctx);
const ball = new Ball(ctx, roulette);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    roulette.update();
    roulette.draw();
    ball.update();
    ball.draw();

    if (!ball.isStopped) {
        requestAnimationFrame(animate);
    }
}

canvas.width = 800;
canvas.height = 600;

roulette.initialize();
ball.initialize();

animate();