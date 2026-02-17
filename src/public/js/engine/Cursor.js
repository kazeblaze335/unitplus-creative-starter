/**
 * Cursor Engine
 * Handles the custom magnetic cursor, hover states, and debug HUD.
 */
export default class Cursor {
    constructor() {
        // Core elements
        this.dot = document.getElementById('cursor-dot');
        this.outline = document.getElementById('cursor-outline');
        
        // Debug elements
        this.debugPanel = document.getElementById('cursor-debug');
        this.dbX = document.getElementById('db-x');
        this.dbY = document.getElementById('db-y');
        this.dbTarget = document.getElementById('db-target');

        this.init();
        this.setupDebugToggle();
    }

    /**
     * Toggles the debug visibility with the backtick (`) key
     */
    setupDebugToggle() {
        window.addEventListener('keydown', (e) => {
            if (e.key === '`') {
                const isHidden = this.debugPanel.style.display === 'none';
                this.debugPanel.style.display = isHidden ? 'block' : 'none';
            }
        });
    }

    /**
     * Main mouse tracking loop
     */
    init() {
        window.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;

            // Positioning the cursor elements
            // Note: CSS transform handles the (-50%, -50%) centering
            if (this.dot) {
                this.dot.style.transform = `translate(${x}px, ${y}px)`;
            }
            if (this.outline) {
                this.outline.style.transform = `translate(${x}px, ${y}px)`;
            }

            // Update Debug Overlay if visible
            if (this.debugPanel && this.debugPanel.style.display !== 'none') {
                this.dbX.innerText = Math.round(x);
                this.dbY.innerText = Math.round(y);
            }
        });

        // Initial scan for magnetic elements
        this.refresh();
    }

    /**
     * Re-scans the DOM for interactive elements.
     * Essential to call this in Support.js after every Barba transition.
     */
    refresh() {
        // Select all elements we want to be "magnetic" or "growable"
        const targets = document.querySelectorAll('a, button, .project-item, .magnetic-link');

        targets.forEach(el => {
            // 1. Grow effect on hover
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('is-hovering');
                if (this.dbTarget) {
                    this.dbTarget.innerText = el.tagName.toLowerCase() + 
                        (el.className ? `.${el.className.split(' ')[0]}` : '');
                }
            });

            // 2. Reset effect on leave
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('is-hovering');
                el.style.transform = `translate(0px, 0px)`;
                if (this.dbTarget) this.dbTarget.innerText = 'None';
            });

            // 3. Magnetic Pull Calculation
            el.addEventListener('mousemove', (e) => {
                const { clientX: x, clientY: y } = e;
                const rect = el.getBoundingClientRect();
                
                // Find the center of the element
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Calculate distance from mouse to center
                // 0.3 is the "magnetic strength" - adjust for more/less pull
                const deltaX = (x - centerX) * 0.3;
                const deltaY = (y - centerY) * 0.3;
                
                // Physically pull the element toward the cursor
                el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
        });
    }
}