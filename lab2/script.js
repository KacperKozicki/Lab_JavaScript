let aktualny = 0;
let inter;

const slajdy = document.querySelectorAll('.slajd');
const kropki = document.querySelectorAll('.kropka');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slider = document.querySelector('.slider');

const lenSlajd = slajdy.length;

function move(indeks) {
  aktualny = (indeks + lenSlajd) % lenSlajd;
  const x = -aktualny * 100;
  document.querySelector('.box').style.transform = `translateX(${x}%)`;

  kropki.forEach((kropka, indeks) => {
    if (indeks === aktualny) {
      kropka.classList.add('aktywna');
    } else {
      kropka.classList.remove('aktywna');
    }
  });
}

function startAutoSlide() {
  inter = setInterval(() => {
    move(aktualny + 1);
  }, 3000);
}

function stopAutoSlide() {
  clearInterval(inter);
}

//start stop setinterval
slider.addEventListener('mouseover', stopAutoSlide);
slider.addEventListener('mouseout', startAutoSlide);


//przyciski
next.addEventListener('click', () => {
  move(aktualny + 1);
});

prev.addEventListener('click', () => {
  move(aktualny - 1);
});

//klasa dla kropek
kropki.forEach((kropka, indeks) => {
  kropka.addEventListener('click', () => {
    move(indeks);
  });
});

startAutoSlide();
