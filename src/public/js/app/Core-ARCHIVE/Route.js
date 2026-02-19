import Router from '../../engine/Router.js';
import HomeController from '../Controllers/HomeController.js';
import AboutController from '../Controllers/AboutController.js';
import ErrorController from '../Controllers/ErrorController.js';

export default class Route {
    constructor() {
        this.router = new Router();
        this.init();
    }

    init() {
        
    // Registered by Namespace
    this.router.get('home', () => new HomeController());
    this.router.get('about', () => new AboutController());

    // Fallback for direct URL hits that might not have a namespace yet
    this.router.get('/', () => new HomeController());
    this.router.get('/about', () => new AboutController());

    this.router.error(() => new ErrorController());
}
}