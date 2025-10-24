// --- 最終安定版 JavaScript コード (script.js) ---

// --- 1. グローバルなイベントリスナー (スクロール) ---
// (スクロール進捗バーのロジックは削除されます)
window.addEventListener('scroll', () => {
    // 1-1. スクロール進捗バー機能のロジックは削除
});


// --- 2. メイン機能の統合 (DOMContentLoaded: DOM構築完了後) ---
document.addEventListener('DOMContentLoaded', function() {
    
    // 変数定義
    const fixedCtaButton = document.querySelector('.fixed-cta-button');
    const body = document.body;
    
    // 固定CTAボタンの初期状態設定
    if (fixedCtaButton) {
        // 固定ボタンアニメーションの初期設定は維持
        fixedCtaButton.classList.add('animate-init');
    }

    // --- 2-1. Intersection Observer (フェードインアニメーション) ---
    const fadeInElements = document.querySelectorAll('.fade-in');
    const options = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // --- 2-2. メニューカルーセル機能 (ループ対応版) ---
    const track = document.querySelector('.carousel-track');
    if (track) { 
        const items = Array.from(track.children);
        const prevButton = document.querySelector('.carousel-nav.prev-btn');
        const nextButton = document.querySelector('.carousel-nav.next-btn');
        let currentSlide = 0;
        let itemsPerView = 3; 

        const updateItemsPerView = () => {
            if (window.innerWidth <= 600) {
                itemsPerView = 1;
            } else if (window.innerWidth <= 900) {
                itemsPerView = 2;
            } else {
                itemsPerView = 3;
            }
        };

        const updateCarousel = () => {
            updateItemsPerView(); 
            if (items.length === 0) return;
            const itemWidth = items[0] ? items[0].offsetWidth : 0;
            const moveDistance = currentSlide * itemWidth;
            track.style.transform = `translateX(-${moveDistance}px)`;
        };

        // イベントリスナーは維持 (省略)
        updateCarousel(); 
    }

    // --- 3. スプラッシュ画面の制御ロジックは削除されました ---
    // (代わりに固定CTAボタンのアニメーション開始をDOMContentLoadedに移動)
    if (fixedCtaButton) {
        // ロード完了時にアニメーションを開始させる (遅延なしで即座に)
        fixedCtaButton.classList.remove('animate-init');
        fixedCtaButton.classList.add('animated');
    }
});

// --- メニューカルーセル機能 (ループ対応版) ---
document.addEventListener('DOMContentLoaded', function() {
    
    // ... (既存の変数定義は維持) ...

    const track = document.querySelector('.carousel-track');
    if (track) { 
        const items = Array.from(track.children);
        const prevButton = document.querySelector('.carousel-nav.prev-btn');
        const nextButton = document.querySelector('.carousel-nav.next-btn');
        let currentSlide = 0;
        let itemsPerView = 3; 

        const updateItemsPerView = () => {
            if (window.innerWidth <= 600) {
                itemsPerView = 1;
            } else if (window.innerWidth <= 900) {
                itemsPerView = 2;
            } else {
                itemsPerView = 3;
            }
        };

        const updateCarousel = () => {
            updateItemsPerView(); 
            if (items.length === 0) return;
            const itemWidth = items[0] ? items[0].offsetWidth : 0;
            const moveDistance = currentSlide * itemWidth;
            track.style.transform = `translateX(-${moveDistance}px)`;
        };

        // 前へボタン (ループ対応)
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                const maxSlide = items.length - itemsPerView;
                if (currentSlide === 0) {
                    currentSlide = maxSlide; 
                } else {
                    currentSlide--;
                }
                updateCarousel();
            });
        }

        // 次へボタン (ループ対応)
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                const maxSlide = items.length - itemsPerView;
                if (currentSlide >= maxSlide) {
                    currentSlide = 0; 
                } else {
                    currentSlide++;
                }
                updateCarousel();
            });
        }

        window.addEventListener('resize', () => {
            currentSlide = 0; 
            updateCarousel();
        });

        updateCarousel(); 
    }
});