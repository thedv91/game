import Phaser from 'phaser';
import { Log } from 'utils/Log';
import { getInitData } from './../../config/ScreenData';

class Boot extends Phaser.State {

	constructor() {
		super();
	}

	init() {
		this.game.screenData = getInitData(this.game);
		this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.pageAlignHorizontally = true;
	}

	create() {

		Log.info('Loading /assets done!');
		// Starting the physics system - in this case we are using the
		// simple (but effective) ARCADE physics engine
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

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
		this.state.start('splash');
	}

	preload() {
		let game = this.game;
		// this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
		// this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

		this.game.scale.pageAlignVertically = true;
		this.game.scale.pageAlignHorizontally = true;
		let w = this.game.width;
		let h = this.game.height;
		// Add a loading label on the screen
		var loadingLabel = this.game.add.text(80, 150, 'loading...',
			{ font: '30px Courier', fill: '#ffffff' });

		this.load.image('splash', '/assets/loading/phaser.png');

		if (h >= 768) {
			game.load.image('bg_play', '/assets/match-the-pair/images/big_screen/bg_play.png?sddas');
		} else {
			game.load.image('bg_play', '/assets/match-the-pair/images/small_screen/bg_play.png?ssads');
		}
		this.load.spritesheet('begin-button', '/assets/buttons/begin_button_sprite_sheet.png', 159, 54);
		// Menu Stage
		game.load.image('background', '/assets/match-the-pair/images/wallys-background.png?dfddf');
		game.load.image('play_bg', '/assets/match-the-pair/images/play_bg.jpg?sdf');
		game.load.image('board', '/assets/match-the-pair/images/board.png');
		game.load.image('tree', '/assets/match-the-pair/images/tree.png?svvf');

		game.load.spritesheet('wally-animation', '/assets/match-the-pair/images/wally-swing.png?ds', 300, 500, 49);

		game.load.spritesheet('start', '/assets/match-the-pair/images/start.png?sd', 170, 60);
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

		this.load.image('key', '/assets/sprites/key.png');
		this.load.image('key_back', '/assets/sprites/key_back.png');

		// Game Play
		game.load.image('ground', '/assets/match-the-pair/images/platform.png?f');
		game.load.image('menu-btn', '/assets/match-the-pair/images/menu-green.png?dd');
		game.load.image('level-table', '/assets/match-the-pair/images/banggo.png');
		game.load.image('pause', '/assets/match-the-pair/images/pause.png?asd');
		game.load.image('end-game', '/assets/match-the-pair/images/end-game-green.png');
		game.load.image('continue', '/assets/match-the-pair/images/continue-green.png');
		game.load.image('ok', '/assets/match-the-pair/images/ok-green.png');
		game.load.image('time-bg', '/assets/match-the-pair/images/orange.png');
		game.load.image('green-dark', '/assets/match-the-pair/images/green.png');

		// Flip Card
		game.load.image('back', '/assets/match-the-pair/items/back.png?Sdsfs');
		for (var i = 0; i <= 16; i++) {
			game.load.image('' + i + '', '/assets/match-the-pair/items/' + i + '.png?sd');
		}

		// End Game
		game.load.image('submit', '/assets/match-the-pair/images/submit_green.png');

	}
}

export default Boot;