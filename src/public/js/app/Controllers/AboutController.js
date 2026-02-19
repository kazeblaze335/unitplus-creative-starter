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
            this.app.toolbar.update('works', this.projects.length);
        }

        
        
        // Refresh cursor for the big-cta and magnetic links
        if (window.Penryn && window.Penryn.cursor) window.Penryn.cursor.refresh();
    }

    template() {
         const brand = "PROTOTYPE";
         return `
            <section class="about-view monospace">
                <header class="editorial-header">
                    <div class="container">
                        <span class="label">MANIFESTO / 01</span>
                        <h1 class="about-headline uppercase">
                            We turn complex <br>
                            <span class="italic highlight">problems</span> into <br>
                            elegant <span class="magnetic-link">distractions.</span>
                        </h1>
                    </div>
                </header>

                <div class="manifesto-content container">
                    <div class="text-block">
                        <p>Based in Neo-Tokyo, ${brand} is a collective of designers, architects, and people who are suspiciously good at Minesweeper.</p>
                    </div>
                </div>

                <div class="team-section container">
                    <div class="team-grid">
                        <article class="team-member magnetic-link">
                            <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=600">
                            <h3>BARNABY FINCH</h3>
                            <span class="role italic">Chief Aesthetic Officer</span>
                        </article>
                    </div>
                </div>

                <footer class="about-footer">
                    <a href="/contact" class="big-cta magnetic-link uppercase">Let's talk.</a>
                </footer>
            </section>
        `;
    }
}