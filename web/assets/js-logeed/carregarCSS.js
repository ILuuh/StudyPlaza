// ======================================================
// CARREGAMENTO DINÂMICO DE CSS
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    // Verifica quais CSS a página precisa
    const cssPagina = body.dataset.css;

    // CSS compartilhados por todo o projeto
    const cssGlobais = [
        "style",
        "navbar",
        "footer",
        "btnAcessibilidade"
    ];


    // --------------------------------------------------
    // CARREGAR CSS GLOBAIS
    // --------------------------------------------------

    cssGlobais.forEach((arquivo) => {

        carregarArquivoCSS(arquivo);

    });


    // --------------------------------------------------
    // CARREGAR CSS ESPECÍFICO DA PÁGINA
    // --------------------------------------------------

    if (cssPagina) {

        carregarArquivoCSS(cssPagina);

    }

});


// ======================================================
// FUNÇÃO PARA CARREGAR CSS
// ======================================================

function carregarArquivoCSS(nomeArquivo) {

    const link = document.createElement("link");

    link.rel = "stylesheet";

    link.href = `../assets/css-logeed/${nomeArquivo}.css`;

    document.head.appendChild(link);

}