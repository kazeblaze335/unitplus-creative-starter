import Controller from '../../engine/Controller.js';

export default class HomeController extends Controller {
    constructor(app) {
        super(app);
        // Direct Data Object (Replaces projects.json)
        this.data = {
            featured: {
                id: "05",
                title: "ABYSSAE",
                category: "COSMETICS / VISUAL IDENTITY",
                image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200"
            },
            projects: [
                { name: "MARC JACOBS", slug: "marc-jacobs" },
                { name: "L’ARTISAN PARFUMEUR", slug: "artisan" },
                { name: "MIU MIU", slug: "miu-miu" },
                { name: "HERMÈS", slug: "hermes" },
                { name: "LOUIS VUITTON", slug: "louis-vuitton" }
            ]
        };
    }

    async init() {
        // Render the shell via template string
        this.app.el.innerHTML = this.template();

        // Populate the project items
        this.renderProjectList();

        // Initialize hover logic
        this.setupHoverPreview();

        // Refresh cursor for new elements
        if (window.Penryn && window.Penryn.cursor) window.Penryn.cursor.refresh();
    }

    template() {
        return `
            <section class="home-hero">
                <div class="split-layout">
                    <div class="featured-gallery">
                        <div class="meta monospace">
                            <span class="label">FEATURED_PROJECT / ${this.data.featured.id}</span>
                            <h1 class="featured-title uppercase">${this.data.featured.title}</h1>
                            <p class="category italic">${this.data.featured.category}</p>
                        </div>
                        <div class="image-wrapper">
                            <img class="featured-image shadow" src="${this.data.featured.image}">
                        </div>
                    </div>
                    <div class="project-sidebar">
                        <div class="sidebar-header monospace"><span class="label">INDEX</span></div>
                        <ul id="project-list" class="monospace"></ul>
                    </div>
                </div>
            </section>
        `;
    }

    renderProjectList() {
        const list = document.getElementById('project-list');
        // Inside HomeController.js renderProjectList
        list.innerHTML = this.data.projects.map(proj => `
            <li class="project-item magnetic-link">
                <a href="/works/${proj.slug}" data-barba-namespace="project" data-barba>
                    ${proj.name}
                </a>
            </li>
            `).join('');
    }

    setupHoverPreview() {
        const items = document.querySelectorAll('.project-item');
        const img = document.querySelector('.featured-image');
        const title = document.querySelector('.featured-title');

        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const name = item.getAttribute('data-name');
                title.innerText = name;
                img.src = `https://picsum.photos/seed/${name.length}/1200/800`;
            });
        });
    }
}