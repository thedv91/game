import { Log } from 'utils/Log';

export function getInitData(game) {
	const width = game.width;
	const height = game.height;

	let data = {
		mapScreen: 6,
		panelHeight: 90,
		panel_margin_left: 44,
		intro_margin_top: 90,
		bold_font: 42,
		intro_font: 42,
		okButtonScale: 1,
		menu_font: 42,
		button_ok_margin: 60,
		tree_margin_bottom: 65,
		rankPaddingTop: 0,
		startButtonPaddingTop: 500,
		startButtonMarginBottom: height - 200,
		pivot: {},
		end_score_width: 80,
		font_thanks: 48,
		info_winner_left: width / 2 - 250,
		info_bet: 20,
		input_width: 450,
		input_height: 35,
		inputLeft: 120,
		font_size_name: 34,
		inputMarginTop: 250,
		margin2Input: 100,
		lineSpacing: 25,
		tabs: 30,
		panel_height: 90,
		rankTableLeft: 50,
		labelFontSize: 25,
		scoreFontSize: 40,
		buttonMarginLeft: 180,
		scoreMarginTop: 100,
		wallyMarginBottom: 400,
		wallyScale: .7
	};

	if (width <= 375) {
		data = Object.assign({}, data, {
			mapScreen: 0,
			panelHeight: 57,
			panel_margin_left: 12,
			intro_margin_top: 100,
			bold_font: 26,
			intro_font: 18,
			okButtonScale: .6,
			menu_font: 26,
			button_ok_margin: 40,
			tree_margin_bottom: 90,
			rankPaddingTop: 0,
			startButtonPaddingTop: 650,
			end_score_width: 50,
			font_thanks: 30,
			info_winner_left: width / 2 - 140,
			info_bet: 10,
			input_width: 180,
			input_height: 18,
			inputLeft: 80,
			font_size_name: 24,
			inputMarginTop: 200,
			margin2Input: 50,
			lineSpacing: 10,
			panel_height: 57,
			rankTableLeft: width / 2 - 145,
			labelFontSize: 25,
			scoreFontSize: 30,
			buttonMarginLeft: width / 2,
			startButtonMarginBottom: height - 50,
			scoreMarginTop: 30,
			wallyScale: .5,
			wallyMarginBottom: 305
		});
	} else if (width > 375 && width <= 480 && height <= 736) {
		/**
	 	* 414 x 736
		*/
		data = Object.assign({}, data, {
			mapScreen: 1,
			panelHeight: 57,
			panel_margin_left: 12,
			intro_margin_top: 135,
			bold_font: 26,
			intro_font: 20,
			menu_font: 26,
			button_ok_margin: 40,
			tree_margin_bottom: 90,
			rankPaddingTop: 0,
			startButtonPaddingTop: 650,
			end_score_width: 50,
			font_thanks: 35,
			info_winner_left: width / 2 - 140,
			info_bet: 10,
			input_width: 240,
			input_height: 25,
			inputLeft: 80,
			font_size_name: 24,
			inputMarginTop: 230,
			margin2Input: 80,
			lineSpacing: 10,
			panel_height: 57,
			rankTableLeft: width / 2 - 145,
			labelFontSize: 25,
			scoreFontSize: 30,
			buttonMarginLeft: width / 2,
			startButtonMarginBottom: height - 50,
			scoreMarginTop: 70,
			wallyScale: .5,
			wallyMarginBottom: 305
		});
	} else if (width <= 768 & width > 414 && height <= 1024) {
		/**
		 * 768 x 1024 
			*/
		data = Object.assign({}, data, {
			mapScreen: 2,
			panelHeight: 57,
			panel_margin_left: 30,
			intro_margin_top: 90,
			bold_font: 30,
			intro_font: 32,
			menu_font: 32,
			button_ok_margin: 40,
			tree_margin_bottom: 65,
			rankPaddingTop: 100,
			startButtonPaddingTop: 930,
			pivot: {
				y: 15
			},
			end_score_width: 70,
			font_thanks: 40,
			info_winner_left: width / 2 - 180,
			info_bet: 15,
			input_width: 300,
			input_height: 30,
			inputLeft: 100,
			font_size_name: 30,
			inputMarginTop: 250,
			margin2Input: 80,
			lineSpacing: 10,
			panel_height: 57,
			rankTableLeft: width / 2 - 145,
			labelFontSize: 25,
			scoreFontSize: 30,
			buttonMarginLeft: width / 2,
			startButtonMarginBottom: height - 50,
			scoreMarginTop: 70,
		});
	} else if (width <= 810 && width > 768 && height <= 640) {
		/**
		 * 810 x 640
			 */
		data = Object.assign({}, data, {
			mapScreen: 3,
			panelHeight: 57,
			panel_margin_left: 30,
			intro_margin_top: 90,
			bold_font: 30,
			intro_font: 32,
			menu_font: 32,
			button_ok_margin: 40,
			tree_margin_bottom: 65,
			rankPaddingTop: 0,
			startButtonPaddingTop: 430,
			info_bet: 15,
			font_size_name: 30,
			inputMarginTop: 200,
			margin2Input: 80,
			input_width: 300,
			buttonMarginLeft: 200,
			scoreMarginTop: 50,
			wallyScale: .5,
			wallyMarginBottom: 305

		});
	} else if (width <= 1080 && width > 810 && height <= 1020) {
		/**
		 * 1080 x 1020
			 */
		data = Object.assign({}, data, {
			mapScreen: 4,
			rankPaddingTop: 200,
			startButtonPaddingTop: 650,
			pivot: {
				y: 10
			},
			input_width: 300,
			scoreMarginTop: 70,
			inputMarginTop: 300,
			margin2Input: 100,
		});
	} else if (width <= 1080 && width > 810 && height <= 1320 && height > 1020) {
		/**
		 * 1080 x 1320
			 */
		data = Object.assign({}, data, {
			mapScreen: 5,
			rankPaddingTop: 500,
			startButtonPaddingTop: 950,
			pivot: {
				y: 10
			},
			input_width: 300,
			scoreMarginTop: 250,
			inputMarginTop: 500,
			margin2Input: 100,
		});
	} else if (width <= 1080 && width > 810 && height <= 1420 && height > 1320) {
		/**
		 * 1080 x 1420
			 */
		data = Object.assign({}, data, {
			mapScreen: 6,
			rankPaddingTop: 600,
			startButtonPaddingTop: 1050,
			pivot: {
				y: 10
			},
			input_width: 300,
			scoreMarginTop: 350,
			inputMarginTop: 600,
			margin2Input: 100,
		});
	}

	Log.info(data);

	return data;
}