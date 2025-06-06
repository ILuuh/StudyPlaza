// Função para limpar mensagens de erro
function clearMessage(id) {
  const errorElem = document.getElementById(id);
  if (errorElem) {
    errorElem.textContent = '';
  }
}

// Validação do campo Nome
function validateName() {
  const nameInput = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  const name = nameInput.value.trim();

  if (name === '') {
    nameInput.classList.add('invalid');
    nameInput.classList.remove('valid');
    nameError.textContent = 'O campo Nome é obrigatório.';
    return false;
  } else {
    nameInput.classList.remove('invalid');
    nameInput.classList.add('valid');
    nameError.textContent = '';
    return true;
  }
}

// Validação do campo E-mail
function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
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
  const passwordInput = document.getElementById('senha');
  const passwordError = document.getElementById('passwordError');
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

// Validação do campo Confirmar Senha
function validateConfirmPassword() {
  const confirmPasswordInput = document.getElementById('confirm-password');
  const confirmPasswordError = document.getElementById('confirmPassword-error');
  const passwordInput = document.getElementById('senha');
  const value = confirmPasswordInput.value.trim();

  if (value === '') {
    confirmPasswordInput.classList.add('invalid');
    confirmPasswordInput.classList.remove('valid');
    confirmPasswordError.textContent = 'O campo Confirmar Senha é obrigatório.';
    return false;
  } else if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.classList.add('invalid');
    confirmPasswordInput.classList.remove('valid');
    confirmPasswordError.textContent = "As senhas não coincidem.";
    return false;
  } else {
    confirmPasswordInput.classList.remove('invalid');
    confirmPasswordInput.classList.add('valid');
    confirmPasswordError.textContent = '';
    return true;
  }
}

// Adiciona event listeners para validação em tempo real
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('senha').addEventListener('blur', validatePassword);
document.getElementById('confirm-password').addEventListener('blur', validateConfirmPassword);

document.getElementById('name').addEventListener('focus', () => clearMessage('nameError'));
document.getElementById('email').addEventListener('focus', () => clearMessage('emailError'));
document.getElementById('senha').addEventListener('focus', () => clearMessage('passwordError'));
document.getElementById('confirm-password').addEventListener('focus', () => clearMessage('confirmPassword-error'));

// Validação no envio do formulário
document.getElementById('register-form').addEventListener('submit', function (e) {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
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


