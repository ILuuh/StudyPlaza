// painel.js — integração com a API Study Plaza

import { URL_API } from "../api/apiconfig.js";

const API_URL = URL_API;

// ==========================================
// 1. VERIFICAR USUÁRIO E AUTENTICAÇÃO
// ==========================================

let storedUser = null;

try {
  storedUser = JSON.parse(localStorage.getItem("studyplaza-user"));
} catch (erro) {
  console.error("Erro ao recuperar usuário:", erro);
}

const storedToken = localStorage.getItem("studyplaza-token");
const userId = storedUser?.id;

if (!userId || !storedToken) {
  window.location.href = "../login.html";
}

// ==========================================
// 2. FUNÇÕES AUXILIARES
// ==========================================

// Realiza requisições à API
async function buscarDados(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${storedToken}`,
      ...options.headers,
    },
  });

  // Verifica autenticação
  if (response.status === 401) {
    localStorage.removeItem("studyplaza-user");
    localStorage.removeItem("studyplaza-token");

    window.location.href = "../login.html";

    throw new Error("Sessão expirada.");
  }

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  // Algumas requisições podem não retornar conteúdo
  if (response.status === 204) {
    return null;
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

  if (icone) {
    const elementoIcone = document.createElement("i");

    elementoIcone.className = icone;
    elementoIcone.setAttribute("aria-hidden", "true");

    botao.appendChild(elementoIcone);
  }

  if (texto) {
    botao.appendChild(document.createTextNode(texto));
  }

  if (typeof acao === "function") {
    botao.addEventListener("click", acao);
  }

  return botao;
}

// Busca o grupo correspondente na tabela grupos
function buscarGrupoGeral(idgrupo, grupos) {
  return grupos.find((item) => Number(item.id) === Number(idgrupo));
}

// Verifica se o grupo está ativo globalmente
function grupoEstaAtivo(idgrupo, grupos) {
  const dadosGrupo = buscarGrupoGeral(idgrupo, grupos);

  return Number(dadosGrupo?.actived) === 1;
}

// Verifica se o usuário está ativo no grupo
function usuarioEstaAtivo(grupo) {
  return Number(grupo.ativo) === 1;
}

// ==========================================
// 3. MOSTRAR GRUPOS ATIVOS DO USUÁRIO
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
// 4. CARREGAR GRUPOS DO USUÁRIO
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
    // Busca os dados das três consultas simultaneamente
    const [respostaUsuario, respostaGrupo, respostaMembros] = await Promise.all(
      [
        buscarDados(`${API_URL}/usuariosgrupos/user/${userId}`),
        buscarDados(`${API_URL}/grupos`),
        buscarDados(`${API_URL}/usuariosgrupos/totalmembros`),
      ],
    );

    const gruposUser = respostaUsuario?.data;
    const grupos = respostaGrupo?.data;
    const gruposMembros = respostaMembros?.data;

    // Verifica os dados retornados pela API
    if (
      !Array.isArray(gruposUser) ||
      !Array.isArray(grupos) ||
      !Array.isArray(gruposMembros)
    ) {
      throw new Error("A API retornou dados em formato inesperado.");
    }
    
    // Filtra os grupos em que o usuário está ativo
    const gruposAtivos = gruposUser.filter(usuarioEstaAtivo);

    // ==================================
    // CABEÇALHOS DAS TABELAS
    // ==================================

    const criarCabecalho = () => `
      <div class="tabela-cabecalho">
        <span>Grupo</span>
        <span>Membros</span>
        <span>Meu Status</span>
        <span>Status Geral</span>
        <span>Ações</span>
      </div>
    `;

    const criarCabecalhoAtivos = () => `
      <div class="tabela-cabecalho">
        <span>Grupo</span>
        <span>Membros</span>
        <span>Meu Status</span>
        <span>Status Geral</span>
      </div>
    `;

    tabelaAtivos.innerHTML = criarCabecalhoAtivos();
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
        // Busca a quantidade de membros
        const dadosMembros = gruposMembros.find(
          (item) => Number(item.idgrupo) === Number(grupo.idgrupo),
        );

        const quantidadeMembros = Number(dadosMembros?.quantMembros) || 0;

        // Busca os dados gerais na tabela grupos
        const dadosGrupo = buscarGrupoGeral(grupo.idgrupo, grupos);

        // Verifica o status geral
        const geralAtivo = grupoEstaAtivo(grupo.idgrupo, grupos);

        const linha = document.createElement("div");
        linha.className = "tabela-linha";

        // Nome do grupo
        const nome = document.createElement("p");
        nome.textContent = grupo.grupo ?? "Grupo sem nome";

        // Quantidade de membros
        const membros = document.createElement("p");
        membros.textContent = quantidadeMembros;

        // Status pessoal
        const statusPessoal = document.createElement("p");
        statusPessoal.className = "tag-sucesso";
        statusPessoal.textContent = "Ativo";

        // Status geral
        const statusGeral = document.createElement("p");

        statusGeral.className = geralAtivo ? "tag-sucesso" : "tag-neutra";

        statusGeral.textContent = dadosGrupo
          ? geralAtivo
            ? "Ativo"
            : "Inativo"
          : "Não encontrado";

        linha.append(nome, membros, statusPessoal, statusGeral);

        tabelaAtivos.appendChild(linha);
      });
    }

    // ==================================
    // TABELA DE TODOS OS GRUPOS
    // ==================================

    if (gruposUser.length === 0) {
      tabelaTodos.insertAdjacentHTML(
        "beforeend",
        "<p>Você não participa de nenhum grupo.</p>",
      );

      return;
    }

    gruposUser.forEach((grupo) => {
      // Busca a quantidade de membros
      const dadosMembros = gruposMembros.find(
        (item) => Number(item.idgrupo) === Number(grupo.idgrupo),
      );

      const quantidadeMembros = Number(dadosMembros?.quantMembros) || 0;

      // Identifica o papel do usuário
      const papel = String(grupo.role ?? grupo.papel ?? "").toUpperCase();

      const idGrupo = grupo.idgrupo;

      // Busca os dados gerais do grupo
      const dadosGrupo = buscarGrupoGeral(idGrupo, grupos);

      // Verifica os dois status
      const pessoalAtivo = usuarioEstaAtivo(grupo);
      const geralAtivo = grupoEstaAtivo(idGrupo, grupos);

      const linha = document.createElement("div");
      linha.className = "tabela-linha";

      // Nome do grupo
      const nome = document.createElement("p");
      nome.textContent = grupo.grupo ?? "Grupo sem nome";

      // Quantidade de membros
      const membros = document.createElement("p");
      membros.textContent = quantidadeMembros;

      // Status pessoal
      const statusPessoal = document.createElement("p");

      statusPessoal.className = pessoalAtivo ? "tag-sucesso" : "tag-neutra";

      statusPessoal.textContent = pessoalAtivo ? "Ativo" : "Inativo";

      // Status geral
      const statusGeral = document.createElement("p");

      statusGeral.className = geralAtivo ? "tag-sucesso" : "tag-neutra";

      statusGeral.textContent = dadosGrupo
        ? geralAtivo
          ? "Ativo"
          : "Inativo"
        : "Não encontrado";

      // ==================================
      // AÇÕES DO GRUPO
      // ==================================

      const acoes = document.createElement("article");
      acoes.className = "acoes";

      const idValido =
        idGrupo !== undefined &&
        idGrupo !== null &&
        Number.isFinite(Number(idGrupo));

      // 1. Abrir grupo
      const botaoAbrir = criarBotao({
        icone: "fa-solid fa-arrow-up-right-from-square",
        acao: () => abrirGrupo(idGrupo),
        descricao: "Abrir grupo",
      });

      botaoAbrir.disabled = !idValido;
      acoes.appendChild(botaoAbrir);

      // 2. Alterar status pessoal
      if (idValido) {
        const statusAtual = pessoalAtivo ? 1 : 0;

        const botaoStatusPessoal = criarBotao({
          icone: "fa-solid fa-user-pen",
          acao: () => alterarStatusPessoal(idGrupo, statusAtual),
          descricao: "Alterar meu status no grupo",
        });

        acoes.appendChild(botaoStatusPessoal);
      }

      // 3. Ações exclusivas do administrador
      if (papel === "ADMIN" && idValido) {
        // Editar nome do grupo
        const botaoEditar = criarBotao({
          icone: "fa-solid fa-pen-to-square",
          acao: () => editarNomeGrupo(idGrupo, grupo.grupo),
          descricao: "Editar nome do grupo",
        });

        // Alterar status geral
        const statusAtualGeral = geralAtivo ? 1 : 0;

        const botaoStatusGeral = criarBotao({
          icone: "fa-solid fa-toggle-on",
          acao: () => alterarStatusGeral(idGrupo, statusAtualGeral),
          descricao: "Alterar status geral do grupo",
        });

        // Não permite alterar o status se o grupo não foi encontrado
        botaoStatusGeral.disabled = !dadosGrupo;

        // Excluir grupo
        const botaoExcluir = criarBotao({
          icone: "fa-solid fa-trash-can",
          acao: () => excluirGrupo(idGrupo, grupo.grupo),
          descricao: "Excluir grupo",
        });

        acoes.append(botaoEditar, botaoStatusGeral, botaoExcluir);
      }

      linha.append(nome, membros, statusPessoal, statusGeral, acoes);

      tabelaTodos.appendChild(linha);
    });
  } catch (erro) {
    console.error("Erro ao carregar grupos:", erro);

    tabelaAtivos.textContent = "Erro ao carregar grupos ativos.";
    tabelaTodos.textContent = "Erro ao carregar grupos.";
  }
}

// ==========================================
// 5. ABRIR GRUPO
// ==========================================

function abrirGrupo(idGrupo) {
  if (!idGrupo) return;

  window.location.href = `../auth/meusgrupos.html?id=${idGrupo}`;
}

// ==========================================
// 6. EXCLUIR GRUPO
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
// 7. EDITAR NOME DO GRUPO
// ==========================================

async function editarNomeGrupo(idGrupo, nomeAtual) {
  const novoNome = prompt("Digite o novo nome do grupo:", nomeAtual);

  if (novoNome === null) return;

  if (!novoNome.trim()) {
    alert("O nome do grupo não pode estar vazio.");
    return;
  }

  try {
    await buscarDados(`${API_URL}/grupos/${idGrupo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: novoNome.trim(),
      }),
    });

    alert("Nome do grupo atualizado!");

    await carregarGrupos();
  } catch (erro) {
    console.error("Erro ao editar nome:", erro);
    alert("Não foi possível editar o nome do grupo.");
  }
}

// ==========================================
// 8. ALTERAR STATUS PESSOAL
// ==========================================

async function alterarStatusPessoal(idGrupo, statusAtual) {
  const novoStatus = statusAtual === 1 ? 0 : 1;

  const confirmar = confirm(
    novoStatus === 1
      ? "Deseja ativar este grupo para você?"
      : "Deseja desativar este grupo somente para você?",
  );

  if (!confirmar) return;

  try {
    await buscarDados(`${API_URL}/usuariosgrupos/${userId}/${idGrupo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actived: novoStatus,
      }),
    });

    alert("Sua participação foi atualizada!");

    await Promise.all([mostrarGruposAtivosUsuario(), carregarGrupos()]);
  } catch (erro) {
    console.error("Erro ao alterar participação:", erro);
    alert("Não foi possível atualizar sua participação.");
  }
}

// ==========================================
// 9. ALTERAR STATUS GERAL DO GRUPO
// ==========================================

async function alterarStatusGeral(idGrupo, statusAtual) {
  const novoStatus = statusAtual === 1 ? 0 : 1;

  const confirmar = confirm(
    novoStatus === 1
      ? "Deseja ativar este grupo para todos os participantes?"
      : "Deseja desativar este grupo para todos os participantes?",
  );

  if (!confirmar) return;

  try {
    await buscarDados(`${API_URL}/grupos/${idGrupo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actived: novoStatus,
      }),
    });

    alert("Status geral do grupo atualizado!");

    await Promise.all([mostrarGruposAtivosUsuario(), carregarGrupos()]);
  } catch (erro) {
    console.error("Erro ao alterar status geral:", erro);
    alert("Não foi possível atualizar o status geral do grupo.");
  }
}

// ==========================================
// 10. INICIALIZAÇÃO
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  if (!userId || !storedToken) return;

  mostrarGruposAtivosUsuario();
  carregarGrupos();
});
