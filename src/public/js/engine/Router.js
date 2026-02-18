import HomeController from '/js/app/Controllers/HomeController.js';
import AboutController from '/js/app/Controllers/AboutController.js';

export default class Router {
    constructor(app) {
        this.app = app;
        this.routes = {
            'home': HomeController,
            'about': AboutController
        };
        this.initBarba();
    }

    initBarba() {
        const self = this;
        barba.init({
            transitions: [{
                name: 'default-transition',
                async leave() {
                    await self.app.transition.start();
                },
                async enter(data) {
                    // Update the app target for the new page
                    self.app.el = document.getElementById('app');
                    self.loadController(data.next.namespace);
                    await self.app.transition.end();
                }
            }]
        });
    }

    loadController(name) {
        const ControllerClass = this.routes[name] || HomeController;
        const controller = new ControllerClass(this.app);
        controller.init();
    }
}