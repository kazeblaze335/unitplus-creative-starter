// Inside HomeController.js, AboutController.js, etc.
import Controller from '/js/engine/Controller.js';

export default class ProjectDetailController extends Controller {
    constructor(app) {
        super(app);
        // This acts as your "Local Database"
        this.projectDatabase = {
            'marc-jacobs': {
                title: "MARC JACOBS",
                year: "2025",
                role: "DIGITAL EXPERIENCE",
                description: "A complete overhaul of the digital runway experience, focusing on high-contrast brutalism and micro-interactions.",
                image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1600"
            },
            'artisan': {
                title: "L’ARTISAN PARFUMEUR",
                year: "2024",
                role: "VISUAL IDENTITY",
                description: "Capturing the essence of olfactory art through generative visuals and minimalist motion design.",
                image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1600"
            }
        };
    }

    async init() {
        // 1. Get the slug from the URL or Barba data
        // Example: /works/marc-jacobs -> slug is 'marc-jacobs'
        const pathParts = window.location.pathname.split('/');
        const slug = pathParts[pathParts.length - 1] || 'marc-jacobs';

        // 2. Find the data or fallback to Marc Jacobs
        const data = this.projectDatabase[slug] || this.projectDatabase['marc-jacobs'];

        // 3. Render
        this.app.el.innerHTML = this.template(data);

        // 4. Refresh Cursor
        if (window.Penryn && window.Penryn.cursor) {
            window.Penryn.cursor.refresh();
        }
    }

    template(data) {
        return `
            <article class="project-detail monospace">
                <header class="project-hero container">
                    <div class="project-meta">
                        <span class="label">PROJECT_ID / ${data.year}</span>
                        <h1 class="uppercase big-title">${data.title}</h1>
                        <p class="role italic">${data.role}</p>
                    </div>
                    <div class="project-main-image shadow">
                        <img src="${data.image}" alt="${data.title}">
                    </div>
                </header>

                <div class="project-content container">
                    <div class="project-grid">
                        <div class="project-info">
                            <span class="label">THE_BRIEF</span>
                            <p class="description">${data.description}</p>
                        </div>
                        <div class="project-actions">
                            <a href="/" class="magnetic-link back-link" data-barba>← BACK TO INDEX</a>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }
}