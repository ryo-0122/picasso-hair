/**
 * Salon Page JavaScript
 * Picasso Beauty Salon
 */

$(document).ready(function() {
    
    // Initialize Foundation
    $(document).foundation();
    
    // Salon data for enhanced functionality
    const salonData = {
        'picasso-garden': {
            name: 'hair relaxation PICASSO GARDEN',
            concept: 'リラクゼーション空間での上質な美容体験',
            address: '岡山市南区福富西3丁目7-35',
            phone: '086-264-3611',
            hours: {
                weekday: '火〜金 10:00〜19:00',
                weekend: '土日祝 9:00〜18:00'
            },
            closed: '毎週月曜日、第1・第3火曜日',
            parking: '6台',
            features: ['ハイトーンカラー特化', 'ヘッドスパ', 'オーガニック商品', '駐車場6台'],
            images: [
                'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
            ]
        },
        'arte-f': {
            name: 'hair picasso arte.f',
            concept: 'アートな感性で創る個性的なスタイル',
            address: '岡山市南区福富西1-2-3',
            phone: '086-264-3612',
            hours: {
                weekday: '火〜金 10:00〜19:00',
                weekend: '土日祝 9:00〜18:00'
            },
            closed: '毎週月曜日',
            parking: '4台',
            features: ['デザインカット', 'アート系カラー', 'カップル・友達同時施術', '駐車場4台']
        },
        'grace-fukutomi': {
            name: 'grace produce by picasso',
            concept: 'エレガントで上品な大人の美を追求',
            address: '岡山市北区門田屋敷2-3-4',
            phone: '086-264-3613',
            hours: {
                weekday: '火〜金 9:30〜18:30',
                weekend: '土日祝 9:00〜18:00'
            },
            closed: '毎週月曜日',
            parking: '3台',
            features: ['大人の上質カラー', 'まつ毛エクステ', 'カフェタイム', 'キッズスペース']
        },
        'gran-mama-matsuhama': {
            name: 'Gran mama 松浜店',
            concept: '家族みんなで通える温かなサロン',
            address: '岡山市南区松浜町3-4-5',
            phone: '086-264-3614',
            hours: {
                weekday: '火〜金 9:00〜18:00',
                weekend: '土日祝 9:00〜17:00'
            },
            closed: '毎週月曜日',
            parking: '5台',
            features: ['ファミリー向け', 'シニア向けメニュー', 'キッズカット', 'バリアフリー']
        },
        'picasso-emue': {
            name: 'picasso emu,e',
            concept: 'トレンドと個性を融合した新感覚サロン',
            address: '岡山市北区茶屋町5-6-7',
            phone: '086-264-3615',
            hours: {
                weekday: '火〜金 10:00〜20:00',
                weekend: '土日祝 9:00〜19:00'
            },
            closed: '毎週月曜日',
            parking: '4台',
            features: ['SNS映えスタイル', 'トレンドカラー', '撮影スペース', 'フリーWi-Fi']
        }
    };
    
    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry, index) {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            $(entry.target).addClass('animated');
                        }, index * 200);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            $('.salon-item').each(function() {
                observer.observe(this);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            $('.salon-item').addClass('animated');
        }
    }
    
    // ===== GALLERY FUNCTIONALITY =====
    function initGallery() {
        $('.gallery-thumb').on('click', function() {
            const newSrc = $(this).attr('src').replace('w=300', 'w=1200');
            const mainImage = $(this).closest('.salon-card').find('.salon-main-image img');
            
            // Update active state
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            
            // Fade transition
            mainImage.fadeOut(200, function() {
                $(this).attr('src', newSrc).fadeIn(200);
            });
        });
        
        // Set first thumbnail as active
        $('.gallery-thumb').first().addClass('active');
        
        // Keyboard navigation
        $('.gallery-thumb').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).trigger('click');
            }
        });
    }
    
    // ===== SALON CARD INTERACTIONS =====
    function initSalonCardInteractions() {
        $('.salon-card').each(function() {
            const card = $(this);
            const salonId = card.closest('.salon-item').data('salon');
            
            // Add hover effects
            card.on('mouseenter', function() {
                $(this).addClass('hovered');
            }).on('mouseleave', function() {
                $(this).removeClass('hovered');
            });
            
            // Add click to expand functionality
            card.on('click', function(e) {
                if (!$(e.target).closest('.salon-actions').length && 
                    !$(e.target).closest('.gallery-thumb').length) {
                    showSalonDetail(salonId);
                }
            });
        });
    }
    
    // // ===== SALON DETAIL MODAL =====
    // function showSalonDetail(salonId) {
    //     const salon = salonData[salonId];
    //     if (!salon) return;
        
    //     // Create modal content
    //     const modalContent = `
    //         <div class="reveal large" id="salonDetailModal" data-reveal>
    //             <div class="salon-detail-modal">
    //                 <h2>${salon.name}</h2>
    //                 <div class="salon-modal-content">
    //                     <div class="grid-x grid-margin-x">
    //                         <div class="cell small-12 medium-6">
    //                             <div class="salon-modal-gallery">
    //                                 <img src="${salon.images ? salon.images[0] : ''}" alt="${salon.name}" class="modal-main-image">
    //                                 ${salon.images ? `
    //                                     <div class="modal-gallery-thumbs">
    //                                         ${salon.images.map(img => `<img src="${img}" alt="" class="modal-thumb">`).join('')}
    //                                     </div>
    //                                 ` : ''}
    //                             </div>
    //                         </div>
    //                         <div class="cell small-12 medium-6">
    //                             <div class="salon-modal-info">
    //                                 <div class="salon-modal-concept">${salon.concept}</div>
                                    
    //                                 <div class="salon-modal-details">
    //                                     <div class="detail-group">
    //                                         <h4><i class="fas fa-map-marker-alt"></i> アクセス</h4>
    //                                         <p>${salon.address}</p>
    //                                     </div>
                                        
    //                                     <div class="detail-group">
    //                                         <h4><i class="fas fa-phone"></i> お電話</h4>
    //                                         <p><a href="tel:${salon.phone}">${salon.phone}</a></p>
    //                                     </div>
                                        
    //                                     <div class="detail-group">
    //                                         <h4><i class="fas fa-clock"></i> 営業時間</h4>
    //                                         <p>${salon.hours.weekday}<br>${salon.hours.weekend}</p>
    //                                     </div>
                                        
    //                                     <div class="detail-group">
    //                                         <h4><i class="fas fa-calendar-times"></i> 定休日</h4>
    //                                         <p>${salon.closed}</p>
    //                                     </div>
                                        
    //                                     <div class="detail-group">
    //                                         <h4><i class="fas fa-car"></i> 駐車場</h4>
    //                                         <p>${salon.parking}</p>
    //                                     </div>
    //                                 </div>
                                    
    //                                 <div class="salon-modal-features">
    //                                     <h4>特徴</h4>
    //                                     <div class="feature-tags">
    //                                         ${salon.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
    //                                     </div>
    //                                 </div>
                                    
    //                                 <div class="salon-modal-actions">
    //                                     <a href="salon-detail.html?salon=${salonId}" class="button large">MENU</a>
    //                                     <a href="#reservation" class="button secondary large">予約する</a>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //             <button class="close-button" data-close aria-label="Close modal" type="button">
    //                 <span aria-hidden="true">&times;</span>
    //             </button>
    //         </div>
    //     `;
        
    //     // Remove existing modal
    //     $('#salonDetailModal').remove();
        
    //     // Add new modal to body
    //     $('body').append(modalContent);
        
    //     // Initialize Foundation for new modal
    //     $('#salonDetailModal').foundation();
        
    //     // Open modal
    //     $('#salonDetailModal').foundation('open');
        
    //     // Initialize gallery for modal
    //     initModalGallery();
    // }
    
    // // ===== MODAL GALLERY =====
    // function initModalGallery() {
    //     $('.modal-thumb').on('click', function() {
    //         const newSrc = $(this).attr('src');
    //         const mainImage = $('.modal-main-image');
            
    //         // Update active state
    //         $(this).siblings().removeClass('active');
    //         $(this).addClass('active');
            
    //         // Fade transition
    //         mainImage.fadeOut(200, function() {
    //             $(this).attr('src', newSrc).fadeIn(200);
    //         });
    //     });
        
    //     // Set first thumbnail as active
    //     $('.modal-thumb').first().addClass('active');
    // }
    
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
        
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 100) {
                header.addClass('scrolled');
            } else {
                header.removeClass('scrolled');
            }
        });
    }
    
    // ===== SALON FILTERING =====
    function initSalonFiltering() {
        // Add filter controls
        const filterControls = $(`
            <div class="salon-filters">
                <div class="grid-container">
                    <div class="grid-x grid-margin-x align-center">
                        <div class="cell small-12 large-8">
                            <div class="filter-tabs">
                                <button class="filter-tab active" data-filter="all">すべて</button>
                                <button class="filter-tab" data-filter="flagship">旗艦店</button>
                                <button class="filter-tab" data-filter="family">ファミリー向け</button>
                                <button class="filter-tab" data-filter="trendy">トレンド重視</button>
                                <button class="filter-tab" data-filter="elegant">エレガント</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        $('.salon-main').prepend(filterControls);
        
        // Filter functionality
        $('.filter-tab').on('click', function() {
            const filter = $(this).data('filter');
            
            // Update active state
            $('.filter-tab').removeClass('active');
            $(this).addClass('active');
            
            // Filter salons
            $('.salon-item').each(function() {
                const salonId = $(this).data('salon');
                let shouldShow = true;
                
                if (filter !== 'all') {
                    shouldShow = false;
                    
                    switch (filter) {
                        case 'flagship':
                            shouldShow = salonId === 'picasso-garden';
                            break;
                        case 'family':
                            shouldShow = salonId === 'gran-mama-matsuhama';
                            break;
                        case 'trendy':
                            shouldShow = salonId === 'picasso-emue';
                            break;
                        case 'elegant':
                            shouldShow = salonId === 'grace-fukutomi';
                            break;
                    }
                }
                
                if (shouldShow) {
                    $(this).removeClass('filtered-out').addClass('filtered-in');
                } else {
                    $(this).removeClass('filtered-in').addClass('filtered-out');
                }
            });
        });
    }
    
    // ===== PHONE CLICK TRACKING =====
    function initPhoneTracking() {
        $('a[href^="tel:"]').on('click', function() {
            const phoneNumber = $(this).attr('href').replace('tel:', '');
            console.log('Phone call initiated:', phoneNumber);
            
            // Send analytics event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    phone_number: phoneNumber,
                    salon: $(this).closest('.salon-item').data('salon')
                });
            }
        });
    }
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    function initAccessibility() {
        // Add ARIA labels
        $('.salon-card').attr('role', 'button').attr('tabindex', '0');
        $('.gallery-thumb').attr('role', 'button').attr('tabindex', '0');
        $('.filter-tab').attr('role', 'tab').attr('tabindex', '0');
        
        // Keyboard navigation
        $('.salon-card').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const salonId = $(this).closest('.salon-item').data('salon');
                showSalonDetail(salonId);
            }
        });
        
        // Skip to content link
        if ($('#skip-to-content').length === 0) {
            $('body').prepend('<a href="#main-content" id="skip-to-content" class="sr-only sr-only-focusable">Skip to main content</a>');
        }
        
        $('#skip-to-content').on('click', function(e) {
            e.preventDefault();
            $('.salon-main').focus();
        });
    }
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    function initPerformanceOptimizations() {
        // Lazy loading for images
        if ('loading' in HTMLImageElement.prototype) {
            $('.salon-main-image img, .gallery-thumb').attr('loading', 'lazy');
        }
        
        // Intersection observer for advanced lazy loading
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
                
                // Update salon card layouts
                updateSalonCardLayouts();
            }, 250);
        });
    }
    
    function updateSalonCardLayouts() {
        $('.salon-card').each(function() {
            if ($(window).width() < 768) {
                $(this).addClass('mobile-layout');
            } else {
                $(this).removeClass('mobile-layout');
            }
        });
    }
    
    // ===== INITIALIZE ALL FUNCTIONS =====
    function init() {
        initScrollAnimations();
        initGallery();
        initSalonCardInteractions();
        initSmoothScrolling();
        initMobileMenu();
        initBackToTop();
        initHeaderScrollEffect();
        initSalonFiltering();
        initPhoneTracking();
        initMapInteractions();
        initSalonComparison();
        initAccessibility();
        initPerformanceOptimizations();
        initResponsiveUtilities();
        
        // Add loaded class for CSS animations
        setTimeout(function() {
            $('body').addClass('page-loaded');
        }, 100);
    }
    
    // Start initialization
    init();
    
    // ===== PUBLIC API =====
    window.SalonPage = {
        showSalonDetail: function(salonId) {
            showSalonDetail(salonId);
        },
        
        filterSalons: function(filter) {
            $('.filter-tab[data-filter="' + filter + '"]').trigger('click');
        },
        
        getSalonData: function(salonId) {
            return salonData[salonId];
        },
        
        scrollToSalon: function(salonId) {
            const salonElement = $('.salon-item[data-salon="' + salonId + '"]');
            if (salonElement.length) {
                $('html, body').animate({
                    scrollTop: salonElement.offset().top - 100
                }, 800);
            }
        }
    };
});

// ===== ADDITIONAL CSS FOR DYNAMIC ELEMENTS =====
const dynamicStyles = `
    .salon-filters {
        background: white;
        padding: 30px 0;
        margin-bottom: 40px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    
    .filter-tabs {
        display: flex;
        justify-content: center;
        gap: 15px;
        flex-wrap: wrap;
    }
    
    .filter-tab {
        padding: 12px 24px;
        background: var(--light-color);
        border: none;
        border-radius: 25px;
        cursor: pointer;
        transition: var(--transition);
        font-size: 14px;
        font-weight: 400;
        color: var(--text-color);
    }
    
    .filter-tab:hover,
    .filter-tab.active {
        background: var(--primary-color);
        color: white;
    }
    
    .salon-item.filtered-out {
        opacity: 0.3;
        transform: scale(0.95);
        pointer-events: none;
    }
    
    .salon-item.filtered-in {
        opacity: 1;
        transform: scale(1);
    }
    
    .compare-checkbox {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(255,255,255,0.9);
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .comparison-bar {
        position: fixed;
        bottom: -80px;
        left: 0;
        right: 0;
        background: var(--primary-color);
        color: white;
        padding: 20px;
        z-index: 1000;
        transition: bottom 0.3s ease;
        box-shadow: 0 -5px 15px rgba(0,0,0,0.1);
    }
    
    .comparison-bar.show {
        bottom: 0;
    }
    
    .comparison-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .comparison-content .button {
        margin-left: 10px;
        padding: 8px 16px;
        font-size: 13px;
    }
    
    .salon-modal-concept {
        font-style: italic;
        color: var(--primary-color);
        margin-bottom: 20px;
        font-size: 1.1rem;
    }
    
    .salon-modal-details {
        margin-bottom: 25px;
    }
    
    .detail-group {
        margin-bottom: 15px;
    }
    
    .detail-group h4 {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 5px;
        color: var(--text-color);
    }
    
    .detail-group h4 i {
        margin-right: 8px;
        color: var(--primary-color);
        width: 16px;
    }
    
    .detail-group p {
        font-size: 13px;
        color: var(--text-light);
        margin: 0;
        line-height: 1.4;
    }
    
    .feature-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .feature-tag {
        background: var(--light-color);
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 12px;
        color: var(--text-color);
    }
    
    .salon-modal-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    
    .salon-modal-actions .button {
        flex: 1;
        padding: 10px 20px;
        font-size: 14px;
    }
    
    .modal-gallery-thumbs {
        display: flex;
        gap: 8px;
        margin-top: 10px;
    }
    
    .modal-thumb {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 6px;
        cursor: pointer;
        opacity: 0.7;
        transition: var(--transition);
    }
    
    .modal-thumb:hover,
    .modal-thumb.active {
        opacity: 1;
        transform: scale(1.05);
    }
    
    .map-focused {
        transform: scale(1.02);
        box-shadow: 0 15px 50px rgba(0,0,0,0.15);
    }
    
    @media (max-width: 39.9375em) {
        .filter-tabs {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 10px;
        }
        
        .filter-tab {
            flex-shrink: 0;
            padding: 10px 20px;
            font-size: 13px;
        }
        
        .comparison-content {
            flex-direction: column;
            gap: 10px;
            text-align: center;
        }
        
        .salon-modal-actions {
            flex-direction: column;
        }
        
        .compare-checkbox {
            position: static;
            margin-bottom: 15px;
            justify-content: center;
        }
    }
`;

// Inject dynamic styles
if (!document.getElementById('salon-dynamic-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'salon-dynamic-styles';
    styleElement.innerHTML = dynamicStyles;
    document.head.appendChild(styleElement);
}
// Enhanced Salon Page Features
// 追加機能用のJavaScript

// ===== ENHANCED SEARCH & SORT =====
function initEnhancedSearch() {
    // Add search and sort controls
    const searchControls = $(`
        <div class="salon-search-controls">
            <div class="grid-container">
                <div class="grid-x grid-margin-x align-center">
                    <div class="cell small-12 medium-6">
                        <div class="search-input-group">
                            <input type="text" id="salonSearch" placeholder="サロン名、エリア、特徴で検索...">
                            <button class="search-btn"><i class="fas fa-search"></i></button>
                        </div>
                    </div>
                    <div class="cell small-12 medium-3">
                        <select id="sortOptions">
                            <option value="default">並び順</option>
                            <option value="name">名前順</option>
                            <option value="rating">評価順</option>
                            <option value="distance">距離順</option>
                            <option value="newest">新着順</option>
                        </select>
                    </div>
                    <div class="cell small-12 medium-3">
                        <div class="view-toggle">
                            <button class="view-btn active" data-view="card">
                                <i class="fas fa-th-large"></i>
                            </button>
                            <button class="view-btn" data-view="list">
                                <i class="fas fa-list"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    $('.salon-overview').after(searchControls);
    
    // Search functionality
    let searchTimeout;
    $('#salonSearch').on('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });
    
    // Sort functionality
    $('#sortOptions').on('change', function() {
        sortSalons($(this).val());
    });
    
    // View toggle
    $('.view-btn').on('click', function() {
        $('.view-btn').removeClass('active');
        $(this).addClass('active');
        
        const view = $(this).data('view');
        $('.salon-main').removeClass('card-view list-view').addClass(view + '-view');
    });
}

function performSearch() {
    const searchTerm = $('#salonSearch').val().toLowerCase();
    
    $('.salon-item').each(function() {
        const salonText = $(this).text().toLowerCase();
        const isMatch = salonText.includes(searchTerm);
        
        $(this).toggleClass('search-hidden', !isMatch);
        
        if (isMatch) {
            highlightSearchTerms($(this), searchTerm);
        }
    });
    
    updateResultsCount();
}

function highlightSearchTerms($element, term) {
    if (!term) return;
    
    $element.find('.search-highlight').contents().unwrap();
    
    const regex = new RegExp(`(${term})`, 'gi');
    $element.find('h3, p, .feature-item span').each(function() {
        const $this = $(this);
        if ($this.children().length === 0) {
            const html = $this.html().replace(regex, '<span class="search-highlight">$1</span>');
            $this.html(html);
        }
    });
}

// ===== SOCIAL MEDIA INTEGRATION =====
function initSocialMediaIntegration() {
    // Add Instagram feed for each salon
    $('.salon-card').each(function() {
        const instagramHtml = $(`
            <div class="salon-instagram">
                <h5><i class="fab fa-instagram"></i> 最新の投稿</h5>
                <div class="instagram-posts">
                    <div class="insta-post" style="background-image: url('https://picsum.photos/100/100?random=1')"></div>
                    <div class="insta-post" style="background-image: url('https://picsum.photos/100/100?random=2')"></div>
                    <div class="insta-post" style="background-image: url('https://picsum.photos/100/100?random=3')"></div>
                </div>
                <a href="#" class="instagram-link">Instagramで見る</a>
            </div>
        `);
        
        $(this).find('.salon-features').after(instagramHtml);
    });
}



// ===== PERFORMANCE ENHANCEMENTS =====
function initPerformanceEnhancements() {
    // Virtual scrolling for large lists
    if ($('.salon-item').length > 10) {
        initVirtualScrolling();
    }
    
    // Image lazy loading
    initImageLazyLoading();
    
    // Debounced scroll events
    let scrollTimeout;
    $(window).on('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 16); // 60fps
    });
}

function initImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        $('.lazy').each(function() {
            imageObserver.observe(this);
        });
    }
}

// ===== ANALYTICS & TRACKING =====
function initAnalytics() {
    // Track salon interactions
    $('.salon-card').on('click', function() {
        const salonId = $(this).closest('.salon-item').data('salon');
        trackEvent('salon_view', { salon_id: salonId });
    });
    
    $('.favorite-btn').on('click', function() {
        const salonId = $(this).data('salon');
        trackEvent('salon_favorite', { salon_id: salonId });
    });
    
    $('a[href^="tel:"]').on('click', function() {
        const phone = $(this).attr('href').replace('tel:', '');
        trackEvent('phone_call', { phone_number: phone });
    });
}

function trackEvent(eventName, params) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, params);
    }
    
    // Console log for development
    console.log('Event tracked:', eventName, params);
}

// ===== UTILITY FUNCTIONS =====
function showToast(message, type = 'success') {
    const toast = $(`
        <div class="toast toast-${type}">
            <div class="toast-content">
                <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
                <span>${message}</span>
            </div>
        </div>
    `);
    
    $('body').append(toast);
    
    setTimeout(() => toast.addClass('show'), 100);
    setTimeout(() => {
        toast.removeClass('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function updateResultsCount() {
    const visibleSalons = $('.salon-item:not(.search-hidden, .filtered-out)').length;
    $('.results-count').text(`${visibleSalons}店舗表示中`);
}

function sortSalons(sortBy) {
    const $container = $('.salon-main .grid-x');
    const $items = $('.salon-item').detach();
    
    $items.sort(function(a, b) {
        switch (sortBy) {
            case 'name':
                return $(a).find('h3').text().localeCompare($(b).find('h3').text());
            case 'rating':
                return parseFloat($(b).find('.rating-text').text()) - parseFloat($(a).find('.rating-text').text());
            case 'distance':
                // This would calculate actual distance
                return Math.random() - 0.5;
            case 'newest':
                return $(b).data('salon').localeCompare($(a).data('salon'));
            default:
                return 0;
        }
    });
    
    $container.append($items);
}

// ===== INITIALIZATION =====
$(document).ready(function() {
    initEnhancedSearch();
    initFavoriteSystem();
    initReviewsSystem();
    initBookingAvailability();
    initSocialMediaIntegration();
    initAdvancedMap();
    initPerformanceEnhancements();
    initAnalytics();
});

// ===== ADDITIONAL CSS FOR NEW FEATURES =====
const enhancedStyles = `
.salon-search-controls {
    background: white;
    padding: 30px 0;
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 80px;
    z-index: 100;
}

.search-input-group {
    position: relative;
}

.search-input-group input {
    width: 100%;
    padding: 12px 50px 12px 15px;
    border: 2px solid #ddd;
    border-radius: 25px;
    font-size: 14px;
}

.search-btn {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    background: var(--primary-color);
    border: none;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    color: white;
    cursor: pointer;
}

.view-toggle {
    display: flex;
    border: 2px solid var(--primary-color);
    border-radius: 25px;
    overflow: hidden;
}

.view-btn {
    padding: 10px 20px;
    background: transparent;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    transition: var(--transition);
}

.view-btn.active {
    background: var(--primary-color);
    color: white;
}

.favorite-btn {
    background: transparent;
    border: 2px solid #ddd;
    color: #666;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: var(--transition);
    font-size: 13px;
}

.favorite-btn.favorited {
    border-color: #ff6b6b;
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
}

.salon-rating {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
}

.stars {
    color: #ffd700;
}

.rating-text {
    font-size: 13px;
    color: var(--text-light);
}

.availability-status {
    background: var(--light-color);
    padding: 15px;
    border-radius: 10px;
    margin: 15px 0;
}

.availability-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 5px;
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #28a745;
}

.salon-instagram {
    margin: 20px 0;
}

.salon-instagram h5 {
    font-size: 14px;
    margin-bottom: 10px;
    color: var(--text-color);
}

.instagram-posts {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
}

.insta-post {
    width: 60px;
    height: 60px;
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    cursor: pointer;
}

.instagram-link {
    font-size: 12px;
    color: var(--primary-color);
    text-decoration: none;
}

.map-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.map-control-btn {
    padding: 8px 16px;
    background: var(--light-color);
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 13px;
    transition: var(--transition);
}

.map-control-btn.active {
    background: var(--primary-color);
    color: white;
}

.search-highlight {
    background: rgba(169, 151, 109, 0.3);
    padding: 1px 2px;
    border-radius: 2px;
}

.salon-item.search-hidden {
    display: none;
}

.toast {
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--secondary-color);
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 9999;
}

.toast.show {
    transform: translateX(0);
}

.toast-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.toast.toast-success {
    background: #28a745;
}

.toast.toast-error {
    background: #dc3545;
}

.list-view .salon-card {
    grid-template-columns: 300px 1fr;
    min-height: 200px;
}

.list-view .salon-image-container {
    height: 200px;
}

.lazy {
    opacity: 0;
    transition: opacity 0.3s;
}

.lazy.loaded {
    opacity: 1;
}

@media (max-width: 768px) {
    .search-input-group input {
        padding: 10px 45px 10px 12px;
    }
    
    .view-toggle {
        width: 100%;
    }
    
    .view-btn {
        flex: 1;
    }
    
    .map-controls {
        overflow-x: auto;
        padding-bottom: 10px;
    }
    
    .map-control-btn {
        flex-shrink: 0;
    }
    
    .list-view .salon-card {
        grid-template-columns: 1fr;
    }
}
`;


$(document).ready(function() {
        // ギャラリー機能
        $('.gallery-thumb').on('click', function() {
            const newSrc = $(this).attr('src').replace('w=300', 'w=800');
            const mainImage = $(this).closest('.salon-image-container').find('.salon-main-image img');
            
            // アクティブ状態を更新
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            
            // フェード切り替え
            mainImage.fadeOut(200, function() {
                $(this).attr('src', newSrc).fadeIn(200);
            });
        });
        
        // 汎用的なモーダル開く処理
        $('[data-open]').on('click', function(e) {
            e.preventDefault();
            
            const modalId = $(this).data('open');
            
            // 既存の要素をクリーンアップ
            $('.reveal-overlay').remove();
            $('.modal-backdrop').remove();
            
            // 背景を追加
            $('body').append('<div class="modal-backdrop show"></div>');
            
            // 指定されたモーダルを表示
            $('#' + modalId).addClass('show');
            $('body').addClass('modal-open');
            
            console.log('モーダルが開かれました:', modalId);
        });
        
        // 汎用的な閉じる処理
        $(document).on('click', '.close-button', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
        
        // 背景クリックで閉じる
        $(document).on('click', '.modal-backdrop', function(e) {
            closeModal();
        });
        
        // ESCキーで閉じる
        $(document).on('keydown', function(e) {
            if (e.keyCode === 27 && $('.fullscreen-modal.show').length > 0) {
                closeModal();
            }
        });
        
        // モーダルを閉じる関数
        function closeModal() {
            $('.fullscreen-modal').removeClass('show');
            $('.modal-backdrop').remove();
            $('.reveal-overlay').remove();
            $('body').removeClass('modal-open is-reveal-open');
            console.log('モーダルが閉じられました');
        }
    });