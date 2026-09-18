/*
  geral.js
  - Script responsável por comportamentos gerais da interface:
    * abertura/fechamento do menu hambúrguer no header
    * abertura/fechamento do modal de login (overlay)
    * exibição temporária de um aviso/modal
  - Comentários explicativos adicionados para facilitar manutenção e acessibilidade.
*/

/* ---------------------------
   Menu hamburger (header)
   --------------------------- */
// botão que abre/fecha o menu (ícone hamburger no header)
const botaomenu = document.querySelector("header .hamburger");
// elemento que contém o menu lateral/overlay
const menu =
  document.querySelector("header .menu") || document.querySelector(".menu");
// botão que fecha o menu (ícone/elemento dentro do menu)
const botaofecharmenu = document.querySelector(".fecharMenu");

// Adiciona event listeners apenas se os elementos existirem (evita erros em páginas sem header)
if (botaomenu) botaomenu.addEventListener("click", abrirmenu);
if (botaofecharmenu) botaofecharmenu.addEventListener("click", fecharmenu);

/**
 * abrirmenu()
 * - Move o menu para a posição visível (right: 0)
 * - Atualiza o atributo aria-expanded no botão do menu para indicar estado aos leitores de tela
 */
function abrirmenu() {
  menu.style.right = "0";
  botaomenu.setAttribute("aria-expanded", "true");
}

/**
 * fecharmenu()
 * - Move o menu para fora da tela (right: -100%)
 * - Atualiza aria-expanded para 'false'
 */
function fecharmenu() {
  menu.style.right = "-100%";
  botaomenu.setAttribute("aria-expanded", "false");
}
