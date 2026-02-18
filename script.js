// Smooth scroll untuk navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = '#0B0C0E';
        nav.style.borderBottom = '1px solid #1E1F22';
    } else {
        nav.style.backgroundColor = '#0B0C0E';
        nav.style.borderBottom = '1px solid #1E1F22';
    }
});

// Skill bars animation on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }
    });
}, { threshold: 0.5 });

// Observe semua skill category
document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Animation on scroll untuk sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe semua section
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Copy email ke clipboard (opsional)
document.querySelector('.contact-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    const email = 'muhammadfirmansyah401@gmail.com';
    
    navigator.clipboard.writeText(email).then(() => {
        // Tampilkan notifikasi sederhana
        const btn = this;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Email Copied!';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    });
});

// Hover effect untuk project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Update tahun di footer secara otomatis
const yearElement = document.querySelector('footer p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
}

// Mobile menu toggle (jika diperlukan di masa depan)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Preload animation untuk hero section
window.addEventListener('load', function() {
    document.querySelector('.hero-content')?.classList.add('animate');
});

// Tracking link clicks (opsional)
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && !href.startsWith('#')) {
            console.log('Outbound link clicked:', href);
            // Bisa ditambahkan Google Analytics tracking di sini
        }
    });
});

const typewriterElement = document.getElementById('typewriterRole');

if (typewriterElement) {
    // Ini adalah teks awal, akan diganti oleh typewriter
    const roles = [
        "Junior Web Dev",
        "Fullstack Web Dev",
        "Python Automation",
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeWriter, 500);
        } else {
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeWriter, speed);
        }
    }

    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

// ===========================================
// HAMBURGER MENU TOGGLE - VERSI DIPERBAIKI
// ===========================================

// Tunggu sampai DOM siap
document.addEventListener('DOMContentLoaded', function() {
    
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Cek apakah elemen ditemukan
    console.log('Hamburger Button:', hamburgerBtn);
    console.log('Nav Links:', navLinks);
    
    if (hamburgerBtn && navLinks) {
        
        // Klik pada hamburger
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Hamburger clicked!'); // Untuk debugging
            
            // Toggle class
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent scrolling
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Klik pada link menu
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Klik di luar menu untuk menutup
        document.addEventListener('click', function(e) {
            if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
    } else {
        console.error('Hamburger button or nav links not found!');
    }
    
    // Handle resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navLinks) {
                navLinks.classList.remove('active');
                navLinks.style.right = ''; // Reset inline style
            }
            if (hamburgerBtn) {
                hamburgerBtn.classList.remove('active');
            }
            document.body.style.overflow = 'auto';
        }
    });
    
});