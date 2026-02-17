// Implementation for AboutController.js
import Controller from '../../engine/Controller.js';

/**
 * AboutController
 * Manages the 'About' page view and logic.
 */
export default class AboutController extends Controller {
    constructor() {
        super(); // Initializes this.container and this.abortController
        this.render();
    }

    render() {
        // Aesthetic split-screen layout to match the Prototype theme
        this.container.innerHTML = `
            <div class="prototype-view about-page">
                <header class="nav-bar">
                    <div class="logo"><a href="/">PROTOTYPE</a></div>
                    <nav>
                        <a href="/">WORKS</a>
                        <a href="/about" class="active">ABOUT</a>
                        <a href="/contact">CONTACT</a>
                    </nav>
                </header>

                <main class="about-grid">
                    <div class="about-image">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600" alt="About Portrait">
                    </div>
                    <div class="about-content">
                        <h2>The Studio</h2>
                        <p>We are a multidisciplinary design practice focused on high-end fashion, luxury goods, and editorial aesthetics.</p>
                        <p>Our approach blends classic typography with modern interactive layouts, ensuring every digital experience feels as tactile as print.</p>
                        
                        <div class="contact-trigger">
                            <button id="contact-btn">Get in Touch</button>
                        </div>
                    </div>
                </main>
            </div>
        `;

        this.setupEvents();
    }

    setupEvents() {
        const btn = this.container.querySelector('#contact-btn');
        if (btn) {
            // This event is registered with a 'signal', ensuring it is nuked 
            // automatically when you navigate back to 'Home'
            this.addEvent(btn, 'click', () => {
                alert("Redirecting to contact... (Logic not implemented yet)");
            });
        }
    }
}