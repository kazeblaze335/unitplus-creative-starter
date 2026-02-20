/**
 * HOME CONTROLLER
 * Location: /js/app/Controllers/HomeController.js
 * Feature: Fullscreen Background Image Reveal on Hover.
 */
import Controller from '/js/engine/Controller.js';

export default class HomeController extends Controller {
    constructor(app) {
        super(app);
        this.projects = [
            { name: "NIKE ACG", img: "/assets/img/nike.jpg" },
            { name: "NIKE ACG II", img: "/assets/img/nike2.jpg" },
            { name: "NIKE ACG III", img: "/assets/img/nike3.jpg" },
            { name: "NIKE ACG IV", img: "/assets/img/nike4.jpg" }
        ];
    }

    async init() {
        console.log("🏠 Home: Initializing Fullscreen Reveal");
        // 1. Manually update the namespace attribute so the Router/Toolbar sees it
        this.app.el.setAttribute('data-barba-namespace', 'home');

        // 2. Inject the Ticker Template
        this.app.el.innerHTML = this.template();

        // 3. Identify the Global Reveal Container
        this.revealContainer = document.getElementById('bg-reveal-container');
        this.setupHoverEvents();
        
        if (this.app.toolbar) this.app.toolbar.update('home');
    }

    template() {
        const items = this.projects.map(p => `
            <div class="ticker-item" data-img="${p.img}">
                <span class="ticker-text">${p.name}</span>
                <span class="ticker-symbol">★</span>
            </div>
        `).join('');

        return `
            <div class="home-ticker-wrapper">
                <div class="ticker-move">
                    ${items}${items}${items}${items}
                </div>
            </div>
        `;
    }

    setupHoverEvents() {
        const tickerItems = document.querySelectorAll('.ticker-item');

        tickerItems.forEach(item => {
            const imgSrc = item.getAttribute('data-img');

            item.addEventListener('mouseenter', () => {
                if (this.revealContainer) {
                    // Update image and show
                    this.revealContainer.innerHTML = `<img src="${imgSrc}" class="reveal-img">`;
                    this.revealContainer.classList.add('is-active');
                    
                    // Optional: Dim the other ticker items for focus
                    document.querySelector('.ticker-move').classList.add('is-focusing');
                }
            });

            item.addEventListener('mouseleave', () => {
                if (this.revealContainer) {
                    this.revealContainer.classList.remove('is-active');
                    document.querySelector('.ticker-move').classList.remove('is-focusing');
                }
            });
        });
    }

    destroy() {
        console.log("🏠 Home: Destroying Fullscreen Logic");
        if (this.revealContainer) {
            this.revealContainer.classList.remove('is-active');
            this.revealContainer.innerHTML = '';
        }
    }
}