// Função para limpar mensagens de erro
function clearMessage(id) {
  const errorElem = document.getElementById(id);
  errorElem.textContent = '';
}

// Validação do campo Nome
function validateName() {
  const name = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  const value = name.value.trim();

  if (value === '') {
    name.classList.add('invalid');
    name.classList.remove('valid');
    nameError.textContent = 'O campo Nome é obrigatório.';
    return false;
  } else {
    name.classList.remove('invalid');
    name.classList.add('valid');
    nameError.textContent = '';
    return true;
  }
}

// Validação do campo E-mail
function validateEmail() {
  const email = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const value = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === '') {
    email.classList.add('invalid');
    email.classList.remove('valid');
    emailError.textContent = 'O campo E-mail é obrigatório.';
    return false;
  } else if (!emailPattern.test(value)) {
    email.classList.add('invalid');
    email.classList.remove('valid');
    emailError.textContent = 'Por favor, insira um e-mail válido.';
    return false;
  } else {
    email.classList.remove('invalid');
    email.classList.add('valid');
    emailError.textContent = '';
    return true;
  }
}

// Validação do campo Senha
function validatePassword() {
  const password = document.getElementById('senha');
  const passwordError = document.getElementById('passwordError');
  const value = password.value.trim();

  if (value === '') {
    password.classList.add('invalid');
    password.classList.remove('valid');
    passwordError.textContent = 'O campo Senha é obrigatório.';
    return false;
  } else if (value.length < 6) {
    password.classList.add('invalid');
    password.classList.remove('valid');
    passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    return false;
  } else {
    password.classList.remove('invalid');
    password.classList.add('valid');
    passwordError.textContent = '';
    return true;
  }
}

// Adiciona event listeners para validação em tempo real
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('senha').addEventListener('blur', validatePassword);

document.getElementById('name').addEventListener('focus', () => clearMessage('nameError'));
document.getElementById('email').addEventListener('focus', () => clearMessage('emailError'));
document.getElementById('senha').addEventListener('focus', () => clearMessage('passwordError'));

// Validação no envio do formulário
document.getElementById('contactForm').addEventListener('submit', function (e) {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (!isNameValid || !isEmailValid || !isPasswordValid) {
    e.preventDefault();
    alert('Por favor, corrija os erros antes de enviar o formulário.');
  } else {
    alert('Formulário enviado com sucesso!');
  }
});
