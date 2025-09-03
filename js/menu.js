/**
 * Menu Page JavaScript
 * Picasso Beauty Salon
 */

$(document).ready(function() {
    
    // Initialize Foundation
    $(document).foundation();
    
    // Menu data for modal display
    const menuData = {
        'カット': {
            image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            price: '¥4,400〜',
            duration: '60分',
            description: 'お客様の骨格や髪質に合わせたスタイリングをご提案します。トレンドを取り入れながらも、日常のスタイリングが楽になるカットを心がけています。',
            details: [
                'カウンセリング（10分）',
                'シャンプー（10分）',
                'カット（30分）',
                'スタイリング（10分）'
            ],
            notes: [
                '初回のお客様はカウンセリングにお時間をいただく場合があります',
                'ヘアアイロンやコテを使ったスタイリングも可能です',
                '次回のご来店目安：1〜2ヶ月'
            ]
        },
        'ハイトーンカラー': {
            image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            price: '¥6,600〜',
            duration: '120-180分',
            description: '当サロンの看板メニュー。ブリーチを使った繊細な色彩表現で、理想のカラーを実現します。髪へのダメージを最小限に抑える技術が自慢です。',
            details: [
                'カウンセリング（15分）',
                'ブリーチ塗布（30分）',
                '放置時間（30-60分）',
                'シャンプー（15分）',
                'カラー塗布（30分）',
                '放置・仕上げ（30-60分）'
            ],
            notes: [
                '髪の状態によって施術時間が変わります',
                'ダメージが気になる方はトリートメントとの併用をおすすめします',
                '次回のご来店目安：6〜8週間'
            ]
        }
        // 他のメニューデータも同様に定義
    };
    
    // ===== CATEGORY TAB FUNCTIONALITY =====
    function initCategoryTabs() {
        $('.menu-tab').on('click', function() {
            const targetCategory = $(this).data('category');
            
            // Update active state
            $('.menu-tab').removeClass('active');
            $(this).addClass('active');
            
            // Hide all categories with animation
            $('.menu-category.active').fadeOut(300, function() {
                $(this).removeClass('active');
                
                // Show target category
                $('#' + targetCategory).fadeIn(400, function() {
                    $(this).addClass('active');
                    
                    // Trigger scroll animations for new content
                    initScrollAnimations();
                });
            });
            
            // Update URL without reload
            if (history.pushState) {
                const newUrl = window.location.pathname + '?category=' + targetCategory;
                history.pushState(null, null, newUrl);
            }
        });
        
        // Handle initial category from URL
        const urlParams = new URLSearchParams(window.location.search);
        const initialCategory = urlParams.get('category');
        if (initialCategory) {
            $('.menu-tab[data-category="' + initialCategory + '"]').trigger('click');
        }
    }
    
    // ===== SUB CATEGORY FILTERING =====
    function initSubCategoryFiltering() {
        $('.sub-tab').on('click', function() {
            const targetSubcategory = $(this).data('subcategory');
            
            // Update active state
            $('.sub-tab').removeClass('active');
            $(this).addClass('active');
            
            // Filter menu items
            const menuItems = $('.menu-item');
            
            if (targetSubcategory === 'all') {
                // Show all items
                menuItems.removeClass('hide').addClass('filtering');
                setTimeout(function() {
                    menuItems.removeClass('filtering').addClass('show');
                }, 50);
            } else {
                // Hide non-matching items
                menuItems.addClass('filtering');
                
                setTimeout(function() {
                    menuItems.each(function() {
                        const itemSubcategory = $(this).data('subcategory');
                        if (itemSubcategory === targetSubcategory) {
                            $(this).removeClass('hide filtering').addClass('show');
                        } else {
                            $(this).addClass('hide').removeClass('show filtering');
                        }
                    });
                }, 200);
            }
        });
    }
    
    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry, index) {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            $(entry.target).addClass('show');
                        }, index * 100);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            $('.menu-item:not(.show)').each(function() {
                observer.observe(this);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            $('.menu-item').addClass('show');
        }
    }
    
    // ===== MENU DETAIL MODAL =====
    function initMenuDetailModal() {
        $('.menu-detail-btn').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const menuCard = $(this).closest('.menu-card');
            const menuTitle = menuCard.find('h3').text();
            const menuImage = menuCard.find('.menu-image img').attr('src');
            const menuPrice = menuCard.find('.menu-price').text();
            const menuDescription = menuCard.find('p').text();
            const menuDuration = menuCard.find('.menu-duration span').text();
            
            // Update modal content
            $('#modalTitle').text(menuTitle);
            $('#modalImage').attr('src', menuImage).attr('alt', menuTitle);
            
            let modalContent = `
                <div class="modal-menu-info">
                    <div class="modal-price">${menuPrice}</div>
                    <div class="modal-duration">
                        <i class="fas fa-clock"></i>
                        ${menuDuration}
                    </div>
                    <p class="modal-description">${menuDescription}</p>
                </div>
            `;
            
            // Add detailed information if available
            if (menuData[menuTitle]) {
                const data = menuData[menuTitle];
                modalContent += `
                    <div class="modal-details">
                        <h4>施術の流れ</h4>
                        <ul class="process-list">
                            ${data.details.map(detail => `<li>${detail}</li>`).join('')}
                        </ul>
                        
                        <h4>注意事項</h4>
                        <ul class="notes-list">
                            ${data.notes.map(note => `<li>${note}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            $('#modalContent').html(modalContent);
            
            // Open modal
            $('#menuDetailModal').foundation('open');
        });
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
        
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 100) {
                header.addClass('scrolled');
            } else {
                header.removeClass('scrolled');
            }
        });
    }
    
    // ===== MENU CARD HOVER EFFECTS =====
    function initMenuCardEffects() {
        $('.menu-card').on('mouseenter', function() {
            $(this).addClass('hovered');
        }).on('mouseleave', function() {
            $(this).removeClass('hovered');
        });
    }
    
    // ===== PRICE CALCULATION =====
    function initPriceCalculator() {
        // Add price calculator for combination menus
        $('.menu-item[data-subcategory="set"]').each(function() {
            const card = $(this);
            const basePrice = parseInt(card.find('.menu-price').text().replace(/[¥,〜]/g, ''));
            
            // Add interactive price calculator
            const calculator = $(`
                <div class="price-calculator">
                    <h5>オプション</h5>
                    <div class="option-list">
                        <label class="option-item">
                            <input type="checkbox" data-price="1100">
                            <span>シャンプー・ブロー (+¥1,100)</span>
                        </label>
                        <label class="option-item">
                            <input type="checkbox" data-price="2200">
                            <span>ヘッドスパ (+¥2,200)</span>
                        </label>
                        <label class="option-item">
                            <input type="checkbox" data-price="1650">
                            <span>前髪カット (+¥1,650)</span>
                        </label>
                    </div>
                    <div class="total-price">
                        合計: <span class="total-amount">¥${basePrice.toLocaleString()}</span>
                    </div>
                </div>
            `);
            
            card.find('.menu-content').append(calculator);
            
            // Update total price when options change
            card.find('.option-item input').on('change', function() {
                let total = basePrice;
                card.find('.option-item input:checked').each(function() {
                    total += parseInt($(this).data('price'));
                });
                card.find('.total-amount').text('¥' + total.toLocaleString());
            });
        });
    }
    
    // ===== FAVORITE SYSTEM =====
    function initFavoriteSystem() {
        // Add favorite buttons to menu cards
        $('.menu-card').each(function() {
            const favoriteBtn = $('<button class="favorite-btn" title="お気に入りに追加"><i class="fas fa-heart"></i></button>');
            $(this).find('.menu-content').prepend(favoriteBtn);
        });
        
        // Load favorites from localStorage
        const favorites = JSON.parse(localStorage.getItem('menuFavorites') || '[]');
        favorites.forEach(function(menuTitle) {
            $(`.menu-content h3:contains("${menuTitle}")`).siblings('.favorite-btn').addClass('active');
        });
        
        // Handle favorite button clicks
        $('.favorite-btn').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const menuTitle = $(this).siblings('h3').text();
            let favorites = JSON.parse(localStorage.getItem('menuFavorites') || '[]');
            
            if ($(this).hasClass('active')) {
                // Remove from favorites
                favorites = favorites.filter(fav => fav !== menuTitle);
                $(this).removeClass('active');
            } else {
                // Add to favorites
                favorites.push(menuTitle);
                $(this).addClass('active');
            }
            
            localStorage.setItem('menuFavorites', JSON.stringify(favorites));
            
            // Show feedback
            showNotification($(this).hasClass('active') ? 'お気に入りに追加しました' : 'お気に入りから削除しました');
        });
    }
    
    // ===== SEARCH FUNCTIONALITY =====
    function initSearch() {
        // Add search box to sub-category nav
        const searchBox = $(`
            <div class="menu-search">
                <input type="search" placeholder="メニューを検索..." class="search-input">
                <button class="search-clear" title="クリア">×</button>
            </div>
        `);
        
        $('.sub-category-nav').append(searchBox);
        
        let searchTimeout;
        
        $('.search-input').on('input', function() {
            clearTimeout(searchTimeout);
            const searchTerm = $(this).val().toLowerCase().trim();
            
            searchTimeout = setTimeout(function() {
                filterMenusBySearch(searchTerm);
            }, 300);
        });
        
        $('.search-clear').on('click', function() {
            $('.search-input').val('').trigger('input');
        });
        
        function filterMenusBySearch(searchTerm) {
            const menuItems = $('.menu-item');
            
            if (searchTerm === '') {
                menuItems.removeClass('hide').addClass('show');
                return;
            }
            
            menuItems.each(function() {
                const title = $(this).find('h3').text().toLowerCase();
                const description = $(this).find('p').text().toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    $(this).removeClass('hide').addClass('show');
                } else {
                    $(this).addClass('hide').removeClass('show');
                }
            });
        }
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'success') {
        const notification = $(`
            <div class="notification ${type}">
                <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
                <span>${message}</span>
            </div>
        `);
        
        $('body').append(notification);
        
        setTimeout(function() {
            notification.addClass('show');
        }, 100);
        
        setTimeout(function() {
            notification.removeClass('show');
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    function initAccessibility() {
        // Add ARIA labels
        $('.menu-tab').attr('role', 'tab').attr('tabindex', '0');
        $('.sub-tab').attr('role', 'button').attr('tabindex', '0');
        $('.menu-detail-btn').attr('aria-label', '詳細を表示');
        $('.favorite-btn').attr('aria-label', 'お気に入りに追加');
        
        // Keyboard navigation
        $('.menu-tab, .sub-tab').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).trigger('click');
            }
        });
        
        // Focus management for modal
        $('#menuDetailModal').on('open.zf.reveal', function() {
            $(this).find('.close-button').focus();
        });
    }
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    function initPerformanceOptimizations() {
        // Lazy loading for images
        if ('loading' in HTMLImageElement.prototype) {
            $('.menu-image img').attr('loading', 'lazy');
        }
        
        // Debounce scroll events
        let scrollTimeout;
        $(window).on('scroll', function() {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(function() {
                    scrollTimeout = null;
                }, 16);
            }
        });
    }
    
    // ===== INITIALIZE ALL FUNCTIONS =====
    function init() {
        initCategoryTabs();
        initSubCategoryFiltering();
        initScrollAnimations();
        initMenuDetailModal();
        initSmoothScrolling();
        initMobileMenu();
        initBackToTop();
        initHeaderScrollEffect();
        initMenuCardEffects();
        initPriceCalculator();
        initFavoriteSystem();
        initSearch();
        initAccessibility();
        initPerformanceOptimizations();
        
        // Add loaded class for CSS animations
        setTimeout(function() {
            $('body').addClass('page-loaded');
            $('.menu-item').addClass('show');
        }, 100);
    }
    
    // Start initialization
    init();
    
    // ===== PUBLIC API =====
    window.MenuPage = {
        showCategory: function(category) {
            $('.menu-tab[data-category="' + category + '"]').trigger('click');
        },
        
        filterBySubcategory: function(subcategory) {
            $('.sub-tab[data-subcategory="' + subcategory + '"]').trigger('click');
        },
        
        searchMenus: function(term) {
            $('.search-input').val(term).trigger('input');
        },
        
        showMenuDetail: function(menuTitle) {
            $(`.menu-content h3:contains("${menuTitle}")`).siblings('.menu-detail-btn').trigger('click');
        },
        
        getFavorites: function() {
            return JSON.parse(localStorage.getItem('menuFavorites') || '[]');
        }
    };
});

// ===== ADDITIONAL CSS FOR DYNAMIC ELEMENTS =====
const dynamicStyles = `
    .price-calculator {
        margin-top: 20px;
        padding: 15px;
        background: var(--light-color);
        border-radius: 8px;
        font-size: 14px;
    }
    
    .price-calculator h5 {
        margin-bottom: 10px;
        font-weight: 500;
    }
    
    .option-item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        cursor: pointer;
    }
    
    .option-item input {
        margin-right: 8px;
    }
    
    .total-price {
        margin-top: 15px;
        padding-top: 10px;
        border-top: 1px solid #ddd;
        font-weight: 600;
        color: var(--primary-color);
    }
    
    .favorite-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(255,255,255,0.9);
        border: none;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        cursor: pointer;
        transition: var(--transition);
        color: #ccc;
    }
    
    .favorite-btn:hover,
    .favorite-btn.active {
        color: #e74c3c;
        background: white;
        transform: scale(1.1);
    }
    
    .menu-search {
        position: relative;
        margin-top: 20px;
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
    }
    
    .search-input {
        width: 100%;
        padding: 10px 40px 10px 15px;
        border: 1px solid #ddd;
        border-radius: 25px;
        font-size: 14px;
    }
    
    .search-clear {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        color: #999;
        font-size: 18px;
    }
    
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    }
    
    .notification.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .notification.error {
        background: #e74c3c;
    }
    
    @media (max-width: 39.9375em) {
        .favorite-btn {
            width: 30px;
            height: 30px;
            top: 10px;
            right: 10px;
        }
        
        .menu-search {
            margin-top: 15px;
        }
        
        .notification {
            right: 10px;
            left: 10px;
            top: 90px;
        }
    }
`;

// Inject dynamic styles
if (!document.getElementById('menu-dynamic-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'menu-dynamic-styles';
    styleElement.innerHTML = dynamicStyles;
    document.head.appendChild(styleElement);
}