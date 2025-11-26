// Smooth Tabs Functionality with Enhanced Interactions
class BeautifulTabs {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.tabIndicator = document.querySelector('.tab-indicator');
        this.currentTab = 0;
        
        this.init();
    }
    
    init() {
        // Add click event listeners to tab buttons
        this.tabButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                this.switchTab(index);
            });
            
            // Add ripple effect on click
            button.addEventListener('click', this.createRippleEffect);
            
            // Add hover sound effect (visual feedback)
            button.addEventListener('mouseenter', this.addHoverEffect);
            button.addEventListener('mouseleave', this.removeHoverEffect);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
        
        // Initialize first tab
        this.updateTabIndicator(0);
        
        // Add loading animation
        this.addLoadingAnimation();
        
        // Add scroll animations
        this.initScrollAnimations();
        
        // Add particle effects
        this.addParticleEffects();
    }
    
    switchTab(targetIndex) {
        // Prevent switching to the same tab
        if (targetIndex === this.currentTab) return;
        
        // Add switching animation class
        document.querySelector('.tabs-wrapper').classList.add('switching');
        
        // Remove active class from current tab
        this.tabButtons[this.currentTab].classList.remove('active');
        this.tabContents[this.currentTab].classList.remove('active');
        
        // Add smooth transition effect
        this.tabContents[this.currentTab].style.transform = 'translateX(-50px)';
        this.tabContents[this.currentTab].style.opacity = '0';
        
        setTimeout(() => {
            // Add active class to new tab
            this.tabButtons[targetIndex].classList.add('active');
            this.tabContents[targetIndex].classList.add('active');
            
            // Reset and animate new content
            this.tabContents[targetIndex].style.transform = 'translateX(50px)';
            this.tabContents[targetIndex].style.opacity = '0';
            
            requestAnimationFrame(() => {
                this.tabContents[targetIndex].style.transform = 'translateX(0)';
                this.tabContents[targetIndex].style.opacity = '1';
            });
            
            // Update indicator position
            this.updateTabIndicator(targetIndex);
            
            // Update current tab
            this.currentTab = targetIndex;
            
            // Remove switching class
            setTimeout(() => {
                document.querySelector('.tabs-wrapper').classList.remove('switching');
            }, 400);
            
            // Animate content elements
            this.animateContentElements(targetIndex);
            
        }, 200);
    }
    
    updateTabIndicator(index) {
        const button = this.tabButtons[index];
        const buttonRect = button.getBoundingClientRect();
        const navRect = button.parentElement.getBoundingClientRect();
        
        const left = buttonRect.left - navRect.left;
        const width = buttonRect.width;
        
        this.tabIndicator.style.transform = `translateX(${left}px)`;
        this.tabIndicator.style.width = `${width}px`;
        
        // Add a pulse effect to the indicator
        this.tabIndicator.style.transform += ' scale(1.05)';
        setTimeout(() => {
            this.tabIndicator.style.transform = `translateX(${left}px) scale(1)`;
        }, 200);
    }
    
    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    addHoverEffect(e) {
        const button = e.currentTarget;
        const icon = button.querySelector('.tab-icon');
        const text = button.querySelector('.tab-text');
        
        // Add glow effect
        button.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.3)';
        
        // Animate icon and text
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.filter = 'brightness(1.2)';
        }
        
        if (text) {
            text.style.transform = 'translateY(-2px)';
        }
    }
    
    removeHoverEffect(e) {
        const button = e.currentTarget;
        const icon = button.querySelector('.tab-icon');
        const text = button.querySelector('.tab-text');
        
        // Remove glow effect
        if (!button.classList.contains('active')) {
            button.style.boxShadow = '';
        }
        
        // Reset animations
        if (icon) {
            icon.style.transform = button.classList.contains('active') ? 'scale(1.1)' : '';
            icon.style.filter = '';
        }
        
        if (text) {
            text.style.transform = '';
        }
    }
    
    handleKeyboardNavigation(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            const direction = e.key === 'ArrowLeft' ? -1 : 1;
            const newIndex = (this.currentTab + direction + this.tabButtons.length) % this.tabButtons.length;
            this.switchTab(newIndex);
        }
    }
    
    animateContentElements(tabIndex) {
        const content = this.tabContents[tabIndex];
        const elements = content.querySelectorAll('.feature-item, .stat-item, .service-item, .portfolio-item, .contact-item');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100 + 100);
        });
    }
    
    addLoadingAnimation() {
        const wrapper = document.querySelector('.tabs-wrapper');
        wrapper.style.opacity = '0';
        wrapper.style.transform = 'translateY(50px) scale(0.95)';
        
        setTimeout(() => {
            wrapper.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            wrapper.style.opacity = '1';
            wrapper.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }
    
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        document.querySelectorAll('.feature-item, .stat-item, .service-item, .portfolio-item, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }
    
    addParticleEffects() {
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(102, 126, 234, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                animation: particle-float 3s linear infinite;
            `;
            
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        };
        
        // Create particles periodically
        setInterval(createParticle, 2000);
    }
}

// Enhanced interactions and effects
class EnhancedEffects {
    constructor() {
        this.initMouseTracker();
        this.initDynamicBackgrounds();
        this.initAdvancedAnimations();
    }
    
    initMouseTracker() {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Update background shapes based on mouse position
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.02;
                const x = (mouseX - window.innerWidth / 2) * speed;
                const y = (mouseY - window.innerHeight / 2) * speed;
                
                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
            
            // Add subtle parallax to the main wrapper
            const wrapper = document.querySelector('.tabs-wrapper');
            if (wrapper) {
                const x = (mouseX - window.innerWidth / 2) * 0.01;
                const y = (mouseY - window.innerHeight / 2) * 0.01;
                wrapper.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }
    
    initDynamicBackgrounds() {
        const body = document.body;
        let hue = 0;
        
        setInterval(() => {
            hue = (hue + 0.5) % 360;
            const color1 = `hsl(${hue}, 70%, 65%)`;
            const color2 = `hsl(${(hue + 60) % 360}, 70%, 55%)`;
            
            body.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
        }, 100);
    }
    
    initAdvancedAnimations() {
        // Add floating animation to content cards
        const cards = document.querySelectorAll('.content-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('floating');
        });
        
        // Add stagger animation to grid items
        const gridItems = document.querySelectorAll('.feature-item, .stat-item, .portfolio-item');
        gridItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                item.style.animationName = 'bounce';
                item.style.animationDuration = '0.6s';
                item.style.animationFillMode = 'both';
            });
            
            item.addEventListener('animationend', () => {
                item.style.animation = '';
            });
        });
    }
}

// Auto-rotation feature (optional)
class AutoRotate {
    constructor(tabs, interval = 10000) {
        this.tabs = tabs;
        this.interval = interval;
        this.autoRotateTimer = null;
        this.isAutoRotating = false;
        
        this.initAutoRotate();
    }
    
    initAutoRotate() {
        const wrapper = document.querySelector('.tabs-wrapper');
        
        // Pause auto-rotation on hover
        wrapper.addEventListener('mouseenter', () => {
            this.pause();
        });
        
        wrapper.addEventListener('mouseleave', () => {
            this.resume();
        });
        
        // Start auto-rotation
        this.start();
    }
    
    start() {
        this.isAutoRotating = true;
        this.autoRotateTimer = setInterval(() => {
            const nextIndex = (this.tabs.currentTab + 1) % this.tabs.tabButtons.length;
            this.tabs.switchTab(nextIndex);
        }, this.interval);
    }
    
    pause() {
        if (this.autoRotateTimer) {
            clearInterval(this.autoRotateTimer);
            this.autoRotateTimer = null;
        }
        this.isAutoRotating = false;
    }
    
    resume() {
        if (!this.isAutoRotating) {
            this.start();
        }
    }
    
    stop() {
        this.pause();
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.initLazyLoading();
        this.initThrottling();
    }
    
    initLazyLoading() {
        // Lazy load tab content
        const tabContents = document.querySelectorAll('.tab-content:not(.active)');
        tabContents.forEach(content => {
            const images = content.querySelectorAll('img');
            images.forEach(img => {
                img.loading = 'lazy';
            });
        });
    }
    
    initThrottling() {
        // Throttle resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Re-calculate tab indicator position
                const tabs = window.beautifulTabs;
                if (tabs) {
                    tabs.updateTabIndicator(tabs.currentTab);
                }
            }, 250);
        });
    }
}

// Add required CSS animations dynamically
const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes particle-float {
            from {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
                transform: translate3d(0, 0, 0);
            }
            40%, 43% {
                transform: translate3d(0, -15px, 0);
            }
            70% {
                transform: translate3d(0, -7px, 0);
            }
            90% {
                transform: translate3d(0, -3px, 0);
            }
        }
        
        .floating {
            animation: float 3s ease-in-out infinite;
        }
        
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .switching .tab-content {
            pointer-events: none;
        }
        
        /* Enhanced mobile interactions */
        @media (max-width: 768px) {
            .tab-button {
                touch-action: manipulation;
            }
            
            .feature-item:active,
            .stat-item:active,
            .service-item:active,
            .portfolio-item:active,
            .contact-item:active {
                transform: scale(0.98);
            }
        }
    `;
    document.head.appendChild(style);
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add dynamic styles
    addDynamicStyles();
    
    // Initialize main tabs functionality
    window.beautifulTabs = new BeautifulTabs();
    
    // Initialize enhanced effects
    new EnhancedEffects();
    
    // Initialize performance optimizations
    new PerformanceOptimizer();
    
    // Initialize auto-rotation (uncomment to enable)
    // new AutoRotate(window.beautifulTabs, 8000);
    
    // Add loading complete class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
});

// Handle visibility change (pause animations when tab is not visible)
document.addEventListener('visibilitychange', () => {
    const shapes = document.querySelectorAll('.shape');
    if (document.visibilityState === 'hidden') {
        shapes.forEach(shape => {
            shape.style.animationPlayState = 'paused';
        });
    } else {
        shapes.forEach(shape => {
            shape.style.animationPlayState = 'running';
        });
    }
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Focus management
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-nav .tab-button:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);