/*
 * Demo
 */

export default class Demo extends Phaser.Button {

	constructor(game, x, y, callback) {
		super(game, x, y, 'button', callback);

		this.anchor.set(0.5);
		this.inputEnabled = true;
		// TODO:
		//   1. Edit constructor parameters accordingly.
		//   2. Adjust object properties.
	}

	init() {
		console.log(1);
	}

}
