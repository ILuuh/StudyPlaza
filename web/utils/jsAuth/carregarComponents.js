// Caminho da pasta de componentes, relativo a este arquivo JS.
const caminhoComponentes = new URL("../../components/", import.meta.url);

// Função reutilizável para carregar componentes HTML.
async function carregarComponente(idElemento, nomeArquivo) {
  try {
    const elemento = document.getElementById(idElemento);

    if (!elemento) {
      console.warn(`Elemento #${idElemento} não encontrado.`);
      return;
    }

    const caminhoArquivo = new URL(nomeArquivo, caminhoComponentes);

    const response = await fetch(caminhoArquivo);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    elemento.innerHTML = await response.text();
  } catch (error) {
    console.error(`Erro ao carregar ${nomeArquivo}:`, error);
  }
}

// Carregamento dos componentes.
carregarComponente("footer", "footerLogeed.html");
carregarComponente("navbar", "navbarLogeed.html");
carregarComponente("acessibilidade", "acessibilidade.html");
carregarComponente("vLibras", "vLibras.html");
