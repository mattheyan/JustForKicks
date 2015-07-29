services.register('startPhysicsEngine', function (engine, onStep) {

    var world = engine.world;

    world.render();

    Physics.util.ticker.on(function(time, dt){
        world.step(time);
    });

    Physics.util.ticker.start();

    world.on('step', function (){
        if (onStep) {
            onStep();
        }
        world.render();
    });

});
