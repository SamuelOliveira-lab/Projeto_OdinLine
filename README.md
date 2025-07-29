# 💻 Projeto: Autenticação e Gerenciamento de Alertas de Preço

Sistema web desenvolvido como exercício avaliativo da disciplina **Desenvolvimento de Sistemas** do curso de **Engenharia de Computação - CEFET-MG**, sob orientação do professor **Odilon Corrêa da Silva**.

## 📋 Descrição

Este projeto tem como objetivo a **autenticação de usuários** via API externa da plataforma **OdinLine**, bem como o **gerenciamento de alertas de preços** de produtos.

Após autenticar o usuário (sem permitir cadastro), ele pode:

- Cadastrar alertas de preço para produtos que possui.
- Escolher entre ser notificado ou efetuar uma compra automaticamente.
- Acompanhar a lista de alertas ativos.
- Consultar um histórico de compras realizadas.

A aplicação usa **localStorage** para armazenar sessões, alertas e compras de forma individualizada para cada usuário autenticado.

---

## 🚀 Funcionalidades

✅ Autenticação de usuários via API OdinLine  
✅ Interface de login validada com jQuery Validation  
✅ Dashboard com opções de alerta de preço e compras  
✅ Cadastro de alertas com definição de preço e ação (notificar/comprar)  
✅ Notificações automáticas via API Notification do navegador  
✅ Simulação de compras automáticas  
✅ Histórico de compras armazenado localmente  
✅ Logout e proteção de páginas por sessão  

---

## 🧑‍💻 Tecnologias Utilizadas

- HTML5
- CSS3 (com Bootstrap 5)
- JavaScript ES6
- jQuery & jQuery Validation
- Web API (Fetch, LocalStorage, Notifications)

---

## 📂 Estrutura do Projeto

- index.html # Tela de login
- menu.html # Menu principal após login
- alerta.html # Cadastro e visualização de alertas
─ compras.html # Histórico de compras

├── js/
 
 - index.js # Validação e autenticação do login
 - menu.js # Renderização da saudação e logout
 - alerta.js # Lógica de alertas, compras e notificações
 - compras.js # Renderização do histórico de compras
 - logo.png # Logo da aplicação

---
## 🔐 API de Autenticação

- Endpoint utilizado:
GET https://api-odinline.odiloncorrea.com/usuario/{login}/{senha}/autenticar

- Retorna um objeto `usuario` com os campos:
- `id`, `login`, `nome`, `chave`, etc.
- Usuários não autenticados são redirecionados automaticamente ao `index.html`.

---

## 🛠️ Como executar localmente

1. Clone o repositório:
 ```bash
git clone https://github.com/SamuelOliveira-lab/Projeto_OdinLine.git

Navegue até a pasta e abra o index.html com um navegador moderno (preferencialmente Chrome).

Insira as credenciais válidas da plataforma OdinLine.

Após login, utilize o menu para navegar entre as funcionalidades.

🔔 Para usar as notificações, permita o envio de notificações pelo navegador quando solicitado.

⚠️ Observações
Este sistema não permite o cadastro de novos usuários — apenas autenticação de quem já está registrado na plataforma OdinLine.

A API utilizada é de terceiros (acadêmica), portanto eventuais indisponibilidades podem afetar o funcionamento da aplicação.

Os dados de alertas e compras são mantidos apenas no localStorage, ou seja, não persistem entre navegadores ou em modo anônimo.

🧠 Aprendizados
Durante o desenvolvimento, foram aplicados conceitos de:

Integração com APIs REST via Fetch

Manipulação de DOM com JavaScript

Validação de formulários com jQuery Validation

Uso do localStorage para persistência temporária

Boas práticas com responsividade via Bootstrap

Gerenciamento de sessões no front-end
