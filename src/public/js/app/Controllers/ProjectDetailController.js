/**
 * PROJECT DETAIL CONTROLLER
 * Location: /js/app/Controllers/ProjectDetailController.js
 */
import Controller from '/js/engine/Controller.js';

export default class ProjectDetailController extends Controller {
    async init() {
        // Get the project name from the URL slug for a dynamic feel
        const path = window.location.pathname;
        const slug = path.split('/').pop().replace(/-/g, ' ').toUpperCase() || "PROJECT";

        this.app.el.innerHTML = `
            <div class="project-detail-view">
                <div class="project-header">
                    <span class="g-number">SELECTED CASE STUDY</span>
                    <h1 class="project-title-large">${slug}</h1>
                </div>

                <div class="project-content">
                    <div class="project-main-image">
                        <div class="image-reveal-placeholder"></div>
                    </div>
                    
                    <div class="project-description">
                        <p>Art Direction & Technical Strategy for the 2025 campaign. Focused on the intersection of Brutalist architecture and high-performance technical gear.</p>
                        <a href="/works" data-barba class="magnetic-link">← RETURN TO WORKS</a>
                    </div>
                </div>
            </div>
        `;

        // Tell the cursor to look for the new "Back to Works" magnetic link
        if (window.Penryn && window.Penryn.cursor) {
            window.Penryn.cursor.refresh();
        }
    }
}