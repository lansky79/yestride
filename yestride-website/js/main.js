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
});

// 案例轮播功能
function initCasesCarousel() {
    const container = document.getElementById('cases-container');
    const prevBtn = document.getElementById('cases-prev');
    const nextBtn = document.getElementById('cases-next');
    const indicators = document.getElementById('cases-indicators');
    
    if (!container) return;
    
    const cards = container.querySelectorAll('.case-card');
    const totalCards = cards.length;
    
    // 如果案例数量 <= 3，隐藏箭头
    if (totalCards <= 3) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }
    
    let currentPage = 0;
    const cardsPerPage = 3; // 每页显示3个案例
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    
    // 创建指示器
    if (indicators) {
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = 'w-2 h-2 rounded-full transition-all';
            dot.style.backgroundColor = i === 0 ? 'var(--primary-color)' : '#D1D5DB';
            dot.addEventListener('click', () => goToPage(i));
            indicators.appendChild(dot);
        }
    }
    
    // 更新显示
    function updateDisplay() {
        const startIndex = currentPage * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        
        cards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // 更新指示器
        if (indicators) {
            const dots = indicators.querySelectorAll('button');
            dots.forEach((dot, index) => {
                dot.style.backgroundColor = index === currentPage ? 'var(--primary-color)' : '#D1D5DB';
                dot.style.width = index === currentPage ? '1.5rem' : '0.5rem';
            });
        }
        
        // 更新按钮状态
        if (prevBtn) {
            prevBtn.disabled = currentPage === 0;
            prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
        }
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages - 1;
            nextBtn.style.opacity = currentPage === totalPages - 1 ? '0.5' : '1';
        }
    }
    
    // 跳转到指定页
    function goToPage(page) {
        currentPage = Math.max(0, Math.min(page, totalPages - 1));
        updateDisplay();
    }
    
    // 上一页
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 0) {
                goToPage(currentPage - 1);
            }
        });
    }
    
    // 下一页
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages - 1) {
                goToPage(currentPage + 1);
            }
        });
    }
    
    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToPage(currentPage - 1);
        } else if (e.key === 'ArrowRight') {
            goToPage(currentPage + 1);
        }
    });
    
    // 初始化显示
    updateDisplay();
}
