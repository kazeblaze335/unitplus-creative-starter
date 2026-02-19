export default class Cursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        // Add text element inside cursor
        this.cursorText = document.createElement('span');
        this.cursorText.className = 'cursor-text';
        this.cursorText.innerText = 'VIEW';
        this.cursor.appendChild(this.cursorText);
        
        document.body.appendChild(this.cursor);
        // ... previous pos/mouse/speed logic ...
        this.init();
    }

    // New method to toggle the VIEW state
    toggleView(active) {
        if (active) {
            this.cursor.classList.add('is-viewing');
        } else {
            this.cursor.classList.remove('is-viewing');
        }
    }

    // Update refresh to include the new VIEW triggers
    refresh() {
        // Standard magnetic links
        const magneticItems = document.querySelectorAll('.magnetic-link');
        magneticItems.forEach(item => { /* ... existing magnetic logic ... */ });

        // Gallery triggers for "VIEW" text
        const galleryTriggers = document.querySelectorAll('.view-trigger');
        galleryTriggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', () => this.toggleView(true));
            trigger.addEventListener('mouseleave', () => this.toggleView(false));
        });
    }
    // ... rest of movement logic ...
}