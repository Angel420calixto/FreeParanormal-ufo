// espiritualidad.js - JavaScript para la página de espiritualidad

document.addEventListener('DOMContentLoaded', function() {
    // ===== INICIALIZACIÓN =====
    console.log('Página de Espiritualidad cargada - Diseño Orgánico');
    
    // ===== PARTÍCULAS EN HERO =====
    function initParticles() {
        const particlesContainer = document.getElementById('spiritualParticles');
        if (!particlesContainer) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'spiritual-particle';
            
            // Posición aleatoria
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Tamaño aleatorio
            const size = Math.random() * 4 + 1;
            
            // Opacidad aleatoria
            const opacity = Math.random() * 0.6 + 0.1;
            
            // Duración de animación aleatoria
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background: var(--color-accent);
                border-radius: 50%;
                opacity: ${opacity};
                animation: floatParticle ${duration}s linear ${delay}s infinite;
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        // Agregar keyframes para partículas
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== MENÚ MÓVIL =====
    function initMobileMenu() {
        const menuToggle = document.getElementById('spiritualMenuToggle');
        const navLinks = document.querySelector('.spiritual-nav-links');
        
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function() {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                menuToggle.classList.toggle('active');
            });
            
            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', function(event) {
                if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                    navLinks.style.display = 'none';
                    menuToggle.classList.remove('active');
                }
            });
        }
    }
    
    // ===== INTERACTIVIDAD DE TARJETAS =====
    function initCardsInteractivity() {
        // Efecto hover en tarjetas de camino
        const pathCards = document.querySelectorAll('.spiritual-path-card');
        pathCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Efecto en tarjetas de experiencia
        const experienceCards = document.querySelectorAll('.spiritual-experience-card');
        experienceCards.forEach(card => {
            card.addEventListener('click', function() {
                openExperienceModal(this);
            });
        });
    }
    
    // ===== MODAL DE EXPERIENCIAS =====
    function openExperienceModal(card) {
        const modal = document.getElementById('experienceModal');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalBody) return;
        
        // Obtener datos de la tarjeta
        const title = card.querySelector('h3').textContent;
        const author = card.querySelector('.spiritual-experience-meta h4').textContent;
        const authorInfo = card.querySelector('.spiritual-experience-meta span').textContent;
        const content = card.querySelector('p').textContent;
        const tags = Array.from(card.querySelectorAll('.spiritual-tag')).map(tag => tag.textContent);
        
        // Construir contenido del modal
        modalBody.innerHTML = `
            <article class="spiritual-modal-experience">
                <header class="spiritual-modal-header">
                    <div class="spiritual-modal-author">
                        <h2>${title}</h2>
                        <div class="spiritual-modal-meta">
                            <strong>${author}</strong>
                            <span>${authorInfo}</span>
                        </div>
                    </div>
                </header>
                
                <div class="spiritual-modal-content">
                    <p>${content}</p>
                    <p>Esta experiencia espiritual marcó un antes y un después en mi vida. El proceso de expansión de conciencia me permitió acceder a niveles de comprensión que antes solo intuía. Cada día practico las técnicas que aprendí y continúo mi camino de crecimiento interior.</p>
                    
                    <blockquote class="spiritual-quote">
                        "La verdadera espiritualidad no consiste en buscar experiencias extraordinarias, sino en encontrar lo extraordinario en la experiencia ordinaria."
                    </blockquote>
                    
                    <div class="spiritual-modal-tags">
                        ${tags.map(tag => `<span class="spiritual-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        `;
        
        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        const modal = document.getElementById('experienceModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // ===== PRÁCTICAS GUIADAS =====
    function initPractices() {
        const practiceItems = document.querySelectorAll('.spiritual-practice-item');
        const mainPractice = document.querySelector('.spiritual-practice-main');
        
        practiceItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remover clase activa de todos los items
                practiceItems.forEach(i => i.classList.remove('spiritual-practice-active'));
                
                // Agregar clase activa al item clickeado
                this.classList.add('spiritual-practice-active');
                
                // Actualizar contenido principal (simulado)
                const title = this.querySelector('h4').textContent;
                const duration = this.querySelector('span').textContent;
                
                if (mainPractice) {
                    const mainTitle = mainPractice.querySelector('h3');
                    const mainDuration = mainPractice.querySelector('.spiritual-meta-item:nth-child(1) span');
                    
                    if (mainTitle) mainTitle.textContent = title;
                    if (mainDuration) mainDuration.textContent = duration.split('·')[0].trim();
                }
            });
        });
    }
    
    // ===== BOTONES DE ACCIÓN =====
    function initActionButtons() {
        const exploreBtn = document.getElementById('exploreJourney');
        const meditationBtn = document.getElementById('watchMeditation');
        
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function() {
                showNotification('¡Bienvenido a tu viaje espiritual!', 'success');
                // Scroll a la sección de camino
                document.querySelector('.spiritual-path').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            });
        }
        
        if (meditationBtn) {
            meditationBtn.addEventListener('click', function() {
                showNotification('Iniciando meditación guiada...', 'info');
                // Scroll a la sección de prácticas
                document.querySelector('.spiritual-practices').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            });
        }
        
        // Botones de unirse a comunidad
        const communityBtns = document.querySelectorAll('.spiritual-btn-primary');
        communityBtns.forEach(btn => {
            if (btn.textContent.includes('Unirse')) {
                btn.addEventListener('click', function() {
                    showNotification('Redirigiendo a nuestra comunidad...', 'info');
                    // Simular redirección
                    setTimeout(() => {
                        window.open('https://discord.gg/example', '_blank');
                    }, 1000);
                });
            }
        });
    }
    
    // ===== SISTEMA DE NOTIFICACIONES =====
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `spiritual-notification spiritual-notification-${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <div class="spiritual-notification-content">
                <i class="${icons[type] || icons.info}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Estilos
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-secondary);
            color: var(--color-text);
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            border-left: 4px solid var(--color-${type});
            box-shadow: var(--shadow-medium);
            z-index: 3000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            border: 1px solid var(--color-border);
        `;
        
        // Colores según tipo
        const typeColors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#8b5cf6'
        };
        
        notification.style.borderLeftColor = typeColors[type] || typeColors.info;
        
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-eliminar después de 4 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observar elementos animables
        const animatedElements = document.querySelectorAll(
            '.spiritual-path-card, .spiritual-experience-card, .spiritual-practice-item'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // ===== EVENT LISTENERS GLOBALES =====
    function initGlobalEvents() {
        // Cerrar modal
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }
        
        // Cerrar modal al hacer clic fuera
        const modal = document.getElementById('experienceModal');
        if (modal) {
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });
        }
        
        // Cerrar modal con ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
        
        // Header scroll effect
        let lastScroll = 0;
        const header = document.querySelector('.spiritual-header');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (header) {
                if (currentScroll > 100) {
                    header.style.background = 'rgba(10, 15, 28, 0.98)';
                    header.style.backdropFilter = 'blur(20px)';
                } else {
                    header.style.background = 'rgba(10, 15, 28, 0.95)';
                }
                
                lastScroll = currentScroll;
            }
        });
    }
    
    // ===== INICIALIZAR TODO =====
    function init() {
        initParticles();
        initMobileMenu();
        initCardsInteractivity();
        initPractices();
        initActionButtons();
        initScrollAnimations();
        initGlobalEvents();
        
        console.log('Sistema espiritual inicializado correctamente');
    }
    
    // Ejecutar inicialización
    init();
});