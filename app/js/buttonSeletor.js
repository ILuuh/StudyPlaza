const buttonLista = document.querySelectorAll(".menu_botao")

buttonLista.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".selecionado")?.classList.remove("selecionado")
        button.classList.add("selecionado")
    })
});