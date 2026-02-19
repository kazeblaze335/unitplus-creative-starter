/**
 * ENGINE: TRANSITION
 * Location: /js/engine/Transition.js
 */
export default class Transition {
    constructor() {
        // Create Grain Overlay
        this.overlay = document.querySelector('.film-grain-overlay');
        if (!this.overlay) {
            this.overlay = document.createElement('div');
            this.overlay.className = 'film-grain-overlay';
            document.body.appendChild(this.overlay);
        }

        // Create Progress Bar
        this.progressBar = document.querySelector('.loader-bar');
        if (!this.progressBar) {
            this.progressBar = document.createElement('div');
            this.progressBar.className = 'loader-bar';
            document.body.appendChild(this.progressBar);
        }
    }

    /**
     * Fills the bar and fades in grain
     */
    async start() {
        console.log("🎬 Transition: Loading Start");
        
        // Reset and animate
        this.progressBar.style.transformOrigin = "left";
        this.progressBar.style.transform = "scaleX(0)";
        
        // Force a reflow to ensure the reset happens
        this.progressBar.getBoundingClientRect();

        this.overlay.classList.add('is-active');
        this.progressBar.style.transform = "scaleX(1)";
        
        return new Promise(resolve => setTimeout(resolve, 600));
    }

    /**
     * Hides the bar and grain
     */
    async end() {
        console.log("🎬 Transition: Loading Complete");
        
        this.overlay.classList.remove('is-active');
        
        // Fade the bar out once it hits 100%
        this.progressBar.style.opacity = "0";
        
        return new Promise(resolve => {
            setTimeout(() => {
                // Reset for next time
                this.progressBar.style.transform = "scaleX(0)";
                this.progressBar.style.opacity = "1";
                resolve();
            }, 600);
        });
    }
}