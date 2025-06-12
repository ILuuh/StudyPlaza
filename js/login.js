// Função para limpar mensagens de erro
function clearMessage(id) {
  const errorElem = document.getElementById(id);
  if (errorElem) {
    errorElem.textContent = '';
  }
}

// Validação do campo E-mail
function validateEmail() {
  const emailInput = document.getElementById('input-email');
  const emailError = document.getElementById('email-error');
  const value = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === '') {
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    emailError.textContent = 'O campo E-mail é obrigatório.';
    return false;
  } else if (!emailPattern.test(value)) {
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    emailError.textContent = 'Por favor, insira um e-mail válido.';
    return false;
  } else {
    emailInput.classList.remove('invalid');
    emailInput.classList.add('valid');
    emailError.textContent = '';
    return true;
  }
}

// Validação do campo Senha
function validatePassword() {
  const passwordInput = document.getElementById('input-password');
  const passwordError = document.getElementById('password-error');
  const value = passwordInput.value.trim();

  if (value === '') {
    passwordInput.classList.add('invalid');
    passwordInput.classList.remove('valid');
    passwordError.textContent = 'O campo Senha é obrigatório.';
    return false;
  } else if (value.length < 6) {
    passwordInput.classList.add('invalid');
    passwordInput.classList.remove('valid');
    passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    return false;
  } else {
    passwordInput.classList.remove('invalid');
    passwordInput.classList.add('valid');
    passwordError.textContent = '';
    return true;
  }
}

// Adiciona event listeners para validação em tempo real
document.getElementById('input-email').addEventListener('blur', validateEmail);
document.getElementById('input-password').addEventListener('blur', validatePassword);

document.getElementById('input-email').addEventListener('focus', () => clearMessage('email-error'));
document.getElementById('input-password').addEventListener('focus', () => clearMessage('password-error'));

// Validação no envio do formulário
document.getElementById('login-form').addEventListener('submit', function (e) {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (!isEmailValid || !isPasswordValid) {
    e.preventDefault();
    alert('Por favor, corrija os erros antes de enviar o formulário.');
  } else {
    alert('Formulário enviado com sucesso!');
  }
});

document.querySelectorAll('.toggle-password').forEach(button => {
  button.addEventListener('click', () => {
    const input = button.previousElementSibling;
    const icon = button.querySelector('i');

    const isPassword = input.type === 'password';

    input.type = isPassword ? 'text' : 'password';
    icon.classList.toggle('fa-eye', !isPassword);
    icon.classList.toggle('fa-eye-slash', isPassword);
    button.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
  });
});