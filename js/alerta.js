document.addEventListener("DOMContentLoaded", async () => {

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const chave = localStorage.getItem("chave");

    if (!usuario || !chave) {
        alert("Sessão expirada. Faça login novamente.");
        window.location.href = "index.html";
        return;
    }

    const login = usuario.login;
    const selectProduto = document.getElementById("idProduto");
    const formulario = document.getElementById("formAlerta");

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    let produtosUsuario = [];

    try {
        const resposta = await fetch(`https://api-odinline.odiloncorrea.com/produto/${chave}/usuario`);
        produtosUsuario = await resposta.json();

        selectProduto.innerHTML = '<option value="">Selecione um produto</option>';

        produtosUsuario.forEach(prod => {
            const opcoes = document.createElement("option");
            opcoes.value = prod.id;
            opcoes.textContent = `${prod.descricao} (R$ ${parseFloat(prod.valor).toFixed(2)})`;
            selectProduto.appendChild(opcoes);
        });
    } catch (e) {
        alert("Erro ao carregar produtos do usuário.");
        return;
    }

    const todosAlertas = JSON.parse(localStorage.getItem("alertas")) || {};
    let alertasDoUsuario = todosAlertas[login] || [];

    for (let alerta of alertasDoUsuario) {
        try {
            const respostaAlerta = await fetch(`https://api-odinline.odiloncorrea.com/produto/${alerta.idProduto}`);
            const produto = await respostaAlerta.json();
            const precoAtual = parseFloat(produto.valor);

            if (precoAtual <= alerta.valorDesejado) {
                if (alerta.acao === "comprar") {
                    realizarCompra(alerta, precoAtual, produto.descricao);
                    continue;
                } else {
                    notificarUsuario(alerta, precoAtual);
                    alerta.status = "Preço atingido";
                }
            } else {
                alerta.status = "Aguardando";
            }

        } catch {
            alerta.status = "Erro ao consultar preço";
        }
        adicionarNaTabela(alerta);
    }

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const idProduto = selectProduto.value;
        const valorDesejado = parseFloat(document.getElementById("valorDesejado").value);
        const acao = document.querySelector('input[name="acao"]:checked')?.value;

        if (!idProduto || !valorDesejado || !acao) return;

        if (alertasDoUsuario.some(a => a.idProduto === idProduto && a.acao === acao)) {
            alert("Este produto já está com alerta dessa ação.");
            return;
        }

        const produtoSelecionado = produtosUsuario.find(p => p.id == idProduto);

        if (!produtoSelecionado) {
            alert("Produto inválido.");
            return;
        }

        const novoAlerta = {
            idProduto,
            descricao: produtoSelecionado.descricao,
            valorDesejado,
            acao,
            status: "Aguardando",
            notificado: false
        };

        alertasDoUsuario.push(novoAlerta);
        todosAlertas[login] = alertasDoUsuario;
        localStorage.setItem("alertas", JSON.stringify(todosAlertas));
        adicionarNaTabela(novoAlerta);
        formulario.reset();
    });

    setInterval(verificarAlertasAtivos, 5000);
});

function adicionarNaTabela(alerta) {
    const linha = document.createElement("tr");
    linha.innerHTML = `
        <td>${alerta.descricao}</td>
        <td>R$ ${alerta.valorDesejado.toFixed(2)}</td>
        <td>${alerta.acao.charAt(0).toUpperCase() + alerta.acao.slice(1)}</td>
        <td>${alerta.status}</td>
    `;
    document.getElementById("tabelaAlertas").appendChild(linha);
}

function notificarUsuario(alerta, precoAtual) {
    const mensagem = `Produto ${alerta.descricao} está por R$ ${precoAtual.toFixed(2)} (Meta: R$ ${alerta.valorDesejado.toFixed(2)})`;
    if (Notification.permission === "granted") {
        new Notification("Alerta de preço!", { body: mensagem, icon: "logo.png" });
    } else {
        alert(mensagem);
    }
}

function realizarCompra(alerta, precoAtual, descricao) {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const login = usuario.login;
    const todasCompras = JSON.parse(localStorage.getItem("compras")) || {};
    const comprasDoUsuario = todasCompras[login] || [];

    comprasDoUsuario.push({
        idProduto: alerta.idProduto,
        descricao,
        valorPago: precoAtual,
        data: new Date().toLocaleString()
    });

    todasCompras[login] = comprasDoUsuario;
    localStorage.setItem("compras", JSON.stringify(todasCompras));

    const todosAlertas = JSON.parse(localStorage.getItem("alertas")) || {};
    let alertasDoUsuario = todosAlertas[login] || [];

    alertasDoUsuario = alertasDoUsuario.filter(a => a.idProduto !== alerta.idProduto);
    todosAlertas[login] = alertasDoUsuario;
    localStorage.setItem("alertas", JSON.stringify(todosAlertas));
    document.getElementById("tabelaAlertas").innerHTML = "";
    alertasDoUsuario.forEach(adicionarNaTabela);

    if (Notification.permission === "granted") {
        new Notification("Compra realizada!", { body: `Você comprou ${descricao} por R$ ${precoAtual.toFixed(2)}`, icon: "logo.png" });
    } else {
        alert(`Compra realizada: ${descricao}`);
    }
}

async function verificarAlertasAtivos() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario) return;

    const login = usuario.login;
    const todosAlertas = JSON.parse(localStorage.getItem("alertas")) || {};
    let alertasDoUsuario = todosAlertas[login] || [];

    for (let i = 0; i < alertasDoUsuario.length; i++) {
        const alerta = alertasDoUsuario[i];
        try {
            const alertaResposta = await fetch(`https://api-odinline.odiloncorrea.com/produto/${alerta.idProduto}`);
            const produto = await alertaResposta.json();
            const precoAtual = parseFloat(produto.valor);

            if (precoAtual <= alerta.valorDesejado) {
                if (alerta.acao === "comprar") {
                    realizarCompra(alerta, precoAtual, produto.descricao);
                    return;
                } else if (!alerta.notificado) {
                    notificarUsuario(alerta, precoAtual);
                    alerta.status = "Preço atingido";
                    alerta.notificado = true;
                }
            }

        } catch (e) {
            alerta.status = "Erro ao verificar";
        }
    }

    todosAlertas[login] = alertasDoUsuario;
    localStorage.setItem("alertas", JSON.stringify(todosAlertas));

    document.getElementById("tabelaAlertas").innerHTML = "";
    alertasDoUsuario.forEach(adicionarNaTabela);
}

function limparAlertas() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario) return;

    const login = usuario.login;
    const todosAlertas = JSON.parse(localStorage.getItem("alertas")) || {};
    todosAlertas[login] = [];
    localStorage.setItem("alertas", JSON.stringify(todosAlertas));
    document.getElementById("tabelaAlertas").innerHTML = "";
    alert("Alertas removidos.");
}
