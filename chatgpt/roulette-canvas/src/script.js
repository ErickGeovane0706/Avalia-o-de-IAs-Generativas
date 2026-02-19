// Configuration and Constants
const CONFIG = {
    centerX: 400,
    centerY: 400,
    wheelRadius: 350,
    pocketRadius: 260, // Where the ball settles
    pinRadius: 290,    // Radius where pins/dividers are located
    ballRadius: 7,
    friction: 0.992,   // Roulette friction
    ballFriction: 0.99,
    gravity: 0.08      // Simulated gravity pulling ball to center
};

// European Roulette Sequence (Clockwise)
const NUMBERS = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 
    10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

const COLORS = {
    0: '#008000', // Green
    red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
};

function getNumberColor(num) {
    if (num === 0) return COLORS[0];
    return COLORS.red.includes(num) ? '#b00' : '#111';
}

class Ball {
    constructor(roulette) {
        this.roulette = roulette;
        this.reset();
    }

    reset() {
        this.radius = 0;
        this.angle = 0;
        this.speed = 0;
        this.state = 'IDLE'; // IDLE, SPINNING, SETTLING, LOCKED
        this.lockOffset = 0;
    }

    launch() {
        this.state = 'SPINNING';
        this.radius = CONFIG.wheelRadius - 15; // Start at rim
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.15 + Math.random() * 0.05; // Initial angular speed
        this.direction = -1; // Ball spins opposite to wheel
    }

    update() {
        if (this.state === 'IDLE') return;

        if (this.state === 'LOCKED') {
            // Ball moves exactly with the wheel
            this.angle = this.roulette.rotationAngle + this.lockOffset;
            return;
        }

        // Update angle based on speed
        this.angle += this.speed * this.direction;
        
        // Apply friction
        this.speed *= CONFIG.ballFriction;

        // Physics: Centripetal force vs Gravity
        // As speed drops, gravity pulls ball towards center (down the slope)
        const criticalSpeed = 0.06;
        
        if (this.state === 'SPINNING') {
            if (this.speed < criticalSpeed) {
                this.radius -= 0.8; // Ball starts falling
            }
            if (this.radius < CONFIG.pinRadius + 10) {
                this.state = 'SETTLING';
            }
        } else if (this.state === 'SETTLING') {
            // Ball is in the pin zone
            this.radius -= 0.3;
            this.checkPinCollision();

            if (this.radius <= CONFIG.pocketRadius) {
                this.lockToSlot();
            }
        }
    }

    checkPinCollision() {
        // Pins rotate with the wheel
        const pins = this.roulette.getPinsWorldAngles();
        
        // Normalize ball angle
        let ballAngle = this.angle % (Math.PI * 2);
        if (ballAngle < 0) ballAngle += Math.PI * 2;

        for (let pinAngle of pins) {
            // Check angular distance
            let diff = Math.abs(pinAngle - ballAngle);
            if (diff > Math.PI) diff = 2 * Math.PI - diff;

            // If close to a pin in angle AND radius
            if (diff < 0.04 && Math.abs(this.radius - CONFIG.pinRadius) < 10) {
                // Collision response: lose energy and bounce randomly
                this.speed *= 0.6;
                this.angle += (Math.random() > 0.5 ? 0.05 : -0.05); // Deflect
                // Play sound effect here if desired
            }
        }
    }

    lockToSlot() {
        this.state = 'LOCKED';
        this.radius = CONFIG.pocketRadius;
        // Calculate offset relative to wheel to stay in that slot
        this.lockOffset = this.angle - this.roulette.rotationAngle;
        
        // Determine winning number (optional logic)
        // const winningIndex = this.roulette.getSlotIndexAtAngle(this.angle);
        // console.log("Winner:", NUMBERS[winningIndex]);
    }

    draw(ctx) {
        if (this.state === 'IDLE') return;

        const x = CONFIG.centerX + Math.cos(this.angle) * this.radius;
        const y = CONFIG.centerY + Math.sin(this.angle) * this.radius;

        ctx.beginPath();
        ctx.arc(x, y, CONFIG.ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

class Roulette {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.rotationAngle = 0;
        this.rotationSpeed = 0;
        this.ball = new Ball(this);
    }

    spin() {
        if (this.rotationSpeed > 0.01) return; // Already spinning
        this.rotationSpeed = 0.05 + Math.random() * 0.05; // Random wheel speed
        this.ball.launch();
        document.getElementById('spinButton').disabled = true;
    }

    update() {
        // Rotate wheel
        this.rotationAngle += this.rotationSpeed;
        this.rotationAngle %= Math.PI * 2;

        // Friction
        if (this.rotationSpeed > 0) {
            this.rotationSpeed *= CONFIG.friction;
            if (this.rotationSpeed < 0.0005) {
                this.rotationSpeed = 0;
                document.getElementById('spinButton').disabled = false;
            }
        }

        this.ball.update();
    }

    draw() {
        const ctx = this.context;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.save();
        ctx.translate(CONFIG.centerX, CONFIG.centerY);
        ctx.rotate(this.rotationAngle);

        // 1. Outer Rim (Wood/Gold)
        ctx.beginPath();
        ctx.arc(0, 0, CONFIG.wheelRadius + 20, 0, Math.PI * 2);
        ctx.fillStyle = '#3e2723';
        ctx.fill();
        ctx.lineWidth = 15;
        ctx.strokeStyle = '#d4af37';
        ctx.stroke();

        // 2. Numbers and Slots
        const step = (Math.PI * 2) / NUMBERS.length;
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < NUMBERS.length; i++) {
            const angle = i * step;
            const num = NUMBERS[i];

            // Slot Slice
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, CONFIG.wheelRadius, angle - step/2, angle + step/2);
            ctx.fillStyle = getNumberColor(num);
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#d4af37';
            ctx.stroke();

            // Text
            ctx.save();
            ctx.rotate(angle);
            ctx.translate(CONFIG.wheelRadius - 25, 0);
            ctx.rotate(Math.PI / 2);
            ctx.fillStyle = '#fff';
            ctx.fillText(num, 0, 0);
            ctx.restore();

            // Pins (Dividers)
            ctx.beginPath();
            const pinX = Math.cos(angle + step/2) * CONFIG.pinRadius;
            const pinY = Math.sin(angle + step/2) * CONFIG.pinRadius;
            ctx.arc(pinX, pinY, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#e5c100';
            ctx.fill();
        }

        // 3. Center Cone
        ctx.beginPath();
        ctx.arc(0, 0, 100, 0, Math.PI * 2);
        ctx.fillStyle = '#111';
        ctx.fill();
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.restore();

        // Draw Ball
        this.ball.draw(ctx);
    }

    getPinsWorldAngles() {
        const step = (Math.PI * 2) / NUMBERS.length;
        const pins = [];
        for (let i = 0; i < NUMBERS.length; i++) {
            // Pin is between slots
            let angle = (i * step) + (step / 2) + this.rotationAngle;
            angle %= Math.PI * 2;
            if (angle < 0) angle += Math.PI * 2;
            pins.push(angle);
        }
        return pins;
    }
}

const canvas = document.getElementById('rouletteCanvas');
const roulette = new Roulette(canvas);

function animate() {
    roulette.update();
    roulette.draw();
    requestAnimationFrame(animate);
}

document.getElementById('spinButton').addEventListener('click', () => {
    roulette.spin();
});

animate();