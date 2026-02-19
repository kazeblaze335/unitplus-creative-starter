import Cursor from '/js/engine/Cursor.js';
import Transition from '/js/engine/Transition.js';
import Router from '/js/engine/Router.js';
import DevToolbar from '/js/engine/DevToolbar.js';

class PenrynApp {
    constructor() {
        this.el = document.getElementById('app');

        // 1. Initialize Engines FIRST
        // These must be assigned to 'this' so the router can find them via 'self.app'
        this.transition = new Transition(); 
        this.cursor = new Cursor();
        this.toolbar = new DevToolbar();

        // 2. Initialize Router LAST
        // We pass 'this' (the PenrynApp instance) so the router has access to the engines above
        this.router = new Router(this);

        this.boot();
    }

    boot() {
        const container = document.querySelector('[data-barba-namespace]');
        const namespace = container ? container.getAttribute('data-barba-namespace') : 'home';
        
        if (this.toolbar) this.toolbar.update(namespace);
        this.router.loadController(namespace);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.Penryn = new PenrynApp();
});