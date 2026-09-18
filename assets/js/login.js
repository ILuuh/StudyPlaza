/*
  login.js
  - Validação do formulário de login
  - Comunicação com a API
  - Armazenamento dos dados do usuário
*/

document.addEventListener("DOMContentLoaded", () => {
  // =====================================================
  // SELETORES
  // =====================================================

  const loginForm = document.getElementById("login-form");

  const emailInput = document.getElementById("input-email");

  const passwordInput = document.getElementById("input-password");

  const emailError = document.getElementById("email-error");

  const passwordError = document.getElementById("password-error");

  const formError = document.getElementById("form-error");


  // =====================================================
  // IMPORTAÇÃO DO MODAL
  // =====================================================

  const loginModal = document.getElementById("loginModal");

  if (!loginModal) {
    return;
  }

  fetch("./components/loginModal.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Não foi possível carregar a Navbar.");
      }

      return response.text();
    })
    .then((html) => {
      loginModal.innerHTML = html;
    })
    .catch((error) => {
      console.error("Erro ao carregar a o modal Login:", error);
    });

  // =====================================================
  // VERIFICAÇÃO
  // =====================================================

  if (!loginForm) {
    return;
  }

  // =====================================================
  // FUNÇÕES DE ERRO
  // =====================================================

  function showError(element, message) {
    if (!element) return;

    element.textContent = message;

    element.classList.add("active");
  }

  function clearError(element) {
    if (!element) return;

    element.textContent = "";

    element.classList.remove("active");
  }

  // =====================================================
  // VALIDAÇÃO DO E-MAIL
  // =====================================================

  function validateEmail() {
    if (!emailInput) return false;

    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (email === "") {
      emailInput.classList.add("invalid");
      emailInput.classList.remove("valid");

      showError(emailError, "O campo E-mail é obrigatório.");

      return false;
    }

    if (!emailPattern.test(email)) {
      emailInput.classList.add("invalid");
      emailInput.classList.remove("valid");

      showError(emailError, "Por favor, insira um e-mail válido.");

      return false;
    }

    emailInput.classList.add("valid");
    emailInput.classList.remove("invalid");

    clearError(emailError);

    return true;
  }

  // =====================================================
  // VALIDAÇÃO DA SENHA
  // =====================================================

  function validatePassword() {
    if (!passwordInput) return false;

    const password = passwordInput.value;

    if (password === "") {
      passwordInput.classList.add("invalid");
      passwordInput.classList.remove("valid");

      showError(passwordError, "O campo Senha é obrigatório.");

      return false;
    }

    if (password.length < 6) {
      passwordInput.classList.add("invalid");
      passwordInput.classList.remove("valid");

      showError(passwordError, "A senha deve ter pelo menos 6 caracteres.");

      return false;
    }

    passwordInput.classList.add("valid");
    passwordInput.classList.remove("invalid");

    clearError(passwordError);

    return true;
  }

  // =====================================================
  // VALIDAÇÃO AO DIGITAR
  // =====================================================

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      validateEmail();
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", () => {
      validatePassword();
    });
  }

  // =====================================================
  // ENVIO
  // =====================================================

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    clearError(formError);

    const emailValid = validateEmail();

    const passwordValid = validatePassword();

    if (!emailValid || !passwordValid) {
      showError(formError, "Por favor, corrija os erros antes de continuar.");

      return;
    }

    const email = emailInput.value.trim();

    const password = passwordInput.value;

    // =================================================
    // API
    // =================================================

    try {
      const response = await fetch("http://localhost:3500/api/auth", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
          senha: password,
        }),
      });

      if (response.ok) {
        const user = await response.json();

        localStorage.setItem("studyplaza-user", JSON.stringify(user));

        if (user.token) {
          localStorage.setItem("studyplaza-token", user.token);
        }

        window.location.href = "logeed/painel.html";

        return;
      }

      if (response.status === 401) {
        showError(formError, "Email ou senha inválidos.");

        return;
      }

      showError(formError, "Erro ao realizar o login.");
    } catch (error) {
      console.error("Erro ao autenticar:", error);

      showError(formError, "Não foi possível conectar ao servidor.");
    }
  });
});
