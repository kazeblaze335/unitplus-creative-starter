// Implementation for Route.js
import Router from '../../engine/Router.js';
import HomeController from '../Controller/HomeController.js';
import AboutController from '../Controller/AboutController.js';
import ErrorController from '../Controller/ErrorController.js';

export default class Route {
    constructor() {
        this.router = new Router();
        this.init();
    }

    init() {
        // Map URLs to Controllers
        this.router.get('/', () => new HomeController());
        this.router.get('/about', () => new AboutController());
        
        // Handle 404s
        this.router.error(() => new ErrorController());
        
        this.router.listen();
    }
}