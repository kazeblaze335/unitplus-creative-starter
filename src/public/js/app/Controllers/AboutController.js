// Inside HomeController.js, AboutController.js, etc.
import Controller from '/js/engine/Controller.js';

export default class AboutController extends Controller {
    async init() {
        console.log("🎨 Works: Initializing Gallery");
        // 1. Manually update the namespace attribute so the Router/Toolbar sees it
        this.app.el.setAttribute('data-barba-namespace', 'about');

        // 2. Inject the HTML
        this.app.el.innerHTML = this.template();

        // 3. Update the Toolbar
        if (this.app.toolbar) {
            this.app.toolbar.update('about', this.projects.length);
        }

        // Refresh cursor for the big-cta and magnetic links
        if (window.Penryn && window.Penryn.cursor) window.Penryn.cursor.refresh();
    }

    destroy() {
        cancelAnimationFrame(this.tickerId); // Stops the follow loop
        window.removeEventListener('mousemove', this.mouseHandler); // Stops mouse tracking
        console.log("A Loop Stopped");
    }

    template() {
        return `
            <div class="about-container">
                <div class="about-visual">
                    <div class="about-image-wrapper">
                        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" alt="Studio Portrait" class="about-hero-img">
                        <div class="image-overlay-grain"></div>
                    </div>
                </div>

                <div class="about-content">
                    <header class="about-header">
                        <span class="g-number">03 / MANIFESTO</span>
                        <h1 class="about-title">WE DEFINE THE <br>VISUAL LIMIT.</h1>
                    </header>

                    <div class="about-body">
                        <p class="lead">
                            Penryn is a creative laboratory operating at the intersection of high-fashion aesthetics and technical precision.
                        </p>
                        
                        <div class="about-section">
                            <h3>THE PHILOSOPHY</h3>
                            <p>We believe in the power of the "unseen." Our work is rooted in the contrast between heavy brutalism and ethereal lightness. Every pixel is a deliberate choice; every transition is a choreographed movement.</p>
                        </div>

                        <div class="about-section">
                            <h3>SERVICES</h3>
                            <ul class="services-list">
                                <li>Art Direction</li>
                                <li>Digital Architecture</li>
                                <li>Identity Systems</li>
                                <li>Motion Narratives</li>
                            </ul>
                        </div>

                        <footer class="about-footer">
                            <a href="/contact" data-barba class="magnetic-link">INQUIRIES →</a>
                        </footer>
                    </div>
                </div>
            </div>
        `;
    }
}