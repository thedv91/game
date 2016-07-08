import Phaser from 'phaser';

class Boot extends Phaser.State {
    constructor() {
        super();
    }
    init() {
    }
    create() {

        this.physics.startSystem(Phaser.Physics.ARCADE);        
        
        this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);

        this.game.stateTransition.configure({
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
        this.state.start('load');
    }
}

export default Boot;