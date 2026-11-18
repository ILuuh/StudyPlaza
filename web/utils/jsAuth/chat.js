import { URL_API } from "../api/apiconfig.js";

document.addEventListener("DOMContentLoaded", () => {
  // =====================================================
  // ELEMENTOS
  // =====================================================

  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messagesList = document.getElementById("chat-messages");

  const userNameElement = document.getElementById("current-user-name");

  const statusElement = document.getElementById("chat-status");
  const statusText = document.getElementById("chat-status-text");

  const sendButton = document.getElementById("send-button");
  const leaveButton = document.getElementById("leave-chat");

  // =====================================================
  // SESSÃO DO STUDY PLAZA
  // =====================================================

  const token = localStorage.getItem("studyplaza-token");

  let usuario;

  try {
    usuario = JSON.parse(localStorage.getItem("studyplaza-user"));
  } catch {
    usuario = null;
  }

  if (!token || !usuario || !usuario.id) {
    window.location.replace("./homeChat.html");
    return;
  }

  const meuId = String(usuario.id);

  userNameElement.textContent = usuario.name || "Usuário";

  // =====================================================
  // CONFIGURAÇÕES
  // =====================================================

  const LIMITE_MENSAGEM = 500;

  let socket = null;
  let conectado = false;

  // =====================================================
  // STATUS DA CONEXÃO
  // =====================================================

  function atualizarStatus(status, mensagem) {
    statusText.textContent = mensagem;

    statusElement.classList.remove(
      "status-connected",
      "status-disconnected",
      "status-connecting",
    );

    const icon = statusElement.querySelector("i");

    if (status === "connected") {
      statusElement.classList.add("status-connected");
      if (icon) icon.className = "fa-solid fa-circle";
    } else if (status === "disconnected") {
      statusElement.classList.add("status-disconnected");
      if (icon) icon.className = "fa-solid fa-circle";
    } else {
      statusElement.classList.add("status-connecting");
      if (icon) icon.className = "fa-solid fa-circle-notch fa-spin";
    }
  }

  function habilitarEnvio(habilitado) {
    input.disabled = !habilitado;
    sendButton.disabled = !habilitado;
  }

  // =====================================================
  // RENDERIZAR MENSAGEM
  // =====================================================

  function adicionarMensagem(data) {
    if (!data) return;

    const item = document.createElement("li");

    const nomeAutor = document.createElement("strong");
    const conteudo = document.createElement("p");

    // Nome do usuário
    nomeAutor.classList.add("message-author");
    nomeAutor.textContent = data.username || "Usuário";

    // Texto da mensagem
    conteudo.classList.add("message-content");
    conteudo.textContent = data.message || "";

    // Identifica se a mensagem é minha
    if (String(data.iduser) === meuId) {
      item.classList.add("my-message");
    } else {
      item.classList.add("other-message");
    }

    // Adiciona os elementos separadamente
    item.appendChild(nomeAutor);
    item.appendChild(conteudo);

    // Data e horário
    if (data.created_at) {
      const horario = document.createElement("small");

      const dataMensagem = new Date(data.created_at);

      if (!Number.isNaN(dataMensagem.getTime())) {
        horario.textContent = dataMensagem.toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        });

        horario.classList.add("message-time");

        item.appendChild(horario);
      }
    }

    messagesList.appendChild(item);

    messagesList.scrollTop = messagesList.scrollHeight;
  }

  // =====================================================
  // HISTÓRICO
  // =====================================================

  function carregarHistorico(mensagens) {
    messagesList.innerHTML = "";

    if (!Array.isArray(mensagens) || mensagens.length === 0) {
      const vazio = document.createElement("li");

      vazio.classList.add("chat-placeholder");
      vazio.textContent =
        "Nenhuma mensagem ainda. Seja o primeiro a conversar!";

      messagesList.appendChild(vazio);

      return;
    }

    mensagens.forEach(adicionarMensagem);

    messagesList.scrollTop = messagesList.scrollHeight;
  }

  // =====================================================
  // CONEXÃO SOCKET.IO
  // =====================================================

  if (typeof window.io !== "function") {
    atualizarStatus("disconnected", "Socket.IO indisponível");

    console.error("Biblioteca Socket.IO não foi carregada.");

    return;
  }

  socket = window.io(URL_API, {
    auth: {
      token: token,
    },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  // =====================================================
  // CONECTADO
  // =====================================================

  socket.on("connect", () => {
    conectado = true;

    atualizarStatus("connected", "Conectado");

    habilitarEnvio(true);

    console.log("Conectado ao Study Chat:", socket.id);
  });

  // =====================================================
  // HISTÓRICO RECEBIDO
  // =====================================================

  socket.on("chat:history", (mensagens) => {
    carregarHistorico(mensagens);
  });

  // =====================================================
  // NOVA MENSAGEM
  // =====================================================

  socket.on("chat:message", (data) => {
    const placeholder = messagesList.querySelector(".chat-placeholder");

    if (placeholder) {
      placeholder.remove();
    }

    adicionarMensagem(data);
  });

  // =====================================================
  // ERROS DO CHAT
  // =====================================================

  socket.on("chat:error", (error) => {
    console.error("Erro no chat:", error);

    alert(error?.message || "Ocorreu um erro no chat.");
  });

  // =====================================================
  // DESCONECTADO
  // =====================================================

  socket.on("disconnect", (reason) => {
    conectado = false;

    atualizarStatus("disconnected", "Desconectado");

    habilitarEnvio(false);

    console.log("Desconectado:", reason);
  });

  // =====================================================
  // ERRO DE CONEXÃO
  // =====================================================

  socket.on("connect_error", (error) => {
    conectado = false;

    atualizarStatus("disconnected", "Falha na conexão");

    habilitarEnvio(false);

    console.error("Erro Socket.IO:", error.message);

    if (
      error.message === "Sessão inválida ou expirada." ||
      error.message === "Token não informado."
    ) {
      localStorage.removeItem("studyplaza-token");
      localStorage.removeItem("studyplaza-user");

      alert("Sua sessão expirou. Entre novamente no Study Plaza.");

      window.location.replace("./homeChat.html");
    }
  });

  // =====================================================
  // ENVIAR MENSAGEM
  // =====================================================

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const mensagem = input.value.trim();

    if (!mensagem || !conectado || !socket) {
      return;
    }

    if (mensagem.length > LIMITE_MENSAGEM) {
      alert("A mensagem deve ter no máximo 500 caracteres.");
      return;
    }

    socket.emit("chat:send", {
      message: mensagem,
    });

    input.value = "";
    input.focus();
  });

  // =====================================================
  // SAIR DO CHAT
  // =====================================================

  leaveButton.addEventListener("click", () => {
    if (socket) {
      socket.disconnect();
    }

    window.location.href = "./homeChat.html";
  });
});
