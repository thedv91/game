import 'pixi';
import 'p2';
import 'whatwg-fetch';
import Phaser from 'phaser';
import 'phaser-state-transition-plugin';
import './../libs/canvasinput.js';
// import './../libs/phaser-input.js';



import Memory from './game/memory/app';
import FixTheLeak from './game/fix-the-leak/game';


//new FixTheLeak(810, '100%', 'app');	
// new FixTheLeak('100%', '100%', 'app');
//new Memory(810, 640, 'memory');


if(window.innerHeight > 810) {

	if(window.innerHeight > 950) {
	
		new FixTheLeak('100%', '100%', 'app');
	}else{
	
		new FixTheLeak(810, '100%', 'app');
	}
}else{
	
	let w = window.innerWidth;
	let h = window.innerHeight;

	if (w <= 810) {
		new FixTheLeak('100%', '100%', 'app');
	}

	if(w > 810){
		let tile = 4/5;
		if(w/h> tile) {
			w = h * tile;
			new FixTheLeak(w, '100%', 'app');
		}else{
			new FixTheLeak('100%', '100%', 'app');
		}	
	}

}