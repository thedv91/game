import Phaser from 'phaser';
import val from './../variables';
import debugLayout from 'phaser-debug-layout';
import BgOverlay from '../objects/BgOverlay';
import OkButton from './../objects/OkButton';
import { getInitData } from './../utils/ScreenType';

export default class Game extends Phaser.State {
	constructor() {
		super();
		this.panelHeight = 60;
		this.endGameWidth = 300;
		this.drawPanelGlobal;

		this.text_score;
		this.time_play = 20;
		this.level = 1;
		this.score_game = 0;


	}

	init(level, score, time) {
		this.screenData = getInitData(this.game);
		this.level = level;
		this.score_game = score;
		this.time_play = time;
		this.screenData.smallScreen = false;

		this.w = this.game.width;
		this.h = this.game.height;


	}

	create() {
		var _self = this;
		this.drawPanelGlobal = this._drawPanel();

		this._drawBackground();
		this.bgOverlay = this._drawOverlay();

		this.map = this._drawPipes();

		this._drawAnimator();
		this._drawAnimatorSwing();
		this._drawScore();
		this.intro = this._drawIntroduction();
		this._drawPanel();
		this.pauseGame = this._drawPauseGame();		

		if (this.level == 1) {
			_self._showIntroGame();
		} else {

			for (var i = this.waters_group.length - 1; i >= 0; i--) {
				this.waters_group[i].visible = false;
			}
			setTimeout(function () {
				_self._startShowWater();
			}, 100);


			this.time.events.loop(Phaser.Timer.SECOND, this._updateTime, this);
			setTimeout(function () {
				_self.menuButton.lock = false;
			}, 600);


		}

	}

	loadRender() {

	}

	loadUpdate() {

	}

	paused() {
		// console.log(1)	;
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

	_initPoint() {
		let points = [{
			x: 480,
			y: 280
		}];
	}

	_updateTime() {

        this.time_play = this.time_play - 1;
        if (this.screenData.smallScreen) {
			this.text_score.setText('' + this.time_play + 's\t' + this.score_game);
        } else {
			this.text_score.setText('  ' + this.level + '\t' + this.time_play + 's\t' + this.score_game);
        }

        if (this.time_play == 0) {
			setTimeout(() => {
				this.state.start('game-over', true, false, this.score_game, this.time_play);
			}, 200);
        }

    }

	_drawScore() {
		var style_top = {
			font: '600 ' + this.screenData.font_score + 'px AvenirNextLTPro-HeavyCn',
			fill: "#fff",
			tabs: this.screenData.tabs
		};
		var style_under = {
			font: '600 ' + this.screenData.font_score + 'px AvenirNextLTPro-HeavyCn',
			fill: "#fff",
			tabs: this.screenData.tabs
		};

		if (this.screenData.smallScreen) {
			this.add.text(this.game.width / 2 + 40, this.game.height - 190, "LEVEL", style_top);
			this.text_score_top = this.add.text(this.game.width / 2 + 60, this.game.height - 150, this.level, style_under);

			this.add.text(this.game.width / 2, this.game.height - 100, 'TIME\tSCORE', style_top);
			this.text_score = this.add.text(this.game.width / 2, this.game.height - 70, '  ' + this.time_play + 's\t' + this.score_game, style_under);

		} else {

			this.add.text(this.game.width / 2, this.game.height - this.screenData.textNameMargin, 'LEVEL\tTIME\tSCORE', style_top);
			this.text_score = this.add.text(this.game.width / 2, this.game.height - this.screenData.scoreMargin, '  ' + this.level + '\t' + this.time_play + 's\t' + this.score_game, style_under);

		}
	}

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

	_drawOverlay() {
		//let cc = this.add.tileSprite(0, this.panelHeight, this.game.width, this.game.height - this.panelHeight, 'black');
		let cc = this.add.existing(new BgOverlay(this.game, 0, this.panelHeight, this.game.width, this.game.height - this.panelHeight));
		cc.alpha = 0.8;
		// cc.top = this.game.height;

		// let tween = this.add.tween(cc);
		// tween.to({
		// 	alpha: 0.8,
		// 	top: this.panelHeight
		// }, 500, Phaser.Easing.Bounce.Out, true);

		return cc;
	}

	_drawPipes() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		let layer;
		let scale_maps = this.screenData.scale_maps;
		let map = this.add.tilemap(this.screenData.map);
		map.addTilesetImage(this.screenData.pipes);
		map.addTilesetImage(this.screenData.water);

		layer = map.createLayer('Tile Layer 1');
		layer.fixedToCamera = false;
		layer.scale.setTo(scale_maps);
		layer.x = 0;
		layer.y = this.panelHeight;
		layer.resizeWorld();

		this.waters = this.game.add.group();
		Object.assign(this.waters.pivot, this.screenData.pivot);
		this.waters.enableBody = true;
		map.createFromObjects('Object Layer 1', this.screenData.gid, this.screenData.water, 0, true, false, this.waters);

		this.waters.callAll('animations.add', 'animations', 'spin');
		this.waters.callAll('animations.play', 'animations', 'spin', 15, true);
		this.waters.scale.setTo(scale_maps);
		this.waters_group = this.waters.children.map(function (e, index) {
			e.uniqueCheck = index;
			return e;
		});


		for (var i = this.waters_group.length - 1; i >= 0; i--) {
			this.waters_group[i].y = this.waters_group[i].y + this.panelHeight;
			this.waters_group[i].visible = false;
			this.waters_group[i].inputEnabled = true;
			this.waters_group[i].input.useHandCursor = true;

			this.waters_group[i].inputEnabled = true;

			this.waters_group[i].events.onInputDown.add(this._clickWater, this);
		}

		return map;
	}

	// Start show water for Game Play
	_startShowWater() {
		var rands = this.array_rand(this.waters_group, 3);
		this.waters_group[rands[0]].visible = true;
		this.waters_group[rands[1]].visible = true;
		this.waters_group[rands[2]].visible = true;
	}

	array_rand(input, num_req) {
		var indexes = [];
		var ticks = num_req || 1;
		var checkDuplicate = function (input, value) {
			var exist = false,
				index = 0,
				il = input.length;
			while (index < il) {
				if (input[index] === value) {
					exist = true;
					break;
				}
				index++;
			}
			return exist;
		};

		if (Object.prototype.toString.call(input) === '[object Array]' && ticks <= input.length) {
			while (true) {
				var rand = Math.floor((Math.random() * input.length));
				if (indexes.length === ticks) {
					break;
				}
				if (!checkDuplicate(indexes, rand)) {
					indexes.push(rand);
				}
			}
		} else {
			indexes = null;
		}

		return ((ticks == 1) ? indexes.join() : indexes);
	}

	// Click Water 
	_clickWater(sprite) {
		var _self = this;

		sprite.visible = false;
		this.score_game++;

		if (this.screenData.smallScreen) {
			this.text_score.setText('' + this.time_play + 's\t' + this.score_game);
		} else {
			this.text_score.setText('  ' + this.level + '\t' + this.time_play + 's\t' + this.score_game);
		}


		// Go to level 2 - 20
		// this.level = this.level + 1;


		/*// Go to level 3 - 45
		if(this.score_game == 45){
			this.level = this.level + 1;
            this.state.start('game', true, false, this.level, this.score_game,this.time_play);
		}

		// Go to level 4 - 75
		if(this.score_game == 75){
			this.level = this.level + 1;
            this.state.start('game', true, false, this.level, this.score_game,this.time_play);
		}

		// Go to level 5 - 110
		if(this.score_game == 110){
			this.level = this.level + 1;
            this.state.start('game', true, false, this.level, this.score_game,this.time_play);
		}

		// Go to submit score table - 150
		if(this.score_game == 150){
			this.time.events.pause();
			setTimeout(() => {
				this.state.start('game-over', true, false, this.score_game, this.time_play);
			}, 1000);
		}*/


		this._resetImg(sprite);
	}

	_resetImg(sprite) {
		this.waters_group = this.waters.children;

		var flag = true;
		var rand_idx = -1;
		while (flag) {
			rand_idx = Math.floor(Math.random() * (this.waters_group.length - 1));
			if (this.waters_group[rand_idx].visible == true || sprite.uniqueCheck == this.waters_group[rand_idx].uniqueCheck) {
				flag = true;
			} else {
				flag = false;
				this.waters_group[rand_idx].visible = true
			}
		}

	}

	_resetImg1() {
		this.waters_group = this.waters.children;

		var rand_idx = Math.floor(Math.random() * this.waters_group.length);
		if (this.waters_group[rand_idx].visible == true) {
			var rand_idx = Math.floor(Math.random() * this.waters_group.length);
			if (this.waters_group[rand_idx].visible == true) {
				var rand_idx = Math.floor(Math.random() * this.waters_group.length);
				this.waters_group[rand_idx].visible = true
			} else {
				this.waters_group[rand_idx].visible = true
			}
		} else {
			this.waters_group[rand_idx].visible = true
		}

	}

	_drawAnimator() {
		let cc = this.add.sprite(0, 0, 'animator-end');
		cc.anchor.setTo(0.5);
		cc.scale.setTo(this.screenData.animatorScale / 502);
		cc.bottom = this.game.height;
		cc.left = 0;
		return cc;
	}

	_drawAnimatorSwing() {
		let cc = this.add.sprite(0, 0, 'animators');

		cc.animations.add('walk');

		cc.animations.play('walk', 15, true);
		cc.scale.setTo(this.screenData.animatorScale);

		//cc.scale.setTo(this.screenData.animatorWidth / 250);
		cc.bottom = this.game.height - 20;
		cc.left = 0;
		return cc;
	}

	_drawIntroduction() {
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
			font: '500 ' + this.screenData.intro_font + 'px AvenirNextLTPro-HeavyCn',
			fill: '#000000',
			align: 'center',
			fontWeight: 'bold'
		};

		const styleGuide = {
			font: '500 ' + this.screenData.des_font + 'px AvenirNextLTPro-HeavyCn',
			fill: '#000000',
			align: 'center',
			fontWeight: 'bold'
		};

		const text1 = this.add.text(this.game.width / 2, panelHeight / 3 + this.panelHeight, 'INSTRUCTIONS', style);
		text1.anchor.setTo(0.5);
		let lineHR = this.add.tileSprite(this.game.width / 2, panelHeight / 3 + this.panelHeight + this.screenData.cLine, text1.width, 2, 'black');
		lineHR.anchor.setTo(0.5);

		const text2 = this.add.text(this.game.width / 2, panelHeight / 3 + text1.height + this.panelHeight + 15 + 1.3 * this.screenData.intro_font, 'TAP ON THE LEAKS TO FIX THEM. \nFIX AS MANY LEAKS AS YOU CAN \nWITHIN THE ALLOCATED TIME.', styleGuide);
		text2.anchor.setTo(0.5);

		this.okButton = new OkButton(this.game, this.game.width / 2, panelHeight / 3 + text2.height + this.panelHeight + 70 + 1.5 * this.screenData.intro_font, this.actionOkOnClick.bind(this));
		this.okButton = this.add.existing(this.okButton);
		this.okButton.anchor.setTo(0.5);
		this.okButton.alpha = 1;
		this.okButton.lock = true;

		let button_scale = this.screenData.ok_width / 124;
		this.okButton.scale.setTo(button_scale);

		cc.addChild(bg);
		cc.addChild(text1);
		cc.addChild(lineHR);
		cc.addChild(text2);
		cc.addChild(this.okButton);

		return cc;
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
			this.level = 1;
			this.score_game = 0;
			this.time_play = 0;

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
			this.menuButton.lock = false;
		});
	}

	_drawPanel() {
		let cc = this.add.tileSprite(0, 0, this.game.width, this.panelHeight, 'blue');
		cc.y = -this.panelHeight;
		this.menuButton = this.add.button(0, this.panelHeight / 2, 'menu-button', this.actionMenuOnClick.bind(this));
		this.menuButton.scale.setTo(0.6);
		this.menuButton.anchor.setTo(0.5);
		this.menuButton.right = this.game.width - this.menuButton.offsetX;
		this.menuButton.lock = true;

		const style = {
			font: '600 38px AvenirNextLTPro-UltLtCn',
			fill: '#FFFFFF',
			wordWrap: true,
			wordWrapWidth: this.game.width,
			align: 'center'
		};

		let text;
		if (this.screenData.smallScreen) {

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
			this.menuButton.lock = true;
		});

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

	_showPanelEndGame() {
		this.map.destroy;

		/*let tween_map = this.add.tween(this._drawPipes);
		
		tween_map.to({
			x: this.world.width,
		}, 1000, Phaser.Easing.Cubic.Out, true);

		tween_map.onComplete.add(() => {


			let tween = this.add.tween(this.panelEndGame.scale);
			tween.to({
				x: 1,
				y: 1
			}, 1000, Phaser.Easing.Cubic.Out, true);

			tween.onComplete.add(() => {

			});

		});*/


	}


	_showIntroGame() {

		this.menuButton.lock = true;
		let tween = this.add.tween(this.intro);
		tween.to({
			x: 0,
			alpha: 1
		}, 1000, Phaser.Easing.Exponential.Out, true);

		tween.onComplete.add(() => {
			this.okButton.lock = false;
		});

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
				this.menuButton.lock = true;
				this.time.events.pause();
			});
		}

	}

	actionOkOnClick() {
		if (!this.okButton.lock) {
			this.okButton.lock = true;
			let tween = this.add.tween(this.intro);
			tween.to({
				x: this.game.width,
				alpha: 0
			}, 1000, Phaser.Easing.Cubic.Out, true);

			tween.onComplete.add(() => {
				this.intro.x = -this.game.width;
				this.menuButton.lock = false;

				//this.paused = false;
				this.time.events.loop(Phaser.Timer.SECOND, this._updateTime, this);
				this.time.events.resume();
				this._startShowWater();
			});
		}
	}

	actionSubmitOnClick() {
		let tween = this.add.tween(this.panelEndGame.scale);
		tween.to({
			x: 0,
			y: 0
		}, 300, Phaser.Easing.Quadratic.Out, true);

		tween.onComplete.add(() => {

		});

		// fetch(val.baseUrl + 'api/v1/fix-the-leak', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Accept': 'application/json',
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		score: 340,
		// 		name: this.nameInput.value,
		// 		email: this.emailInput.value,
		// 	})
		// }).then((response) => {
		// 	return response.json();
		// }).then((json) => {
		// 	console.log(json);
		// }).catch((ex) => {
		// 	console.log('parsing failed', ex);
		// });
	}
}