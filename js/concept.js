/**
 * Concept Page JavaScript
 * Picasso Beauty Salon
 */

$(document).ready(function() {
    
    // Initialize Foundation
    $(document).foundation();
    
    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        // Intersection Observer for scroll animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass('animated');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Add animation classes and observe elements
            $('.value-card, .timeline-item, .staff-philosophy, .technique-item').each(function() {
                $(this).addClass('animate-on-scroll');
                observer.observe(this);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            $('.animate-on-scroll').addClass('animated');
        }
    }
    
    // ===== GALLERY FUNCTIONALITY =====
    function initGallery() {
        const galleryMain = $('.gallery-main img');
        const galleryThumbs = $('.gallery-thumbs img');
        
        // Set first thumbnail as active
        galleryThumbs.first().addClass('active');
        
        galleryThumbs.on('click', function() {
            const newSrc = $(this).attr('src').replace('w=300', 'w=800');
            
            // Update active state
            galleryThumbs.removeClass('active');
            $(this).addClass('active');
            
            // Fade out, change source, fade in
            galleryMain.fadeOut(300, function() {
                $(this).attr('src', newSrc).fadeIn(300);
            });
        });
        
        // Keyboard navigation
        galleryThumbs.on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).trigger('click');
            }
        });
    }
    
    // ===== SMOOTH SCROLLING =====
    function initSmoothScrolling() {
        // Scroll indicator click
        $('.scroll-indicator').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $('.main-concept').offset().top - 100
            }, 800, 'easeInOutQuad');
        });
        
        // General smooth scrolling for anchor links
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 800, 'easeInOutQuad');
            }
        });
    }
    
    // ===== PARALLAX EFFECT =====
    function initParallax() {
        if ($(window).width() > 768) {
            $(window).on('scroll', function() {
                const scrolled = $(this).scrollTop();
                const parallaxSpeed = 0.5;
                
                $('.concept-hero').css({
                    'transform': 'translateY(' + (scrolled * parallaxSpeed) + 'px)'
                });
            });
        }
    }
    
    // ===== MOBILE MENU TOGGLE =====
    function initMobileMenu() {
        const menuToggle = $('#menuToggle');
        const mobileMenu = $('#mobileMenu');
        
        menuToggle.on('click', function() {
            $(this).toggleClass('active');
            mobileMenu.toggleClass('active');
            $('body').toggleClass('menu-open');
        });
        
        // Close menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.header-nav, .mobile-menu, .menu-toggle').length) {
                menuToggle.removeClass('active');
                mobileMenu.removeClass('active');
                $('body').removeClass('menu-open');
            }
        });
        
        // Close menu when clicking on menu links
        $('.mobile-menu a').on('click', function() {
            menuToggle.removeClass('active');
            mobileMenu.removeClass('active');
            $('body').removeClass('menu-open');
        });
    }
    
    // ===== BACK TO TOP BUTTON =====
    function initBackToTop() {
        const backToTopBtn = $('#backToTop');
        
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 300) {
                backToTopBtn.addClass('active');
            } else {
                backToTopBtn.removeClass('active');
            }
        });
        
        backToTopBtn.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 800, 'easeInOutQuad');
        });
    }
    
    // ===== HEADER SCROLL EFFECT =====
    function initHeaderScrollEffect() {
        const header = $('.site-header');
        let lastScrollTop = 0;
        
        $(window).on('scroll', function() {
            const scrollTop = $(this).scrollTop();
            
            if (scrollTop > 100) {
                header.addClass('scrolled');
            } else {
                header.removeClass('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // ===== TIMELINE ANIMATIONS =====
    function initTimelineAnimations() {
        if ('IntersectionObserver' in window) {
            const timelineObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry, index) {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            $(entry.target).addClass('timeline-animated');
                        }, index * 200);
                    }
                });
            }, {
                threshold: 0.2
            });
            
            $('.timeline-item').each(function() {
                timelineObserver.observe(this);
            });
        }
    }
    
    // ===== VALUE CARDS HOVER EFFECTS =====
    function initValueCards() {
        $('.value-card').each(function() {
            const card = $(this);
            const image = card.find('.value-image img');
            
            card.on('mouseenter', function() {
                image.css('transform', 'scale(1.1)');
            }).on('mouseleave', function() {
                image.css('transform', 'scale(1)');
            });
        });
    }
    
    // ===== TECHNIQUE ITEMS SEQUENTIAL ANIMATION =====
    function initTechniqueAnimations() {
        if ('IntersectionObserver' in window) {
            const techniqueObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const items = $(entry.target).find('.technique-item');
                        items.each(function(index) {
                            const item = $(this);
                            setTimeout(function() {
                                item.addClass('technique-animated');
                            }, index * 150);
                        });
                    }
                });
            }, {
                threshold: 0.3
            });
            
            $('.hightone-section').each(function() {
                techniqueObserver.observe(this);
            });
        }
    }
    
    // ===== STAFF PHILOSOPHY STAGGER ANIMATION =====
    function initStaffAnimations() {
        if ('IntersectionObserver' in window) {
            const staffObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const items = $(entry.target).find('.staff-philosophy');
                        items.each(function(index) {
                            const item = $(this);
                            setTimeout(function() {
                                item.addClass('staff-animated');
                            }, index * 100);
                        });
                    }
                });
            }, {
                threshold: 0.2
            });
            
            $('.team-philosophy').each(function() {
                staffObserver.observe(this);
            });
        }
    }
    
    // ===== RESPONSIVE UTILITIES =====
    function initResponsiveUtilities() {
        let resizeTimeout;
        
        $(window).on('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                // Recalculate layouts if needed
                if ($(window).width() > 1024) {
                    // Desktop specific adjustments
                    $('.mobile-menu').removeClass('active');
                    $('#menuToggle').removeClass('active');
                    $('body').removeClass('menu-open');
                    
                    // Re-enable parallax on larger screens
                    initParallax();
                } else {
                    // Disable parallax on smaller screens
                    $('.concept-hero').css('transform', 'none');
                }
            }, 250);
        });
    }
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    function initAccessibility() {
        // Skip to content link
        if ($('#skip-to-content').length === 0) {
            $('body').prepend('<a href="#main-content" id="skip-to-content" class="sr-only sr-only-focusable">Skip to main content</a>');
        }
        
        $('#skip-to-content').on('click', function(e) {
            e.preventDefault();
            $('.main-concept').focus();
        });
        
        // Add ARIA labels to interactive elements
        $('.gallery-thumbs img').attr('role', 'button').attr('tabindex', '0');
        $('.value-card, .timeline-item, .staff-philosophy').attr('tabindex', '0');
        
        // Keyboard navigation for interactive elements
        $('.gallery-thumbs img, .value-card, .timeline-item, .staff-philosophy').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if ($(this).hasClass('gallery-thumbs img')) {
                    $(this).trigger('click');
                }
            }
        });
    }
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    function initPerformanceOptimizations() {
        // Lazy loading for images
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading support
            $('img').attr('loading', 'lazy');
        } else {
            // Fallback for browsers without native support
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
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
                
                $('img[data-src]').each(function() {
                    imageObserver.observe(this);
                });
            }
        }
        
        // Debounced scroll events
        let scrollTimeout;
        $(window).on('scroll', function() {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(function() {
                    // Scroll-dependent operations here
                    scrollTimeout = null;
                }, 16); // ~60fps
            }
        });
    }
    
    // ===== HERO TYPING EFFECT =====
    function initTypingEffect() {
        const heroTitle = $('.hero-title');
        const originalText = heroTitle.text();
        
        // Only run on desktop and if user hasn't reduced motion
        if ($(window).width() > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            heroTitle.text('');
            
            let i = 0;
            function typeWriter() {
                if (i < originalText.length) {
                    heroTitle.text(originalText.slice(0, i + 1));
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            // Start typing effect after hero animation
            setTimeout(typeWriter, 1000);
        }
    }
    
    // ===== EASTER EGG - KONAMI CODE =====
    function initEasterEgg() {
        let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        let konamiIndex = 0;
        
        $(document).on('keydown', function(e) {
            if (e.keyCode === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    // Easter egg activated!
                    $('body').addClass('easter-egg-active');
                    
                    // Add some fun effects
                    $('.value-card, .timeline-item, .staff-philosophy').addClass('rainbow-border');
                    
                    // Show a fun message
                    $('<div class="easter-egg-message">🎉 Picasso Magic Activated! 🎨</div>')
                        .appendTo('body')
                        .fadeIn()
                        .delay(3000)
                        .fadeOut(function() {
                            $(this).remove();
                            $('body').removeClass('easter-egg-active');
                            $('.rainbow-border').removeClass('rainbow-border');
                        });
                    
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }
    
    // ===== INITIALIZE ALL FUNCTIONS =====
    function init() {
        initScrollAnimations();
        initGallery();
        initSmoothScrolling();
        initParallax();
        initMobileMenu();
        initBackToTop();
        initHeaderScrollEffect();
        initTimelineAnimations();
        initValueCards();
        initTechniqueAnimations();
        initStaffAnimations();
        initResponsiveUtilities();
        initAccessibility();
        initPerformanceOptimizations();
        initTypingEffect();
        initEasterEgg();
        
        // Add loaded class for CSS animations
        setTimeout(function() {
            $('body').addClass('page-loaded');
        }, 100);
    }
    
    // Start initialization
    init();
    
    // ===== PUBLIC API =====
    window.ConceptPage = {
        scrollToSection: function(selector) {
            const target = $(selector);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 800);
            }
        },
        
        changeGalleryImage: function(index) {
            $('.gallery-thumbs img').eq(index).trigger('click');
        },
        
        animateTimeline: function() {
            $('.timeline-item').addClass('timeline-animated');
        },
        
        resetAnimations: function() {
            $('.animate-on-scroll').removeClass('animated');
            $('.timeline-item').removeClass('timeline-animated');
            $('.technique-item').removeClass('technique-animated');
            $('.staff-philosophy').removeClass('staff-animated');
        }
    };
});

// ===== CSS ANIMATIONS & EASTER EGG STYLES =====
const animationStyles = `
    .timeline-animated {
        animation: slideInFromSide 0.8s ease forwards;
    }
    
    .technique-animated {
        animation: slideInLeft 0.6s ease forwards;
    }
    
    .staff-animated {
        animation: popIn 0.5s ease forwards;
    }
    
    .easter-egg-message {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffd93d);
        background-size: 300% 300%;
        animation: gradientShift 2s ease infinite;
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        display: none;
    }
    
    .rainbow-border {
        border: 3px solid;
        border-image: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffd93d) 1;
        animation: rainbowRotate 2s linear infinite;
    }
    
    @keyframes slideInFromSide {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes popIn {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes rainbowRotate {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
    }
    
    .sr-only-focusable:active,
    .sr-only-focusable:focus {
        position: static !important;
        width: auto !important;
        height: auto !important;
        padding: 0.5rem 1rem !important;
        margin: 0 !important;
        overflow: visible !important;
        clip: auto !important;
        white-space: normal !important;
        background: #000 !important;
        color: #fff !important;
        text-decoration: none !important;
        z-index: 9999 !important;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .timeline-animated,
        .technique-animated,
        .staff-animated,
        .easter-egg-message,
        .rainbow-border {
            animation: none !important;
        }
        
        .animate-on-scroll {
            transition: none !important;
        }
    }
`;

// Inject animation styles
if (!document.getElementById('concept-animations')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'concept-animations';
    styleElement.innerHTML = animationStyles;
    document.head.appendChild(styleElement);
}

 // Scroll Animation
        function initScrollAnimations() {
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry, index) {
                        if (entry.isIntersecting) {
                            setTimeout(function() {
                                entry.target.classList.add('animated');
                            }, index * 100);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                document.querySelectorAll('.animate-on-scroll').forEach(function(element) {
                    observer.observe(element);
                });
            } else {
                // Fallback for browsers without IntersectionObserver
                document.querySelectorAll('.animate-on-scroll').forEach(function(element) {
                    element.classList.add('animated');
                });
            }
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            initScrollAnimations();
        });