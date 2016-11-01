import Phaser from 'phaser';
import Splash from './states/splash';
import Boot from './states/boot';
import Menu from './states/menu';
import Play from './states/play';
import Load from './states/load';
import Win from './states/win';
import { Log } from 'utils/Log';

class KioskGame extends Phaser.Game {

	constructor(width = 810, height = 640, id = 'match-the-pair') {
		super(width, height, Phaser.CANVAS, id);
		this.screenData = {};
		this.gameType = 1;
		this.state.add('boot', Boot);
		this.state.add('splash', Splash);
		this.state.add('load', Load);
		this.state.add('menu', Menu);
		this.state.add('play', Play);
		this.state.add('win', Win);
		this.state.start('boot');
	}
}

export default KioskGame;