class Win extends Phaser.State {
	create() {
		var _self = this;

		enableClickMenu = true;
		// Config for panel
		if (game.width <= 810) {
			panel_height = 57;
		} else {
			panel_height = 90;
		}
		match_the_pair_left = w / 2;

		if (game.width <= 500) {
			panel_margin_left = 12;
			intro_font = '20px';
			menu_font = '26px';
			match_the_pair_left = w / 4;
			font_thanks = '44px';

			// Config for input
			input_width = 240;
			input_height = 18;
			info_winner_left = w / 2 - 140;

			end_score_width = 50;
			font_size_name = 24;
			info_bet = 10;

			tree_margin_bottom = 90;
			input_margin_top = 145;
			margin2Input = 50;
			lineSpacing = 10;
		}
		if (game.width > 500 && game.width <= 820) {
			panel_margin_left = 30;
			intro_font = '30px';
			menu_font = '32px';
			font_thanks = '40px';

			// Config for input
			input_width = 300;
			input_height = 20;
			info_winner_left = w / 2 - 180;

			end_score_width = 70;
			font_size_name = 30;
			info_bet = 15;

			tree_margin_bottom = 65;
			input_margin_top = 145;
			margin2Input = 50;
			lineSpacing = 10;
		}

		if (game.width < 820 && game.height >= 820) {
			intro_font = '36px';
			menu_font = '36px';
			font_thanks = '50px';

			input_width = 450;
			input_height = 35;
			info_winner_left = w / 2 - 250;

			end_score_width = 70;
			font_size_name = 30;
			info_bet = 15;

			tree_margin_bottom = 65;
			input_margin_top = 230;
			margin2Input = 70;
			lineSpacing = 25;
		}

		if (game.width > 820) {
			panel_margin_left = 44;
			intro_font = '34px';
			menu_font = '42px';
			font_thanks = '48px';

			// Config for input
			input_width = 450;
			input_height = 35;
			info_winner_left = w / 2 - 250;

			end_score_width = 80;
			font_size_name = 34;
			info_bet = 20;

			tree_margin_bottom = 65;
			input_margin_top = 230;
			margin2Input = 70;
			lineSpacing = 25;
		}



		playState.initBackground();

		// Draw Thank You

		var thank_you = game.add.text(w / 2, h, 'THANK YOU', {
			font: font_thanks + " AvenirNextLTProHeavyCn",
			fill: "#3f5405"
		});

		thank_you.anchor.setTo(0.5, 1);

		var style = {
			font: menu_font + " AvenirNextLTProHeavyCn",
			fill: "#b0da40",
			boundsAlignH: "center",
			boundsAlignV: "top"
		};
		var style_bottom = {
			font: font_thanks + " AvenirNextLTProHeavyCn",
			fill: "#fff",
			boundsAlignH: "center",
			boundsAlignV: "top"
		};

		var end_moves = game.add.text(game.world.centerX - end_score_width, panel_height + 30, 'MOVES \n', style);
		end_moves.setTextBounds(0, 0, 0, 0);

		end_moves_number = game.add.text(game.world.centerX - end_score_width, panel_height + 70, moves, style_bottom);
		end_moves_number.setTextBounds(0, 0, 0, 0);


		var end_time = game.add.text(game.world.centerX + end_score_width, panel_height + 30, 'TIME \n', style);
		end_time.setTextBounds(0, 0, 0, 0);
		end_time_number = game.add.text(game.world.centerX + end_score_width, panel_height + 70, time + 's', style_bottom);
		end_time_number.setTextBounds(0, 0, 0, 0);

		info_winner = game.add.text(info_winner_left, panel_height + input_margin_top + 40, " NAME:\nEMAIL:", {
			font: font_size_name + "px AvenirNextLTProHeavyCn",
			fill: "#b0da40"
		});

		if ((game.width < 820 && game.height >= 820) || game.width > 820) {
			info_winner.y = panel_height + input_margin_top + 55;
		}

		info_winner.anchor.setTo(0.5);
		info_winner.lineSpacing = lineSpacing;
		nameUser = this.createInput(info_winner_left + info_winner.width / 2 + info_bet, panel_height + input_margin_top - input_height / 2, input_width, input_height);

		if (localStorage.getItem('user_name')) {
			nameUser.canvasInput.value(localStorage.getItem('user_name'));
		} else {
			nameUser.canvasInput.value("");
		}
		// game.add.tween(nameUser);

		//User Email
		emailUser = this.createInput(info_winner_left + info_winner.width / 2 + info_bet, panel_height + input_margin_top + margin2Input - input_height / 2, input_width, input_height);

		if (localStorage.getItem('user_email')) {
			emailUser.canvasInput.value(localStorage.getItem('user_email'));
		} else {
			emailUser.canvasInput.value('');
		}

		// game.add.tween(emailUser);



		var submitBtn = game.add.button(w / 2, panel_height + 270, 'submit', this.submitInfo, this);
		if ((game.width < 820 && game.height >= 820) || game.width > 820) {
			submitBtn.y = panel_height + 400;
		}
		submitBtn.input.useHandCursor = true;
		submitBtn.anchor.setTo(0.5);
	}

	resize() {
		w = game.width;
		h = game.height;

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


		// Ground scale
		ground.width = w;
		text.x = w / 2;
		menuBtn.x = w - 160;

		// submit form
		scrore_winner.x = w / 2;
		text_winner.x = w / 2;
		info_winner.x = w / 2 - 185;
		emailUser.x = w / 2 + 40;
		nameUser.x = w / 2 + 40;

	}

	finalScore(moves, time) {
		// var score = 1000 000 00001/(moves + time * 2)
		return moves + time;
	}

	submitInfo() {
		var flag = true;
		var user_name = nameUser.canvasInput.value();
		var user_email = emailUser.canvasInput.value();
		console.log(user_name, user_email);
		if (user_name.trim() == "" || user_name.trim() == undefined) {
			nameUser.canvasInput.backgroundColor('#ffc6c6');
			flag = false;
		} else {
			nameUser.canvasInput.backgroundColor('#fff');
		}

		if (user_email.trim() == "" || user_email.trim() == undefined) {
			emailUser.canvasInput.backgroundColor('#ffc6c6');
			flag = false;
		} else {
			emailUser.canvasInput.backgroundColor('#fff');
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
					console.log('Something error on save Data');
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