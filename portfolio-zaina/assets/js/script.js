// ============================================
// NAVIGATION ACTIVE
// ============================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveNav() {
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

window.addEventListener('scroll', updateActiveNav);

// ============================================
// FORMULAIRE DE CONTACT
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (name && email && subject && message) {
            console.log('Message envoyé:', {
                nom: name,
                email: email,
                sujet: subject,
                message: message
            });
            
            // Afficher un message de confirmation
            const originalText = this.querySelector('button[type="submit"]').textContent;
            this.querySelector('button[type="submit"]').textContent = 'Message envoyé! ✓';
            this.querySelector('button[type="submit"]').style.background = '#4CAF50';
            
            // Réinitialiser le formulaire
            setTimeout(() => {
                this.reset();
                this.querySelector('button[type="submit"]').textContent = originalText;
                this.querySelector('button[type="submit"]').style.background = '';
            }, 2000);
        }
    });
}

// ============================================
// SCROLL SMOOTH
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ============================================
// ANIMATIONS AUX INTERACTIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de compétences et projets
document.querySelectorAll('.skill-card, .project-card, .stat-item, .contact-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ============================================
// THÈME RESPONSIVE
// ============================================

// Vérifier si mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Adapter les événements au mobile
if (!isMobile()) {
    // Effets de survol pour desktop
    document.querySelectorAll('.skill-card, .project-card').forEach(card => {
        card.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ============================================
// GESTION DE LA REDIMENSIONNEMENT DE FENÊTRE
// ============================================

window.addEventListener('resize', function() {
    // Adapter les layouts si nécessaire
    console.log('Fenêtre redimensionnée:', window.innerWidth, 'x', window.innerHeight);
});

// ============================================
// CHARGEMENT INITIAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio chargé avec succès');
    updateActiveNav();
});

// ============================================
// FONCTION POUR COPIER L'EMAIL
// ============================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Optionnel: afficher une notification
        console.log('Copié dans le presse-papiers:', text);
    }).catch(err => {
        console.error('Erreur de copie:', err);
    });
}

// ============================================
// GESTION DU MENU MOBILE (si nécessaire)
// ============================================

let scrollTimer;
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Cache/Affiche la navbar au scroll (optionnel)
    // if (scrollTop > lastScrollTop) {
    //     navbar.style.transform = 'translateY(-100%)';
    // } else {
    //     navbar.style.transform = 'translateY(0)';
    // }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

console.log('Tous les scripts sont chargés et prêts!');
