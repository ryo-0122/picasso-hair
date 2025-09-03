/**
 * Hair Salon Picasso - RECRUIT Page Complete JavaScript
 * 全機能統合版
 */

(function($) {
    'use strict';

    // State management
    let currentFilter = 'all';
    let visibleJobs = [];
    let isSubmitting = false;

    // Document Ready
    $(document).ready(function() {
        
        // Initialize all components
        initializeFilters();
        initializeApplicationForm();
        initializeFileUpload();
        initializeSmoothScrolling();
        initializeFormValidation();
        initializeScrollAnimations();
        initializeContactMethods();
        initializeMobileMenu();
        initializeBackToTop();
        initializeHeaderScrollEffect();
        initializeAccessibility();
        initializeKeyboardNavigation();
        initializePerformanceOptimizations();
        initializeImageLoading();
        
        // Load initial job positions
        filterAndDisplayJobs();
        
        // Initialize Foundation
        $(document).foundation();

        // Add page loaded class for animations
        setTimeout(() => {
            $('body').addClass('page-loaded');
        }, 100);
    });

    // ===== FILTER FUNCTIONALITY =====
    function initializeFilters() {
        $('.filter-tab').on('click', function() {
            const filter = $(this).data('filter');
            
            // Update active state with animation
            $('.filter-tab').removeClass('active');
            $(this).addClass('active');
            
            // Update current filter
            currentFilter = filter;
            
            // Filter and display job positions with staggered animation
            filterAndDisplayJobs();
            
            // Track filter usage
            trackEvent('recruit_filter', { filter: filter });
            
            // Announce to screen readers
            announceToScreenReader(`フィルターが${$(this).find('span').text() || $(this).text()}に変更されました`);
        });
    }

    function filterAndDisplayJobs() {
        const $items = $('.job-position-item');
        
        // Hide all items first
        $items.addClass('hidden').removeClass('visible');
        
        // Show matching items with staggered delay
        let visibleIndex = 0;
        $items.each(function() {
            const $item = $(this);
            const category = $item.data('category');
            
            if (currentFilter === 'all' || category === currentFilter) {
                setTimeout(() => {
                    $item.removeClass('hidden').addClass('visible');
                }, visibleIndex * 100);
                visibleIndex++;
            }
        });
        
        // Update visible jobs count
        visibleJobs = $items.filter('.visible').length;
        
        // Update filter results announcement
        setTimeout(() => {
            announceToScreenReader(`${visibleJobs}件の求人が表示されています`);
        }, 500);
    }

    // ===== APPLICATION FORM =====
    function initializeApplicationForm() {
        const form = $('#applicationForm');
        
        if (form.length) {
            // Real-time validation
            form.find('input, select, textarea').on('blur', function() {
                validateField($(this));
            });

            // Input event for immediate feedback
            form.find('input, textarea').on('input', function() {
                const $field = $(this);
                if ($field.hasClass('is-invalid-input')) {
                    setTimeout(() => validateField($field), 300);
                }
            });

            // Form submission
            form.on('submit', function(e) {
                e.preventDefault();
                
                if (isSubmitting) return;
                
                if (validateForm()) {
                    submitForm();
                } else {
                    showValidationErrors();
                }
            });
        }
    }

    // ===== FILE UPLOAD WITH ENHANCED FEATURES =====
    function initializeFileUpload() {
        const fileInput = $('#resume');
        const uploadText = $('.file-upload-text span');
        const uploadArea = $('.file-upload-area');

        if (fileInput.length) {
            // File selection handling
            fileInput.on('change', function() {
                handleFileSelection(this.files);
            });

            // Drag and drop functionality
            uploadArea.on('dragover', function(e) {
                e.preventDefault();
                $(this).addClass('drag-over');
            });

            uploadArea.on('dragleave', function(e) {
                e.preventDefault();
                $(this).removeClass('drag-over');
            });

            uploadArea.on('drop', function(e) {
                e.preventDefault();
                $(this).removeClass('drag-over');
                
                const files = e.originalEvent.dataTransfer.files;
                handleFileSelection(files);
            });
        }

        function handleFileSelection(files) {
            if (files.length === 0) {
                uploadText.text('ファイルを選択またはドラッグ&ドロップ');
                uploadArea.removeClass('file-selected');
                return;
            }

            const fileNames = Array.from(files).map(file => {
                // Validate file size (5MB limit)
                if (file.size > 5 * 1024 * 1024) {
                    showNotification(`${file.name} はファイルサイズが大きすぎます（5MB以下にしてください）`, 'error');
                    return null;
                }
                
                // Validate file type
                const allowedTypes = [
                    'application/pdf',
                    'image/jpeg',
                    'image/jpg', 
                    'image/png',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                ];
                
                if (!allowedTypes.includes(file.type)) {
                    showNotification(`${file.name} は対応していないファイル形式です`, 'error');
                    return null;
                }
                
                return file.name;
            }).filter(name => name !== null);

            if (fileNames.length > 0) {
                uploadText.text(`選択されたファイル: ${fileNames.join(', ')}`);
                uploadArea.addClass('file-selected');
                fileInput[0].files = createFileList(Array.from(files).filter((file, index) => fileNames[index] !== null));
            }
        }

        function createFileList(files) {
            const dt = new DataTransfer();
            files.forEach(file => dt.items.add(file));
            return dt.files;
        }
    }

    // ===== SMOOTH SCROLLING WITH ENHANCED EASING =====
    function initializeSmoothScrolling() {
        // Apply buttons and form links
        $(document).on('click', '.apply-btn, a[href^="#"]', function(e) {
            const href = $(this).attr('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const target = $(href);
                if (target.length) {
                    const offsetTop = target.offset().top - 100;
                    
                    $('html, body').animate({
                        scrollTop: offsetTop
                    }, {
                        duration: 1000,
                        easing: 'easeInOutCubic',
                        complete: function() {
                            // Focus target for accessibility
                            target.attr('tabindex', '-1').focus();
                            setTimeout(() => target.removeAttr('tabindex'), 1000);
                        }
                    });
                }
            }
        });

        // Add custom easing function
        $.easing.easeInOutCubic = function(x) {
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        };
    }

    // ===== ENHANCED FORM VALIDATION =====
    function validateField($field) {
        const value = $field.val().trim();
        const fieldName = $field.attr('name');
        const isRequired = $field.prop('required');
        let isValid = true;
        let errorMessage = '';

        // Remove previous error styling
        $field.removeClass('is-invalid-input');
        $field.siblings('.form-error').remove();

        // Check required fields
        if (isRequired && !value) {
            isValid = false;
            errorMessage = 'この項目は必須です。';
        }

        // Specific field validation
        if (value) {
            switch (fieldName) {
                case 'email':
                    if (!isValidEmail(value)) {
                        isValid = false;
                        errorMessage = '正しいメールアドレスを入力してください。';
                    }
                    break;
                
                case 'phone':
                    if (!isValidPhone(value)) {
                        isValid = false;
                        errorMessage = '正しい電話番号を入力してください（例：090-1234-5678）。';
                    }
                    break;
                
                case 'lastNameKana':
                case 'firstNameKana':
                    if (!isValidKana(value)) {
                        isValid = false;
                        errorMessage = 'カタカナで入力してください。';
                    }
                    break;
                
                case 'age':
                    const age = parseInt(value);
                    if (isNaN(age) || age < 18 || age > 65) {
                        isValid = false;
                        errorMessage = '18歳以上65歳以下で入力してください。';
                    }
                    break;
                
                case 'motivation':
                    if (value.length < 50) {
                        isValid = false;
                        errorMessage = '50文字以上で入力してください。';
                    }
                    break;
            }
        }

        // Show error if invalid
        if (!isValid) {
            $field.addClass('is-invalid-input');
            $field.after(`<span class="form-error is-visible" role="alert">${errorMessage}</span>`);
        }

        return isValid;
    }

    function validateForm() {
        let isValid = true;
        const form = $('#applicationForm');

        // Validate all fields
        form.find('input, select, textarea').each(function() {
            if (!validateField($(this))) {
                isValid = false;
            }
        });

        // Check privacy policy agreement
        const privacyCheckbox = $('.privacy-policy input[type="checkbox"]');
        if (!privacyCheckbox.is(':checked')) {
            isValid = false;
            privacyCheckbox.closest('.privacy-policy').addClass('is-invalid-label');
            announceToScreenReader('個人情報保護方針への同意が必要です。');
        } else {
            privacyCheckbox.closest('.privacy-policy').removeClass('is-invalid-label');
        }

        return isValid;
    }

    function showValidationErrors() {
        // Scroll to first error
        const firstError = $('.is-invalid-input, .is-invalid-label').first();
        if (firstError.length) {
            $('html, body').animate({
                scrollTop: firstError.offset().top - 120
            }, 500);
        }

        // Show error notification
        showNotification('入力内容に不備があります。赤字の項目を確認してください。', 'error');
    }

    function submitForm() {
        if (isSubmitting) return;
        
        const form = $('#applicationForm');
        const submitButton = form.find('button[type="submit"]');
        const originalText = submitButton.html();

        // Show loading state
        isSubmitting = true;
        submitButton.prop('disabled', true)
                   .html('<i class="fas fa-spinner fa-spin"></i> 送信中...');

        // Add loading class to form
        form.addClass('form-submitting');

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            form[0].reset();
            $('.file-upload-text span').text('ファイルを選択またはドラッグ&ドロップ');
            $('.file-upload-area').removeClass('file-selected');
            
            // Reset button
            isSubmitting = false;
            submitButton.prop('disabled', false).html(originalText);
            form.removeClass('form-submitting');
            
            // Show success notification
            showNotification('応募を受け付けました。ありがとうございます。ご入力いただいたメールアドレスに確認メールをお送りしました。', 'success');
            
            // Scroll to top smoothly
            $('html, body').animate({ scrollTop: 0 }, 1000);
            
            // Track successful submission
            trackEvent('form_submit', { form_type: 'recruitment_application' });
            
        }, 2000);
    }

    // ===== CONTACT METHODS =====
    function initializeContactMethods() {
        // Phone number click handling with confirmation
        $('.contact-number').on('click', function(e) {
            e.preventDefault();
            const phoneNumber = $(this).text().replace(/[^\d-]/g, '');
            
            if (confirm(`${phoneNumber} に電話をかけますか？`)) {
                window.location.href = `tel:${phoneNumber}`;
                trackEvent('contact_click', { method: 'phone', number: phoneNumber });
            }
        });

        // Email click handling
        $('.contact-email').on('click', function(e) {
            e.preventDefault();
            const email = $(this).text();
            const subject = encodeURIComponent('採用に関するお問い合わせ');
            const body = encodeURIComponent('お疲れ様です。\n\n採用に関してお問い合わせがあります。\n\n');
            
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
            trackEvent('contact_click', { method: 'email', email: email });
        });
    }

    // ===== ENHANCED SCROLL ANIMATIONS =====
    function initializeScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const $target = $(entry.target);
                        $target.addClass('animated');
                        
                        // Special animations for specific elements
                        if ($target.hasClass('timeline-item')) {
                            setTimeout(() => {
                                $target.find('.timeline-content').addClass('slide-in');
                            }, 200);
                        }
                        
                        // Unobserve to prevent re-triggering
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Observe elements for animation
            $('.feature-card, .job-position-card, .benefit-item, .timeline-item, .interview-item, .story-card, .training-feature-card').each(function() {
                observer.observe(this);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            $('.feature-card, .job-position-card, .benefit-item, .timeline-item, .interview-item, .story-card, .training-feature-card').addClass('animated');
        }
    }

    // ===== MOBILE MENU ENHANCEMENT =====
    function initializeMobileMenu() {
        const menuToggle = $('#menuToggle');
        const mobileMenu = $('#mobileMenu');
        
        menuToggle.on('click', function() {
            const isActive = $(this).hasClass('active');
            
            $(this).toggleClass('active');
            mobileMenu.toggleClass('active');
            $('body').toggleClass('menu-open');
            
            // Update ARIA attributes
            $(this).attr('aria-expanded', !isActive);
            mobileMenu.attr('aria-hidden', isActive);
            
            // Focus management
            if (!isActive) {
                mobileMenu.find('a').first().focus();
            }
        });
        
        // Close menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.header-nav, .mobile-menu, .menu-toggle').length) {
                closeMenu();
            }
        });
        
        // Close menu when clicking on menu links
        $('.mobile-menu a').on('click', function() {
            closeMenu();
        });

        // Escape key to close menu
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.hasClass('active')) {
                closeMenu();
                menuToggle.focus();
            }
        });

        function closeMenu() {
            menuToggle.removeClass('active').attr('aria-expanded', 'false');
            mobileMenu.removeClass('active').attr('aria-hidden', 'true');
            $('body').removeClass('menu-open');
        }
    }

    // ===== BACK TO TOP BUTTON =====
    function initializeBackToTop() {
        const backToTopBtn = $('#backToTop');
        
        $(window).on('scroll', throttle(function() {
            if ($(this).scrollTop() > 300) {
                backToTopBtn.addClass('active');
            } else {
                backToTopBtn.removeClass('active');
            }
        }, 100));
        
        backToTopBtn.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, {
                duration: 1000,
                easing: 'easeInOutCubic'
            });
            
            // Focus management
            setTimeout(() => {
                $('.page-title').focus();
            }, 1000);
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    function initializeHeaderScrollEffect() {
        const header = $('.site-header');
        let lastScrollTop = 0;
        
        $(window).on('scroll', throttle(function() {
            const scrollTop = $(this).scrollTop();
            
            if (scrollTop > 100) {
                header.addClass('scrolled');
                
                // Hide header on scroll down, show on scroll up
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    header.addClass('header-hidden');
                } else {
                    header.removeClass('header-hidden');
                }
            } else {
                header.removeClass('scrolled header-hidden');
            }
            
            lastScrollTop = scrollTop;
        }, 10));
    }

    // ===== IMAGE LOADING OPTIMIZATION =====
    function initializeImageLoading() {
        // Lazy loading for background images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const $target = $(entry.target);
                        $target.addClass('image-loaded');
                        imageObserver.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            $('.feature-image, .story-image, .benefit-image, .training-image, .position-hero-image').each(function() {
                imageObserver.observe(this);
            });
        }

        // Preload critical images
        const criticalImages = [
            'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // ===== UTILITY FUNCTIONS =====
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\d\-\(\)\+\s]+$/;
        const cleanPhone = phone.replace(/[^\d]/g, '');
        return phoneRegex.test(phone) && cleanPhone.length >= 10 && cleanPhone.length <= 11;
    }

    function isValidKana(kana) {
        const kanaRegex = /^[ァ-ヶー\s]+$/;
        return kanaRegex.test(kana);
    }

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        $('.notification').remove();

        // Create notification element
        const notification = $(`
            <div class="notification notification-${type}" role="alert" aria-live="polite">
                <div class="notification-content">
                    <i class="fas ${getNotificationIcon(type)}"></i>
                    <span>${message}</span>
                    <button class="notification-close" aria-label="通知を閉じる">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `);

        // Add to page
        $('body').append(notification);

        // Show notification with animation
        setTimeout(() => {
            notification.addClass('show');
        }, 100);

        // Auto hide after 5 seconds
        const autoHideTimeout = setTimeout(() => {
            hideNotification(notification);
        }, 5000);

        // Close button handler
        notification.find('.notification-close').on('click', () => {
            clearTimeout(autoHideTimeout);
            hideNotification(notification);
        });

        // Keyboard handling
        notification.on('keydown', function(e) {
            if (e.key === 'Escape') {
                clearTimeout(autoHideTimeout);
                hideNotification(notification);
            }
        });
    }

    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    function hideNotification(notification) {
        notification.removeClass('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }

    function trackEvent(eventName, params = {}) {
        // Google Analytics 4 event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, params);
        }
        
        // Console log for development
        console.log('Event tracked:', eventName, params);
    }

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    function initializeAccessibility() {
        // Add ARIA labels and roles
        $('.job-position-card').attr('role', 'article').attr('tabindex', '0');
        $('.filter-tab').attr('role', 'tab').attr('tabindex', '0');
        $('.apply-btn').attr('role', 'button');
        
        // Skip to content link
        if ($('#skip-to-content').length === 0) {
            $('body').prepend('<a href="#main-content" id="skip-to-content" class="sr-only sr-only-focusable">Skip to main content</a>');
        }
        
        $('#skip-to-content').on('click', function(e) {
            e.preventDefault();
            $('.recruit-features-section').attr('tabindex', '-1').focus();
        });
        
        // Form labels association
        $('label[for]').each(function() {
            const forId = $(this).attr('for');
            const $input = $(`#${forId}`);
            if ($input.length && !$input.attr('aria-labelledby')) {
                $input.attr('aria-labelledby', forId + '-label');
                $(this).attr('id', forId + '-label');
            }
        });

        // Required field indicators
        $('input[required], select[required], textarea[required]').each(function() {
            $(this).attr('aria-required', 'true');
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

    // ===== KEYBOARD NAVIGATION =====
    function initializeKeyboardNavigation() {
        // Filter tab keyboard navigation
        $('.filter-tab').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).click();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                const tabs = $('.filter-tab');
                const currentIndex = tabs.index(this);
                let nextIndex;
                
                if (e.key === 'ArrowLeft') {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                } else {
                    nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                }
                
                tabs.eq(nextIndex).focus();
            }
        });

        // Job card keyboard navigation
        $('.job-position-card').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).find('.apply-btn')[0].click();
            }
        });

        // Form navigation enhancements
        $(document).on('keydown', 'input, select, textarea', function(e) {
            if (e.key === 'Enter' && !$(this).is('textarea')) {
                e.preventDefault();
                const formElements = $(this).closest('form').find('input, select, textarea, button').filter(':visible');
                const currentIndex = formElements.index(this);
                const nextElement = formElements.eq(currentIndex + 1);
                
                if (nextElement.length) {
                    nextElement.focus();
                }
            }
        });
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    function initializePerformanceOptimizations() {
        // Add loading indicators
        $('.job-position-card, .feature-card, .story-card').each(function() {
            $(this).addClass('loading');
            setTimeout(() => {
                $(this).removeClass('loading');
            }, Math.random() * 500 + 200);
        });

        // Optimize scroll events with throttling
        function handleOptimizedScroll() {
            // Consolidated scroll handling
            updateScrollProgress();
            updateParallaxElements();
        }

        $(window).on('scroll', throttle(handleOptimizedScroll, 16)); // 60fps

        function updateScrollProgress() {
            const scrollTop = $(window).scrollTop();
            const documentHeight = $(document).height() - $(window).height();
            const scrollPercent = (scrollTop / documentHeight) * 100;
            
            // You can use this for a progress bar
            document.documentElement.style.setProperty('--scroll-progress', scrollPercent + '%');
        }

        function updateParallaxElements() {
            const scrollTop = $(window).scrollTop();
            
            // Subtle parallax effect for page header
            $('.page-header').css('transform', `translateY(${scrollTop * 0.5}px)`);
        }
    }

    // Throttle function for performance
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===== PUBLIC API =====
    window.RecruitPage = {
        filterJobs: function(filter) {
            $(`.filter-tab[data-filter="${filter}"]`).trigger('click');
        },
        
        scrollToForm: function() {
            const form = $('#application-form');
            if (form.length) {
                $('html, body').animate({
                    scrollTop: form.offset().top - 100
                }, 1000);
            }
        },
        
        validateForm: function() {
            return validateForm();
        },
        
        submitForm: function() {
            if (validateForm()) {
                submitForm();
                return true;
            }
            return false;
        },

        showNotification: function(message, type) {
            showNotification(message, type);
        },

        trackEvent: function(eventName, params) {
            trackEvent(eventName, params);
        }
    };

    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        trackEvent('javascript_error', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno
        });
    });

    // ===== PROGRESSIVE ENHANCEMENT =====
    // Enhance experience for users with JavaScript enabled
    $('html').addClass('js-enabled');
    
    // Remove no-js fallback styles
    $('.no-js-only').hide();

})(jQuery);

// ===== ADDITIONAL CSS FOR DYNAMIC ELEMENTS =====
const recruitDynamicStyles = `
<style>
.notification {
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 9999;
    max-width: 400px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification.show {
    opacity: 1;
    transform: translateX(0);
}

.notification-content {
    background-color: white;
    padding: 18px 22px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 12px;
    border-left: 4px solid var(--primary-color);
    backdrop-filter: blur(10px);
}

.notification-success .notification-content {
    border-left-color: #28a745;
}

.notification-error .notification-content {
    border-left-color: #dc3545;
}

.notification-warning .notification-content {
    border-left-color: #ffc107;
}

.notification-success i {
    color: #28a745;
}

.notification-error i {
    color: #dc3545;
}

.notification-warning i {
    color: #ffc107;
}

.notification i {
    font-size: 18px;
    flex-shrink: 0;
}

.notification span {
    flex-grow: 1;
    font-size: 14px;
    line-height: 1.5;
    color: var(--text-color);
}

.notification-close {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: var(--transition);
    flex-shrink: 0;
}

.notification-close:hover {
    background: #f0f0f0;
    color: #666;
}

.file-upload-area.file-selected .file-upload-text {
    border-color: var(--primary-color);
    background-color: rgba(169, 151, 109, 0.1);
}

.file-upload-area.drag-over .file-upload-text {
    border-color: var(--primary-color);
    background-color: rgba(169, 151, 109, 0.15);
    transform: scale(1.02);
}

.form-error {
    color: #dc3545;
    font-size: 12px;
    margin-top: 5px;
    display: block;
    animation: fadeInUp 0.3s ease;
}

.is-invalid-input {
    border-color: #dc3545 !important;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2) !important;
}

.is-invalid-label {
    color: #dc3545 !important;
}

.form-submitting {
    pointer-events: none;
    opacity: 0.7;
}

.form-submitting .form-section {
    position: relative;
}

.form-submitting .form-section::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    z-index: 10;
}

.header-hidden {
    transform: translateY(-100%);
}

.image-loaded {
    animation: imageReveal 0.6s ease-out;
}

@keyframes imageReveal {
    from {
        opacity: 0;
        transform: scale(1.1);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.loading {
    position: relative;
    overflow: hidden;
}

.loading::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% {
        left: -100%;
    }
    100% {
        left: 100%;
    }
}

.slide-in {
    animation: slideInRight 0.6s ease-out;
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
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
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 9999;
    transition: top 0.3s;
    font-weight: 600;
}

#skip-to-content:focus {
    top: 6px;
}

.js-enabled .no-js-only {
    display: none !important;
}

/* Scroll progress indicator */
html::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: var(--scroll-progress, 0%);
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    z-index: 9999;
    transition: width 0.1s ease;
}

/* Loading spinner for form submission */
.fa-spinner {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 768px) {
    .notification {
        right: 10px;
        left: 10px;
        max-width: none;
    }
    
    .notification-content {
        padding: 15px 18px;
    }
    
    .file-upload-text {
        padding: 25px 15px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .notification,
    .form-error,
    .loading::after,
    .slide-in,
    .image-loaded {
        animation: none !important;
        transition: none !important;
    }
}
</style>
`;

// Inject recruit styles if not already present
if (!document.getElementById('recruit-dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'recruit-dynamic-styles';
    style.innerHTML = recruitDynamicStyles;
    document.head.appendChild(style);
}