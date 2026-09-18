document.addEventListener("DOMContentLoaded", () => {
  const vLibras = document.getElementById("container-vLibras");

  if (!vLibras) {
    return;
  }

  fetch("./components/vLibras.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Não foi possível carregar vLibras.");
      }

      return response.text();
    })
    .then((html) => {
      vLibras.innerHTML = html;
    })
    .catch((error) => {
      console.error("Erro ao carregar vLibras:", error);
    });
});
