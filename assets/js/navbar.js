document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.getElementById("navbar");

    if (!navbar) {
        return;
    }

    fetch("./components/navbar.html")
        .then(response => {

            if (!response.ok) {
                throw new Error("Não foi possível carregar a Navbar.");
            }

            return response.text();
        })
        .then(html => {

            navbar.innerHTML = html;

        })
        .catch(error => {
            console.error("Erro ao carregar a Navbar:", error);
        });

});