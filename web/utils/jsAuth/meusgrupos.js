import { URL_API } from "../api/apiconfig.js";

// =========================================
// 1. CONFIGURAÇÕES INICIAIS
// =========================================

const API_URL = URL_API;

const papeis = {
  admin: "👑 Administrador",
  moderador: "🛡️ Moderador",
  membro: "👤 Membro",
};

// Recupera os dados da sessão
const storedToken = localStorage.getItem("studyplaza-token");

let usuarioLogado = null;

try {
  usuarioLogado = JSON.parse(localStorage.getItem("studyplaza-user"));
} catch (erro) {
  console.error("Erro ao recuperar usuário:", erro);
}

// Verifica autenticação
if (!storedToken || !usuarioLogado?.id) {
  window.location.href = "../login.html";
}

// Recupera o ID do grupo pela URL
const urlParams = new URLSearchParams(window.location.search);
const grupoId = urlParams.get("id");

if (!grupoId) {
  alert("ID do grupo não encontrado.");
  window.location.href = "../auth/painel.html";
}

// =========================================
// 2. FUNÇÕES DE NAVEGAÇÃO
// =========================================

function voltarPagina() {
  window.location.href = "../auth/painel.html";
}

// =========================================
// 3. VERIFICAR PERMISSÕES
// =========================================

async function usuarioEhAdmin(grupoId) {
  try {
    const response = await fetch(
      `${API_URL}/usuariosgrupos/buscarpapeldouser/${usuarioLogado.id}/${grupoId}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      },
    );

    if (!response.ok) {
      console.error("Erro na consulta de permissão:", response.status);
      return false;
    }

    const responseData = await response.json();

    // Aceita tanto objeto quanto array
    const dados = Array.isArray(responseData.data)
      ? responseData.data[0]
      : responseData.data;


    // Aceita diferentes nomes para o campo
    const papel = dados?.Papel ?? dados?.papel ?? dados?.role;


    return (
      String(papel ?? "")
        .trim()
        .toLowerCase() === "admin"
    );
  } catch (erro) {
    console.error("Erro ao verificar permissão:", erro);
    return false;
  }
}

// =========================================
// 4. REMOVER MEMBRO
// =========================================

async function removerMembro(id) {
  const ehAdmin = await usuarioEhAdmin(grupoId);

  if (!ehAdmin) {
    alert("Somente administradores podem remover membros.");
    return;
  }

  const confirmar = confirm("Deseja realmente remover este membro?");

  if (!confirmar) return;

  try {
    const response = await fetch(
      `${API_URL}/usuariosgrupos/deletemembro/${id}/${grupoId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Erro ao remover membro.");
    }

    alert("Membro removido com sucesso!");

    await carregarMembros();
  } catch (erro) {
    console.error("Erro ao remover membro:", erro);

    alert("Não foi possível remover o membro.");
  }
}

// =========================================
// 5. CARREGAR MEMBROS
// =========================================

async function carregarMembros() {
  const container = document.getElementById("membros-container");

  if (!container) {
    console.error("Container de membros não encontrado.");
    return;
  }

  container.innerHTML = `
        <p class="sem-membros">Carregando membros...</p>
    `;

  try {
    const response = await fetch(
      `${API_URL}/usuariosgrupos/membros/${grupoId}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      },
    );

    // Verifica sessão expirada
    if (response.status === 401) {
      localStorage.removeItem("studyplaza-token");
      localStorage.removeItem("studyplaza-user");

      alert("Sua sessão expirou.");

      window.location.href = "../login.html";

      return;
    }

    if (!response.ok) {
      throw new Error("Erro ao carregar membros.");
    }

    const responseData = await response.json();
    const membros = responseData.data;

    if (!Array.isArray(membros)) {
      throw new Error("Formato de membros inválido.");
    }

    container.innerHTML = "";

    if (membros.length === 0) {
      container.innerHTML = `
                <p class="sem-membros">
                    Nenhum membro encontrado neste grupo.
                </p>
            `;

      return;
    }

    // Verifica se o usuário logado é administrador
    const meuRegistro = membros.find(
      (membro) =>
        Number(membro.iduser ?? membro.id) === Number(usuarioLogado.id),
    );
    const papelUsuario = String(
      meuRegistro?.role ?? meuRegistro?.Papel ?? meuRegistro?.papel ?? "",
    )
      .trim()
      .toLowerCase();

    const usuarioEhAdminGrupo = papelUsuario === "admin";

    // Cria os cards dos membros
    membros.forEach((m) => {
      const idMembro = m.iduser ?? m.id;

      const card = document.createElement("div");

      card.classList.add("card-membro");

      card.innerHTML = `
                <div class="avatar">
                    <i class="fa-solid fa-user"></i>
                </div>

                <div class="nome"></div>

                <div class="email"></div>

                <span class="papel">
                    ${papeis[m.role] || m.role || "Membro"}
                </span>
            `;

      // Insere os dados do membro com segurança
      card.querySelector(".nome").textContent = m.name ?? "Nome não informado";

      card.querySelector(".email").textContent =
        m.login ?? "E-mail não informado";

      // Não permite remover o próprio administrador
      const ehProprioUsuario = Number(idMembro) === Number(usuarioLogado.id);

      if (usuarioEhAdminGrupo && !ehProprioUsuario) {
        const botaoRemover = document.createElement("button");

        botaoRemover.type = "button";
        botaoRemover.className = "btn-remover";
        botaoRemover.dataset.id = idMembro;

        botaoRemover.innerHTML = `
                    <i class="fa-solid fa-user-minus"
                       aria-hidden="true"></i>
                    Remover
                `;

        card.appendChild(botaoRemover);
      }

      container.appendChild(card);
    });
  } catch (erro) {
    console.error("Erro ao carregar membros:", erro);

    container.innerHTML = `
            <p class="sem-membros">
                Erro ao carregar membros.
            </p>
        `;
  }
}

// =========================================
// 6. INICIALIZAÇÃO E EVENTOS
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  // Botão voltar
  document
    .getElementById("btn-voltar")
    ?.addEventListener("click", voltarPagina);

  // Evento único para remover membros
  const container = document.getElementById("membros-container");

  container?.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".btn-remover");

    if (!botao || !container.contains(botao)) return;

    removerMembro(botao.dataset.id);
  });

  // Carrega os membros
  carregarMembros();
});
