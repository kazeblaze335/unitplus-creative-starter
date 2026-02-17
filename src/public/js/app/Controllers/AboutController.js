// src/public/js/app/Controller/AboutController.js
import Controller from '../../engine/Controller.js';

export default class AboutController extends Controller {
    async init() {
        // Test data fetching from our projects.json
        const response = await fetch('/data/projects.json');
        const data = await response.json();

        // Pass settings to the about page for site branding
        await this.render('about', {
            brand: data.site_settings.brand_name,
            tagline: "We design things you didn't know you needed."
        });

        console.log("About Lifecycle: Content Painted.");
    }
}