// --- Restaurar tema salvo no localStorage ---
const savedTheme = localStorage.getItem("theme");
const toggleBtn = document.getElementById("theme-toggle");
const icon = document.getElementById("icon");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    icon.textContent = "🌙";
} else {
    document.body.classList.remove("dark-theme");
    icon.textContent = "☀️";
}

// --- Alternar tema ---
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    // salvar tema no localStorage
    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
        icon.textContent = "🌙";
    } else {
        localStorage.setItem("theme", "light");
        icon.textContent = "☀️";
    }

    // animação do ícone
    icon.classList.add("fade-out");
    setTimeout(() => {
        icon.classList.remove("fade-out");
    }, 300);
});