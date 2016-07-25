import Phaser from 'phaser';
import val from './../variables';

class Intro extends Phaser.State {
	constructor() {
		super();
		this.panel;
		this.button;
		this.panelWidth = 300;
		this.panelHeight = 400;
		this.panelPadding = 20;
		this.animateDuration = 1000;
		this.level = 1;
	}
	init() {

	}
	create() {

		this.level = 1;
		this.score_game = 0;
		this.time_play = 0;


		// this.panel = this.add.group();
		// this.panel.x = this.world.centerX;
		// this.panel.y = -400;
		// this.panel.z = 10;
		// this.panel.scale.setTo(0, 0);

		// let bgPanel = this.add.image(0, 0, 'panel');
		// bgPanel.anchor.setTo(0.5, 0.5);


		// let closeButton = this.add.button(bgPanel.width / 2, -110, 'close-button', this.closePanel.bind(this));
		// closeButton.anchor.setTo(1, 0.5);
		// this.panel.addChild(bgPanel);
		// this.panel.addChild(closeButton);

		// this.world.sort('z');

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
		this._drawBackground();
		this._drawWashstand();
		this._drawPond();
		this._drawWindow();
		this._drawAnimator();
		this.panel = this._drawPanel();
		this.button = this._drawStartButton();

		this.loadLeaderboard();
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

	_drawWashstand() {
		let cc = this.add.sprite(0, 0, 'washstand');
		cc.anchor.setTo(0.5, 0.5);
		cc.scale.setTo(1, 1);
		cc.top = 300;
		cc.right = this.world._width - 50;
		return cc;
	}

	_drawPond() {

		let cc = this.add.group();
		let pond = this.add.sprite(0, 0, 'bg-water');
		pond.anchor.setTo(0.5, 0.5);

		let pond1 = this.add.sprite(-150, 20, 'bg-water');
		pond1.anchor.setTo(0.5, 0.5);
		pond1.scale.setTo(0.5, 0.5);
		cc.addChild(pond);
		cc.addChild(pond1);
		cc.x = this.world._width - 140;
		cc.y = this.world._height - 60;
		return cc;
	}

	_drawWindow() {
		let cc = this.add.sprite(0, 0, 'window');
		cc.anchor.setTo(0.5);
		cc.scale.setTo(2.5, 2.5);
		cc.top = 50;
		cc.right = this.world._width - 50;
		return cc;
	}

	_drawAnimator() {
		let cc = this.add.sprite(0, 0, 'animator');
		cc.anchor.setTo(0.5);
		cc.scale.setTo(-1, 1);
		cc.bottom = this.world._height - 50;
		cc.right = this.world._width - 270;
		return cc;
	}

	_drawPanel() {
		let panelHeight = this.panelHeight,
			panelPadding = this.panelPadding;

		let cc = this.add.group();
		let bg1 = this.add.tileSprite(0, 0, this.panelWidth, panelHeight, 'black');
		let bg2 = this.add.tileSprite(0, 0, this.panelWidth - (panelPadding * 2), panelHeight - (panelPadding * 2), 'blue-green');
		bg2.left = panelPadding;
		bg2.top = panelPadding;


		const style = {
			font: '600 51px AvenirNextLTPro-UltLtCn',
			fill: '#000000',
			wordWrap: true,
			wordWrapWidth: this.panelWidth,
			align: 'center'
		};

		const style2 = {
			font: '600 22px AvenirNextLTPro-BoldCn',
			fill: '#000000',
			wordWrap: true,
			wordWrapWidth: this.panelWidth,
			align: 'center'
		};

		let xText = (this.panelWidth - (panelPadding * 2)) / 2;
		let text = this.add.text(xText, 40, 'FIX THE LEAK', style);
		let text2 = this.add.text(xText, 90, 'HALL OF FAME', style2);

		text.anchor.set(0.5);
		text2.anchor.set(0.5);
		bg2.addChild(text);
		bg2.addChild(text2);

		cc.addChild(bg1);
		cc.addChild(bg2);
		cc.x = -350;
		cc.y = 50;
		cc.alpha = 1;

		let tween = this.add.tween(cc);
		tween.to({
			x: 50,
			alpha: 1
		}, this.animateDuration, Phaser.Easing.Cubic.InOut);
		tween.start();

		this.panelInside = bg2;

		return cc;

	}

	_drawStartButton() {
		let cc = this.add.button(0, 0, 'start-button', this.actionOnClick.bind(this), this, 1, 0, 2);
		cc.anchor.setTo(0.5);
		cc.left = 120;
		cc.y = this.world.height + 100;

		let tween = this.add.tween(cc);
		tween.to({
			y: this.world.height - 100,
			alpha: 1
		}, this.animateDuration, Phaser.Easing.Circular.Out);
		tween.start();

		tween.onComplete.add(() => {
		});


		return cc;
	}

	loadLeaderboard() {
		const wordWrapWidth = (this.panelWidth - (this.panelPadding * 2)) / 2;
		const styleName = {
			font: '600 18px AvenirNextLTPro-DemiCn',
			fill: '#000000',
			wordWrap: false,
			wordWrapWidth: wordWrapWidth,
			align: 'left'
		};

		const styleScore = {
			font: '600 18px AvenirNextLTPro-DemiCn',
			fill: '#000000',
			wordWrap: false,
			wordWrapWidth: wordWrapWidth,
			align: 'right'
		};
		let panelLeader = this.add.group();
		panelLeader.width = this.panelWidth;
		panelLeader.top = 120;
		fetch(val.baseUrl + 'api/v1/fix-the-leak', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			return response.json();
		}).then((json) => {
			json.forEach((element, index) => {
				let groupScore = this.add.group();
				let text = this.add.text(0, index * 30, element.name, styleName);
				text.left = 20;
				let score = this.add.text(0, index * 30, element.score + 'PTS', styleScore);
				score.right = this.panelWidth - (this.panelPadding * 2) - 20;
				groupScore.addChild(text);
				groupScore.addChild(score);
				groupScore.alpha = 0;
				panelLeader.addChild(groupScore);

				let tween = this.add.tween(groupScore);
				tween.to({
					alpha: 1
				}, 500, Phaser.Easing.Linear.In, true, this.animateDuration + index * 100);
			}, this);
			this.panelInside.addChild(panelLeader);
		}).catch((ex) => {
			console.log('parsing failed', ex);
		});
	}

	actionOnClick() {
		let tweenPanel = this.add.tween(this.panel);
		let tweenButton = this.add.tween(this.button);

		tweenPanel.to({
			x: -350,
			alpha: 0
		}, this.animateDuration, Phaser.Easing.Cubic.InOut, true);

		tweenButton.to({
			y: this.world._height + 100,
			alpha: 0
		}, this.animateDuration, Phaser.Easing.Cubic.InOut, true);

		tweenButton.onComplete.add(() => {
			this.state.start('game', true, false, this.level, this.score_game, this.time_play);
		});

	}

	closePanel() {
		let self = this;
		let tween = this.add.tween(this.panel);
		tween.to({
			y: -400,
			alpha: 0
		}, this.animateDuration, Phaser.Easing.Bounce.Out);
		tween.start();

		tween.onComplete.add(function () {
            self.button.inputEnabled = true;
            self.button.input.inputEnabled = true;
        });
	}
}


export default Intro;