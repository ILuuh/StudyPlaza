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

const botoesPerfil = document.querySelectorAll('.abrirPerfil');
const modalPerfil = document.getElementById('modalPerfil');
const fecharPerfil = document.getElementById('fecharPerfil');

botoesPerfil.forEach(a => {
    a.addEventListener('click', () => {
        modalPerfil.style.display = 'flex';
    });
});

fecharPerfil.addEventListener('click', () => {
    modalPerfil.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modalPerfil) {
        modalPerfil.style.display = 'none';
    }
});

// Fechar modal com a tecla ESC
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modalPerfil.style.display = 'none';
    }
});
