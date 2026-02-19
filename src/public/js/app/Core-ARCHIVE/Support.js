export default class Support {
    constructor(app) {
        this.app = app;
    }

    init() {
        const self = this;

        barba.init({
            debug: true, // Enable for lifecycle testing
            transitions: [{
                name: 'lifecycle-transition',

                async leave(data) {
                    console.log("Lifecycle: 1. Leaving current page...");
                    await self.app.transition.out();
                },

                async enter(data) {
                    await self.app.route.router.resolve(data.next.namespace);

                    // This is the call that makes Cursor.js work on new pages!
                    self.app.cursor.refresh();

                    await self.app.transition.in();

                    console.log("Lifecycle: 2. New container arrived.");

                    // Identify the namespace from the new container
                    const namespace = data.next.namespace;

                    // Route to the new controller and wait for render
                    await self.app.route.router.resolve(namespace);

                    // Re-bind magnetic listeners to new elements
                    self.app.cursor.refresh();

                    console.log(`Lifecycle: 3. Controller [${namespace}] mounted.`);
                    await self.app.transition.in();
                }
            }]
        });
    }
}