// Inside HomeController.js, AboutController.js, etc.
import Controller from '/js/engine/Controller.js';

export default class ContactController extends Controller {
    async init() {
        console.log("🎨 Works: Initializing Gallery");
        // 1. Manually update the namespace attribute so the Router/Toolbar sees it
        this.app.el.setAttribute('data-barba-namespace', 'contact');

        // 2. Inject the HTML
        this.app.el.innerHTML = this.template();

         // 3. Update the Toolbar
        if (this.app.toolbar) {
            this.app.toolbar.update('works', this.projects.length);
        }

        // 2. Initialize the Typewriter effect
        const target = document.getElementById('typewriter');
        if (target) {
            const text = "TALK IS CHEAP. OUR RETAINER IS NOT.";
            this.typewrite(target, text);
        }

        // 3. Refresh the global cursor for the new magnetic links
        if (window.Penryn && window.Penryn.cursor) {
            window.Penryn.cursor.refresh();
        }
    }

    template() {
        return `
            <section class="contact-view monospace">
                <div class="contact-container container">
                    <header class="contact-header">
                        <span class="label">STATUS: OPEN FOR BRIEFS (MAYBE)</span>
                        <h2 id="typewriter" class="editorial-title uppercase"></h2>
                    </header>

                    <div class="contact-grid">
                        <div class="editorial-copy">
                            <p>We don't do "synergy." We don't do "deliverables."</p>
                            <p>We do work that makes your competitors reconsider their career choices.</p>
                        </div>

                        <div class="inquiry-links">
                            <div class="link-group">
                                <span class="label">ELECTRONIC MAIL</span>
                                <a href="mailto:hello@prototype.agency" class="magnetic-link huge-link">HELLO@PROTOTYPE.AGENCY</a>
                            </div>

                            <div class="link-group">
                                <span class="label">SOCIALS</span>
                                <nav class="social-nav">
                                    <a href="#" class="magnetic-link">INSTAGRAM</a>
                                    <a href="#" class="magnetic-link">LINKEDIN</a>
                                </nav>
                            </div>

                            <div class="link-group">
                                <span class="label">COORDINATES</span>
                                <p class="address">42 VAPORWAVE LANE,<br>NEO-TOKYO, 00000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    typewrite(el, text, speed = 60) {
        let i = 0;
        el.innerHTML = '';
        el.classList.add('typing-active');

        const timer = setInterval(() => {
            if (i < text.length) {
                el.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}