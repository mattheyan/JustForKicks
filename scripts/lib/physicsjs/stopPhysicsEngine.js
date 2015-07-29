services.register('stopPhysicsEngine', function (engine) {
    Physics.util.ticker.stop();
});
