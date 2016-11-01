
// Here we use the 'official name' (bootState) when defining the state
var bootState = {

    // The create function is a standard Phaser function, and is
    // automatically called
    init: function () {
        screenData = new GameType(game);
    },

    create: function () {

        // Starting the physics system - in this case we are using the
        // simple (but effective) ARCADE physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);

        game.stateTransition.configure({
            duration: Phaser.Timer.SECOND * 1,
            ease: Phaser.Easing.Exponential.InOut,
            properties: {
                alpha: 0,
                scale: {
                    x: 1.4,
                    y: 1.4
                }
            }
        });

        // Calling the load state
        game.state.start('load');
    }
};