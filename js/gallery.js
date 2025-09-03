/**
 * Gallery Page JavaScript
 * Hair Salon Picasso
 */

(function($) {
    'use strict';

    // Instagram posts data structure (this would be replaced with actual API calls)
    const instagramPosts = [
        {
            id: 'ABC123',
            account: 'picasso_hair',
            url: 'https://instagram.com/p/ABC123',
            image: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            categories: ['hair', 'color'],
            size: 'large',
            likes: 45,
            comments: 8,
            tags: ['#ハイトーンカラー', '#ブリーチ', '#アッシュ'],
            date: '2025-01-20',
            timestamp: new Date('2025-01-20').getTime()
        },
        {
            id: 'DEF456',
            account: 'picasso_eyelash',
            url: 'https://instagram.com/p/DEF456',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            categories: ['eyelash'],
            size: 'medium',
            likes: 32,
            comments: 5,
            tags: ['#ボリュームラッシュ', '#まつ毛エクステ', '#目元美人'],
            date: '2025-01-19',
            timestamp: new Date('2025-01-19').getTime()
        },
        {
            id: 'GHI789',
            account: 'picasso_hair',
            url: 'https://instagram.com/p/GHI789',
            image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            categories: ['hair'],
            size: 'small',
            likes: 28,
            comments: 3,
            tags: ['#ボブスタイル', '#切りっぱなし', '#ナチュラル'],
            date: '2025-01-18',
            timestamp: new Date('2025-01-18').getTime()
        },
        {
            id: 'JKL012',
            account: 'picasso_hair',
            url: 'https://instagram.com/p/JKL012',
            image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            categories: ['hair', 'color'],
            size: 'large',
            likes: 67,
            comments: 12,
            tags: ['#グラデーション', '#オンブレ', '#インナーカラー'],
            date: '2025-01-17',
            timestamp: new Date('2025-01-17').getTime()
        },
        {
            id: 'MNO345',
            account: 'picasso_eyelash',
            url: 'https://instagram.com/p/MNO345',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            categories: ['eyelash'],
            size: 'medium',
            likes: 41,
            comments: 7,
            tags: ['#カラーエクステ', '#ブラウンラッシュ', '#ナチュラル'],
            date: '2025-01-16',
            timestamp: new Date('2025-01-16').getTime()
        },
        {
            id: 'PQR678',
            account: 'picasso_hair',
            url: 'https://instagram.com/p/PQR678',
            image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            categories: ['hair'],
            size: 'small',
            likes: 35,
            comments: 4,
            tags: ['#パーマ', '#ウェーブ', '#ふわふわ'],
            date: '2025-01-15',
            timestamp: new Date('2025-01-15').getTime()
        },
        {
            id: 'STU901',
            account: 'picasso_eyelash',
            url: 'https://instagram.com/p/STU901',
            image: 'https://images.unsplash.com/photo-1594736797933-d0d8e2c8d6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            categories: ['eyelash'],
            size: 'large',
            likes: 29,
            comments: 6,
            tags: ['#フラットラッシュ', '#軽やか', '#持続力'],
            date: '2025-01-14',
            timestamp: new Date('2025-01-14').getTime()
        },
        {
            id: 'VWX234',
            account: 'picasso_hair',
            url: 'https://instagram.com/p/VWX234',
            image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            categories: ['hair', 'color'],
            size: 'medium',
            likes: 52,
            comments: 9,
            tags: ['#ピンクカラー', '#個性派', '#かわいい'],
            date: '2025-01-13',
            timestamp: new Date('2025-01-13').getTime()
        },
        // Additional posts for load more functionality
        {
            id: 'YZA567',
            account: 'picasso_hair',
            url: 'https://instagram.com/p/YZA567',
            image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            categories: ['hair'],
            size: 'medium',
            likes: 38,
            comments: 6,
            tags: ['#ロングヘア', '#レイヤー', '#エレガント'],
            date: '2025-01-12',
            timestamp: new Date('2025-01-12').getTime()
        },
        {
            id: 'BCD890',
            account: 'picasso_eyelash',
            url: 'https://instagram.com/p/BCD890',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            categories: ['eyelash'],
            size: 'small',
            likes: 44,
            comments: 9,
            tags: ['#ナチュラルラッシュ', '#日常メイク', '#美まつ毛'],
            date: '2025-01-11',
            timestamp: new Date('2025-01-11').getTime()
        }
    ];

    // State management
    let currentFilter = 'all';
    let currentSort = 'newest';
    let currentView = 'masonry';
    let visiblePosts = [];
    let loadedCount = 8;
    const postsPerLoad = 4;

    // Initialize page
    $(document).ready(function() {
        initializeHeader();
        initializeFilters();
        initializeSort();
        initializeViewToggle();
        initializeGallery();
        initializeLoadMore();
        initializeScrollAnimations();
        initializePostInteractions();
        initializeHashtagInteractions();
        initializeBackToTop();
        
        // Load initial posts
        filterAndDisplayPosts();
        
        // Initialize Foundation
        $(document).foundation();
    });

    // ===== HEADER FUNCTIONALITY =====
    function initializeHeader() {
        // Mobile menu toggle
        $('#menuToggle').on('click', function() {
            $(this).toggleClass('active');
            $('#mobileMenu').toggleClass('active');
            $('body').toggleClass('menu-open');
        });

        // Close mobile menu when clicking on links
        $('#mobileMenu a').on('click', function() {
            $('#menuToggle').removeClass('active');
            $('#mobileMenu').removeClass('active');
            $('body').removeClass('menu-open');
        });

        // Header scroll effect
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 50) {
                $('.site-header').addClass('scrolled');
            } else {
                $('.site-header').removeClass('scrolled');
            }
        });

        // Close mobile menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.site-header, .mobile-menu').length) {
                $('#menuToggle').removeClass('active');
                $('#mobileMenu').removeClass('active');
                $('body').removeClass('menu-open');
            }
        });
    }

    // ===== FILTER FUNCTIONALITY =====
    function initializeFilters() {
        $('.filter-tab').on('click', function() {
            const filter = $(this).data('filter');
            
            // Update active state
            $('.filter-tab').removeClass('active');
            $(this).addClass('active');
            
            // Update current filter
            currentFilter = filter;
            
            // Reset loaded count when filtering
            loadedCount = 8;
            
            // Filter and display posts
            filterAndDisplayPosts();
            
            // Track filter usage
            trackEvent('gallery_filter', { filter: filter });
        });
    }

    function initializeSort() {
        $('#gallerySort').on('change', function() {
            currentSort = $(this).val();
            filterAndDisplayPosts();
            
            // Track sort usage
            trackEvent('gallery_sort', { sort: currentSort });
        });
    }

    function initializeViewToggle() {
        $('.view-btn').on('click', function() {
            const view = $(this).data('view');
            
            // Update active state
            $('.view-btn').removeClass('active');
            $(this).addClass('active');
            
            // Update current view
            currentView = view;
            
            // Update gallery view
            updateGalleryView();
            
            // Track view change
            trackEvent('gallery_view_change', { view: view });
        });
    }

    function updateGalleryView() {
        const $container = $('#galleryContainer');
        
        $container.removeClass('masonry-view grid-view').addClass(currentView + '-view');
        
        // Trigger layout recalculation
        setTimeout(() => {
            $(window).trigger('resize');
        }, 300);
    }

    // ===== GALLERY INITIALIZATION =====
    function initializeGallery() {
        // Initialize with masonry layout
        if (currentView === 'masonry') {
            initializeMasonryLayout();
        }
    }

    function initializeMasonryLayout() {
        // This handles the responsive masonry layout with flexbox
        const $container = $('#galleryContainer');
        
        // Set up responsive masonry grid
        function arrangeMasonryItems() {
            // The CSS handles the flexbox layout automatically
            const $items = $container.find('.gallery-item:visible');
            $items.each(function(index) {
                // Add staggered animation delay
                $(this).css('animation-delay', (index * 0.1) + 's');
            });
        }
        
        // Initial arrangement
        arrangeMasonryItems();
        
        // Re-arrange on window resize
        $(window).on('resize', arrangeMasonryItems);
    }

    // ===== POST FILTERING AND DISPLAY =====
    function filterAndDisplayPosts() {
        // Filter posts based on current filter
        visiblePosts = instagramPosts.filter(post => {
            if (currentFilter === 'all') return true;
            return post.categories.includes(currentFilter);
        });
        
        // Sort posts based on current sort
        sortPosts();
        
        // Display posts
        displayPosts();
        
        // Update gallery count
        updateGalleryCount();
        
        // Update load more button
        updateLoadMoreButton();
    }

    function sortPosts() {
        switch (currentSort) {
            case 'newest':
                visiblePosts.sort((a, b) => b.timestamp - a.timestamp);
                break;
            case 'oldest':
                visiblePosts.sort((a, b) => a.timestamp - b.timestamp);
                break;
            case 'popular':
                visiblePosts.sort((a, b) => b.likes - a.likes);
                break;
        }
    }

    function displayPosts() {
        const $container = $('#galleryContainer');
        
        // Clear existing content
        $container.empty();
        
        // Show items with animation
        const postsToShow = visiblePosts.slice(0, loadedCount);
        
        postsToShow.forEach((post, index) => {
            const $newItem = createPostElement(post);
            $container.append($newItem);
            
            // Trigger animation
            setTimeout(() => {
                $newItem.addClass('visible');
            }, index * 100);
        });
    }

    function createPostElement(post) {
        const $item = $(`
            <div class="gallery-item ${post.categories.join(' ')}" 
                 data-account="${post.account}" 
                 data-likes="${post.likes}" 
                 data-date="${post.date}"
                 data-id="${post.id}">
                <div class="gallery-post ${post.size}">
                    <a href="${post.url}" target="_blank" class="post-link">
                        <div class="post-image">
                            <img src="${post.image}" alt="${post.tags[0]}" loading="lazy">
                            <div class="post-overlay">
                                <div class="post-stats">
                                    <span class="likes-count">
                                        <i class="fas fa-heart"></i> ${post.likes}
                                    </span>
                                    <span class="comments-count">
                                        <i class="fas fa-comment"></i> ${post.comments}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="post-info">
                            <div class="post-account">
                                <i class="fab fa-instagram"></i>
                                @${post.account}
                            </div>
                            <div class="post-tags">
                                ${post.tags.join(' ')}
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        `);
        
        return $item;
    }

    function updateGalleryCount() {
        const visibleCount = Math.min(loadedCount, visiblePosts.length);
        $('#galleryCount').text(visibleCount);
    }

    // ===== LOAD MORE FUNCTIONALITY =====
    function initializeLoadMore() {
        $('#loadMoreBtn').on('click', function() {
            loadMorePosts();
        });
    }

    function loadMorePosts() {
        const $btn = $('#loadMoreBtn');
        
        // Add loading state
        $btn.addClass('loading').prop('disabled', true);
        $btn.find('i').removeClass('fa-plus').addClass('fa-spinner fa-spin');
        $btn.text('読み込み中...');
        
        // Simulate loading delay
        setTimeout(() => {
            const oldCount = loadedCount;
            loadedCount += postsPerLoad;
            
            // Add new items
            const postsToAdd = visiblePosts.slice(oldCount, loadedCount);
            const $container = $('#galleryContainer');
            
            postsToAdd.forEach((post, index) => {
                const $newItem = createPostElement(post);
                $container.append($newItem);
                
                // Trigger animation
                setTimeout(() => {
                    $newItem.addClass('visible');
                }, index * 100);
            });
            
            // Remove loading state
            $btn.removeClass('loading').prop('disabled', false);
            $btn.find('i').removeClass('fa-spinner fa-spin').addClass('fa-plus');
            $btn.html('<i class="fas fa-plus"></i> もっと見る');
            
            // Update gallery count and load more button
            updateGalleryCount();
            updateLoadMoreButton();
            
            // Track load more usage
            trackEvent('gallery_load_more', { loaded_count: loadedCount });
        }, 1000);
    }

    function updateLoadMoreButton() {
        const $btn = $('#loadMoreBtn');
        
        if (loadedCount >= visiblePosts.length) {
            $btn.hide();
        } else {
            $btn.show();
        }
    }

    // ===== POST INTERACTIONS =====
    function initializePostInteractions() {
        // Handle post clicks
        $(document).on('click', '.post-link', function(e) {
            const postId = $(this).closest('.gallery-item').data('id');
            const post = instagramPosts.find(p => p.id === postId);
            
            // Track click to Instagram
            trackEvent('instagram_post_click', {
                post_id: postId,
                account: post.account,
                url: post.url
            });
        });
        
        // Handle post hover effects
        $(document).on('mouseenter', '.gallery-post', function() {
            $(this).addClass('hovered');
        }).on('mouseleave', '.gallery-post', function() {
            $(this).removeClass('hovered');
        });
        
        // Handle keyboard navigation
        $(document).on('keydown', '.gallery-post', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).find('.post-link')[0].click();
            }
        });
    }

    // ===== HASHTAG INTERACTIONS =====
    function initializeHashtagInteractions() {
        $('.hashtag-link').on('click', function(e) {
            e.preventDefault();
            const hashtag = $(this).text();
            
            // Track hashtag click
            trackEvent('hashtag_click', { hashtag: hashtag });
            
            // You could implement hashtag filtering here
            // For now, just scroll to gallery
            $('html, body').animate({
                scrollTop: $('.gallery-section').offset().top - 100
            }, 800);
        });
    }

    // ===== SCROLL ANIMATIONS =====
    function initializeScrollAnimations() {
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
            
            // Observe gallery items and account cards
            $('.gallery-item, .instagram-account-card').each(function() {
                observer.observe(this);
            });
            
            // Observe new items as they're added
            const galleryObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1 && $(node).hasClass('gallery-item')) {
                            observer.observe(node);
                        }
                    });
                });
            });
            
            galleryObserver.observe(document.getElementById('galleryContainer'), {
                childList: true
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            $('.gallery-item, .instagram-account-card').addClass('animated');
        }
    }

    // ===== BACK TO TOP BUTTON =====
    function initializeBackToTop() {
        const $backToTop = $('#backToTop');
        
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 300) {
                $backToTop.addClass('active');
            } else {
                $backToTop.removeClass('active');
            }
        });
        
        $backToTop.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 800);
        });
    }

    // ===== SEARCH FUNCTIONALITY =====
    function initializeSearch() {
        // Add search input if needed
        const searchHtml = `
            <div class="gallery-search">
                <input type="text" id="gallerySearch" placeholder="ハッシュタグ・アカウントで検索...">
                <button class="search-btn" type="button">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        `;
        
        // Uncomment to add search functionality
        // $('.gallery-filter-section .grid-x').append(searchHtml);
        
        let searchTimeout;
        $(document).on('input', '#gallerySearch', function() {
            clearTimeout(searchTimeout);
            const searchTerm = $(this).val().toLowerCase();
            
            searchTimeout = setTimeout(() => {
                searchPosts(searchTerm);
            }, 300);
        });
    }

    function searchPosts(term) {
        if (!term) {
            filterAndDisplayPosts();
            return;
        }
        
        visiblePosts = instagramPosts.filter(post => {
            const matchesFilter = currentFilter === 'all' || post.categories.includes(currentFilter);
            const matchesSearch = post.tags.some(tag => tag.toLowerCase().includes(term)) ||
                                 post.account.toLowerCase().includes(term);
            
            return matchesFilter && matchesSearch;
        });
        
        sortPosts();
        displayPosts();
        updateGalleryCount();
        updateLoadMoreButton();
        
        // Track search
        trackEvent('gallery_search', { term: term, results: visiblePosts.length });
    }

    // ===== INFINITE SCROLL =====
    function initializeInfiniteScroll() {
        let isLoading = false;
        
        $(window).on('scroll', function() {
            if (isLoading) return;
            
            const scrollTop = $(this).scrollTop();
            const windowHeight = $(this).height();
            const documentHeight = $(document).height();
            
            // Load more when near bottom (200px from bottom)
            if (scrollTop + windowHeight > documentHeight - 200) {
                if (loadedCount < visiblePosts.length) {
                    isLoading = true;
                    loadMorePosts();
                    
                    // Reset loading flag after load complete
                    setTimeout(() => {
                        isLoading = false;
                    }, 1500);
                }
            }
        });
    }

    // ===== RESPONSIVE UTILITIES =====
    function initializeResponsiveUtilities() {
        let resizeTimeout;
        
        $(window).on('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                // Recalculate layouts
                if (currentView === 'masonry') {
                    initializeMasonryLayout();
                }
                
                // Update mobile menu state
                if ($(window).width() > 1024) {
                    $('#mobileMenu').removeClass('active');
                    $('#menuToggle').removeClass('active');
                    $('body').removeClass('menu-open');
                }
            }, 250);
        });
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    function initializePerformanceOptimizations() {
        // Image lazy loading (if browser doesn't support native lazy loading)
        if (!('loading' in HTMLImageElement.prototype)) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
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
        
        // Debounce scroll events
        let scrollTimeout;
        $(window).on('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleScroll, 16); // 60fps
        });
    }

    function handleScroll() {
        // Handle scroll-related functionality here
        // This is called at 60fps max to improve performance
    }

    // ===== ANALYTICS & TRACKING =====
    function trackEvent(eventName, params) {
        // Google Analytics 4 event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, params);
        }
        
        // Console log for development
        console.log('Event tracked:', eventName, params);
    }

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    function initializeAccessibility() {
        // Add ARIA labels
        $('.gallery-post').attr('role', 'link').attr('tabindex', '0');
        $('.filter-tab').attr('role', 'tab').attr('tabindex', '0');
        $('.hashtag-link').attr('role', 'link').attr('tabindex', '0');
        
        // Skip to content link
        if ($('#skip-to-content').length === 0) {
            $('body').prepend('<a href="#main-content" id="skip-to-content" class="sr-only sr-only-focusable">Skip to main content</a>');
        }
        
        $('#skip-to-content').on('click', function(e) {
            e.preventDefault();
            $('.gallery-section').focus();
        });
        
        // Announce filter changes to screen readers
        $(document).on('click', '.filter-tab', function() {
            const filterName = $(this).find('span').text() || $(this).text();
            announceToScreenReader(`フィルターが${filterName}に変更されました`);
        });
    }

    function announceToScreenReader(message) {
        const announcement = $('<div>', {
            'aria-live': 'polite',
            'aria-atomic': 'true',
            'class': 'sr-only'
        }).text(message);
        
        $('body').append(announcement);
        
        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }

    // ===== INITIALIZATION =====
    function initializeAll() {
        initializeSearch();
        initializeInfiniteScroll();
        initializeAccessibility();
        initializeResponsiveUtilities();
        initializePerformanceOptimizations();
        
        // Add loaded class for CSS animations
        setTimeout(function() {
            $('body').addClass('page-loaded');
        }, 100);
    }

    // Initialize all functions
    initializeAll();

    // ===== PUBLIC API =====
    window.GalleryPage = {
        filterPosts: function(filter) {
            $(`.filter-tab[data-filter="${filter}"]`).trigger('click');
        },
        
        sortPosts: function(sortType) {
            $('#gallerySort').val(sortType).trigger('change');
        },
        
        changeView: function(view) {
            $(`.view-btn[data-view="${view}"]`).trigger('click');
        },
        
        loadMorePosts: function() {
            $('#loadMoreBtn').trigger('click');
        },
        
        searchPosts: function(term) {
            $('#gallerySearch').val(term).trigger('input');
        },
        
        getVisiblePosts: function() {
            return visiblePosts.slice(0, loadedCount);
        },
        
        refreshGallery: function() {
            filterAndDisplayPosts();
        }
    };

})(jQuery);

// ===== ADDITIONAL CSS FOR DYNAMIC ELEMENTS =====
const galleryDynamicStyles = `
    <style>
    .gallery-search {
        position: relative;
        margin-top: 20px;
    }

    .gallery-search input {
        width: 100%;
        padding: 12px 50px 12px 15px;
        border: 2px solid #ddd;
        border-radius: 25px;
        font-size: 14px;
        transition: var(--transition);
    }

    .gallery-search input:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(169, 151, 109, 0.2);
    }

    .gallery-search .search-btn {
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
        transition: var(--transition);
    }

    .gallery-search .search-btn:hover {
        background: var(--secondary-color);
    }

    .load-more-btn.loading {
        pointer-events: none;
        opacity: 0.7;
    }

    .load-more-btn.loading i {
        animation: spin 1s linear infinite;
    }

    .gallery-post.hovered {
        transform: translateY(-3px);
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    .sr-only-focusable:active,
    .sr-only-focusable:focus {
        position: static;
        width: auto;
        height: auto;
        overflow: visible;
        clip: auto;
        white-space: normal;
    }

    #skip-to-content {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
        transition: top 0.3s;
    }

    #skip-to-content:focus {
        top: 6px;
    }

    @media (max-width: 768px) {
        .gallery-search {
            margin-top: 15px;
        }

        .gallery-search input {
            padding: 10px 45px 10px 12px;
        }

        .gallery-search .search-btn {
            width: 30px;
            height: 30px;
            font-size: 14px;
        }
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    </style>
`;

// Inject gallery styles
if (!document.getElementById('gallery-dynamic-styles')) {
    document.head.insertAdjacentHTML('beforeend', galleryDynamicStyles);
}