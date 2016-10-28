import { Log } from './Log';

export function getInitData(game) {
	const width = game.width;
	const height = game.height;
	let mapScreen;
	let data = {
		mapScreen: 6,
		pannel_margin_left: 75,
		intro_font: 50,
		des_font: 40,
		intro_font_family: 'AvenirNextLTPro-DemiCn',
		ok_width: 120,
		button_dis: 100,
		animatorWidth: 280,
		animatorScale: .9,
		animatorIntroScale: [-1, 1],
		cLine: 30,
		map: 'map',
		gid: 2561,
		pipes: 'pipe',
		water: 'waters',
		scale_maps: width / 768,
		score_margin_top: 200,
		inputWidth: 450,
		inputHeight: 60,
		font_score: 40,
		font_score_end_game: 60,
		tabs: 120,
		submit_width: 205,
		submitButtonScale: 1,
		buttonScale: 1,
		endgamePadding: 40,
		scoreMargin: 70,
		textNameMargin: 120,
		pivot: {},
		panelWidth: 660,
		panelHeight: 780,
		scoreFont: 80,
		font_1: '71px',
		font_2: '42px',
		font_3: '28px',
		panel_left: 70,
		start_width: 280,
	};

	/**
	 * 414 x 736
	 */
	if (width <= 375) {
		data = Object.assign({}, data, {
			mapScreen: 0,
			pannel_margin_left: 30,
			intro_font: 22,
			intro_font_family: 'AvenirNextLTPro-DemiCn',
			des_font: 18,
			ok_width: 90,
			button_dis: 60,
			animatorWidth: 160,
			animatorScale: .5,
			smallScreen: true,
			cLine: 15,
			map: 'map-mobile',
			gid: 641,
			pipes: 'pipe_mobile',
			water: 'water-mobile',
			scale_maps: width / 320,
			score_margin_top: 30,
			inputWidth: 160,
			inputHeight: 30,
			scoreFont: 40,
			font_score: 20,
			font_score_end_game: 24,
			tabs: 60,
			submitButtonScale: .4,
			buttonScale: .6,
			endgamePadding: 18,
			level_font: 27,
			level_font_number: 40,
			level_font_tabs: 100,
			font_1: '51px',
			font_2: '22px',
			font_3: '18px',
			textNameMargin: 50,
			animatorIntroScale: [-0.9, 0.9]
		});
	}
	else if (width > 375 && width <= 480) {
		data = Object.assign({}, data, {
			mapScreen: 1,
			pannel_margin_left: 30,
			intro_font: 22,
			intro_font_family: 'AvenirNextLTPro-DemiCn',
			des_font: 18,
			ok_width: 100,
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
			inputHeight: 35,
			font_score: 20,
			font_score_end_game: 30,
			tabs: 70,
			submitButtonScale: .5,
			endgamePadding: 20,
			panelWidth: 380,
			panelHeight: 445,
			scoreFont: 50,
			textNameMargin: 60,
			font_1: '51px',
			font_2: '22px',
			font_3: '18px',
		});
	}
	else if (width <= 768 & width > 414 && height <= 1024) {
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
			animatorWidth: 300,
			animatorScale: 1.2,
			animatorIntroScale: [-0.8, .8],
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
			font_score_end_game: 50,
			tabs: 100,
			submitButtonScale: .8,
			ndgamePadding: 20,
			pivot: {
				y: 15
			},
			font_1: '61px',
			font_2: '32px',
			font_3: '26px',
		});
	}
	else if (width <= 810 && width > 768 && height <= 640) {
		/**
		 *810 x 640
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
			map: 'map_810_640',
			gid: 4051,
			pipes: 'pipe_810_640',
			water: 'water_810_640',
			scale_maps: width / 800,
			score_margin_top: 40,
			inputWidth: 350,
			inputHeight: 40,
			font_score: 30,
			font_score_end_game: 30,
			tabs: 100,
			submitButtonScale: .8,
			endgamePadding: 20,
			font_1: '61px',
			font_2: '32px',
			font_3: '26px',
			panelWidth: 465,
			panelHeight: 435,
		});
	}
	else if (width <= 1080 && width > 810 && height <= 1020) {
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
			animatorWidth: 350,
			animatorScale: 1.5,
			cLine: 30,
			map: 'map',
			gid: 2561,
			pipes: 'pipe',
			water: 'waters',
			scale_maps: width / 768,
			score_margin_top: 150,
			inputWidth: 400,
			inputHeight: 60,
			font_score: 30,
			tabs: 100,
			ubmitButtonScale: .8,
			pivot: {
				y: 10
			}
		});
	}
	else if (width <= 1080 && width > 810 && height <= 1320 && height > 1020) {
		/**
		 *1080 x 1320
		 */
		data = Object.assign({}, data, {
			mapScreen: 5,
			pannel_margin_left: 75,
			intro_font: 50,
			des_font: 40,
			ok_width: 230,
			button_dis: 100,
			animatorWidth: 500,
			animatorScale: 1.8,
			animatorIntroScale: [-.8, .8],
			cLine: 30,
			map: 'map',
			gid: 2561,
			pipes: 'pipe',
			water: 'waters',
			scale_maps: width / 768,
			score_margin_top: 200,
			font_score: 40,
			tabs: 120,
			ubmitButtonScale: 1,
			pivot: {
				y: 10
			}
		});
	}
	else if (width <= 1080 && width > 810 && height <= 1420 && height > 1320) {
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
			animatorWidth: 502,
			animatorScale: 1.8,
			animatorIntroScale: [-.8, .8],
			map: 'map',
			gid: 2561,
			pipes: 'pipe',
			water: 'waters',
			scale_maps: width / 768,
			core_margin_top: 200,
			pivot: {
				y: 10
			}
		});
	}


	Log.info(data);

	return data;
}