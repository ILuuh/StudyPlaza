let botaomenu = document.querySelector("header .hamburger");
botaomenu.addEventListener("click", abrirmenu);

let menu = document.querySelector("header .menu");

let botaofecharmenu = document.querySelector(".fecharMenu");
botaofecharmenu.addEventListener("click", fecharmenu);

function abrirmenu() {
  menu.style.right = "0";
  botaomenu.setAttribute("aria-expanded", "true");
}

function fecharmenu() {
  menu.style.right = "-100%";
  botaomenu.setAttribute("aria-expanded", "false");
}

document.addEventListener('DOMContentLoaded', () => {
  const loginLink = document.querySelector('.abrir-login');
  const botaoAbrirLogin = document.getElementById("abrir-login-footer");
  const overlay = document.querySelector('.overlay');
  const formLogin = document.querySelector('.formLogin');
  const closeBtn = document.querySelector('.close-login');

  function openLogin() {
    overlay.classList.add('active');
    formLogin.classList.add('active');
    formLogin.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // trava o scroll da página
  }

  function closeLogin() {
    overlay.classList.remove('active');
    formLogin.classList.remove('active');
    formLogin.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // libera o scroll da página
  }

  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    openLogin();

    if (window.innerWidth <= 600) {
      menu.style.right = "-100%";
    }
  });

  botaoAbrirLogin.addEventListener("click", (e) => {
    e.preventDefault();
    openLogin();
  });

  closeBtn.addEventListener('click', closeLogin);

  overlay.addEventListener('click', closeLogin);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && formLogin.classList.contains('active')) {
      closeLogin();
    }
  });

});

function mostrarAviso() {
  const modal = document.getElementById("mostrarAviso");
  if (!modal) return;
  modal.classList.add("show");

  // Oculta automaticamente após 4 segundos
  setTimeout(() => {
    modal.classList.remove("show");
  }, 4000);
}
