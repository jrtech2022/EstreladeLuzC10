/**
 * ============================================
 * ESTRELA DE LUZ C10 - JAVASCRIPT PRINCIPAL
 * ============================================
 */

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeSplashScreen();
    initializeMainContent();
});

/**
 * Inicializa a tela de splash com informações da igreja
 */
function initializeSplashScreen() {
    const config = siteConfig.splashConfig;
    
    // Atualiza informações na tela de splash
    const churchNameEl = document.getElementById('churchName');
    const pastorNameEl = document.getElementById('pastorName');
    const churchAddressEl = document.getElementById('churchAddress');
    
    if (churchNameEl) churchNameEl.textContent = config.churchName;
    if (pastorNameEl) pastorNameEl.textContent = config.pastorName;
    if (churchAddressEl) churchAddressEl.innerHTML = config.churchAddress;
    
    // Remove a tela de splash após o tempo configurado
    window.addEventListener('load', function() {
        setTimeout(function() {
            const splash = document.getElementById('splashScreen');
            if (splash) {
                splash.style.display = 'none';
            }
        }, config.displayTime + 1000); // +1s para a animação de fade out
    });
}

/**
 * Inicializa o conteúdo principal do site
 */
function initializeMainContent() {
    const mainContent = document.querySelector('.main-content');
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    
    if (!mainContent || !header || !footer) return;
    
    // Atualizar cabeçalho
    updateHeader(header);
    
    // Adicionar links e o mapa
    createLinks(mainContent, footer);
    
    // Atualizar rodapé
    updateFooter(footer);
}

/**
 * Atualiza o cabeçalho com informações do site
 */
function updateHeader(header) {
    const img = header.querySelector('img');
    const title = header.querySelector('.title');
    const desc = header.querySelector('.desc');
    
    if (img) img.src = siteConfig.profileImage;
    if (title) title.textContent = siteConfig.siteTitle;
    if (desc) desc.textContent = siteConfig.siteDescription;
}

/**
 * Cria os cards de links e mapa
 */
function createLinks(container, footer) {
    siteConfig.links.forEach((link, index) => {
        const glowBox = createGlowBox(link, index);
        container.insertBefore(glowBox, footer);
    });
}

/**
 * Cria um card (glow-box) para link ou mapa
 */
function createGlowBox(link, index) {
    const glowBox = document.createElement('div');
    glowBox.classList.add('glow-box');
    
    // Adiciona classe baseada na categoria
    if (link.category) {
        glowBox.classList.add(link.category);
    }
    
    // Define delay de animação
    glowBox.style.animationDelay = `${4.5 + (index + 1) * 0.1}s`;
    
    if (link.type === "map") {
        createMapBox(glowBox, link);
    } else {
        createLinkBox(glowBox, link);
    }
    
    return glowBox;
}

/**
 * Cria um card para mapa embutido
 */
function createMapBox(glowBox, link) {
    const mapTitle = document.createElement('div');
    mapTitle.className = 'map-title';
    mapTitle.textContent = link.name;
    glowBox.appendChild(mapTitle);
    
    const mapDescription = document.createElement('span');
    mapDescription.textContent = link.description;
    glowBox.appendChild(mapDescription);
    
    const iframeElement = document.createElement('iframe');
    iframeElement.src = link.url;
    iframeElement.style.border = "0";
    iframeElement.allowFullscreen = true;
    iframeElement.loading = "lazy";
    iframeElement.referrerPolicy = "no-referrer-when-downgrade";
    iframeElement.title = link.name;
    iframeElement.ariaLabel = link.name;
    
    glowBox.appendChild(iframeElement);
}

/**
 * Cria um card para link
 */
function createLinkBox(glowBox, link) {
    const linkElement = document.createElement('a');
    linkElement.href = link.url;
    linkElement.target = "_blank";
    linkElement.rel = "noopener noreferrer";
    linkElement.ariaLabel = `${link.name} - ${link.description}`;
    
    // Ícone
    if (link.icon) {
        const iconElement = document.createElement('i');
        iconElement.className = `icon ${link.icon}`;
        linkElement.appendChild(iconElement);
    }
    
    // Container para o conteúdo do link
    const linkContent = document.createElement('div');
    linkContent.className = 'link-content';
    
    // Nome do link
    const nameElement = document.createElement('span');
    nameElement.textContent = link.name;
    nameElement.style.fontWeight = '600';
    linkContent.appendChild(nameElement);
    
    // Descrição
    const spanElement = document.createElement('span');
    spanElement.textContent = link.description;
    spanElement.style.fontSize = '13px';
    spanElement.style.color = '#888';
    spanElement.style.marginTop = '4px';
    linkContent.appendChild(spanElement);
    
    linkElement.appendChild(linkContent);
    glowBox.appendChild(linkElement);
}

/**
 * Atualiza o rodapé com informações do pastor
 */
function updateFooter(footer) {
    footer.innerHTML = `
        <div class="pastor-info">
            <i class="fas fa-user-circle" style="margin-right: 8px;"></i>${siteConfig.pastorName}
        </div>
        <a href="https://wa.me/${siteConfig.whatsappNumber}" target="_blank" rel="noopener noreferrer" class="whatsapp-button" aria-label="Fale com o Pastor via WhatsApp">
            <i class="fab fa-whatsapp"></i>
            <span>Fale com o Pastor</span>
        </a>
        <div class="copyright">
            © ${new Date().getFullYear()} - Todos os direitos reservados<br>
            Desenvolvido por José Renato - Jr_Tech_OFC Fotografia
        </div>
    `;
}

