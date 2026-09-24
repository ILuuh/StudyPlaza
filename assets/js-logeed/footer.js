document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("footer");

  if (!footer) {
    return;
  }

  fetch("../components/footerLogeed.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Não foi possível carregar Footer.");
      }

      return response.text();
    })
    .then((html) => {
      footer.innerHTML = html;
    })
    .catch((error) => {
      console.error("Erro ao carregar o Footer:", error);
    });
});