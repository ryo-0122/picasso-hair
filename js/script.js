/**
 * Picasso Beauty Salon
 * 修正版 JavaScript - メニュータブのスクロール問題を解決
 */

(function($) {
    'use strict';

    // ===== DOCUMENT READY =====
    $(document).ready(function() {
        
        // Initialize Foundation (タブ機能は除外)
        $(document).foundation();
        
        // ===== MOBILE MENU =====
        $('#menuToggle').on('click', function() {
            $(this).toggleClass('active');
            $('#mobileMenu').toggleClass('active');
            $('body').toggleClass('menu-open');
        });

        $('#mobileMenu a').on('click', function() {
            $('#menuToggle').removeClass('active');
            $('#mobileMenu').removeClass('active');
            $('body').removeClass('menu-open');
        });

        // ===== HEADER SCROLL EFFECT =====
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 50) {
                $('.site-header').addClass('scrolled');
            } else {
                $('.site-header').removeClass('scrolled');
            }
        });

        // ===== BACK TO TOP BUTTON =====
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 300) {
                $('#backToTop').addClass('active');
            } else {
                $('#backToTop').removeClass('active');
            }
        });

        $('#backToTop').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 800);
        });

        // ===== SMOOTH SCROLLING (メニュータブを除外) =====
        $('a[href^="#"]:not([href="#"])')
            .not('.tabs-title a') // タブのリンクを除外
            .not('#menu-tabs a') // メニュータブのリンクを除外
            .on('click', function(e) {
                // タブコンテナ内のリンクでないことを確認
                if ($(this).closest('.tabs').length === 0) {
                    e.preventDefault();
                    var target = $(this.hash);
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top - 80
                        }, 800);
                    }
                }
            });

        // ===== HERO SLIDER =====
        if ($('.hero-slider').length) {
            $('.hero-slider').slick({
                dots: false,
                arrows: false,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                autoplay: true,
                autoplaySpeed: 5000,
                pauseOnHover: false
            });
        }

        // ===== INSTAGRAM SLIDER =====
        if ($('#js-slider-8').length) {
            $('#js-slider-8').slick({
                arrows: false,
                dots: false,
                autoplay: true,
                autoplaySpeed: 0,
                speed: 8000,
                cssEase: 'linear',
                slidesToShow: 1,
                variableWidth: true,
                pauseOnFocus: false,
                pauseOnHover: false,
                pauseOnDotsHover: false,
                swipe: false,
                swipeToSlide: false,
                touchMove: false,
            });
        }

        if ($('#js-slider-7').length) {
            $('#js-slider-7').slick({
                arrows: false,
                dots: false,
                autoplay: true,
                autoplaySpeed: 0,
                speed: 8000,
                cssEase: 'linear',
                slidesToShow: 1,
                variableWidth: true,
                pauseOnFocus: false,
                pauseOnHover: false,
                pauseOnDotsHover: false,
                swipe: false,
                swipeToSlide: false,
                touchMove: false,
                rtl: true,
            });
        }

        // ===== MENU TABS (カスタム実装) =====
        // Foundationのタブ機能を無効化
        $('.tabs[data-tabs]').removeAttr('data-tabs');
        $('.tabs-content[data-tabs-content]').removeAttr('data-tabs-content');
        
        // カスタムタブ機能を実装
        $('.tabs-title a').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const $this = $(this);
            const $parent = $this.parent();
            const targetId = $this.attr('href');
            
            // 現在のタブコンテナ内でのみ動作
            const $tabContainer = $this.closest('.tabs');
            const $contentContainer = $tabContainer.siblings('.tabs-content');
            
            // アクティブクラスの切り替え
            $tabContainer.find('.tabs-title').removeClass('is-active');
            $parent.addClass('is-active');
            
            // パネルの切り替え
            $contentContainer.find('.tabs-panel').removeClass('is-active');
            $contentContainer.find(targetId).addClass('is-active');
            
            return false;
        });

        // ===== SALON TABS =====
        $('.salon-tab-item').on('click', function() {
            const targetSalon = $(this).data('salon');
            
            $('.salon-tab-item').removeClass('active');
            $(this).addClass('active');
            
            $('.salon-content').removeClass('active');
            $('#' + targetSalon).addClass('active');
        });

        // ===== SALON SUB IMAGES =====
        $('.salon-sub-image').on('click', function() {
            const newImageUrl = $(this).css('background-image');
            const mainImage = $(this).closest('.salon-images').find('.salon-main-image');
            
            mainImage.css('background-image', newImageUrl);
            mainImage.addClass('fade-in');
            setTimeout(function() {
                mainImage.removeClass('fade-in');
            }, 300);
        });

        // ===== STAFF CATEGORY FILTER =====
        let showAllStaff = false;

        function initializeStaffDisplay() {
            $('.staff-item').each(function(index) {
                if (index >= 4) {
                    $(this).hide();
                }
            });
            updateViewMoreButton();
        }

        function updateViewMoreButton() {
            const visibleItems = $('.staff-item:visible').length;
            const totalItems = $('.staff-item:not(.hidden)').length;
            
            if (totalItems > 4) {
                $('.staff-more-button').show();
                if (showAllStaff) {
                    $('.staff-more-button').text('VIEW LESS');
                } else {
                    $('.staff-more-button').text('VIEW MORE');
                }
            } else {
                $('.staff-more-button').hide();
            }
        }

        function controlStaffDisplay() {
            const visibleStaff = $('.staff-item:not(.hidden)');
            
            if (showAllStaff) {
                visibleStaff.show();
            } else {
                visibleStaff.each(function(index) {
                    if (index >= 4) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                });
            }
            updateViewMoreButton();
        }

        $('.staff-category-item').on('click', function() {
            const category = $(this).data('category');
            
            $('.staff-category-item').removeClass('active');
            $(this).addClass('active');
            
            showAllStaff = false;
            
            $('.staff-item').each(function() {
                const staffSalon = $(this).data('salon');
                
                if (category === 'all') {
                    $(this).removeClass('hidden');
                } else if (category === 'picasso-arte' && staffSalon === 'picasso-arte') {
                    $(this).removeClass('hidden');
                } else if (category === 'picasso-garden' && staffSalon === 'picasso-garden') {
                    $(this).removeClass('hidden');
                } else if (category === 'gran-mama-matsuhama' && staffSalon === 'gran-mama-matsuhama') {
                    $(this).removeClass('hidden');
                } else if (category === 'gran-mama-nakaune' && staffSalon === 'gran-mama-nakaune') {
                    $(this).removeClass('hidden');
                } else if (category === 'grace-kadota' && staffSalon === 'grace-kadota') {
                    $(this).removeClass('hidden');
                } else if (category === 'grace-fukutomi' && staffSalon === 'grace-fukutomi') {
                    $(this).removeClass('hidden');
                } else if (category === 'soa' && staffSalon === 'soa') {
                    $(this).removeClass('hidden');
                } else {
                    $(this).addClass('hidden');
                }
            });
            
            controlStaffDisplay();
            
            setTimeout(function() {
                $('.staff-item:visible').each(function(index) {
                    $(this).css('animation-delay', (index * 0.1) + 's')
                           .addClass('slide-up');
                });
            }, 300);
        });

        $('.staff-more-button').on('click', function(e) {
            e.preventDefault();
            showAllStaff = !showAllStaff;
            controlStaffDisplay();
            
            setTimeout(function() {
                $('.staff-item:visible').each(function(index) {
                    $(this).css('animation-delay', (index * 0.1) + 's')
                           .addClass('slide-up');
                });
            }, 300);
        });

        if ($('.staff-item').length > 0) {
            initializeStaffDisplay();
        }

        // ===== GALLERY FILTER =====
        $('.gallery-category-item').on('click', function() {
            var category = $(this).data('category');
            
            $('.gallery-category-item').removeClass('active');
            $(this).addClass('active');
            
            if (category === 'all') {
                $('.gallery-item').fadeIn();
            } else {
                $('.gallery-item').hide();
                $('.gallery-item[data-category="' + category + '"]').fadeIn();
            }
        });

        // ===== MAGNIFIC POPUP =====
        if ($.fn.magnificPopup) {
            $('.gallery-link').magnificPopup({
                type: 'image',
                gallery: { enabled: true }
            });
        }

        // ===== FORM VALIDATION =====
        $('.contact-form').on('submit', function(e) {
            e.preventDefault();
            
            var valid = true;
            $(this).find('input[required], textarea[required], select[required]').each(function() {
                if ($(this).val() === '') {
                    valid = false;
                    $(this).addClass('is-invalid-input');
                } else {
                    $(this).removeClass('is-invalid-input');
                }
            });
            
            if (!$('.privacy-policy input[type="checkbox"]').is(':checked')) {
                valid = false;
                $('.privacy-policy').addClass('is-invalid-label');
            } else {
                $('.privacy-policy').removeClass('is-invalid-label');
            }
            
            if (valid) {
                $(this).find('input, textarea, select').val('');
                $('.privacy-policy input[type="checkbox"]').prop('checked', false);
                alert('お問い合わせありがとうございます。担当者から返信いたします。');
            } else {
                alert('必須項目を入力してください。');
            }
        });

        // ===== SCROLL ANIMATIONS =====
        function checkScrollAnimation() {
            $('.fade-in, .slide-up').each(function() {
                var elementTop = $(this).offset().top;
                var elementHeight = $(this).height();
                var windowHeight = $(window).height();
                var scrollY = $(window).scrollTop();
                
                if (scrollY > (elementTop - windowHeight + elementHeight / 4)) {
                    $(this).addClass('visible');
                }
            });
        }

        $(window).on('scroll', checkScrollAnimation);
        checkScrollAnimation();

        // ===== ANIMATION CLASSES =====
        $('.concept-content, .menu-categories, .salon-tabs, .staff-categories, .gallery-categories, .recruit-content').addClass('fade-in');
        $('.concept-image, .menu-item, .staff-item, .gallery-item, .instagram-item, .recruit-item').addClass('slide-up');

    }); // End Document Ready

    // ===== WINDOW LOAD =====
    $(window).on('load', function() {
        if ($('.preloader').length) {
            $('.preloader').fadeOut(1000);
        }
    });

})(jQuery);