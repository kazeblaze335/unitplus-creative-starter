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
        console.log("🎨 Works: Initializing Gallery");
        // 1. Manually update the namespace attribute so the Router/Toolbar sees it
        this.app.el.setAttribute('data-barba-namespace', 'home');

        // 2. Inject the HTML
        this.app.el.innerHTML = this.template();

         // 3. Update the Toolbar
        if (this.app.toolbar) {
            this.app.toolbar.update('works', this.projects.length);
        }
        this.setupTickerHovers();
    }

    template() {
        const items = [...this.projects, ...this.projects].map(p => `
            <div class="ticker-item" data-img="${p.img}">
                <span class="t-name">${p.name}</span>
                <span class="t-year">${p.year}</span>
            </div>
        `).join('');

        return `
            <div class="ticker-wrap">
                <div class="ticker-move">${items}</div>
            </div>
        `;
    }

    setupTickerHovers() {
        const reveal = document.getElementById('bg-reveal-container');
        const logo = document.querySelector('.logo'); // Target the logo
        const items = document.querySelectorAll('.ticker-item');

        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const img = item.getAttribute('data-img');
                reveal.style.backgroundImage = `url(${img})`;
                reveal.classList.add('active');
                logo.classList.add('is-hidden'); // Fade logo out
            });

            item.addEventListener('mouseleave', () => {
                reveal.classList.remove('active');
                logo.classList.remove('is-hidden'); // Fade logo in
            });
        });
    }
}