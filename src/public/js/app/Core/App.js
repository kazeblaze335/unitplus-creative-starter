import Route from './Route.js';
import Support from './Support.js';
import Cursor from '../../engine/Cursor.js';
import Transition from '../../engine/Transition.js';

export default class App {
    constructor() {
        this.transition = new Transition();
        this.cursor = new Cursor();
        this.route = new Route(this);
        this.support = new Support(this);

        this.init();
    }

    async init() {
        // Initial load: Resolve the current URL immediately
        await this.route.router.resolve();
        // Initialize Barba and Cursor listeners
        this.support.init();
        this.cursor.refresh();
    }
}