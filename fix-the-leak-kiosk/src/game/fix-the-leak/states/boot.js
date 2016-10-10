import Phaser from 'phaser';
class Boot extends Phaser.State {
	constructor() {
		super();
	}
	init() {
		// this.scale.setResizeCallback(this.gameResized, this);
		// this.stage.disableVisibilityChange = true;
        // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.scale.setMinMax(480, 260, 1024, 768);
        // this.scale.pageAlignHorizontally = true;
        // this.scale.pageAlignVertically = true;

        /*this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;*/

		this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

        this.game.scale.pageAlignVertically = true;
        this.game.scale.pageAlignHorizontally = true;
	}
	create() {
		if (process.env.NODE_ENV === 'development')
			console.log('Loading assets done!');
		// this.game.add.plugin(Fabrique.Plugins.InputField);


		this.state.start('splash');
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
		this.stage.backgroundColor = '#182d3b';

		/**
		 *Load Image
		 */
		this.load.image('start-button', 'assets/buttons/start_yellow.png');
		// this.load.spritesheet('start-button', 'assets/buttons/start_button_sprite_sheet.png', 170, 60);
		//this.load.spritesheet('menu-button', 'assets/buttons/menu_button_sprite_sheet.png', 170, 60);
		this.load.spritesheet('menu-button', 'assets/buttons/menu_button.png', 170, 60);
		//this.load.spritesheet('ok-button', 'assets/buttons/ok_button_sprite_sheet.png', 170, 60);
		this.load.image('ok-button', 'assets/buttons/ok_button.png');
		//this.load.spritesheet('submit-button', 'assets/buttons/submit_button_sprite_sheet.png', 170, 60);
		this.load.image('submit-button', 'assets/buttons/submit_button.png');

		this.load.spritesheet('end-game', 'assets/buttons/end-game.png', 124, 56);
		this.load.spritesheet('continue', 'assets/buttons/continue.png', 124, 56);

		this.load.image('close-button', 'assets/buttons/close.png');
		this.load.image('splash', 'assets/loading/phaser.png');
		this.load.image('background', 'assets/fix-the-leak/big-background.png');
		this.load.image('washstand', 'assets/fix-the-leak/washstand.png');
		this.load.image('bg-water', 'assets/fix-the-leak/bg-water.png');
		this.load.image('window', 'assets/fix-the-leak/window.png');

		//this.load.image('animator', 'assets/fix-the-leak/animator.png');
		this.load.spritesheet('animators', 'assets/fix-the-leak/animators.png?fl', 250, 354, 35);


		this.load.image('animator-end', 'assets/fix-the-leak/animator-end.png?kk');
		this.load.image('black', 'assets/fix-the-leak/black.png');
		this.load.image('blue-green', 'assets/fix-the-leak/blue-green.png');
		this.load.image('white', 'assets/fix-the-leak/white.png');
		this.load.image('pause', 'assets/fix-the-leak/pause.png');
		this.load.image('blue', 'assets/fix-the-leak/blue.png');

		this.load.image('panel', 'assets/panel/panel.png');
		this.load.image('key', 'assets/sprites/key.png');
		this.load.image('key_back', 'assets/sprites/key_back.png');


		this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

		// this.load.audio('background', 'assets/sounds/Morning_Stroll.mp3');

		this.load.audio('click', 'assets/sounds/click.MP3');

		/*this.load.tilemap('pipe-maps', 'assets/fix-the-leak/tilemaps/Map.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tiles-maps', 'assets/fix-the-leak/tilemaps/maps.png');*/

		// Add maps
		this.load.tilemap('map', 'assets/tilemaps/maps/pipe.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('pipe', 'assets/tilemaps/tiles/pipe.png');
		this.load.spritesheet('waters', 'assets/tilemaps/tiles/waters.png', 179, 179, 30);

		// Add maps for small screen
		this.load.tilemap('map-small', 'assets/tilemaps/maps/pipe_small.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('pipe_small', 'assets/tilemaps/tiles/pipe_small.png');
		this.load.spritesheet('water-small', 'assets/tilemaps/tiles/water-small.png?d', 90, 90, 30);

		// Add maps for normal screen
		this.load.tilemap('map-normal', 'assets/tilemaps/maps/pipe_normal.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('pipe_normal', 'assets/tilemaps/tiles/pipe_normal.png');
		this.load.spritesheet('water-normal', 'assets/tilemaps/tiles/water-normal.png?dff', 120, 120, 30);

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

	gameResized(width, height) {
		//this.game.scale.setScreenSize(height.width,height.height);		
		this.game.world.scale.setTo(1);
	}

}


export default Boot;