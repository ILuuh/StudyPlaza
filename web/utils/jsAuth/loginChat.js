const email = emailInput.value.trim();
const senha = passwordInput.value;

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
      login: email,
      password: senha,
    }),
  });

  const resData = await response.json();

  if (!response.ok || resData.message !== "success") {
    throw new Error(resData.message || "E-mail ou senha inválidos.");
  }

  const token = resData.data;
  const usuario = resData.user;

  if (!token || !usuario) {
    throw new Error("Dados de autenticação não encontrados.");
  }

  // Salva o token e os dados do usuário
  localStorage.setItem("studyplaza-token", token);

  localStorage.setItem("studyplaza-user", JSON.stringify(usuario));

  notify("Login realizado com sucesso!", "success");

  // Mantenha aqui o redirecionamento original do login principal,
  // caso ele seja utilizado para outra página do Study Plaza.
  window.location.href = "../web/auth/chat.html";
} catch (error) {
  console.error("Erro ao autenticar:", error);

  notify(error.message || "Não foi possível conectar ao servidor.");
} finally {
  if (submitButton) {
    submitButton.disabled = false;
  }
}
