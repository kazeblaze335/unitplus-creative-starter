/**
 * PENRYN ENGINE CORE
 * The central bootstrapper for the agency framework.
 */
import Cursor from './engine/Cursor.js';
import Transition from './engine/Transition.js';
import Router from './app/Core/Router.js';

class PenrynApp {
    constructor() {
        console.log("🚀 Penryn Engine: Initializing...");

        // 1. Initialize Global UI components
        this.cursor = new Cursor();
        this.transition = new Transition();
        
        // 2. State Management
        this.isTransitioning = false;

        // 3. Initialize the Router
        // This will automatically detect the current URL and boot the correct Controller
        this.router = new Router(this);

        // 4. Global Event Listeners
        this.initGlobalEvents();
    }

    initGlobalEvents() {
        // Handle window resizing for cursor/layout recalculations
        window.addEventListener('resize', () => {
            if (this.cursor) this.cursor.refresh();
        });

        // Debug mode toggle (using the ` backtick key)
        window.addEventListener('keydown', (e) => {
            if (e.key === '`') {
                const debug = document.getElementById('cursor-debug');
                if (debug) debug.style.display = debug.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
}

// BOOT THE SYSTEM
// We attach it to the window so Controllers can call window.Penryn.cursor.refresh()
window.addEventListener('DOMContentLoaded', () => {
    window.Penryn = new PenrynApp();
});