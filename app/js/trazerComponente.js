const appIndexContainer = document.getElementsByClassName("container")[0]
let componenteAtual = null

function checaSeOComponenteJaExiste(novoComponente) {
    if (componenteAtual) {
        if (componenteAtual.innerText.replace(/\s/g, "") === novoComponente.innerText.replace(/\s/g, "")) {
            return true
        }
    }
}

async function trazerComponente(caminhoDaPaginaAlvo) {
    try {
        const resposta = await fetch(caminhoDaPaginaAlvo);
        const texto = await resposta.text();

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = texto;

        const novoComponente = tempDiv.querySelector(".sourceContainer");

        //Checando se o componente já está carregado
        let jaExiste = checaSeOComponenteJaExiste(novoComponente)

        if (jaExiste) {
            return

        } else {
            //Se não estiver carregado, remove o atual
            appIndexContainer.removeChild(appIndexContainer.firstChild)
        }

        if (novoComponente && appIndexContainer) {
            appIndexContainer.innerHTML = novoComponente.outerHTML;

            componenteAtual = novoComponente

        } else {
            console.error("Elemento '.sourceContainer' ou '.container' não encontrado.");
        }

    } catch (error) {
        console.error('Erro ao carregar o conteúdo:', error);
    }
}