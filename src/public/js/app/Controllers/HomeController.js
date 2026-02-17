import Controller from '../../engine/Controller.js';

export default class HomeController extends Controller {
    constructor() {
        super();
        this.init();
    }

    async init() {
        // 1. Render the 'home.html' template
        await this.render('home');

        // 2. Logic after the HTML is in the DOM
        this.setupEventListeners();
    }

    setupEventListeners() {
        console.log("Home Logic: Elements are now ready.");
    }

    // Inside HomeController.js
    setupHoverPreview(projects) {
        const items = document.querySelectorAll('.project-item');
        const img = document.querySelector('.featured-image');
        const title = document.querySelector('.featured-title');

        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const name = item.getAttribute('data-name');
                // Update UI
                title.innerText = name;
                img.src = `https://source.unsplash.com/featured/?${name.toLowerCase()},luxury`;

                // Cursor grow effect is handled automatically by Cursor.js refresh
            });
        });
    }
}