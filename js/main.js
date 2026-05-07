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

// Scroll-reveal: плавное появление элементов при попадании в viewport
(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Селекторы — что анимируем (плюс необязательный variant и stagger)
    const targets = [
        // Заголовки / лейблы секций
        { selector: '.section-label',  variant: '' },
        { selector: '.about-title',    variant: '' },
        { selector: '.about-desc',     variant: '' },
        { selector: '.about-photo',    variant: 'reveal--left' },
        { selector: '.about-features', variant: '' },
        { selector: '.contacts-text',  variant: 'reveal--left' },

        // Группы карточек со stagger (каждая следующая чуть позже)
        { selector: '.service-card',   variant: '', stagger: 100 },
        { selector: '.portfolio-card', variant: 'reveal--scale', stagger: 100 },
        { selector: '.why-card',       variant: '', stagger: 90  },
        { selector: '.contact-card',   variant: '', stagger: 90  },

        // Целые блоки
        { selector: '.tech-track-wrap', variant: 'reveal--scale' },
    ];

    // Назначаем классы и (опционально) задержку
    targets.forEach(({ selector, variant, stagger }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add('reveal');
            if (variant) el.classList.add(variant);
            if (stagger) el.style.transitionDelay = `${i * stagger}ms`;
        });
    });

    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                io.unobserve(e.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
    });

    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();

// Parallax-глоу пятна: разная скорость движения при скролле
const bgOrbs = document.querySelectorAll('.bg-orb');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (bgOrbs.length && !reduceMotion) {
    // Положительные значения — едут вниз медленнее скролла, отрицательные — против скролла
    const speeds = [0.18, -0.28, 0.40, -0.22, 0.32];
    let ticking = false;

    function updateOrbs() {
        const y = window.scrollY;
        bgOrbs.forEach((orb, i) => {
            const speed = speeds[i] ?? 0.2;
            orb.style.setProperty('--scroll-y', `${y * speed}px`);
            orb.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOrbs);
            ticking = true;
        }
    }, { passive: true });
    updateOrbs();
}

// Бесконечная лента технологий — дублируем карточки для бесшовного цикла
const techTrack = document.getElementById('techTrack');
if (techTrack) {
    Array.from(techTrack.children).forEach(item => {
        techTrack.appendChild(item.cloneNode(true));
    });
}

// Модалка услуг
const SERVICES_DATA = {
    websites: {
        title: 'Разработка сайтов',
        desc: 'Создаю современные сайты, которые выглядят дорого, быстро загружаются и приводят клиентов. От лендинга до интернет-магазина — под ключ.',
        price: 'От <b>30 000 ₽</b> · срок от 7 дней',
        icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
        list: [
            'Лендинги для услуг и продуктов',
            'Корпоративные многостраничные сайты',
            'Интернет-магазины с корзиной и оплатой',
            'Адаптивная вёрстка под все устройства',
            'SEO-оптимизация и быстрая загрузка',
            'Подключение CMS или кастомное решение',
        ],
    },
    webapps: {
        title: 'Веб-приложения',
        desc: 'Сложные сервисы с авторизацией, личными кабинетами и API. Делаю масштабируемые SPA на React/Next.js с надёжным бэкендом.',
        price: 'От <b>80 000 ₽</b> · срок от 3 недель',
        icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
        list: [
            'Личные кабинеты и админ-панели',
            'Авторизация: email, OAuth, 2FA',
            'REST / GraphQL API',
            'Real-time функции (WebSocket, чаты)',
            'Интеграции с базами и внешними сервисами',
            'Деплой, мониторинг и техподдержка',
        ],
    },
    bots: {
        title: 'Telegram-боты',
        desc: 'Боты для бизнеса, которые автоматизируют общение с клиентами, продажи и рутинные процессы. От простых уведомлений до полноценных мини-приложений.',
        price: 'От <b>15 000 ₽</b> · срок от 5 дней',
        icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',
        list: [
            'Боты-консультанты и FAQ',
            'Автоматизация продаж и приёма заказов',
            'Уведомления и массовые рассылки',
            'Интеграция с CRM, Google Sheets, 1C',
            'Подписки, оплата, реферальные программы',
            'Telegram Mini Apps (web-app внутри бота)',
        ],
    },
    automation: {
        title: 'Автоматизация процессов',
        desc: 'Беру на себя всё, что можно не делать руками: парсинг, отчётность, цепочки между сервисами. Освобождаю команде десятки часов в месяц.',
        price: 'От <b>10 000 ₽</b> · срок от 3 дней',
        icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
        list: [
            'Парсинг данных с сайтов',
            'Скрипты для рутинных задач',
            'Интеграции между сервисами через API',
            'Автоматическая отчётность и дашборды',
            'Обработка email, файлов, документов',
            'Цепочки в n8n, Zapier, Make',
        ],
    },
};

const serviceModal      = document.getElementById('serviceModal');
const serviceModalIcon  = document.getElementById('serviceModalIcon');
const serviceModalTitle = document.getElementById('serviceModalTitle');
const serviceModalDesc  = document.getElementById('serviceModalDesc');
const serviceModalList  = document.getElementById('serviceModalList');
const serviceModalPrice = document.getElementById('serviceModalPrice');

function openServiceModal(key) {
    const data = SERVICES_DATA[key];
    if (!data) return;
    serviceModalIcon.innerHTML  = data.icon;
    serviceModalTitle.textContent = data.title;
    serviceModalDesc.textContent  = data.desc;
    serviceModalPrice.innerHTML   = data.price;
    serviceModalList.innerHTML = data.list.map(item => `<li>${item}</li>`).join('');
    serviceModal.classList.add('is-open');
    serviceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    serviceModal.classList.remove('is-open');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (serviceModal) {
    document.querySelectorAll('.service-link[data-service]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openServiceModal(btn.dataset.service);
        });
    });
    serviceModal.addEventListener('click', (e) => {
        if (e.target.matches('[data-close]') || e.target.closest('[data-close]')) {
            closeServiceModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && serviceModal.classList.contains('is-open')) closeServiceModal();
    });
}

// Модалка технологий
const techModal     = document.getElementById('techModal');
const techModalIcon = document.getElementById('techModalIcon');
const techModalTitle= document.getElementById('techModalTitle');
const techModalDesc = document.getElementById('techModalDesc');

function openTechModal(item) {
    techModalIcon.src = item.dataset.icon || '';
    techModalIcon.alt = item.dataset.name || '';
    techModalTitle.textContent = item.dataset.name || '';
    techModalDesc.textContent  = item.dataset.desc || '';
    techModal.classList.add('is-open');
    techModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (techTrack) techTrack.style.animationPlayState = 'paused';
}

function closeTechModal() {
    techModal.classList.remove('is-open');
    techModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (techTrack) techTrack.style.animationPlayState = '';
}

if (techTrack && techModal) {
    techTrack.addEventListener('click', (e) => {
        const item = e.target.closest('.tech-item');
        if (item) openTechModal(item);
    });
    techModal.addEventListener('click', (e) => {
        if (e.target.matches('[data-close]') || e.target.closest('[data-close]')) {
            closeTechModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && techModal.classList.contains('is-open')) closeTechModal();
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
