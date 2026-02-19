import Controller from '/js/engine/Controller.js';

export default class WorksController extends Controller {
    constructor(app) {
        super(app);
        this.projects = [
            { id: '01', name: "MARC JACOBS", img: "/assets/img/marc.jpg", slug: "marc-jacobs" },
            { id: '02', name: "L’ARTISAN PARFUMEUR", img: "/assets/img/artisan.jpg", slug: "artisan" },
            { id: '03', name: "NIKE ACG", img: "/assets/img/nike.jpg", slug: "nike-acg" }
        ];
    }

    async init() {
        this.app.el.innerHTML = this.template();
        this.items = document.querySelectorAll('.gallery-figure');
        this.bindParallax();
        
        // Tell the cursor to look for the new .view-trigger elements
        if (window.Penryn && window.Penryn.cursor) {
            window.Penryn.cursor.refresh();
        }
    }

    template() {
        return `
            <section class="works-gallery">
                ${this.projects.map(p => `
                    <div class="gallery-item">
                        <a href="/project/${p.slug}" data-barba data-barba-namespace="project" class="gallery-link">
                            <div class="gallery-info">
                                <span class="g-number">${p.id}</span>
                                <h2 class="g-title">${p.name}</h2>
                            </div>
                            <div class="gallery-figure view-trigger">
                                <img src="${p.img}" class="parallax-img" alt="${p.name}">
                            </div>
                        </a>
                    </div>
                `).join('')}
            </section>
        `;
    }

    bindParallax() {
        const animate = () => {
            this.items.forEach(figure => {
                const rect = figure.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Only calculate if the item is visible in the viewport
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const img = figure.querySelector('.parallax-img');
                    
                    // Calculate scroll percentage relative to the element (0 to 1)
                    const distance = rect.top + rect.height / 2;
                    const percentage = (distance / windowHeight) - 0.5;
                    
                    // Apply a subtle Y-translation (adjust 15% for intensity)
                    const move = percentage * 15; 
                    img.style.transform = `scale(1.2) translateY(${move}%)`;
                }
            });
            this.parallaxId = requestAnimationFrame(animate);
        };
        animate();
    }

    /**
     * Clean up the animation loop when Barba leaves this page
     */
    destroy() {
        cancelAnimationFrame(this.parallaxId);
    }
}