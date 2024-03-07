let aktualny = 0;
const slajdy = document.querySelectorAll('.slajd');
const kropki = document.querySelectorAll('.kropka');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

const lenSlaid = slajdy.length;

function aktualizujSlajd(indeks) {
    
  aktualny = (indeks + lenSlaid) % lenSlaid;
  const x = -aktualny * 100;
  document.querySelector('.box').style.transform = `translateX(${x}%)`;
  zaktualizujKropki();
  
}

function zaktualizujKropki() {
  kropki.forEach((kropka, indeks) => {
    if (indeks === aktualny) {
      kropka.classList.add('aktywna');
    } else {
      kropka.classList.remove('aktywna');
    }
  });
}

  
next.addEventListener('click', () => {
    aktualizujSlajd(aktualny+1);
  });

  prev.addEventListener('click', () => {
    aktualizujSlajd(aktualny-1);
  });
  
  kropki.forEach((kropka, indeks) => {
    kropka.addEventListener('click', () => {
      aktualizujSlajd(indeks);
    });
  });

setInterval(() => {
  //aktualny = (aktualny + 1) % lenSlaid;
  aktualizujSlajd(aktualny+1);
}, 3000);

zaktualizujKropki();
