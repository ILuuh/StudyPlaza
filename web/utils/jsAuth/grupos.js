// painel.js — integração real com API
import { URL_API } from "../api/apiconfig.js";

/* Toast helper: cria/mostra notificações breves (sucesso/erro) */
function showToast(message, type = "success", duration = 3000) {
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

const API_URL = `${URL_API}`;

const storedUser = JSON.parse(localStorage.getItem("studyplaza-user"));
const storedToken = localStorage.getItem("studyplaza-token");

if (!storedUser || !storedToken) {
  window.location.href = "login.html";
}

// ===============================================
// 1. Mostrar total de grupos
// ===============================================
async function mostrarTotalGrupos() {
  const container = document.querySelector(".hero-destaque");

  container.innerHTML = `<p style="padding: 10px;">${"Verificando..."}</p>`;

  try {
    const response = await fetch(`${API_URL}/grupos/totalGrupos`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });

    if (!response.ok) throw new Error("Erro ao buscar total");

    const responseData = await response.json();
    const grupos = responseData.data[0];
    const total = grupos.total_grupos ?? 0;

    container.innerHTML = `
            <strong>+${total}</strong>
            <span>
                ${"Grupos Ativos"}
            </span>
        `;
  } catch (erro) {
    console.error("Erro ao carregar total:", erro);

    container.innerHTML = `
            <p>${"Erro ao carregar total."}</p>
        `;
  }
}

// ===============================================
// 2. Carregar grupos recomendados
// ===============================================
async function carregarGruposRecomendados() {
  const container = document.querySelector(".cards-grupos");
  container.innerHTML = `<p style="padding: 10px;">${"Carregando grupos..."}</p>`;

  try {
    // ► 1. Buscar todos os grupos
    const responseGrupos = await fetch(
      `${API_URL}/usuariosgrupos/totalMembros`,
      {
        headers: { Authorization: `Bearer ${storedToken}` },
      },
    );

    if (!responseGrupos.ok) throw new Error("Erro ao carregar grupos");
    const responseData = await responseGrupos.json();
    const grupos = responseData.data;

    // ► 2. Buscar grupos do usuário
    const responseUsuarioGrupos = await fetch(
      `${API_URL}/usuariosgrupos/user/${storedUser.id}`,
      {
        headers: { Authorization: `Bearer ${storedToken}` },
      },
    );

    if (!responseUsuarioGrupos.ok)
      throw new Error("Erro ao carregar grupos do usuário");
    const responseData2 = await responseUsuarioGrupos.json();
    const gruposUsuario = responseData2.data;

    const idsGruposUsuario = gruposUsuario.map((g) => g.idgrupo);

    // ► 3. Filtrar grupos recomendados
    const gruposRecomendados = grupos.filter(
      (g) => !idsGruposUsuario.includes(g.idgrupo),
    );

    // ► 4. Renderizar
    if (gruposRecomendados.length === 0) {
      container.innerHTML = `
                <p style="padding: 10px;">
                    Nenhum grupo recomendado disponível.
                </p>`;
      return;
    }

    container.innerHTML = "";

    gruposRecomendados.forEach((g) => {
      const card = document.createElement("article");
      card.classList.add("card-grupo");

      const dataFormatada = new Date(g.data_criacao).toLocaleDateString(
        "pt-BR",
      );

      card.innerHTML = `
        <div class="titulo-grupo">
            <h3 id="grupo-${g.idgrupo}-titulo">${g.grupo}</h3>
        </div>

        <p>Descrição: ${g.description || "Sem descrição."}</p>

        <ul>
            <li>
                <i class="fa-solid fa-user-group" aria-hidden="true"></i>
                ${Number(g.quantMembros) || 0} Membros
            </li>

            <li>
                <i class="fa-solid fa-calendar" aria-hidden="true"></i>
                ${dataFormatada}
            </li>

            <li>
                <i class="fa-solid fa-language" aria-hidden="true"></i>
                ${g.idioma || "Português"}
            </li>
        </ul>

        <button 
            type="button" 
            class="btn-primario btn-participar"
        >
            Participar
        </button>
    `;

      const botao = card.querySelector(".btn-participar");

      botao.addEventListener("click", () => {
        participarGrupo(g.idgrupo);
      });

      container.appendChild(card);
    });
  } catch (erro) {
    console.error("❌ Erro ao carregar grupos:", erro);
    container.innerHTML = `
            <p style="padding: 10px;">
                Erro ao carregar grupos.
            </p>`;
  }
}

// ===============================================
// 3. Participar de grupo (com showToast)
// ===============================================
async function participarGrupo(idgrupo) {
  try {
    const iduser = storedUser.id;

    const response = await fetch(`${API_URL}/usuariosgrupos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({
        iduser: iduser,
        idgrupo,
        role: "membro",
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        showToast("Token inválido ou expirado. Faça login novamente.", "error");
        setTimeout(() => (window.location.href = "login.html"), 1500);
        return;
      }
      throw new Error("Erro ao participar do grupo");
    }

    showToast("Você agora faz parte do grupo!", "success");
    carregarGruposRecomendados();
  } catch (erro) {
    console.error("❌ Falha ao participar:", erro);
    showToast("Não foi possível entrar no grupo. Tente novamente.", "error");
  }
}

// ===============================================
// 4. Inicialização
// ===============================================
document.addEventListener("DOMContentLoaded", () => {
  carregarGruposRecomendados();
  mostrarTotalGrupos();
});
