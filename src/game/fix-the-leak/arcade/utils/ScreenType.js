export function getInitData(game) {
	const width = game.width;
	const height = game.height;
	let mapScreen;
	let data = {
		mapScreen: 6,
		pannel_margin_left: 75,
		intro_font: 50,
		des_font: 40,
		ok_width: 230,
		button_dis: 100,
		animatorWidth: 502,
		animatorScale: 1.5,
		cLine: 30,
		map: 'map',
		gid: 2561,
		pipes: 'pipe',
		water: 'waters',
		scale_maps: width / 768,
		score_margin_top: 200,
		inputWidth: 350,
		inputHeight: 50,
		font_score: 40,
		tabs: 120,
		submit_width: 205,
		submitButtonScale: 1,
		endgamePadding: 20,
		level_font: 40,
		level_font_number: 46,
		level_font_tabs: 140,
		levelMargin: 10,
		txtBottomMargin: 70,
		pivot: {}
	};

	/**
	 * 414 x 736
	 */
	if (width <= 414) {
		data = Object.assign({}, data, {
			mapScreen: 1,
			pannel_margin_left: 30,
			intro_font: 22,
			des_font: 18,
			ok_width: 125,
			button_dis: 80,
			animatorWidth: 210,
			animatorScale: .7,
			smallScreen: true,
			cLine: 15,
			map: 'map-small',
			gid: 1293,
			pipes: 'pipe_small',
			water: 'water-small',
			scale_maps: width / 408,
			score_margin_top: 30,
			inputWidth: 250,
			inputHeight: 40,
			font_score: 20,
			tabs: 70,
			submitButtonScale: .6,
			endgamePadding: 10,
			level_font: 27,
			level_font_number: 40,
			level_font_tabs: 100,
		});
	} else if (width <= 768 & width > 414 && height <= 1024) {
		/**
		 * 768 x 1024 
		*/
		data = Object.assign({}, data, {
			mapScreen: 2,
			pannel_margin_left: 40,
			intro_font: 30,
			des_font: 28,
			ok_width: 130,
			button_dis: 100,
			animatorWidth: 270,
			animatorScale: 1,
			cLine: 20,
			map: 'map-normal',
			gid: 1067,
			pipes: 'pipe_normal',
			water: 'water-normal',
			scale_maps: width / 492,
			score_margin_top: 100,
			inputWidth: 350,
			inputHeight: 50,
			font_score: 30,
			tabs: 100,
			submitButtonScale: .8,
			endgamePadding: 20,
			level_font: 27,
			level_font_number: 40,
			level_font_tabs: 100,
			pivot: {
				y: 15
			}

		});
	} else if (width <= 810 && width > 768 && height <= 640) {
		/**
		 * 810 x 640
		 */
		data = Object.assign({}, data, {
			mapScreen: 3,

			pannel_margin_left: 40,
			intro_font: 30,
			des_font: 25,
			ok_width: 130,
			button_dis: 100,
			animatorWidth: 270,
			animatorScale: 1,
			cLine: 20,
			map: 'map-normal',
			gid: 1067,
			pipes: 'pipe_normal',
			ater: 'water-normal',
			scale_maps: width / 492,
			score_margin_top: 40,
			inputWidth: 350,
			inputHeight: 40,
			font_score: 25,
			tabs: 100,
			submitButtonScale: .8,
			endgamePadding: 10,
			level_font: 27,
			level_font_number: 40,
			level_font_tabs: 100,
			pivot: {
				x: 20
			}
		});
	} else if (width <= 1080 && width > 810 && height <= 1020) {
		/**
		 * 1080 x 1020
		 */
		data = Object.assign({}, data, {
			mapScreen: 4,
			pannel_margin_left: 75,
			intro_font: 50,
			des_font: 40,
			ok_width: 230,
			button_dis: 100,
			animatorWidth: 270,
			animatorScale: 1,
			cLine: 30,
			map: 'map',
			gid: 2561,
			pipes: 'pipe',
			water: 'waters',
			scale_maps: width / 768,
			score_margin_top: 150,
			inputWidth: 350,
			inputHeight: 50,
			font_score: 30,
			tabs: 100,
			submitButtonScale: .8,
			level_font_tabs: 120,
			pivot: {
				y: 10
			}
		});
	} else if (width <= 1080 && width > 810 && height <= 1320 && height > 1020) {
		/**
		 * 1080 x 1320
		 */
		data = Object.assign({}, data, {
			mapScreen: 5,
			pannel_margin_left: 75,
			intro_font: 50,
			des_font: 40,
			ok_width: 230,
			button_dis: 100,
			animatorScale: 1.5,
			cLine: 30,
			map: 'map',
			gid: 2561,
			pipes: 'pipe',
			water: 'waters',
			scale_maps: width / 768,
			score_margin_top: 200,
			inputWidth: 350,
			inputHeight: 50,
			font_score: 40,
			tabs: 120,
			submitButtonScale: 1,
			pivot: {
				y: 10
			}
		});
	} else if (width <= 1080 && width > 810 && height <= 1420 && height > 1320) {
		/**
		 * 1080 x 1420
		 */
		data = Object.assign({}, data, {
			mapScreen: 6,
			pannel_margin_left: 75,
			intro_font: 50,
			ok_width: 230,
			button_dis: 100,
			cLine: 30,
			map: 'map',
			gid: 2561,
			pipes: 'pipe',
			water: 'waters',
			scale_maps: width / 768,
			score_margin_top: 200,
			pivot: {
				y: 10
			}
		});
	}
	if (process.env.NODE_ENV === 'development') {
		console.log(data);
	}

	return data;
}