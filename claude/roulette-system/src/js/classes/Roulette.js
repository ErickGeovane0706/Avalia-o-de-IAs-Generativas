class Roulette {
    constructor(canvas, numSlots) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.numSlots = numSlots;
        this.angle = 0;
        this.speed = 0;
        this.friction = 0.98; // Friction coefficient
        this.pins = [];
        this.slotAngle = (2 * Math.PI) / numSlots;
        this.createPins();
    }

    createPins() {
        const radius = this.canvas.width / 2 - 20; // Margin from edge
        for (let i = 0; i < this.numSlots; i++) {
            const angle = i * this.slotAngle;
            const pin = {
                x: this.canvas.width / 2 + radius * Math.cos(angle),
                y: this.canvas.height / 2 + radius * Math.sin(angle),
                radius: 5 // Pin radius
            };
            this.pins.push(pin);
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = '#000'; // Dark background
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.context.save();
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.context.rotate(this.angle);
        
        this.pins.forEach(pin => {
            this.context.fillStyle = 'gold'; // Pin color
            this.context.beginPath();
            this.context.arc(pin.x - this.canvas.width / 2, pin.y - this.canvas.height / 2, pin.radius, 0, Math.PI * 2);
            this.context.fill();
        });

        this.context.restore();
    }

    update() {
        if (this.speed > 0) {
            this.angle += this.speed;
            this.speed *= this.friction; // Apply friction
            if (this.speed < 0.01) this.speed = 0; // Stop if speed is very low
        }
    }

    spin(initialSpeed) {
        this.speed = initialSpeed;
    }

    getCurrentSlot() {
        const currentAngle = this.angle % (2 * Math.PI);
        const slotIndex = Math.floor((currentAngle + Math.PI / this.slotAngle) / this.slotAngle) % this.numSlots;
        return slotIndex;
    }
}

export default Roulette;