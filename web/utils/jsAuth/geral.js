/* =========================================
   LOGOUT
========================================= */

const logoutElements = document.querySelectorAll("#logout-btn, .logout-btn");

logoutElements.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("studyplaza-user");
    localStorage.removeItem("studyplaza-token");
    sessionStorage.clear();

    const msg =
      typeof getTranslation === "function"
        ? getTranslation("menu.sair.success", "Você saiu da sua conta.")
        : "Você saiu da sua conta.";

    if (typeof showToast === "function") {
      showToast(msg, "success");
    }

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 350);
  });
});

/* =========================================
   DROPDOWN DO PERFIL
========================================= */

const perfilBtn = document.querySelector(".perfil-btn");
const dropdown = document.querySelector(".dropdown-conteudo");
const perfilContainer = document.querySelector(".dropdown-perfil");

// Só executa se os elementos existirem
if (perfilBtn && dropdown && perfilContainer) {
  // Abre e fecha o dropdown
  perfilBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!perfilContainer.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
}
