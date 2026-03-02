// Inside HomeController.js, AboutController.js, etc.
import Controller from '/js/engine/Controller.js';

export default class ContactController extends Controller {
    async init() {
        console.log("🎨 Works: Initializing Gallery");
        // 1. Manually update the namespace attribute so the Router/Toolbar sees it
        this.app.el.setAttribute('data-barba-namespace', 'contact');

        // 2. Inject the HTML
        this.app.el.innerHTML = this.template();


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

    destroy() {
        cancelAnimationFrame(this.tickerId); // Stops the follow loop
        window.removeEventListener('mousemove', this.mouseHandler); // Stops mouse tracking
        console.log("Contact Loop Stopped");
    }

    template() {
        return `
            <div class="contact-view">
                <div class="contact-header">
                    <span class="g-number">04 / CONNECTION</span>
                    <h1 class="contact-title">START THE <br>CONVERSATION.</h1>
                </div>

                <div class="contact-grid">
                    <div class="contact-col">
                        <div class="contact-item">
                            <span class="label">GENERAL INQUIRIES</span>
                            <a href="mailto:hello@penryn.studio" class="magnetic-link large-link">HELLO@PENRYN.STUDIO</a>
                        </div>
                        <div class="contact-item">
                            <span class="label">NEW PROJECTS</span>
                            <a href="mailto:work@penryn.studio" class="magnetic-link large-link">WORK@PENRYN.STUDIO</a>
                        </div>
                    </div>

                    <div class="contact-col">
                        <div class="contact-item">
                            <span class="label">SOCIAL NODES</span>
                            <ul class="social-list">
                                <li><a href="#" class="magnetic-link">INSTAGRAM</a></li>
                                <li><a href="#" class="magnetic-link">ARE.NA</a></li>
                                <li><a href="#" class="magnetic-link">TWITTER / X</a></li>
                                <li><a href="#" class="magnetic-link">BEHANCE</a></li>
                            </ul>
                        </div>
                        <div class="contact-item">
                            <span class="label">OFFICE</span>
                            <p class="office-address">
                                BERLIN, DE<br>
                                ROSENTHALER STR. 40/41<br>
                                10178 MITTE
                            </p>
                        </div>
                    </div>
                </div>

                <div class="contact-footer-ticker">
                    <div class="ticker-wrap">
                        <span>AVAILABLE FOR Q3-Q4 2026 — AVAILABLE FOR Q3-Q4 2026 — </span>
                    </div>
                </div>
            </div>
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