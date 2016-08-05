import 'pixi';
import 'p2';
import 'whatwg-fetch';
import Phaser from 'phaser';
import 'phaser-state-transition-plugin';
import './../libs/canvasinput.js';
// import './../libs/phaser-input.js';



import Memory from './game/memory/app';
import FixTheLeak from './game/fix-the-leak/game';


// new FixTheLeak(810, 640, 'app');
new FixTheLeak('100%', '100%', 'app');
//new Memory(810, 640, 'memory');