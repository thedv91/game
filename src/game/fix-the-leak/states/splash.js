import Phaser from 'phaser';

class Splash extends Phaser.State {
	init() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	}
	create() {
        let splashGame = this.add.sprite(this.world.centerX, this.world.centerY, 'splash');
		splashGame.anchor.setTo(0.5, 0.5);
        splashGame.alpha = 0;

        let splashScreen = this.add.tween(splashGame).to({
			alpha: 1
		}, 500, Phaser.Easing.Linear.None, false, 0, 0, true);

        splashScreen.onComplete.add(() => {
            this.state.start('intro');
            //this.state.start('game');
            // this.state.start('game-over', true, false, 23, 52);
        });
		splashScreen.start();
	}

	loadRender() {

	}

	loadUpdate() {

	}

	paused() {

	}

	pauseUpdate() {

	}

	preload() {

		

	}

	preRender() {

	}

	render() {

	}

	resize() {

	}

	resumed() {

	}

	shutdown() {

	}

	update() {

	}

	/**
	 * Custom function
	 */
}


export default Splash;