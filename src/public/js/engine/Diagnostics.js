/**
 * Penryn Engine Diagnostics
 * Runs a health check on the core SPA architecture.
 */
export default class Diagnostics {
    constructor(app) {
        this.app = app;
        this.run();
    }

    async run() {
        console.groupCollapsed("🛠 Penryn Engine: Diagnostic Report");
        
        // 1. Check DOM Vitality
        const appContainer = document.getElementById('app');
        const transitionOverlay = document.getElementById('page-transition');
        
        this.logCheck("DOM: #app container exists", !!appContainer);
        this.logCheck("DOM: #page-transition overlay exists", !!transitionOverlay);

        // 2. Check Orchestration State
        this.logCheck("Core: Router initialized", !!this.app.route?.router);
        this.logCheck("Core: Support layer initialized", !!this.app.support);
        this.logCheck("Core: Global APP_CONFIG found", !!window.APP_CONFIG);

        // 3. Check Data Reachability
        if (window.APP_CONFIG?.apiPath) {
            try {
                const response = await fetch(`${window.APP_CONFIG.apiPath}/content.json`);
                this.logCheck("Data: content.json is reachable", response.ok);
            } catch (e) {
                this.logCheck("Data: content.json is reachable", false);
            }
        }

        // 4. Memory Leak Check (AbortController)
        const currentCtrl = this.app.route?.router?.activeController;
        this.logCheck("Lifecycle: Active Controller has AbortSignal", !!currentCtrl?.abortController);

        console.groupEnd();
    }

    logCheck(label, success) {
        const icon = success ? "✅" : "❌";
        const style = success ? "color: #2ecc71" : "color: #e74c3c; font-weight: bold";
        console.log(`%c${icon} ${label}`, style);
    }
}