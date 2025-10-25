const form = document.getElementById("cadastroForm");
const temaBtn = document.getElementById("temaBtn");

// Alternar tema
temaBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
});

// Validação do formulário
form.addEventListener("submit", (e) => {
    e.preventDefault();
    limparErros();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    let valido = true;

    if (email === "") {
        mostrarErro("erroEmail", "Digite seu e-mail.");
        valido = false;
    } else if (!email.includes("@")) {
        mostrarErro("erroEmail", "Digite um e-mail válido.");
        valido = false;
    }
    if (senha === "") {
        mostrarErro("erroSenha", "Digite sua senha");
        valido = false;
    }

    if (!valido) return;

    // Verificação de login
    if(email === "unid@unid.com" && senha === "unidteste"){
        window.location.href = "../index.html";
    } else {
        mostrarErro("erroSenha", "E-mail ou senha incorretos");
    }
});

function mostrarErro(id, texto) {
    document.getElementById(id).innerText = texto;
}

function limparErros() {
    document.querySelectorAll(".erro").forEach(e => e.innerText = "");
}
