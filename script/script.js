const tema = document.getElementById("tema");
const root = document.documentElement;

let contador = 1;
/*Adição de sistema para mudança de tema*/
tema.addEventListener("click", () => {
    if(contador == 1){
        root.style.setProperty("--bg-color", "#FFF");
        root.style.setProperty("--text-color", "#000");
        contador = 0;
    } else {
        root.style.setProperty("--bg-color", "#000");
        root.style.setProperty("--text-color", "#FFF");
        contador = 1;
    }
})

/*Adição de sistema para scroo*/
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  const menu = document.getElementById("menuBar")
  const largura = window.innerWidth;

  if (window.scrollY > 70) {
    if(largura < 500) {
        menu.classList.add("transparente");
    }
    header.classList.add("transparente");
  } else {
    menu.classList.remove("transparente");
    header.classList.remove("transparente");
  }
});

//Animação de ir aparecendo os blocos
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;

  reveals.forEach(el => {
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

