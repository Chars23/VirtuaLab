// VirtuaLab Live Wallpaper Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeWallpaper();
    addInteractiveEffects();
    setupParallaxEffect();
});

function initializeWallpaper() {
    // Add random delay to stars for more natural twinkling
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        const randomDelay = Math.random() * 3;
        star.style.animationDelay = `${randomDelay}s`;
        
        // Add random sizes for variety
        const randomSize = Math.random() * 2 + 1;
        star.style.width = `${randomSize}px`;
        star.style.height = `${randomSize}px`;
    });
    
    // Randomize particle positions and delays
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * -15;
        const randomDuration = Math.random() * 8 + 12;
        
        particle.style.left = `${randomLeft}%`;
        particle.style.animationDelay = `${randomDelay}s`;
        particle.style.animationDuration = `${randomDuration}s`;
    });
    
    // Add subtle movement to floating orbs
    const orbs = document.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
        orb.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.opacity = '0.8';
        });
        
        orb.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '0.5';
        });
    });
}

function addInteractiveEffects() {
    const enterBtn = document.querySelector('.enter-btn');
    const container = document.querySelector('.wallpaper-container');
    
    // Enhanced button hover effects
    enterBtn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 60px rgba(238, 90, 36, 0.8)';
        
        // Add ripple effect
        createRippleEffect(this);
    });
    
    enterBtn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 40px rgba(238, 90, 36, 0.5)';
    });
    
    // Add click animation to title
    const title = document.querySelector('.brand-title');
    title.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'titleGlow 1s ease-in-out';
        }, 10);
    });
    
    // Mouse movement parallax effect
    container.addEventListener('mousemove', function(e) {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;
        
        // Move clouds slightly based on mouse position
        const clouds = document.querySelectorAll('.cloud');
        clouds.forEach((cloud, index) => {
            const intensity = (index + 1) * 0.02;
            const x = mouseX * intensity * 30;
            const y = mouseY * intensity * 30;
            cloud.style.transform += ` translate(${x}px, ${y}px)`;
        });
        
        // Move orbs with parallax
        const orbs = document.querySelectorAll('.floating-orb');
        orbs.forEach((orb, index) => {
            const intensity = (index + 1) * 0.03;
            const x = mouseX * intensity * 40;
            const y = mouseY * intensity * 40;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

function setupParallaxEffect() {
    // Scroll-based parallax (if needed for future expansion)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.querySelector('.stars-layer').style.transform = `translateY(${rate}px)`;
    });
    
    // Add dynamic background color shifts
    setInterval(() => {
        const container = document.querySelector('.wallpaper-container');
        const randomHue = Math.random() * 60 + 220; // Blue to purple range
        container.style.filter = `hue-rotate(${randomHue - 240}deg)`;
    }, 10000);
}

function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${rect.width / 2 - size / 2}px`;
    ripple.style.top = `${rect.height / 2 - size / 2}px`;
    ripple.classList.add('ripple');
    
    // Add ripple styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#ripple-styles')) {
        rippleStyle.id = 'ripple-styles';
        document.head.appendChild(rippleStyle);
    }
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function enterPlatform() {
    // Add exit animation
    const container = document.querySelector('.wallpaper-container');
    const content = document.querySelector('.main-content');
    
    // Animate content out
    content.style.animation = 'contentFadeOut 0.8s ease-in-out forwards';
    
    // Add screen transition effect
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(45deg, #667eea, #764ba2);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.8s ease-in-out;
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1200);
}

// Add exit animation keyframes
const exitAnimationStyle = document.createElement('style');
exitAnimationStyle.textContent = `
    @keyframes contentFadeOut {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
        }
    }
`;
document.head.appendChild(exitAnimationStyle);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        enterPlatform();
    }
});

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--reduced-motion', '1');
    
    const style = document.createElement('style');
    style.textContent = `
        .star, .particle, .floating-orb {
            animation-duration: calc(var(--animation-duration, 1) * 2) !important;
        }
    `;
    document.head.appendChild(style);
}