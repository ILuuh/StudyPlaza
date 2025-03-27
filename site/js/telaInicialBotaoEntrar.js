const buttonEntrar = document.querySelector(".botaoEntrar")

if (sessionStorage.getItem("logado") === "true") {
    buttonEntrar.textContent = "Conectado"

} else {
    buttonEntrar.textContent = "Entrar"
}
