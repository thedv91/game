import Phaser from 'phaser';
import variables from './../variables';

export default class extends Phaser.State {

    init() {
		
    }

    // The preload function is another standard Phaser function that we
    // use to define and load our assets
    preload() {

        // Add a loading label on the screen
        this.add.text(80, 150, 'loading...', { font: '30px Courier', fill: '#ffffff' });

        // Load all assets. The first parameter is the variable that
        // will point to the image, and the second parameter is the

        if (variables.h > 1000) {
            this.load.image('bg_play', 'assets/images/big_screen/bg_play.png');
        } else {
            this.load.image('bg_play', 'assets/images/small_screen/bg_play.png');
        }
        // Menu Stage
        this.load.image('background', 'assets/images/wallys-background.png');
        this.load.image('board', 'assets/images/board.png');
        this.load.image('tree', 'assets/images/tree.png');

        this.load.spritesheet('start', 'assets/images/start.png?sd', 170, 60);
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        // Game Play
        this.load.image('ground', 'assets/images/platform.png');
        this.load.spritesheet('menu-btn', 'assets/images/menu-button.png?ddf', 170, 60);
        this.load.image('level-table', 'assets/images/banggo.png');
        this.load.image('pause', 'assets/images/pause.png?asd');
        this.load.image('end-game', 'assets/images/end-game.png');
        this.load.image('continue', 'assets/images/continue.png');
        this.load.spritesheet('ok', 'assets/images/ok.png?ddf', 170, 60);
        this.load.image('time-bg', 'assets/images/orange.png');

        // Flip Card
        this.load.image('back', 'assets/back.png');
        for (let i = 0; i <= 12; i++) {
            this.load.image('' + i + '', 'assets/items/' + i + '.png');
        }

        // End Game
        this.load.spritesheet('submit', 'assets/images/submit.png?df', 170, 60);

    }

    create() {
        // Call the menu state
        this.state.start('menu');
    }
}