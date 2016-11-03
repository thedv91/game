import Phaser from 'phaser';
import Splash from './../utils/states/splash';
import Boot from './../utils/states/boot';
import Menu from './../utils/states/menu';
import Play from './states/play';
import Win from './../utils/states/win';
import { Log } from 'utils/Log';
import { LevelData } from './../config/LevelData';

class KioskGame extends Phaser.Game {

	constructor(width = 810, height = 640, id = 'match-the-pair') {
		super(width, height, Phaser.CANVAS, id);
		this.screenData = {};
		this.LevelData = LevelData;
		this.gameType = 0;
		this.state.add('boot', Boot);
		this.state.add('splash', Splash);
		this.state.add('menu', Menu);
		this.state.add('play', Play);
		this.state.add('win', Win);
		this.state.start('boot');
	}
}

export default KioskGame;