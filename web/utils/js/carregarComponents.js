/* =========================================
   CARREGAMENTO DE COMPONENTES HTML
========================================= */

// Caminho da pasta de componentes
const caminhoComponentes = new URL("../../components/", import.meta.url);

// Carrega um componente HTML
async function carregarComponente(idElemento, nomeArquivo) {
  const elemento = document.getElementById(idElemento);

  if (!elemento) {
    console.warn(`Elemento #${idElemento} não encontrado.`);
    return false;
  }

  try {
    const caminhoArquivo = new URL(nomeArquivo, caminhoComponentes);

    const response = await fetch(caminhoArquivo);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    elemento.innerHTML = await response.text();

    return true;
  } catch (error) {
    console.error(`Erro ao carregar ${nomeArquivo}:`, error);

    return false;
  }
}

/* =========================================
   INICIALIZAÇÃO DOS COMPONENTES
========================================= */

async function carregarComponentes() {
  await Promise.all([
    carregarComponente("footer", "footer.html"),

    carregarComponente("navbar", "navbar.html"),

    carregarComponente("acessibilidade", "acessibilidade.html"),

    carregarComponente("vLibras", "vLibras.html"),
  ]);

  // Informa que os carregamentos terminaram
  document.dispatchEvent(new Event("componentesCarregados"));
}

carregarComponentes();
