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

