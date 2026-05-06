// Header: появление фона при скролле
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Бургер-меню
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Закрыть мобильное меню при клике на пункт
mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Бесконечная лента технологий — дублируем карточки для бесшовного цикла
const techTrack = document.getElementById('techTrack');
if (techTrack) {
    Array.from(techTrack.children).forEach(item => {
        techTrack.appendChild(item.cloneNode(true));
    });
}

// Кнопка "Наверх" — показывать после 400px скролла
const backTop = document.querySelector('.back-top');
if (backTop) {
    backTop.style.opacity = '0';
    backTop.style.pointerEvents = 'none';
    backTop.style.transition = 'opacity 0.3s, transform 0.25s, background 0.25s';

    window.addEventListener('scroll', () => {
        const visible = window.scrollY > 400;
        backTop.style.opacity = visible ? '1' : '0';
        backTop.style.pointerEvents = visible ? 'auto' : 'none';
    }, { passive: true });
}
