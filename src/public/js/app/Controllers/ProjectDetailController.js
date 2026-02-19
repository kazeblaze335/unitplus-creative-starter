import Controller from '/js/engine/Controller.js';

export default class ProjectDetailController extends Controller {
    async init() {
        // In a real app, you'd fetch data based on the URL slug
        const path = window.location.pathname;
        const slug = path.split('/').pop().replace(/-/g, ' ').toUpperCase();

        this.app.el.innerHTML = `
            <section class="project-detail text-view">
                <span class="g-number">CASE STUDY</span>
                <h1 class="large-title">${slug}</h1>
                <p>Detailed editorial photography and technical specifications coming soon.</p>
                <a href="/works" data-barba class="magnetic-link">← BACK TO WORKS</a>
            </section>
        `;

        if (window.Penryn.cursor) window.Penryn.cursor.refresh();
    }
}