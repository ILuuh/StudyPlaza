let botaomenu = document.querySelector("header .hamburger");
botaomenu.addEventListener("click", abrirmenu);

let menu = document.querySelector("header .menu");

let botaofecharmenu = document.querySelector(".fecharMenu");
botaofecharmenu.addEventListener("click", fecharmenu);

function abrirmenu() {
    menu.style.right = "0";
}

function fecharmenu() {
    menu.style.right = "-100%";
}
document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.querySelector('a[href="login.html"]');
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
  