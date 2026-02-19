export function checkCollision(ball, pin) {
    const dx = ball.x - pin.x;
    const dy = ball.y - pin.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < (ball.radius + pin.radius);
}