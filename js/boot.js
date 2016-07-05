
// Here we use the 'official name' (bootState) when defining the state
var bootState = {

    // The create function is a standard Phaser function, and is
    // automatically called
    create: function () {

        // Starting the physics system - in this case we are using the
        // simple (but effective) ARCADE physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Calling the load state
        game.state.start('load');
    }
};