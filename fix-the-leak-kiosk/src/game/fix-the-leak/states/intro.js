import Phaser from 'phaser';
import val from './../variables';

class Intro extends Phaser.State {
	constructor() {
		super();
		this.panel;
		this.button;
		this.animateDuration = 1000;
		this.level = 1;
	}

	init() {
		this.gameType = 0;
		this.w = this.game.width;
		this.h = this.game.height;

		// Mobile
		if (this.game.width <= 500) {
			this.window_height = 160;
			this.washstand_height = 245;
            this.washstand_bottom = 50;
            this.margin_right = 10;

            this.panelWidth = 380;
			this.panelHeight = 445;
			this.panelPadding = 25;
			this.panel_left = (this.w - this.panelWidth) / 2;
			this.panel_margin_top = 10;

			this.start_width = 160;
			this.start_left = this.panel_left;
			this.start_margin_top = 30;

			this.font_1 = '51px';
			this.font_2 = '22px';
			this.font_3 = '18px';
			this.text_margin_top = 40;

			this.margin_text = 30;
			this.rank_margin_top = 0;


        }

        //  860 x 410
        if (this.game.width > 500 && this.game.width <= 820 && this.game.height < 800) {
            this.window_height = 185;
            this.washstand_height = 250;
            this.washstand_bottom = 130;
            this.margin_right = 150;

            this.panelWidth = 365;
			this.panelHeight = 435;
			this.panelPadding = 25;
			this.panel_left = 50;
			this.panel_margin_top = 20;


			this.start_width = 180;
			this.start_left = this.panel_left + this.panelWidth / 2 - this.start_width / 2;
			this.start_margin_top = 40;

			this.font_1 = '51px';
			this.font_2 = '22px';
			this.font_3 = '18px';

			this.text_margin_top = 40;
			this.margin_text = 30;
			this.rank_margin_top = 0;
        }

        // Tablet
        if (this.game.width > 500 && this.game.width <= 820 && this.game.height >= 800) {
            this.window_height = 280;
            this.washstand_height = 380;
            this.washstand_bottom = 200;
            this.margin_right = 60;

            this.panelWidth = 540;
			this.panelHeight = 640;
			this.panelPadding = 30;
			this.panel_left = 30;

			this.start_width = 220;
			this.start_left = this.panel_left + this.panelWidth / 2 - this.start_width / 2;
			this.panel_margin_top = 30;
			this.start_margin_top = 100;

			this.font_1 = '61px';
			this.font_2 = '32px';
			this.font_3 = '26px';

			this.text_margin_top = 50;
			this.margin_text = 45;
			this.rank_margin_top = 20;
        }

        // Windows
        if (this.game.width > 820) {
            this.window_height = 350;
            this.washstand_height = 482;
            this.washstand_bottom = 220;
            this.margin_right = 60;

            this.panelWidth = 660;
			this.panelHeight = 780;
			this.panelPadding = 45;
			this.panel_left = 70;

			this.start_width = 280;
			this.start_left = this.panel_left + this.panelWidth / 2 - this.start_width / 2;
			this.panel_margin_top = 50;
			this.start_margin_top = 100;

			this.font_1 = '71px';
			this.font_2 = '42px';
			this.font_3 = '28px';

			this.text_margin_top = 60;
			this.margin_text = 50;
			this.rank_margin_top = 30;
        }

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
		this._drawWindow();
		this.loadLeaderboard();
		this.panel = this._drawPanel();


		this._drawPond();
		this.button = this._drawStartButton();
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
		// let bg = this.add.sprite(this.world.centerX, this.world.centerY, 'background');

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

	_drawWindow() {
		let cc = this.add.sprite(0, 0, 'window');
		// cc.anchor.setTo(0.5);
		let window_width = this.window_height * 45 / 60;
		cc.height = this.window_height;
		cc.width = window_width;
		cc.top = this.h - (this.washstand_bottom + this.washstand_height + 30) - this.window_height;;
		cc.x = this.w - this.margin_right - window_width / 2;
		return cc;
	}

	_drawWashstand() {
		let cc = this.add.sprite(0, 0, 'washstand');
		this.washstand_top = this.h - this.washstand_height - this.washstand_bottom;
		cc.top = this.washstand_top;

		let washstand_width = this.washstand_height * 162 / 208;

		cc.height = this.washstand_height;
		cc.width = washstand_width;
		cc.x = this.w - this.margin_right - washstand_width / 2;

		return cc;
	}

	_drawPond() {
		let cc = this.add.group();
		let pond = this.add.sprite(0, 0, 'bg-water');
		pond.anchor.setTo(0.5, 0.5);

		let pond1 = this.add.sprite(-150, 20, 'bg-water');
		pond1.anchor.setTo(0.5, 0.5);
		pond1.scale.setTo(0.5, 0.5);

		let animator = this.add.sprite(-20, -155, 'animators');

		animator.animations.add('walk');

		animator.animations.play('walk', 15, true);

		animator.anchor.setTo(0.5);

		animator.scale.setTo(-1, 1);

		cc.addChild(pond);
		cc.addChild(pond1);
		cc.addChild(animator);

		cc.x = this.w - 120;
		cc.y = this.h - 60;

		if (this.game.height > 820) {
			var temp_scale = 1 * this.h / (300 * 2);
			cc.scale.setTo(temp_scale);
			cc.x = this.w - 180;

        }
        if (this.game.width < 500) {
			var temp_scale = 2 * this.h / (300 * 5);
			cc.scale.setTo(temp_scale);
			cc.x = this.w - 100;
			cc.y = this.h - 10;

        }


		return cc;
	}

	_drawPanel() {
		let panelHeight = this.panelHeight,
			panelPadding = this.panelPadding;

		let diff_padding = 15;
		let cc = this.add.group();
		let bg1 = this.add.tileSprite(0, 0, this.panelWidth, panelHeight, 'black');
		let bg2 = this.add.tileSprite(0, 0, this.panelWidth - (panelPadding * 2), panelHeight - (panelPadding * 2 + diff_padding * 2), 'blue-green');
		bg2.left = panelPadding;
		bg2.top = panelPadding + diff_padding;


		const style = {
			font: '600 ' + this.font_1 + ' AvenirNextLTPro-UltLtCn',
			fill: '#000000',
			wordWrap: true,
			wordWrapWidth: this.panelWidth,
			align: 'center'
		};

		const style2 = {
			font: '600 ' + this.font_2 + ' AvenirNextLTPro-BoldCn',
			fill: '#000000',
			wordWrap: true,
			wordWrapWidth: this.panelWidth,
			align: 'center'
		};

		let xText = (this.panelWidth - (panelPadding * 2)) / 2;
		let text = this.add.text(xText, this.text_margin_top, 'FIX THE LEAK', style);
		let text2 = this.add.text(xText, 2 * this.text_margin_top, 'HALL OF FAME', style2);

		text.anchor.set(0.5);
		text2.anchor.set(0.5);
		bg2.addChild(text);
		bg2.addChild(text2);

		cc.addChild(bg1);
		cc.addChild(bg2);
		cc.x = -350;
		cc.y = this.panel_margin_top;
		cc.alpha = 1;

		let tween = this.add.tween(cc);
		tween.to({
			x: this.panel_left,
			alpha: 1
		}, this.animateDuration, Phaser.Easing.Cubic.InOut);
		tween.start();

		this.panelInside = bg2;

		return cc;

	}

	_drawStartButton() {
		// let cc = this.add.button(0, 0, 'start-button', this.actionOnClick.bind(this), this, 1, 0, 2);
		let cc = this.add.button(0, 0, 'start-button', this.actionOnClick.bind(this));
		// cc.anchor.setTo(0.5);
		cc.width = this.start_width;
		cc.height = this.start_width * 72 / 180;

		cc.left = this.start_left;
		cc.y = this.world.height + 100;

		let tween = this.add.tween(cc);
		tween.to({
			y: this.panelHeight + this.start_margin_top,
			alpha: 1
		}, this.animateDuration, Phaser.Easing.Circular.Out);
		tween.start();

		tween.onComplete.add(() => {
		});


		return cc;
	}

	loadLeaderboard() {
		var _self = this;
		const wordWrapWidth = (this.panelWidth - (this.panelPadding * 2)) / 2;
		const styleName = {
			font: '600 ' + this.font_3 + ' AvenirNextLTPro-DemiCn',
			fill: '#000000',
			wordWrap: false,
			wordWrapWidth: wordWrapWidth,
			align: 'left'
		};

		const styleScore = {
			font: '600 ' + this.font_3 + ' AvenirNextLTPro-DemiCn',
			fill: '#000000',
			wordWrap: false,
			wordWrapWidth: wordWrapWidth,
			align: 'right'
		};
		let panelLeader = this.add.group();
		panelLeader.width = this.panelWidth;
		panelLeader.top = 120;

		var fix_email = localStorage.getItem('fix_user_email');
		fetch(val.baseUrl + 'api/v1/ranks', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: fix_email,
                type: this.gameType
			})
		}).then((response) => {
			return response.json();
		}).then((json) => {
			json['tops'].forEach((element, index) => {
				let groupScore = this.add.group();
				let text = this.add.text(0, index * this.margin_text, element.name, styleName);
				text.left = 60;
				let score = this.add.text(0, index * this.margin_text, element.score + 'PTS', styleScore);
				score.right = this.panelWidth - (this.panelPadding * 2) - 60;
				groupScore.addChild(text);
				groupScore.addChild(score);
				groupScore.alpha = 0;
				groupScore.y = this.rank_margin_top;
				panelLeader.addChild(groupScore);


				let tween = this.add.tween(groupScore);
				tween.to({
					alpha: 1
				}, 500, Phaser.Easing.Linear.In, true, this.animateDuration + index * 100);
			}, this);

			let current_height = _self.h;
			let my_rank;

			if (json['rank'] >= 0) {
				if (parseInt(current_height) < 800) {
					my_rank = this.add.text(0, 6 * this.margin_text + 10, 'YOUR PREVIOUS RANKING: ' + json['rank'], styleName);
				} else {

					my_rank = this.add.text(0, 7 * this.margin_text + 10, 'YOUR PREVIOUS RANKING: ' + json['rank'], styleName);
				}

				my_rank.alpha = 0;

				my_rank.x = (this.panelWidth - (this.panelPadding * 2)) / 2 - my_rank.width / 2;
				panelLeader.addChild(my_rank);

				let tween_rank = this.add.tween(my_rank);
				tween_rank.to({
					alpha: 1
				}, 500, Phaser.Easing.Linear.In, true, this.animateDuration + 6 * 100);
			}
			this.panelInside.addChild(panelLeader);
		}).catch((ex) => {
			if (process.env.NODE_ENV === 'development')
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
			this.state.start('game', true, false, this.level, 0, 20);
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