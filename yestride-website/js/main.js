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
    
    let currentIndex = 0;
    const cardsPerView = 3; // 每次显示3个案例
    const maxIndex = totalCards - cardsPerView; // 最大滚动位置
    
    // 创建指示器 - 短横线样式
    if (indicators) {
        const totalIndicators = maxIndex + 1;
        for (let i = 0; i < totalIndicators; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToIndex(i));
            indicators.appendChild(indicator);
        }
    }
    
    // 更新显示
    function updateDisplay() {
        cards.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + cardsPerView) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // 更新指示器
        if (indicators) {
            const dots = indicators.querySelectorAll('.indicator');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // 更新按钮状态
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex === maxIndex;
            nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
            nextBtn.style.cursor = currentIndex === maxIndex ? 'not-allowed' : 'pointer';
        }
    }
    
    // 跳转到指定索引
    function goToIndex(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateDisplay();
    }
    
    // 上一个
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                goToIndex(currentIndex - 1);
            }
        });
    }
    
    // 下一个
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                goToIndex(currentIndex + 1);
            }
        });
    }
    
    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToIndex(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            goToIndex(currentIndex + 1);
        }
    });
    
    // 初始化显示
    updateDisplay();
}
