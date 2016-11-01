import 'pixi';
import 'p2';
import 'whatwg-fetch';
import Phaser from 'phaser';
import 'phaser-state-transition-plugin';
import './../libs/canvasinput.js';
// import './../libs/phaser-input.js';



//import Memory from './game/memory/app';
import FixTheLeakGame from './game/fix-the-leak/game';


// new FixTheLeak(810, 640, 'app');
// new FixTheLeak('100%', '100%', 'app');
//new Memory(810, 640, 'memory');

export function FixTheLeak(dom) {
	if (window.innerHeight > 810) {

		if (window.innerHeight > 980) {
			new FixTheLeakGame('100%', '100%', dom);
		} else {
			new FixTheLeakGame(810, '100%', dom);
		}
	} else {
		let w = window.innerWidth;
		let h = window.innerHeight;

		if (w <= 810) {
			new FixTheLeakGame('100%', '100%', dom);
		}

		if (w > 810) {
			let tile = 4 / 5;
			if (w / h > tile) {
				w = h * tile;
				new FixTheLeakGame(w, '100%', dom);
			} else {
				new FixTheLeakGame('100%', '100%', dom);
			}
		}

	}
}
