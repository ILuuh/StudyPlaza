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
    e.preventDefault(); // previne o redirecionamento
    openLogin();

    // Fecha o menu se a resolução for menor ou igual a 600px
    if (window.innerWidth <= 600) {
      menu.style.right = "-100%";
    }
  });

  botaoAbrirLogin.addEventListener("click", (e) => {
    e.preventDefault();
    openLogin();
  });

  closeBtn.addEventListener('click', closeLogin);

  // Fecha clicando no overlay
  overlay.addEventListener('click', closeLogin);

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && formLogin.classList.contains('active')) {
      closeLogin();
    }
  });

  const themeBtn = document.getElementById('themeToggleBtn');
  const isDark = window.location.href.includes('dark');

  // Define ícone inicial
  themeBtn.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';

  themeBtn.addEventListener('click', () => {
    // Alterna entre light e dark
    if (isDark) {
      window.location.href = '../index.html'; // volta para claro
    } else {
      window.location.href = 'darkMode/index.html'; // vai para dark
    }
  });
});
