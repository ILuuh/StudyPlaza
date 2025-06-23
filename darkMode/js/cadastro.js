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
  
  const themeBtn = document.getElementById('themeToggleBtn');
  const isDark = window.location.href.includes('dark');

  // Define ícone inicial
  themeBtn.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';

  themeBtn.addEventListener('click', () => {
    // Alterna entre light e dark
    if (isDark) {
      window.location.href = '../index.html'; // volta para claro
    } else {
      window.location.href = 'darkMode/index.html'; // vai para dark
    }
  });
});
