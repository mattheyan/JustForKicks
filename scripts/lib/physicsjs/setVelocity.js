services.register('setVelocity', function(body, x, y, wake) {
    body.state.vel.set(x, y);
    if (wake) {
        body.sleep(false);
    }
});
