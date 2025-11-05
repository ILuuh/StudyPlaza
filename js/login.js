function getTranslation(key, fallback) {
  return window.translationSystem?.getTranslation(key) || fallback;
}

let emailTouched = false;
let passwordTouched = false;

function validateEmail() {
  const emailInput = document.getElementById('input-email');
  const emailError = document.getElementById('email-error');
  const email = document.getElementById('email-invalid');
  const value = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailTouched) return;

  if (value === '') {
    emailError.textContent = getTranslation('login.error-message.email', 'O campo E-mail é obrigatório.');
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    emailError.style.display = 'block';
    return false;
  } else if (!emailPattern.test(value)) {
    emailError.textContent = getTranslation('login.invalid-message.email', 'Por favor, insira um e-mail válido.');
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    emailError.style.display = 'block';
    return false;
  } else {
    emailError.textContent = '';
    emailInput.classList.add('valid');
    emailInput.classList.remove('invalid');
    return true;
  }
}

function validatePassword() {
  const passwordInput = document.getElementById('input-password');
  const passwordError = document.getElementById('password-error');
  const value = passwordInput.value.trim();

  if (!passwordTouched) return;

  if (value === '') {
    passwordError.textContent = getTranslation('login.error-message.password', 'O campo Senha é obrigatório.');
    passwordInput.classList.add('invalid');
    passwordInput.classList.remove('valid');
    passwordError.style.display = 'block';
    return false;
  } else if (value.length < 6) {
    passwordError.textContent = getTranslation('login.invalid-message.password', 'A senha deve ter pelo menos 6 caracteres.');
    passwordInput.classList.add('invalid');
    passwordInput.classList.remove('valid');
    passwordError.style.display = 'block';
    return false;
  } else {
    passwordError.textContent = '';
    passwordInput.classList.add('valid');
    passwordInput.classList.remove('invalid');
    return true;
  }
}

const emailInput = document.getElementById('input-email');
const passwordInput = document.getElementById('input-password');

emailInput.addEventListener('focus', () => { emailTouched = true; clearMessage('email-error'); });
passwordInput.addEventListener('focus', () => { passwordTouched = true; clearMessage('password-error'); });

emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('blur', validatePassword);

// Validação no envio do formulário
document.getElementById("login-form").addEventListener("submit", function (e) {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  function mostrarAviso() {
    const modal = document.getElementById("mostrarAviso");
    if (!modal) return;
    modal.classList.add("show");

    // Oculta automaticamente após 4 segundos
    setTimeout(() => {
      modal.classList.remove("show");
    }, 4000);
  }

  if (!isEmailValid || !isPasswordValid) {
    e.preventDefault();
    alert("Por favor, corrija os erros antes de enviar o formulário.");
  } else {
    alert("Formulário enviado com sucesso!");
  }
});