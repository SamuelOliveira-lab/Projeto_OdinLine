$("#formulario").validate(
    {
        rules: {
            login: {
                required: true
            },
            senha: {
                required: true
            }
        },
        messages: {
            login: {
                required: "Campo obrigatório",
            },
            senha: {
                required: "Digite a senha"
            }
        }
    }
)

async function autenticar() {
    if ($("#formulario").valid()) {
        let login = $("#login").val();
        let senha = $("#senha").val();

        try {
            let resposta = await fetch(`https://api-odinline.odiloncorrea.com/usuario/${login}/${senha}/autenticar`);
            let usuario = await resposta.json();
            if (usuario.id > 0) {
                localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                localStorage.setItem('chave', usuario.chave);
                window.location.href = "menu.html";
            } else {
                alert("Usuário ou senha inválidos.");
            }
        } catch (error) {
            alert("Erro ao tentar autenticar.");
        }
    }
}
