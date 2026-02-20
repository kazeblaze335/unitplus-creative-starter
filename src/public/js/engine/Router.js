/**
 * ENGINE: ROUTER
 * Location: /js/engine/Router.js
 * Handles lifecycle management: init() for new pages, destroy() for old ones.
 */
import HomeController from '/js/app/Controllers/HomeController.js';
import WorksController from '/js/app/Controllers/WorksController.js';
import AboutController from '/js/app/Controllers/AboutController.js';
import ContactController from '/js/app/Controllers/ContactController.js';
import ProjectDetailController from '/js/app/Controllers/ProjectDetailController.js';

export default class Router {
    constructor(app) {
        this.app = app;
        this.activeController = null; // Track the current page instance
        
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

                async leave(data) {
                    // 1. KILLS THE OLD PAGE logic
                    // If the current page has a destroy() method (like HomeController's RAF), run it now.
                    if (self.activeController && typeof self.activeController.destroy === 'function') {
                        console.log(`🗑️ Router: Destroying ${self.activeController.constructor.name}`);
                        self.activeController.destroy();
                    }

                    // 2. Visual Transition
                    if (self.app.transition) {
                        await self.app.transition.start();
                    }
                },

                async enter(data) {
                    await data.next.container;

                    // 1. Reset Environment
                    window.scrollTo(0, 0);
                    self.app.el = data.next.container; 
                    self.app.el.style.visibility = 'visible';

                    // 2. Resolve Namespace
                    const path = window.location.pathname;
                    let namespace = 'home';
                    if (path.includes('/works')) namespace = 'works';
                    else if (path.includes('/about')) namespace = 'about';
                    else if (path.includes('/contact')) namespace = 'contact';
                    else if (path.includes('/project')) namespace = 'project';

                    // 3. Sync DOM and Toolbar
                    self.app.el.setAttribute('data-barba-namespace', namespace);
                    if (self.app.toolbar) self.app.toolbar.update(namespace);

                    // 4. LOAD THE NEW CONTROLLER
                    self.loadController(namespace);

                    // 5. Global UI Refreshes
                    if (window.Penryn && window.Penryn.cursor) {
                        window.Penryn.cursor.refresh();
                    }

                    // 6. End Transition
                    if (self.app.transition) {
                        await self.app.transition.end();
                    }
                }
            }]
        });
    }

    /**
     * Resolves, Destroys, and Mounts Controllers
     */
    loadController(name) {
        const ControllerClass = this.routes[name] || HomeController;
        
        try {
            // Instantiate the new controller and store it as the 'active' one
            this.activeController = new ControllerClass(this.app);
            
            console.log(`✨ Router: Mounting [${ControllerClass.name}]`);
            this.activeController.init();
        } catch (error) {
            console.error(`❌ Router Error: [${name}]`, error);
        }
    }
}