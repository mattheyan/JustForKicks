services.register('createCircle', function(engine, options) {

    var circle = Matter.Bodies.circle(options.x, options.y, options.radius, {
        frictionAir: 0,
        friction: 0,
        restitution: options.restitution || 0.3,
        render: {
            fillStyle: 'red' //options.backgroundColor
        }
    }, 0);

    Matter.World.add(engine.world, [circle]);

    return circle;

});
