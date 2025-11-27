document.addEventListener('DOMContentLoaded', function() {
    // 平滑滾動功能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 滾動時內容淡入動畫
    const sections = document.querySelectorAll('.content-fade-in');

    const observerOptions = {
        root: null, // 視窗為根元素
        rootMargin: '0px',
        threshold: 0.2 // 當元素有 20% 進入視窗時觸發
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // 一旦觸發就不再觀察
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
