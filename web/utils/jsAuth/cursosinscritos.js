// cursosinscritos.js
// Responsável por carregar, exibir e cancelar inscrições em cursos.

// ========================================
// IMPORTAÇÕES E CONFIGURAÇÕES
// ========================================

import { URL_API } from "../api/apiconfig.js";

const containerCursos = document.getElementById("container-cursos");
const API_URL = URL_API;

// Recupera os dados do usuário logado
const storage = localStorage.getItem("studyplaza-user");

let user = null;

try {
  user = storage ? JSON.parse(storage) : null;
} catch (erro) {
  console.error("Erro ao recuperar usuário:", erro);
}

// Verifica se existe usuário autenticado
const userId = user?.id;

// ========================================
// TOAST - NOTIFICAÇÕES
// ========================================

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

  // Força o navegador a atualizar o estilo
  window.getComputedStyle(toast).opacity;

  // Exibe a notificação
  toast.classList.add("show");

  // Remove a notificação após o tempo definido
  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();

      // Remove o container quando estiver vazio
      if (container.children.length === 0) {
        container.remove();
      }
    }, 250);
  }, duration);
}

// ========================================
// 1. BUSCAR INSCRIÇÕES DO USUÁRIO
// ========================================

async function carregarInscricoes() {
  try {
    const response = await fetch(`${API_URL}/inscricoes`);

    if (!response.ok) {
      throw new Error("Erro ao buscar inscrições.");
    }

    const responseData = await response.json();

    const inscricoes = responseData.data;

    if (!Array.isArray(inscricoes)) {
      throw new Error("Formato de inscrições inválido.");
    }

    // Retorna somente as inscrições do usuário logado
    return inscricoes.filter(
      (inscricao) => String(inscricao.iduser) === String(userId),
    );
  } catch (erro) {
    console.error("Erro nas inscrições:", erro);
    throw erro;
  }
}

// ========================================
// 2. BUSCAR CURSOS DA API
// ========================================

async function carregarCursosAPI() {
  try {
    const response = await fetch(
      `${API_URL}/inscricoes/inscricaouser/${userId}`,
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar cursos.");
    }

    const responseData = await response.json();

    const cursos = responseData.data;

    if (!Array.isArray(cursos)) {
      throw new Error("Formato de cursos inválido.");
    }

    return cursos;
  } catch (erro) {
    console.error("Erro ao carregar cursos:", erro);
    throw erro;
  }
}

// ========================================
// 3. EXIBIR CURSOS INSCRITOS
// ========================================

async function carregarCursosInscritos() {
  if (!containerCursos) {
    console.error("Elemento #container-cursos não encontrado.");
    return;
  }

  // Verifica se existe usuário logado
  if (!userId) {
    containerCursos.innerHTML =
      "<p>Faça login para visualizar seus cursos.</p>";
    return;
  }

  containerCursos.innerHTML = "<p>Carregando seus cursos...</p>";

  try {
    // Busca inscrições e cursos
    const [inscricoes, cursos] = await Promise.all([
      carregarInscricoes(),
      carregarCursosAPI(),
    ]);

    containerCursos.innerHTML = "";

    // Verifica se existem inscrições
    if (inscricoes.length === 0) {
      containerCursos.innerHTML =
        "<p>Você não está inscrito em nenhum curso.</p>";
      return;
    }

    // Percorre as inscrições
    inscricoes.forEach((inscricao) => {
      // Localiza o curso correspondente
      const curso = cursos.find(
        (c) => String(c.idcurso) === String(inscricao.idcurso),
      );

      // Ignora inscrições sem curso correspondente
      if (!curso) return;

      // Cria o card
      const card = document.createElement("div");
      card.classList.add("status");

      const conteudo = document.createElement("div");
      conteudo.id = "card";

      // Nome do curso
      const nomeCurso = document.createElement("strong");
      nomeCurso.classList.add("nomeCurso");
      nomeCurso.textContent = curso.title;

      // Duração
      const duracao = document.createElement("p");
      const duracaoLabel = document.createElement("strong");

      duracaoLabel.textContent = "Duração: ";
      duracao.append(
        duracaoLabel,
        document.createTextNode(`${curso.duration}`),
      );

      // ========================================
      // SITUAÇÃO DO CURSO
      // ========================================

      const situacao = document.createElement("div");
      situacao.classList.add("grupoSituacao");

      const situacaoLabel = document.createElement("label");
      situacaoLabel.textContent = "Situação:";
      situacaoLabel.htmlFor = `situacao-${inscricao.id}`;

      // Campo para selecionar a situação
      const selectSituacao = document.createElement("select");
      selectSituacao.classList.add("selectSituacao");
      selectSituacao.id = `situacao-${inscricao.id}`;

      // Situações disponíveis
      const opcoesSituacao = ["Em Andamento", "Concluído", "Pausado"];

      // Recupera a situação atual da API
      const situacaoAtual = inscricao.situation || "Em Andamento";

      // Cria as opções
      opcoesSituacao.forEach((opcao) => {
        const option = document.createElement("option");

        option.value = opcao;
        option.textContent = opcao;

        selectSituacao.appendChild(option);
      });

      // Seleciona a situação atual
      selectSituacao.value = situacaoAtual;

      // Botão para salvar a alteração
      const btnEditarSituacao = document.createElement("button");

      btnEditarSituacao.type = "button";
      btnEditarSituacao.classList.add("btnEditarSituacao");
      btnEditarSituacao.textContent = "Salvar situação";

      // Evento para atualizar a situação
      btnEditarSituacao.addEventListener("click", () => {
        editarSituacao(inscricao.id, selectSituacao.value, btnEditarSituacao);
      });

      // Monta o componente
      situacao.append(situacaoLabel, selectSituacao, btnEditarSituacao);

      // Área de ações
      const acoes = document.createElement("div");
      acoes.classList.add("acoesCurso");

      // Botão cancelar
      const btnCancelar = document.createElement("button");

      btnCancelar.classList.add("btnCancelar");
      btnCancelar.textContent = "Cancelar Inscrição";
      btnCancelar.type = "button";

      // Evento de cancelamento
      btnCancelar.addEventListener("click", () => {
        cancelarInscricao(inscricao.id, btnCancelar);
      });

      // Monta o card
      acoes.appendChild(btnCancelar);

      conteudo.append(nomeCurso, duracao, situacao, acoes);

      card.appendChild(conteudo);

      containerCursos.appendChild(card);
    });

    // Caso todas as inscrições tenham cursos inexistentes
    if (containerCursos.children.length === 0) {
      containerCursos.innerHTML =
        "<p>Não foi possível localizar os cursos inscritos.</p>";
    }
  } catch (erro) {
    console.error("Erro geral:", erro);

    containerCursos.innerHTML =
      "<p>Não foi possível carregar seus cursos. Tente novamente.</p>";

    showToast("Erro ao carregar seus cursos.", "error");
  }
}

// ========================================
// 4. CANCELAR INSCRIÇÃO
// ========================================

async function cancelarInscricao(idInscricao, botao) {
  const confirmar = confirm("Tem certeza que deseja cancelar sua inscrição?");

  if (!confirmar) return;

  const token = localStorage.getItem("studyplaza-token");

  if (!token) {
    showToast("Sua sessão expirou. Faça login novamente.", "error");
    return;
  }

  try {
    // Evita múltiplos cliques
    botao.disabled = true;
    botao.textContent = "Cancelando...";

    const response = await fetch(`${API_URL}/inscricoes/${idInscricao}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Não foi possível cancelar a inscrição.");
    }

    // Notifica o usuário
    showToast("Inscrição cancelada com sucesso!", "success");

    // Atualiza a lista sem recarregar a página
    await carregarCursosInscritos();
  } catch (erro) {
    console.error("Erro ao cancelar inscrição:", erro);

    showToast("Erro ao cancelar inscrição. Tente novamente.", "error");

    // Reabilita o botão em caso de erro
    botao.disabled = false;
    botao.textContent = "Cancelar Inscrição";
  }
}

// ========================================
// 5. EDITAR SITUAÇÃO DA INSCRIÇÃO
// ========================================

async function editarSituacao(idInscricao, novaSituacao, botao) {
  const token = localStorage.getItem("studyplaza-token");

  if (!token) {
    showToast("Sua sessão expirou. Faça login novamente.", "error");
    return;
  }

  try {
    botao.disabled = true;
    botao.textContent = "Salvando...";

    const response = await fetch(`${API_URL}/inscricoes/${idInscricao}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        situation: novaSituacao,
      }),
    });


    if (!response.ok) {
      throw new Error("Erro ao atualizar situação.");
    }

    showToast("Situação atualizada com sucesso!", "success");

    // Atualiza os cursos exibidos
    await carregarCursosInscritos();
  } catch (erro) {
    console.error("Erro ao editar situação:", erro);

    showToast("Não foi possível atualizar a situação.", "error");

    botao.disabled = false;
    botao.textContent = "Salvar situação";
  }
}

// ========================================
// 5. INICIALIZAÇÃO
// ========================================

carregarCursosInscritos();
