/**
 * View Engine - Loads and Caches HTML Templates
 */
export default class View {
    static cache = new Map();

    /**
     * @param {string} templateName - The name of the html file in /views/
     */
    static async load(templateName) {
        const path = `/views/${templateName}.html`;

        // 1. Return from cache if we already have it
        if (this.cache.has(path)) {
            return this.cache.get(path);
        }

        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Could not load template: ${path}`);
            
            const html = await response.text();
            
            // 2. Save to cache
            this.cache.set(path, html);
            return html;
        } catch (error) {
            console.error("View Loader Error:", error);
            return `<div class="error">Template ${templateName} not found.</div>`;
        }
    }
}