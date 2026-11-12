console.log("acessibilidade.js foi carregado!");

function inicializarAcessibilidade() {
  const barra = document.getElementById("barra");
  const botaoAbrir = document.getElementById("botaobarra");
  const botaoFechar = document.getElementById("fecharbarra");

  const zoomMais = document.getElementById("zoom-mais");
  const zoomMenos = document.getElementById("zoom-menos");
  const zoomNormal = document.getElementById("zoom-normal");

  if (!barra || !botaoAbrir || !botaoFechar) {
    console.error("Não foi possível encontrar os elementos da acessibilidade.");
    return;
  }

  // Evita registrar os mesmos eventos mais de uma vez.
  if (barra.dataset.inicializada === "true") return;

  barra.dataset.inicializada = "true";

  console.log("Barra de acessibilidade inicializada!");

  // Abrir e fechar a barra.
  function alterarEstadoBarra(aberta) {
    barra.hidden = !aberta;
    botaoAbrir.setAttribute("aria-expanded", String(aberta));
  }

  botaoAbrir.addEventListener("click", () => {
    alterarEstadoBarra(true);
  });

  botaoFechar.addEventListener("click", () => {
    alterarEstadoBarra(false);
  });

  // Controle do tamanho da fonte.
  let fonteAtual = 100;

  const fonteMinima = 80;
  const fonteMaxima = 150;
  const incremento = 10;

  function aplicarZoomFonte() {
    document.documentElement.style.fontSize = `${fonteAtual}%`;
  }

  zoomMais?.addEventListener("click", () => {
    fonteAtual = Math.min(fonteAtual + incremento, fonteMaxima);
    aplicarZoomFonte();
  });

  zoomMenos?.addEventListener("click", () => {
    fonteAtual = Math.max(fonteAtual - incremento, fonteMinima);
    aplicarZoomFonte();
  });

  zoomNormal?.addEventListener("click", () => {
    fonteAtual = 100;
    aplicarZoomFonte();
  });
}

// Funciona tanto se o componente já estiver carregado
// quanto se ainda estiver aguardando o fetch.
document.addEventListener("componentesCarregados", inicializarAcessibilidade);

if (document.getElementById("barra")) {
  inicializarAcessibilidade();
}
