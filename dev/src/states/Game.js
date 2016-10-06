/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Logo from '../objects/Logo';
import Demo from '../objects/Demo';
import Test from '../objects/Test';
//import Keyboard from '../plugins/Keyboard';


export default class Game extends Phaser.State {

	create() {
		console.log(CanvasInput);
		// TODO: Replace this with really cool game code here :)
		this.game.plugin = this.game.plugin || {};
		//this.game.plugin.Keyboard = this.game.plugins.add(Keyboard);
		//this.game.add.plugin(Fabrique.Plugins.InputField);		
		const {centerX: x, centerY: y} = this.world;
		//this.add.existing(new Logo(this.game, x, y));
		//this.add.existing(new Demo(this.game, x, y, this.actionOnClick));


		this.myInput = this.createInput(this.game.world.centerX, 50);
		this.myInput.anchor.set(0.5);
		this.myInput.canvasInput.value('Esto es la verga! :D');
		this.myInput.canvasInput.focus();
	}

	createInput(x, y) {
		var bmd = this.add.bitmapData(400, 50);
		var myInput = this.game.add.sprite(x, y, bmd);

		myInput.canvasInput = new CanvasInput({
			canvas: bmd.canvas,
			fontSize: 30,
			fontFamily: 'Arial',
			fontColor: '#212121',
			fontWeight: 'bold',
			width: 400,
			padding: 8,
			borderWidth: 1,
			borderColor: '#000',
			borderRadius: 3,
			boxShadow: '1px 1px 0px #fff',
			innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
			placeHolder: 'Enter message here...'
		});
		myInput.inputEnabled = true;
		myInput.input.useHandCursor = true;
		myInput.events.onInputUp.add(this.inputFocus, this);

		return myInput;
	}

	inputFocus(sprite) {
		sprite.canvasInput.focus();
	}

	actionOnClick() {
		const key = new this.game.plugin.Keyboard.draw();
	}

}
