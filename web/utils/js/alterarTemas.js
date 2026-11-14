/* ======================================================
   ALTERAÇÃO DE TEMA - STUDY PLAZA
====================================================== */

/* ======================================================
   INICIALIZAÇÃO
====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const temaSalvo = localStorage.getItem("theme");
  const tema = temaSalvo === "dark" ? "dark" : "light";

  aplicarTema(tema);
});

/* ======================================================
   EVENTO DO BOTÃO DE TEMA
====================================================== */

document.addEventListener("click", (evento) => {
  const botao = evento.target.closest("#theme-toggle");

  if (!botao) return;

  const temaAtual = document.documentElement.getAttribute("data-bs-theme");
  const novoTema = temaAtual === "dark" ? "light" : "dark";

  aplicarTema(novoTema);
});

/* ======================================================
   APLICAR TEMA
====================================================== */

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-bs-theme", tema);

  localStorage.setItem("theme", tema);

  atualizarIconeTema();
}

/* ======================================================
   ATUALIZAR ÍCONE
====================================================== */

function atualizarIconeTema() {
  const temaAtual = document.documentElement.getAttribute("data-bs-theme");

  const icone = document.querySelector("#theme-toggle i");
  const botao = document.getElementById("theme-toggle");

  if (!icone || !botao) return;

  if (temaAtual === "dark") {
    icone.classList.remove("fa-moon");
    icone.classList.add("fa-sun");

    botao.setAttribute("aria-label", "Ativar tema claro");
    botao.setAttribute("title", "Ativar tema claro");
  } else {
    icone.classList.remove("fa-sun");
    icone.classList.add("fa-moon");

    botao.setAttribute("aria-label", "Ativar tema escuro");
    botao.setAttribute("title", "Ativar tema escuro");
  }
}

/* ======================================================
   OBSERVAR NAVBAR DINÂMICA
====================================================== */

const observadorNavbar = new MutationObserver(() => {
  atualizarIconeTema();
});

observadorNavbar.observe(document.body, {
  childList: true,
  subtree: true,
});
