// Yestride 企业官网 - 交互脚本

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');
    
    // Toggle mobile menu
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Header shadow on scroll
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                header.classList.add('header-shadow');
            } else {
                header.classList.remove('header-shadow');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Cases Carousel (案例轮播)
    initCasesCarousel();

    // About Us section image hover effect
    const aboutSectionGrid = document.querySelector('#about .grid');
    const brandLogoRow = document.querySelector('#about .brand-logo-row');

    if (aboutSectionGrid && brandLogoRow) {
        aboutSectionGrid.addEventListener('mouseenter', () => {
            brandLogoRow.classList.add('active');
        });

        aboutSectionGrid.addEventListener('mouseleave', () => {
            brandLogoRow.classList.remove('active');
        });
    }
});

// 案例轮播功能
function initCasesCarousel() {
    const container = document.getElementById('cases-container');
    const prevBtn = document.getElementById('cases-prev');
    const nextBtn = document.getElementById('cases-next');
    const indicators = document.getElementById('cases-indicators');

    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.case-card'));
    const totalCards = cards.length;
    let cardsPerView = 3;
    let maxIndex = totalCards - cardsPerView;
    let currentIndex = 0;

    function setupCarousel() {
        const isMobile = window.innerWidth < 768;
        cardsPerView = isMobile ? 1 : 3;
        maxIndex = totalCards - cardsPerView;

        if (totalCards <= cardsPerView) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (indicators) indicators.style.display = 'none';
            cards.forEach(card => card.style.display = 'block');
            return;
        } else {
            // 在md断点处，按钮本就是 flex，此处确保其可见性
            if (prevBtn) prevBtn.style.display = 'flex';
            if (nextBtn) nextBtn.style.display = 'flex';
            if (indicators) indicators.style.display = 'flex';
        }

        if (indicators) {
            indicators.innerHTML = '';
            const totalIndicators = maxIndex + 1;
            for (let i = 0; i < totalIndicators; i++) {
                const indicator = document.createElement('div');
                indicator.className = 'indicator';
                indicator.addEventListener('click', () => goToIndex(i));
                indicators.appendChild(indicator);
            }
        }
        
        goToIndex(0);
    }

    function goToIndex(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateDisplay();
    }

    function updateDisplay() {
        cards.forEach((card, index) => {
            card.style.display = (index >= currentIndex && index < currentIndex + cardsPerView) ? 'block' : 'none';
        });

        if (indicators) {
            const dots = indicators.querySelectorAll('.indicator');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex >= maxIndex;
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) goToIndex(currentIndex - 1);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) goToIndex(currentIndex + 1);
        });
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setupCarousel, 250);
    });

    setupCarousel();
}
