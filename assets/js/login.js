/*
  login.js
  - Valida os campos do formulário de login
  - Mostra mensagens de erro em português
  - Realiza a autenticação na API
*/

// Flags de interação do usuário
let emailTouched = false;
let passwordTouched = false;

/**
 * Exibe uma mensagem de erro.
 */
function showError(element, message) {
    if (!element) return;

    element.textContent = message;
    element.style.display = message ? "block" : "none";
}

/**
 * Limpa uma mensagem de erro.
 */
function clearError(element) {
    if (!element) return;

    element.textContent = "";
    element.style.display = "none";
}

/**
 * Validação do e-mail
 */
function validateEmail() {
    const emailInput = document.getElementById("input-email");
    const emailError = document.getElementById("email-error");

    // Verifica se os elementos existem antes de utilizá-los
    if (!emailInput) return false;

    // Se ainda não houve interação, não exibe erro
    if (!emailTouched) return false;

    const value = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (value === "") {
        emailInput.classList.add("invalid");
        emailInput.classList.remove("valid");

        showError(
            emailError,
            "O campo E-mail é obrigatório."
        );

        return false;
    }

    if (!emailPattern.test(value)) {
        emailInput.classList.add("invalid");
        emailInput.classList.remove("valid");

        showError(
            emailError,
            "Por favor, insira um e-mail válido."
        );

        return false;
    }

    emailInput.classList.add("valid");
    emailInput.classList.remove("invalid");

    clearError(emailError);

    return true;
}

/**
 * Validação da senha
 */
function validatePassword() {
    const passwordInput = document.getElementById("input-password");
    const passwordError = document.getElementById("password-error");

    // Verifica se o elemento existe antes de utilizá-lo
    if (!passwordInput) return false;

    // Se ainda não houve interação, não exibe erro
    if (!passwordTouched) return false;

    // Não usamos trim() na senha
    const value = passwordInput.value;

    if (value === "") {
        passwordInput.classList.add("invalid");
        passwordInput.classList.remove("valid");

        showError(
            passwordError,
            "O campo Senha é obrigatório."
        );

        return false;
    }

    if (value.length < 6) {
        passwordInput.classList.add("invalid");
        passwordInput.classList.remove("valid");

        showError(
            passwordError,
            "A senha deve ter pelo menos 6 caracteres."
        );

        return false;
    }

    passwordInput.classList.add("valid");
    passwordInput.classList.remove("invalid");

    clearError(passwordError);

    return true;
}


/**
 * Inicialização da página
 */
document.addEventListener("DOMContentLoaded", () => {

    const emailInput = document.getElementById("input-email");
    const passwordInput = document.getElementById("input-password");
    const loginForm = document.getElementById("login-form");

    /*
      Caso a página não possua o formulário,
      o script simplesmente não faz nada.
    */
    if (!loginForm) return;


    /* =========================
       E-MAIL
       ========================= */

    if (emailInput) {

        emailInput.addEventListener("focus", () => {
            emailTouched = true;

            clearError(
                document.getElementById("email-error")
            );
        });

        emailInput.addEventListener("blur", () => {
            validateEmail();
        });

        emailInput.addEventListener("input", () => {
            if (emailTouched) {
                validateEmail();
            }
        });
    }


    /* =========================
       SENHA
       ========================= */

    if (passwordInput) {

        passwordInput.addEventListener("focus", () => {
            passwordTouched = true;

            clearError(
                document.getElementById("password-error")
            );
        });

        passwordInput.addEventListener("blur", () => {
            validatePassword();
        });

        passwordInput.addEventListener("input", () => {
            if (passwordTouched) {
                validatePassword();
            }
        });
    }


    /* =========================
       ENVIO DO FORMULÁRIO
       ========================= */

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        /*
          Ao tentar enviar o formulário,
          consideramos os dois campos como utilizados.
        */
        emailTouched = true;
        passwordTouched = true;

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        /*
          Impede o envio caso exista algum erro.
        */
        if (!isEmailValid || !isPasswordValid) {

            const message =
                "Por favor, corrija os erros antes de enviar o formulário.";

            if (typeof showToast === "function") {
                showToast(message, "error");
            } else {
                alert(message);
            }

            return;
        }


        /*
          Recupera os valores.
          O e-mail pode receber trim().
          A senha NÃO deve receber trim().
        */
        const email = emailInput.value.trim();
        const password = passwordInput.value;


        try {

            const response = await fetch(
                "http://localhost:3500/api/auth",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        senha: password
                    })
                }
            );


            /* =========================
               LOGIN REALIZADO
               ========================= */

            if (response.status === 200) {

                const user = await response.json();

                /*
                  Salva os dados do usuário.
                */
                try {

                    localStorage.setItem(
                        "studyplaza-user",
                        JSON.stringify(user)
                    );

                    /*
                      Só salva o token se ele realmente existir.
                    */
                    if (user.token) {
                        localStorage.setItem(
                            "studyplaza-token",
                            user.token
                        );
                    }

                } catch (storageError) {

                    console.error(
                        "Erro ao salvar dados no localStorage:",
                        storageError
                    );
                }


                if (typeof showToast === "function") {

                    showToast(
                        "Login realizado com sucesso!",
                        "success"
                    );

                }


                /*
                  Redireciona para o painel.
                */
                setTimeout(() => {

                    window.location.href =
                        "./logeed/painel.html";

                }, 600);

                return;
            }


            /* =========================
               E-MAIL OU SENHA INCORRETOS
               ========================= */

            if (response.status === 401) {

                const message =
                    "E-mail ou senha inválidos.";

                if (typeof showToast === "function") {
                    showToast(message, "error");
                } else {
                    alert(message);
                }

                return;
            }


            /* =========================
               OUTROS ERROS
               ========================= */

            const message =
                "Erro ao comunicar com o servidor.";

            if (typeof showToast === "function") {
                showToast(message, "error");
            } else {
                alert(message);
            }

        } catch (error) {

            console.error(
                "Erro ao autenticar:",
                error
            );

            const message =
                "Não foi possível conectar ao servidor.";

            if (typeof showToast === "function") {
                showToast(message, "error");
            } else {
                alert(message);
            }
        }
    });
});