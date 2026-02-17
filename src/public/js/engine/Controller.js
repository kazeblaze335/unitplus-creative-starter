import View from './View.js';

export default class Controller {
    constructor() {
        this.container = document.getElementById('app');
    }

    /**
     * Replaces #app content with a template
     */
    async render(templateName) {
        if (!this.container) return;
        
        // Load the HTML via our View utility
        const html = await View.load(templateName);
        
        // Inject and clear placeholders
        this.container.innerHTML = html;
        
        // Return this for chaining (useful for post-render logic)
        return this;
    }
}