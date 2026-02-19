/**
 * ENGINE: DIAGNOSTICS TOOLBAR
 * Location: /js/engine/DevToolbar.js
 */
export default class DevToolbar {
    constructor() {
        this.createEl();
        this.update('INITIALIZING...');
    }

    createEl() {
        this.el = document.createElement('div');
        this.el.id = 'penryn-dev-toolbar';
        Object.assign(this.el.style, {
            position: 'fixed',
            bottom: '0',
            right: '0',
            background: '#000',
            color: '#0f0', 
            padding: '8px 15px',
            fontSize: '10px',
            fontFamily: 'monospace',
            zIndex: '10000',
            letterSpacing: '1px',
            textTransform: 'uppercase'
        });
        document.body.appendChild(this.el);
    }

    /**
     * @param {string} namespace - Current page ID
     * @param {number|null} count - Number of projects (if applicable)
     */
    update(namespace, count = null) {
        const path = window.location.pathname;
        const countString = count !== null ? ` | PROJECTS: ${count.toString().padStart(2, '0')}` : '';
        
        this.el.innerHTML = `ROUTE: ${path} | NAMESPACE: ${namespace}${countString} | BARBA: ACTIVE`;
    }
}