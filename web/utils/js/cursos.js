import { URL_API } from "../api/apiconfig.js";
const API_URL = `${URL_API}`; // sua API
const cursosContainer = document.querySelector(".courses-container");

/**
 * Cria dinamicamente os cards de cursos com base nos dados da API
 * @param {string} endpoint - endpoint da API (ex: "cursos")
 */
async function carregarCursos(endpoint) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar cursos: ${response.status}`);
    }

    const responseData = await response.json();
    const cursos = responseData.data;

    if (!Array.isArray(cursos) || cursos.length === 0) {
      cursosContainer.innerHTML = "<p>Nenhum curso encontrado.</p>";
      return;
    }
    // Limpa os cards padrões
    cursosContainer.innerHTML = "";

    cursos.forEach((curso) => {
      const card = document.createElement("div");
      card.classList.add("course-card");
      card.tabIndex = 0;

      card.innerHTML = `
            <h3>${curso.title || "Curso Sem Título"}</h3>
            <p>${curso.description || "Sem descrição disponível."}</p>
          `;

      cursosContainer.appendChild(card);
    });
  } catch (erro) {
    console.error("❌ Erro ao criar cards:", erro);
    cursosContainer.innerHTML = `<p style="color:red;">Erro ao carregar cursos. Verifique a API.</p>`;
  }
}

// Chamar automaticamente quando carregar
carregarCursos("cursos"); // <-- coloque o nome do endpoint real
