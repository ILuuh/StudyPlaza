//-------------------------------Menu------------------------------------------

let menu = document.querySelector("header .menu");

let botaofecharmenu = document.querySelector(".fecharMenu");
botaofecharmenu.addEventListener("click", fecharmenu);

function abrirmenu() {
  menu.style.right = "0";
  botaomenu.setAttribute("aria-expanded", "true");
}

function fecharmenu() {
  menu.style.right = "-100%";
  botaomenu.setAttribute("aria-expanded", "false");
}

//---------------------Formulário de cadastro---------------------------------

// Função para limpar mensagens de erro
function clearMessage(id) {
  const errorElem = document.getElementById(id);
  if (errorElem) {
    errorElem.textContent = '';
  }
}

function getTranslation(key, fallback) {
  return window.translationSystem?.getTranslation(key) || fallback;
}

function toggleReviewMessage(inputElement, shouldShow, messageKey = 'validation.review-field', fallback = 'revise o campo') {
  if (!inputElement) return;

  const reviewId = `${inputElement.id}-review`;
  let reviewSpan = document.getElementById(reviewId);
  const insertionTarget = inputElement.closest('.password-wrapper') || inputElement;

  if (!reviewSpan) {
    reviewSpan = document.createElement('span');
    reviewSpan.id = reviewId;
    reviewSpan.classList.add('error-message', 'review-message');
    reviewSpan.setAttribute('role', 'alert');
    reviewSpan.setAttribute('aria-live', 'assertive');
  }

  if (shouldShow) {
    if (messageKey) {
      reviewSpan.setAttribute('data-translate', messageKey);
      reviewSpan.textContent = getTranslation(messageKey, fallback);
    } else {
      reviewSpan.removeAttribute('data-translate');
      reviewSpan.textContent = fallback;
    }
  }

  insertionTarget.insertAdjacentElement('afterend', reviewSpan);
  reviewSpan.style.display = shouldShow ? 'block' : 'none';
}

// Validação do campo Nome
function validateName() {
  const nameInput = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  const name = nameInput.value.trim();

  if (name === '') {
    nameInput.classList.add('invalid');
    nameInput.classList.remove('valid');
    nameError.textContent = getTranslation('cadastro.error-message.name', 'O campo Nome é obrigatório.');
    toggleReviewMessage(nameInput, true, 'cadastro.error-message.name', 'O campo Nome é obrigatório.');
    return false;
  } else {
    nameInput.classList.remove('invalid');
    nameInput.classList.add('valid');
    nameError.textContent = '';
    toggleReviewMessage(nameInput, false);
    return true;
  }
}

// Validação do campo E-mail
function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const value = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (value === '') {
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    emailError.textContent = getTranslation('cadastro.error-message.email', 'O campo E-mail é obrigatório.');
    toggleReviewMessage(emailInput, true, 'cadastro.error-message.email', 'O campo E-mail é obrigatório.');
    return false;
  } else if (!emailPattern.test(value)) {
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    emailError.textContent = getTranslation('cadastro.invalid-message.email', 'Por favor, insira um e-mail válido.');
    toggleReviewMessage(emailInput, true, 'cadastro.invalid-message.email', 'Por favor, insira um e-mail válido.');
    return false;
  } else {
    emailInput.classList.remove('invalid');
    emailInput.classList.add('valid');
    emailError.textContent = '';
    toggleReviewMessage(emailInput, false);
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
    passwordError.textContent = getTranslation('cadastro.error-message.password', 'O campo Senha é obrigatório.');
    toggleReviewMessage(passwordInput, true, 'cadastro.error-message.password', 'O campo Senha é obrigatório.');
    return false;
  } else if (value.length < 6) {
    passwordInput.classList.add('invalid');
    passwordInput.classList.remove('valid');
    passwordError.textContent = getTranslation('cadastro.invalid-message.password', 'A senha deve ter pelo menos 6 caracteres.');
    toggleReviewMessage(passwordInput, true, 'cadastro.invalid-message.password', 'A senha deve ter pelo menos 6 caracteres.');
    return false;
  } else {
    passwordInput.classList.remove('invalid');
    passwordInput.classList.add('valid');
    passwordError.textContent = '';
    toggleReviewMessage(passwordInput, false);
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
    confirmPasswordError.textContent = getTranslation('cadastro.error-message.confirm-password', 'O campo Confirmar Senha é obrigatório.');
    toggleReviewMessage(confirmPasswordInput, true, 'cadastro.error-message.confirm-password', 'O campo Confirmar Senha é obrigatório.');
    return false;
  } else if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.classList.add('invalid');
    confirmPasswordInput.classList.remove('valid');
    confirmPasswordError.textContent = getTranslation('cadastro.invalid-message.confirm-password', 'As senhas não coincidem.');
    toggleReviewMessage(confirmPasswordInput, true, 'cadastro.invalid-message.confirm-password', 'As senhas não coincidem.');
    return false;
  } else {
    confirmPasswordInput.classList.remove('invalid');
    confirmPasswordInput.classList.add('valid');
    confirmPasswordError.textContent = '';
    toggleReviewMessage(confirmPasswordInput, false);
    return true;
  }
}

// Adiciona event listeners para validação em tempo real
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('senha').addEventListener('blur', validatePassword);
document.getElementById('confirm-password').addEventListener('blur', validateConfirmPassword);

document.getElementById('name').addEventListener('focus', () => {
  clearMessage('nameError');
  toggleReviewMessage(document.getElementById('name'), false);
});
document.getElementById('email').addEventListener('focus', () => {
  clearMessage('emailError');
  toggleReviewMessage(document.getElementById('email'), false);
});
document.getElementById('senha').addEventListener('focus', () => {
  clearMessage('passwordError');
  toggleReviewMessage(document.getElementById('senha'), false);
});
document.getElementById('confirm-password').addEventListener('focus', () => {
  clearMessage('confirmPassword-error');
  toggleReviewMessage(document.getElementById('confirm-password'), false);
});

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

//---------------------------Abrir modal login---------------------------------------------


document.addEventListener('DOMContentLoaded', () => {
  const loginLink = document.getElementById('abrir-login');
  const overlay = document.querySelector('.overlay');
  const formLogin = document.querySelector('.formLogin');
  const closeBtn = document.querySelector('.close-login');

  function openLogin() {
    overlay.classList.add('active');
    formLogin.classList.add('active');
    formLogin.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // trava o scroll da página
  }

  function closeLogin() {
    overlay.classList.remove('active');
    formLogin.classList.remove('active');
    formLogin.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // libera o scroll da página
  }

  loginLink.addEventListener('click', (e) => {
    e.preventDefault(); // previne o redirecionamento
    openLogin();

    // Fecha o menu se a resolução for menor ou igual a 600px
    if (window.innerWidth <= 600) {
      menu.style.right = "-100%";
    }
  });

  closeBtn.addEventListener('click', closeLogin);

  // Fecha clicando no overlay
  overlay.addEventListener('click', closeLogin);

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && formLogin.classList.contains('active')) {
      closeLogin();
    }
  });
});