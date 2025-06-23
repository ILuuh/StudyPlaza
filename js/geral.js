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
});

const toggle = document.getElementById('themeToggle');
const currentUrl = window.location.href;

// Detectar tema atual com base na URL
if (currentUrl.includes('DarkMode/index.html')) {
  toggle.checked = true;
}

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    // Vai para a versão escura
    window.location.href = 'DarkMode/index.html';
  } else {
    // Volta para a versão clara
    window.location.href = '/index.html';
  }
});

