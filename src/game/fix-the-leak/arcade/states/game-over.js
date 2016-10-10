import Phaser from 'phaser';
import val from './../variables';
import GamePlay from './game';
import { getInitData } from './../utils/ScreenType';
import Keyboard from './../objects/Keyboard';

class GameOver extends Phaser.State {
	constructor() {
		super();
		this.panelHeight = 60;
		this.endGameWidth = 350;
	}

	init(score, time) {
		//this.gameType == 1 => arcade
		//this.gameType == 0 => kiosk
		this.screenData = getInitData(this.game);
		this.gameType = 1;
		this.score_game = score;
		this.time_play = time;

		this.w = this.game.width;
		this.h = this.game.height;

	}
	create() {
		this._drawBackground();
		this.bgOverlay = this._drawOverlay();
		this._drawPanel();
		this._drawAnimator();
		this._drawAnimatorSwing();
		this._drawEndGame();
		this.pauseGame = this._drawPauseGame();
		this.nameKeyboard = new Keyboard(this.game, 0, 0, this.handleNameClick.bind(this));
		this.emailKeyboard = new Keyboard(this.game, 0, 0, this.handleEmailClick.bind(this));
	}

	handleClick(e, input) {
		switch (e.type) {
			case 1:
				if (input.canvasInput._value)
					input.canvasInput.value(input.canvasInput._value.slice(0, -1));
				break;
			case 3:
			case 4:
			case 5:
				break;
			case 2:
			case 6:
				input.canvasInput.value(input.canvasInput._value + ' ');
				break;
			default:
				input.canvasInput.value(input.canvasInput._value + e.value);
				break;
		}

	}

	handleNameClick(e) {
		this.handleClick(e, this.nameInput);
	}

	handleEmailClick(e) {
		this.handleClick(e, this.emailInput);
	}



	_drawAnimatorSwing() {
		let cc = this.add.sprite(0, 0, 'animators');

		cc.animations.add('walk');

		cc.animations.play('walk', 15, true);
		cc.scale.setTo(this.screenData.animatorScale);
		cc.bottom = this.game.height - 20;
		cc.left = 0;
		return cc;
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

		if (1420 / this.w >= 1420 / this.h) {
            var bg_h = this.h;
            var bg_w = 1420 * this.h / 1420;
        } else {
            var bg_w = this.w;
            var bg_h = 1420 * this.w / 1420;
        }

        let bg = this.game.add.image(this.w / 2, this.h, "background");
        bg.width = bg_w;
        bg.height = bg_h;
        bg.anchor.setTo(0.5, 1);


		return bg;
	}

	_drawPanel() {
		let cc = this.add.tileSprite(0, 0, this.game.width, this.panelHeight, 'blue');
		//cc.y = -this.panelHeight;
		this.menuButton = this.add.button(0, this.panelHeight / 2, 'menu-button', this.actionMenuOnClick.bind(this));
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

		let text;
		if (this.w <= 500) {
			text = this.add.text(50, 10, 'FIX THE LEAK', style);
			text.y = (this.panelHeight - text.height) / 2;
		} else {
			text = this.add.text(this.game.width / 2, this.panelHeight / 2, 'FIX THE LEAK', style);
			text.anchor.setTo(0.5);
		}



		cc.addChild(text);
		cc.addChild(this.menuButton);

		// let tween = this.add.tween(cc);
		// tween.to({
		// 	y: 0
		// }, 500, Phaser.Easing.Bounce.Out, true);

		// tween.onComplete.add(() => {
		// 	this.menuButton.lock = false;
		// });

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

		const panelWidth = this.game.width - 2 * this.screenData.pannel_margin_left,
			overlayHeight = this.game.height - this.panelHeight,
			panelHeight = overlayHeight - 50;

		let cc = this.add.group();
		cc.x = -this.game.width;
		cc.alpha = 0;
		cc.width = this.game.width;
		let bg = this.add.sprite(this.screenData.pannel_margin_left, this.panelHeight + 25, 'pause');
		bg.width = panelWidth;
		bg.height = panelHeight;
		bg.alpha = 0.9;


		const style = {
			font: '600 ' + this.screenData.intro_font + 'px AvenirNextLTPro-HeavyCn',
			fill: '#000000',
			align: 'center'
		};


		const text2 = this.add.text(this.game.width / 2, panelHeight / 3 + this.panelHeight + 25, 'GOING TO THE MENU \nWILL END THE GAME', style);
		text2.anchor.setTo(0.5);

		// End Game Btn
		this.endGameBtn = this.add.button(this.game.width / 2 - this.screenData.button_dis, panelHeight / 3 + text2.height + this.panelHeight + 40 + 1.3 * this.screenData.intro_font, 'end-game', this.actionEndGameClick.bind(this), this, 1, 0, 2);
		this.endGameBtn.anchor.setTo(0.5);
		this.endGameBtn.alpha = 1;
		this.endGameBtn.lock = true;

		// Continue Btn
		this.continueBtn = this.add.button(this.game.width / 2 + this.screenData.button_dis, panelHeight / 3 + text2.height + this.panelHeight + 40 + 1.3 * this.screenData.intro_font, 'continue', this.actionContinueClick.bind(this), this, 1, 0, 2);
		this.continueBtn.anchor.setTo(0.5);
		this.continueBtn.alpha = 1;
		this.continueBtn.lock = true;

		cc.addChild(bg);
		cc.addChild(text2);
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

	actionContinueClick() {
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

		// cc.top = this.game.height;
		// let tween = this.add.tween(cc);
		// tween.to({
		// 	alpha: 0.8,
		// 	top: this.panelHeight
		// }, 500, Phaser.Easing.Bounce.Out, true);

		return cc;
	}

	_drawAnimator() {
		let cc = this.add.sprite(0, 0, 'animator-end');
		cc.anchor.setTo(0.5);
		cc.scale.setTo(this.screenData.animatorWidth / 502);
		cc.bottom = this.game.height;
		cc.left = 0;
		return cc;
	}

	_drawEndGame() {
		let cc = this.add.group();
		cc.width = this.screenData.inputWidth;
		const gHeight = this.screenData.inputHeight + this.screenData.endgamePadding;
		const inputHeight = this.screenData.inputHeight;
		const endgamePadding = this.screenData.endgamePadding;

		let txtScore = this.createText(cc._width / 2, 0, 'TIME:', {
			font: '600 ' + this.screenData.font_score + 'px AvenirNextLTPro-HeavyCn',
			fill: '#FFFFFF',
			stroke: '#000000',
			strokeThickness: 3
		});
		txtScore.anchor.setTo(0.5);

		let totalScore = this.createText(cc._width / 2, gHeight, this.time_play + 's', {
			font: '600 70px AvenirNextLTPro-HeavyCn',
			fill: '#FFFFFF',
			stroke: '#000000',
			strokeThickness: 6
		});
		totalScore.anchor.setTo(0.5);

		let txtName = this.createText(cc._width / 2, gHeight * 2, 'NAME:', {
			fill: '#46c6f2'
		});

		txtName.anchor.setTo(0.5);

		this.nameInput = this.createInput(0, gHeight * 2 + endgamePadding, this.screenData.inputWidth, this.screenData.inputHeight, {
			onfocus: this.onNameForus.bind(this)
		});

		if (localStorage.getItem('fix_user_name')) {
            this.nameInput.canvasInput.value(localStorage.getItem('fix_user_name'));
        } else {
            this.nameInput.canvasInput.value("");
        }

		//this.nameInput.canvasInput.value('');

		let txtEmail = this.createText(cc._width / 2, gHeight * 3 + inputHeight, 'EMAIL:', {
			fill: '#46c6f2'
		});

		txtEmail.anchor.setTo(0.5);

		this.emailInput = this.createInput(0, gHeight * 4, this.screenData.inputWidth, this.screenData.inputHeight, {
			onfocus: this.onEmailForus.bind(this)
		});

		if (localStorage.getItem('fix_user_email')) {
            this.emailInput.canvasInput.value(localStorage.getItem('fix_user_email'));
        } else {
            this.emailInput.canvasInput.value('');
        }


		let button = this.add.button(cc._width / 2, gHeight * 6, 'submit-button', this.actionSubmitOnClick.bind(this));
		button.anchor.setTo(0.5);

		button.scale.setTo(this.screenData.submitButtonScale);

		cc.addChild(txtScore);
		cc.addChild(totalScore);
		cc.addChild(txtName);
		cc.addChild(this.nameInput);
		cc.addChild(txtEmail);
		cc.addChild(this.emailInput);
		cc.addChild(button);
		cc.centerX = this.game.width / 2;
		//cc.centerY = this.game.height / 3;
		cc.y = this.panelHeight + this.screenData.score_margin_top;
		// cc.scale.setTo(0);
		return cc;

	}

	onNameForus(e) {
		console.log(this.nameKeyboard.keyboard);
		if (this.emailKeyboard.keyboard.visible)
			this.emailKeyboard.hidden();
		switch (this.screenData.mapScreen) {
			case 1:
				break;
			default:
				this.nameKeyboard.show(this.game.width / 2, this.nameInput.worldPosition.y + 40);
				break;
		}

	}

	onEmailForus(e) {
		if (this.nameKeyboard.keyboard.visible)
			this.nameKeyboard.hidden();

		switch (this.screenData.mapScreen) {
			case 1:
				break;
			default:
				this.emailKeyboard.show(this.game.width / 2, this.emailInput.worldPosition.y + 40);
				break;
		}

	}

	createText(x = 0, y = 0, txt, options = {}) {
		let style = {
			font: '600 ' + this.screenData.font_score + 'px AvenirNextLTPro-HeavyCn',
			fill: '#000000',
			wordWrap: true,
			wordWrapWidth: 200,
			align: 'center'
		};

		let text = this.add.text(x, y, txt, Object.assign({}, style, options));
		return text;
	}


	createInput(x, y, input_width, input_height, data = {}) {
		var bmd = this.add.bitmapData(input_width, input_height);
		var myInput = this.game.add.sprite(x, y, bmd);

		myInput.canvasInput = new CanvasInput({
			canvas: bmd.canvas,
			fontSize: 18,
			fontFamily: 'Arial',
			fill: '#000',
			fontWeight: 'bold',
			padding: 8,
			width: input_width - 20,
			height: input_height - 18,
			borderWidth: 0,
			borderColor: '#000',
			borderRadius: 6,
			boxShadow: '1px 1px 0px #fff',
			innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
			onfocus: data.onfocus
		});

		myInput.inputEnabled = true;
		myInput.input.useHandCursor = true;
		myInput.events.onInputUp.add((sprite) => this.inputFocus(sprite));

		return myInput;
	}

	inputFocus(sprite) {
		sprite.canvasInput.focus();
	}

	validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	actionSubmitOnClick() {
		var flag = true;

		var user_name = this.nameInput.canvasInput.value();
		var user_email = this.emailInput.canvasInput.value();

		if (user_name.trim() == "" || user_name.trim() == undefined) {
            this.nameInput.canvasInput.backgroundColor('#ffc6c6');
            flag = false;
        } else {
            this.nameInput.canvasInput.backgroundColor('#fff');
        }

        if (user_email.trim() == "" || user_email.trim() == undefined || !this.validateEmail(user_email.trim())) {
            this.emailInput.canvasInput.backgroundColor('#ffc6c6');
            flag = false;
        } else {
            this.emailInput.canvasInput.backgroundColor('#fff');
        }

        if (flag == false) {
            return false;
        }


		fetch(val.baseUrl + 'api/v1/fix-the-leak', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				score: this.time_play,
				name: user_name,
				email: user_email,
				type: this.gameType
			})
		}).then((response) => {
			localStorage.setItem('fix_user_name', user_name);
			localStorage.setItem('fix_user_email', user_email);
			this.state.start('intro');
			// return response.json();

		}).then((json) => {
			if (process.env.NODE_ENV === 'development')
				console.log(json);
		}).catch((ex) => {
			if (process.env.NODE_ENV === 'development')
				console.log('parsing failed', ex);
		});
	}

}

export default GameOver;