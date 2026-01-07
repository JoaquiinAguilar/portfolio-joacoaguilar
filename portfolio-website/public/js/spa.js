document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.getElementById('loading-overlay');

    const showLoadingOverlay = () => {
        if (loadingOverlay) {
            loadingOverlay.classList.add('visible');
        }
    };

    const hideLoadingOverlay = () => {
        if (loadingOverlay) {
            loadingOverlay.classList.remove('visible');
        }
    };

    const handleNavigation = (url) => {
        showLoadingOverlay();
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // Replace the main content
                const newMain = doc.querySelector('main');
                if (newMain) {
                    document.querySelector('main').innerHTML = newMain.innerHTML;
                }

                // Update the title
                const newTitle = doc.querySelector('title');
                if (newTitle) {
                    document.querySelector('title').innerText = newTitle.innerText;
                }

                // Update active links
                const page = url.split('/').pop().split('?')[0] || 'home';
                document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
                    const linkPage = (link.getAttribute('href').split('/').pop().split('?')[0] || 'home').replace(/#/g, '');
                    if (linkPage === page) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });

                // Re-run animations and other scripts if necessary
                if (window.handleScrollAnimation) {
                    setTimeout(window.handleScrollAnimation, 100);
                }
                if (window.updateLanguageDisplay) {
                    window.updateLanguageDisplay();
                }
                hideLoadingOverlay();
                window.scrollTo(0, 0); // Scroll to top after content loads
            })
            .catch(err => {
                console.error('Failed to fetch page: ', err);
                hideLoadingOverlay();
            });
    };

    document.body.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (link && link.hostname === window.location.hostname && !link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const url = link.href;
            if (url !== window.location.href) {
                history.pushState({ path: url }, '', url);
                handleNavigation(url);
            }
        }
    });

    window.addEventListener('popstate', e => {
        if (e.state && e.state.path) {
            handleNavigation(e.state.path);
        }
    });
});
