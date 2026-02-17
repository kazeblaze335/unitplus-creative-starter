// Implementation for HomeController.js
import Controller from '../../engine/Controller.js';

export default class HomeController extends Controller {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="prototype-view">
                <main class="hero-section">
                    <div class="counter">05 <span>/10</span></div>
                    <div class="center-content">
                        <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600" alt="Work">
                        <div class="meta"><span>Abyssae</span><span>Cosmetics</span></div>
                    </div>
                    <div class="project-list">
                        <ul>
                            <li>MARC JACOBS</li>
                            <li class="active">L’ARTISAN PARFUMEUR</li>
                            <li>LOUIS VUITTON</li>
                        </ul>
                    </div>
                </main>
            </div>`;
        this.setupInteractions();
    }

    setupInteractions() {
        const listItems = this.container.querySelectorAll('li');
        listItems.forEach(li => {
            this.addEvent(li, 'mouseenter', () => li.style.opacity = "1");
        });
    }
}