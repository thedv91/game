import 'pixi';
import 'p2';
import 'whatwg-fetch';
import Phaser from 'phaser';
import 'phaser-state-transition-plugin';
import './../libs/canvasinput.js';
// import './../libs/phaser-input.js';



//import MemoryApp from './game/memory/app';
//import FixTheLeakKioskGame from './game/fix-the-leak/kiosk/game';
import FixTheLeakArcadeGame from './game/fix-the-leak/arcade/game';
import MatchThePairKioskGame from './game/match-the-pair/kiosk/game';


//new FixTheLeak(810, '100%', 'app');	
// new FixTheLeak('100%', '100%', 'app');
//new Memory(810, 640, 'memory');


// if (window.innerHeight > 810) {

// 	if (window.innerHeight > 950) {

// 		new FixTheLeak('100%', '100%', 'app');
// 	} else {

// 		new FixTheLeak(810, '100%', 'app');
// 	}
// } else {

// 	let w = window.innerWidth;
// 	let h = window.innerHeight;

// 	if (w <= 810) {
// 		new FixTheLeak('100%', '100%', 'app');
// 	}

// 	if (w > 810) {
// 		let tile = 4 / 5;
// 		if (w / h > tile) {
// 			w = h * tile;
// 			new FixTheLeak(w, '100%', 'app');
// 		} else {
// 			new FixTheLeak('100%', '100%', 'app');
// 		}
// 	}

// }
// export function Memory(w, h, dom) {
// 	return new MemoryApp(w, h, dom);

// }
export function FixTheLeakArcade(dom) {
	//new FixTheLeakArcadeGame('100%', '100%', dom);
	if (window.innerHeight > 810) {
		if (window.innerWidth >= 1024) {
			new FixTheLeakArcadeGame(1280, 1011, dom);
		} else if (window.innerHeight > 950) {
			new FixTheLeakArcadeGame('100%', '100%', dom);
		} else {
			new FixTheLeakArcadeGame(810, '100%', dom);
		}
	} else {

		let w = window.innerWidth;
		let h = window.innerHeight;

		if (w <= 810) {
			new FixTheLeakArcadeGame('100%', '100%', dom);
		}

		if (w > 810) {
			let tile = 4 / 5;
			if (w / h > tile) {
				w = h * tile;
				new FixTheLeakArcadeGame(w, '100%', dom);
			} else {
				new FixTheLeakArcadeGame('100%', '100%', dom);
			}
		}

	}
}

export function MatchThePairKiosk(dom) {
	new MatchThePairKioskGame('100%', '100%', dom);
}
// export function FixTheLeakKiosk(dom) {
// 	if (window.innerHeight > 810) {

// 		if (window.innerHeight > 980) {
// 			new FixTheLeakKioskGame('100%', '100%', dom);
// 		} else {
// 			new FixTheLeakKioskGame(810, '100%', dom);
// 		}
// 	} else {
// 		let w = window.innerWidth;
// 		let h = window.innerHeight;

// 		if (w <= 810) {
// 			new FixTheLeakKioskGame('100%', '100%', dom);
// 		}

// 		if (w > 810) {
// 			let tile = 4 / 5;
// 			if (w / h > tile) {
// 				w = h * tile;
// 				new FixTheLeakKioskGame(w, '100%', dom);
// 			} else {
// 				new FixTheLeakKioskGame('100%', '100%', dom);
// 			}
// 		}

// 	}
// }