/**
 * EventDelegation Utility
 * Manages global event listening to improve performance and simplify dynamic UI logic.
 */
export default class EventDelegation {
    constructor() {
        this.listeners = new Map();
    }

    /**
     * Registers a delegated event listener on the document.
     * @param {string} type - The event type (e.g., 'click', 'mouseover').
     * @param {string} selector - The CSS selector to match.
     * @param {function} callback - The function to execute on match.
     */
    on(type, selector, callback) {
        // If this is the first time we're listening for this event type, 
        // attach a single global listener to the document.
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
            document.addEventListener(type, (e) => this.handleEvent(e));
        }

        this.listeners.get(type).push({ selector, callback });
    }

    /**
     * Internal handler that checks if the event target matches any registered selectors.
     */
    handleEvent(event) {
        const typeListeners = this.listeners.get(event.type);
        if (!typeListeners) return;

        typeListeners.forEach(({ selector, callback }) => {
            const target = event.target.closest(selector);
            
            // If the event happened on or inside our selector, trigger the callback.
            if (target) {
                callback(event, target);
            }
        });
    }
}