document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    const login = usuario.login;
    const todasCompras = JSON.parse(localStorage.getItem("compras")) || {};
    const comprasDoUsuario = todasCompras[login] || [];

    const tabela = document.getElementById("tabelaCompras");

    comprasDoUsuario.forEach(compra => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${compra.idProduto}</td>
            <td>${compra.descricao}</td>
            <td>R$ ${parseFloat(compra.valorPago).toFixed(2)}</td>
        `;
        tabela.appendChild(linha);
    });
});

function limparCompras() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario) return;

    const login = usuario.login;
    const todasCompras = JSON.parse(localStorage.getItem("compras")) || {};

    todasCompras[login] = [];
    localStorage.setItem("compras", JSON.stringify(todasCompras));

    alert("Todas as compras foram removidas.");
    document.getElementById("tabelaCompras").innerHTML = "";
}