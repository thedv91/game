import Phaser from 'phaser';
import Splash from './states/splash';
import Boot from './states/boot';
import Menu from './states/menu';
import GamePlay from './states/game';
import Intro from './states/intro';
import GameOver from './states/game-over';

class KioskGame extends Phaser.Game {

	constructor(width = 810, height = 640, id = 'fix-the-leak') {

		super(width, height, Phaser.CANVAS, id);
		
		
		this.state.add('boot', Boot);
		this.state.add('splash', Splash);
		this.state.add('intro', Intro);
		this.state.add('menu', Menu);
		this.state.add('game', GamePlay);
		this.state.add('game-over', GameOver);
		this.state.start('boot');
	}
}

export default KioskGame;