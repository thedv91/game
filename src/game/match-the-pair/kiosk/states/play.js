import { Log } from 'utils/Log';
import BoxScore from './../../utils/objects/BoxScore';
import BeginButton from './../../utils/objects/BeginButton';

import _ from 'lodash';

class Play extends Phaser.State {

	constructor(game) {
		super(game);

		this.clickContinueGame = this.clickContinueGame.bind(this);
	}

	init(level) {
		this.level = level || 1;
		this.time = 0;
		this.moves = 0;
		this.noMatch = false;
		this.firstClick = null;
		this.secondClick = null;
		this.enableClickMenu = false;
		this.gamePlay = false;
		this.timeCounter = 0;
		this.LevelData = _.find(this.game.LevelData, { level: this.level });
	}
	create() {
		let game = this.game;
		let initBg, w = this.game.width;
		// Config for panel
		if (game.width <= 810) {
			this.panel_height = 57;
		} else {
			this.panel_height = 90;
		}


		initBg = this.initBackground();

		let p1 = new Promise((resolve, reject) => {
			if (this.level === 1) {
				window.setTimeout(() => {
					this.initGame();
					this.introPanel = this.createIntro();
					resolve(1);
				}, 200);
			} else {
				window.setTimeout(() => {
					this.initGame();
					resolve(1);
				}, 200);
			}
		});

		p1.then(res => {
			this.pauseGamePanel = this.drawPauseGame();
			this.panelUpLevel = this._drawUpLevel();
		});

		//this.game.state.start('win', true, false, 10, 100);


	}

	resize() {
		let w = game.width, h = game.height,
			bg_h, bg_w, menu_bg, tree_play, margin_left = this.margin_left, number_col = this.LevelData.number_col, number_row = this.LevelData.number_row,
			TILE_SIZE, margin_top, ground, text, menuBtn, timeBg;

		// BG
		if (1208 / w >= 814 / h) {
			bg_h = h;
			bg_w = 1208 * h / 814;
		} else {
			bg_w = w;
			bg_h = 814 * w / 1208;
		}
		menu_bg.x = w / 2;
		menu_bg.y = h;
		menu_bg.width = bg_w;
		menu_bg.height = bg_h;
		menu_bg.anchor.setTo(0.5, 1);

		// Tree
		tree_play.x = w / 2 - tree_play.width / 2;
		tree_play.y = h - tree_play.height - 30;


		// Resize main Game
		this.margin_left = w / 2 - number_col * TILE_SIZE / 2;

		if (h < 1000) {

			this.margin_top = h / 2 - number_row * TILE_SIZE / 2 - 200;


			if ((number_row == 6 && number_col == 5) || (number_row == 5 && number_col == 6)) {
				this.margin_top = h / 2 - number_row * TILE_SIZE / 2 - 60;

			}

			if (number_row == 6 && number_col == 6) {
				this.margin_top = h / 2 - number_row * TILE_SIZE / 2 - 60;
			}

		} else {

			this.margin_top = h / 2 - number_row * TILE_SIZE / 2;
		}



		for (let i = 0; i < this.LevelData.number_row; i++) {
			for (let j = 0; j < this.LevelData.number_col; j++) {
				let idx = i * this.LevelData.number_col + j;

				movies[idx].x = this.margin_left + j * TILE_SIZE + TILE_SIZE / 2;
				movies[idx].y = this.margin_top + i * TILE_SIZE;
			}
		}

		// Ground scale
		ground.width = w;
		text.x = w / 2;
		menuBtn.x = w - 160;
		timeBg.x = w;

	}

	initBackground() {

		let game = this.game, bg_w, bg_h, w = this.game.width, h = this.game.height,
			menu_bg, wally_margin_bottom, wally_scale, wally_swing,
			tree_play, ground, panel_height = this.panel_height, text, menuBtn;

		if (1208 / w >= 814 / h) {
			bg_h = h;
			bg_w = 1208 * h / 814;
		} else {
			bg_w = w;
			bg_h = 814 * w / 1208;
		}
		menu_bg = game.add.image(w / 2, h, "play_bg");
		menu_bg.width = bg_w;
		menu_bg.height = bg_h;
		menu_bg.anchor.setTo(0.5, 1);


		// Add wally swing

		if (h >= 768) {
			wally_margin_bottom = 400;
			wally_scale = 0.7;
		} else {
			wally_margin_bottom = 305;
			wally_scale = 0.5;
		}

		wally_swing = game.add.sprite(w / 2 - 10, h - wally_margin_bottom, 'wally-animation');
		wally_swing.scale.setTo(wally_scale);
		wally_swing.animations.add('swing');
		wally_swing.animations.play('swing', 20, true);

		// add Tree
		tree_play = game.cache.getImage('bg_play');
		tree_play = game.add.image(w / 2 - tree_play.width / 2, h - tree_play.height - this.game.screenData.tree_margin_bottom, 'bg_play');

		// Add top menu
		// Here we create the ground.
		let platforms = game.add.group();
		ground = platforms.create(0, 0, 'ground');
		ground.width = w;
		ground.height = panel_height;


		// Add text "Match the pairs" on top screen
		var style = { font: "bold 36px AvenirNextLTProHeavyCn", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
		if (game.width <= 500) {
			text = this.game.add.text(10, panel_height / 4, "MATCH THE PAIRS", {
				font: "bold 28px AvenirNextLTProHeavyCn",
				fill: "#fff",
				boundsAlignH: "center",
				boundsAlignV: "middle"
			});
			// text.anchor.set(1,0.5);
		} else {

			text = this.game.add.text(this.game.width / 2, panel_height / 2, "MATCH THE PAIRS", style);
			text.anchor.set(0.5);

		}

		// Addd menu button
		this.menuBtn = this.game.add.button(this.game.world.width - 160, panel_height / 2 - 18, 'menu-btn', this.clickMenu.bind(this), this);
		this.menuBtn.input.useHandCursor = true;
	}

    /*
     * Update time
     * */
	updateTime() {
		this.time = ((this.timeCounter += this.game.time.elapsedMS) / 1000).toFixed(1);
		this.text_level_number.setScore(this.level);
		this.text_moves_number.setScore(this.moves);
		this.text_time_number.setScore(this.time + 's');
	}

    /*
     * Main Game Play
     * */
	initGamePlay(row, col) {

		let game = this.game;
		let TILE_SIZE = this.TILE_SIZE;
		let total_card = row * col;
		this.cards = [];
		this.images = [];
		this.movies = [];
		this.total_open = 0;


		for (var i = 0; i < total_card / 2; i++) {
			this.images.push(this.game.add.sprite(0, 0, '' + i));
			this.images.push(this.game.add.sprite(0, 0, '' + i));
		}

		this.shuffle(this.images);


		for (var i = 0; i < row; i++) {
			for (var j = 0; j < col; j++) {
				var idx = i * col + j;
				// cards[idx] = this.game.add.sprite(left + j*TILE_SIZE, top + i*TILE_SIZE,'back');
				this.cards[idx] = this.game.add.sprite(0, 0, 'back');
				this.cards[idx].anchor.setTo(0.5, 0.5);
				this.cards[idx].scale.x = 1;
				this.cards[idx].scale.setTo(TILE_SIZE / this.cards[idx]._frame.width);

				this.images[idx].scale.setTo(TILE_SIZE / this.images[idx]._frame.width);
				this.images[idx].anchor.setTo(0.5, 0.5);


				this.movies[idx] = this.game.add.sprite(this.margin_left + j * TILE_SIZE + TILE_SIZE / 2, this.margin_top + i * TILE_SIZE);
				// movies[idx] = game.add.sprite(j*TILE_SIZE, margin_top + i*TILE_SIZE);
				// movies[idx].x = j*TILE_SIZE;
				this.movies[idx].addChild(this.images[idx]);
				this.movies[idx].addChild(this.cards[idx]);
				this.movies[idx].events.onInputDown.add(this.doClick, this);
				this.movies[idx].inputEnabled = true;
				this.movies[idx].index = idx;

				this.movies[idx].input.useHandCursor = true;

				this.game.physics.arcade.enable(this.movies[idx]);
				this.game.physics.arcade.enable(this.images[idx]);
				this.game.physics.arcade.enable(this.cards[idx]);
			}
		}


	}

	flipCard(sprite, pointer) {
		sprite.up = sprite.up || false;
        /*if (click) {
            click = false;*/
		let tween = this.game.add.tween(sprite.scale).to({
			x: 0
		}, 100, Phaser.Easing.Linear.None, true);
		tween.onComplete.add(() => {
			let back = sprite.getChildAt(1);
			if (sprite.up) {
				back.visible = true;
			} else {
				back.visible = false;
			}

			this.flipFake(sprite);
		});
		// }

	}

	flipFake(sprite) {
		let tween = this.game.add.tween(sprite.scale).to({
			x: 1
		}, 200, Phaser.Easing.Linear.None, true);
		tween.onComplete.add(() => {
			this.click = true;
			sprite.up = !sprite.up;
		}, this);
	}

	flipFakeCorrect(sprite) {
		let tween = this.game.add.tween(sprite.scale).to({
			x: 0
		}, 200, Phaser.Easing.Linear.None, true);
		tween.onComplete.add(() => {
			this.click = true;
			sprite.up = !sprite.up;
		}, this);
	}

	doClick(sprite) {
		let w = this.game.width, h = this.game.height;

		if (this.firstClick == null) {
			this.moves++;
			this.text_moves_number.setScore(this.moves);

			this.flipCard(sprite);

			this.firstClick = sprite.index;
		}
		else if (this.secondClick == null) {

			this.moves++;
			this.text_moves_number.setScore(this.moves);
			this.flipCard(sprite);

			this.secondClick = sprite.index;
			if (this.secondClick == this.firstClick) {
				this.secondClick = null;
				this.firstClick = null;
				return;
			}


			if (this.images[this.firstClick].key === this.images[this.secondClick].key) {

				setTimeout(() => {
					this.flipFakeCorrect(this.movies[this.firstClick]);
					this.flipFakeCorrect(this.movies[this.secondClick]);

					// firstClick = null; secondClick = null;
				}, 800);
				setTimeout(() => {
					this.firstClick = null;
					this.secondClick = null;
				}, 1000);

				this.total_open = this.total_open + 2;

				// we have a match
				this.score += 1;


				if (this.total_open == this.LevelData.number_col * this.LevelData.number_row) {

					setTimeout(() => {
						this.cards = [];
						this.images = [];
						this.movies = [];
						this.game.state.start('win');

					}, 1000);

				}
			}
			else {
				// no match
				//score -= 5;
				this.noMatch = true;
			}
		}
		else {
			return; // don't allow a third click, instead wait for the update loop to flip back after 0.5 seconds
		}

		this.clickTime = sprite.game.time.totalElapsedSeconds();
		// sprite.visible = false;
		// images[sprite.index].visible = true;
	}

	shuffle(o) {
		for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}

    /*
     *  Manager Time and Move
     * */
	managerTime() {

		this.is_playing = 1;
		let w = this.game.width, h = this.game.height;

		let style = { font: "24px AvenirNextLTProHeavyCn", fill: "#3f5405", boundsAlignH: "center", boundsAlignV: "top" };
		let style_bottom = { font: "bold 40px AvenirNextLTProHeavyCn", fill: "#3f5405", boundsAlignH: "center", boundsAlignV: "top" };

		let manager_time = this.game.add.group();
		manager_time.x = 0;
		manager_time.y = h - 70;

		this.text_level_number = new BoxScore(this.game, 0, 0, 'LEVEL', this.level);
		this.text_moves_number = new BoxScore(this.game, this.text_level_number.group.width + this.game.screenData.tabs, 0, 'MOVES', this.moves);
		this.text_time_number = new BoxScore(this.game, this.text_level_number.group.width + this.text_moves_number.group.width + this.game.screenData.tabs * 2, 0, 'TIME', this.time + 's');

		manager_time.add(this.text_level_number.group);
		manager_time.add(this.text_moves_number.group);
		manager_time.add(this.text_time_number.group);

		let temp = (this.text_level_number.group.width + this.text_moves_number.group.width + this.text_time_number.group.width) / 2;
		manager_time.x = this.game.width / 2 - temp;
		manager_time.alpha = 0;
		this.game.add.tween(manager_time).to({ alpha: 1 }, 1000, Phaser.Easing.Bounce.Out, true);

	}

    /*
     *  Show intructions Game
     * */

	createIntro() {
		let cc = this.add.group();
		let panel_height = this.panel_height;
		let w = this.game.width, h = this.game.height;
		let bg = this.game.add.sprite(this.game.screenData.panel_margin_left, panel_height + 25, 'pause');
		bg.width = this.game.width - this.game.screenData.panel_margin_left * 2;
		bg.height = this.game.height - panel_height - 50;
		cc.alpha = 0;
		cc.visible = false;

		//Text Bold
		let text_bold = { font: this.game.screenData.bold_font + "px AvenirNextLTProHeavyCn", fill: "#3f5405", align: "center" };
		let instructions = this.game.add.text(this.game.width / 2, this.game.height / 2 - this.game.screenData.intro_margin_top, 'INSTRUCTIONS', text_bold);
		instructions.anchor.set(0.5, 1);

		let lineHR = this.game.add.tileSprite(w / 2, h / 2 - this.game.screenData.intro_margin_top, instructions.width, 2, 'green-dark');
		lineHR.anchor.setTo(0.5, 1);

		// Add text in center pause game
		let style_level = { font: "bold " + this.game.screenData.intro_font + "px AvenirNextLTProHeavyCn", fill: "#3f5405", align: "center" };
		let text_pause = this.game.add.text(w / 2, h / 2 - this.game.screenData.intro_margin_top + 20, "TAP ON THE BOXES \nTO FIND THE MATCHING PAIRS IN" + "\nTHE FEWEST NUMBER OF MOVES \nAND THE SHORTEST TIME POSSIBLE", style_level);
		text_pause.anchor.set(0.5, 0);
		text_pause.lineSpacing = 1;

		this.okBtn = this.game.add.button(w / 2, h / 2 - this.game.screenData.intro_margin_top + text_pause.height + 20 + this.game.screenData.button_ok_margin, 'ok', '', '');
		this.okBtn.anchor.set(0.5);
		this.okBtn.onInputDown.add(this._startGameClick, this);
		this.okBtn.input.useHandCursor = true;
		cc.add(bg);
		cc.add(instructions);
		cc.add(lineHR);
		cc.add(text_pause);
		cc.add(this.okBtn);

		let tween = this.add.tween(cc);

		tween.to({
			alpha: 1,
			visible: true
		}, 500, Phaser.Easing.Linear.Out, true);

		tween.onComplete.add(() => {
			// this.level = 1;
			// this.score_game = 0;
			// this.time_play = 0;

			// this.state.start('intro');
		});

		return cc;

		//this.game.add.tween(this.okBtn).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.Out, true);
	}

	initGame() {
		this.enableClickMenu = true;
		// this.okBtn.destroy();
		// this.menuIntro.destroy();
		// this.instructions.destroy();
		// this.lineHR.destroy();
		// this.text_pause.destroy();

		//this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTime, this);

		this.managerTime();
		let w = this.game.width, h = this.game.height;

		if (this.game.width < 500) {
			this.TILE_SIZE = (5 * w / 6) / this.LevelData.number_col;
		} else {
			this.TILE_SIZE = (3 * h / 7) / this.LevelData.number_row;
		}


		this.margin_left = w / 2 - this.LevelData.number_col * this.TILE_SIZE / 2;

		if (h < 1000) {

			this.margin_top = h / 2 - this.LevelData.number_row * this.TILE_SIZE / 2 - 120;


			if ((this.LevelData.number_col == 6 && this.LevelData.number_col == 5) || (this.LevelData.number_col == 5 && this.LevelData.number_col == 6)) {

				this.margin_top = h / 2 - this.LevelData.number_row * this.TILE_SIZE / 2 - 90;


			}

			if (this.LevelData.number_row == 6 && this.LevelData.number_col == 6) {
				this.margin_top = h / 2 - this.LevelData.number_row * this.TILE_SIZE / 2 - 100;
			}

		} else {

			this.margin_top = h / 2 - this.LevelData.number_row * this.TILE_SIZE / 2;
		}

		if ((this.margin_top - this.TILE_SIZE / 2) <= this.panel_height) {
			this.margin_top = this.panel_height + this.TILE_SIZE / 2 + 10;
		}

		this.initGamePlay(this.LevelData.number_row, this.LevelData.number_col);


	}

    /*
     * Click Menu button
     * */
	clickMenu() {

		// this._showUpLevel(1, 2, 3);
		// return;
		if (!this.enableClickMenu)
			return false;
		this.enableClickMenu = false;
		//this.game.time.events.pause();

		Log.info('actionMenuOnClick');
		if (!this.menuBtn.lock) {
			this.menuBtn.lock = true;
			this.gamePause = true;
			this.gamePlay = false;
			let tween = this.add.tween(this.pauseGamePanel);
			tween.to({
				alpha: 1,
				visible: true
			}, 500, Phaser.Easing.Linear.In, true);

			tween.onComplete.add(() => {
				//this.menuButton.lock = true;
				//this.time.events.pause();
			});
		}


	}

	drawPauseGame() {
		let w = this.game.width, h = this.game.height;
		// Then add the menu
		let cc = this.add.group();
		cc.visible = false;
		let bg = this.add.sprite(this.game.screenData.panel_margin_left, this.panel_height + 25, 'pause');
		bg.width = this.game.width - this.game.screenData.panel_margin_left * 2;
		bg.height = this.game.height - this.panel_height - 50;

		//this.game.add.tween(this.menu).to({ y: this.panel_height + 25 }, 1000, Phaser.Easing.Bounce.Out, true);

		// Add text in center pause game
		let style_level = {
			font: "bold " + this.game.screenData.menu_font + "px AvenirNextLTProHeavyCn",
			fill: "#455912",
			boundsAlignH: "center",
			boundsAlignV: "middle"
		};
		let text_pause = this.game.add.text(w / 2, h / 2, "GOING TO THE MENU \nWILL END THE GAME", style_level);
		text_pause.anchor.set(0.5, 1);

		//this.game.add.tween(text_pause).to({ y: h / 2 }, 1000, Phaser.Easing.Bounce.Out, true);

		// Add two button
		let endGameButton = this.game.add.button(w / 2 - 160, h / 2 + 50, 'end-game', this.clickEndGame);
		// endGame.scale.setTo(0.25);
		endGameButton.input.useHandCursor = true;
		//this.game.add.tween(endGameButton).to({ y: h / 2 + 50 }, 1000, Phaser.Easing.Bounce.Out, true);

		this.continueGameButton = this.game.add.button(w / 2, h / 2 + 50, 'continue', this.clickContinueGame);
		// continueGame.scale.setTo(0.25);
		this.continueGameButton.input.useHandCursor = true;
		cc.add(bg);
		cc.add(text_pause);
		cc.add(endGameButton);
		cc.add(this.continueGameButton);
		cc.alpha = 0;
		cc.visible = false;
		return cc;
	}

	_drawUpLevel(level = 2, score = null) {
		const panelWidth = this.game.width - (2 * this.game.screenData.panel_margin_left),
			overlayHeight = this.game.height - this.game.screenData.panel_height,
			panelHeight = overlayHeight - 50;

		let cc = this.add.group();
		cc.x = 0;
		cc.alpha = 0;
		cc.visible = false;
		cc.width = this.game.width;
		cc.height = this.game.height;
		let bg = this.add.sprite(this.game.screenData.panel_margin_left, this.game.screenData.panel_height + 25, 'pause');
		bg.width = panelWidth;
		bg.height = panelHeight;
		bg.alpha = 0.9;


		const style = {
			font: '500 ' + this.game.screenData.intro_font + 'px AvenirNextLTPro-HeavyCn',
			fill: '#455912',
			align: 'center',
			fontWeight: 'bold'
		};

		const upLevel = this.level + 1;
		const text1 = this.add.text(this.game.width / 2, panelHeight / 3 + this.game.screenData.panel_height, 'Level ' + upLevel, style);
		text1.anchor.setTo(0.5);
		let lineHR = this.add.tileSprite(this.game.width / 2, panelHeight / 3 + this.game.screenData.panel_height + this.game.screenData.cLine, text1.width, 2, 'black');
		lineHR.anchor.setTo(0.5);

		this.beginButton = new BeginButton(this.game, this.game.width / 2, panelHeight / 3 + this.game.screenData.panel_height + 70 + 1.5 * this.game.screenData.intro_font, this.nextLevelClick.bind(this));
		this.add.existing(this.beginButton);
		this.beginButton.anchor.setTo(0.5);
		this.beginButton.alpha = 1;
		this.beginButton.lock = true;

		//let button_scale = this.game.screenData.ok_width / 124;
		this.beginButton.scale.setTo(1);

		cc.addChild(bg);
		cc.addChild(text1);
		cc.addChild(lineHR);
		cc.addChild(this.beginButton);

		return cc;
	}

	nextLevelClick() {

	}

	clickContinueGame() {
		console.log('aaaa');
		let tween = this.add.tween(this.pauseGamePanel);

		tween.to({
			alpha: 0,
			visible: false
		}, 500, Phaser.Easing.Linear.Out, true);

		tween.onComplete.add(() => {
			this.enableClickMenu = true;
			this.gamePlay = true;
			this.menuBtn.lock = false;
		});
	}

	clickEndGame() {
		// remove All image card
		this.cards = [];
		this.images = [];
		this.moves = 0;
		this.time = 0;
		this.score = 0;

		// game.state.start('menu');
		this.game.stateTransition.to('menu');
	}

	update() {
		if (this.gamePlay)
			this.updateTime();

		if (this.noMatch) {
			if (this.game.time.totalElapsedSeconds() - this.clickTime > 1) {
				this.noMatch = false;

				this.flipCard(this.movies[this.firstClick]);
				this.flipCard(this.movies[this.secondClick]);

				this.firstClick = null; this.secondClick = null;
			}
		}


	}

	toWinStage() {
		this.cards = [];
		this.images = [];
		// We start the win state
		this.game.state.start('win', true, true, this.moves, this.time);
	}

	_startGameClick() {
		let tween = this.add.tween(this.introPanel);

		tween.to({
			alpha: 0,
			visible: false
		}, 500, Phaser.Easing.Linear.Out, true);

		tween.onComplete.add(() => {
			this.gamePlay = true;
			// this.level = 1;
			// this.score_game = 0;
			// this.time_play = 0;

			// this.state.start('intro');
		});
	}

	_showUpLevel(level, score_game, time_play) {

		//this.menuButton.lock = true;
		let tween = this.add.tween(this.panelUpLevel);
		tween.to({
			alpha: 1,
			visible: true
		}, 500, Phaser.Easing.Linear.In, true);

		tween.onComplete.add(() => {
			//this.okButton.lock = false;
		});

	}
}

export default Play;