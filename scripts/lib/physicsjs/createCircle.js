services.register('createCircle', function(engine, options) {

    var circle = Physics.body('circle', {
        x: options.x,
        y: options.y,
        styles: {
            fillStyle: options.backgroundColor,
            angleIndicator: options.angleIndicatorColor
        },
        radius: options.radius
    });

    engine.world.add(circle);

    return circle;

});
