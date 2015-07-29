services.register('setVelocity', function(body, x, y, wake) {

    Matter.Body.applyForce(body, { x: x, y: y }, 1);

});
