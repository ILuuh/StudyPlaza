/*
  perfil.js
  - Gerencia a navegação entre seções do perfil do usuário (tabs).
  - Fornece exemplo básico de persistência de configurações (placeholder).
  - Comentários explicativos adicionados para facilitar manutenção e integração.
*/

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona itens de navegação (links que alternam seções) e as seções correspondentes
    const navItems = document.querySelectorAll('.perfil-nav-item');
    const sections = document.querySelectorAll('.perfil-section');

    let currentUserId = null;

    /**
     * changeSection
     * - Handler executado quando um item de navegação é clicado.
     * - Prevê o comportamento padrão (ancora #) e faz:
     *    1) Remove estado ativo de todos os itens de navegação.
     *    2) Marca o item clicado como ativo (classe 'active'.
     *    3) Esconde todas as seções do perfil.
     *    4) Exibe a seção alvo baseada no href do link.
     *
     * Observações de acessibilidade:
     * - Para melhorar, poderia também gerenciar foco (element.focus()) ao mostrar a seção.
     * - Se as seções forem grandes, considerar uso de aria-hidden para indicar visibilidade.
     */
    function changeSection(event) {
        event.preventDefault(); // Impede o comportamento padrão do link (#)

        // Obtém o id alvo removendo o caractere '#' do href (ex.: '#estatisticas' -> 'estatisticas')
        const targetId = this.getAttribute('href').substring(1);

        // 1. Remove a classe 'active' de todos os itens de navegação
        navItems.forEach(item => item.classList.remove('active'));

        // 2. Adiciona a classe 'active' ao item clicado
        this.classList.add('active');

        // 3. Oculta todas as seções (remove classe que as torna visíveis)
        sections.forEach(section => section.classList.remove('active-section'));

        // 4. Mostra a seção alvo (se existir) e, opcionalmente, define foco para acessibilidade
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active-section');
            // Sugestão: mover foco para o primeiro elemento relevante da seção
            // const firstFocusable = targetSection.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])');
            // if (firstFocusable) firstFocusable.focus();
        }
    }

    // Associa o handler de clique a cada item de navegação
    navItems.forEach(item => {
        item.addEventListener('click', changeSection);
    });

    // Formulário de configurações será tratado mais abaixo com integração completa ao back-end.

    // Ao carregar a página, rola para o topo para garantir que o usuário veja o início do conteúdo
    // Útil quando a página pode ter sido acessada por âncoras ou estado anterior.
    window.scrollTo(0, 0);

    // --- Carregar dados do usuário e popular a UI ---
    (async function loadUserProfile() {
        // Carrega usuário logado do localStorage apenas para obter o id
        let stored = null;
        try { stored = JSON.parse(localStorage.getItem('studyplaza-user')); } catch (e) { stored = null; }

        if (!stored || !stored.id) {
            // Não temos usuário — redireciona para login/cadastro
            window.location.href = '/cadastro.html';
            return;
        }

        const userId = stored.id;
        currentUserId = userId;

        try {
            const resp = await fetch(`http://localhost:3500/api/usuarios/${userId}`);
            if (resp.ok) {
                const rows = await resp.json();
                const user = Array.isArray(rows) && rows.length ? rows[0] : null;
                if (user) {
                    // Mostrar exclusivamente os dados do banco
                    populateProfile(user);
                } else {
                    const msg = getTranslation ? getTranslation('perfil.load.empty', 'Usuário não encontrado no banco.') : 'Usuário não encontrado no banco.';
                    if (typeof showToast === 'function') showToast(msg, 'error'); else alert(msg);
                    window.location.href = '/cadastro.html';
                }
            } else {
                const msg = getTranslation ? getTranslation('perfil.load.error', 'Erro ao carregar perfil do servidor.') : 'Erro ao carregar perfil do servidor.';
                if (typeof showToast === 'function') showToast(msg, 'error'); else alert(msg);
                return; // não usar dados locais como fallback — exibir só dados do servidor
            }
        } catch (err) {
            console.error('Erro ao buscar perfil:', err);
            const msg = getTranslation ? getTranslation('perfil.load.error', 'Erro ao carregar perfil do servidor.') : 'Erro ao carregar perfil do servidor.';
            if (typeof showToast === 'function') showToast(msg, 'error'); else alert(msg);
            return;
        }
    })();

    function populateProfile(user) {
        if (!user) return;

        // Nome principal
        const nameEl = document.querySelector('.perfil-info-basica h1');
        if (nameEl && user.nome) nameEl.textContent = user.nome;

        // Username simples derivado do nome (fallback ao stored username)
        const usernameEl = document.querySelector('.perfil-username');
        if (usernameEl) {
            if (user.nome) {
                const nick = '@' + user.nome.toLowerCase().replace(/[^a-z0-9]/gi, '').slice(0, 16);
                usernameEl.textContent = nick;
            } else if (user.username) {
                usernameEl.textContent = user.username;
            }
        }

        // Profissão / tipo de usuário — usar tradução para rótulo quando possível
        const profissaoBadge = document.querySelector('.perfil-badges .badge[data-translate="perfil.profissao"]');
        if (profissaoBadge) {
            const tipo = user.tipo_usuario || user.profissao || '';
            const tipoKey = `tipo.${tipo || 'estudante'}`;
            const translated = (window.translationSystem && window.translationSystem.getTranslation(tipoKey)) || null;
            profissaoBadge.textContent = translated || (tipo.charAt(0).toUpperCase() + tipo.slice(1));
        }

        // Preencher a view estática de configurações (elementos não-editáveis)
        const nameField = document.getElementById('nome');
        const emailField = document.getElementById('email');
        const tipoField = document.getElementById('tipo_usuario');
        if (nameField && user.nome) nameField.textContent = user.nome;
        if (emailField && user.email) emailField.textContent = user.email;
        if (tipoField && user.tipo_usuario) {
            const tipoKey = `tipo.${user.tipo_usuario}`;
            const translatedTipo = (window.translationSystem && window.translationSystem.getTranslation && window.translationSystem.getTranslation(tipoKey)) || (user.tipo_usuario.charAt(0).toUpperCase() + user.tipo_usuario.slice(1));
            tipoField.textContent = translatedTipo;
        }
    }
    // O formulário de configurações foi convertido para visualização apenas.
});