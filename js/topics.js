/**
 * Topics Page JavaScript
 * Picasso Beauty Salon
 */

$(document).ready(function() {
    
    // Initialize Foundation
    $(document).foundation();
    
    // ===== CATEGORY FILTER FUNCTIONALITY =====
    function initCategoryFilter() {
        const categoryItems = $('.category-item');
        const topicItems = $('.topic-item');
        
        categoryItems.on('click', function() {
            const targetCategory = $(this).data('category');
            
            // Update active state
            categoryItems.removeClass('active');
            $(this).addClass('active');
            
            // Filter topics with animation
            topicItems.fadeOut(300, function() {
                if (targetCategory === 'all') {
                    topicItems.fadeIn(400);
                } else {
                    topicItems.each(function() {
                        const itemCategory = $(this).data('category');
                        if (itemCategory === targetCategory) {
                            $(this).fadeIn(400);
                        }
                    });
                }
            });
            
            // Update URL without reload
            if (history.pushState) {
                const newUrl = targetCategory === 'all' ? 
                    window.location.pathname : 
                    window.location.pathname + '?category=' + targetCategory;
                history.pushState(null, null, newUrl);
            }
        });
        
        // Handle initial category from URL
        const urlParams = new URLSearchParams(window.location.search);
        const initialCategory = urlParams.get('category');
        if (initialCategory) {
            categoryItems.each(function() {
                if ($(this).data('category') === initialCategory) {
                    $(this).trigger('click');
                }
            });
        }
    }
    
    // ===== SEARCH FUNCTIONALITY =====
    function initSearch() {
        const searchForm = $('.search-form');
        const searchInput = searchForm.find('input[type="search"]');
        let searchTimeout;
        
        // Real-time search
        searchInput.on('input', function() {
            clearTimeout(searchTimeout);
            const searchTerm = $(this).val().toLowerCase().trim();
            
            searchTimeout = setTimeout(function() {
                filterTopicsBySearch(searchTerm);
            }, 300);
        });
        
        // Search form submission
        searchForm.on('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.val().toLowerCase().trim();
            filterTopicsBySearch(searchTerm);
        });
        
        function filterTopicsBySearch(searchTerm) {
            const topicItems = $('.topic-item');
            
            if (searchTerm === '') {
                topicItems.fadeIn(400);
                return;
            }
            
            topicItems.each(function() {
                const title = $(this).find('.topic-title').text().toLowerCase();
                const excerpt = $(this).find('.topic-excerpt').text().toLowerCase();
                const category = $(this).find('.topic-category').text().toLowerCase();
                
                if (title.includes(searchTerm) || 
                    excerpt.includes(searchTerm) || 
                    category.includes(searchTerm)) {
                    $(this).fadeIn(400);
                } else {
                    $(this).fadeOut(300);
                }
            });
        }
    }
    
    // ===== SMOOTH SCROLLING =====
    function initSmoothScrolling() {
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
    
    // ===== TOPIC ITEM ANIMATIONS =====
    function initTopicAnimations() {
        const topicItems = $('.topic-item');
        
        // Intersection Observer for scroll animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            topicItems.each(function() {
                observer.observe(this);
            });
        }
        
        // Hover effects
        topicItems.on('mouseenter', function() {
            $(this).addClass('hovered');
        }).on('mouseleave', function() {
            $(this).removeClass('hovered');
        });
    }
    
    // ===== PAGINATION FUNCTIONALITY =====
    function initPagination() {
        $('.pagination a').on('click', function(e) {
            e.preventDefault();
            
            // Get page number
            const pageNum = $(this).text();
            
            // Update active state
            $('.pagination .current').removeClass('current');
            $(this).parent().addClass('current');
            
            // Smooth scroll to top of content
            $('html, body').animate({
                scrollTop: $('.topics-main').offset().top - 120
            }, 600);
            
            // Here you would typically make an AJAX request to load new content
            console.log('Loading page:', pageNum);
        });
    }
    
    // ===== SIDEBAR WIDGETS INTERACTIONS =====
    function initSidebarWidgets() {
        // Categories and Archive hover effects
        $('.categories-list a, .archive-list a').on('mouseenter', function() {
            $(this).closest('li').addClass('hover');
        }).on('mouseleave', function() {
            $(this).closest('li').removeClass('hover');
        });
        
        // Popular posts click tracking
        $('.popular-post').on('click', function() {
            const postTitle = $(this).find('h4 a').text();
            console.log('Popular post clicked:', postTitle);
        });
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
                }
            }, 250);
        });
    }
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    function initAccessibility() {
        // Keyboard navigation for category filter
        $('.category-item').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).trigger('click');
            }
        });
        
        // Focus management for mobile menu
        $('#menuToggle').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).trigger('click');
            }
        });
        
        // Skip to content link
        if ($('#skip-to-content').length === 0) {
            $('body').prepend('<a href="#main-content" id="skip-to-content" class="sr-only sr-only-focusable">Skip to main content</a>');
        }
        
        $('#skip-to-content').on('click', function(e) {
            e.preventDefault();
            $('.topics-main').focus();
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
    
    // ===== INITIALIZE ALL FUNCTIONS =====
    function init() {
        initCategoryFilter();
        initSearch();
        initSmoothScrolling();
        initMobileMenu();
        initBackToTop();
        initHeaderScrollEffect();
        initTopicAnimations();
        initPagination();
        initSidebarWidgets();
        initResponsiveUtilities();
        initAccessibility();
        initPerformanceOptimizations();
        
        // Add loaded class for CSS animations
        setTimeout(function() {
            $('body').addClass('page-loaded');
        }, 100);
    }
    
    // Start initialization
    init();
    
    // ===== PUBLIC API =====
    window.TopicsPage = {
        filterByCategory: function(category) {
            $('.category-item[data-category="' + category + '"]').trigger('click');
        },
        
        search: function(term) {
            $('.search-form input').val(term).trigger('input');
        },
        
        scrollToTop: function() {
            $('#backToTop').trigger('click');
        }
    };
});

// ===== CSS ANIMATIONS =====
// Add these styles to topics.css for animations
const animationStyles = `
    .topic-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .topic-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .topic-item.hovered {
        transform: translateY(-5px);
    }
    
    .category-item {
        transition: all 0.3s ease;
    }
    
    .sidebar-widget {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }
    
    .page-loaded .sidebar-widget {
        opacity: 1;
        transform: translateY(0);
    }
    
    .page-loaded .sidebar-widget:nth-child(1) { transition-delay: 0.1s; }
    .page-loaded .sidebar-widget:nth-child(2) { transition-delay: 0.2s; }
    .page-loaded .sidebar-widget:nth-child(3) { transition-delay: 0.3s; }
    .page-loaded .sidebar-widget:nth-child(4) { transition-delay: 0.4s; }
    .page-loaded .sidebar-widget:nth-child(5) { transition-delay: 0.5s; }
    
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
        .topic-item,
        .sidebar-widget,
        .category-item {
            transition: none !important;
        }
    }
`;

// Inject animation styles
if (!document.getElementById('topics-animations')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'topics-animations';
    styleElement.innerHTML = animationStyles;
    document.head.appendChild(styleElement);
}