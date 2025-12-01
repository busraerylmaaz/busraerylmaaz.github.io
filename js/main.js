document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initProjectFilters();
    initNavbarScroll();
    initActiveNavLink();
    initHeroSlider();
    initRipple();
    initMagnetic();
    initMobileProjectClick(); // YENİ FONKSİYON BURADA ÇAĞRILIYOR
});

function initTypingAnimation() {
    const titles = [
        'Computer Engineer',
        'Creative Coder',
        'AI Engineer',
        'Game Developer',
        'Game Artist',
        '3D Artist',
        'Gamer'
    ];
    
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('skills-grid')) {
                    const items = entry.target.querySelectorAll('.skill-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                }
                
                if (entry.target.classList.contains('projects-grid')) {
                    const cards = entry.target.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    document.querySelectorAll('.about-image').forEach(el => {
        el.classList.add('fade-in-left');
        observer.observe(el);
    });

    document.querySelectorAll('.about-text').forEach(el => {
        el.classList.add('fade-in-right');
        observer.observe(el);
    });

    document.querySelectorAll('.skill-category').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    document.querySelectorAll('.skills-grid').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.skill-item').forEach(el => {
        el.classList.add('scale-in');
    });

    document.querySelectorAll('.projects-grid').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.project-card').forEach(el => {
        el.classList.add('scale-in');
    });

    document.querySelectorAll('.contact-item').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.cta-card').forEach(el => {
        el.classList.add('scale-in');
        observer.observe(el);
    });
}

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter || card.classList.contains('add-project')) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }

        lastScroll = currentScroll;
    });
}

function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
}

/* Ripple efektini fonksiyon yapalım */
function initRipple() {
    document
        .querySelectorAll('.btn, .social-link, .project-link, .filter-btn')
        .forEach(element => {
            element.classList.add('ripple');
        });
}

/* Magnetic efektini fonksiyon yapalım */
function initMagnetic() {
    document.querySelectorAll('.magnetic').forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

/* 3D sayfaya özel hero video slider */
function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return; // bu sayfa değilse çık

    const slides = Array.from(slider.querySelectorAll('.hero-slide'));
    const prevBtn = slider.querySelector('.hero-slider-btn.prev');
    const nextBtn = slider.querySelector('.hero-slider-btn.next');
    let current = 0;

    function updateSlider() {
        const hasMultiple = slides.length > 1;
        slider.classList.toggle('has-multiple', hasMultiple);

        slides.forEach((slide, index) => {
            const isActive = index === current;
            slide.classList.toggle('is-active', isActive);

            if (!isActive && slide.tagName === 'VIDEO') {
                slide.pause();
            }
            if (isActive && slide.tagName === 'VIDEO') {
                slide.currentTime = 0;
            }
        });

        prevBtn.disabled = !hasMultiple || current === 0;
        nextBtn.disabled = !hasMultiple || current === slides.length - 1;
    }

    function goTo(delta) {
        const hasMultiple = slides.length > 1;
        if (!hasMultiple) return; // tek video varsa tıklama boşa

        const nextIndex = current + delta;
        if (nextIndex < 0 || nextIndex >= slides.length) return;

        current = nextIndex;
        updateSlider();
    }

    prevBtn.addEventListener('click', () => goTo(-1));
    nextBtn.addEventListener('click', () => goTo(1));

    updateSlider();
}

// MOBİL CİHAZDA KARTIN TAMAMINA TEK TIKLAMAYI SAĞLAYAN YENİ FONKSİYON
function initMobileProjectClick() {
    const projectCards = document.querySelectorAll('.project-card');

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) return;

    projectCards.forEach(card => {
        const link = card.querySelector('.project-link');
        if (!link) return;

        card.addEventListener('click', (e) => {
            // Tıklama, zaten linkin kendisine veya içindeki bir şeye yapılmadıysa
            if (e.target.closest('.project-link') !== link) {
                 e.preventDefault();
                 window.location.href = link.href;
            }
        });

        // Çift tıklama olayını engellemek için touchstart eklenir
        card.addEventListener('touchstart', (e) => {
             e.stopPropagation();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // Lightbox oluştur
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="" alt="Preview Image">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Tüm galeri görsellerini seç
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.style.cursor = 'pointer';

        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    // Kapatma
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Ekranın herhangi yerine tıklayınca kapanması
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
});