// painel.js — integração com a API Study Plaza

import { URL_API } from "../api/apiconfig.js";

const API_URL = URL_API;

// ==========================================
// 1. Verificar usuário e autenticação
// ==========================================

let storedUser = null;

try {
  storedUser = JSON.parse(localStorage.getItem("studyplaza-user"));
} catch (erro) {
  console.error("Erro ao recuperar usuário:", erro);
}

const storedToken = localStorage.getItem("studyplaza-token");

if (!storedUser?.id || !storedToken) {
  window.location.href = "../login.html";
}

const userId = storedUser?.id;

// ==========================================
// 2. Funções auxiliares
// ==========================================

// Verifica respostas da API
async function buscarDados(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${storedToken}`,
      ...options.headers,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("studyplaza-user");
    localStorage.removeItem("studyplaza-token");

    window.location.href = "../login.html";

    throw new Error("Sessão expirada.");
  }

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  return response.json();
}

// Cria botões de ação
function criarBotao({ texto = "", icone, acao, descricao }) {
  const botao = document.createElement("button");

  botao.type = "button";
  botao.className = "btn-acao";
  botao.setAttribute("aria-label", descricao);
  botao.title = descricao;

  // Cria o ícone
  if (icone) {
    const elementoIcone = document.createElement("i");

    elementoIcone.className = icone;
    elementoIcone.setAttribute("aria-hidden", "true");

    botao.appendChild(elementoIcone);
  }

  // Adiciona o texto, caso exista
  if (texto) {
    botao.appendChild(document.createTextNode(texto));
  }

  // Adiciona a ação do botão
  if (typeof acao === "function") {
    botao.addEventListener("click", acao);
  }

  return botao;
}

// ==========================================
// 3. Mostrar grupos ativos do usuário
// ==========================================

async function mostrarGruposAtivosUsuario() {
  const container = document.querySelector(".hero-status div strong");

  if (!container) {
    console.warn("Elemento de grupos ativos não encontrado.");
    return;
  }

  container.textContent = "...";

  try {
    const resposta = await buscarDados(
      `${API_URL}/usuariosgrupos/totalgruposativosuser/${userId}`,
    );

    const usuario = resposta?.data?.[0];

    const total = Number(usuario?.quantGrupoAtivos) || 0;

    container.textContent = total;
  } catch (erro) {
    console.error("Erro ao carregar grupos ativos:", erro);
    container.textContent = "0";
  }
}

// ==========================================
// 4. Carregar grupos do usuário
// ==========================================

async function carregarGrupos() {
  const tabelaAtivos = document.querySelector(".tabela-grupos-ativos");

  const tabelaTodos = document.querySelector(".tabela-todos-grupos");

  if (!tabelaAtivos || !tabelaTodos) {
    console.error("Não foram encontradas as tabelas de grupos.");
    return;
  }

  tabelaAtivos.textContent = "Carregando...";
  tabelaTodos.textContent = "Carregando...";

  try {
    // Busca os grupos do usuário e a quantidade de membros
    const [respostaUsuario, respostaMembros] = await Promise.all([
      buscarDados(`${API_URL}/usuariosgrupos/user/${userId}`),
      buscarDados(`${API_URL}/usuariosgrupos/totalmembros`),
    ]);

    const grupos = respostaUsuario?.data;
    const gruposMembros = respostaMembros?.data;

    if (!Array.isArray(grupos) || !Array.isArray(gruposMembros)) {
      throw new Error("A API retornou dados em formato inesperado.");
    }

    // Filtra somente grupos ativos
    const gruposAtivos = grupos.filter((grupo) => Number(grupo.ativo) === 1);

    // Cabeçalho das tabelas
    const criarCabecalho = () => `
            <div class="tabela-cabecalho">
                <span>Grupo</span>
                <span>Membros</span>
                <span>Status</span>
            </div>
        `;

    tabelaAtivos.innerHTML = criarCabecalho();
    tabelaTodos.innerHTML = criarCabecalho();

    // ==================================
    // TABELA DE GRUPOS ATIVOS
    // ==================================

    if (gruposAtivos.length === 0) {
      tabelaAtivos.insertAdjacentHTML(
        "beforeend",
        "<p>Nenhum grupo ativo encontrado.</p>",
      );
    } else {
      gruposAtivos.forEach((grupo) => {
        const dadosMembros = gruposMembros.find(
          (item) => Number(item.idgrupo) === Number(grupo.idgrupo),
        );

        const quantidadeMembros = Number(dadosMembros?.quantMembros) || 0;

        const linha = document.createElement("div");
        linha.className = "tabela-linha";

        const nome = document.createElement("p");
        nome.textContent = grupo.grupo ?? "Grupo sem nome";

        const membros = document.createElement("p");
        membros.textContent = quantidadeMembros;

        const status = document.createElement("p");
        status.className = "tag-sucesso";
        status.textContent = "Ativo";

        linha.append(nome, membros, status);
        tabelaAtivos.appendChild(linha);
      });
    }

    // ==================================
    // TABELA DE TODOS OS GRUPOS
    // ==================================

    if (grupos.length === 0) {
      tabelaTodos.insertAdjacentHTML(
        "beforeend",
        "<p>Você não participa de nenhum grupo.</p>",
      );

      return;
    }

    grupos.forEach((grupo) => {
      const dadosMembros = gruposMembros.find(
        (item) => Number(item.idgrupo) === Number(grupo.idgrupo),
      );

      const quantidadeMembros = Number(dadosMembros?.quantMembros) || 0;

      const ativo = Number(grupo.ativo) === 1;

      const papel = String(grupo.role ?? grupo.papel ?? "").toUpperCase();

      const idGrupo = grupo.idgrupo;

      const linha = document.createElement("div");
      linha.className = "tabela-linha";

      // Nome do grupo
      const nome = document.createElement("p");
      nome.textContent = grupo.grupo ?? "Grupo sem nome";

      // Quantidade de membros
      const membros = document.createElement("p");
      membros.textContent = quantidadeMembros;

      // Status
      const status = document.createElement("p");
      status.className = ativo ? "tag-sucesso" : "tag-neutra";
      status.textContent = ativo ? "Ativo" : "Inativo";

      // Ações
      const acoes = document.createElement("article");
      acoes.className = "acoes";

      const idValido =
        idGrupo !== undefined &&
        idGrupo !== null &&
        Number.isFinite(Number(idGrupo));

      const botaoAbrir = criarBotao({
        icone: "fa-solid fa-arrow-up-right-from-square",
        acao: () => abrirGrupo(idGrupo),
        descricao: "Abrir grupo",
      });

      botaoAbrir.disabled = !idValido;
      acoes.appendChild(botaoAbrir);

      // Botões exclusivos de administradores
      if (papel === "ADMIN" && idValido) {
        const botaoEditar = criarBotao({
          icone: "fa-solid fa-pen-to-square",
          acao: () => editarGrupo(idGrupo, grupo.grupo, grupo.ativo, papel),
          descricao: "Editar grupo",
        });

        const botaoExcluir = criarBotao({
          icone: "fa-solid fa-trash-can",
          acao: () => excluirGrupo(idGrupo, grupo.grupo),
          descricao: "Excluir grupo",
        });

        acoes.append(botaoEditar, botaoExcluir);
      }

      linha.append(nome, membros, status, acoes);
      tabelaTodos.appendChild(linha);
    });
  } catch (erro) {
    console.error("Erro ao carregar grupos:", erro);

    tabelaAtivos.textContent = "Erro ao carregar grupos ativos.";
    tabelaTodos.textContent = "Erro ao carregar grupos.";
  }
}

// ==========================================
// 5. Abrir grupo
// ==========================================

function abrirGrupo(idGrupo) {
  if (!idGrupo) return;

  window.location.href = `../auth/meusgrupos.html?id=${idGrupo}`;
}

// ==========================================
// 6. Excluir grupo
// ==========================================

async function excluirGrupo(idGrupo, nomeGrupo) {
  if (!idGrupo) {
    alert("Identificador do grupo não encontrado.");
    return;
  }

  const confirmar = confirm(
    `Tem certeza que deseja excluir o grupo "${nomeGrupo}"?`,
  );

  if (!confirmar) return;

  try {
    await buscarDados(`${API_URL}/grupos/${idGrupo}`, {
      method: "DELETE",
    });

    alert("Grupo excluído com sucesso!");

    await Promise.all([mostrarGruposAtivosUsuario(), carregarGrupos()]);
  } catch (erro) {
    console.error("Erro ao excluir grupo:", erro);

    alert("Não foi possível excluir o grupo. Tente novamente.");
  }
}

// ==========================================
// 7. Editar grupo
// ==========================================

function editarGrupo(idgrupo, nomeAtual, statusAtual, papel) {
  if (papel !== "ADMIN") {
    alert("Somente administradores podem editar grupos.");
    return;
  }

  const modal = document.getElementById("modal-editar-grupo");
  const inputNome = document.getElementById("input-editar-nome-grupo");
  const selectStatus = document.getElementById("select-editar-status-grupo");
  const btnSalvar = document.getElementById("btn-salvar-edicao");
  const btnCancelar = document.getElementById("btn-cancelar-edicao");

  if (!modal || !inputNome || !selectStatus || !btnSalvar || !btnCancelar) {
    console.error("Elementos do modal não encontrados.");
    return;
  }

  inputNome.value = nomeAtual ?? "";
  selectStatus.value = String(statusAtual);

  modal.style.display = "flex";
  inputNome.focus();

  function fecharModal() {
    modal.style.display = "none";
    btnSalvar.onclick = null;
    btnCancelar.onclick = null;
  }

  btnCancelar.onclick = fecharModal;

  btnSalvar.onclick = async () => {
    const novoNome = inputNome.value.trim();
    const novoStatus = Number(selectStatus.value);

    if (!novoNome) {
      alert("O nome do grupo não pode estar vazio.");
      return;
    }

    if (![0, 1].includes(novoStatus)) {
      alert("Selecione um status válido.");
      return;
    }

    try {
      // 1. Atualiza o nome do grupo
      await buscarDados(`${API_URL}/grupos/${idgrupo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: novoNome,
        }),
      });

      // 2. Atualiza somente o vínculo do usuário com o grupo
      await buscarDados(
        `${API_URL}/usuariosgrupos/${userId}/${idgrupo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            actived: novoStatus,
          }),
        },
      );

      alert("Grupo atualizado com sucesso!");

      fecharModal();

      await Promise.all([mostrarGruposAtivosUsuario(), carregarGrupos()]);
    } catch (erro) {
      console.error("Erro ao editar grupo:", erro);
      alert("Não foi possível atualizar o grupo.");
    }
  };
}
// ==========================================
// 8. Inicialização
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  if (!storedUser?.id || !storedToken) return;

  mostrarGruposAtivosUsuario();
  carregarGrupos();
});
