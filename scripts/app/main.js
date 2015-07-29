$(function() {

    var createPhysicsEngine = services.locate('createPhysicsEngine');
    var startPhysicsEngine = services.locate('startPhysicsEngine');
    var stopPhysicsEngine = services.locate('stopPhysicsEngine');

    var createCircle = services.locate('createCircle');

    createPhysicsEngine({
        container: "gameContainer",
        canvas: "gameSurface",
        ready: function(engine) {

            var defaultRadius = 20;

            function createPlayer(customOptions) {

                var options = jQuery.extend({
                   x: Math.random() * (300 - (20 * 2)),
                   y: Math.random() * (300 - (20 * 2)),
                   radius: defaultRadius
                }, customOptions);

                var circle = createCircle(engine, options);

                var p = new player.Player(circle);

                return p;

            }

            var p1 = createPlayer({
                backgroundColor: '#932',
                angleIndicatorColor: '#932',
                //angleIndicatorColor: '#a0a0a0',
                radius: 20
            });

            var pX = createPlayer({
                backgroundColor: "#328",
                angleIndicatorColor: "#328",
                //angleIndicatorColor: "#888",
                speed: 1,
                radius: 20
            });

            window.players = [p1, pX];

            var dPadMap = {
                'left': 37,
                'up': 38,
                'right': 39,
                'down': 40
            };

            $(document.documentElement).bind('keydown', function(e) {
                if (e.which == dPadMap.left) {
                    p1.moveLeft();
                }
                else if (e.which == dPadMap.up) {
                    p1.moveUp();
                }
                else if (e.which == dPadMap.right) {
                    p1.moveRight();
                }
                else if (e.which == dPadMap.down) {
                    p1.moveDown();
                }
            });

            Mousetrap.bind('esc', function() {
                players.forEach(function(player) {
                    player.freeze();
                });

                stopPhysicsEngine(engine);
            });

            if (Math.random() > 0.7) {
                pX.moveLeft();
            }
            else if (Math.random() > 0.7) {
                pX.moveRight();
            }

            if (Math.random() > 0.7) {
                pX.moveUp();
            }
            else if (Math.random() > 0.7) {
                pX.moveDown();
            }

            startPhysicsEngine(engine, function onStep() {

                p1.update();

                pX.update();

            });
        }
    });

});
