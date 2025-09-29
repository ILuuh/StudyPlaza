// Sistema de tradução para StudyPlaza
class TranslationSystem {
  constructor() {
    this.currentLanguage = this.getStoredLanguage() || 'pt';
    this.init();
  }

  init() {
    this.createLanguageSelector();
    this.applyTranslations();
    this.updateDocumentLanguage();
  }

  // Cria o seletor de idioma no header
  createLanguageSelector() {
    const nav = document.querySelector('.menu');
    if (!nav) return;

    // Verifica se já existe o seletor
    if (document.querySelector('.language-selector')) return;

    const languageSelector = document.createElement('div');
    languageSelector.className = 'language-selector';
    languageSelector.innerHTML = `
      <button class="language-toggle" aria-label="Alterar idioma">
        <i class="fas fa-globe"></i>
        <span class="language-text">${this.currentLanguage === 'pt' ? 'PT' : 'EN'}</span>
      </button>
      <div class="language-dropdown">
        <button class="language-option ${this.currentLanguage === 'pt' ? 'active' : ''}" data-lang="pt">
          <span class="flag">🇧🇷</span> Português
        </button>
        <button class="language-option ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">
          <span class="flag">🇺🇸</span> English
        </button>
      </div>
    `;

    // Insere antes do botão de tema
    const themeToggle = nav.querySelector('#theme-toggle');
    if (themeToggle) {
      nav.insertBefore(languageSelector, themeToggle);
    } else {
      nav.appendChild(languageSelector);
    }

    this.addLanguageSelectorEvents();
    this.addLanguageSelectorStyles();
  }

  // Adiciona eventos ao seletor de idioma
  addLanguageSelectorEvents() {
    const toggle = document.querySelector('.language-toggle');
    const dropdown = document.querySelector('.language-dropdown');
    const options = document.querySelectorAll('.language-option');

    if (!toggle || !dropdown) return;

    // Toggle dropdown
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });

    // Prevenir fechamento ao clicar no dropdown
    dropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Selecionar idioma
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang');
        this.changeLanguage(lang);
        dropdown.classList.remove('show');
      });
    });
  }

  // Adiciona estilos CSS para o seletor de idioma
  addLanguageSelectorStyles() {
    if (document.querySelector('#language-selector-styles')) return;

    const style = document.createElement('style');
    style.id = 'language-selector-styles';
    style.textContent = `
      .language-selector {
        position: relative;
        margin-right: 10px;
      }

      .language-toggle {
        background: none;
        border: none;
        color: var(--text-color, #333);
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
        transition: all 0.3s ease;
        min-width: 60px;
      }

      .language-toggle:hover {
        background-color: var(--hover-bg, rgba(0,0,0,0.1));
      }

      .language-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: var(--bg-color, white);
        border: 1px solid var(--border-color, #ddd);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        min-width: 150px;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
      }

      .language-dropdown.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .language-option {
        width: 100%;
        padding: 10px 15px;
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--text-color, #333);
        font-size: 14px;
        transition: background-color 0.2s ease;
      }

      .language-option:hover {
        background-color: var(--hover-bg, rgba(0,0,0,0.05));
      }

      .language-option.active {
        background-color: var(--primary-color, #8B5CF6);
        color: white;
      }

      .language-option .flag {
        font-size: 16px;
      }

      /* Responsivo */
      @media (max-width: 768px) {
        .language-selector {
          margin-right: 5px;
        }
        
        .language-toggle {
          padding: 6px 8px;
          font-size: 12px;
          min-width: 50px;
        }
        
        .language-dropdown {
          min-width: 130px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Muda o idioma
  changeLanguage(lang) {
    if (lang === this.currentLanguage) return;
    
    this.currentLanguage = lang;
    this.storeLanguage(lang);
    this.applyTranslations();
    this.updateDocumentLanguage();
    this.updateLanguageSelector();
    this.notifyLanguageChange();
  }

  // Aplica as traduções
  applyTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      const translation = this.getTranslation(key);
      
      if (translation) {
        // Verifica se é um placeholder
        if (element.hasAttribute('placeholder')) {
          element.setAttribute('placeholder', translation);
        }
        // Verifica se é um title/aria-label
        else if (element.hasAttribute('title')) {
          element.setAttribute('title', translation);
        }
        else if (element.hasAttribute('aria-label')) {
          element.setAttribute('aria-label', translation);
        }
        // Caso contrário, altera o conteúdo
        else {
          element.textContent = translation;
        }
      }
    });

    // Atualiza o título da página
    this.updatePageTitle();
    // Notifica elementos dinâmicos que dependem do idioma aplicado
    this.notifyLanguageChange();
  }

  // Obtém uma tradução
  getTranslation(key) {
    return translations[this.currentLanguage] && translations[this.currentLanguage][key] || key;
  }

  // Atualiza o título da página
  updatePageTitle() {
    const currentPage = this.getCurrentPage();
    let titleKey = '';
    
    switch(currentPage) {
      case 'index':
        titleKey = 'index.title';
        break;
      case 'cadastro':
        titleKey = 'cadastro.title';
        break;
      case 'cursos':
        titleKey = 'cursos.title';
        break;
      case 'quiz':
        titleKey = 'quiz.title';
        break;
      case 'sobrenos':
        titleKey = 'sobrenos.title';
        break;
    }
    
    if (titleKey) {
      const title = this.getTranslation(titleKey);
      if (title) {
        document.title = title;
      }
    }
  }

  // Obtém a página atual
  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    return filename.replace('.html', '') || 'index';
  }

  // Atualiza o atributo lang do documento
  updateDocumentLanguage() {
    document.documentElement.setAttribute('lang', this.currentLanguage === 'pt' ? 'pt-BR' : 'en-US');
  }

  // Atualiza o seletor de idioma
  updateLanguageSelector() {
    const languageText = document.querySelector('.language-text');
    const options = document.querySelectorAll('.language-option');
    
    if (languageText) {
      languageText.textContent = this.currentLanguage === 'pt' ? 'PT' : 'EN';
    }
    
    options.forEach(option => {
      const lang = option.getAttribute('data-lang');
      option.classList.toggle('active', lang === this.currentLanguage);
    });
  }

  notifyLanguageChange() {
    const event = new CustomEvent('languageChanged', {
      detail: {
        language: this.currentLanguage
      }
    });
    document.dispatchEvent(event);
  }

  // Armazena o idioma no localStorage
  storeLanguage(lang) {
    try {
      localStorage.setItem('studyplaza-language', lang);
    } catch (e) {
      console.warn('Não foi possível salvar a preferência de idioma');
    }
  }

  // Recupera o idioma do localStorage
  getStoredLanguage() {
    try {
      return localStorage.getItem('studyplaza-language');
    } catch (e) {
      return null;
    }
  }
}

// Inicializa o sistema de tradução quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  // Aguarda um pouco para garantir que outros scripts foram carregados
  setTimeout(() => {
    window.translationSystem = new TranslationSystem();
  }, 100);
});

// Função global para mudança de idioma (pode ser chamada de outros scripts)
window.changeLanguage = function(lang) {
  if (window.translationSystem) {
    window.translationSystem.changeLanguage(lang);
  }
};
