/**
 * Developer Toolbar
 * Visualizes the current SPA state and Controller lifecycle.
 */
export default class DevToolbar {
    constructor(app) {
        this.app = app;
        this.el = null;
        this.init();
    }

    init() {
        // Create the element
        this.el = document.createElement('div');
        this.el.id = 'dev-toolbar';
        document.body.appendChild(this.el);

        // Update the bar immediately and on every resolve
        this.update();
        
        // Listen for route changes to refresh the UI
        window.addEventListener('popstate', () => this.update());
        
        // We also hook into the click event to update after the transition
        document.addEventListener('click', () => {
            setTimeout(() => this.update(), 600); 
        });
    }

    update() {
        const router = this.app.route.router;
        const controller = router.activeController;
        const controllerName = controller ? controller.constructor.name : 'None';
        const signalActive = controller?.abortController ? 'ACTIVE' : 'INACTIVE';

        this.el.innerHTML = `
            <div>
                <span class="dev-tag">System: <span class="dev-active">Penryn v1.2</span></span>
                <span class="dev-tag">Controller: <span class="dev-active">${controllerName}</span></span>
            </div>
            <div>
                <span class="dev-tag">AbortSignal: <span class="dev-active" style="color:${signalActive === 'ACTIVE' ? '#00ff00' : '#ff0000'}">${signalActive}</span></span>
                <span class="dev-tag">Path: <span class="dev-active">${window.location.pathname}</span></span>
            </div>
        `;
    }
}   