/*
 * Key
 */

export default class Key extends Phaser.TileSprite {

	constructor(game, x, y, w, h, data = {}, cb) {
		super(game, x, y, w, h, 'key');
        this.startKey = data.startKey;
        this.shiftKey = data.shiftKey;
        this.type = data.type;
		this.w = data.w || this.w;
		this.inputEnabled = true;
		this.cb = cb;
		this.game = game;

		const style = {
			font: '500 12px Segoe UI',
			fill: '#000000',
			wordWrap: true,
			wordWrapWidth: this.w,
			align: 'center'
		};

		if (this.type === undefined) {
			this.shiftText = this.game.add.text(3, 1, this.shiftKey, style);
			this.addChild(this.shiftText);
			this.text = this.game.add.text(3, 15, '', style);
			this.addChild(this.text);
		} else {
			this.text = this.game.add.text(3, 3, '', style);
			this.addChild(this.text);
		}

		this.events.onInputDown.add(this.onClick, this);
	}
	update() {
		let text = this.renderText();
		this.text.setText(text);
	}

	renderText() {

		if (this.game.keyboard.shift && this.game.keyboard.caplock) {
			switch (this.type) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
					return this.shiftKey;
				default:
					return this.startKey;
			}
		}
		else if (this.game.keyboard.shift || this.game.keyboard.caplock) {
			switch (this.type) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 9:
					return this.shiftKey;
				default:
					return this.startKey;
			}
		} else {
			switch (this.type) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
					return this.shiftKey;
				default:
					return this.startKey;
			}
		}


	}



	onClick() {

		if (typeof this.cb !== 'function') {
			console.warn('Callback is not a function.');
			return;
		}
		switch (this.type) {
			case 1:
			case 2:
			case 4:
			case 6:
				this.cb({
					value: this.shiftKey
				});
				break;
			case 3:
				this.game.keyboard.caplock = this.game.keyboard.caplock !== undefined ? !this.game.keyboard.caplock : true;
				this.cb({
					value: this.shiftKey
				});
				break;
			case 5:
				this.game.keyboard.shift = this.game.keyboard.shift !== undefined ? !this.game.keyboard.shift : true;
				this.cb({
					value: this.shiftKey
				});
				break;
			case 9:
				if (this.game.keyboard.shift) {
					this.game.keyboard.shift = false;
					this.cb({
						value: this.shiftKey
					});
				} else if (this.game.keyboard.caplock) {
					this.cb({
						value: this.shiftKey
					});
				} else {
					this.cb({
						value: this.startKey
					});
				}
				break;
			default:
				if (this.game.keyboard.shift) {
					this.game.keyboard.shift = false;
					this.cb({
						value: this.shiftKey
					});
				} else {
					this.cb({
						value: this.startKey
					});
				}
				break;

		}

	}

}
