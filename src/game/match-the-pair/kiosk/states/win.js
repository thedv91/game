import Play from './play';
import { Log } from 'utils/Log';
import BoxScore from './../../utils/objects/BoxScore';

class Win extends Phaser.State {

	init(moves, time) {
		this.moves = moves || 0;
		this.time = time || 0;
	}

	create() {
		var _self = this;
		let game = this.game, w = this.game.width, h = this.game.height;
		this.enableClickMenu = true;
		// Config for panel
		if (game.width <= 810) {
			this.panel_height = 57;
		} else {
			this.panel_height = 90;
		}
		this.match_the_pair_left = w / 2;

		this.initBackground();

		this.menu_bg = this.game.add.image(w / 2, h, 'play_bg');

		let thank_you = this.game.add.text(w / 2, h, 'THANK YOU', {
			font: this.game.screenData.font_thanks + "px AvenirNextLTProHeavyCn",
			fill: "#3f5405"
		});

		thank_you.anchor.setTo(0.5, 1);

		let style = {
			font: this.game.screenData.menu_font + "px AvenirNextLTProHeavyCn",
			fill: "#b0da40",
			boundsAlignH: "center",
			boundsAlignV: "top"
		};
		let style_bottom = {
			font: this.game.screenData.font_thanks + "px AvenirNextLTProHeavyCn",
			fill: "#fff",
			boundsAlignH: "center",
			boundsAlignV: "top"
		};

		let boxMove = new BoxScore(this.game, this.game.world.centerX - this.game.screenData.end_score_width, this.panel_height + 30, 'MOVES', this.moves, style, style_bottom);
		let boxTime = new BoxScore(this.game, this.game.world.centerX + this.game.screenData.end_score_width, this.panel_height + 30, 'TIME', this.time, style, style_bottom);
		// let end_moves = this.game.add.text(this.game.world.centerX - this.game.screenData.end_score_width, this.panel_height + 30, 'MOVES \n', style);
		// end_moves.anchor.setTo(0.5);

		// this.end_moves_number = this.game.add.text(this.game.world.centerX - this.game.screenData.end_score_width, this.panel_height + 70, this.moves, style_bottom);
		// this.end_moves_number.setTextBounds(0, 0, 0, 0);
		// this.end_moves_number.anchor.setTo(0.5);


		// let end_time = this.game.add.text(this.game.world.centerX + this.game.screenData.end_score_width, this.panel_height + 30, 'TIME \n', style);
		// end_time.setTextBounds(0, 0, 0, 0);
		// this.end_time_number = this.game.add.text(this.game.world.centerX + this.game.screenData.end_score_width, this.panel_height + 70, this.time + 's', style_bottom);
		// this.end_time_number.setTextBounds(0, 0, 0, 0);
		// this.end_time_number.anchor.setTo(0.5);
		let boxInputWidth = 120 + this.game.screenData.input_width;
		let groupName = this.game.add.group();
		groupName.x = this.game.width / 2 - (boxInputWidth / 2);
		let groupEmail = this.game.add.group();
		groupEmail.x = this.game.width / 2 - (boxInputWidth / 2);
		let txtName = this.game.add.text(0, 0, 'NAME', {
			font: this.game.screenData.font_size_name + "px AvenirNextLTProHeavyCn",
			fill: "#b0da40"
		});

		//this.info_winner.anchor.setTo(0.5);
		txtName.lineSpacing = this.game.screenData.lineSpacing;

		this.nameUser = this.createInput(120, 0, this.game.screenData.input_width, this.game.screenData.input_height);
		//this.nameUser.anchor.setTo(0.5);

		if (localStorage.getItem('user_name')) {
			this.nameUser.canvasInput.value(localStorage.getItem('user_name'));
		} else {
			this.nameUser.canvasInput.value("");
		}
		// game.add.tween(nameUser);

		groupName.addChild(txtName);
		groupName.addChild(this.nameUser);
		groupName.y = 200;
		//User Email
		let txtEmail = this.game.add.text(0, 0, 'EMAIL', {
			font: this.game.screenData.font_size_name + "px AvenirNextLTProHeavyCn",
			fill: "#b0da40"
		});
		this.emailUser = this.createInput(120, 0, this.game.screenData.input_width, this.game.screenData.input_height);

		if (localStorage.getItem('user_email')) {
			this.emailUser.canvasInput.value(localStorage.getItem('user_email'));
		} else {
			this.emailUser.canvasInput.value('');
		}

		groupEmail.addChild(txtEmail);
		groupEmail.addChild(this.emailUser);
		groupEmail.y = 300;

		let submitBtn = this.game.add.button(w / 2, this.panel_height + 270, 'submit', this.submitInfo, this);
		submitBtn.y = groupEmail.y + 100;
		submitBtn.input.useHandCursor = true;
		submitBtn.anchor.setTo(0.5);
	}


	initBackground() {

		let game = this.game, bg_w, bg_h, w = this.game.width, h = this.game.height,
			wally_margin_bottom, wally_scale, wally_swing,
			panel_height = this.panel_height, text, menuBtn, match_the_pair_left;

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
		// tree_play = game.cache.getImage('bg_play');
		// tree_play = game.add.image(w / 2 - tree_play.width / 2, h - tree_play.height - this.game.screenData.tree_margin_bottom, 'bg_play');
		this.tree_play = this.game.cache.getImage('bg_play');
		this.tree_play = this.game.add.image(w / 2 - this.tree_play.width / 2, h - this.tree_play.height - this.game.screenData.tree_margin_bottom, 'bg_play');

		// Add top menu
		// Here we create the ground.
		let platforms = game.add.group();
		this.ground = platforms.create(0, 0, 'ground');
		this.ground.width = w;
		this.ground.height = panel_height;


		// Add text "Match the pairs" on top screen
		var style = { font: "bold 36px AvenirNextLTProHeavyCn", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
		if (game.width <= 500) {
			text = game.add.text(10, panel_height / 4, "MATCH THE PAIRS", {
				font: "bold 28px AvenirNextLTProHeavyCn",
				fill: "#fff",
				boundsAlignH: "center",
				boundsAlignV: "middle"
			});
			// text.anchor.set(1,0.5);
		} else {

			text = game.add.text(match_the_pair_left, panel_height / 2, "MATCH THE PAIRS", style);
			text.anchor.set(0.5);

		}

		// Addd menu button
		menuBtn = game.add.button(game.world.width - 160, panel_height / 2 - 18, 'menu-btn', this.clickMenu, this);
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
		var flag = true;
		var user_name = this.nameUser.canvasInput.value();
		var user_email = this.emailUser.canvasInput.value();
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

		var score = this.finalScore(moves, time);


		var params = {
			user_name: user_name,
			user_email: user_email,
			score: score,
			moves: moves,
			time: time,
			type: game_type
		};

		$.ajax({
			type: "POST",
			url: "/memory/save-info",
			dataType: "JSON",
			data: params,
			success: function (response) {
				if (response.status == 1) {
					localStorage.setItem('user_name', user_name);
					localStorage.setItem('user_email', user_email);

					setTimeout(function () {
						game.state.start('menu');
					});

				} else {
					Log.log('Something error on save Data');
				}
			}
		});

	}

	inputFocus(sprite) {
		sprite.canvasInput.focus();
	}



	createInput(x, y, width, height) {
		var bmd = this.add.bitmapData(600, 50);
		var myInput = this.game.add.sprite(x, y, bmd);

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