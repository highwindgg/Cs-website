document.addEventListener('DOMContentLoaded', function() {
    // -----------------------------------------------------
    // 1. 平滑滾動功能 (導覽列點擊)
    // -----------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // 排除 # 符號，確保點擊社群連結時不會被阻擋
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // -----------------------------------------------------
    // 2. 滾動視差 Parallax 效果 (增加景深)
    // -----------------------------------------------------
    const parallaxSections = document.querySelectorAll('.parallax-bg');
    if (parallaxSections.length > 0) { // 檢查是否存在視差區塊
        window.addEventListener('scroll', function() {
            let scrollPosition = window.pageYOffset;
            
            parallaxSections.forEach(section => {
                const speed = parseFloat(section.getAttribute('data-parallax-speed')) || 0.5; // 預設速度 0.5
                const offset = (scrollPosition - section.offsetTop) * speed;
                
                section.style.backgroundPositionY = `calc(50% + ${offset}px)`;
            });
        });
    }


    // -----------------------------------------------------
    // 3. 滾動時內容入場動畫 (Intersection Observer)
    // -----------------------------------------------------
    const contentFadeInElements = document.querySelectorAll('.content-fade-in');

    const observerOptions = {
        root: null, // 視窗為根元素
        rootMargin: '0px 0px -100px 0px', // 提前 100px 觸發動畫
        threshold: 0.1 // 元素有 10% 進入視窗時觸發
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // 一旦觸發就不再觀察
            }
        });
    }, observerOptions);

    contentFadeInElements.forEach(element => {
        observer.observe(element);
    });
});
