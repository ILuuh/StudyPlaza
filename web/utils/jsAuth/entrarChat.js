document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-login-form");
  const usernameInput = document.getElementById("username");
  const backButton = document.getElementById("back-button");

  if (!form || !usernameInput || !backButton) {
    console.error("Elementos da página de entrada do chat não encontrados.");
    return;
  }

  // Entrada no chat
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = usernameInput.value.trim();

    if (!nome) {
      usernameInput.focus();
      return;
    }

    const usuario = {
      name: nome,
      id: null,
    };

    localStorage.setItem("studyplaza-user", JSON.stringify(usuario));

    // Ajuste conforme a localização real do chat.html.
    window.location.href = "./chat.html";
  });

  // Voltar para a página anterior
  backButton.addEventListener("click", () => {
    history.back();
  });
});
