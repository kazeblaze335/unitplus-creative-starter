import App from './app/Core/App.js';

// Bootstrapping the Penryn Engine
window.addEventListener('DOMContentLoaded', () => {
    console.log("Penryn Engine: Booting Lifecycle...");
    window.Penryn = new App();
});