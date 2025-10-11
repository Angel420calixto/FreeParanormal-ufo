// JavaScript para funcionalidades mejoradas
document.addEventListener('DOMContentLoaded', function() {
    // Toggle del sidebar
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Funcionalidad de videos
    const videoCards = document.querySelectorAll('.sidebar-video-card');
    const mainVideoPlayer = document.getElementById('mainVideoPlayer');
    const mainVideoTitle = document.querySelector('.main-video-title');
    
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video-src');
            const videoTitle = this.getAttribute('data-video-title');
            
            if (mainVideoPlayer && videoSrc) {
                mainVideoPlayer.src = videoSrc;
                mainVideoPlayer.load();
                
                if (mainVideoTitle) {
                    mainVideoTitle.textContent = videoTitle;
                }
                
                // Resaltar el video seleccionado
                videoCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Funcionalidad de "Ver más" para galería
    const verMasGaleriaBtn = document.getElementById('verMasGaleriaBtn');
    const hiddenGalleryRow = document.getElementById('hiddenGalleryRow');
    
    if (verMasGaleriaBtn && hiddenGalleryRow) {
        verMasGaleriaBtn.addEventListener('click', function() {
            hiddenGalleryRow.classList.toggle('active');
            
            if (hiddenGalleryRow.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-chevron-up"></i> Ver menos evidencias';
            } else {
                this.innerHTML = '<i class="fas fa-chevron-down"></i> Ver más evidencias';
            }
        });
    }
    
    // Funcionalidad de "Ver más" para casos
    const verMasCasosBtn = document.getElementById('verMasCasosBtn');
    const hiddenCasesRow = document.getElementById('hiddenCasesRow');
    
    if (verMasCasosBtn && hiddenCasesRow) {
        verMasCasosBtn.addEventListener('click', function() {
            hiddenCasesRow.classList.toggle('active');
            
            if (hiddenCasesRow.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-chevron-up"></i> Ver menos casos';
            } else {
                this.innerHTML = '<i class="fas fa-chevron-down"></i> Explorar más casos';
            }
        });
    }
    
    // Funcionalidad de botones del hero
    const verEvidenciasBtn = document.getElementById('verEvidenciasBtn');
    const unirseComunidadBtn = document.getElementById('unirseComunidadBtn');
    
    if (verEvidenciasBtn) {
        verEvidenciasBtn.addEventListener('click', function() {
            document.getElementById('videos').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (unirseComunidadBtn) {
        unirseComunidadBtn.addEventListener('click', function() {
            alert('¡Próximamente podrás unirte a nuestra comunidad!');
        });
    }
    
    // Funcionalidad para compartir testimonio
    const compartirTestimonioBtn = document.getElementById('compartirTestimonioBtn');
    
    if (compartirTestimonioBtn) {
        compartirTestimonioBtn.addEventListener('click', function() {
            alert('¡Próximamente podrás compartir tu testimonio!');
        });
    }
    
    // Cerrar sidebar al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        if (sidebar && sidebar.classList.contains('active') && 
            !sidebar.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });
    
    // Cerrar sidebar al hacer clic en un enlace
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    });
});