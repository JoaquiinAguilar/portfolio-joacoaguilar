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
        // Do not hide elements that are above the viewport
        if (element.getBoundingClientRect().top > (window.innerHeight || document.documentElement.clientHeight)) {
            element.classList.remove('scrolled');
        }
    };

    const handleScrollAnimation = () => {
        const scrollElements = document.querySelectorAll('.card, .project-card, .learning-card');
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.handleScrollAnimation = handleScrollAnimation;
    
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
    
    // Language change - preserve current page (Dropdown functionality)
    const languageDropdownContainers = document.querySelectorAll('.language-dropdown-container');
    
    const updateLanguageDisplay = () => {
        const currentLang = document.documentElement.lang;
        languageDropdownContainers.forEach(container => {
            const languageDisplayButton = container.querySelector('.language-display');
            const languageLinks = container.querySelectorAll('.language-selector a');

            languageLinks.forEach(link => {
                link.classList.remove('active');
                const langParam = new URLSearchParams(new URL(link.href).search).get('lang');
                if (langParam === currentLang) {
                    link.classList.add('active');
                    if (languageDisplayButton) {
                        languageDisplayButton.innerHTML = `${langParam.toUpperCase()} <i class="fas fa-chevron-down"></i>`;
                    }
                }
            });
        });
    };

    // Initial update of language display
    updateLanguageDisplay();
    window.updateLanguageDisplay = updateLanguageDisplay; // Expose to global scope for spa.js

    languageDropdownContainers.forEach(container => {
        const languageDisplayButton = container.querySelector('.language-display');
        const languageSelector = container.querySelector('.language-selector');

        if (languageDisplayButton && languageSelector) {
            languageDisplayButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent document click from closing immediately
                languageSelector.classList.toggle('active');
                languageDisplayButton.classList.toggle('active');
            });
        }

        // Handle clicks on language links inside the dropdown
        languageSelector.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const newLang = new URLSearchParams(new URL(link.href).search).get('lang');
                if (newLang) {
                    localStorage.setItem('preferredLanguage', newLang);
                    document.documentElement.lang = newLang; // Update html lang attribute
                    
                    // Trigger SPA navigation (assuming spa.js handles the full URL change)
                    const currentUrl = new URL(window.location.href);
                    currentUrl.searchParams.set('lang', newLang);
                    history.pushState({ path: currentUrl.toString() }, '', currentUrl.toString());
                    
                    if (window.handleNavigation) { // Call SPA navigation handler
                        window.handleNavigation(currentUrl.toString());
                    } else {
                        window.location.href = currentUrl.toString(); // Fallback to full reload
                    }
                    
                    // Close dropdown
                    languageSelector.classList.remove('active');
                    languageDisplayButton.classList.remove('active');
                    updateLanguageDisplay(); // Update display immediately
                }
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        languageDropdownContainers.forEach(container => {
            const languageSelector = container.querySelector('.language-selector');
            const languageDisplayButton = container.querySelector('.language-display');
            if (languageSelector && languageDisplayButton && !container.contains(e.target)) {
                languageSelector.classList.remove('active');
                languageDisplayButton.classList.remove('active');
            }
        });
    });

    // Mobile menu functionality
    const menuButton = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
        
        // Close mobile menu when clicking anywhere outside
        document.addEventListener('click', (e) => {
            if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                menuButton.classList.remove('active');
            }
        });
    }

    // Function to toggle theme
    function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Add event listeners to theme toggles
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const mobileThemeToggleCheckbox = document.getElementById('mobile-theme-toggle-checkbox');
    const html = document.documentElement;

    // Set initial checkbox state
    if (html.getAttribute('data-theme') === 'dark') {
        if (themeToggleCheckbox) themeToggleCheckbox.checked = true;
        if (mobileThemeToggleCheckbox) mobileThemeToggleCheckbox.checked = true;
    }

    // Add event listeners to theme toggles
    if (themeToggleCheckbox) {
        themeToggleCheckbox.addEventListener('change', toggleTheme);
    }

    if (mobileThemeToggleCheckbox) {
        mobileThemeToggleCheckbox.addEventListener('change', toggleTheme);
    }
});