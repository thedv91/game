import { Log } from 'utils/Log';
import val from './../variables';
class Menu extends Phaser.State {

	init() {
		Log.info('menu');
	}
	create() {
		// reInit data
		let game = this.game;

		this.game.moves = 0;
		//this.game.time = 0;
		this.game.score = 0;
		this.game.level = 1;
		let w = this.game.width, h = this.game.height;

		let bg_w, bg_h;

		if (1208 / w >= 814 / h) {
			bg_h = h;
			bg_w = 1208 * h / 814;
		} else {
			bg_w = w;
			bg_h = 814 * w / 1208;
		}
		this.game.menu_bg = game.add.image(w / 2, h, 'play_bg');
		this.game.menu_bg.width = bg_w;
		this.game.menu_bg.height = bg_h;
		this.game.menu_bg.anchor.setTo(0.5, 1);
		let wally_margin_bottom = 390, wally_scale = 0.7, button_left, button_height, rank_table_left;

		if (game.width <= 768) {
			this.game.wally_swing = game.add.sprite(w / 2 - 40, h - wally_margin_bottom, 'wally-animation');

			this.game.tree = game.add.image(w / 2 - 745 / 2 + 10, h - 875, 'tree');
		} else {
			this.game.wally_swing = game.add.sprite(w / 2 + 50, h - wally_margin_bottom, 'wally-animation');
			this.game.tree = game.add.image(w / 2 - 745 / 2 + 100, h - 875, 'tree');
		}


		this.game.wally_swing.scale.setTo(wally_scale);
		this.game.wally_swing.animations.add('swing');
		this.game.wally_swing.animations.play('swing', 20, true);

		// Add Button
		if (game.width <= 768) {
			button_left = w / 2 - 180 / 2;
			button_height = h - 70;
			rank_table_left = w / 2 - 145;
		} else {
			rank_table_left = 50;
			button_left = 120;
			button_height = 430;
		}
		let button = game.add.button(button_left, this.game.screenData.startButtonPaddingTop, 'start', this.start, this, 1, 0, 2);
		//game.add.tween(button).to({ x: button_left, y: 600 }, 1000, Phaser.Easing.Linear.Out, true);
		button.input.useHandCursor = true;
		this.createRankTable(rank_table_left, this.game.screenData.rankPaddingTop);

	}

	resize() {
		let w = this.game.width;
		let h = this.game.height;
		let bg_w, bg_h;
		// BG
		if (1208 / w >= 814 / h) {
			bg_h = h;
			bg_w = 1208 * h / 814;
		} else {
			bg_w = w;
			bg_h = 814 * w / 1208;
		}
		this.game.menu_bg.x = w / 2;
		this.game.menu_bg.y = h;
		this.game.menu_bg.width = bg_w;
		this.game.menu_bg.height = bg_h;
		this.game.menu_bg.anchor.setTo(0.5, 1);

		// Tree

		this.game.tree.x = w / 2 - 745 / 2 + 100;
		this.game.tree.y = h - 816;
	}

	createRankTable(x, y) {

		this.game.rank_table = this.game.add.group();
		this.game.rank_table.x = x;
		this.game.rank_table.y = y;


		let board = this.game.add.image(0, -175, 'board');
		board.scale.set(0.75);

		this.game.rank_table.add(board);


		// Text
		let style = { font: "26px AvenirNextLTProHeavyCn", fill: "#f6ecc9", boundsAlignH: "center", boundsAlignV: "middle" };
		let text = this.game.add.text(45, 55, "MATCH THE PAIRS", style);

		this.game.rank_table.add(text);

		var style_normal = { font: "bold 17px AvenirNextLTProCn", fill: "#f6ecc9", boundsAlignH: "center", boundsAlignV: "middle" };
		var style_title = { font: "bold 24px AvenirNextLTProCn", fill: "#f6ecc9", textDecoration: "underline", boundsAlignH: "center", boundsAlignV: "middle" };

		this.game.rank_table.add(this.game.make.text(75, 110, 'HALL OF FAME', style_title));

		let memory_email = localStorage.getItem('user_email');

        /*
		* type == 1: arcade mode
		* type == 0: kiosk mode
		*
		*/

		fetch(val.baseUrl + 'memory/ranks', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email': memory_email,
				'type': 0
			})
		}).then(response => {
			return response.json();
		}).then(json => {
			let users = json.tops;

			for (var i = 0; i < users.length; i++) {
				this.game.rank_table.add(this.game.make.text(30, 160 + i * 28, this.trimString(users[i].name.toUpperCase(), 15), style_normal));
				this.game.rank_table.add(this.game.make.text(210, 160 + i * 28, users[i].time + ' S', style_normal));
			}

			var style_italic = { font: "14px AvenirNextLTProCnIt", fill: "#f6ecc9", boundsAlignH: "center", boundsAlignV: "middle" };

			if (json.rank != -1) {
				this.game.rank_table.add(game.make.text(65, 342, 'YOUR PREVIOUS RANKING: ' + json.rank, style_italic));
			}
		}).catch(err => {
			Log.error(err);
		});


	}
	// Trim string
	trimString(text, number_text) {
		if (text.trim().length < number_text) {
			var shortText = text;
		} else {
			var shortText = text.trim().substring(0, number_text) + "...";
		}

		return shortText;
	}
	// The start function calls the play state
	start() {
		// game.stateTransition.to('play');
		this.game.state.start('play');
		// game.state.start('play', true, false, 1);
	}

	update() {

	}
}

export default Menu;