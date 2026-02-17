/**
 * Router Engine
 * Manages the URL states and Controller lifecycles.
 */
export default class Router {
    constructor() {
        this.routes = {};
        this.errorCallback = null;
        this.activeController = null; // Tracks current page instance
    }

    /**
     * Map a URL path to a specific Controller initialization.
     */
    get(path, callback) {
        this.routes[path] = callback;
    }

    /**
     * Define the callback for 404/Error states.
     */
    error(callback) {
        this.errorCallback = callback;
    }

    /**
     * The core resolution logic that switches between controllers.
     */
    resolve() {
        const path = window.location.pathname || '/';
        const callback = this.routes[path];

        // 1. CLEANUP: If a controller is active, destroy it to clear events/HTML
        if (this.activeController && typeof this.activeController.destroy === 'function') {
            this.activeController.destroy();
        }

        // 2. RENDER: Load the matching route or the error fallback
        if (callback) {
            this.activeController = callback();
        } else if (this.errorCallback) {
            this.activeController = this.errorCallback();
        } else {
            console.error(`404: Route ${path} not found.`);
        }
    }

    /**
     * Initializes the URL listeners for the application.
     */
    listen() {
        // Listen for browser navigation (Back/Forward)
        window.addEventListener('popstate', () => this.resolve());

        // Handle initial page load
        window.addEventListener('DOMContentLoaded', () => this.resolve());

        // Intercept <a> tag clicks for SPA behavior
        this.interceptLinks();
    }

    /**
     * Prevents browser reloads and redirects navigation through the Router.
     */
    interceptLinks() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a');
            
            // Only intercept internal links starting with "/"
            if (target && target.getAttribute('href').startsWith('/')) {
                e.preventDefault();
                const url = target.getAttribute('href');
                
                // Update address bar without reloading the page
                window.history.pushState({}, '', url);
                
                // Trigger the logic for the new URL
                this.resolve();
            }
        });
    }
}