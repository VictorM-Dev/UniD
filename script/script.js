const tema = document.getElementById("tema");
const root = document.documentElement;

let contador = 1;
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
