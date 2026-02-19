/**
 * WORKS CONTROLLER
 * Location: /js/app/Controllers/WorksController.js
 * Manages the editorial project grid and parallax effects.
 */
import Controller from '/js/engine/Controller.js';

export default class WorksController extends Controller {
    constructor(app) {
        super(app);
        
        // Project Dataset
        this.projects = [
            { id: '01', name: "MARC JACOBS", img: "https://images.unsplash.com/photo-1539109132314-34a956ed99d6?auto=format&fit=crop&q=80&w=1200", slug: "marc-jacobs" },
            { id: '02', name: "NIKE ACG", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200", slug: "nike-acg" },
            { id: '03', name: "ARTISAN", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200", slug: "artisan-perfume" },
            { id: '04', name: "HELMUT", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200", slug: "helmut-archive" }
        ];
    }

    async init() {
        console.log("🎨 Works: Initializing Gallery");
        // 1. Manually update the namespace attribute so the Router/Toolbar sees it
        this.app.el.setAttribute('data-barba-namespace', 'works');

        // 2. Inject the HTML
        this.app.el.innerHTML = this.template();

         // 3. Update the Toolbar
        if (this.app.toolbar) {
            this.app.toolbar.update('works', this.projects.length);
        }

        // 3. Re-bind the Cursor VIEW triggers
        if (window.Penryn && window.Penryn.cursor) {
            window.Penryn.cursor.refresh();
        }

        // 4. Start the Parallax Engine
        this.initParallax();
    }

    template() {
        return `
            <section class="works-section">
                <div class="works-grid">
                    ${this.projects.map(project => `
                        <div class="works-item">
                            <a href="/project/${project.slug}" 
                               data-barba 
                               class="gallery-link">
                               
                                <div class="works-info">
                                    <span class="works-number">${project.id}</span>
                                    <h2 class="works-title">${project.name}</h2>
                                </div>

                                <div class="works-figure view-trigger">
                                    <img src="${project.img}" alt="${project.name}" class="parallax-img">
                                </div>

                            </a>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }

    initParallax() {
        const images = document.querySelectorAll('.parallax-img');
        
        const parallaxLoop = () => {
            images.forEach(img => {
                const rect = img.parentElement.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const distance = window.innerHeight + rect.height;
                    const percentage = (window.innerHeight - rect.top) / distance;
                    const move = (percentage - 0.5) * 80; // Parallax intensity
                    img.style.transform = `translate3d(0, ${move}px, 0) scale(1.1)`;
                }
            });
            this.parallaxTicker = requestAnimationFrame(parallaxLoop);
        };

        parallaxLoop();
    }

    destroy() {
        if (this.parallaxTicker) {
            cancelAnimationFrame(this.parallaxTicker);
        }
    }
}