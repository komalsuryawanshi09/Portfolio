/* ===================================
   THEME TOGGLE
   =================================== */
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light-mode';
document.body.classList.add(currentTheme);
updateThemeIcon();

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    
    const theme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', theme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

/* ===================================
   SCROLL TO TOP BUTTON
   =================================== */
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ===================================
   SMOOTH SCROLLING
   =================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of sticky navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                navbarToggler.click();
            }
        }
    });
});

/* ===================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   =================================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

/* ===================================
   CONTACT FORM HANDLING
   =================================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (name && email && subject && message) {
            // Create mailto link
            const mailtoLink = `mailto:komalsuryawanshi148@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
            
            // Open default email client
            window.location.href = mailtoLink;

            // Show success message
            showFormNotification('Message sent successfully! Opening your email client...', 'success');

            // Reset form after 2 seconds
            setTimeout(() => {
                contactForm.reset();
            }, 2000);
        } else {
            showFormNotification('Please fill in all fields', 'error');
        }
    });
}

function showFormNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} position-fixed`;
    notification.style.cssText = `
        top: 80px;
        right: 20px;
        z-index: 1100;
        min-width: 300px;
        animation: slideInRight 0.5s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 4000);
}

/* ===================================
   ACTIVE NAVIGATION LINK
   =================================== */
window.addEventListener('scroll', function() {
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

/* ===================================
   PROGRESS BAR ANIMATION
   =================================== */
const progressBars = document.querySelectorAll('.progress-bar');

const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.progress-bar');
            bars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    progressObserver.observe(skillsSection);
}

/* ===================================
   FLOATING CARD ANIMATION
   =================================== */
// Already handled by CSS, but we can add JavaScript interactivity if needed
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = `translateY(0px) scale(1.05)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = `translateY(0px)`;
    });
});

/* ===================================
   NAVBAR STYLING ON SCROLL
   =================================== */
const navbar = document.querySelector('.navbar-custom');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.08)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

/* ===================================
   SKILL CARDS HOVER EFFECT
   =================================== */
const skillCards = document.querySelectorAll('.skill-category');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 60px 0 rgba(255, 20, 147, 0.2)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.1)';
    });
});

/* ===================================
   PROJECT CARD EFFECTS
   =================================== */
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/* ===================================
   COUNTER ANIMATION
   =================================== */
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/* ===================================
   PARALLAX EFFECT (Optional)
   =================================== */
window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementPosition = element.offsetTop;
        const distance = scrollPosition - elementPosition;
        
        if (distance > -window.innerHeight && distance < window.innerHeight) {
            element.style.transform = `translateY(${distance * 0.5}px)`;
        }
    });
});

/* ===================================
   LAZY LOADING IMAGES
   =================================== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ===================================
   KEYBOARD NAVIGATION
   =================================== */
document.addEventListener('keydown', function(e) {
    // Home key - go to top
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // End key - go to bottom
    if (e.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

/* ===================================
   PERFORMANCE OPTIMIZATION
   =================================== */
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    
    // Throttle scroll events
    scrollTimeout = setTimeout(function() {
        updateActiveNavLink();
    }, 100);
}, { passive: true });

/* ===================================
   MOBILE MENU AUTO-CLOSE
   =================================== */
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

document.addEventListener('click', function(event) {
    const isClickInsideNav = navbarToggler.contains(event.target) || navbarCollapse.contains(event.target);
    
    if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
    }
});

/* ===================================
   DOWNLOAD RESUME BUTTON
   =================================== */
const downloadBtn = document.querySelector('[download]');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        // Show notification message
        showDownloadNotification();
    });
}

function showDownloadNotification() {
    const notification = document.createElement('div');
    notification.className = 'alert alert-info position-fixed';
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 1100;
        min-width: 320px;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 5px 20px rgba(255, 20, 147, 0.2);
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-info-circle"></i>
            <div>
                <strong>📄 Resume Downloading</strong>
                <p style="margin-bottom: 0; font-size: 0.9rem;">
                    Your resume (Komal_Suryawanshi_Resume.pdf) is ready to download. 
                    Check your downloads folder!
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

/* ===================================
   SOCIAL LINKS
   =================================== */
document.querySelectorAll('.social-icon, .footer-social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.1)';
    });

    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/* ===================================
   EMAIL LINK HANDLER
   =================================== */
document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
    emailLink.addEventListener('click', function(e) {
        // Extract email address from href
        const email = this.getAttribute('href').replace('mailto:', '');
        
        // Show notification
        showEmailNotification(email);
    });
});

function showEmailNotification(email) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed';
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 1100;
        min-width: 340px;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 5px 20px rgba(255, 20, 147, 0.2);
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-envelope" style="font-size: 1.3rem; color: #ff1493;"></i>
            <div>
                <strong>✉️ Email Ready</strong>
                <p style="margin-bottom: 0; font-size: 0.9rem;">
                    Sending email to <br>
                    <strong style="color: #ff1493;">${email}</strong>
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);

    // Auto remove after 6 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 6000);
}

/* ===================================
   WHATSAPP BUTTON HANDLER
   =================================== */
const whatsappBtn = document.getElementById('whatsappBtn');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function(e) {
        // Show notification
        showWhatsAppNotification();
    });
}

function showWhatsAppNotification() {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed';
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 1100;
        min-width: 340px;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 5px 20px rgba(37, 211, 102, 0.3);
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fab fa-whatsapp" style="font-size: 1.5rem; color: #25d366;"></i>
            <div>
                <strong>💬 WhatsApp Connected</strong>
                <p style="margin-bottom: 0; font-size: 0.9rem;">
                    Opening WhatsApp to chat with <br>
                    <strong style="color: #25d366;">+91-9307768251</strong>
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

/* ===================================
   PAGE LOAD ANIMATION
   =================================== */
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    
    // Animate hero content on page load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const children = heroContent.children;
        Array.from(children).forEach((child, index) => {
            child.style.animation = `fadeInDown 0.8s ease-out ${index * 0.1}s forwards`;
            child.style.opacity = '0';
        });
    }
});

/* ===================================
   UTILITY FUNCTIONS
   =================================== */

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Re-calculate any dynamic values if needed
}, 250));

/* ===================================
   CONSOLE MESSAGE
   =================================== */
console.log('%cWelcome to Komal\'s Portfolio!', 'font-size: 20px; color: #ff1493; font-weight: bold;');
console.log('%cFeel free to check the code and reach out for collaboration!', 'font-size: 14px; color: #666;');

// Initialize tooltips if using Bootstrap tooltips
document.addEventListener('DOMContentLoaded', function() {
    // Bootstrap Tooltips (if needed)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add loaded class to body
    document.body.classList.add('loaded');
});

/* ===================================
   FORM VALIDATION
   =================================== */
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
});

// Real-time form validation
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.checkValidity() === false) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });

    input.addEventListener('input', function() {
        if (this.classList.contains('is-invalid') && this.checkValidity()) {
            this.classList.remove('is-invalid');
        }
    });
});
