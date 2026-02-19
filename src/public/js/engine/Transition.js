/**
 * ENGINE TRANSITION
 * Location: /js/engine/Transition.js
 */
export default class Transition {
    constructor() {
        // Create the film grain overlay if it doesn't exist
        this.overlay = document.querySelector('.film-grain-overlay');
        
        if (!this.overlay) {
            this.overlay = document.createElement('div');
            this.overlay.className = 'film-grain-overlay';
            document.body.appendChild(this.overlay);
        }
    }

    // Barba calls this on "leave"
    async start() {
        return new Promise(resolve => {
            this.overlay.classList.add('is-active');
            // Wait for the CSS transition to finish (matches 0.6s in CSS)
            setTimeout(() => {
                resolve();
            }, 600);
        });
    }

    // Barba calls this on "enter"
    async end() {
        return new Promise(resolve => {
            this.overlay.classList.remove('is-active');
            setTimeout(() => {
                resolve();
            }, 600);
        });
    }
}