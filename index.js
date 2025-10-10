// JavaScript para funcionalidades interactivas - SISTEMA YOUTUBE
document.addEventListener('DOMContentLoaded', function() {
    console.log('FreeParanormal - Inicializando sitio con sistema YouTube...');

    // Toggle del menú sidebar en móviles
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Cerrar sidebar al hacer clic fuera de él en móviles
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 1024) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickInsideMenuToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickInsideMenuToggle && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Inicializar sistema de imágenes
    initializeImageSystem();

    // Inicializar sistema de videos estilo YouTube
    initializeYouTubeSystem();

    // Funcionalidad de botones "Ver más"
    initializeButtons();

    // Navegación y búsqueda
    initializeNavigation();

    console.log('FreeParanormal - Sitio cargado correctamente');
});

// Sistema YouTube
function initializeYouTubeSystem() {
    const mainVideoPlayer = document.getElementById('mainVideoPlayer');
    const sidebarVideoCards = document.querySelectorAll('.sidebar-video-card');
    
    if (!mainVideoPlayer) return;

    // Configurar eventos para los videos de la sidebar
    sidebarVideoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video-src');
            const videoTitle = this.querySelector('h4').textContent;
            
            // Cambiar el video principal
            changeMainVideo(videoSrc, videoTitle, this);
        });
    });

    // Configurar controles del video principal para móviles
    setupMobileVideoControls(mainVideoPlayer);
}

function changeMainVideo(videoSrc, videoTitle, clickedCard) {
    const mainVideoPlayer = document.getElementById('mainVideoPlayer');
    const mainVideoTitle = document.querySelector('.main-video-title');
    
    // Mostrar indicador de carga
    showVideoLoading();
    
    // Cambiar fuente del video
    mainVideoPlayer.src = videoSrc;
    mainVideoPlayer.load();
    
    // Actualizar título
    if (mainVideoTitle) {
        mainVideoTitle.textContent = videoTitle;
    }
    
    // Resaltar video seleccionado
    document.querySelectorAll('.sidebar-video-card').forEach(card => {
        card.style.background = 'transparent';
    });
    clickedCard.style.background = 'rgba(168, 10, 28, 0.1)';
    
    // Reproducir automáticamente
    mainVideoPlayer.play().catch(error => {
        console.log('Autoplay bloqueado:', error);
    });
    
    // Ocultar loading cuando el video esté listo
    mainVideoPlayer.addEventListener('loadeddata', function() {
        hideVideoLoading();
    });
}

function showVideoLoading() {
    const mainVideoPlayer = document.getElementById('mainVideoPlayer');
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'video-loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Cargando video...</span>
        </div>
    `;
    
    loadingOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        z-index: 10;
    `;
    
    const spinner = loadingOverlay.querySelector('.loading-spinner');
    spinner.style.cssText = `
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    `;
    
    mainVideoPlayer.parentElement.style.position = 'relative';
    mainVideoPlayer.parentElement.appendChild(loadingOverlay);
}

function hideVideoLoading() {
    const loadingOverlay = document.querySelector('.video-loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

function setupMobileVideoControls(videoPlayer) {
    // En móviles, asegurar que el video se reproduzca inline
    videoPlayer.setAttribute('playsinline', '');
    videoPlayer.setAttribute('webkit-playsinline', '');
    
    // Manejar orientación en móviles
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            videoPlayer.style.width = '100%';
            videoPlayer.style.height = 'auto';
        }, 300);
    });
}

// Sistema de imágenes mejorado
function initializeImageSystem() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Agregar clase de loading inicial
        img.classList.add('image-loading');
        
        // Manejar carga exitosa
        if (img.complete) {
            handleImageLoad(img);
        } else {
            img.addEventListener('load', () => handleImageLoad(img));
            img.addEventListener('error', () => handleImageError(img));
        }
    });

    // Precargar imágenes críticas
    preloadCriticalImages();
}

function handleImageLoad(img) {
    img.classList.remove('image-loading');
    img.style.opacity = '1';
    img.style.transition = 'opacity 0.5s ease';
}

function handleImageError(img) {
    console.warn('Error cargando imagen:', img.src);
    img.classList.remove('image-loading');
    img.style.opacity = '1';
    
    // Intentar cargar imagen de respaldo si está disponible
    const fallbackSrc = img.getAttribute('data-fallback');
    if (fallbackSrc) {
        img.src = fallbackSrc;
    }
}

function preloadCriticalImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1534796636918-4f66c0e35032?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Sistema de botones
function initializeButtons() {
    // Botón "Ver Evidencias"
    const verEvidenciasBtn = document.getElementById('verEvidenciasBtn');
    if (verEvidenciasBtn) {
        verEvidenciasBtn.addEventListener('click', function() {
            document.getElementById('videos').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            showNotification('Navegando a la sección de videos');
        });
    }

    // Botón "Unirse a la Comunidad"
    const unirseComunidadBtn = document.getElementById('unirseComunidadBtn');
    if (unirseComunidadBtn) {
        unirseComunidadBtn.addEventListener('click', function() {
            showNotification('¡Próximamente podrás unirte a nuestra comunidad!');
        });
    }

    // Botones de carga más
    const loadMoreButtons = [
        { id: 'verMasGaleriaBtn', text: 'Cargando más evidencias...', message: 'Más evidencias cargadas' },
        { id: 'verMasCasosBtn', text: 'Cargando más casos...', message: 'Más casos cargados' },
        { id: 'verMasNoticiasBtn', text: 'Cargando más noticias...', message: 'Más noticias cargadas' }
    ];

    loadMoreButtons.forEach(buttonConfig => {
        const button = document.getElementById(buttonConfig.id);
        if (button) {
            button.addEventListener('click', function() {
                simulateLoading(this, buttonConfig.text);
                setTimeout(() => {
                    showNotification(buttonConfig.message);
                }, 1500);
            });
        }
    });

    // Botones "Ver caso completo"
    const verCasoBtns = document.querySelectorAll('.ver-caso-btn');
    verCasoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const caseTitle = this.closest('.case-card').querySelector('h3').textContent;
            showNotification(`Abriendo caso: ${caseTitle}`);
        });
    });

    // Botones "Leer más" en noticias
    const leerNoticiaBtns = document.querySelectorAll('.leer-noticia-btn');
    leerNoticiaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const newsTitle = this.closest('.news-card').querySelector('h3').textContent;
            showNotification(`Abriendo noticia: ${newsTitle}`);
        });
    });
}

// Navegación y utilidades
function initializeNavigation() {
    // Navegación suave
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                
                // Cerrar sidebar en móviles
                if (window.innerWidth <= 1024) {
                    document.getElementById('sidebar').classList.remove('active');
                }
            }
        });
    });

    // Búsqueda funcional
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    function performSearch() {
        const query = searchInput.value.trim();
        
        if (query) {
            showNotification(`Buscando: "${query}"`);
            searchInput.value = '';
        } else {
            showNotification('Por favor, ingresa un término de búsqueda');
        }
    }
    
    if (searchButton) searchButton.addEventListener('click', performSearch);
    if (searchInput) searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });

    // Notificaciones
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotification('No hay nuevas notificaciones');
        });
    }

    // Efectos hover mejorados
    const cards = document.querySelectorAll('.case-card, .news-card, .gallery-item, .sidebar-video-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(168, 10, 28, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Utilidades
function simulateLoading(button, text) {
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
    button.disabled = true;
    button.classList.add('loading');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        button.classList.remove('loading');
    }, 1500);
}

function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification fade-in';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--color-accent-purple);
        color: var(--color-text);
        padding: 12px 20px;
        border-radius: var(--border-radius);
        border: 1px solid rgba(168, 10, 28, 0.3);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Agregar estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        color: var(--color-accent-orange);
    }
    
    .fa-spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Estilos para el sistema YouTube */
    .sidebar-video-card.active {
        background: rgba(168, 10, 28, 0.1) !important;
        border-left: 3px solid var(--color-accent-orange);
    }
    
    /* Mejoras para móviles */
    @media (max-width: 768px) {
        .main-video-player {
            position: relative;
        }
        
        #mainVideoPlayer {
            width: 100%;
            height: auto;
            max-height: 50vh;
        }
    }
`;
document.head.appendChild(style);