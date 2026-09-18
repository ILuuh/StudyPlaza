// ======================================================
// ALTERAÇÃO DE TEMA
// ======================================================

// ------------------------------------------------------
// APLICA O TEMA SALVO AO CARREGAR A PÁGINA
// ------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    const temaSalvo = localStorage.getItem("theme") || "light";

    aplicarTema(temaSalvo);

});


// ------------------------------------------------------
// CLIQUE NO BOTÃO DE TEMA
// ------------------------------------------------------
// A delegação de eventos perqmite que o botão funcione
// mesmo quando ele é inserido posteriormente na Navbar.
// ------------------------------------------------------

document.addEventListener("click", (evento) => {

    const botaoTema = evento.target.closest("#theme-toggle");

    // Se o clique não foi no botão de tema, não faz nada
    if (!botaoTema) {
        return;
    }

    // Descobre o tema atual
    const temaAtual =
        document.documentElement.getAttribute("data-bs-theme");

    // Define o próximo tema
    const novoTema =
        temaAtual === "dark"
            ? "light"
            : "dark";

    aplicarTema(novoTema);

});


// ------------------------------------------------------
// FUNÇÃO PARA APLICAR O TEMA
// ------------------------------------------------------

function aplicarTema(tema) {

    // Aplica o tema utilizando o Bootstrap
    document.documentElement.setAttribute(
        "data-bs-theme",
        tema
    );

    // Salva a preferência
    localStorage.setItem("theme", tema);


    // --------------------------------------------------
    // ATUALIZAR ÍCONE
    // --------------------------------------------------

    const iconeTema = document.getElementById("theme-icon");

    // Verifica se o ícone existe
    if (!iconeTema) {
        return;
    }

    if (tema === "dark") {

        iconeTema.textContent = "🌙";

    } else {

        iconeTema.textContent = "☀️";

    }
}