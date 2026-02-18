import Controller from '/js/engine/Controller.js';

export default class HomeController extends Controller {
    constructor(app) {
        super(app);
        this.projects = [
            { id: '01', name: "MARC JACOBS", year: "2025", img: "/assets/img/marc.jpg" },
            { id: '02', name: "L’ARTISAN PARFUMEUR", year: "2024", img: "/assets/img/artisan.jpg" },
            { id: '03', name: "NIKE ACG", year: "2024", img: "/assets/img/nike.jpg" }
        ];
    }

    async init() {
        this.app.el.innerHTML = this.template();
        this.setupTickerHovers();
    }

    template() {
        // Double the list for seamless looping
        const items = [...this.projects, ...this.projects].map(p => `
            <div class="ticker-item" data-img="${p.img}">
                <span class="t-id">${p.id}</span>
                <span class="t-name">${p.name}</span>
                <span class="t-year">${p.year}</span>
            </div>
        `).join('');

        return `
            <div class="ticker-wrap">
                <div class="ticker-move">
                    ${items}
                </div>
            </div>
        `;
    }

    setupTickerHovers() {
        const reveal = document.getElementById('bg-reveal-container');
        const items = document.querySelectorAll('.ticker-item');

        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const img = item.getAttribute('data-img');
                reveal.style.backgroundImage = `url(${img})`;
                reveal.classList.add('active');
            });
            item.addEventListener('mouseleave', () => {
                reveal.classList.remove('active');
            });
        });
    }
}