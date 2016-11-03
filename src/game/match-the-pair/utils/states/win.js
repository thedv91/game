import { Log } from 'utils/Log';
import BoxScore from './../objects/BoxScore';
import val from './../../config/variables';

class Win extends Phaser.State {

	init(moves, time) {
		this.moves = moves || 0;
		this.time = time || 0;
	}

	create() {
		const _self = this;
		let game = this.game, w = this.game.width, h = this.game.height;
		this.enableClickMenu = true;

		this.initBackground();

		this.menu_bg = this.game.add.image(w / 2, h, 'play_bg');

		let thank_you = this.game.add.text(w / 2, h, 'THANK YOU', {
			font: this.game.screenData.font_thanks + "px AvenirNextLTPro-HeavyCn",
			fill: "#3f5405"
		});

		thank_you.anchor.setTo(0.5, 1);

		this._drawPanelSubmit();
	}

	_drawPanelSubmit() {
		const style = {
			font: this.game.screenData.menu_font + "px AvenirNextLTPro-HeavyCn",
			fill: "#b0da40",
			boundsAlignH: "center",
			boundsAlignV: "top"
		};
		const style_bottom = {
			font: this.game.screenData.font_thanks + "px AvenirNextLTPro-HeavyCn",
			fill: "#fff",
			boundsAlignH: "center",
			boundsAlignV: "top"
		};
		const scoreMarginTop = this.game.screenData.panelHeight + this.game.screenData.scoreMarginTop;
		const boxMove = new BoxScore(this.game, this.game.world.centerX - this.game.screenData.end_score_width, scoreMarginTop, 'MOVES', this.moves, style, style_bottom);
		const boxTime = new BoxScore(this.game, this.game.world.centerX + this.game.screenData.end_score_width, scoreMarginTop, 'TIME', this.time, style, style_bottom);

		const boxInputWidth = 120 + this.game.screenData.input_width;
		const groupName = this.game.add.group();
		groupName.x = this.game.width / 2 - (boxInputWidth / 2);
		const groupEmail = this.game.add.group();
		groupEmail.x = this.game.width / 2 - (boxInputWidth / 2);
		const txtName = this.game.add.text(0, 0, 'NAME', {
			font: this.game.screenData.font_size_name + "px AvenirNextLTPro-HeavyCn",
			fill: "#b0da40"
		});
		txtName.lineSpacing = this.game.screenData.lineSpacing;

		this.nameUser = this.createInput(this.game.screenData.inputLeft, 0, this.game.screenData.input_width, this.game.screenData.input_height);

		if (localStorage.getItem('user_name')) {
			this.nameUser.canvasInput.value(localStorage.getItem('user_name'));
		} else {
			this.nameUser.canvasInput.value("");
		}
		// game.add.tween(nameUser);

		groupName.addChild(txtName);
		groupName.addChild(this.nameUser);
		groupName.y = this.game.screenData.inputMarginTop;
		//User Email
		const txtEmail = this.game.add.text(0, 0, 'EMAIL', {
			font: this.game.screenData.font_size_name + "px AvenirNextLTPro-HeavyCn",
			fill: "#b0da40"
		});
		this.emailUser = this.createInput(this.game.screenData.inputLeft, 0, this.game.screenData.input_width, this.game.screenData.input_height);

		if (localStorage.getItem('user_email')) {
			this.emailUser.canvasInput.value(localStorage.getItem('user_email'));
		} else {
			this.emailUser.canvasInput.value('');
		}

		groupEmail.addChild(txtEmail);
		groupEmail.addChild(this.emailUser);
		groupEmail.y = this.game.screenData.inputMarginTop + this.game.screenData.margin2Input;

		const submitBtn = this.game.add.button(this.game.width / 2, this.game.screenData.panelHeight + 270, 'submit', this.submitInfo, this);
		submitBtn.y = groupEmail.y + 100;
		submitBtn.input.useHandCursor = true;
		submitBtn.anchor.setTo(0.5);
	}

	initBackground() {

		let game = this.game, bg_w, bg_h, w = this.game.width, h = this.game.height,
			panel_height = this.game.screenData.panelHeight, text;

		if (1208 / w >= 814 / h) {
			bg_h = h;
			bg_w = 1208 * h / 814;
		} else {
			bg_w = w;
			bg_h = 814 * w / 1208;
		}
		this.menu_bg = game.add.image(w / 2, h, "play_bg");
		this.menu_bg.width = bg_w;
		this.menu_bg.height = bg_h;
		this.menu_bg.anchor.setTo(0.5, 1);


		const wally_swing = game.add.sprite(w / 2 - 10, h - this.game.screenData.wallyMarginBottom, 'wally-animation');
		wally_swing.scale.setTo(this.game.screenData.wallyScale);
		wally_swing.animations.add('swing');
		wally_swing.animations.play('swing', 20, true);

		this.tree_play = this.game.cache.getImage('bg_play');
		this.tree_play = this.game.add.image(w / 2 - this.tree_play.width / 2, h - this.tree_play.height - this.game.screenData.tree_margin_bottom, 'bg_play');

		// Add top menu
		// Here we create the ground.
		const platforms = game.add.group();
		this.ground = platforms.create(0, 0, 'ground');
		this.ground.width = w;
		this.ground.height = panel_height;


		switch (this.game.screenData.mapScreen) {
			case 0:
			case 1:
				text = this.game.add.text(10, panel_height / 4, "MATCH THE PAIRS", {
					font: "bold 28px AvenirNextLTPro-HeavyCn",
					fill: "#fff",
					boundsAlignH: "center",
					boundsAlignV: "middle"
				});
				break;
			default:
				text = this.game.add.text(this.game.width / 2, panel_height / 2, "MATCH THE PAIRS", {
					font: "bold 36px AvenirNextLTPro-HeavyCn",
					fill: "#fff",
					boundsAlignH: "center",
					boundsAlignV: "middle"
				});
				text.anchor.set(0.5);
				break;
		}

		// Addd menu button
		const menuBtn = this.game.add.button(this.game.world.width - 160, panel_height / 2 - 18, 'menu-btn', this.clickMenu, this);
		menuBtn.input.useHandCursor = true;
	}

	resize() {
		let w = this.game.width, h = this.game.height,
			bg_h, bg_w;

		// BG
		if (1208 / w >= 814 / h) {
			bg_h = h;
			bg_w = 1208 * h / 814;
		} else {
			bg_w = w;
			bg_h = 814 * w / 1208;
		}
		this.menu_bg.x = w / 2;
		this.menu_bg.y = h;
		this.menu_bg.width = bg_w;
		this.menu_bg.height = bg_h;
		this.menu_bg.anchor.setTo(0.5, 1);

		// Tree
		this.tree_play.x = w / 2 - this.tree_play.width / 2;
		this.tree_play.y = h - this.tree_play.height - 30;


		// Ground scale
		this.ground.width = w;
		text.x = w / 2;
		menuBtn.x = w - 160;

		// submit form
		scrore_winner.x = w / 2;
		text_winner.x = w / 2;
		info_winner.x = w / 2 - 185;
		this.emailUser.x = w / 2 + 40;
		this.nameUser.x = w / 2 + 40;

	}

	finalScore(moves, time) {
		// var score = 1000 000 00001/(moves + time * 2)
		return moves + time;
	}

	submitInfo() {
		let flag = true;
		let user_name = this.nameUser.canvasInput.value();
		let user_email = this.emailUser.canvasInput.value();
		console.log(user_name, user_email);
		if (user_name.trim() == "" || user_name.trim() == undefined) {
			this.nameUser.canvasInput.backgroundColor('#ffc6c6');
			flag = false;
		} else {
			this.nameUser.canvasInput.backgroundColor('#fff');
		}

		if (user_email.trim() == "" || user_email.trim() == undefined) {
			this.emailUser.canvasInput.backgroundColor('#ffc6c6');
			flag = false;
		} else {
			this.emailUser.canvasInput.backgroundColor('#fff');
		}

		if (flag == false) {
			return false;
		}

		let score = this.finalScore(this.moves, this.time);

		let params = {
			user_name: user_name,
			user_email: user_email,
			score: this.time,
			moves: this.moves,
			time: this.time,
			type: this.game.gameType
		};

		fetch(`${val.baseUrl}/api/v1/memory`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		}).then(res => {
			return res.json();
		}).then(json => {
			localStorage.setItem('user_name', user_name);
			localStorage.setItem('user_email', user_email);
			setTimeout(() => {
				this.game.state.start('menu');
			});
		}).catch(err => {
			Log.log(err);
		});

	}

	inputFocus(sprite) {
		sprite.canvasInput.focus();
	}



	createInput(x, y, width, height) {
		let bmd = this.add.bitmapData(600, 50);
		let myInput = this.game.add.sprite(x, y, bmd);

		myInput.canvasInput = new CanvasInput({
			canvas: bmd.canvas,
			font: '24px Arial',
			fill: '#212121',
			fontWeight: 'bold',
			width: width,
			borderWidth: 0,
			borderColor: '#fff',
			backgroundColor: '#fff',
			height: height,
			borderRadius: 12,
			innerShadow: 'rgba(0, 0, 0, 0)'
		});
		myInput.inputEnabled = true;
		myInput.input.useHandCursor = true;
		myInput.events.onInputUp.add(this.inputFocus, this);

		return myInput;
	}
	// The restart function calls the menu state
	restart() {
		game.state.start('menu');
	}
}

export default Win;