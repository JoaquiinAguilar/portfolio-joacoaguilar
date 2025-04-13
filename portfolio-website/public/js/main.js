// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    // Language persistence code
    // Obtener idioma de la URL o usar el almacenado (inglés por defecto)
    const urlParams = new URLSearchParams(window.location.search);
    const currentLang = urlParams.get('lang');
    
    if (currentLang) {
        // Si hay un idioma en la URL, guardarlo
        localStorage.setItem('preferredLanguage', currentLang);
    } else {
        // Si no hay idioma en la URL pero hay uno guardado, redirigir
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && savedLang !== 'en') {
            // Solo redirigir si no es el idioma predeterminado (inglés)
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('lang', savedLang);
            window.location.href = newUrl.toString();
        }
    }

    // Actualizar los enlaces de navegación para preservar el idioma
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a:not(.language-selector a)');
    navLinks.forEach(link => {
        // Solo modificar enlaces internos del sitio
        if (link.getAttribute('href').startsWith('/')) {
            const url = new URL(link.getAttribute('href'), window.location.origin);
            const lang = localStorage.getItem('preferredLanguage') || 'en';
            url.searchParams.set('lang', lang);
            link.setAttribute('href', url.pathname + url.search);
        }
    });

    // Add scroll reveal animations
    const scrollElements = document.querySelectorAll('.card, .project-card, .learning-card');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementHeight = el.getBoundingClientRect().height;
        
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100) &&
            (elementTop + elementHeight) > 0
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .card, .project-card, .learning-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .card.scrolled, .project-card.scrolled, .learning-card.scrolled {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize scroll animations
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Trigger once on load
    handleScrollAnimation();
    
    // Add form submission handling if contact form exists
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // For this example, we'll just console log the form data
            // In a real application, you would send this data to your server
            console.log('Form submitted:', formValues);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            
            // Get language preference
            const language = document.documentElement.lang || localStorage.getItem('preferredLanguage') || 'en';
            
            successMessage.textContent = language === 'en' 
                ? 'Thank you for your message! I will get back to you soon.' 
                : '¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.';
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        });
    }
    
    // Language change - preserve current page
    const languageLinks = document.querySelectorAll('.language-selector a');
    languageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const currentUrl = new URL(window.location.href);
            const newUrl = new URL(link.href);
            
            // Get the lang parameter from the clicked link
            const newLang = new URLSearchParams(newUrl.search).get('lang');
            
            // Guardar en localStorage
            localStorage.setItem('preferredLanguage', newLang);
            
            // Update the current URL's lang parameter
            currentUrl.searchParams.set('lang', newLang);
            
            // Navigate to the updated URL
            window.location.href = currentUrl.toString();
        });
    });
});