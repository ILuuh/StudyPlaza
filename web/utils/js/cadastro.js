
import { URL_API } from "../api/apiconfig.js";

// =====================================================
// CONFIGURAÇÕES
// =====================================================

const API_URL = `${URL_API.replace(/\/$/, "")}/auth/register`;

const form = document.getElementById("register-form");
const formError = document.getElementById("form-error");

// =====================================================
// FUNÇÕES AUXILIARES
// =====================================================

// Limpa uma mensagem de erro.
function clearMessage(id) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = "";
  }
}

// Exibe ou oculta a mensagem de revisão de um campo.
function toggleReviewMessage(input, shouldShow, message = "") {
  if (!input) return;

  const reviewId = `${input.id}-review`;
  let reviewSpan = document.getElementById(reviewId);

  if (!reviewSpan) {
    reviewSpan = document.createElement("span");
    reviewSpan.id = reviewId;
    reviewSpan.classList.add("error-message", "review-message");

    reviewSpan.setAttribute("role", "alert");
    reviewSpan.setAttribute("aria-live", "assertive");
  }

  reviewSpan.textContent = shouldShow ? message : "";
  reviewSpan.style.display = shouldShow ? "block" : "none";

  const insertionTarget =
    input.closest(".password-wrapper") || input;

  insertionTarget.insertAdjacentElement("afterend", reviewSpan);
}

// Atualiza o estado visual do campo.
function setFieldState(input, errorElement, message) {
  if (!input) return false;

  const isValid = !message;

  input.classList.toggle("valid", isValid);
  input.classList.toggle("invalid", !isValid);

  if (errorElement) {
    errorElement.textContent = message;
  }

  toggleReviewMessage(input, !isValid, message);

  return isValid;
}

// =====================================================
// VALIDAÇÃO DOS CAMPOS
// =====================================================

// Valida o nome.
function validateName() {
  const input = document.getElementById("name");
  const error = document.getElementById("nameError");

  if (!input) return false;

  const value = input.value.trim();

  if (!value) {
    return setFieldState(
      input,
      error,
      "O campo Nome é obrigatório."
    );
  }

  return setFieldState(input, error, "");
}

// Valida o e-mail.
function validateEmail() {
  const input = document.getElementById("email");
  const error = document.getElementById("emailError");

  if (!input) return false;

  const value = input.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!value) {
    return setFieldState(
      input,
      error,
      "O campo E-mail é obrigatório."
    );
  }

  if (!emailPattern.test(value)) {
    return setFieldState(
      input,
      error,
      "Por favor, insira um e-mail válido."
    );
  }

  return setFieldState(input, error, "");
}

// Valida a senha.
function validatePassword() {
  const input = document.getElementById("senha");
  const error = document.getElementById("passwordError");

  if (!input) return false;

  // Não utilizar trim() na senha.
  const value = input.value;

  if (!value) {
    return setFieldState(
      input,
      error,
      "O campo Senha é obrigatório."
    );
  }

  if (value.length < 6) {
    return setFieldState(
      input,
      error,
      "A senha deve ter pelo menos 6 caracteres."
    );
  }

  return setFieldState(input, error, "");
}

// Valida a confirmação da senha.
function validateConfirmPassword() {
  const input = document.getElementById("confirm-password");
  const error = document.getElementById("confirmPassword-error");
  const passwordInput = document.getElementById("senha");

  if (!input || !passwordInput) return false;

  if (!input.value) {
    return setFieldState(
      input,
      error,
      "O campo Confirmar Senha é obrigatório."
    );
  }

  if (input.value !== passwordInput.value) {
    return setFieldState(
      input,
      error,
      "As senhas não coincidem."
    );
  }

  return setFieldState(input, error, "");
}

// =====================================================
// EVENTOS DOS CAMPOS
// =====================================================

const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const senhaEl = document.getElementById("senha");
const confirmEl = document.getElementById("confirm-password");

// Validação ao sair do campo.
nameEl?.addEventListener("blur", validateName);
emailEl?.addEventListener("blur", validateEmail);
senhaEl?.addEventListener("blur", () => {
  validatePassword();

  // Atualiza a confirmação caso a senha tenha mudado.
  if (confirmEl?.value) {
    validateConfirmPassword();
  }
});
confirmEl?.addEventListener("blur", validateConfirmPassword);

// Limpa mensagens ao entrar no campo.
nameEl?.addEventListener("focus", () => {
  clearMessage("nameError");
  toggleReviewMessage(nameEl, false);
});

emailEl?.addEventListener("focus", () => {
  clearMessage("emailError");
  toggleReviewMessage(emailEl, false);
});

senhaEl?.addEventListener("focus", () => {
  clearMessage("passwordError");
  toggleReviewMessage(senhaEl, false);
});

confirmEl?.addEventListener("focus", () => {
  clearMessage("confirmPassword-error");
  toggleReviewMessage(confirmEl, false);
});

// =====================================================
// NOTIFICAÇÕES (TOAST)
// =====================================================

function showToast(message, type = "success", duration = 3000) {
  if (!message) return;

  let container = document.querySelector(".toast-container");

  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");

  toast.className = `toast ${type}`;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.textContent = message;

  container.appendChild(toast);

  // Ativa a animação.
  window.getComputedStyle(toast).opacity;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 250);
  }, duration);
}

// =====================================================
// ENVIO DO FORMULÁRIO
// =====================================================

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.dataset.submitting === "true") return;

    if (formError) {
      formError.textContent = "";
    }

    // Executa todas as validações.
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    // Impede o envio caso exista algum erro.
    if (
      !isNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmValid
    ) {
      if (formError) {
        formError.textContent =
          "Por favor, corrija os erros antes de enviar o formulário.";
      }

      return;
    }

    // Obtém os dados dos campos.
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const senha = senhaEl.value;

    // Dados enviados para a API.
    const payload = {
      name: name,
      login: email,
      password: senha
    };

    const submitButton = form.querySelector(
      'button[type="submit"], input[type="submit"]'
    );

    try {
      form.dataset.submitting = "true";

      if (submitButton) {
        submitButton.disabled = true;
      }

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => null);

      // Verifica se a API retornou algum erro.
      if (!response.ok) {
        if (formError) {
          formError.textContent =
            result?.mensagem ||
            result?.message ||
            "Erro ao realizar cadastro. Tente novamente.";
        }

        return;
      }

      console.log("Usuário cadastrado:", result);

      showToast("Cadastro realizado com sucesso!", "success");

      form.reset();

      // Remove os estados visuais após limpar o formulário.
      form.querySelectorAll(".valid, .invalid").forEach((element) => {
        element.classList.remove("valid", "invalid");
      });

      // Redireciona após permitir a exibição da notificação.
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 1200);

    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);

      if (formError) {
        formError.textContent =
          "Não foi possível conectar ao servidor. Tente novamente.";
      }

    } finally {
      form.dataset.submitting = "false";

      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
