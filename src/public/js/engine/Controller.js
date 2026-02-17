export default class Controller {
    constructor(app) {
        this.app = app; // This is the window.Penryn instance
    }

    /**
     * Entry point for the controller.
     * Called by the Router after the view is mounted.
     */
    async init() {
        // Overridden by child controllers
    }

    /**
     * Cleanup point.
     * Called before moving to a new page.
     */
    destroy() {
        // Remove specific event listeners if necessary
    }
}