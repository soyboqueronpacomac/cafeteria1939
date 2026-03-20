export function setupIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('js-scroll-fade-left')) {
                    entry.target.classList.remove('opacity-0');
                    entry.target.classList.add('animate-slide-in-left');
                }
                if (entry.target.classList.contains('js-scroll-fade-right')) {
                    entry.target.classList.remove('opacity-0');
                    entry.target.classList.add('animate-slide-in-right');
                }
                if (entry.target.classList.contains('js-scroll-fade-up')) {
                    entry.target.classList.remove('opacity-0');
                    entry.target.classList.add('animate-slide-in-up');
                }
            } else {
                // Remove classes to re-trigger animation when scrolling back
                entry.target.classList.remove('animate-slide-in-left', 'animate-slide-in-right', 'animate-slide-in-up');
                entry.target.classList.add('opacity-0');
            }
        });
    }, observerOptions);

    const leftElements = document.querySelectorAll('.js-scroll-fade-left');
    const rightElements = document.querySelectorAll('.js-scroll-fade-right');
    const upElements = document.querySelectorAll('.js-scroll-fade-up');

    leftElements.forEach(el => observer.observe(el));
    rightElements.forEach(el => observer.observe(el));
    upElements.forEach(el => observer.observe(el));
}