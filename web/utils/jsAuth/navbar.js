document.addEventListener("DOMContentLoaded", () => {
  carregarNavbar();
});

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

    const html = await response.text();

    navbar.innerHTML = html;

    // Inicializa os eventos depois de carregar o HTML
    inicializarMenu();
    inicializarLogout();
    inicializarDropdown();
  } catch (error) {
    console.error("Erro ao carregar a Navbar:", error);
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

  function toggleMenu() {
    menu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  }

  hamburger.addEventListener("click", toggleMenu);

  if (fecharMenu) {
    fecharMenu.addEventListener("click", toggleMenu);
  }

  // Fecha o menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (
      document.body.classList.contains("menu-open") &&
      !menu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      toggleMenu();
    }
  });
}

/* =========================================
   LOGOUT
========================================= */

function inicializarLogout() {
  const logoutElements = document.querySelectorAll("#logout-btn, .logout-btn");

  logoutElements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();

      // Limpa os dados da sessão
      localStorage.removeItem("studyplaza-user");
      localStorage.removeItem("studyplaza-token");
      sessionStorage.clear();

      // Limpa cookies acessíveis pelo JavaScript
      document.cookie.split(";").forEach((cookie) => {
        const name = cookie.split("=")[0].trim();

        if (name) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
      });

      const msg =
        typeof getTranslation === "function"
          ? getTranslation("menu.sair.success", "Você saiu da sua conta.")
          : "Você saiu da sua conta.";

      if (typeof showToast === "function") {
        showToast(msg, "success");
      }

      // Retorna à página inicial
      setTimeout(() => {
        window.location.href = "../index.html";
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

  // Abre e fecha o dropdown
  perfilBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!dropdownPerfil.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
}
