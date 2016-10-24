import { Log } from './../../../utils/Log';

export function getInitData(game) {
	const width = game.width;
	const height = game.height;
	let mapScreen;
	var data = {
		mapScreen: 6,
		panel_margin_left: 44,
		intro_margin_top: 90,
		bold_font: '42px',
		intro_font: '42px',
		menu_font: '42px',
		button_ok_margin: 60,
		tree_margin_bottom: 65,
		rankPaddingTop: 500,
		startButtonPaddingTop: 950,
		pivot: {}
	};

	/**
	 * 414 x 736
	 */
	if (width <= 414) {
		data = Object.assign({}, data, {
			mapScreen: 1,
			panel_margin_left: 12,
			intro_margin_top: 135,
			bold_font: '26px',
			intro_font: '20px',
			menu_font: '26px',
			button_ok_margin: 40,
			tree_margin_bottom: 90,
			rankPaddingTop: 0,
			startButtonPaddingTop: 650,
		});
	} else if (width <= 768 & width > 414 && height <= 1024) {
		/**
		 * 768 x 1024 
		*/
		data = Object.assign({}, data, {
			mapScreen: 2,
			panel_margin_left: 30,
			intro_margin_top: 90,
			bold_font: '30px',
			intro_font: '32px',
			menu_font: '32px',
			button_ok_margin: 40,
			tree_margin_bottom: 65,
			rankPaddingTop: 0,
			startButtonPaddingTop: 930,
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
			panel_margin_left: 30,
			intro_margin_top: 90,
			bold_font: '30px',
			intro_font: '32px',
			menu_font: '32px',
			button_ok_margin: 40,
			tree_margin_bottom: 65,
			rankPaddingTop: 0,
			startButtonPaddingTop: 430,
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
			}
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
			}
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
			}
		});
	}

	console.log(data);

	return data;
}