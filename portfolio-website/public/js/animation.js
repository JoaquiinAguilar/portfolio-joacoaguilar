// Animation and particles effect
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": isDarkMode ? "#0f3460" : "#93c5fd"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": isDarkMode ? "#0f3460" : "#93c5fd",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Update particles color when theme changes
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    const updateParticlesColors = () => {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            const particles = window.pJSDom[0].pJS.particles;
            const newColor = isDarkMode ? "#0f3460" : "#93c5fd";
            
            // Update particle colors
            particles.color.value = newColor;
            particles.line_linked.color = newColor;
            
            // Refresh particles
            particles.array.forEach(p => {
                p.color.value = newColor;
            });
        }
    };
    
    if (themeToggle) {
        themeToggle.addEventListener('click', updateParticlesColors);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', updateParticlesColors);
    }
});