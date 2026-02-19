/**
 * ENGINE: CURSOR
 * Location: /js/engine/Cursor.js
 * Handles the smooth follow, blend mode, and "VIEW" text reveal.
 */
export default class Cursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        
        // Add the text element for the "VIEW" reveal
        this.cursorText = document.createElement('span');
        this.cursorText.className = 'cursor-text';
        this.cursorText.innerText = 'VIEW';
        this.cursor.appendChild(this.cursorText);
        
        document.body.appendChild(this.cursor);

        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.speed = 0.15;

        // 1. Initialize the movement loop
        this.init();
        
        // 2. Initial scan for magnetic elements
        this.refresh();
    }

    /**
     * Sets up the mouse movement listener and the animation loop.
     */
    init() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        const loop = () => {
            // Smooth "lerp" follow effect
            this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
            this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
            
            this.cursor.style.transform = `translate3d(${this.pos.x - (this.cursor.offsetWidth/2)}px, ${this.pos.y - (this.cursor.offsetHeight/2)}px, 0)`;
            requestAnimationFrame(loop);
        };
        loop();
    }

    /**
     * Toggles the "VIEW" state for the gallery hovers.
     */
    toggleView(active) {
        if (active) {
            this.cursor.classList.add('is-viewing');
        } else {
            this.cursor.classList.remove('is-viewing');
        }
    }

    /**
     * Scans the DOM for magnetic links and gallery triggers.
     * Called by Router.js on every page transition.
     */
    refresh() {
        // 1. Magnetic Links (Nav)
        const magneticItems = document.querySelectorAll('.magnetic-link');
        magneticItems.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const moveX = (e.clientX - centerX) * 0.4;
                const moveY = (e.clientY - centerY) * 0.4;
                
                item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
                this.cursor.classList.add('is-active');
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = `translate3d(0, 0, 0)`;
                this.cursor.classList.remove('is-active');
            });
        });

        // 2. Gallery "VIEW" Triggers
        const galleryTriggers = document.querySelectorAll('.view-trigger');
        galleryTriggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', () => this.toggleView(true));
            trigger.addEventListener('mouseleave', () => this.toggleView(false));
        });
    }
}