function validateName() {
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (name.value.trim() === '') {
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

function validateEmail() {
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
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

function validatePassword() {
    const password = document.getElementById('senha');
    const passwordError = document.getElementById('passwordError');
    if (password.value.trim() === '') {
        password.classList.add('invalid');
        password.classList.remove('valid');
        passwordError.textContent = 'O campo Senha é obrigatório.';
        return false;
    } else {
        password.classList.remove('invalid');
        password.classList.add('valid');
        messageError.textContent = '';
        return true;
    }
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
    if (!validateName() || !validateEmail() || !validatePassword()) {
        e.preventDefault();
        alert('Por favor, corrija os erros antes de enviar o formulário.');
    } else {
        alert('Formulário enviado com sucesso!');
    }
});