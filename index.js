// index.js - Código JavaScript completamente corregido

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // VARIABLES GLOBALES
    // =============================================
    
    const appState = {
        isMenuOpen: false,
        activeModal: null,
        expandedSections: {
            photos: false,
            videos: false,
            cases: false
        },
        playingVideo: null
    };

    const DOM = {
        menuToggle: document.getElementById('menuToggle'),
        navMenu: document.getElementById('navMenu'),
        imageModal: document.getElementById('imageModal'),
        videoModal: document.getElementById('videoModal'),
        modalImage: document.getElementById('modalImage'),
        modalVideo: document.getElementById('modalVideo'),
        videoLoading: document.querySelector('.video-loading'),
        body: document.body
    };

    // =============================================
    // INICIALIZACIÓN
    // =============================================
    
    function init() {
        setupEventListeners();
        initVideoPlayers();
        console.log('✅ Misterios Cósmicos inicializado');
    }

    // =============================================
    // CONFIGURACIÓN DE EVENTOS
    // =============================================
    
    function setupEventListeners() {
        // Menú móvil
        if (DOM.menuToggle) {
            DOM.menuToggle.addEventListener('click', toggleMobileMenu);
        }

        // Cerrar menú al hacer clic en enlaces
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Modales
        setupModalEvents();
        
        // Botones "Ver más"
        setupExpandButtons();
        
        // Botones "Leer más" en videos
        setupReadMoreButtons();
        
        // Videos
        setupVideoEvents();
        
        // Newsletter
        setupNewsletterForm();
        
        // Scroll effects
        window.addEventListener('scroll', handleScroll);
    }

    // =============================================
    // MENÚ MÓVIL - CORREGIDO
    // =============================================
    
    function toggleMobileMenu() {
        appState.isMenuOpen = !appState.isMenuOpen;
        
        if (DOM.navMenu) {
            DOM.navMenu.classList.toggle('active');
        }
        
        if (DOM.menuToggle) {
            const icon = DOM.menuToggle.querySelector('i');
            if (icon) {
                if (appState.isMenuOpen) {
                    icon.classList.replace('fa-bars', 'fa-times');
                    DOM.body.style.overflow = 'hidden';
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                    DOM.body.style.overflow = '';
                }
            }
        }
    }
    
    function closeMobileMenu() {
        if (appState.isMenuOpen) {
            appState.isMenuOpen = false;
            
            if (DOM.navMenu) {
                DOM.navMenu.classList.remove('active');
            }
            
            if (DOM.menuToggle) {
                const icon = DOM.menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
            
            DOM.body.style.overflow = '';
        }
    }

    // =============================================
    // SISTEMA DE MODALES - CORREGIDO
    // =============================================
    
    function setupModalEvents() {
        // Modal de imágenes
        const galleryImages = document.querySelectorAll('.gallery-image');
        galleryImages.forEach(img => {
            img.addEventListener('click', openImageModal);
        });
        
        // Modal de videos
        const playButtons = document.querySelectorAll('.play-button');
        playButtons.forEach(btn => {
            btn.addEventListener('click', openVideoModal);
        });
        
        // Cerrar modales
        const closeButtons = document.querySelectorAll('.close-modal');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
        
        // Cerrar modal al hacer clic fuera
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && appState.activeModal) {
                closeModal();
            }
        });
    }
    
    function openImageModal(e) {
        const img = e.target;
        if (DOM.modalImage) {
            DOM.modalImage.src = img.src;
            DOM.modalImage.alt = img.alt;
        }
        if (DOM.imageModal) {
            DOM.imageModal.classList.add('active');
        }
        DOM.body.style.overflow = 'hidden';
        appState.activeModal = 'image';
    }
    
    function openVideoModal(e) {
        const playButton = e.currentTarget;
        const videoCard = playButton.closest('.video-card');
        const videoElement = videoCard.querySelector('.video-player');
        const videoSource = videoElement.querySelector('source').src;
        
        // Mostrar loading
        if (DOM.videoLoading) {
            DOM.videoLoading.classList.add('show');
        }
        
        // Configurar video modal
        if (DOM.modalVideo) {
            DOM.modalVideo.innerHTML = '';
            const source = document.createElement('source');
            source.src = videoSource;
            source.type = 'video/mp4';
            DOM.modalVideo.appendChild(source);
        }
        
        if (DOM.videoModal) {
            DOM.videoModal.classList.add('active');
        }
        
        DOM.body.style.overflow = 'hidden';
        appState.activeModal = 'video';
        
        // Cargar y reproducir video
        if (DOM.modalVideo) {
            DOM.modalVideo.load();
            DOM.modalVideo.addEventListener('loadeddata', function() {
                if (DOM.videoLoading) {
                    DOM.videoLoading.classList.remove('show');
                }
                DOM.modalVideo.play().catch(e => {
                    console.log('Autoplay bloqueado');
                    if (DOM.videoLoading) {
                        DOM.videoLoading.classList.remove('show');
                    }
                });
            });
            
            DOM.modalVideo.addEventListener('error', function() {
                if (DOM.videoLoading) {
                    DOM.videoLoading.classList.remove('show');
                }
                console.error('Error al cargar el video');
            });
        }
        
        // Pausar video en miniatura si está reproduciéndose
        if (appState.playingVideo) {
            appState.playingVideo.pause();
            appState.playingVideo.currentTime = 0;
        }
    }
    
    function closeModal() {
        // Cerrar modal activo
        if (appState.activeModal === 'video' && DOM.modalVideo) {
            DOM.modalVideo.pause();
            DOM.modalVideo.currentTime = 0;
        }
        
        if (DOM.imageModal) {
            DOM.imageModal.classList.remove('active');
        }
        if (DOM.videoModal) {
            DOM.videoModal.classList.remove('active');
        }
        
        DOM.body.style.overflow = '';
        appState.activeModal = null;
        
        if (DOM.videoLoading) {
            DOM.videoLoading.classList.remove('show');
        }
    }

    // =============================================
    // BOTONES "VER MÁS" - CORREGIDO
    // =============================================
    
    function setupExpandButtons() {
        const expandButtons = document.querySelectorAll('.btn-expand');
        
        expandButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const sectionType = this.dataset.section;
                toggleExpandSection(sectionType, this);
            });
        });
    }
    
    function toggleExpandSection(sectionType, button) {
        let additionalContent;
        
        if (sectionType === 'videos') {
            additionalContent = document.querySelector('.video-grid-additional');
        } else if (sectionType === 'photos') {
            additionalContent = document.querySelector('.photo-gallery-additional');
        } else if (sectionType === 'cases') {
            additionalContent = document.querySelector('.cases-grid-additional');
        }
        
        if (!additionalContent) {
            console.log('No se encontró contenido adicional para:', sectionType);
            return;
        }
        
        if (appState.expandedSections[sectionType]) {
            // Contraer sección
            additionalContent.classList.remove('active');
            
            // Texto según sección
            if (sectionType === 'photos') {
                button.innerHTML = 'Ver más evidencias';
            } else if (sectionType === 'videos') {
                button.innerHTML = 'Ver más videos';
            } else if (sectionType === 'cases') {
                button.innerHTML = 'Ver más casos';
            }
            
            button.classList.remove('expanded');
        } else {
            // Expandir sección
            additionalContent.classList.add('active');
            button.innerHTML = 'Ver menos';
            button.classList.add('expanded');
            
            // Scroll suave
            setTimeout(() => {
                additionalContent.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 300);
        }
        
        appState.expandedSections[sectionType] = !appState.expandedSections[sectionType];
    }

    // =============================================
    // BOTONES "LEER MÁS" - CORREGIDO
    // =============================================
    
    function setupReadMoreButtons() {
        const readMoreButtons = document.querySelectorAll('.video-read-more');
        
        readMoreButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const videoDetails = this.closest('.video-details');
                const description = videoDetails.querySelector('.video-description');
                
                description.classList.toggle('truncated');
                this.classList.toggle('expanded');
                
                const span = this.querySelector('span');
                if (description.classList.contains('truncated')) {
                    span.textContent = 'Ver más';
                } else {
                    span.textContent = 'Ver menos';
                }
            });
        });
    }

    // =============================================
    // SISTEMA DE VIDEOS - CORREGIDO
    // =============================================
    
    function setupVideoEvents() {
        // Control de hover en videos
        setupVideoHoverEffects();
    }
    
    function initVideoPlayers() {
        const videoPlayers = document.querySelectorAll('.video-player');
        
        videoPlayers.forEach(video => {
            video.muted = true;
            video.playsInline = true;
            video.preload = 'metadata';
            
            // Manejar errores
            video.addEventListener('error', function() {
                console.warn('Error al cargar video:', this.src);
            });
        });
    }
    
    function setupVideoHoverEffects() {
        const videoCards = document.querySelectorAll('.video-card');
        
        videoCards.forEach(card => {
            const video = card.querySelector('.video-player');
            let hoverTimer;
            
            card.addEventListener('mouseenter', function() {
                clearTimeout(hoverTimer);
                hoverTimer = setTimeout(() => {
                    if (appState.activeModal !== 'video') {
                        video.play().catch(e => {
                            // Autoplay bloqueado, es normal
                        });
                        appState.playingVideo = video;
                    }
                }, 300);
            });
            
            card.addEventListener('mouseleave', function() {
                clearTimeout(hoverTimer);
                if (video !== appState.playingVideo && !video.paused) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        });
    }

    // =============================================
    // NEWSLETTER - CORREGIDO
    // =============================================
    
    function setupNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                
                if (validateEmail(email)) {
                    submitNewsletter(email, this);
                } else {
                    showNewsletterMessage('Por favor, ingresa un email válido', 'error');
                }
            });
        }
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function submitNewsletter(email, form) {
        const submitBtn = form.querySelector('button');
        const originalText = submitBtn.innerHTML;
        
        // Simular envío
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNewsletterMessage('¡Gracias por suscribirte! Te hemos enviado un email de confirmación.', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
    
    function showNewsletterMessage(message, type) {
        // Crear elemento de mensaje
        const messageEl = document.createElement('div');
        messageEl.className = `newsletter-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(messageEl);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 5000);
    }

    // =============================================
    // EFECTOS DE SCROLL - CORREGIDO
    // =============================================
    
    function handleScroll() {
        // Header con efecto de transparencia
        const header = document.querySelector('.main-header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 14, 23, 0.98)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'rgba(10, 14, 23, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
        }
    }

    // =============================================
    // INICIAR APLICACIÓN
    // =============================================
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // =============================================
    // MANEJO DE ERRORES
    // =============================================
    
    window.addEventListener('error', function(e) {
        console.error('Error capturado:', e.error);
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Promesa rechazada:', e.reason);
    });
});