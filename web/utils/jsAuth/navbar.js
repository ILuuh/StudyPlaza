/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener("DOMContentLoaded", carregarNavbar);

/* =========================================
   CARREGAR NAVBAR
========================================= */

async function carregarNavbar() {
  const navbar = document.getElementById("navbar");

  if (!navbar) return;

  try {
    const response = await fetch("../components/navbarLogeed.html");

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    navbar.innerHTML = await response.text();

    // Inicializa os eventos após carregar a navbar
    inicializarMenu();
    inicializarLogout();
    inicializarDropdown();
  } catch (error) {
    console.error("Erro ao carregar a navbar:", error);
  }
}

/* =========================================
   MENU HAMBÚRGUER
========================================= */

function inicializarMenu() {
  const hamburger = document.querySelector(".hamburger");
  const fecharMenu = document.querySelector(".fecharMenu");
  const menu = document.querySelector(".menu");

  if (!hamburger || !menu) return;

  function fechar() {
    menu.classList.remove("active");
    document.body.classList.remove("menu-open");

    hamburger.setAttribute("aria-expanded", "false");
  }

  function alternar() {
    const aberto = menu.classList.toggle("active");

    document.body.classList.toggle("menu-open", aberto);

    hamburger.setAttribute("aria-expanded", String(aberto));
  }

  hamburger.addEventListener("click", alternar);

  fecharMenu?.addEventListener("click", fechar);

  // Fecha ao clicar fora do menu
  document.addEventListener("click", (event) => {
    if (
      menu.classList.contains("active") &&
      !menu.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      fechar();
    }
  });

  // Fecha ao pressionar ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      fechar();
    }
  });
}

/* =========================================
   LOGOUT
========================================= */

function inicializarLogout() {
  const logoutElements = document.getElementById("logout-btn");
  console.log(logoutElements);

  logoutElements.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();

      // Remove os dados da sessão
      localStorage.removeItem("studyplaza-user");
      localStorage.removeItem("studyplaza-token");

      sessionStorage.clear();

      // Remove cookies acessíveis pelo JavaScript
      document.cookie.split(";").forEach((cookie) => {
        const nome = cookie.split("=")[0].trim();

        if (nome) {
          document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        }
      });

      // Mensagem de confirmação
      const mensagem = "Você saiu da sua conta.";

      if (typeof showToast === "function") {
        showToast(mensagem, "success");
      }

      // Redireciona para a página inicial
      setTimeout(() => {
        window.location.href = "../../web/index.html";
      }, 350);
    });
  });
}

/* =========================================
   DROPDOWN DO PERFIL
========================================= */

function inicializarDropdown() {
  const perfilBtn = document.querySelector(".perfil-btn");
  const dropdown = document.querySelector(".dropdown-conteudo");
  const dropdownPerfil = document.querySelector(".dropdown-perfil");

  if (!perfilBtn || !dropdown || !dropdownPerfil) return;

  function fecharDropdown() {
    dropdown.classList.remove("active");
    perfilBtn.setAttribute("aria-expanded", "false");
  }

  function alternarDropdown() {
    const aberto = dropdown.classList.toggle("active");

    perfilBtn.setAttribute("aria-expanded", String(aberto));
  }

  perfilBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    alternarDropdown();
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (event) => {
    if (!dropdownPerfil.contains(event.target)) {
      fecharDropdown();
    }
  });

  // Fecha ao pressionar ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      fecharDropdown();
    }
  });
}
