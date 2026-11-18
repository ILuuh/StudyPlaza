import { URL_API } from "../api/apiconfig.js";

let emailTouched = false;
let passwordTouched = false;

// =====================================================
// MENSAGENS DE VALIDAÇÃO
// =====================================================

function toggleReviewMessage(input, shouldShow, message = "") {
  if (!input) return;

  const reviewId = `${input.id}-review`;
  let span = document.getElementById(reviewId);

  if (!span) {
    span = document.createElement("span");

    span.id = reviewId;
    span.classList.add("error-message", "review-message");

    span.setAttribute("role", "alert");
    span.setAttribute("aria-live", "assertive");

    input.insertAdjacentElement("afterend", span);
  }

  span.textContent = shouldShow ? message : "";
  span.style.display = shouldShow ? "block" : "none";
}

// =====================================================
// VALIDAR EMAIL
// =====================================================

function validateEmail() {
  const input = document.getElementById("input-email");

  if (!input) return false;

  const value = input.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailTouched) return false;

  if (!value) {
    input.classList.add("invalid");
    input.classList.remove("valid");

    toggleReviewMessage(input, true, "O campo E-mail é obrigatório.");

    return false;
  }

  if (!pattern.test(value)) {
    input.classList.add("invalid");
    input.classList.remove("valid");

    toggleReviewMessage(input, true, "Por favor, insira um e-mail válido.");

    return false;
  }

  input.classList.add("valid");
  input.classList.remove("invalid");

  toggleReviewMessage(input, false);

  return true;
}

// =====================================================
// VALIDAR SENHA
// =====================================================

function validatePassword() {
  const input = document.getElementById("input-password");

  if (!input) return false;

  const value = input.value;

  if (!passwordTouched) return false;

  if (!value) {
    input.classList.add("invalid");
    input.classList.remove("valid");

    toggleReviewMessage(input, true, "O campo Senha é obrigatório.");

    return false;
  }

  if (value.length < 6) {
    input.classList.add("invalid");
    input.classList.remove("valid");

    toggleReviewMessage(
      input,
      true,
      "A senha deve ter pelo menos 6 caracteres.",
    );

    return false;
  }

  input.classList.add("valid");
  input.classList.remove("invalid");

  toggleReviewMessage(input, false);

  return true;
}

// =====================================================
// EXIBIR NOTIFICAÇÕES
// =====================================================

function notify(message, type = "error") {
  if (typeof window.showToast === "function") {
    window.showToast(message, type);
  } else {
    alert(message);
  }
}

// =====================================================
// INICIALIZAÇÃO
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("input-email");
  const passwordInput = document.getElementById("input-password");
  const loginForm = document.getElementById("login-form");

  if (!loginForm || !emailInput || !passwordInput) {
    console.error("Elementos do formulário de login não encontrados.");
    return;
  }

  // =================================================
  // EVENTOS DO EMAIL
  // =================================================

  emailInput.addEventListener("focus", () => {
    emailTouched = true;
  });

  emailInput.addEventListener("input", validateEmail);
  emailInput.addEventListener("blur", validateEmail);

  // =================================================
  // EVENTOS DA SENHA
  // =================================================

  passwordInput.addEventListener("focus", () => {
    passwordTouched = true;
  });

  passwordInput.addEventListener("input", validatePassword);
  passwordInput.addEventListener("blur", validatePassword);

  // =================================================
  // ENVIAR LOGIN
  // =================================================

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    emailTouched = true;
    passwordTouched = true;

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      notify("Corrija os erros antes de continuar.");
      return;
    }

    const email = emailInput.value.trim();
    const senha = passwordInput.value;

    // Evita envio duplicado
    const submitButton = loginForm.querySelector('button[type="submit"]');

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
          email: email,
          senha: senha,
        }),
      });

      // Tenta interpretar a resposta da API
      let resData;

      try {
        resData = await response.json();
      } catch {
        throw new Error("O servidor retornou uma resposta inválida.");
      }

      // Aceita resposta em objeto ou array
      const user = Array.isArray(resData) ? resData[0] : resData;

      // Verifica se a autenticação falhou
      if (!response.ok) {
        const message =
          user?.Error ||
          user?.error ||
          user?.message ||
          "E-mail ou senha inválidos.";

        notify(message);
        return;
      }

      if (!user || typeof user !== "object") {
        notify("Não foi possível obter os dados do usuário.");
        return;
      }

      // Verifica se a API retornou um token
      if (user.token) {
        localStorage.setItem("studyplaza-token", user.token);
      }

      // Salva os dados do usuário
      localStorage.setItem("studyplaza-user", JSON.stringify(user));

      notify("Login realizado com sucesso!", "success");

      // Redirecionamento
      window.location.href = "../web/auth/chat.html";
    } catch (error) {
      console.error("Erro ao autenticar:", error);

      notify(error.message || "Não foi possível conectar ao servidor.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
});
