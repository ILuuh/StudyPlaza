document.addEventListener('DOMContentLoaded', () => {
    const barra = document.getElementById('barra-acessibilidade');
  
    // Configuração de fonte
    window.fonteAtual = 100; // 100% = padrão
    const maxFonte = 150;
    const minFonte = 80;
  
    window.zoommais = function () {
      if (fonteAtual < maxFonte) {
        fonteAtual += 10;
        aplicarZoomFonte();
      }
    };
  
    window.zoommenos = function () {
      if (fonteAtual > minFonte) {
        fonteAtual -= 10;
        aplicarZoomFonte();
      }
    };
  
    function aplicarZoomFonte() {
      document.documentElement.style.fontSize = `${fonteAtual}%`;
    }
  });
  
  
  
  // ativar e desativar barra de acessibilidade
  function ativarbarra(){
  
      let barra = document.getElementById("barra");
      let botaobarra = document.getElementById("botaobarra");
  
      botaobarra.style.display = "none";
      barra.style.display = "flex";
  
  }
  
  function desativarbarra(){
  
      let barra = document.getElementById("barra");
      let botaobarra = document.getElementById("botaobarra");
  
      botaobarra.style.display = "flex";
      barra.style.display = "none";
  
  }
  
  // Código de puxar as duas barras de acessibilidade
  
  const barraAcessibilidade = document.getElementById("barra-acessibilidade")
  const barra = document.getElementById("barra")
  
  
  let MovimentoX, MovimentoY, Arrastado = false
  let barraAtual = null
  
  
  function PegarPosicaoAntiga() {
      let posicaoSalva = JSON.parse(localStorage.getItem("posicaoBarra"))
      if (posicaoSalva) {
          barraAcessibilidade.style.left = posicaoSalva.left + "px"
          barraAcessibilidade.style.top = posicaoSalva.top + "px"
          barra.style.left = posicaoSalva.left + "px"
          barra.style.top = posicaoSalva.top + "px"
      }
  }
  
  function salvarPosicao(left, top) {
      localStorage.setItem("posicaoBarra", JSON.stringify({ left, top }))
  }
  
  function iniciarArraste(event, elemento) {
      Arrastado = true
      barraAtual = elemento
      MovimentoX = event.clientX - barraAtual.offsetLeft
      MovimentoY = event.clientY - barraAtual.offsetTop
      barraAtual.style.cursor = "grabbing"
  }
  
  document.addEventListener("mousedown", (event) => {
      if (event.target.closest("#barra-acessibilidade")) {
          iniciarArraste(event, barraAcessibilidade)
      } else if (event.target.closest("#barra")) {
          iniciarArraste(event, barra)
      }
  });
  
  document.addEventListener("mousemove", (event) => {
      if (Arrastado && barraAtual) {
          let novoX = event.clientX - MovimentoX
          let novoY = event.clientY - MovimentoY
  
          barraAcessibilidade.style.left = novoX + "px"
          barraAcessibilidade.style.top = novoY + "px"
          barra.style.left = novoX + "px"
          barra.style.top = novoY + "px"
  
          salvarPosicao(novoX, novoY)
      }
  });
  
  document.addEventListener("mouseup", () => {
      Arrastado = false
      if (barraAtual) {
          barraAtual.style.cursor = "grab"
      }
      barraAtual = null
  })
  
  window.addEventListener('load', function() 
  { PegarPosicaoAntiga() })