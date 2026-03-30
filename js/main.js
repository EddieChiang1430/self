// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle menu icon
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].classList.toggle('rotate-45');
        spans[1].classList.toggle('opacity-0');
        spans[2].classList.toggle('-rotate-45');
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-item, .product-item, .testimonial-item').forEach(el => {
    el.classList.add('animate-out');
    observer.observe(el);
});

// Add animation classes to CSS
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-out {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .mobile-menu-btn span:nth-child(1) {
            transition: transform 0.3s ease;
        }
        .mobile-menu-btn span:nth-child(2) {
            transition: opacity 0.3s ease;
        }
        .mobile-menu-btn span:nth-child(3) {
            transition: transform 0.3s ease;
        }
        .rotate-45 {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .-rotate-45 {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        .opacity-0 {
            opacity: 0;
        }
    </style>
`);

// Form Submission Handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formDataObject = Object.fromEntries(formData);
        
        // Simulate form submission
        console.log('Form submitted:', formDataObject);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        successMessage.style.cssText = `
            background-color: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
            text-align: center;
        `;
        
        contactForm.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
});

// Add hover effects for buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add scroll event to change header style
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    }
});

// Image Slider Functionality
function initImageSlider() {
    console.log('initImageSlider called');
    const slider = document.querySelector('.image-slider');
    if (!slider) {
        console.log('No image slider found');
        return;
    }
    
    const images = slider.querySelectorAll('img');
    const dotsContainer = slider.querySelector('.slider-dots');
    const dots = dotsContainer.querySelectorAll('.dot');
    console.log('Images count:', images.length);
    console.log('Dots count:', dots.length);
    
    let currentIndex = 0;
    
    function showImage(index) {
        console.log('showImage called with index:', index);
        // Update images
        images.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active');
                img.style.display = 'block';
                img.style.opacity = '1';
            } else {
                img.classList.remove('active');
                img.style.display = 'none';
                img.style.opacity = '0';
            }
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        currentIndex = index;
    }
    
    function nextImage() {
        console.log('nextImage called');
        let nextIndex = currentIndex + 1;
        if (nextIndex >= images.length) {
            nextIndex = 0;
        }
        showImage(nextIndex);
    }
    
    // Add dot click event listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            console.log('Dot clicked:', index);
            showImage(index);
        });
    });
    
    // Auto slide
    setInterval(nextImage, 5000);
    console.log('Auto slide initialized');
    
    // Initialize first image
    showImage(0);
    console.log('Initial image shown');
}

// Add Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #003366;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
        z-index: 1000;
    `;
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add Navbar Scroll Effect
function initNavbarScroll() {
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.background = '#fff';
                header.style.backdropFilter = 'none';
            }
        });
    }
}

// Add Intersection Observer for Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-item, .product-item, .testimonial-item, .value-item, .team-member, .cert-item, .faq-item').forEach(el => {
        el.classList.add('animate-out');
        observer.observe(el);
    });
}

// Initialize page
window.addEventListener('DOMContentLoaded', function() {
    // Add initial animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Add initial animation to hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(30px)';
        heroImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 500);
    }
    
    // Initialize additional features
    initImageSlider();
    initScrollToTop();
    initNavbarScroll();
    initScrollAnimations();
});