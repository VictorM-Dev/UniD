const form = document.getElementById("cadastroForm");
const msg = document.getElementById("mensagemSucesso");
const temaBtn = document.getElementById("temaBtn");

//Adição de sistema de mudança de tema da página
temaBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
});

//Adição de sistema de validação de formulário
form.addEventListener("submit", (e) => {
    e.preventDefault();
    limparErros();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmar = document.getElementById("confirmar").value.trim();
    const termos = document.getElementById("termos").checked;

    let valido = true;

    if (nome === "") {
        mostrarErro("erroNome", "Digite seu nome completo.");
        valido = false;
    }
    if (email === "") {
        mostrarErro("erroEmail", "Digite seu e-mail.");
        valido = false;
    } else if (!email.includes("@")) {
        mostrarErro("erroEmail", "Digite um e-mail válido.");
        valido = false;
    }
    if (senha.length < 6) {
        mostrarErro("erroSenha", "A senha deve ter pelo menos 6 caracteres.");
        valido = false;
    }
    if (confirmar !== senha) {
        mostrarErro("erroConfirmar", "As senhas não coincidem.");
        valido = false;
    }
    if (!termos) {
        mostrarErro("erroTermos", "Você precisa aceitar os termos.");
        valido = false;
    }

    if (!valido) return;

    msg.style.color = "#aaa";
    msg.innerText = "Simulando cadastro...";
    msg.style.display = "block";

    setTimeout(() => {
        msg.style.color = "var(--success-color)";
        msg.innerText = "Cadastro simulado com sucesso!";
        form.reset();
    }, 1500);
});

function mostrarErro(id, texto) {
    document.getElementById(id).innerText = texto;
}

function limparErros() {
    document.querySelectorAll(".erro").forEach(e => e.innerText = "");
}