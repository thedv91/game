import Phaser from 'phaser';

class GameOver extends Phaser.State {
	constructor() {
		super();
		this.panelHeight = 60;
		this.endGameWidth = 300;

	}

	init(score,time) {
		this.score_game = score;
		this.time_play = time;
	}
	create() {
		this._drawBackground();
		this.bgOverlay = this._drawOverlay();
		this._drawPanel();
		this._drawAnimator();
		this._drawEndGame();
		this.pauseGame = this._drawPauseGame();
		
	}

	loadRender() {

	}

	loadUpdate() {

	}

	paused() {

	}

	pauseUpdate() {

	}

	preload() {

	}

	preRender() {

	}

	render() {

	}

	resize() {

	}

	resumed() {

	}

	shutdown() {

	}

	update() {

	}

	/**
	 * Custom function
	 */
	 _drawBackground() {
		let bg = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
		bg.anchor.setTo(0.5, 0.5);
		bg.scale.setTo(1, 1);
		return bg;
	}

	_drawPanel() {
		let cc = this.add.tileSprite(0, 0, this.game.width, this.panelHeight, 'blue');
		cc.y = -this.panelHeight;
		this.menuButton = this.add.button(0, this.panelHeight / 2, 'menu-button', this.actionMenuOnClick.bind(this), this, 1, 0, 2);
		this.menuButton.scale.setTo(0.6);
		this.menuButton.anchor.setTo(0.5);
		this.menuButton.right = this.game.width - this.menuButton.offsetX;
		this.menuButton.lock = false;

		const style = {
			font: '600 38px AvenirNextLTPro-UltLtCn',
			fill: '#FFFFFF',
			wordWrap: true,
			wordWrapWidth: this.game.width,
			align: 'center'
		};
		let text = this.add.text(this.game.width / 2, this.panelHeight / 2, 'FIX THE LEAK', style);
		text.anchor.setTo(0.5);
		cc.addChild(text);
		cc.addChild(this.menuButton);

		let tween = this.add.tween(cc);
		tween.to({
			y: 0
		}, 500, Phaser.Easing.Bounce.Out, true);

		tween.onComplete.add(() => {
			this.menuButton.lock = false;
		});

		return cc;
	}

	actionMenuOnClick() {

		if (!this.menuButton.lock) {
			this.menuButton.lock = true;
			let tween = this.add.tween(this.pauseGame);
			tween.to({
				x: 0,
				alpha: 1
			}, 1000, Phaser.Easing.Exponential.Out, true);

			tween.onComplete.add(() => {
				this.menuButton.lock = false;
				this.time.events.pause();
			});
		}

	}

	_drawPauseGame() {

		const panelWidth = this.game.width - 100,
			overlayHeight = this.game.height - this.panelHeight,
			panelHeight = overlayHeight - 50;

		let cc = this.add.group();
		cc.x = -this.game.width;
		cc.alpha = 0;
		let bg = this.add.tileSprite(50, this.panelHeight + 25, panelWidth, panelHeight, 'white');
		bg.alpha = 0.9;


		const style = {
			font: '600 27px AvenirNextLTPro-HeavyCn',
			fill: '#000000',
			wordWrap: true,
			wordWrapWidth: panelWidth - 200,
			align: 'center'
		};

	
		const text2 = this.add.text(panelWidth / 2, 150, 'GOING TO THE MENU \nWILL END THE GAME', style);
		text2.anchor.setTo(0.5);

		// End Game Btn
		this.endGameBtn = this.add.button(this.game.width / 2 - 100, this.game.height / 2, 'end-game', this.actionEndGameClick.bind(this), this, 1, 0, 2);
		this.endGameBtn.anchor.setTo(0.5);
		this.endGameBtn.alpha = 1;
		this.endGameBtn.lock = true;

		// Continue Btn
		this.continueBtn = this.add.button(this.game.width / 2 + 100, this.game.height / 2, 'continue', this.actionContinueClick.bind(this), this, 1, 0, 2);
		this.continueBtn.anchor.setTo(0.5);
		this.continueBtn.alpha = 1;
		this.continueBtn.lock = true;

		cc.addChild(bg);
		bg.addChild(text2);
		cc.addChild(this.endGameBtn);
		cc.addChild(this.continueBtn);

		return cc;
	}

	actionEndGameClick() {

		let tween_pause = this.add.tween(this.pauseGame);


		tween_pause.to({
			y: -100,
			alpha: 0
		}, 30, Phaser.Easing.Cubic.InOut, true);

		tween_pause.onComplete.add(() => {

			this.state.start('intro');
		});
	}

	actionContinueClick(){
		let tween_pause = this.add.tween(this.pauseGame);


		tween_pause.to({
			x: 0,
			alpha: 0
		}, 1000, Phaser.Easing.Cubic.InOut, true);

		tween_pause.onComplete.add(() => {
			this.time.events.resume();
		});	
	}

	_drawOverlay() {
		let cc = this.add.tileSprite(0, this.panelHeight, this.game.width, this.game.height - this.panelHeight, 'black');
		cc.alpha = 0.8;
		cc.top = this.game.height;

		let tween = this.add.tween(cc);
		tween.to({
			alpha: 0.8,
			top: this.panelHeight
		}, 500, Phaser.Easing.Bounce.Out, true);

		return cc;
	}

	_drawAnimator() {
		let cc = this.add.sprite(0, 0, 'animator');
		cc.anchor.setTo(0.5);
		cc.bottom = this.game.height - 20;
		cc.left = 20;
		return cc;
	}

	_drawEndGame() {
		let cc = this.add.group();
		cc.width = this.endGameWidth;

		let txtScore = this.createText(cc._width / 2, 0, 'TIME:', {
			font: '600 27px AvenirNextLTPro-HeavyCn',
			fill: '#FFFFFF',
			stroke: '#000000',
			strokeThickness: 3
		});
		txtScore.anchor.setTo(0.5);

		let totalScore = this.createText(cc._width / 2, 60, this.time_play+'s', {
			font: '600 70px AvenirNextLTPro-HeavyCn',
			fill: '#FFFFFF',
			stroke: '#000000',
			strokeThickness: 6
		});
		totalScore.anchor.setTo(0.5);

		let txtName = this.createText(cc._width / 2, 120, 'NAME:', {
			fill: '#46c6f2'
		});
		txtName.anchor.setTo(0.5);
		this.nameInput = this.createInput(0, 140, {
			placeHolder: '',
			width: this.endGameWidth
		});

		let txtEmail = this.createText(cc._width / 2, 210, 'EMAIL:', {
			fill: '#46c6f2'
		});
		txtEmail.anchor.setTo(0.5);
		this.emailInput = this.createInput(0, 230, {
			placeHolder: '',
			width: this.endGameWidth
		});

		let button = this.add.button(cc._width / 2, 320, 'submit-button', this.actionSubmitOnClick.bind(this), this, 1, 0, 2);
		button.anchor.setTo(0.5);
		button.scale.setTo(0.8);

		cc.addChild(txtScore);
		cc.addChild(totalScore);
		cc.addChild(txtName);
		cc.addChild(this.nameInput);
		cc.addChild(txtEmail);
		cc.addChild(this.emailInput);
		cc.addChild(button);
		cc.centerX = this.game.width / 2;
		cc.centerY = this.game.height / 2;
		// cc.scale.setTo(0);
		return cc;

	}

	createText(x = 0, y = 0, txt, options = {}) {
		let style = {
			font: '600 27px AvenirNextLTPro-HeavyCn',
			fill: '#000000',
			wordWrap: true,
			wordWrapWidth: 200,
			align: 'center'
		};

		let text = this.add.text(x, y, txt, Object.assign({}, style, options));
		return text;
	}

	createInput(x = 0, y = 0, options = {}) {
		Object.assign
		let myInput = this.game.add.inputField(x, y, Object.assign({}, {
			font: '18px Arial',
			fill: '#212121',
			fontWeight: 'bold',
			width: 150,
			padding: 8,
			borderWidth: 1,
			borderColor: '#000',
			height: 20,
			borderRadius: 6,
			type: Fabrique.InputType.text
		}, options));

		return myInput;
	}

	actionSubmitOnClick() {
		/*let tween = this.add.tween(this.panelEndGame.scale);
		tween.to({
			x: 0,
			y: 0
		}, 300, Phaser.Easing.Quadratic.Out, true);

		tween.onComplete.add(() => {

		});*/

		fetch(val.baseUrl + 'api/v1/fix-the-leak', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				score: 340,
				name: this.nameInput.value,
				email: this.emailInput.value,
			})
		}).then((response) => {
			return response.json();
		}).then((json) => {
			console.log(json);
		}).catch((ex) => {
			console.log('parsing failed', ex);
		});
	}

}


export default GameOver;