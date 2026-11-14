/* ======================================================
   CONFIGURAÇÃO DOS COMPONENTES
====================================================== */

const caminhoComponentes = new URL("../../components/", import.meta.url);

/* ======================================================
   CARREGAR COMPONENTES HTML
====================================================== */

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

/* ======================================================
   LOGOUT
====================================================== */

// Delegação de eventos: funciona mesmo com navbar dinâmica.
document.addEventListener("click", (event) => {
  const botaoLogout = event.target.closest("#logout-btn");

  if (!botaoLogout) return;

  event.preventDefault();

  // Remove os dados da sessão.
  localStorage.removeItem("studyplaza-user");
  localStorage.removeItem("studyplaza-token");

  sessionStorage.clear();

  // Remove cookies acessíveis pelo JavaScript.
  document.cookie.split(";").forEach((cookie) => {
    const nome = cookie.split("=")[0].trim();

    if (nome) {
      document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  });

  // Exibe mensagem de confirmação.
  if (typeof showToast === "function") {
    showToast("Você saiu da sua conta.", "success");
  }

  // Redireciona para a página inicial.
  setTimeout(() => {
    window.location.href = "../../web/index.html";
  }, 350);
});

/* ======================================================
   INICIALIZAÇÃO DOS COMPONENTES
====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  carregarComponente("footer", "footerLogeed.html");
  carregarComponente("navbar", "navbarLogeed.html");
  carregarComponente("vLibras", "vLibras.html");
});
