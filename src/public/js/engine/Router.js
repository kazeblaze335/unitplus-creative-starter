/**
 * ENGINE: ROUTER
 * Location: /js/engine/Router.js
 */

import HomeController from '/js/app/Controllers/HomeController.js';
import WorksController from '/js/app/Controllers/WorksController.js';
import AboutController from '/js/app/Controllers/AboutController.js';
import ContactController from '/js/app/Controllers/ContactController.js';
import ProjectDetailController from '/js/app/Controllers/ProjectDetailController.js';

export default class Router {
    constructor(app) {
        this.app = app;
        
        this.routes = {
            'home': HomeController,
            'works': WorksController,
            'about': AboutController,
            'contact': ContactController,
            'project': ProjectDetailController
        };

        this.initBarba();
    }

    initBarba() {
        const self = this;

        barba.init({
            debug: true,
            transitions: [{
                name: 'penryn-noir-transition',

                // LEAVE PHASE: Current page fades out
                async leave(data) {
                    console.log("🛫 Barba: Initiating 'leave' for ", data.current.namespace);
                    
                    // Verify the transition engine is ready
                    if (self.app.transition && typeof self.app.transition.start === 'function') {
                        await self.app.transition.start();
                    } else {
                        console.warn("⚠️ Router: Transition engine missing 'start' function.");
                    }
                },

                // ENTER PHASE: New page content loads
                async enter(data) {
                    console.log("🛬 Barba: Initiating 'enter' for ", data.next.namespace);

                    // 1. Reset UI State
                    window.scrollTo(0, 0);
                    self.app.el = document.getElementById('app');

                    // 2. Update Toolbar
                    if (self.app.toolbar) {
                        self.app.toolbar.update(data.next.namespace);
                    }

                    // 3. Load logic for the new page
                    self.loadController(data.next.namespace);

                    // 4. Refresh Cursor Triggers (Magnetic & VIEW)
                    if (window.Penryn && window.Penryn.cursor) {
                        window.Penryn.cursor.refresh();
                    }

                    // 5. Cleanup Animation
                    if (self.app.transition && typeof self.app.transition.end === 'function') {
                        await self.app.transition.end();
                    }
                }
            }]
        });
    }

    /**
     * Mounts the controller for the specific namespace.
     */
    loadController(name) {
        const ControllerClass = this.routes[name] || HomeController;
        
        try {
            const controller = new ControllerClass(this.app);
            controller.init();
            console.log(`✨ Router: Mounted ${ControllerClass.name}`);
        } catch (error) {
            console.error(`❌ Router: Controller failed [${name}]`, error);
        }
    }
}