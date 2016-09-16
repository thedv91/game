import Phaser from 'phaser';
import val from './../variables';
import GamePlay from './game';


class GameOver extends Phaser.State {
	constructor() {
		super();
		this.panelHeight = 60;
		this.endGameWidth = 350;
	}

	init(score, time) {
		//this.gameType == 1 => arcade
		//this.gameType == 0 => kiosk
		this.gameType = 1;
		this.score_game = score;
		this.time_play = time;

		this.w = this.game.width;
		this.h = this.game.height;

		// Mobile
		if (this.game.width <= 500) {
			this.pannel_margin_left = 30;
			this.intro_font = 22;
			this.ok_width = 125;
			this.button_dis = 80;
			this.score_margin_top = 30;

			this.font_score = 27;
			this.submit_width = 125;
			this.animatorWidth = 210;
        }

        //  860 x 410
        if (this.game.width > 500 && this.game.width <= 820 && this.game.height < 800) {
			this.pannel_margin_left = 40;
			this.intro_font = 27;
			this.ok_width = 130;
			this.button_dis = 100;
			this.score_margin_top = 40;
			this.font_score = 27;
			this.submit_width = 125;
			this.animatorWidth = 290;
        }

        // Tablet
        if (this.game.width > 500 && this.game.width <= 820 && this.game.height >= 800) {
			this.pannel_margin_left = 40;
			this.intro_font = 40;
			this.ok_width = 170;
			this.button_dis = 100;
			this.score_margin_top = 60;
			this.font_score = 32;
			this.submit_width = 170;
			this.animatorWidth = 385;
        }

        // Windows
        if (this.game.width > 820) {
			this.pannel_margin_left = 75;
			this.intro_font = 50;
			this.ok_width = 230;
			this.button_dis = 100;
			this.score_margin_top = 75;
			this.font_score = 40;
			this.submit_width = 205;
			this.animatorWidth = 502;
        }
	}
	create() {
		this._drawBackground();
		this.bgOverlay = this._drawOverlay();
		this._drawPanel();
		this._drawAnimator();
		this._drawAnimatorSwing();
		this._drawEndGame();
		this.pauseGame = this._drawPauseGame();

	}

	_drawAnimatorSwing() {
		let cc = this.add.sprite(0, 0, 'animators');

		cc.animations.add('walk');

		cc.animations.play('walk', 15, true);
		cc.scale.setTo(.6);

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
		cc.y = -this.panelHeight;
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

		const panelWidth = this.game.width - 2 * this.pannel_margin_left,
			overlayHeight = this.game.height - this.panelHeight,
			panelHeight = overlayHeight - 50;

		let cc = this.add.group();
		cc.x = -this.game.width;
		cc.alpha = 0;
		cc.width = this.game.width;
		let bg = this.add.sprite(this.pannel_margin_left, this.panelHeight + 25, 'pause');
		bg.width = panelWidth;
		bg.height = panelHeight;
		bg.alpha = 0.9;


		const style = {
			font: '600 ' + this.intro_font + 'px AvenirNextLTPro-HeavyCn',
			fill: '#000000',
			align: 'center'
		};


		const text2 = this.add.text(this.game.width / 2, panelHeight / 3 + this.panelHeight + 25, 'GOING TO THE MENU \nWILL END THE GAME', style);
		text2.anchor.setTo(0.5);

		// End Game Btn
		this.endGameBtn = this.add.button(this.game.width / 2 - this.button_dis, panelHeight / 3 + text2.height + this.panelHeight + 40 + 1.3 * this.intro_font, 'end-game', this.actionEndGameClick.bind(this), this, 1, 0, 2);
		this.endGameBtn.anchor.setTo(0.5);
		this.endGameBtn.alpha = 1;
		this.endGameBtn.lock = true;

		// Continue Btn
		this.continueBtn = this.add.button(this.game.width / 2 + this.button_dis, panelHeight / 3 + text2.height + this.panelHeight + 40 + 1.3 * this.intro_font, 'continue', this.actionContinueClick.bind(this), this, 1, 0, 2);
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
		cc.top = this.game.height;

		let tween = this.add.tween(cc);
		tween.to({
			alpha: 0.8,
			top: this.panelHeight
		}, 500, Phaser.Easing.Bounce.Out, true);

		return cc;
	}

	_drawAnimator() {
		let cc = this.add.sprite(0, 0, 'animator-end');
		cc.anchor.setTo(0.5);
		cc.scale.setTo(this.animatorWidth / 502);
		cc.bottom = this.game.height;
		cc.left = 0;
		return cc;
	}

	_drawEndGame() {
		let cc = this.add.group();
		cc.width = this.endGameWidth;

		let txtScore = this.createText(cc._width / 2, 0, 'TIME:', {
			font: '600 ' + this.font_score + 'px AvenirNextLTPro-HeavyCn',
			fill: '#FFFFFF',
			stroke: '#000000',
			strokeThickness: 3
		});
		txtScore.anchor.setTo(0.5);

		let totalScore = this.createText(cc._width / 2, 60, this.time_play + 's', {
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

		this.endGameHeight = 40;

		this.nameInput = this.createInput(0, 140, this.endGameWidth, this.endGameHeight);

		if (localStorage.getItem('fix_user_name')) {
            this.nameInput.canvasInput.value(localStorage.getItem('fix_user_name'));
        } else {
            this.nameInput.canvasInput.value("");
        }

		//this.nameInput.canvasInput.value('');

		let txtEmail = this.createText(cc._width / 2, 210, 'EMAIL:', {
			fill: '#46c6f2'
		});

		txtEmail.anchor.setTo(0.5);

		this.emailInput = this.createInput(0, 230, this.endGameWidth, this.endGameHeight);

		if (localStorage.getItem('fix_user_email')) {
            this.emailInput.canvasInput.value(localStorage.getItem('fix_user_email'));
        } else {
            this.emailInput.canvasInput.value('');
        }


		let button = this.add.button(cc._width / 2, 320, 'submit-button', this.actionSubmitOnClick.bind(this));
		button.anchor.setTo(0.5);

		button.scale.setTo(this.submit_width / 204);

		cc.addChild(txtScore);
		cc.addChild(totalScore);
		cc.addChild(txtName);
		cc.addChild(this.nameInput);
		cc.addChild(txtEmail);
		cc.addChild(this.emailInput);
		cc.addChild(button);
		cc.centerX = this.game.width / 2;
		//cc.centerY = this.game.height / 3;
		cc.y = this.panelHeight + this.score_margin_top;
		// cc.scale.setTo(0);
		return cc;

	}

	createText(x = 0, y = 0, txt, options = {}) {
		let style = {
			font: '600 ' + this.font_score + 'px AvenirNextLTPro-HeavyCn',
			fill: '#000000',
			wordWrap: true,
			wordWrapWidth: 200,
			align: 'center'
		};

		let text = this.add.text(x, y, txt, Object.assign({}, style, options));
		return text;
	}


	createInput(x, y, input_width, input_height) {
		var bmd = this.add.bitmapData(input_width, 50);
		var myInput = this.game.add.sprite(x, y, bmd);


		myInput.canvasInput = new CanvasInput({
			canvas: bmd.canvas,
			font: '18px Arial',
			fill: '#000',
			fontWeight: 'bold',
			width: input_width - 40,
			height: input_height,
			padding: 8,
			borderWidth: 0,
			borderColor: '#000',
			height: 20,
			borderRadius: 6,
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
			console.log(json);
		}).catch((ex) => {
			console.log('parsing failed', ex);
		});
	}

}

export default GameOver;