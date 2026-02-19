/**
 * PENRYN AGENCY - MAIN ENTRY POINT
 * Location: /js/main.js
 * * This file initializes the core engine and orchestrates 
 * page transitions via Barba.js.
 */

import Cursor from '/js/engine/Cursor.js';
import Transition from '/js/engine/Transition.js';
import Router from '/js/engine/Router.js';
import DevToolbar from '/js/engine/DevToolbar.js'; // Import it here

class PenrynApp {
    constructor() {
        console.log("🚀 Penryn Engine: Initializing...");

        // 1. Define the main content target
        this.el = document.getElementById('app');

        // 2. Initialize Engine Components
        // Transition handles the Film Grain overlay
        this.transition = new Transition();
        
        // Cursor handles the Magnetic links, "VIEW" text reveal, and Difference blend mode
        this.cursor = new Cursor();
        // Dev Toolbar
        this.toolbar = new DevToolbar(); // Initialize it
        /**
         * 3. Initialize the Router
         * The Router handles Barba.js lifecycle:
         * - Scroll resets
         * - Controller instantiation (Home, Works, About, etc.)
         * - Re-triggering Cursor.refresh() on page changes
         */
        this.router = new Router(this);

        // 4. Boot the initial view based on the current HTML namespace
        this.boot();
    }

    /**
     * Finds the data-barba-namespace on the current page 
     * and loads the corresponding JS Controller.
     */
    boot() {
        const container = document.querySelector('[data-barba-namespace]');
        const namespace = container ? container.getAttribute('data-barba-namespace') : 'home';
        
        console.log(`✨ Booting Namespace: ${namespace}`);
        this.router.loadController(namespace);
        
        // Final engine sync
        if (this.cursor) {
            this.cursor.refresh();
        }
    }
}

/**
 * GLOBAL INSTANCE
 * We attach the app to window.Penryn so that individual 
 * controllers can access global components like the cursor.
 */
window.addEventListener('DOMContentLoaded', () => {
    window.Penryn = new PenrynApp();
});