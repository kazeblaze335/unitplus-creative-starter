import Controller from '../../engine/Controller.js';

export default class ContactController extends Controller {
    async init() {
        // 1. Render the contact template
        await this.render('contact');

        // 2. Target the editorial headline
        const headline = document.querySelector('.typewriter-target');
        if (headline) {
            this.typewrite(headline, "TALK IS CHEAP. OUR RETAINER IS NOT.");
        }
    }

    /**
     * Typewriter Effect
     * @param {HTMLElement} element - Target element
     * @param {string} text - The string to type
     */
    typewrite(element, text) {
        element.innerText = ''; // Clear existing text
        let i = 0;
        const speed = 50; // Milliseconds per character

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
}