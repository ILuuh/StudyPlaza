async function carregarPagina() {
  try {
    const response = await fetch("../components/footerLogeed.html");
    const footer = document.getElementById("footer");

    // Verifica se a requisição foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    if (response.ok) {
      // Captura o conteúdo HTML da página
      const html = await response.text();
      footer.innerHTML = html;
    }
  } catch (error) {
    console.error("Erro ao carregar página:", error);
  }
}

carregarPagina();
