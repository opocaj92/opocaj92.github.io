(() => {
    const reader = document.querySelector('[data-comic-reader]');
    if (!reader) return;

    const slides = [...reader.querySelectorAll('.mySlides')];
    const thumbs = [...document.querySelectorAll('[data-slide]')];
    const dots = [...reader.querySelectorAll('.dot')];
    const prev = reader.querySelector('.prev');
    const next = reader.querySelector('.next');
    let slideIndex = 0;
    let touchStartX = null;

    function showSlide(index, { focusReader = false } = {}) {
        slideIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            const active = i === slideIndex;
            slide.hidden = !active;
            slide.setAttribute('aria-hidden', String(!active));
        });

        thumbs.forEach((thumb, i) => {
            const active = i === slideIndex;
            thumb.classList.toggle('active-thumb', active);
            thumb.setAttribute('aria-current', active ? 'true' : 'false');
        });

        dots.forEach((dot, i) => {
            const active = i === slideIndex;
            dot.classList.toggle('active', active);
            dot.setAttribute('aria-current', active ? 'true' : 'false');
        });

        if (focusReader && window.matchMedia('(max-width: 600px)').matches) {
            reader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    prev?.addEventListener('click', () => showSlide(slideIndex - 1));
    next?.addEventListener('click', () => showSlide(slideIndex + 1));

    thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => showSlide(i, { focusReader: true })));
    dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

    reader.querySelector('.slides-stage')?.addEventListener('click', (event) => {
        if (!event.target.closest('.prev, .next')) showSlide(slideIndex + 1);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') showSlide(slideIndex - 1);
        else if (event.key === 'ArrowRight') showSlide(slideIndex + 1);
        else if (event.key === 'Home') showSlide(0);
        else if (event.key === 'End') showSlide(slides.length - 1);
    });

    reader.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    reader.addEventListener('touchend', (event) => {
        if (touchStartX === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(delta) < 50) return;
        showSlide(slideIndex + (delta < 0 ? 1 : -1));
    }, { passive: true });

    showSlide(0);
})();
