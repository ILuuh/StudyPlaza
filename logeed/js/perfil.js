document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.perfil-nav-item');
    const sections = document.querySelectorAll('.perfil-section');

    // Função para lidar com a mudança de seção
    function changeSection(event) {
        event.preventDefault(); // Impede o comportamento padrão do link (#)

        const targetId = this.getAttribute('href').substring(1); // Pega o ID da seção (ex: 'estatisticas')

        // 1. Remove a classe 'active' de todos os itens de navegação
        navItems.forEach(item => item.classList.remove('active'));

        // 2. Adiciona a classe 'active' ao item clicado
        this.classList.add('active');

        // 3. Oculta todas as seções
        sections.forEach(section => section.classList.remove('active-section'));

        // 4. Mostra a seção alvo
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active-section');
        }
    }

    // Adiciona o listener de clique a cada item de navegação
    navItems.forEach(item => {
        item.addEventListener('click', changeSection);
    });

    // Função de Exemplo para Salvar Configurações (Apenas para demonstração)
    const configForm = document.querySelector('.config-form');
    configForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Configurações salvas com sucesso! (Integração com Back-End necessária)');
        // Aqui você faria uma requisição Fetch para o seu servidor
    });

    // Rolar para o topo da página ao carregar
    window.scrollTo(0, 0);
});