/**
 * Transition Engine (Progress Bar Edition)
 */
export default class Transition {
    constructor() {
        this.overlay = document.getElementById('page-transition');
        this.progressBar = document.getElementById('progress-bar');
    }

    /**
     * Start the progress bar (usually called in 'leave')
     */
    startProgress() {
        if (!this.progressBar) return;
        this.progressBar.style.opacity = '1';
        this.progressBar.style.width = '30%'; // Jump to 30% immediately
    }

    /**
     * Update to a specific percentage
     */
    setProgress(percent) {
        if (!this.progressBar) return;
        this.progressBar.style.width = `${percent}%`;
    }

    /**
     * Complete the progress and hide
     */
    async finishProgress() {
        if (!this.progressBar) return;
        this.progressBar.style.width = '100%';
        
        await this.delay(300);
        this.progressBar.style.opacity = '0';
        
        await this.delay(300);
        this.progressBar.style.width = '0%';
    }

    async out(data) {
        this.startProgress(); // Start the bar
        if (this.overlay) {
            this.overlay.classList.add('is-active');
            await this.delay(500);
        }
    }

    async in(data) {
        this.setProgress(80); // We're almost there
        if (this.overlay) {
            this.overlay.classList.remove('is-active');
            await this.delay(500);
        }
        await this.finishProgress(); // Wrap it up
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}