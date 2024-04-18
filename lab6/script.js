const box = document.querySelector('.box');

const ball = document.createElement('div');
ball.style.width = '20px';
ball.style.height = '20px';
ball.style.backgroundColor = 'red';
ball.style.borderRadius = '50%';
ball.style.position = 'absolute';
ball.style.top = '50%';
ball.style.left = '50%';
ball.style.transform = 'translate(-50%, -50%)';
box.appendChild(ball);


let x = 0, y = 0;
let vx = 2, vy = 2;
const g = 0.001; 

function animate() {
  vy += g; 
  let moveX = x + vx;
  let moveY = y + vy;
  
  if (moveX + ball.offsetWidth > box.offsetWidth || moveX < 0) {
    vx *= -0.1;
    moveX = moveX < 0 ? 0 : box.offsetWidth - ball.offsetWidth;
  }
  if (moveY + ball.offsetHeight > box.offsetHeight || moveY < 0) {
    vy *= -0.1;
    moveY = moveY < 0 ? 0 : box.offsetHeight - ball.offsetHeight;
  }

  x = moveX;
  y = moveY;
  ball.style.left = x + 'px';
  ball.style.top = y + 'px';

  requestAnimationFrame(animate);
}

window.addEventListener('deviceorientation', (event) => {
  const { beta, gamma } = event;

  if(vx < 3 ){
    vx += gamma * 0.1; 
  }
  if(vy < 3){
    vy += beta * 0.1;
  }
  
});

animate(); 
