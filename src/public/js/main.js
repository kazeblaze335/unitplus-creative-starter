/**
 * PENRYN ENGINE - UNIFIED CORE
 * Merging App.js logic into main.js bootstrapper
 */
import Cursor from '/js/engine/Cursor.js';
import Transition from '/js/engine/Transition.js';
import Router from '/js/engine/Router.js'; // Note: Your Router is in /engine/

class PenrynApp {
    constructor() {
        console.log("🚀 Penryn Engine: System Online");

        // 1. Core Target (matches your #app div)
        this.el = document.getElementById('app');

        // 2. Initialize UI Components from /engine/
        this.cursor = new Cursor();
        this.transition = new Transition();
        
        // 3. Boot the Router (now located in /engine/Router.js)
        this.router = new Router(this);

        // 4. Initial Render Trigger
        this.boot();
    }

    boot() {
        const container = document.querySelector('[data-barba-namespace]');
        const namespace = container ? container.getAttribute('data-barba-namespace') : 'home';
        
        console.log(`📦 Mounting View: ${namespace}`);
        this.router.loadController(namespace);
    }
}

// Global instance to allow controllers to access window.Penryn.cursor
window.addEventListener('DOMContentLoaded', () => {
    window.Penryn = new PenrynApp();
});