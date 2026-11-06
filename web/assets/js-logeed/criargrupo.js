// painel.js — integração real com API
import { URL_API } from "../api/apiconfig.js";

/* Toast helper: cria/mostra notificações breves (sucesso/erro) */
function showToast(message, type = "success", duration = 4000) {
  if (!message) return;
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.textContent = message;
  container.appendChild(toast);

  // força reflow para animação
  window.getComputedStyle(toast).opacity;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

const API_URL = URL_API; // URL da sua API
const formGrupo = document.getElementById("form-grupo");
// Busca o id_usuario do localStorage
const storedUser = JSON.parse(localStorage.getItem("studyplaza-user"));
const token = localStorage.getItem("studyplaza-token");

// Função para enviar formulário em JSON
formGrupo.addEventListener("submit", async (event) => {
  event.preventDefault(); // evita submit padrão

  // Captura valores dentro do submit
  const nome = document.querySelector("#nome")?.value.trim();
  const descricao = document.querySelector("#descricao")?.value.trim();

  if (!nome || !descricao) {
    showToast("Por favor, preencha todos os campos obrigatórios.", "error");
    return;
  }

  // Busca o id_usuario do localStorage
  const storedUser = JSON.parse(localStorage.getItem("studyplaza-user"));
  console.log(storedUser);
  const token = localStorage.getItem("studyplaza-token");
  console.log(token);

  if (!storedUser || !token) {
    showToast("Você precisa fazer login para continuar.", "error");
    setTimeout(() => (window.location.href = "/web/index.html"), 1500);
    return;
  }

  const payload = {
    name: nome,
    description: descricao,
    iduser: storedUser.id,
  };

  try {
    const response = await fetch(`${API_URL}/grupos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (response.status === 401) {
        showToast("Token inválido ou expirado. Faça login novamente.", "error");
        setTimeout(() => (window.location.href = "login.html"), 1500);
        return;
      }
      throw new Error(`Erro ao criar grupo: ${response.status}`);
    }

    const result = await response.json();
    showToast("✅ Grupo criado com sucesso!", "success");
    formGrupo.reset(); // limpa formulário
    setTimeout(() => (window.location.href = "/web/logeed/painel.html"), 2000);
  } catch (erro) {
    console.error("❌ Falha no envio:", erro);
    showToast("Ocorreu um erro ao criar o grupo. Tente novamente.", "error");
  }
});
