/**
 * ENGINE: ROUTER
 * Location: /js/engine/Router.js
 * Optimal SPA Solution: Prevents content-flicker and namespace stagnation.
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

                async leave(data) {
                    // 1. Start Grain + Progress Bar
                    if (self.app.transition) {
                        await self.app.transition.start();
                    }
                },

                async enter(data) {
                    /**
                     * THE OPTIMAL FIX: 
                     * We await the container to ensure Barba has finished 
                     * adding the new page to the DOM before we inject our JS templates.
                     */
                    await data.next.container;

                    // 1. Reset Environment
                    window.scrollTo(0, 0);
                    
                    // Re-target the fresh container Barba just brought in
                    self.app.el = data.next.container; 
                    self.app.el.style.visibility = 'visible';
                    self.app.el.style.opacity = '1';

                    // 2. Resolve Namespace from URL (Reliable Source)
                    const path = window.location.pathname;
                    let namespace = 'home';

                    if (path.includes('/works')) namespace = 'works';
                    else if (path.includes('/about')) namespace = 'about';
                    else if (path.includes('/contact')) namespace = 'contact';
                    else if (path.includes('/project')) namespace = 'project';

                    // 3. Sync DOM Attribute
                    self.app.el.setAttribute('data-barba-namespace', namespace);

                    // 4. Update UI Components
                    if (self.app.toolbar) {
                        self.app.toolbar.update(namespace);
                    }

                    // 5. Load Controller (Injection happens here)
                    self.loadController(namespace);

                    // 6. Refresh Global Interactivity
                    if (window.Penryn && window.Penryn.cursor) {
                        window.Penryn.cursor.refresh();
                    }

                    // 7. End Transition (Fade out grain/loader)
                    if (self.app.transition) {
                        await self.app.transition.end();
                    }
                }
            }]
        });
    }

    /**
     * Resolves and mounts the correct JS controller.
     */
    loadController(name) {
        const ControllerClass = this.routes[name] || HomeController;
        
        try {
            console.log(`✨ Router: Mounting [${ControllerClass.name}]`);
            const controller = new ControllerClass(this.app);
            controller.init();
        } catch (error) {
            console.error(`❌ Router Error: [${name}]`, error);
        }
    }
}