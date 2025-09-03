/**
 * Contact.js - 最小修正版
 * アコーディオン修正とContact Form 7対応
 */

$(document).ready(function() {
    
    // Foundation初期化
    $(document).foundation();
    
    // Foundation アコーディオンを無効化（スクロール問題回避）
    $('.accordion').foundation('destroy');
    
    // カスタムアコーディオン
    $('.accordion-title').off('click').on('click', function(e) {
        e.preventDefault();
        
        const $item = $(this).closest('.accordion-item');
        const $content = $item.find('.accordion-content');
        const isActive = $item.hasClass('is-active');
        
        if (isActive) {
            // 閉じる
            $item.removeClass('is-active');
            $content.slideUp(300);
            $(this).attr('aria-expanded', 'false');
        } else {
            // 他を閉じる
            $('.accordion-item.is-active').removeClass('is-active')
                .find('.accordion-content').slideUp(300);
            $('.accordion-title').attr('aria-expanded', 'false');
            
            // 開く
            $item.addClass('is-active');
            $content.slideDown(300);
            $(this).attr('aria-expanded', 'true');
        }
        
        return false;
    });
    
    // キーボードアクセシビリティ
    $('.accordion-title').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });
    
    // スクロールアニメーション
    $(window).on('scroll', function() {
        $('.fade-in').each(function() {
            const element = $(this);
            const elementTop = element.offset().top;
            const windowHeight = $(window).height();
            const scrollTop = $(window).scrollTop();
            
            if (scrollTop > (elementTop - windowHeight + 100)) {
                element.addClass('visible');
            }
        });
    });
    
    // 初回スクロールチェック
    $(window).trigger('scroll');
    
    // スムーズスクロール（アコーディオン以外）
    $('a[href^="#"]:not(.accordion-title)').on('click', function(e) {
        const href = $(this).attr('href');
        const target = $(href);
        
        if (target.length && href !== '#') {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 800);
        }
    });
    
    // Contact Form 7 イベント（WordPress環境でのみ有効）
    if (typeof wpcf7 !== 'undefined') {
        document.addEventListener('wpcf7mailsent', function(event) {
            console.log('Contact form submitted successfully');
        }, false);
        
        document.addEventListener('wpcf7invalid', function(event) {
            setTimeout(function() {
                const firstError = $('.wpcf7-not-valid').first();
                if (firstError.length) {
                    $('html, body').animate({
                        scrollTop: firstError.offset().top - 150
                    }, 500);
                }
            }, 100);
        }, false);
    }
    
});