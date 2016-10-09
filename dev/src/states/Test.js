/*
 * Test state
 */
import Keyboard from './../objects/Keyboard';

export default class Test extends Phaser.State {

	init() {
		// TODO: Stub
		this.game.keyboard = this.game.keyboard || {};
		this.keyboard = new Keyboard(this.game, this.handleClick.bind(this));
	}

	create() {		
		this.keyboard.draw();		
		// TODO: Stub
	}

	update() {
		// TODO: Stub
	}

	render() {
		// TODO: Stub
	}

	shutdown() {
		// TODO: Stub
	}

	handleClick(e) {		
		this.keyboard.hidden();
	}

}
