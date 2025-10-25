const tema = document.getElementById("tema");
const root = document.documentElement;

/*Adição de sistema para mudança de tema*/
tema.addEventListener("click", () => {
  document.body.classList.toggle("light");
})

/*Adição de sistema para scroll*/
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  const menu = document.getElementById("menuBar")
  const largura = window.innerWidth;

  if (window.scrollY > 70) {
    if (largura < 500) {
      menu.classList.add("transparente");
    }
    header.classList.add("transparente");
  } else {
    menu.classList.remove("transparente");
    header.classList.remove("transparente");
  }
});

//Adição de sistema para animação dos componentes
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

