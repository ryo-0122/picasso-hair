// /**
//  * Picasso Beauty Salon
//  * 統合版 JavaScript File
//  * top.js + script.js + 新機能統合
//  */

// (function($) {
//     'use strict';

//     // Initialize Foundation
//     $(document).foundation();

//     // Document Ready
//     $(document).ready(function() {
        
//         // ========== MOBILE MENU ==========
//         $('#menuToggle').on('click', function() {
//             $(this).toggleClass('active');
//             $('#mobileMenu').toggleClass('active');
//             $('body').toggleClass('menu-open');
//         });

//         // Close mobile menu when clicking on a link
//         $('#mobileMenu a').on('click', function() {
//             $('#menuToggle').removeClass('active');
//             $('#mobileMenu').removeClass('active');
//             $('body').removeClass('menu-open');
//         });

//         // ========== HEADER SCROLL EFFECT ==========
//         $(window).on('scroll', function() {
//             if ($(window).scrollTop() > 50) {
//                 $('.site-header').addClass('scrolled');
//             } else {
//                 $('.site-header').removeClass('scrolled');
//             }
//         });

//         // ========== BACK TO TOP BUTTON ==========
//         $(window).on('scroll', function() {
//             if ($(window).scrollTop() > 300) {
//                 $('#backToTop').addClass('active');
//             } else {
//                 $('#backToTop').removeClass('active');
//             }
//         });

//         $('#backToTop').on('click', function(e) {
//             e.preventDefault();
//             $('html, body').animate({
//                 scrollTop: 0
//             }, 800);
//         });

//         // ========== SMOOTH SCROLLING ==========
//         $('a[href^="#"]:not([href="#"])').on('click', function(e) {
//             e.preventDefault();
//             var target = $(this.hash);
//             if (target.length) {
//                 $('html, body').animate({
//                     scrollTop: target.offset().top - 80
//                 }, 800);
//             }
//         });

//         // ========== HERO SLIDER ==========
//         $('.hero-slider').slick({
//             dots: true,
//             arrows: false,
//             infinite: true,
//             speed: 500,
//             fade: true,
//             cssEase: 'linear',
//             autoplay: true,
//             autoplaySpeed: 5000,
//             pauseOnHover: false
//         });

//         // ========== INSTAGRAM SLIDER ==========
//         $('#js-slider-8').slick({
//             arrows: false,
//             dots: false,
//             autoplay: true,
//             autoplaySpeed: 0,
//             speed: 8000,
//             cssEase: 'linear',
//             slidesToShow: 1,
//             variableWidth: true,
//             pauseOnFocus: false,
//             pauseOnHover: false,
//             pauseOnDotsHover: false,
//             swipe: false,
//             swipeToSlide: false,
//             touchMove: false,
//         });
//          // ========== INSTAGRAM SLIDER ==========
//         $('#js-slider-7').slick({
//             arrows: false,
//             dots: false,
//             autoplay: true,
//             autoplaySpeed: 0,
//             speed: 8000,
//             cssEase: 'linear',
//             slidesToShow: 1,
//             variableWidth: true,
//             pauseOnFocus: false,
//             pauseOnHover: false,
//             pauseOnDotsHover: false,
//             swipe: false,
//             swipeToSlide: false,
//             touchMove: false,
//         });

//         // ========== NEWS SLIDER ==========
//         $('.news-slider').slick({
//             dots: true,
//             arrows: false,
//             infinite: true,
//             speed: 500,
//             slidesToShow: 3,
//             slidesToScroll: 1,
//             autoplay: true,
//             autoplaySpeed: 4000,
//             responsive: [
//                 {
//                     breakpoint: 1024,
//                     settings: {
//                         slidesToShow: 2
//                     }
//                 },
//                 {
//                     breakpoint: 640,
//                     settings: {
//                         slidesToShow: 1
//                     }
//                 }
//             ]
//         });

//         // ========== MENU TABS (Foundation Tabs) ==========
//         // Foundation tabs タブ切り替え機能
//         const tabTitles = document.querySelectorAll('.tabs-title');
//         const tabPanels = document.querySelectorAll('.tabs-panel');

//         tabTitles.forEach(title => {
//             title.addEventListener('click', function(e) {
//                 e.preventDefault();
                
//                 // アクティブなタブを更新
//                 tabTitles.forEach(t => t.classList.remove('is-active'));
//                 this.classList.add('is-active');

//                 // 対応するパネルを表示
//                 const targetId = this.querySelector('a').getAttribute('href');
//                 tabPanels.forEach(panel => {
//                     if (panel.id === targetId.substring(1)) {
//                         panel.classList.add('is-active');
//                     } else {
//                         panel.classList.remove('is-active');
//                     }
//                 });
//             });
//         });

//         // ========== SALON TABS ==========
//         $('.salon-tab-item').on('click', function() {
//             const targetSalon = $(this).data('salon');
            
//             // アクティブタブの切り替え
//             $('.salon-tab-item').removeClass('active');
//             $(this).addClass('active');
            
//             // サロンコンテンツの切り替え
//             $('.salon-content').removeClass('active');
//             $('#' + targetSalon).addClass('active');
//         });

//         // ========== SALON SUB IMAGES CLICK ==========
//         $('.salon-sub-image').on('click', function() {
//             const newImageUrl = $(this).css('background-image');
//             const mainImage = $(this).closest('.salon-images').find('.salon-main-image');
            
//             // メイン画像を更新
//             mainImage.css('background-image', newImageUrl);
            
//             // アニメーション効果
//             mainImage.addClass('fade-in');
//             setTimeout(function() {
//                 mainImage.removeClass('fade-in');
//             }, 300);
//         });

//         // ========== STAFF CATEGORY FILTER ==========
// $('.staff-category-item').on('click', function() {
//     const category = $(this).data('category');
    
//     // アクティブクラスの切り替え
//     $('.staff-category-item').removeClass('active');
//     $(this).addClass('active');
    
//     // スタッフアイテムの表示/非表示
//     $('.staff-item').each(function() {
//         const staffSalon = $(this).data('salon');
        
//         if (category === 'all') {
//             $(this).removeClass('hidden').fadeIn();
//         } else if (category === 'picasso-arte' && staffSalon === 'picasso-arte') {
//             $(this).removeClass('hidden').fadeIn();
//         } else if (category === 'picasso-garden' && staffSalon === 'picasso-garden') {
//             $(this).removeClass('hidden').fadeIn();
//         } else if (category === 'gran-mama-matsuhama' && staffSalon === 'gran-mama-matsuhama') {
//             $(this).removeClass('hidden').fadeIn();
//         } else if (category === 'gran-mama-nakaune' && staffSalon === 'gran-mama-nakaune') {
//             $(this).removeClass('hidden').fadeIn();
//         } else if (category === 'grace-kadota' && staffSalon === 'grace-kadota') {
//             $(this).removeClass('hidden').fadeIn();
//         } else if (category === 'grace-fukutomi' && staffSalon === 'grace-fukutomi') {
//             $(this).removeClass('hidden').fadeIn();
//         } else if (category === 'soa' && staffSalon === 'soa') {
//             $(this).removeClass('hidden').fadeIn();
//         } else {
//             $(this).addClass('hidden').fadeOut();
//         }
//     });
    
//     // アニメーション効果
//     setTimeout(function() {
//         $('.staff-item:not(.hidden)').each(function(index) {
//             $(this).css('animation-delay', (index * 0.1) + 's')
//                    .addClass('slide-up');
//         });
//     }, 300);
// });

//         // ========== GALLERY CATEGORY FILTER ==========
//         $('.gallery-category-item').on('click', function() {
//             var category = $(this).data('category');
            
//             $('.gallery-category-item').removeClass('active');
//             $(this).addClass('active');
            
//             if (category === 'all') {
//                 $('.gallery-item').fadeIn();
//             } else {
//                 $('.gallery-item').hide();
//                 $('.gallery-item[data-category="' + category + '"]').fadeIn();
//             }
//         });

//         // ========== MAGNIFIC POPUP FOR GALLERY ==========
//         if ($.fn.magnificPopup) {
//             $('.gallery-link').magnificPopup({
//                 type: 'image',
//                 gallery: {
//                     enabled: true
//                 }
//             });
//         }

//         // ========== STAFF DETAIL LINK ==========
//         $('.staff-detail-link').on('click', function(e) {
//             e.preventDefault();
//             const staffName = $(this).closest('.staff-info').find('.staff-name').text();
//             const staffSalon = $(this).closest('.staff-info').find('.staff-salon').text();
            
//             // モーダルまたは詳細ページへの遷移処理
//             console.log('スタッフ詳細: ' + staffName + ' (' + staffSalon + ')');
            
//             // 実装例（詳細ページへのリンク）:
//             // window.location.href = 'staff-detail.html?name=' + encodeURIComponent(staffName);
//         });

//         // ========== RESERVATION BUTTONS ==========
//         $('.salon-buttons .button, .menu-item .button').on('click', function(e) {
//             if ($(this).text().includes('予約')) {
//                 e.preventDefault();
//                 const contextElement = $(this).closest('.salon-info, .menu-item');
//                 let serviceName = '';
                
//                 if (contextElement.hasClass('salon-info')) {
//                     serviceName = contextElement.find('h3').text();
//                 } else {
//                     serviceName = contextElement.find('h3').text();
//                 }
                
//                 // 予約フォームまたは外部予約サイトへの遷移
//                 console.log('予約: ' + serviceName);
                
//                 // 実装例:
//                 // window.open('https://reservation-site.com?service=' + encodeURIComponent(serviceName), '_blank');
//             }
//         });

//         // ========== FORM VALIDATION ==========
//         $('.contact-form').on('submit', function(e) {
//             e.preventDefault();
            
//             // Simple validation
//             var valid = true;
//             $(this).find('input[required], textarea[required], select[required]').each(function() {
//                 if ($(this).val() === '') {
//                     valid = false;
//                     $(this).addClass('is-invalid-input');
//                 } else {
//                     $(this).removeClass('is-invalid-input');
//                 }
//             });
            
//             if (!$('.privacy-policy input[type="checkbox"]').is(':checked')) {
//                 valid = false;
//                 $('.privacy-policy').addClass('is-invalid-label');
//             } else {
//                 $('.privacy-policy').removeClass('is-invalid-label');
//             }
            
//             if (valid) {
//                 $(this).find('input, textarea, select').val('');
//                 $('.privacy-policy input[type="checkbox"]').prop('checked', false);
                
//                 alert('お問い合わせありがとうございます。担当者から返信いたします。');
//             } else {
//                 alert('必須項目を入力してください。');
//             }
//         });

//         // ========== ANIMATION ON SCROLL ==========
//         function checkScrollAnimation() {
//             $('.fade-in').each(function() {
//                 var elementTop = $(this).offset().top;
//                 var elementHeight = $(this).height();
//                 var windowHeight = $(window).height();
//                 var scrollY = $(window).scrollTop();
                
//                 if (scrollY > (elementTop - windowHeight + elementHeight / 4)) {
//                     $(this).addClass('visible');
//                 }
//             });
            
//             $('.slide-up').each(function() {
//                 var elementTop = $(this).offset().top;
//                 var elementHeight = $(this).height();
//                 var windowHeight = $(window).height();
//                 var scrollY = $(window).scrollTop();
                
//                 if (scrollY > (elementTop - windowHeight + elementHeight / 4)) {
//                     $(this).addClass('visible');
//                 }
//             });

//             // スタッフ・サロンコンテンツのアニメーション
//             $('.staff-item, .salon-content').each(function() {
//                 const elementTop = $(this).offset().top;
//                 const elementBottom = elementTop + $(this).outerHeight();
//                 const viewportTop = $(window).scrollTop();
//                 const viewportBottom = viewportTop + $(window).height();
                
//                 if (elementBottom > viewportTop && elementTop < viewportBottom) {
//                     $(this).addClass('slide-up');
//                 }
//             });
//         }

//         // スクロールイベント
//         $(window).on('scroll', function() {
//             checkScrollAnimation();
//         });

//         // ========== ADD ANIMATION CLASSES ==========
//         $('.concept-content, .menu-categories, .salon-tabs, .staff-categories, .gallery-categories, .recruit-content, .reservation-methods, .contact-form').addClass('fade-in');
//         $('.concept-image, .menu-item, .staff-item, .gallery-item, .instagram-item, .recruit-item, .shop-item').addClass('slide-up');

//         // ========== RESPONSIVE TAB SCROLL ==========
//         function handleTabScroll() {
//             const tabList = $('.salon-tab-list');
//             if (tabList.length) {
//                 const scrollWidth = tabList[0].scrollWidth;
//                 const clientWidth = tabList[0].clientWidth;
                
//                 if (scrollWidth > clientWidth) {
//                     tabList.addClass('scrollable');
//                 } else {
//                     tabList.removeClass('scrollable');
//                 }
//             }
//         }

//         // ウィンドウリサイズ時の処理
//         $(window).on('resize', function() {
//             handleTabScroll();
//         });

//         // 初期読み込み時の処理
//         handleTabScroll();
//         checkScrollAnimation();

//         // ========== INSTAGRAM FEED PLACEHOLDER ==========
//         function loadInstagramFeed() {
//             console.log('Instagram feed would be loaded here.');
//         }
        
//         loadInstagramFeed();
        
//         // ========== DATEPICKER & TIMEPICKER INITIALIZATION ==========
//         if ($.fn.datepicker) {
//             $('.datepicker').datepicker({
//                 format: 'yyyy/mm/dd',
//                 language: 'ja',
//                 autoclose: true
//             });
//         }
        
//         if ($.fn.timepicker) {
//             $('.timepicker').timepicker({
//                 timeFormat: 'H:i',
//                 step: 30,
//                 minTime: '9:00',
//                 maxTime: '19:00'
//             });
//         }

//         // ========== SALON ACCESS TABS (if needed) ==========
//         $('.salon-tab-item[data-salon$="-access"]').on('click', function() {
//             var target = $(this).data('salon');
            
//             $('.salon-tab-item[data-salon$="-access"]').removeClass('active');
//             $(this).addClass('active');
            
//             $('.salon-access-content').removeClass('active');
//             $('#' + target).addClass('active');
//         });

//     }); // End Document Ready

//     // ========== WINDOW LOAD ==========
//     $(window).on('load', function() {
//         // Hide preloader if exists
//         if ($('.preloader').length) {
//             $('.preloader').fadeOut(1000);
//         }
//     });

// })(jQuery);

// // ========== DYNAMIC DATA LOADING FUNCTIONS ==========

// /**
//  * スタッフ情報の動的ロード（オプション）
//  * 実際の実装では、APIからデータを取得
//  */
// function loadStaffData() {
//     // 実装例
//     const staffData = [
//         {
//             name: '三宅 良治',
//             position: '代表取締役',
//             salon: 'picasso-arte',
//             salonName: 'Picasso Arte',
//             image: 'img/staff/miyake-yoshiharu.jpg'
//         },
//         // ... 他のスタッフデータ
//     ];

//     const staffTemplate = function(staff) {
//         return `
//             <div class="cell small-6 medium-4 large-3 staff-item" data-salon="${staff.salon}">
//                 <div class="staff-image" style="background-image: url('${staff.image}');"></div>
//                 <div class="staff-info">
//                     <h3 class="staff-name">${staff.name}</h3>
//                     <p class="staff-position">${staff.position}</p>
//                     <p class="staff-salon">${staff.salonName}</p>
//                     <a href="#" class="staff-detail-link">詳しく見る</a>
//                 </div>
//             </div>
//         `;
//     };

//     // DOM に追加
//     // $('.staff-list').html(staffData.map(staffTemplate).join(''));
// }

// /**
//  * サロン情報の動的ロード（オプション）
//  * 実際の実装では、APIからデータを取得
//  */
// function loadSalonData() {
//     const salonData = [
//         {
//             id: 'picasso-arte',
//             name: 'hair picasso arte f.',
//             description: '35年の歴史を持つ老舗サロン。確かな技術とハイトーンカラーが得意のサロンです。',
//             address: '〒702-8031 岡山県岡山市南区福富西3-7-35',
//             hours: '平日 10:00～19:00 / 土日祝 9:00～18:00',
//             closedDays: '毎週月曜日・第三日曜日',
//             parking: '9台（グラース福富店と共用）',
//             mainImage: 'img/salon/picasso-arte-main.jpg',
//             subImages: ['img/salon/picasso-arte-1.jpg', 'img/salon/picasso-arte-2.jpg', 'img/salon/picasso-arte-3.jpg'],
//             mapUrl: 'https://maps.google.com?q=岡山県岡山市南区福富西3-7-35'
//         },
//         // ... 他のサロンデータ
//     ];

//     // 動的生成処理
// }

// /**
//  * 予約システム連携（オプション）
//  */
// function initReservationSystem() {
//     // 外部予約システムとの連携処理
//     console.log('予約システム初期化');
// }

// /**
//  * Instagram API連携（オプション）
//  */
// function initInstagramAPI() {
//     // Instagram Basic Display API を使用した投稿取得
//     console.log('Instagram API初期化');
// }