document.addEventListener("DOMContentLoaded", () => {

    const head = document.getElementById("head");

    if (!head) {
        return;
    }

    fetch("./components/head.html")
        .then(response => {

            if (!response.ok) {
                throw new Error("Não foi possível carregar o Head.");
            }

            return response.text();
        })
        .then(html => {

            head.innerHTML = html;

        })
        .catch(error => {
            console.error("Erro ao carregar o Head:", error);
        });

});