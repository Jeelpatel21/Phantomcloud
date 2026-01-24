// ================================
// GSAP ANIMATIONS & SCROLL TRIGGERS
// ================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // ================================
    // NAVIGATION BAR INTERACTIONS
    // ================================
    
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animate menu items
            const links = navLinks.querySelectorAll('.nav-link');
            links.forEach((link, index) => {
                if (navLinks.classList.contains('active')) {
                    gsap.fromTo(link, 
                        { opacity: 0, x: -20 },
                        { 
                            opacity: 1, 
                            x: 0, 
                            delay: index * 0.1,
                            duration: 0.3,
                            ease: 'power2.out'
                        }
                    );
                }
            });
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Close menu when clicking on a link
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // ================================
    // MAGNETIC NAV LINKS EFFECT
    // ================================
    
    const magneticLinks = document.querySelectorAll('.magnetic-link');
    
    magneticLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(link, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
    
    // ================================
    // 3D PARALLAX MOUSE MOTION
    // ================================
    
    const logo3d = document.getElementById('logo3d');
    
    if (logo3d) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            gsap.to(logo3d, {
                rotationY: mouseX * 10,
                rotationX: -mouseY * 10,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }
    
    // ================================
    // LIQUID GRADIENT WAVES CANVAS
    // ================================
    
    const canvas = document.getElementById('liquidCanvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
        
        // Wave parameters
        const waves = [];
        const waveCount = 3;
        
        class Wave {
            constructor(index) {
                this.index = index;
                this.amplitude = 30 + index * 10;
                this.frequency = 0.002 - index * 0.0003;
                this.speed = 0.02 + index * 0.01;
                this.offset = 0;
                this.y = height * (0.4 + index * 0.15);
                
                // Gradient colors
                const gradients = [
                    ['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.1)'],
                    ['rgba(79, 172, 254, 0.1)', 'rgba(0, 242, 254, 0.1)'],
                    ['rgba(240, 147, 251, 0.1)', 'rgba(245, 87, 108, 0.1)']
                ];
                
                this.colors = gradients[index % gradients.length];
            }
            
            draw() {
                const gradient = ctx.createLinearGradient(0, 0, width, 0);
                gradient.addColorStop(0, this.colors[0]);
                gradient.addColorStop(1, this.colors[1]);
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.moveTo(0, height);
                
                for (let x = 0; x <= width; x++) {
                    const y = this.y + Math.sin((x * this.frequency) + this.offset) * this.amplitude;
                    ctx.lineTo(x, y);
                }
                
                ctx.lineTo(width, height);
                ctx.closePath();
                ctx.fill();
                
                this.offset += this.speed;
            }
        }
        
        // Initialize waves
        for (let i = 0; i < waveCount; i++) {
            waves.push(new Wave(i));
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            waves.forEach(wave => wave.draw());
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    // ================================
    // SERVICE CARDS SCROLL ANIMATIONS
    // ================================
    
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 60,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // ================================
    // GLASS CARD HOVER EFFECTS
    // ================================
    
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            gsap.to(this, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function(e) {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Parallax tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            gsap.to(this, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        });
        
        card.addEventListener('mouseleave', function(e) {
            gsap.to(this, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
    
    // ================================
    // BUTTON MICRO-INTERACTIONS
    // ================================
    
    const buttons = document.querySelectorAll('.glass-btn, .btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', function(e) {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'elastic.out(1, 0.5)'
            });
        });
        
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
                transform: scale(0);
            `;
            
            this.appendChild(ripple);
            
            gsap.to(ripple, {
                scale: 2,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            });
        });
    });
    
    // ================================
    // SECTION SCROLL ANIMATIONS
    // ================================
    
    // About section animations
    const aboutText = document.querySelector('.about-text');
    const aboutVisual = document.querySelector('.about-visual');
    
    if (aboutText) {
        gsap.fromTo(aboutText,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: aboutText,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
    
    if (aboutVisual) {
        gsap.fromTo(aboutVisual,
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: aboutVisual,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
    
    // ================================
    // COUNTER ANIMATION
    // ================================
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to(stat, {
                    innerHTML: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        stat.innerHTML = Math.ceil(stat.innerHTML);
                    }
                });
            }
        });
    });
    
    // ================================
    // CONTACT FORM HANDLING
    // ================================
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('.form-submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
                
                // Reset form
                contactForm.reset();
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
                
                // Animate success message
                gsap.fromTo(formMessage,
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                );
            }, 1500);
            
            // Error handling example
            // formMessage.className = 'form-message error';
            // formMessage.textContent = 'Oops! Something went wrong. Please try again.';
        });
        
        // Input focus animations
        const formInputs = document.querySelectorAll('.form-input');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                gsap.to(this, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            input.addEventListener('blur', function() {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    // ================================
    // INFO CARDS STAGGER ANIMATION
    // ================================
    
    const infoCards = document.querySelectorAll('.info-card, .info-card-large');
    
    if (infoCards.length > 0) {
        gsap.fromTo(infoCards,
            {
                opacity: 0,
                y: 30,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: infoCards[0],
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
    
    // ================================
    // FLOATING SHAPES PARALLAX
    // ================================
    
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Mouse parallax effect
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moveX = (mouseX - 0.5) * (30 + index * 10);
            const moveY = (mouseY - 0.5) * (30 + index * 10);
            
            gsap.to(shape, {
                x: moveX,
                y: moveY,
                duration: 1 + index * 0.2,
                ease: 'power2.out'
            });
        });
        
        // Scroll parallax
        gsap.to(shape, {
            y: -100 - index * 50,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom top',
                scrub: 1 + index * 0.5
            }
        });
    });
    
    // ================================
    // SMOOTH SCROLL TO ANCHOR LINKS
    // ================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    gsap.to(window, {
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        duration: 1,
                        ease: 'power3.inOut'
                    });
                }
            }
        });
    });
    
    // ================================
    // PAGE TRANSITION EFFECT
    // ================================
    
    // Fade in page on load
    gsap.from('body', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
    
    // ================================
    // CURSOR FOLLOWER (OPTIONAL)
    // ================================
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(102, 126, 234, 0.3);
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.2s ease;
        display: none;
    `;
    
    // Only add cursor on desktop
    if (window.innerWidth > 1024) {
        document.body.appendChild(cursor);
        cursor.style.display = 'block';
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Expand cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .glass-btn, .glass-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    // ================================
    // PERFORMANCE OPTIMIZATION
    // ================================
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounce resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
    
    // ================================
    // CONSOLE MESSAGE
    // ================================
    
    console.log('%c🚀 Phantom Cloud - Premium Website', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('%cBuilt with precision and creativity', 'font-size: 14px; color: #764ba2;');
    console.log('%cContact: phantomcloud26@gmail.com | +91 81284 58345', 'font-size: 12px; color: #4facfe;');
    
});

// ================================
// SERVICE WORKER (FOR PWA - OPTIONAL)
// ================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}