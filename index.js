// JavaScript para Misterios Cósmicos

document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVEGACIÓN MÓVIL =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // ===== BOTONES "VER MÁS" PARA EXPANDIR CONTENIDO =====
    const expandButtons = document.querySelectorAll('.btn-expand');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionType = this.getAttribute('data-section');
            const isExpanded = this.classList.contains('expanded');
            
            // Cambiar texto del botón
            if (isExpanded) {
                this.classList.remove('expanded');
                this.innerHTML = 'Ver más ' + (sectionType === 'videos' ? 'videos' : 
                                    sectionType === 'photos' ? 'evidencias' : 'casos');
            } else {
                this.classList.add('expanded');
                this.innerHTML = 'Ver menos ' + (sectionType === 'videos' ? 'videos' : 
                                    sectionType === 'photos' ? 'evidencias' : 'casos');
            }

            // Mostrar/ocultar contenido adicional según la sección
            switch(sectionType) {
                case 'videos':
                    toggleVideoGrid();
                    break;
                case 'photos':
                    togglePhotoGallery();
                    break;
                case 'cases':
                    toggleCasesGrid();
                    break;
            }
        });
    });

    // ===== FUNCIÓN PARA VIDEOS ADICIONALES - CORREGIDA =====
    function toggleVideoGrid() {
        const videoGridAdditional = document.querySelector('.video-grid-additional');
        const videoGrid = document.querySelector('.video-grid');
        const btnExpand = document.querySelector('.btn-expand[data-section="videos"]');
        
        if (!videoGridAdditional) return;

        // FORZAR reset de estilos antes de mostrar
        if (!videoGridAdditional.classList.contains('active')) {
            // Reset completo de estilos
            videoGridAdditional.style.cssText = '';
            
            // Aplicar clase active
            videoGridAdditional.classList.add('active');
            
            // Scroll suave al grid adicional
            setTimeout(() => {
                videoGridAdditional.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 100);
        } else {
            videoGridAdditional.classList.remove('active');
        }
    }

    function togglePhotoGallery() {
        const photoGalleryAdditional = document.querySelector('.photo-gallery-additional');
        if (photoGalleryAdditional) {
            photoGalleryAdditional.classList.toggle('active');
        }
    }

    function toggleCasesGrid() {
        const casesGridAdditional = document.querySelector('.cases-grid-additional');
        if (casesGridAdditional) {
            casesGridAdditional.classList.toggle('active');
        }
    }

    // ===== FUNCIONALIDAD DE VIDEOS =====
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.querySelectorAll('.close-modal');
    const videoLoading = document.querySelector('.video-loading');

    // Botones "Ver más" en descripciones de video
    const videoReadMoreButtons = document.querySelectorAll('.video-read-more');
    
    videoReadMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const videoDescription = this.previousElementSibling;
            
            if (videoDescription.classList.contains('truncated')) {
                videoDescription.classList.remove('truncated');
                this.innerHTML = '<span>Ver menos</span><i class="fas fa-chevron-up"></i>';
                this.classList.add('expanded');
            } else {
                videoDescription.classList.add('truncated');
                this.innerHTML = '<span>Ver más</span><i class="fas fa-chevron-down"></i>';
                this.classList.remove('expanded');
            }
        });
    });

    // Reproducir video en modal
    videoCards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        const videoElement = card.querySelector('.video-player');
        const videoSource = card.querySelector('source').src;

        if (playButton && videoModal && modalVideo) {
            playButton.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Mostrar loading
                if (videoLoading) videoLoading.classList.add('show');
                
                // Configurar video modal
                modalVideo.innerHTML = '';
                const source = document.createElement('source');
                source.src = videoSource;
                source.type = 'video/mp4';
                modalVideo.appendChild(source);
                
                // Mostrar modal
                videoModal.classList.add('active');
                
                // Cargar y reproducir video
                modalVideo.load();
                modalVideo.oncanplay = function() {
                    if (videoLoading) videoLoading.classList.remove('show');
                    modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
                };
                
                modalVideo.onerror = function() {
                    if (videoLoading) videoLoading.classList.remove('show');
                    console.error('Error loading video');
                };
            });
        }

        // Hover effects para video cards
        card.addEventListener('mouseenter', function() {
            const video = this.querySelector('.video-player');
            if (video) {
                video.play().catch(e => {
                    // Silenciar error de autoplay
                });
            }
        });

        card.addEventListener('mouseleave', function() {
            const video = this.querySelector('.video-player');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
    });

    // Cerrar modales
    closeModal.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                
                // Pausar video si está reproduciéndose
                if (modalVideo) {
                    modalVideo.pause();
                    modalVideo.currentTime = 0;
                }
            }
        });
    });

    // Cerrar modal al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.currentTime = 0;
            }
        }
    });

    // Cerrar modal con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                if (modalVideo) {
                    modalVideo.pause();
                    modalVideo.currentTime = 0;
                }
            }
        }
    });

    // ===== GALERÍA DE IMÁGENES =====
    const galleryImages = document.querySelectorAll('.gallery-image');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            if (imageModal && modalImage) {
                modalImage.src = this.src;
                modalImage.alt = this.alt;
                imageModal.classList.add('active');
            }
        });
    });

    // ===== HISTORIAS DE USUARIOS EXPANDIBLES =====
    const storyItems = document.querySelectorAll('.story-item');
    const storyCloseButtons = document.querySelectorAll('.story-close');

    storyItems.forEach((item, index) => {
        // Solo hacer expandible si no es móvil
        if (window.innerWidth > 768) {
            item.addEventListener('click', function() {
                // Cerrar cualquier historia expandida
                storyItems.forEach(story => {
                    if (story !== this) story.classList.remove('expanded');
                });
                
                // Alternar estado actual
                this.classList.toggle('expanded');
                
                // Scroll a la historia si está expandida
                if (this.classList.contains('expanded')) {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }

        // Cerrar historia al hacer clic en el botón X
        if (storyCloseButtons[index]) {
            storyCloseButtons[index].addEventListener('click', function(e) {
                e.stopPropagation();
                item.classList.remove('expanded');
            });
        }
    });

    // Cerrar historia expandida al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.story-item.expanded') && !e.target.classList.contains('story-item')) {
            storyItems.forEach(item => {
                item.classList.remove('expanded');
            });
        }
    });

    // ===== SCROLL SUAVE PARA ENLACES INTERNOS =====
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== HEADER SCROLL EFFECT =====
    const mainHeader = document.querySelector('.main-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            mainHeader.style.background = 'rgba(10, 14, 23, 0.98)';
            mainHeader.style.backdropFilter = 'blur(15px)';
            mainHeader.style.padding = '0.3rem 0';
        } else {
            mainHeader.style.background = 'rgba(10, 14, 23, 0.95)';
            mainHeader.style.backdropFilter = 'blur(10px)';
            mainHeader.style.padding = '0.5rem 0';
        }

        // Ocultar/mostrar header al hacer scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scroll hacia abajo
            mainHeader.style.transform = 'translateY(-100%)';
        } else {
            // Scroll hacia arriba
            mainHeader.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // ===== ANIMACIONES AL SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.video-card, .photo-item, .case-card, .news-card, .story-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== LOADING PARA VIDEOS =====
    const videoPlayers = document.querySelectorAll('.video-player');
    
    videoPlayers.forEach(video => {
        video.addEventListener('loadstart', function() {
            this.classList.add('loading');
        });
        
        video.addEventListener('canplay', function() {
            this.classList.remove('loading');
        });
        
        video.addEventListener('error', function() {
            this.classList.remove('loading');
            console.error('Error loading video:', this.src);
        });
    });

    // ===== PREVENIR COMPORTAMIENTOS POR DEFECTO =====
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'VIDEO' || e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // ===== MEJORAS DE ACCESIBILIDAD =====
    document.addEventListener('keydown', function(e) {
        // Navegación por teclado en modales
        if (e.key === 'Tab' && document.querySelector('.modal.active')) {
            const focusableElements = document.querySelector('.modal.active').querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length > 0) {
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });

    // ===== INICIALIZACIÓN DE COMPONENTES =====
    console.log('Misterios Cósmicos - JavaScript inicializado correctamente');

    // Forzar redibujado de grids en carga
    setTimeout(() => {
        const grids = document.querySelectorAll('.video-grid, .video-grid-additional');
        grids.forEach(grid => {
            grid.style.display = 'none';
            setTimeout(() => {
                grid.style.display = '';
            }, 50);
        });
    }, 1000);
});

// ===== POLYFILLS Y COMPATIBILIDAD =====
// Smooth scroll polyfill para navegadores antiguos
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = function() {
        const _scrollTo = function(element, to, duration) {
            const start = element.scrollTop;
            const change = to - start;
            let currentTime = 0;
            const increment = 20;

            const animateScroll = function() {
                currentTime += increment;
                const val = Math.easeInOutQuad(currentTime, start, change, duration);
                element.scrollTop = val;
                if (currentTime < duration) {
                    setTimeout(animateScroll, increment);
                }
            };
            animateScroll();
        };

        Math.easeInOutQuad = function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        };

        Element.prototype.scrollTo = function(options) {
            if (typeof options === 'object') {
                _scrollTo(this, options.top, options.behavior === 'smooth' ? 600 : 0);
            } else {
                this.scrollTop = options;
            }
        };

        window.scrollTo = function(options) {
            if (typeof options === 'object') {
                _scrollTo(document.documentElement, options.top, options.behavior === 'smooth' ? 600 : 0);
            } else {
                document.documentElement.scrollTop = options;
            }
        };
    };
    smoothScrollPolyfill();
}