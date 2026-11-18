import { URL_API } from "../api/apiconfig.js";

document.addEventListener("DOMContentLoaded", () => {
  let currentUserId = null;
  let currentUser = null;

  // =====================================================
  // ELEMENTOS
  // =====================================================

  const navItems = document.querySelectorAll(".perfil-nav-item");
  const sections = document.querySelectorAll(".perfil-section");

  const btnEditar = document.getElementById("btnEditar");
  const btnCancelar = document.getElementById("btnCancelar");
  const btnSalvar = document.getElementById("btnSalvar");

  const configView = document.getElementById("configView");
  const configForm = document.getElementById("configForm");

  const inputNome = document.getElementById("inputNome");
  const inputEmail = document.getElementById("inputEmail");
  const inputTipoUsuario = document.getElementById("inputTipoUsuario");

  // =====================================================
  // NAVEGAÇÃO
  // =====================================================

  navItems.forEach((item) => {
    if (item.tagName.toLowerCase() !== "a") return;

    item.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = item.getAttribute("href")?.substring(1);

      if (!targetId) return;

      const targetSection = document.getElementById(targetId);

      if (!targetSection) return;

      navItems.forEach((nav) => nav.classList.remove("active"));
      sections.forEach((section) => section.classList.remove("active-section"));

      item.classList.add("active");
      targetSection.classList.add("active-section");
    });
  });

  // =====================================================
  // ABRIR E CANCELAR EDIÇÃO
  // =====================================================

  function abrirEdicao() {
    if (!currentUser) return;

    inputNome.value = currentUser.name || "";
    inputEmail.value = currentUser.login || "";
    inputTipoUsuario.value = currentUser.tipo_usuario || "estudante";

    configView.style.display = "none";
    configForm.style.display = "block";

    inputNome.focus();
  }

  function cancelarEdicao() {
    configForm.reset();

    configForm.style.display = "none";
    configView.style.display = "block";

    if (currentUser) {
      inputNome.value = currentUser.name || "";
      inputEmail.value = currentUser.login || "";
      inputTipoUsuario.value = currentUser.tipo_usuario || "estudante";
    }
  }

  // =====================================================
  // SALVAR ALTERAÇÕES
  // =====================================================

  async function salvarAlteracoes(event) {
    event.preventDefault();

    if (!currentUserId) {
      alert("Usuário não identificado.");
      return;
    }

    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();
    const tipo_usuario = inputTipoUsuario.value;

    if (!nome) {
      alert("Digite seu nome.");
      inputNome.focus();
      return;
    }

    if (!email) {
      alert("Digite seu e-mail.");
      inputEmail.focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Digite um e-mail válido.");
      inputEmail.focus();
      return;
    }

    btnSalvar.disabled = true;
    btnSalvar.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Salvando...
        `;

    try {
      const response = await fetch(`${URL_API}/users/${currentUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nome,
          login: email,
          tipo_usuario: tipo_usuario,
        }),
      });

      const responseData = await response.json();

      if (!response.ok || responseData.message?.toLowerCase() !== "success") {
        throw new Error(
          responseData.Error ||
            responseData.message ||
            "Não foi possível atualizar o usuário.",
        );
      }

      // Atualiza os dados localmente.
      // O Model atual retorna o resultado SQL,
      // e não o usuário atualizado.

      currentUser = {
        ...currentUser,
        id: currentUserId,
        name: nome,
        login: email,
        tipo_usuario: tipo_usuario,
      };

      // Atualiza o perfil na tela.
      populateProfile(currentUser);

      // Fecha o formulário.
      configForm.style.display = "none";
      configView.style.display = "block";

      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);

      alert(error.message || "Erro ao atualizar seus dados.");
    } finally {
      btnSalvar.disabled = false;

      btnSalvar.innerHTML = `
                <i class="fa-solid fa-check"></i>
                Salvar
            `;
    }
  }

  // =====================================================
  // EVENTOS
  // =====================================================

  btnEditar?.addEventListener("click", abrirEdicao);
  btnCancelar?.addEventListener("click", cancelarEdicao);
  configForm?.addEventListener("submit", salvarAlteracoes);

  // =====================================================
  // CARREGAR USUÁRIO
  // =====================================================

  async function loadUserProfile() {
    let stored;

    try {
      stored = JSON.parse(localStorage.getItem("studyplaza-user"));
    } catch (error) {
      console.error("Erro ao ler usuário:", error);
      stored = null;
    }

    if (!stored?.id) {
      window.location.href = "../web/cadastro.html";
      return;
    }

    currentUserId = stored.id;

    try {
      const response = await fetch(`${URL_API}/users/${currentUserId}`);

      if (!response.ok) {
        throw new Error("Erro ao carregar perfil do servidor.");
      }

      const responseData = await response.json();

      if (responseData.message?.toLowerCase() !== "success") {
        throw new Error(responseData.Error || "Usuário não encontrado.");
      }

      // GetById retorna data como um array de registros.
      const user = responseData.data?.[0];

      if (!user) {
        alert("Usuário não encontrado no banco.");
        window.location.href = "../web/cadastro.html";
        return;
      }

      currentUser = user;

      populateProfile(currentUser);
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      alert(error.message || "Erro ao carregar perfil.");
    }
  }

  // =====================================================
  // PREENCHER PERFIL
  // =====================================================

  function populateProfile(user) {
    if (!user) return;

    // Nome no cabeçalho
    const nameEl = document.querySelector(".perfil-info-basica h1");

    if (nameEl) {
      nameEl.textContent = user.name || "Usuário";
    }

    // Nome de usuário
    const usernameEl = document.querySelector(".perfil-username");

    if (usernameEl) {
      usernameEl.textContent = user.name
        ? "@" +
          user.name
            .toLowerCase()
            .replace(/[^a-z0-9]/gi, "")
            .slice(0, 16)
        : "";
    }

    // Informações do perfil
    const nameField = document.getElementById("nome");
    const emailField = document.getElementById("email");
    const tipoField = document.getElementById("tipo_usuario");

    if (nameField) {
      nameField.textContent = user.name || "";
    }

    if (emailField) {
      emailField.textContent = user.login || "";
    }

    if (tipoField) {
      tipoField.textContent = formatarTipoUsuario(user.tipo_usuario);
    }

    // Atualiza os campos de edição
    if (inputNome) {
      inputNome.value = user.name || "";
    }

    if (inputEmail) {
      inputEmail.value = user.login || "";
    }

    if (inputTipoUsuario) {
      inputTipoUsuario.value = user.tipo_usuario || "estudante";
    }
  }

  // =====================================================
  // FORMATA TIPO DE USUÁRIO
  // =====================================================

  function formatarTipoUsuario(tipo) {
    if (!tipo) return "";

    const tipoKey = `tipo.${tipo}`;

    const translated = window.translationSystem?.getTranslation
      ? window.translationSystem.getTranslation(tipoKey)
      : null;

    if (translated) return translated;

    return tipo.charAt(0).toUpperCase() + tipo.slice(1);
  }

  // =====================================================
  // INICIALIZAÇÃO
  // =====================================================

  window.scrollTo(0, 0);

  loadUserProfile();
});
