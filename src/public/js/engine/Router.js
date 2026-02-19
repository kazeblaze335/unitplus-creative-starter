/**
 * PENRYN ENGINE: ROUTER
 * Location: /js/engine/Router.js
 * * Orchestrates Barba.js transitions, Controller logic, 
 * and diagnostic feedback via the DevToolbar.
 */

import HomeController from '/js/app/Controllers/HomeController.js';
import WorksController from '/js/app/Controllers/WorksController.js';
import AboutController from '/js/app/Controllers/AboutController.js';
import ContactController from '/js/app/Controllers/ContactController.js';
import ProjectDetailController from '/js/app/Controllers/ProjectDetailController.js';

export default class Router {
    constructor(app) {
        this.app = app;
        
        // Mapping namespaces to their respective Controllers
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
            debug: true, // Logs detailed lifecycle info to the console
            transitions: [{
                name: 'penryn-standard-transition',

                // Phase 1: Outbound
                async leave(data) {
                    console.log("🛫 Barba: Leaving ", data.current.namespace);
                    
                    // Safety check to prevent the "start is not a function" error
                    if (self.app.transition && typeof self.app.transition.start === 'function') {
                        await self.app.transition.start();
                    } else {
                        console.warn("⚠️ Transition engine not found. Proceeding without animation.");
                    }
                },

                // Phase 2: Inbound
                async enter(data) {
                    console.log("🛬 Barba: Entering ", data.next.namespace);

                    // 1. Reset Global UI State
                    window.scrollTo(0, 0);
                    self.app.el = document.getElementById('app');

                    // 2. Update Diagnostic Toolbar
                    if (self.app.toolbar && typeof self.app.toolbar.update === 'function') {
                        self.app.toolbar.update(data.next.namespace);
                    }

                    // 3. Load the JS Controller for the new page
                    self.loadController(data.next.namespace);

                    // 4. Re-bind Magnetic Physics and VIEW Triggers
                    if (window.Penryn && window.Penryn.cursor) {
                        window.Penryn.cursor.refresh();
                    }

                    // 5. Cleanup Transition
                    if (self.app.transition && typeof self.app.transition.end === 'function') {
                        await self.app.transition.end();
                    }
                }
            }]
        });
    }

    /**
     * Instantiates and initializes the page-specific controller.
     */
    loadController(name) {
        // Fallback to Home if a namespace is missing or misspelled
        const ControllerClass = this.routes[name] || HomeController;
        
        try {
            console.log(`✨ Mounting Controller: ${ControllerClass.name}`);
            const controller = new ControllerClass(this.app);
            controller.init();
        } catch (error) {
            console.error(`❌ Controller Initialization Error [${name}]:`, error);
            
            // Visual feedback in Toolbar if something breaks
            if (this.app.toolbar) {
                this.app.toolbar.el.style.color = '#ff4d4d'; // Change to error red
                this.app.toolbar.el.innerHTML += ' | CONTROLLER_LOAD_FAIL';
            }
        }
    }
}