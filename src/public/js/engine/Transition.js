/**
 * ENGINE: TRANSITION
 * Location: /js/engine/Transition.js
 */
export default class Transition {
    constructor() {
        // Create the grain element if it doesn't already exist in the HTML
        this.overlay = document.querySelector('.film-grain-overlay');
        
        if (!this.overlay) {
            this.overlay = document.createElement('div');
            this.overlay.className = 'film-grain-overlay';
            document.body.appendChild(this.overlay);
        }
    }

    /**
     * Fades the grain IN.
     * Triggered by Router during Barba 'leave'.
     */
    async start() {
        console.log("🎬 Transition: Grain Fade-In Started");
        this.overlay.classList.add('is-active');
        
        // Wait 600ms (matches CSS transition) before resolving
        return new Promise(resolve => setTimeout(resolve, 600));
    }

    /**
     * Fades the grain OUT.
     * Triggered by Router during Barba 'enter'.
     */
    async end() {
        console.log("🎬 Transition: Grain Fade-Out Started");
        this.overlay.classList.remove('is-active');
        
        // Wait 600ms before resolving
        return new Promise(resolve => setTimeout(resolve, 600));
    }
}