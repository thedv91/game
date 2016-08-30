import Phaser from 'phaser';

import BootState from './states/boot';
import LoadState from './states/load';
import MenuState from './states/menu';
import PlayState from './states/play';
import WinState from './states/win';
import val from './variables';

class Game extends Phaser.Game {
	constructor() {
		super(val.w, val.h, Phaser.AUTO);

		this.state.add('boot', BootState);
		this.state.add('load', LoadState);
		this.state.add('menu', MenuState);
		this.state.add('play', PlayState);
		this.state.add('win', WinState);

		this.state.start('boot');
	}
}
export default Game;