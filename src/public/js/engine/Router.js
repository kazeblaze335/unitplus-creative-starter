import HomeController from '../Controller/HomeController.js';
import AboutController from '../Controller/AboutController.js';
import ContactController from '../Controller/ContactController.js';
import ProjectDetailController from '../Controller/ProjectDetailController.js';

export default class Router {
    constructor(app) {
        this.app = app;
        // Inside your Router constructor routes object:
        this.routes = {
            'home': HomeController,
            'about': AboutController,
            'contact': ContactController,
            'project': ProjectDetailController // Add this
        };
        this.initBarba();
    }

    initBarba() {
        const self = this;
        barba.init({
            transitions: [{
                async leave(data) {
                    await self.app.transition.start();
                },
                async enter(data) {
                    self.loadController(data.next.namespace);
                    await self.app.transition.end();
                }
            }]
        });

        // Load initial page
        this.loadController(barba.history.current.namespace || 'home');
    }

    loadController(name) {
        const ControllerClass = this.routes[name] || HomeController;
        // Pass the app instance to the controller
        const controller = new ControllerClass(this.app);
        controller.init();
    }
}