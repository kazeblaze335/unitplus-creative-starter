# unitPLUS® CREATIVE STARTER

## M-V-C (Model - View - Controller Framework for Creative Website Development)

## 🏴‍☠️ unitPLUS Engine v5.0
## Where High-End Editorial Design meets Vanilla JS performance.
unitPLUS® creative starter is a lightweight, custom-built SPA (Single Page Application) framework designed for creative agencies who demand the fluidity of a modern web app without the overhead of bloated frameworks. It is built on the philosophy of "Tactile Digitalism"—every interaction is designed to feel physical, weighted, and intentional.

## 💎 Core Benefits
Zero-Dependency Feel: Aside from Barba.js (for routing) and GSAP (optional), the engine is pure Vanilla JS. This ensures lightning-fast load times and a 100/100 Lighthouse score.

Decoupled Architecture: Logic (Controllers), Presentation (Templates), and Data (JSON) are strictly separated.

Tactile UX: Features a magnetic interaction system that mimics high-end physical portfolio books.

SEO & Routing: Combines the speed of an SPA with the reliability of a traditional multi-page site through intelligent .htaccess and Barba.js integration.

## 🛠 Main Features
1. The "Ghost" Router & Lifecycle
The engine uses a custom-built Router that synchronizes with the Barba.js lifecycle.

Namespaced Resolution: Pages are triggered by data-barba-namespace, allowing you to change URLs without breaking your JavaScript logic.

Automatic Re-binding: The engine automatically re-scans the DOM after transitions to re-attach magnetic listeners and interactive hooks.

## 2. View Engine with Data-Binding
A custom Template Loader that allows you to write clean HTML in separate files.

Mustache-style Syntax: Inject data directly into views using {{variable.path}}.

Template Caching: Views are fetched once and cached in memory, making subsequent page visits near-instant.

## 3. Magnetic Cursor System
A proprietary interaction layer that provides:

Lag-Sync Outline: A dual-element cursor where the outer ring "lags" behind the center for a premium feel.

Magnetic Pull: Interactive elements (links, project items) physically pull toward the cursor when approached.

Debug HUD: A developer overlay (accessible via the ` key) to monitor cursor coordinates and interaction targets in real-time.

## 4. Editorial Engine
Specialized controllers for high-end presentation:

Typewriter Utility: Character-by-character text injection for editorial headlines.

Dynamic Hover Previews: Real-time gallery updates on the homepage driven by projects.json.

Progressive Loading: A global progress bar that tracks the "resolve" state of new controllers.

## 📂 Project Structure
```
Plaintext
src/public/
├── data/           # JSON data sources (The "Brain")
├── views/          # Pure HTML templates (The "Body")
├── js/
│   ├── engine/     # Core Framework (Router, View, Cursor, Transition)
│   ├── app/
│   │   ├── Core/   # App bootstrapping & Barba support
│   │   └── Controller/ # Page-specific logic
└── css/            # Editorial styling & Cursor animations
```

## 🚀 Quick Start
Up the Environment: Run docker-compose up -d.

Access the HUD: Open the site and press the ` key to enter developer mode.

Create a Page:

Add a .html file to /views.

Add a Controller.js to /app/Controller.

Register the namespace in Route.js.

## 🖋 Editorial Direction
The default theme utilizes a Monospace/Courier aesthetic, drawing inspiration from 90s fashion magazines and terminal interfaces. It is designed to be "tongue-in-cheek"—mixing high-professionalism with quirky, agency-style copy.

## 🚢 Deployment & Production Optimization

When moving from the Penryn Development environment to a live production server, follow these steps to ensure peak performance:

### 1. Asset Minification
While the engine uses ES Modules, for production, you should minify your JS and CSS to reduce payload size:
* **JS**: Use `Terser` or `UglifyJS` to compress the files in `src/public/js/`.
* **CSS**: Use `CSSNano` to strip whitespace from `style.css`.

### 2. Cache Control (Headers)
Since the engine relies on fetching `.json` and `.html` files, configure your production server (Nginx or Apache) to cache these assets:
* **Static Assets**: Set `Cache-Control` to 1 year for images and fonts.
* **Templates**: Set `Cache-Control` to "must-revalidate" to ensure users always get the latest UI updates.

### 3. Image Optimization
The engine uses high-resolution Unsplash imagery in development. For production:
* Replace `unsplash.com` links with local, WebP-formatted images.
* Use `srcset` in your templates to serve smaller images to mobile devices.

### 4. .htaccess for SPAs
Ensure your production server is configured to redirect all deep-link requests (e.g., `/about`) to `index.html`. This allows Barba.js to take over the routing from any entry point.
