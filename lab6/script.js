let ball;  
let box;
let x = 0, y = 0;
let vx = 20, vy = 2;
const g = 0.01;
let touchingEdge = false;

function createBall() {
  ball = document.createElement('div');
  ball.style.width = '20px';
  ball.style.height = '20px';
  ball.style.backgroundColor = 'red';
  ball.style.borderRadius = '50%';
  ball.style.position = 'absolute';
  ball.style.top = Math.random() * (box.offsetHeight - 20) + 'px';
  ball.style.left = Math.random() * (box.offsetWidth - 20) + 'px';
  box.appendChild(ball);
  return ball;
}

function createHole() {
  const hole = document.createElement('div');
  hole.className = 'hole';  
  hole.style.width = '40px';
  hole.style.height = '40px';
  hole.style.backgroundColor = 'black';
  hole.style.borderRadius = '50%';
  hole.style.position = 'absolute';
  hole.style.top = Math.random() * (box.offsetHeight - 40) + 'px';
  hole.style.left = Math.random() * (box.offsetWidth - 40) + 'px';
  box.appendChild(hole);
  return hole;
}

box = document.querySelector('#box'); 
createHole();
createBall();

function animate() {
  vy += g;
  let moveX = x + vx;
  let moveY = y + vy;
  let edgeContact = false;

  if (moveX + ball.offsetWidth > box.offsetWidth || moveX < 0) {
    vx *= -0.1;
    moveX = moveX < 0 ? 0 : box.offsetWidth - ball.offsetWidth;
    edgeContact = true;
  }
  if (moveY + ball.offsetHeight > box.offsetHeight || moveY < 0) {
    vy *= -0.1;
    moveY = moveY < 0 ? 0 : box.offsetHeight - ball.offsetHeight;
    edgeContact = true;
  }

  if (edgeContact) {
    if (!touchingEdge) {
      box.style.border = '3px solid blue';
      touchingEdge = true;
    }
  } else if (touchingEdge) {
    box.style.border = '5px solid rgb(255, 0, 255)';
    touchingEdge = false;
  }

  x = moveX;
  y = moveY;
  ball.style.left = x + 'px';
  ball.style.top = y + 'px';
  checkCollision();

  requestAnimationFrame(animate);
}

window.addEventListener('deviceorientation', (event) => {
  const { beta, gamma } = event;
  vx += gamma * 0.05; //prędkość w poziomie
  vy += beta * 0.05; //prędkość w pionie
  vx = Math.max(Math.min(vx, 10), -10); //ograniczenie prędkości
  vy = Math.max(Math.min(vy, 10), -10); 
});
let score =0;

function checkCollision() {

  const ballRect = ball.getBoundingClientRect();
  const holes = Array.from(document.querySelectorAll('.hole')); // pobranie wszystkich dziur

  for (const hole of holes) {
    const holeRect = hole.getBoundingClientRect(); /

    const ballCenterX = ballRect.left + ballRect.width / 2; // środek kulki
    const ballCenterY = ballRect.top + ballRect.height / 2;

    if (
      ballCenterX > holeRect.left && // sprawdzenie czy środek kulki jest w dziurze
      ballCenterX < holeRect.right &&
      ballCenterY > holeRect.top &&
      ballCenterY < holeRect.bottom
    ) {
      score++;
      scoreElement.textContent = score;

      hole.remove();
      ball.remove();
      createHole();
      createBall();
      break;
    }
  }
}
const scoreElement = document.querySelector('#score');

animate();
