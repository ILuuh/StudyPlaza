/* =========================================
   CARREGAR COMPONENTE DE ACESSIBILIDADE
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  carregarAcessibilidade();
});

async function carregarAcessibilidade() {
  const acessibilidade = document.getElementById("acessibilidade");

  if (!acessibilidade) return;

  try {
    // Caminho absoluto a partir da raiz do servidor
    const response = await fetch("../components/acessibilidade.html");

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const html = await response.text();

    // Insere o componente na página
    acessibilidade.innerHTML = html;

    // Inicializa os controles após carregar o HTML
    inicializarAcessibilidade();
  } catch (error) {
    console.error("Erro ao carregar acessibilidade:", error);
  }
}

/* =========================================
   CONTROLE DO TAMANHO DA FONTE
========================================= */

function inicializarAcessibilidade() {
  let fonteAtual = 100;

  const maxFonte = 150;
  const minFonte = 80;

  function aplicarZoomFonte() {
    document.documentElement.style.fontSize = `${fonteAtual}%`;
  }

  // Aumentar fonte
  window.zoommais = function () {
    if (fonteAtual < maxFonte) {
      fonteAtual = Math.min(fonteAtual + 10, maxFonte);
      aplicarZoomFonte();
    }
  };

  // Diminuir fonte
  window.zoommenos = function () {
    if (fonteAtual > minFonte) {
      fonteAtual = Math.max(fonteAtual - 10, minFonte);
      aplicarZoomFonte();
    }
  };

  // Restaurar tamanho padrão
  window.zoomnormal = function () {
    fonteAtual = 100;
    aplicarZoomFonte();
  };
}

/* =========================================
   ATIVAR BARRA DE ACESSIBILIDADE
========================================= */

window.ativarbarra = function () {
  const barra = document.getElementById("barra");
  const botaoBarra = document.getElementById("botaobarra");

  if (!barra || !botaoBarra) return;

  botaoBarra.style.display = "none";
  barra.style.display = "flex";
};

/* =========================================
   DESATIVAR BARRA DE ACESSIBILIDADE
========================================= */

window.desativarbarra = function () {
  const barra = document.getElementById("barra");
  const botaoBarra = document.getElementById("botaobarra");

  if (!barra || !botaoBarra) return;

  botaoBarra.style.display = "flex";
  barra.style.display = "none";
};
