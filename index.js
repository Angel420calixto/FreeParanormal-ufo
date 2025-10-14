// index.js - VERSIÓN COMPLETA Y CORREGIDA
document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const verMasGaleriaBtn = document.getElementById('verMasGaleriaBtn');
    const verMasCasosBtn = document.getElementById('verMasCasosBtn');
    const hiddenGalleryRow = document.getElementById('hiddenGalleryRow');
    const hiddenCasesRow = document.getElementById('hiddenCasesRow');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const verEvidenciasBtn = document.getElementById('verEvidenciasBtn');
    const unirseComunidadBtn = document.getElementById('unirseComunidadBtn');
    const compartirTestimonioBtn = document.getElementById('compartirTestimonioBtn');
    const mainVideoPlayer = document.getElementById('mainVideoPlayer');
    const sidebarVideoCards = document.querySelectorAll('.sidebar-video-card');

    // Estado de la aplicación
    let isGalleryExpanded = false;
    let isCasesExpanded = false;

    // ===== FUNCIÓN PARA EL SIDEBAR MÓVIL =====
    function initSidebar() {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            document.body.classList.toggle('sidebar-open');

            // Prevenir scroll del body cuando el sidebar está abierto
            if (sidebar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Cerrar sidebar al hacer clic fuera de él
        document.addEventListener('click', function (event) {
            if (sidebar.classList.contains('active') &&
                !sidebar.contains(event.target) &&
                !menuToggle.contains(event.target)) {
                closeSidebar();
            }
        });

        // Prevenir que los clics dentro del sidebar cierren el menú
        sidebar.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        // Cerrar sidebar con ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });

        function closeSidebar() {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
            document.body.style.overflow = '';
        }
    }

    // ===== FUNCIÓN PARA EXPANDIR GALERÍA =====
    function initGalleryExpand() {
        if (verMasGaleriaBtn && hiddenGalleryRow) {
            verMasGaleriaBtn.addEventListener('click', function () {
                isGalleryExpanded = !isGalleryExpanded;

                if (isGalleryExpanded) {
                    hiddenGalleryRow.classList.add('active');
                    verMasGaleriaBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Ver menos evidencias';
                    // Scroll suave a la sección expandida
                    setTimeout(() => {
                        hiddenGalleryRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 300);
                } else {
                    hiddenGalleryRow.classList.remove('active');
                    verMasGaleriaBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Ver más evidencias';
                }
            });
        }
    }

    // ===== FUNCIÓN PARA EXPANDIR CASOS =====
    function initCasesExpand() {
        if (verMasCasosBtn && hiddenCasesRow) {
            verMasCasosBtn.addEventListener('click', function () {
                isCasesExpanded = !isCasesExpanded;

                if (isCasesExpanded) {
                    hiddenCasesRow.classList.add('active');
                    verMasCasosBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Ver menos casos';
                    // Scroll suave a la sección expandida
                    setTimeout(() => {
                        hiddenCasesRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 300);
                } else {
                    hiddenCasesRow.classList.remove('active');
                    verMasCasosBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Explorar más casos';
                }
            });
        }
    }

    // ===== FUNCIÓN PARA EL MODAL DE IMÁGENES =====
    function initImageModal() {
        const galleryItems = document.querySelectorAll('.gallery-item');

        galleryItems.forEach(item => {
            item.addEventListener('click', function () {
                const imageSrc = this.getAttribute('data-src') || this.querySelector('img').src;
                if (imageSrc) {
                    modalImage.src = imageSrc;
                    imageModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Cerrar modal
        modalClose.addEventListener('click', closeModal);

        imageModal.addEventListener('click', function (event) {
            if (event.target === imageModal) {
                closeModal();
            }
        });

        // Cerrar modal con ESC
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && imageModal.classList.contains('active')) {
                closeModal();
            }
        });

        function closeModal() {
            imageModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ===== FUNCIÓN PARA CAMBIAR VIDEOS =====
    function initVideoPlayer() {
        sidebarVideoCards.forEach(card => {
            card.addEventListener('click', function () {
                const videoId = this.getAttribute('data-video-id');
                const videoTitle = this.getAttribute('data-video-title');

                if (videoId && videoTitle) {
                    // Actualizar iframe del video
                    mainVideoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

                    // Actualizar título
                    const titleElement = document.querySelector('.main-video-title');
                    if (titleElement) {
                        titleElement.textContent = videoTitle;
                    }

                    // Actualizar estado activo
                    sidebarVideoCards.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }

    // ===== FUNCIÓN PARA BOTONES DE ACCIÓN =====
    function initActionButtons() {
        if (verEvidenciasBtn) {
            verEvidenciasBtn.addEventListener('click', function () {
                const videosSection = document.getElementById('videos');
                if (videosSection) {
                    videosSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        if (unirseComunidadBtn) {
            unirseComunidadBtn.addEventListener('click', function () {
                alert('¡Próximamente podrás unirte a nuestra comunidad exclusiva!');
            });
        }

        if (compartirTestimonioBtn) {
            compartirTestimonioBtn.addEventListener('click', function () {
                alert('¡Próximamente podrás compartir tu testimonio con nosotros!');
            });
        }
    }

    // ===== FUNCIÓN PARA NAVEGACIÓN SUAVE =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Solo procesar enlaces internos que no sean solo #
                if (href !== '#' && href !== '') {
                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        // Cerrar sidebar en móvil
                        if (window.innerWidth <= 1024) {
                            sidebar.classList.remove('active');
                            document.body.classList.remove('sidebar-open');
                            document.body.style.overflow = '';
                        }

                        const headerHeight = 64;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ===== FUNCIÓN PARA ANIMACIONES AL SCROLL =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observar elementos para animación
        document.querySelectorAll('.news-card, .gallery-item, .case-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== FUNCIÓN PARA LAZY LOADING =====
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if ('loading' in HTMLImageElement.prototype) {
            // El navegador soporta lazy loading nativo
            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback para navegadores antiguos
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.remove('image-loading');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.classList.add('image-loading');
                    imageObserver.observe(img);
                }
            });
        }
    }

    // ===== FUNCIÓN PARA SCROLL HORIZONTAL EN MÓVIL =====
    function initHorizontalScroll() {
        if (window.innerWidth <= 768) {
            const horizontalSections = [
                '.news-grid',
                '.gallery-row',
                '.cases-row',
                '.testimonials-grid',
                '.video-sidebar-list'
            ];

            horizontalSections.forEach(selector => {
                const sections = document.querySelectorAll(selector);
                sections.forEach(section => {
                    if (section.scrollWidth > section.clientWidth) {
                        let indicator = section.parentElement.querySelector('.scroll-indicator');
                        if (!indicator) {
                            indicator = document.createElement('div');
                            indicator.className = 'scroll-indicator';
                            indicator.innerHTML = '<i class="fas fa-arrow-left"></i> Desliza para ver más <i class="fas fa-arrow-right"></i>';
                            section.parentElement.appendChild(indicator);
                        }
                        indicator.style.display = 'block';
                    }
                });
            });
        }
    }

    // ===== FUNCIÓN PARA ACCESIBILIDAD =====
    function initAccessibility() {
        // Navegación por teclado del sidebar
        if (menuToggle) {
            menuToggle.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    sidebar.classList.toggle('active');
                    document.body.classList.toggle('sidebar-open');
                }
            });
        }

        // Mejorar focus para elementos interactivos
        document.querySelectorAll('.btn, .nav-item, .gallery-item, .case-card').forEach(el => {
            el.setAttribute('tabindex', '0');
        });
    }

    // ===== INICIALIZACIÓN PRINCIPAL =====
    function init() {
        console.log('FreeParanormal - Inicializando sitio...');

        // Verificar que los elementos críticos existen
        console.log('Elementos críticos:', {
            menuToggle: !!menuToggle,
            sidebar: !!sidebar,
            verMasGaleriaBtn: !!verMasGaleriaBtn,
            verMasCasosBtn: !!verMasCasosBtn,
            hiddenGalleryRow: !!hiddenGalleryRow,
            hiddenCasesRow: !!hiddenCasesRow
        });

        // Inicializar todas las funcionalidades
        initSidebar();
        initGalleryExpand();
        initCasesExpand();
        initImageModal();
        initVideoPlayer();
        initActionButtons();
        initSmoothScroll();
        initScrollAnimations();
        initLazyLoading();
        initHorizontalScroll();
        initAccessibility();

        console.log('FreeParanormal - Sitio inicializado correctamente');
    }

    // Inicializar cuando el DOM esté listo
    init();

    // Re-inicializar en resize para scroll horizontal
    window.addEventListener('resize', initHorizontalScroll);

    // Re-inicializar cuando la página se vuelve visible (pestaña activa)
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
            initHorizontalScroll();
        }
    });
});