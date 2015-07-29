services.register('createPhysicsEngine', function (options) {

    var engine = {
        world: null
    };

    Physics({
        //timestep: 1000.0 / 1000
    }, function(world) {

        engine.world = world;

        var container = document.getElementById(options.container);

        var canvas = document.createElement('canvas');
        canvas.id = options.canvas || 'game-canvas';
        canvas.width = options.width || 300;
        canvas.height = options.height || 300;
        container.appendChild(canvas);

        var renderer = Physics.renderer('canvas', {
            el: options.canvas || 'game-canvas',
            width: options.width || 300,
            height: options.height || 300
        });

        var bounds = Physics.aabb(0, 0, options.width || 300, options.height || 300);
        world.add(Physics.behavior('edge-collision-detection', {
            aabb: bounds,
            restitution: options.restitution || 0.3
        }));

        world.add(Physics.behavior('body-impulse-response'));

        world.add(Physics.behavior('body-collision-detection'));

        world.add(Physics.behavior('sweep-prune'));

        world.add(renderer);

        if (options.ready) {
            options.ready(engine);
        }

    });

});
