/**
 * Router Engine (Namespace Edition)
 */
export default class Router {
    constructor() {
        this.routes = {};
        this.errorCallback = null;
        this.activeController = null;
    }

    /**
     * Map a Namespace or Path to a Controller
     */
    get(key, callback) {
        this.routes[key] = callback;
    }

    error(callback) {
        this.errorCallback = callback;
    }

    /**
     * @param {string|null} namespace - The Barba namespace
     */
    async resolve(namespace = null) {
        // 1. Determine the key: Use namespace if provided, otherwise use clean URL path
        const path = window.location.pathname || '/';
        const key = namespace || path;

        console.log(`Router: Attempting to resolve [${key}]`);

        const callback = this.routes[key];

        // 2. Cleanup old controller
        if (this.activeController?.destroy) {
            this.activeController.destroy();
        }

        // 3. Execute new controller
        if (callback) {
            this.activeController = await callback();
        } else if (this.errorCallback) {
            this.activeController = await this.errorCallback();
        }
    }
}