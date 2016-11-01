/*
 * Keyboard
 */
import KeyData from './../utils/KeyData';
import Key from './Key';

export default class Keyboard {

	constructor(game, handleClick) {
		if (typeof handleClick !== 'function') {
			console.warn('Callback is not a function.');
		}
		this.game = game;
		this.myKeyboard = KeyData;
		this.keyboardReady = false;
		this.keyWidth = 30;
		this.keyHeight = 30;
		this.keyOffset = 10;
		this.rowOffset = 10;
		this.startDrawX = 30;
		this.startDrawY = 0;
		this.handleClick = handleClick;
		this.keyboard;
		//this.keyboard = this.initKeyboard();
	}

	draw() {
		let cc = this.game.add.group();
		let rl = this.myKeyboard.rows.length;
		for (let j = 0; j < rl; j++) {

			// JDR: loop over the keys in a row
			let kl = this.myKeyboard.rows[j].keys.length;
			let prevkeyWidth = 0;
			for (let h = 0; h < kl; h++) {
				// JDR: override the default key width if needed
				let tmpkeyWidth;
				if (typeof this.myKeyboard.rows[j].keys[h].w === "undefined") {
					tmpkeyWidth = this.keyWidth;
				}
				else {
					tmpkeyWidth = this.myKeyboard.rows[j].keys[h].w;
				}

				let myY = ((this.rowOffset + this.keyHeight) * j) + this.startDrawY;

				// JDR: if we're at the start, we add on the initial draw offset
				let myX;
				if (h == 0) {
					myX = this.keyOffset + prevkeyWidth + this.startDrawX;
				}
				else {
					myX = this.keyOffset + prevkeyWidth;
				}
				prevkeyWidth = myX + tmpkeyWidth;

				let key = new Key(this.game, myX, myY, tmpkeyWidth, this.keyHeight, this.myKeyboard.rows[j].keys[h], this.handleClick);
				cc.add(key);
			}
		}
		this.keyboard = cc;
		return this.keyboard;
	}

	hidden() {
		if (this.keyboard) {
			this.keyboard.visible = false;
		} else {
			console.warn('Keyboard not init.');
		}
	}
	// handleClick(e){
	// 	console.log(e);
	// }
}
