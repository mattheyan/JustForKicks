services.register('createPhysicsEngine', function (options) {

    var container = document.getElementById(options.container);

    var canvas = document.getElementById(options.canvas);

    var engine = Matter.Engine.create(container, {
        render: {
            options: {
                background: '#ffffff',
                wireframeBackground: "#f0f0f0",
                width: options.width || 300,
                height: options.height || 300
            }
        }
    });

    var bounds = Matter.Bounds.create({
        min: { x: 0, y: 0 },
        max: { x: options.width || 300, y: options.height || 300 }
    });

    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    if (options.ready) {
        options.ready(engine);
    }

});
