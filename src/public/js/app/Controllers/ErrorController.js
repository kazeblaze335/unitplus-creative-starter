// Implementation for ErrorController.js
import Controller from '../../engine/Controller.js';

/**
 * ErrorController
 * Simple handler for 404 - Page Not Found states.
 */
export default class ErrorController extends Controller {
    constructor() {
        // Calls the base class to set up the container and AbortSignal
        super();
        this.render();
    }

    render() {
        // Injects a simple, branded error message into the main #app div
        this.container.innerHTML = `
            <div class="prototype-view error-state">
                <main class="hero-section">
                    <div class="counter">404</div>
                    <div class="center-content">
                        <h2>Page Not Found</h2>
                        <p>The requested URL was not found on this server.</p>
                        <nav style="margin-top: 20px;">
                            <a href="/" class="back-link">Return to Home</a>
                        </nav>
                    </div>
                </main>
            </div>
        `;

        console.warn("Router: 404 state rendered.");
    }
}