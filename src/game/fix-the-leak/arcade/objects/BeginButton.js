/*
 * BeginButton
 */

export default class BeginButton extends Phaser.Button {

	constructor(game, x, y, callback) {
		super(game, x, y, 'begin-button', callback, null, 1, 0, 2);
	}

}
