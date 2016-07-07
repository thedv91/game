import 'pixi';
import 'p2';
import Phaser from 'phaser';
import 'phaser-state-transition-plugin';

import BootState from './states/boot';
import LoadState from './states/load';
import MenuState from './states/menu';
import PlayState from './states/play';
import WinState from './states/win';

class Game extends Phaser.Game {
	constructor() {
		let width = 800;
		let height = 600;
		super(width, height, Phaser.AUTO);
		this.moves = 0;
		this.state.add('boot', BootState);
		this.state.add('load', LoadState);
		this.state.add('menu', MenuState);
		this.state.add('play', PlayState);
		this.state.add('win', WinState);

		this.state.start('boot');
	}
}

window.game = new Game();