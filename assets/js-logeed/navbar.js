document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");

  if (!navbar) {
    return;
  }

  fetch("../components/navbarLogeed.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Não foi possível carregar a Navbar.");
      }
      return response.text();
    })
    .then((html) => {
      navbar.innerHTML = html;

      // =========================================================
      // INICIALIZAÇÃO DO MENU (SÓ RODA APÓS A NAVBAR EXISTIR)
      // =========================================================
      const hamburger = document.querySelector(".hamburger");
      const fecharMenu = document.querySelector(".fecharMenu");
      const menu = document.querySelector(".menu");

      if (hamburger && menu) {
        function toggleMenu() {
          menu.classList.toggle("active");
          document.body.classList.toggle("menu-open");
        }

        hamburger.addEventListener("click", toggleMenu);

        if (fecharMenu) {
          fecharMenu.addEventListener("click", toggleMenu);
        }

        // Fecha se clicar no fundo escuro (overlay)
        document.body.addEventListener("click", (e) => {
          if (
            document.body.classList.contains("menu-open") &&
            !menu.contains(e.target) &&
            !hamburger.contains(e.target)
          ) {
            toggleMenu();
          }
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar a Navbar:", error);
    });
});
