export default class View {
    static cache = new Map();

    static async load(templateName, data = {}) {
        const path = `/views/${templateName}.html`;
        let html = this.cache.get(path);

        if (!html) {
            const response = await fetch(path);
            html = await response.text();
            this.cache.set(path, html);
        }

        return this.bind(html, data);
    }

    static bind(html, data) {
        // Improved Regex to handle any amount of whitespace
        return html.replace(/{{\s*([\w.]+)\s*}}/g, (match, key) => {
            const keys = key.split('.');
            let value = data;
            
            // Traverse the data object (e.g., homepage.featured_project.title)
            for (const k of keys) {
                if (value && Object.prototype.hasOwnProperty.call(value, k)) {
                    value = value[k];
                } else {
                    value = undefined;
                    break;
                }
            }
            
            return value !== undefined ? value : match; // Return the tag if data missing
        });
    }
}