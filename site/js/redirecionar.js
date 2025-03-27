function redirecionar(caminho, menssagem, caminhoPara) {
    switch (menssagem) {
        case "Login":
            sessionStorage.setItem("logado", true)

            break

        case "LogOut":
            sessionStorage.setItem("logado", false)

            break

        case "Entrar":
            if (sessionStorage.getItem("logado") === "true") {
                window.location.href = caminhoPara

            } else {
                window.location.href = caminho
            }

            return
    }

    window.location.href = caminho
}
