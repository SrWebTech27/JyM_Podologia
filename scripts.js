const header = document.getElementById('mainHeader');
const progressBar = document.getElementById('progressBar');

function updateScrollUI() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    progressBar.style.width = `${progress}%`;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

const menuBtn = document.getElementById('menuBtn');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
    mobileMenu.style.display = 'none';
    document.body.style.overflow = '';
}

menuBtn.addEventListener('click', () => {
    mobileMenu.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});
menuClose.addEventListener('click', closeMobileMenu);

document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item.active').forEach((openItem) => openItem.classList.remove('active'));
        if (!wasActive) item.classList.add('active');
    });
});

const filters = document.querySelectorAll('.cat-filter-btn');
const cards = document.querySelectorAll('.service-card');
const emptyState = document.getElementById('catalogEmpty');

filters.forEach((filter) => {
    filter.addEventListener('click', () => {
        const category = filter.dataset.filter;
        let visibleCards = 0;
        filters.forEach((button) => button.classList.toggle('active', button === filter));

        cards.forEach((card) => {
            const isVisible = category === 'all' || card.dataset.cat === category;
            card.classList.toggle('is-hidden', !isVisible);
            if (isVisible) visibleCards += 1;
        });
        emptyState.style.display = visibleCards ? 'none' : 'block';
    });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
