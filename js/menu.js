const usuario = localStorage.getItem("usuarioLogado");

if (!usuario) {
    window.location.href = "index.html";
} else {
    const dados = JSON.parse(usuario);
    document.querySelector("h4").innerText = `Bem Vindo ${dados.nome}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const botaologout = document.querySelector(".btn-outline-danger");
    if (botaologout) {
        botaologout.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado");
            localStorage.removeItem("chave");
            window.location.href = "index.html";
        });
    }
});
