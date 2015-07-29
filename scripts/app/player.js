// From UMD: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.player = factory();
  }
}(this, function () {

    var unit = 0.1;

    function Player(body, options) {
        this.body = body;
        this.isFrozen = false;

        this.speed = (options && options.speed) || 3;
    }

    Player.prototype.moveLeft = function () {
        this.dX = -this.speed;
    };

    Player.prototype.moveRight = function () {
        this.dX = this.speed;
    };

    Player.prototype.moveUp = function () {
        this.dY = -this.speed;
    };

    Player.prototype.moveDown = function () {
        this.dY = this.speed;
    };

    Player.prototype.update = function() {
       var setVelocity = services.locate('setVelocity');

        if (this.isFrozen) {
            setVelocity(this.body, 0, 0);
        }
        else {
            setVelocity(this.body, this.dX * unit, this.dY * unit, true);
        }

        this.dX = 0;
        this.dY = 0;
    };

    Player.prototype.freeze = function() {
        this.isFrozen = true;
        this.update();
    };

    return {
        Player: Player
    };

}));
