document.addEventListener("DOMContentLoaded", createBox);
let canvas;
let ctx;

let box = {
    width: 1000,
    height: 500,
    speed: 40,
};

function createBox() {
    canvas = document.getElementById('balls');
    ctx = canvas.getContext('2d');

class Ball {
    constructor(x, y, r, dx, dy) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
    }
    rysuj() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#f43bff';
        ctx.fill();
    }
    odbij() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.r > box.width || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > box.height || this.y - this.r < 0) {
            this.dy = -this.dy;
        }
    }
}

class Line {
    constructor(x1, y1, x2, y2, thickness, color) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.thickness = thickness;
        this.color = color;
    }
    rysuj() {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineWidth = this.thickness;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

const inputRange = document.querySelector('#range');
const inputCount = document.querySelector('#count');
const balls = []; // tablica na kulki 
inputCount.addEventListener('input', () => {
    const count = parseInt(inputCount.value);

    balls.length = 0;

    for (let i = 0; i < count; i++) {
        const x = Math.random() * box.width;
        const y = Math.random() * box.height;
        const r = Math.random() * 20 + 10; // promień
        const wspolczynnik = 20 / r; // Stała 
        const dx = (Math.random() - 0.5) * wspolczynnik * 2;
        const dy = (Math.random() - 0.5) * wspolczynnik * 2;
        const ball = new Ball(x, y, r, dx, dy); // stwórz nową kulkę
        balls.push(ball); // dodaj kulke do tablicy
    }
});

    function drawLines() {
        const distance1 = parseInt(inputRange.value);
        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                const distance = Math.sqrt(Math.pow(balls[i].x - balls[j].x, 2) + Math.pow(balls[i].y - balls[j].y, 2)); // odległość między kulami
                if (distance <= distance1) {
                    const line = new Line(balls[i].x, balls[i].y, balls[j].x, balls[j].y, 2, '#f43bff'); // stwórz nową linię
                    line.rysuj();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, box.width, box.height);

        for (let i = 0; i < balls.length; i++) {
            balls[i].rysuj();
            balls[i].odbij();
        }

        drawLines();
        requestAnimationFrame(animate);
    }
    animate();
}
