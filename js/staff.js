/**
 * Staff Page JavaScript
 * Hair Salon Picasso
 */

(function($) {
    'use strict';

    // ===== STAFF DATA (実際の店舗データに基づく) =====
    const staffData = {
        'miyake-yoshiharu': {
            name: '三宅 良治',
            position: '代表取締役',
            salon: 'hair picasso arte f.',
            salonId: 'picasso-arte',
            experience: '35年',
            speciality: ['経営', '技術指導', 'カウンセリング'],
            instagram: '@miyake_picasso',
            comment: '35年間、お客様の美しさを追求し続けています。スタッフの幸せとお客様の笑顔が私たちの原動力です。美容でお客様を幸せにすること、そしてスタッフの幸せを願うこと、この2つの想いを大切に、これからも地域に愛されるサロンを目指してまいります。',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            ],
            certifications: ['美容師免許', '管理美容師免許', '技術者指導員'],
            schedule: {
                monday: '10:00-19:00',
                tuesday: '10:00-19:00',
                wednesday: '10:00-19:00',
                thursday: '10:00-19:00',
                friday: '10:00-19:00',
                saturday: '9:00-18:00',
                sunday: '9:00-18:00'
            }
        },
        'yano-miwa': {
            name: '矢野 三和',
            position: 'スタイリスト',
            salon: 'hair picasso arte f.',
            salonId: 'picasso-arte',
            experience: '8年',
            speciality: ['カット', 'カラー', 'パーマ'],
            instagram: '@yano_miwa',
            comment: 'お客様一人ひとりの魅力を最大限に引き出すスタイルをご提案します。トレンドを取り入れながらも、お客様のライフスタイルに合わせたヘアスタイルを心がけています。',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            ],
            certifications: ['美容師免許', 'カラーリスト検定2級'],
            schedule: {
                monday: '休み',
                tuesday: '10:00-19:00',
                wednesday: '10:00-19:00',
                thursday: '10:00-19:00',
                friday: '10:00-19:00',
                saturday: '9:00-18:00',
                sunday: '9:00-18:00'
            }
        },
        'miyake-rie': {
            name: '三宅 里枝',
            position: '店長・スタイリスト',
            salon: 'hair relaxation PICASSO GARDEN',
            salonId: 'picasso-garden',
            experience: '12年',
            speciality: ['カット', 'カラー', 'ヘッドスパ'],
            instagram: '@miyake_rie',
            comment: 'リラックスできる空間で、お客様の美と癒しをサポートします。ヘッドスパでの癒しの時間も大切にしており、心身ともにリフレッシュしていただけるよう心がけています。',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            ],
            certifications: ['美容師免許', 'ヘッドスパ検定1級', '管理美容師免許'],
            schedule: {
                monday: '休み',
                tuesday: '9:00-18:00',
                wednesday: '9:00-18:00',
                thursday: '9:00-18:00',
                friday: '9:00-18:00',
                saturday: '9:00-18:00',
                sunday: '9:00-18:00'
            }
        },
        'tsuri-momoko': {
            name: '釣 桃子',
            position: 'チーフ・アイリスト',
            salon: 'grace produce by picasso 福富店',
            salonId: 'grace-fukutomi',
            experience: '7年',
            speciality: ['まつ毛エクステ', 'ボリュームラッシュ', 'アイブロウ'],
            instagram: '@tsuri_momoko',
            comment: '目元の美しさで印象を変えませんか？自然で美しい仕上がりをお約束します。お客様の目の形やライフスタイルに合わせて、最適なまつ毛エクステをご提案いたします。',
            image: 'https://images.unsplash.com/photo-1494790108755-2616c0763c1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            ],
            certifications: ['JEAアイリスト検定1級', 'ABEまつ毛エクステンション技能検定1級'],
            schedule: {
                monday: '休み',
                tuesday: '10:00-19:00',
                wednesday: '10:00-19:00',
                thursday: '10:00-19:00',
                friday: '10:00-19:00',
                saturday: '9:00-18:00',
                sunday: '9:00-18:00'
            }
        },
        'inoue-izumi': {
            name: '井上 泉',
            position: '店長・スタイリスト',
            salon: 'Gran mama 松浜店',
            salonId: 'gran-mama-matsuhama',
            experience: '15年',
            speciality: ['カット', 'パーマ', 'シニアスタイル'],
            instagram: '@inoue_izumi',
            comment: 'アットホームな雰囲気の中で、お客様に最適なスタイルをご提案いたします。年齢を重ねても美しく、お手入れしやすいスタイルを得意としています。',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            ],
            certifications: ['美容師免許', '管理美容師免許', 'パーマ技術認定'],
            schedule: {
                monday: '9:00-18:00',
                tuesday: '9:00-18:00',
                wednesday: '9:00-18:00',
                thursday: '9:00-18:00',
                friday: '9:00-18:00',
                saturday: '9:00-18:00',
                sunday: '休み'
            }
        },
        'kanai-mamiko': {
            name: '金井 真巳子',
            position: 'チーフ・アイリスト',
            salon: 'Soa.',
            salonId: 'soa',
            experience: '8年',
            speciality: ['まつ毛エクステ', 'ラッシュリフト', 'カラーエクステ'],
            instagram: '@kanai_mamiko',
            comment: 'トレンドを取り入れた最新技術で、理想のまつ毛スタイルを実現します。カラーエクステやラッシュリフトなど、多彩な技術でお客様の魅力を引き出します。',
            image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            ],
            certifications: ['JEAアイリスト検定1級', '美容師免許', 'ラッシュリフト認定'],
            schedule: {
                monday: '9:00-18:00',
                tuesday: '9:00-19:00',
                wednesday: '9:00-19:00',
                thursday: '9:00-19:00',
                friday: '9:00-19:00',
                saturday: '9:00-18:00',
                sunday: '休み'
            }
        },
        'sahashi-ayumi': {
            name: '佐橋 あゆみ',
            position: 'スタイリスト',
            salon: 'hair picasso arte f.',
            salonId: 'picasso-arte',
            experience: '6年',
            speciality: ['ハイトーンカラー', 'ボブスタイル', 'トリートメント'],
            instagram: '@sahashi_ayumi',
            comment: 'ハイトーンカラーで個性を表現しませんか？お客様の理想を形にします。ダメージを最小限に抑えながら、美しいカラーを表現する技術に自信があります。',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            ],
            certifications: ['美容師免許', 'ヘアカラリスト検定1級', 'トリートメント認定'],
            schedule: {
                monday: '休み',
                tuesday: '10:00-19:00',
                wednesday: '10:00-19:00',
                thursday: '10:00-19:00',
                friday: '10:00-19:00',
                saturday: '9:00-18:00',
                sunday: '9:00-18:00'
            }
        }
    };

    // State management
    let currentFilters = {
        salon: '',
        position: '',
        search: ''
    };

    // Initialize page
    $(document).ready(function() {
        initializeFilters();
        initializeSearch();
        initializeStaffCards();
        initializeModals();
        initializeScrollAnimations();
        initializeCategoryCards();
        initializeLoadMore();
        
        // Load initial staff count
        updateStaffCount();
        
        // Initialize Foundation
        $(document).foundation();
    });

    // ===== FILTER FUNCTIONALITY =====
    function initializeFilters() {
        $('#salonFilter, #positionFilter').on('change', function() {
            currentFilters.salon = $('#salonFilter').val();
            currentFilters.position = $('#positionFilter').val();
            
            filterStaff();
        });
    }

    function initializeSearch() {
        let searchTimeout;
        
        $('#staffSearch').on('input', function() {
            clearTimeout(searchTimeout);
            const searchTerm = $(this).val().toLowerCase();
            
            searchTimeout = setTimeout(() => {
                currentFilters.search = searchTerm;
                filterStaff();
            }, 300);
        });

        $('.search-btn').on('click', function() {
            currentFilters.search = $('#staffSearch').val().toLowerCase();
            filterStaff();
        });
    }

    function filterStaff() {
        const $staffCards = $('.staff-card');
        let visibleCount = 0;

        $staffCards.each(function() {
            const $card = $(this);
            const salon = $card.data('salon');
            const position = $card.data('position');
            const name = $card.data('name').toLowerCase();
            const speciality = $card.data('speciality').toLowerCase();

            let isVisible = true;

            // Salon filter
            if (currentFilters.salon && salon !== currentFilters.salon) {
                isVisible = false;
            }

            // Position filter
            if (currentFilters.position && position !== currentFilters.position) {
                isVisible = false;
            }

            // Search filter
            if (currentFilters.search) {
                const searchText = currentFilters.search;
                if (!name.includes(searchText) && !speciality.includes(searchText)) {
                    isVisible = false;
                }
            }

            // Apply visibility with animation
            if (isVisible) {
                $card.removeClass('hidden').addClass('visible');
                visibleCount++;
                
                // Highlight search terms
                if (currentFilters.search) {
                    highlightSearchTerms($card, currentFilters.search);
                } else {
                    removeHighlights($card);
                }
            } else {
                $card.removeClass('visible').addClass('hidden');
            }
        });

        updateStaffCount(visibleCount);
        updateLoadMoreButton();
    }

    function highlightSearchTerms($element, term) {
        if (!term) return;
        
        // Remove existing highlights
        $element.find('.search-highlight').contents().unwrap();
        
        const regex = new RegExp(`(${term})`, 'gi');
        $element.find('h3, .staff-message, .info-item span').each(function() {
            const $this = $(this);
            if ($this.children().length === 0) {
                const html = $this.html().replace(regex, '<span class="search-highlight">$1</span>');
                $this.html(html);
            }
        });
    }

    function removeHighlights($element) {
        $element.find('.search-highlight').contents().unwrap();
    }

    function updateStaffCount(count) {
        if (count === undefined) {
            count = $('.staff-card:not(.hidden)').length;
        }
        $('#staffCount').text(count);
    }

    // ===== STAFF CARD INTERACTIONS =====
    function initializeStaffCards() {
        $('.staff-card').each(function() {
            const $card = $(this);
            
            // Add hover effects
            $card.on('mouseenter', function() {
                $(this).addClass('hovered');
            }).on('mouseleave', function() {
                $(this).removeClass('hovered');
            });
            
            // Add click to expand functionality
            $card.on('click', function(e) {
                if (!$(e.target).closest('.staff-actions').length && 
                    !$(e.target).closest('.social-link').length) {
                    const staffId = $(this).find('.details-btn').data('staff');
                    showStaffDetail(staffId);
                }
            });
        });

        // Handle detail button clicks
        $('.details-btn').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const staffId = $(this).data('staff');
            showStaffDetail(staffId);
        });

        // Handle reserve button clicks
        $('.reserve-btn').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const staffId = $(this).data('staff');
            showReservationModal(staffId);
        });

        // Handle social media clicks
        $('.social-link').on('click', function(e) {
            e.stopPropagation();
            // Track social media clicks
            const platform = $(this).find('i').hasClass('fa-instagram') ? 'instagram' : 'other';
            trackEvent('social_click', { platform: platform });
        });
    }

    // ===== STAFF DETAIL MODAL =====
    function showStaffDetail(staffId) {
        const staff = staffData[staffId];
        if (!staff) return;

        const modalContent = generateStaffDetailModal(staff);
        
        $('#modalTitle').text(`${staff.name} - 詳細プロフィール`);
        $('#modalBody').html(modalContent);
        $('#staffModal').foundation('open');
        
        // Initialize modal interactions
        initializeModalInteractions(staff);
        
        // Track staff detail view
        trackEvent('staff_detail_view', { staff_id: staffId, staff_name: staff.name });
    }

    function generateStaffDetailModal(staff) {
        return `
            <div class="staff-detail-modal">
                <div class="staff-detail-header">
                    <div class="staff-detail-image">
                        <img src="${staff.image}" alt="${staff.name}">
                    </div>
                    <div class="staff-detail-info">
                        <h4>${staff.name}</h4>
                        <div class="staff-detail-position">${staff.position}</div>
                        <div class="staff-detail-salon">${staff.salon}</div>
                        <div class="staff-detail-experience">経験年数: ${staff.experience}</div>
                        <div class="staff-detail-social">
                            <a href="https://instagram.com/${staff.instagram.replace('@', '')}" target="_blank" class="social-detail-link">
                                <i class="fab fa-instagram"></i> ${staff.instagram}
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="staff-detail-sections">
                    <div class="detail-section">
                        <h5><i class="fas fa-comment"></i> メッセージ</h5>
                        <p class="staff-detail-comment">${staff.comment}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h5><i class="fas fa-star"></i> 得意分野</h5>
                        <div class="speciality-tags">
                            ${staff.speciality.map(spec => `<span class="speciality-tag">${spec}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h5><i class="fas fa-certificate"></i> 資格・認定</h5>
                        <ul class="certifications-list">
                            ${staff.certifications.map(cert => `<li>${cert}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="detail-section">
                        <h5><i class="fas fa-clock"></i> 勤務スケジュール</h5>
                        <div class="schedule-grid">
                            ${generateScheduleGrid(staff.schedule)}
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h5><i class="fas fa-images"></i> 施術例</h5>
                        <div class="staff-gallery">
                            ${staff.gallery.map((img, index) => `
                                <div class="gallery-item" data-index="${index}">
                                    <img src="${img}" alt="施術例 ${index + 1}">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="staff-detail-actions">
                    <a href="#reservation" class="button large reserve-detail-btn" data-staff="${staff.name}">
                        <i class="fas fa-calendar-alt"></i> ${staff.name}を指名予約
                    </a>
                    <a href="https://instagram.com/${staff.instagram.replace('@', '')}" target="_blank" class="button secondary large">
                        <i class="fab fa-instagram"></i> Instagramを見る
                    </a>
                </div>
            </div>
        `;
    }

    function generateScheduleGrid(schedule) {
        const days = {
            monday: '月',
            tuesday: '火',
            wednesday: '水',
            thursday: '木',
            friday: '金',
            saturday: '土',
            sunday: '日'
        };

        return Object.entries(days).map(([key, day]) => `
            <div class="schedule-item ${schedule[key] === '休み' ? 'rest-day' : ''}">
                <span class="day">${day}</span>
                <span class="time">${schedule[key]}</span>
            </div>
        `).join('');
    }

    function initializeModalInteractions(staff) {
        // Gallery interactions
        $('.gallery-item').on('click', function() {
            const index = $(this).data('index');
            showImageLightbox(staff.gallery, index);
        });

        // Reserve button
        $('.reserve-detail-btn').on('click', function(e) {
            e.preventDefault();
            const staffName = $(this).data('staff');
            showReservationModal(staffName);
        });
    }

    function showImageLightbox(images, startIndex) {
        // Create lightbox modal
        const lightboxHtml = `
            <div class="reveal full" id="imageLightbox" data-reveal>
                <div class="lightbox-container">
                    <div class="lightbox-image">
                        <img src="${images[startIndex]}" alt="施術例">
                    </div>
                    <div class="lightbox-controls">
                        <button class="lightbox-prev" ${startIndex === 0 ? 'disabled' : ''}>
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <span class="lightbox-counter">${startIndex + 1} / ${images.length}</span>
                        <button class="lightbox-next" ${startIndex === images.length - 1 ? 'disabled' : ''}>
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
                <button class="close-button" data-close aria-label="Close lightbox" type="button">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;

        // Remove existing lightbox
        $('#imageLightbox').remove();
        
        // Add new lightbox
        $('body').append(lightboxHtml);
        
        // Initialize Foundation
        $('#imageLightbox').foundation();
        
        // Open lightbox
        $('#imageLightbox').foundation('open');
        
        // Initialize lightbox controls
        initializeLightboxControls(images, startIndex);
    }

    function initializeLightboxControls(images, currentIndex) {
        let index = currentIndex;

        $('.lightbox-prev').on('click', function() {
            if (index > 0) {
                index--;
                updateLightboxImage(images, index);
            }
        });

        $('.lightbox-next').on('click', function() {
            if (index < images.length - 1) {
                index++;
                updateLightboxImage(images, index);
            }
        });

        // Keyboard navigation
        $(document).on('keydown.lightbox', function(e) {
            if (e.key === 'ArrowLeft' && index > 0) {
                index--;
                updateLightboxImage(images, index);
            } else if (e.key === 'ArrowRight' && index < images.length - 1) {
                index++;
                updateLightboxImage(images, index);
            } else if (e.key === 'Escape') {
                $('#imageLightbox').foundation('close');
            }
        });

        // Clean up keyboard events when lightbox closes
        $('#imageLightbox').on('closed.zf.reveal', function() {
            $(document).off('keydown.lightbox');
        });
    }

    function updateLightboxImage(images, index) {
        $('.lightbox-image img').attr('src', images[index]);
        $('.lightbox-counter').text(`${index + 1} / ${images.length}`);
        
        $('.lightbox-prev').prop('disabled', index === 0);
        $('.lightbox-next').prop('disabled', index === images.length - 1);
    }

    // ===== RESERVATION MODAL =====
    function showReservationModal(staffId) {
        const staff = staffData[staffId];
        const staffName = staff ? staff.name : staffId;

        const reservationHtml = `
            <div class="reservation-modal">
                <h4>${staffName} 指名予約</h4>
                <p>以下の方法で${staffName}の指名予約をお取りいただけます：</p>
                
                <div class="reservation-methods">
                    <div class="reservation-method">
                        <i class="fas fa-phone"></i>
                        <h5>お電話でのご予約</h5>
                        <p class="phone-number">
                            <a href="tel:086-264-3611">086-264-3611</a>
                        </p>
                        <p class="method-note">「${staffName}を指名したい」とお伝えください</p>
                    </div>
                    
                    <div class="reservation-method">
                        <i class="fas fa-calendar-alt"></i>
                        <h5>オンライン予約</h5>
                        <p>24時間いつでもご予約いただけます</p>
                        <a href="#" class="button">オンライン予約へ</a>
                    </div>
                </div>
                
                ${staff ? `
                <div class="staff-schedule-info">
                    <h6>${staffName}の勤務スケジュール</h6>
                    <div class="schedule-summary">
                        ${generateScheduleSummary(staff.schedule)}
                    </div>
                </div>
                ` : ''}
                
                <div class="reservation-notes">
                    <h6>ご注意事項</h6>
                    <ul>
                        <li>指名料として別途500円(税込)を頂戴いたします</li>
                        <li>キャンセルは前日までにご連絡ください</li>
                        <li>当日キャンセルの場合、料金の50%をキャンセル料として頂戴いたします</li>
                        <li>初回のお客様は、カウンセリング時間が通常より長くなる場合があります</li>
                    </ul>
                </div>
            </div>
        `;
        
        $('#modalTitle').text('指名予約');
        $('#modalBody').html(reservationHtml);
        $('#staffModal').foundation('open');
        
        // Track reservation attempt
        trackEvent('reservation_attempt', { staff_name: staffName });
    }

    function generateScheduleSummary(schedule) {
        const workDays = Object.entries(schedule)
            .filter(([day, time]) => time !== '休み')
            .map(([day, time]) => `${getDayName(day)}: ${time}`);
        
        return workDays.join('<br>');
    }

    function getDayName(day) {
        const dayNames = {
            monday: '月',
            tuesday: '火',
            wednesday: '水',
            thursday: '木',
            friday: '金',
            saturday: '土',
            sunday: '日'
        };
        return dayNames[day] || day;
    }

    // ===== SCROLL ANIMATIONS =====
    function initializeScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry, index) {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            $(entry.target).addClass('animated');
                        }, index * 100);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            $('.staff-card, .category-card').each(function() {
                observer.observe(this);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            $('.staff-card, .category-card').addClass('animated');
        }
    }

    // ===== CATEGORY CARDS =====
    function initializeCategoryCards() {
        $('.category-card').on('click', function() {
            const category = $(this).data('category');
            filterByCategory(category);
            
            // Scroll to staff grid
            $('html, body').animate({
                scrollTop: $('.staff-grid-section').offset().top - 100
            }, 800);
        });
    }

    function filterByCategory(category) {
        // Update position filter
        let filterValue = '';
        
        switch (category) {
            case 'stylist':
                filterValue = 'stylist';
                break;
            case 'eyelash':
                filterValue = 'eyelash-artist';
                break;
            case 'manager':
                filterValue = 'top-stylist';
                break;
            case 'assistant':
                filterValue = 'assistant';
                break;
        }
        
        $('#positionFilter').val(filterValue);
        currentFilters.position = filterValue;
        filterStaff();
    }

    // ===== LOAD MORE FUNCTIONALITY =====
    function initializeLoadMore() {
        let itemsToShow = 6;
        const itemsPerLoad = 3;
        
        updateLoadMoreButton();
        
        $('#loadMoreBtn').on('click', function() {
            itemsToShow += itemsPerLoad;
            showMoreItems(itemsToShow);
            updateLoadMoreButton();
        });
    }

    function showMoreItems(count) {
        $('.staff-card:not(.hidden)').each(function(index) {
            if (index < count) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    function updateLoadMoreButton() {
        const visibleItems = $('.staff-card:not(.hidden)').length;
        const shownItems = $('.staff-card:not(.hidden):visible').length;
        
        if (shownItems >= visibleItems) {
            $('#loadMoreBtn').hide();
        } else {
            $('#loadMoreBtn').show();
        }
    }

    // ===== MODALS =====
    function initializeModals() {
        // Modal initialization is handled by individual functions
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
        $('.staff-card').attr('role', 'button').attr('tabindex', '0');
        $('.category-card').attr('role', 'button').attr('tabindex', '0');
        
        // Keyboard navigation for staff cards
        $('.staff-card').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const staffId = $(this).find('.details-btn').data('staff');
                showStaffDetail(staffId);
            }
        });
        
        // Keyboard navigation for category cards
        $('.category-card').on('keydown', function(e) {
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
            $('.staff-grid-section').focus();
        });
    }

    // ===== RESPONSIVE UTILITIES =====
    function initializeResponsiveUtilities() {
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
                
                updateLoadMoreButton();
            }, 250);
        });
    }

    // ===== INITIALIZATION =====
    function initializeAll() {
        initializeAccessibility();
        initializeResponsiveUtilities();
        
        // Add loaded class for CSS animations
        setTimeout(function() {
            $('body').addClass('page-loaded');
        }, 100);
    }

    // Initialize all functions
    initializeAll();

    // ===== PUBLIC API =====
    window.StaffPage = {
        showStaffDetail: function(staffId) {
            showStaffDetail(staffId);
        },
        
        filterStaff: function(salon, position) {
            $('#salonFilter').val(salon || '');
            $('#positionFilter').val(position || '');
            currentFilters.salon = salon || '';
            currentFilters.position = position || '';
            filterStaff();
        },
        
        searchStaff: function(term) {
            $('#staffSearch').val(term);
            currentFilters.search = term.toLowerCase();
            filterStaff();
        },
        
        getStaffData: function(staffId) {
            return staffData[staffId];
        },
        
        scrollToStaff: function(staffId) {
            const staffElement = $(`.staff-card .details-btn[data-staff="${staffId}"]`).closest('.staff-card');
            if (staffElement.length) {
                $('html, body').animate({
                    scrollTop: staffElement.offset().top - 100
                }, 800);
            }
        }
    };

})(jQuery);

// ===== ADDITIONAL CSS FOR DYNAMIC ELEMENTS =====
const staffDynamicStyles = `
    <style>
    .staff-detail-modal .staff-detail-header {
        display: flex;
        gap: 30px;
        margin-bottom: 40px;
        align-items: center;
    }

    .staff-detail-image {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
    }

    .staff-detail-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .staff-detail-info h4 {
        font-size: 1.8rem;
        margin-bottom: 10px;
        color: var(--secondary-color);
        font-family: "orpheuspro", serif;
    }

    .staff-detail-position {
        font-size: 1.1rem;
        color: var(--primary-color);
        font-weight: 500;
        margin-bottom: 5px;
    }

    .staff-detail-salon {
        font-size: 1rem;
        color: var(--text-light);
        margin-bottom: 10px;
        font-style: italic;
    }

    .staff-detail-experience {
        font-size: 0.9rem;
        color: var(--text-light);
        margin-bottom: 15px;
    }

    .social-detail-link {
        color: var(--primary-color);
        text-decoration: none;
        font-size: 0.9rem;
        display: inline-flex;
        align-items: center;
        gap: 5px;
    }

    .staff-detail-sections {
        margin-bottom: 30px;
    }

    .detail-section {
        margin-bottom: 30px;
    }

    .detail-section h5 {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        font-size: 1.1rem;
        color: var(--secondary-color);
        font-family: "orpheuspro", serif;
    }

    .detail-section h5 i {
        color: var(--primary-color);
        width: 20px;
    }

    .staff-detail-comment {
        font-size: 1rem;
        line-height: 1.7;
        color: var(--text-color);
        font-style: italic;
        background: var(--light-color);
        padding: 20px;
        border-radius: 10px;
        position: relative;
    }

    .speciality-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .speciality-tag {
        background: var(--primary-color);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
    }

    .certifications-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .certifications-list li {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        position: relative;
        padding-left: 20px;
    }

    .certifications-list li:before {
        content: "🏆";
        position: absolute;
        left: 0;
        top: 10px;
    }

    .certifications-list li:last-child {
        border-bottom: none;
    }

    .schedule-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 10px;
    }

    .schedule-item {
        background: var(--light-color);
        padding: 15px;
        border-radius: 8px;
        text-align: center;
        transition: var(--transition);
    }

    .schedule-item.rest-day {
        background: #f8f8f8;
        color: var(--text-light);
    }

    .schedule-item .day {
        display: block;
        font-weight: 600;
        margin-bottom: 5px;
        color: var(--secondary-color);
    }

    .schedule-item .time {
        font-size: 0.9rem;
        color: var(--text-light);
    }

    .staff-gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
    }

    .staff-gallery .gallery-item {
        cursor: pointer;
        border-radius: 8px;
        overflow: hidden;
        transition: var(--transition);
    }

    .staff-gallery .gallery-item:hover {
        transform: scale(1.05);
    }

    .staff-gallery .gallery-item img {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }

    .staff-detail-actions {
        display: flex;
        gap: 15px;
        padding-top: 20px;
        border-top: 1px solid #eee;
    }

    .staff-detail-actions .button {
        flex: 1;
        padding: 12px 20px;
        font-size: 1rem;
    }

    .reservation-modal {
        text-align: center;
    }

    .reservation-methods {
        display: grid;
        gap: 30px;
        margin: 30px 0;
    }

    .reservation-method {
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 10px;
        text-align: center;
    }

    .reservation-method i {
        font-size: 2.5rem;
        color: var(--primary-color);
        margin-bottom: 15px;
    }

    .reservation-method h5 {
        margin-bottom: 15px;
        color: var(--secondary-color);
    }

    .phone-number {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .phone-number a {
        color: var(--primary-color);
        text-decoration: none;
    }

    .method-note {
        font-size: 0.9rem;
        color: var(--text-light);
        font-style: italic;
    }

    .staff-schedule-info {
        background: var(--light-color);
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
    }

    .staff-schedule-info h6 {
        margin-bottom: 10px;
        color: var(--secondary-color);
    }

    .schedule-summary {
        font-size: 0.9rem;
        line-height: 1.6;
        color: var(--text-color);
    }

    .reservation-notes {
        text-align: left;
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin-top: 30px;
    }

    .reservation-notes h6 {
        margin-bottom: 15px;
        color: var(--secondary-color);
    }

    .reservation-notes ul {
        margin: 0;
        padding-left: 20px;
    }

    .reservation-notes li {
        margin-bottom: 8px;
        font-size: 0.9rem;
        line-height: 1.5;
    }

    .lightbox-container {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        margin: auto;
    }

    .lightbox-image {
        text-align: center;
    }

    .lightbox-image img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
    }

    .lightbox-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background: rgba(0,0,0,0.8);
        color: white;
    }

    .lightbox-prev,
    .lightbox-next {
        background: rgba(255,255,255,0.1);
        border: none;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1.2rem;
        transition: var(--transition);
    }

    .lightbox-prev:hover:not(:disabled),
    .lightbox-next:hover:not(:disabled) {
        background: rgba(255,255,255,0.2);
    }

    .lightbox-prev:disabled,
    .lightbox-next:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .lightbox-counter {
        font-weight: 500;
    }

    @media (max-width: 768px) {
        .staff-detail-header {
            flex-direction: column;
            text-align: center;
        }

        .staff-detail-image {
            width: 120px;
            height: 120px;
        }

        .staff-detail-actions {
            flex-direction: column;
        }

        .reservation-methods {
            grid-template-columns: 1fr;
        }

        .schedule-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .staff-gallery {
            grid-template-columns: repeat(2, 1fr);
        }

        .lightbox-controls {
            padding: 15px;
        }

        .lightbox-prev,
        .lightbox-next {
            padding: 8px 12px;
            font-size: 1rem;
        }
    }
    </style>
`;

// Inject staff styles
if (!document.getElementById('staff-dynamic-styles')) {
    document.head.insertAdjacentHTML('beforeend', staffDynamicStyles);
}