/**
 * ENGINE DIAGNOSTICS TOOLBAR
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
        // Basic inline styles to ensure it shows up regardless of CSS loading
        Object.assign(this.el.style, {
            position: 'fixed',
            bottom: '0',
            right: '0',
            background: '#000',
            color: '#0f0', // Matrix green for high visibility
            padding: '5px 12px',
            fontSize: '10px',
            fontFamily: 'monospace',
            zIndex: '10000',
            letterSpacing: '1px',
            borderTopLeftRadius: '4px',
            textTransform: 'uppercase'
        });
        document.body.appendChild(this.el);
    }

    update(namespace) {
        const path = window.location.pathname;
        this.el.innerHTML = `ROUTE: ${path} | NAMESPACE: ${namespace} | BARBA: ACTIVE`;
    }
}