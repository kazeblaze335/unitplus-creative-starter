import Cursor from '/js/engine/Cursor.js';
import Transition from '/js/engine/Transition.js';
import Router from '/js/engine/Router.js';
import DevToolbar from '/js/engine/DevToolbar.js';

class PenrynApp {
    constructor() {
        this.el = document.getElementById('app');

        // IMPORTANT: The variable name MUST be 'transition' (lowercase)
        // so that Router.js can find self.app.transition.start()
        this.transition = new Transition(); 
        
        this.cursor = new Cursor();
        this.toolbar = new DevToolbar();

        // Pass 'this' so the Router has access to this.transition
        this.router = new Router(this);
        this.boot();
    }

    boot() {
        const path = window.location.pathname;
        let namespace = 'home'; // default
    
        if (path.includes('works')) namespace = 'works';
        else if (path.includes('about')) namespace = 'about';
        else if (path.includes('project')) namespace = 'project';
    
        this.toolbar.update(namespace);
        this.router.loadController(namespace);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.Penryn = new PenrynApp();
});