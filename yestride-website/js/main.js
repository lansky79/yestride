// Yestride 企业官网 - 交互脚本

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');
    
    // Create backdrop element
    const backdrop = document.createElement('div');
    backdrop.className = 'fixed inset-0 bg-black bg-opacity-50 z-30 hidden';
    document.body.appendChild(backdrop);

    // Toggle mobile menu
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('translate-x-full');
            backdrop.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on links or backdrop
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('translate-x-full');
                backdrop.classList.add('hidden');
            });
        });

        backdrop.addEventListener('click', function() {
            mobileMenu.classList.add('translate-x-full');
            backdrop.classList.add('hidden');
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

function initCasesCarousel() {
    const container = document.getElementById('cases-container');
    const wrapper = document.getElementById('cases-wrapper');
    const prevBtn = document.getElementById('cases-prev');
    const nextBtn = document.getElementById('cases-next');
    const indicators = document.getElementById('cases-indicators');
    const prevBtnMobile = document.getElementById('cases-prev-mobile'); // New
    const nextBtnMobile = document.getElementById('cases-next-mobile'); // New

    if (!container || !wrapper) return;

    const cards = Array.from(wrapper.children);
    const totalCards = cards.length;
    let currentIndex = 0;
    let itemsPerPage = 3;

    let isDragging = false,
        startX = 0,
        currentTranslate = 0,
        prevTranslate = 0,
        animationID = 0;

    function updateButtonsAndIndicators() {
        const isMobile = window.innerWidth < 768;

        // Update Indicators
        if (indicators) {
            indicators.innerHTML = '';
            if (isMobile) {
                indicators.style.display = 'flex'; // Show indicators on mobile
                for (let i = 0; i < totalCards; i++) {
                    const indicator = document.createElement('div');
                    indicator.className = 'indicator';
                    if (i === currentIndex) {
                        indicator.classList.add('active');
                    }
                    indicator.addEventListener('click', () => {
                        currentIndex = i;
                        setPositionByIndex();
                        updateButtonsAndIndicators();
                    });
                    indicators.appendChild(indicator);
                }
            } else { // Desktop
                indicators.style.display = 'flex'; // Show indicators on desktop
                const numIndicatorDots = totalCards - itemsPerPage + 1;
                for (let i = 0; i < numIndicatorDots; i++) {
                    const indicator = document.createElement('div');
                    indicator.className = 'indicator';
                    if (i === currentIndex) {
                        indicator.classList.add('active');
                    }
                    indicator.addEventListener('click', () => {
                        currentIndex = i;
                        setPositionByIndex();
                        updateButtonsAndIndicators();
                    });
                    indicators.appendChild(indicator);
                }
            }
        }

        // Update Buttons
        if (prevBtn) {
            prevBtn.style.display = (isMobile || currentIndex === 0) ? 'none' : 'flex';
        }
        if (nextBtn) {
            nextBtn.style.display = (isMobile || currentIndex >= totalCards - itemsPerPage) ? 'none' : 'flex';
        }
        // Update Mobile Fallback Buttons
        if (prevBtnMobile) {
            const canGoPrev = (isMobile && currentIndex > 0);
            prevBtnMobile.style.display = canGoPrev ? 'flex' : 'none';
            // Add color logic for mobile buttons
            if (canGoPrev) {
                prevBtnMobile.classList.add('active-nav-btn');
            } else {
                prevBtnMobile.classList.remove('active-nav-btn');
            }
        }
        if (nextBtnMobile) {
            const canGoNext = (isMobile && currentIndex < totalCards - itemsPerPage);
            nextBtnMobile.style.display = canGoNext ? 'flex' : 'none';
            // Add color logic for mobile buttons
            if (canGoNext) {
                nextBtnMobile.classList.add('active-nav-btn');
            } else {
                nextBtnMobile.classList.remove('active-nav-btn');
            }
        }
    }

    function setupCarousel() {
        const isMobile = window.innerWidth < 768;
        itemsPerPage = isMobile ? 1 : 3;

        wrapper.style.transform = '';
        wrapper.classList.add('flex');
        container.classList.add('overflow-hidden');

        if (isMobile) {
            cards.forEach(card => {
                card.style.flex = '0 0 100%';
                card.style.padding = '0 0.5rem';
            });
            // No explicit hide for indicators here, it's handled in updateButtonsAndIndicators
            if (prevBtn) prevBtn.style.display = 'none';     // Hide prev button on mobile
            if (nextBtn) nextBtn.style.display = 'none';     // Hide next button on mobile
        } else { // Desktop
            const cardWidth = 100 / itemsPerPage;
            cards.forEach(card => {
                card.style.flex = `0 0 ${cardWidth}%`;
                card.style.padding = '0 0.75rem';
            });
            // Indicators and buttons are shown/hidden by updateButtonsAndIndicators
        }
        
        if (currentIndex > totalCards - itemsPerPage) {
            currentIndex = Math.max(0, totalCards - itemsPerPage);
        }
        
        setPositionByIndex();
        updateButtonsAndIndicators();
    }
    
    function setPositionByIndex() {
        const cardWidth = container.clientWidth / itemsPerPage;
        currentTranslate = currentIndex * -cardWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }

    function setSliderPosition() {
        wrapper.style.transform = `translateX(${currentTranslate}px)`;
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function touchStart(index) {
        return function(event) {
            if (window.innerWidth >= 768) return;
            currentIndex = index;
            startX = getPositionX(event);
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            wrapper.classList.remove('transition-transform', 'duration-300', 'ease-in-out');
        }
    }

    function touchMove(event) {
        if (window.innerWidth >= 768) return;
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startX;
        }
    }

    function touchEnd() {
        if (window.innerWidth >= 768) return;
        cancelAnimationFrame(animationID);
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < totalCards - 1) {
            currentIndex += 1;
        }

        if (movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1;
        }
        
        setPositionByIndex();
        wrapper.classList.add('transition-transform', 'duration-300', 'ease-in-out');
        updateButtonsAndIndicators();
    }

    function animation() {
        if (isDragging) {
            setSliderPosition();
            requestAnimationFrame(animation);
        }
    }

    function slide(direction) {
        const isMobile = window.innerWidth < 768;
        if (isMobile) return;

        let increment = direction === 'next' ? 1 : -1;
        let newIndex = currentIndex + increment;

        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex > totalCards - itemsPerPage) {
            newIndex = totalCards - itemsPerPage;
        }
        
        currentIndex = newIndex;
        wrapper.classList.add('transition-transform', 'duration-300', 'ease-in-out');
        setPositionByIndex();
        updateButtonsAndIndicators();
    }

    // New slideMobile function for the fallback buttons
    function slideMobile(direction) {
        const isMobile = window.innerWidth < 768;
        if (!isMobile) return; // Only for mobile

        let increment = direction === 'next' ? 1 : -1;
        let newIndex = currentIndex + increment;

        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex > totalCards - itemsPerPage) {
            newIndex = totalCards - itemsPerPage;
        }

        currentIndex = newIndex;
        wrapper.classList.add('transition-transform', 'duration-300', 'ease-in-out');
        setPositionByIndex();
        updateButtonsAndIndicators();
    }
    
    // Attach Listeners
    cards.forEach((card, index) => {
        card.addEventListener('touchstart', touchStart(index), { passive: true });
        card.addEventListener('touchmove', touchMove);
        card.addEventListener('touchend', touchEnd);
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => slide('prev'));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => slide('next'));
    }
    // Attach listeners for mobile fallback buttons
    if (prevBtnMobile) {
        prevBtnMobile.addEventListener('click', () => slideMobile('prev'));
    }
    if (nextBtnMobile) {
        nextBtnMobile.addEventListener('click', () => slideMobile('next'));
    }

    // Initial Setup
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setupCarousel();
        }, 250);
    });

    setupCarousel();
}
