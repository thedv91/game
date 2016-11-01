/*
 * Keyboard plugin
 */
import VirtualKeyboard from 'virtual-keyboard/dist/js/jquery.keyboard.js';
import Fabrique from 'phaser-input/build/phaser-input.js';
import Key from './Key';


export default class Keyboard extends Phaser.Plugin {

	constructor(game, parent) {
		super(game, parent);

		this.canvas =game.canvas;
		this.canvasReady = false;
		this.audioElement;
		this.ctx = game.context;
		this.textarea;
		this.w = 0;
		this.h = 0;
		this.framerate = 30;

		this.timer;
		this.touches = [];

		// JDR: let's setup some default and what not
		this.keys = [];
		this.keyInUse = [];
		this.keyboardReady = false;
		this.keyWidth = 30;
		this.keyHeight = 30;
		this.keyOffset = 10;
		this.rowOffset = 10;
		this.keyColorFill = '#DDDDDD';
		this.keyStrokeFill = '#ff0000';
		this.shiftToggle = false;
		this.capsToggle = false;
		this.caretWhere = 0;

		// JDR: move the keyboard down; note this is really very specific to our use case with the PQ Labs device on the big screen
		this.startDrawX = 30;
		this.startDrawY = 0;
		this.currentType;

		this.myKeyboard = {
			"rows": [
				{
					"keys": [
						{ "startKey": "`", "shiftKey": "~" },
						{ "startKey": "1", "shiftKey": "!" },
						{ "startKey": "2", "shiftKey": "@" },
						{ "startKey": "3", "shiftKey": "#" },
						{ "startKey": "4", "shiftKey": "$" },
						{ "startKey": "5", "shiftKey": "%" },
						{ "startKey": "6", "shiftKey": "^" },
						{ "startKey": "7", "shiftKey": "&" },
						{ "startKey": "8", "shiftKey": "*" },
						{ "startKey": "9", "shiftKey": "(" },
						{ "startKey": "0", "shiftKey": ")" },
						{ "startKey": "-", "shiftKey": "_" },
						{ "startKey": "=", "shiftKey": "+" },
						{ "startKey": "", "shiftKey": "DELETE", "type": 1, "w": 170 }
					]
				},
				{
					"keys": [
						{ "startKey": "", "shiftKey": "TAB", "type": 2, "w": 110 },
						{ "startKey": "q", "shiftKey": "Q" },
						{ "startKey": "w", "shiftKey": "W" },
						{ "startKey": "e", "shiftKey": "E" },
						{ "startKey": "r", "shiftKey": "R" },
						{ "startKey": "t", "shiftKey": "T" },
						{ "startKey": "y", "shiftKey": "Y" },
						{ "startKey": "u", "shiftKey": "U" },
						{ "startKey": "i", "shiftKey": "I" },
						{ "startKey": "o", "shiftKey": "O" },
						{ "startKey": "p", "shiftKey": "P" },
						{ "startKey": "[", "shiftKey": "{" },
						{ "startKey": "]", "shiftKey": "}" },
						{ "startKey": "\\", "shiftKey": "|", "w": 110 }
					]
				},
				{
					"keys": [
						{ "startKey": "", "shiftKey": "CAPS", "type": 3, "w": 90 },
						{ "startKey": "a", "shiftKey": "A" },
						{ "startKey": "s", "shiftKey": "S" },
						{ "startKey": "d", "shiftKey": "D" },
						{ "startKey": "f", "shiftKey": "F" },
						{ "startKey": "g", "shiftKey": "G" },
						{ "startKey": "h", "shiftKey": "H" },
						{ "startKey": "j", "shiftKey": "J" },
						{ "startKey": "k", "shiftKey": "K" },
						{ "startKey": "l", "shiftKey": "L" },
						{ "startKey": ";", "shiftKey": ":" },
						{ "startKey": "'", "shiftKey": "\"" },
						{ "startKey": "", "shiftKey": "ENTER", "type": 4, "w": 190 }
					]
				},
				{
					"keys": [
						{ "startKey": "", "shiftKey": "SHIFT", "type": 5, "w": 170 },
						{ "startKey": "z", "shiftKey": "Z" },
						{ "startKey": "x", "shiftKey": "X" },
						{ "startKey": "c", "shiftKey": "C" },
						{ "startKey": "v", "shiftKey": "V" },
						{ "startKey": "b", "shiftKey": "B" },
						{ "startKey": "n", "shiftKey": "N" },
						{ "startKey": "m", "shiftKey": "M" },
						{ "startKey": ",", "shiftKey": "<" },
						{ "startKey": ".", "shiftKey": ">" },
						{ "startKey": "/", "shiftKey": "?" },
						{ "startKey": "", "shiftKey": "SHIFT", "type": 5, "w": 170 }
					]
				},
				{
					"keys": [
						{ "startKey": "", "shiftKey": "SPACE", "type": 6, "w": 950 }
					]
				}
			]
		};

		this.loadUp();
	}

	addKey(x, y, w, h, key) {
		var keyMe = new Key;
		keyMe.x = x;
		keyMe.y = y;
		keyMe.w = w;
		keyMe.h = h;
		keyMe.key = key.startKey;
		keyMe.shift = key.shiftKey;
		keyMe.type = key.type;
		this.keys.push(keyMe);
	}

	drawKey(context, key) {		
		if (key.colorfill != null) {
			context.fillStyle = key.colorfill;
		}
		else {
			context.fillStyle = this.keyColorFill;
		}


		context.fillRect(key.x, key.y, key.w, key.h);
		let keyThisYo = key.key;

		if (key.key.toLowerCase() != key.shift.toLowerCase()) {
			context.font = '12px Segoe UI'
			context.fillStyle = '#999999';

			context.fillText(key.shift, key.x + 6, key.y + 12);
		}
		else {
			if (this.shiftToggle == true || this.capsToggle == true) {
				keyThisYo = key.shift;
			}
		}

		context.font = '14px Segoe UI'
		context.fillStyle = '#999999';
		context.fillText(keyThisYo, key.x + 6, key.y + 25);

	}

	triggerKey(context, key, flag) {

		if (key.type === 3) {
			this.capsToggle = !this.capsToggle;
		}
		if (key.type === 5) {
			this.shiftToggle = !this.shiftToggle;
		}

		// context.strokeStyle = this.keyStrokeFill;
		// context.strokeRect(key.x, key.y, key.w, key.h);

		// JDR: we're adding to the field, but let's limit the char repeat
		if (flag === 0) {
			//this.keyInUse[key.key] = null;		
			let tmpString = this.textarea.value;
			if (key.type == 1) {
				// JDR: delete/backspace key
				let preText = tmpString.substring(0, this.caretWhere - 1);
				let postText = tmpString.substring(this.caretWhere, tmpString.length);
				this.textarea.value = preText + '' + postText;
				this.setCaretToPos(this.textarea, this.caretWhere - 1);
				this.audioElement.play();

			}
			else if (key.type == 3) {
				if (this.capsToggle == true) {
					this.capsToggle = false;
					context.fillStyle = this.keyColorFill;
					context.fillRect(key.x, key.y, key.w, key.h);
					key.colorfill = this.keyColorFill;

				} else {
					this.capsToggle = true;
					context.fillStyle = '#B1F2AB';
					key.colorfill = '#B1F2AB';
					context.fillRect(key.x, key.y, key.w, key.h);

					context.font = '16px sans serif';
					context.fillStyle = '#000000';
					context.fillText(key.key, key.x + 30, key.y + 35);

				}
				this.audioElement.play();

			}
			else if (key.type == 5) {
				key.colorfill = '#B1F2AB';
				context.fillStyle = key.colorfill;
				context.fillRect(key.x, key.y, key.w, key.h);

				context.font = '16px sans serif';
				context.fillStyle = '#000000';
				context.fillText(key.key, key.x + 30, key.y + 35);

				this.shiftToggle = true;
				this.keyboardReady = false;  // JDR: redraw so the keys go capitalized
				this.audioElement.play();
			}
			else {
				let keyPlacement;
				if (this.shiftToggle == true || this.capsToggle == true) {
					keyPlacement = key.shift;
				}
				else {
					keyPlacement = key.key;
				}

				if (key.type == 4) {
					keyPlacement = '\n';
				}

				if (key.type == 6) {
					keyPlacement = ' ';
				}

				// JDR: add a character at the specific caret position
				let preText = tmpString.substring(0, this.caretWhere);
				let postText = tmpString.substring(this.caretWhere, tmpString.length);
				this.textarea.value = preText + postText + keyPlacement;
				//this.textarea.focus();
				this.setCaretToPos(this.textarea, this.caretWhere + 1);
				this.audioElement.play();
			}
		}

		// JDR: apparently the touch is now gone, so let's ditch that timer
		if (flag === 1) {
			// if (key.type == 5) {
			// 	this.shiftToggle = false;

			// 	key.colorfill = '#cccccc';
			// 	context.fillStyle = key.colorfill;
			// 	context.fillRect(key.x, key.y, key.w, key.h);

			// 	context.font = '16px sans serif';
			// 	context.fillStyle = '#000000';
			// 	context.fillText(key.key, key.x + 30, key.y + 35);
			// }

			let keyPlacement;
			let tmpString = this.textarea.value;
			if (this.shiftToggle == true || this.capsToggle == true) {
				if (!key.type)
					keyPlacement = key.shift;
				else
					keyPlacement = '';
			}
			else {
				keyPlacement = key.key;

			}

			if (key.type == 4) {
				keyPlacement = '\n';
			}

			if (key.type == 6) {
				keyPlacement = ' ';
			}
			// JDR: add a character at the specific caret position
			let preText = tmpString.substring(0, this.caretWhere);
			let postText = tmpString.substring(this.caretWhere, tmpString.length);
			this.textarea.value = postText + preText + keyPlacement;
			console.log(this.textarea.value);
			//this.textarea.focus();
			this.setCaretToPos(this.textarea, this.caretWhere + 1);
			this.audioElement.play();

			//delete this.keyInUse[key.key];
		}

		if (key.type !== 5) {
			if (this.shiftToggle === true) {
				this.shiftToggle = false;
			}
		}

	}

	drawKeyboard() {
		var l = this.keys.length;
		for (var i = 0; i < l; i++) {
			this.drawKey(this.ctx, this.keys[i]);
		}
	}

	// JDR: determine if a key is touched
	iskeyTouched(pX, pY, flag) {
		let l = this.keys.length;

		for (let i = 0; i < l; i++) {
			// JDR: is the touch point we're on hit one of the existing keys?
			if ((pY >= this.keys[i].y) && (pY <= this.keys[i].y + this.keys[i].h) && (pX >= this.keys[i].x) && (pX <= this.keys[i].x + this.keys[i].w)) {
				this.triggerKey(this.ctx, this.keys[i], flag);
			}

		}
	}

	// JDR: where the action and drawing happens
	draw() {

		// JDR: this sets the canvas full viewport
		if (this.canvasReady == false) {			
			var nw = window.innerWidth;
			var nh = window.innerHeight;

			if ((this.w != nw) || (this.h != nh)) {
				this.w = nw;
				this.h = nh;
				this.canvas.style.width = this.w + 'px';
				this.canvas.style.height = this.h + 'px';
				this.canvas.width = this.w;
				this.canvas.height = this.h;
			}

			this.canvasReady = true;
		}

		// JDR: what, where's the keyboard!?!?!
		if (this.keyboardReady == false) {
			//console.log("Drawing the keyboard");
			this.ctx.clearRect(0, 0, this.w, this.h);
			this.drawKeyboard();
			this.keyboardReady = true;
		}

		// // JDR: where be it the touches
		// var i, len = this.touches.length;
		// for (i = 0; i < len; i++) {

		// 	var touch = this.touches[i];
		// 	var pX = touch.pageX;
		// 	var pY = touch.pageY;

		// 	// JDR: this is here because of an odd bug
		// 	this.caretWhere = this.getCaret(this.textarea);

		// 	this.iskeyTouched(pX, pY, 0);
		// }

	}

	loadUp() {
		// this.canvas = this.game.canvas;		
		// this.ctx = this.canvas.getContext('2d');		
		// console.log(this.ctx);
		this.textarea = document.getElementById('testArea');

		//this.canvas.onselectstart = function () { return false; }

		// JDR: every keyboard needs a click clack key press sound
		this.audioElement = document.createElement('audio');
		this.audioElement.setAttribute('src', 'click.wav');
		this.audioElement.load();

		// JDR: loop over the keyboard object and get some rows of keys
		var j, rl = this.myKeyboard.rows.length;
		for (j = 0; j < rl; j++) {

			// JDR: loop over the keys in a row
			var h, kl = this.myKeyboard.rows[j].keys.length;
			var prevkeyWidth = 0;
			for (h = 0; h < kl; h++) {

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

				this.addKey(myX, myY, tmpkeyWidth, this.keyHeight, this.myKeyboard.rows[j].keys[h]);
			}

		}

		// (function animloop() {
		// 	requestAnimFrame(animloop);
		// 	draw();
		// })();

		//canvas.addEventListener('touchend', function (event) {
		// this.canvas.addEventListener('click', (event) => {
		// 	let pX = event.pageX;
		// 	let pY = event.pageY;
		// 	this.iskeyTouched(pX, pY, 1);

		// 	// JDR: redraw me
		// 	this.keyboardReady = false;
		// });

	}

	getCaret(el) {
		if (el.selectionStart) {
			return el.selectionStart;
		} else if (document.selection) {
			el.focus();

			var r = document.selection.createRange();
			if (r == null) {
				return 0;
			}

			var re = el.createTextRange(),
				rc = re.duplicate();
			re.moveToBookmark(r.getBookmark());
			rc.setEndPoint('EndToStart', re);

			return rc.text.length;
		}
		return 0;
	}

	setSelectionRange(input, selectionStart, selectionEnd) {
		if (input.setSelectionRange) {
			//input.focus();
			input.setSelectionRange(selectionStart, selectionEnd);
		}
		else if (input.createTextRange) {
			var range = input.createTextRange();
			range.collapse(true);
			range.moveEnd('character', selectionEnd);
			range.moveStart('character', selectionStart);
			range.select();
		}
	}

	setCaretToPos(input, pos) {
		this.setSelectionRange(input, pos, pos);
	}

	init(/*...args*/) {
		// TODO: Stub		
	}

	update() {
		//this.draw();
	}

	destroy() {
		// TODO: Stub
	}

	render() {

	}
}
