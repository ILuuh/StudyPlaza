import { URL_API } from "../api/apiconfig.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-login-form");
  const loginInput = document.getElementById("login");
  const passwordInput = document.getElementById("password");
  const backButton = document.getElementById("back-button");
  const messageElement = document.getElementById("login-message");

  if (!form || !loginInput || !passwordInput || !backButton) {
    console.error("Elementos da página de entrada do chat não encontrados.");
    return;
  }

  function showMessage(message, type = "error") {
    if (messageElement) {
      messageElement.textContent = message;
      messageElement.className = type;
    } else {
      alert(message);
    }
  }

  // LOGIN COM A CONTA DO STUDY PLAZA
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const login = loginInput.value.trim();
    const password = passwordInput.value;

    if (!login || !password) {
      showMessage("Preencha seu login e sua senha.");
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const response = await fetch(`${URL_API}/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });

      const resData = await response.json();

      if (!response.ok || resData.message !== "success") {
        throw new Error(resData.message || "Login ou senha incorretos.");
      }

      // O backend retorna o JWT em data
      const token = resData.data;
      const usuario = resData.user;

      if (!token || !usuario || !usuario.id) {
        throw new Error("A API não retornou os dados necessários.");
      }

      // Mantém o mesmo padrão de sessão do Study Plaza
      localStorage.setItem("studyplaza-token", token);

      localStorage.setItem("studyplaza-user", JSON.stringify(usuario));

      showMessage("Login realizado! Entrando no chat...", "success");

      // Redireciona para o chat
      window.location.href = "./chat.html";
    } catch (error) {
      console.error("Erro ao entrar no Study Chat:", error);

      showMessage(error.message || "Não foi possível conectar ao servidor.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });

  // VOLTAR
  backButton.addEventListener("click", () => {
    // Redireciona para o chat
    window.location.href = "./painel.html";
  });
});
