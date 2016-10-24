/*
 * Keyboard
 */
import KeyData from './../../../utils/KeyData';
import Key from './Key';

export default class Keyboard {

	constructor(game, x, y, handleClick) {
		if (typeof handleClick !== 'function') {
			console.warn('Callback is not a function.');
		}
		this.game = game;
		this.x = x || 0;
		this.y = y || 0;
		this.w = 630;
		this.h = 210;
		this.myKeyboard = KeyData;
		this.keyboardReady = false;
		this.keyWidth = 30;
		this.keyHeight = 30;
		this.keyOffset = 10;
		this.rowOffset = 10;
		this.startDrawX = 0;
		this.startDrawY = 10;
		this.handleClick = handleClick;
		this.keyboard;
		this.draw();
	}

	draw() {
		let group = this.game.add.group();
		let keyBackground = this.game.add.group();
		let keyboard = this.game.add.group();
		keyBackground.create(0, 0, 'key_back');
		keyBackground.width = this.w;
		keyBackground.height = this.h;

		group.x = this.x;
		group.y = this.y;
		group.width = this.w;
		group.height = this.h;
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

				let key = new Key(this.game, myX, myY, tmpkeyWidth, this.keyHeight, this.myKeyboard.rows[j].keys[h], this.handleEventClick.bind(this));
				keyboard.add(key);
			}
		}
		group.visible = false;
		group.enableBody = true;
		group.add(keyBackground);
		group.add(keyboard);
		group.pivot.x = 630 / 2;
		group.pivot.y = 0;
		this.keyboard = group;
		return this.keyboard;
	}

	show(x = 0, y = 0) {
		if (this.keyboard) {
			this.keyboard.x = x;
			this.keyboard.y = y;
			this.keyboard.visible = true;
		} else {
			console.warn('Keyboard not init.');
		}
	}

	hidden() {
		if (this.keyboard) {
			this.keyboard.visible = false;
		} else {
			console.warn('Keyboard not init.');
		}
	}
	scale(...args) {
		if (this.keyboard) {
			this.keyboard.scale.setTo(...args);
		} else {
			console.warn('Keyboard not init.');
		}
	}
	handleEventClick(e) {
		if (e.type === 10) {
			this.hidden();
		} else {
			this.handleClick(e);
		}
	}
}
