export function getInitData(game) {
	const width = game.width;
	const height = game.height;
	let mapScreen;
	let data = {
		des_font: 25,
		mapScreen: 6,
		pannel_margin_left: 75,
		intro_font: 50,
		ok_width: 230,
		button_dis: 100,
		animatorWidth: 502,
		cLine: 30,
		map: 'map',
		gid: 2561,
		pipes: 'pipe',
		water: 'waters',
		scale_maps: width / 768
	};

	// 414 x 736
	if (width <= 414) {
		data = Object.assign({}, data, {
			mapScreen: 1,
			pannel_margin_left: 30,
			intro_font: 22,
			ok_width: 125,
			button_dis: 80,
			animatorWidth: 210,
			smallScreen: true,
			cLine: 15,
			map: 'map-small',
			gid: 1294,
			pipes: 'pipe_small',
			water: 'water-small',
			scale_maps: width / 408
		});
	} else 

	// 768 x 1024
	if (width <= 768 & width > 414 && height <= 1024) {
		data = Object.assign({}, data, {
			mapScreen: 2,
			pannel_margin_left: 40,
			intro_font: 27,
			ok_width: 130,
			button_dis: 100,
			animatorWidth: 270,
			cLine: 20,
			map: 'map-normal',
			gid: 1067,
			pipes: 'pipe_normal',
			water: 'water-normal',
			scale_maps: width / 492
		});
	} else 

	// 810 x 640
	if (width <= 810 && width > 768 && height <= 640) {
		data = Object.assign({}, data, {
			mapScreen: 3,
			pannel_margin_left: 40,
			intro_font: 27,
			ok_width: 130,
			button_dis: 100,
			animatorWidth: 270,
			cLine: 20,
			map: 'map-normal',
			gid: 1067,
			pipes: 'pipe_normal',
			water: 'water-normal',
			scale_maps: width / 492
		});
	} else 

	// 1080 x 1020
	if (width <= 1080 && width > 810 && height <= 1020) {
		data = Object.assign({}, data, {
			mapScreen: 4,
			pannel_margin_left: 75,
			intro_font: 50,
			ok_width: 230,
			button_dis: 100,
			animatorWidth: 502,
			cLine: 30,
			map: 'map',
			gid: 2561,
			pipes: 'pipe',
			water: 'waters',
			scale_maps: width / 768
		});
	} else

	// 1080 x 1320
	if (width <= 1080 && width > 810 && height <= 1320 && height > 1020) {
		data = Object.assign({}, data, {
			mapScreen: 5,
			pannel_margin_left: 75,
			intro_font: 50,
			ok_width: 230,
			button_dis: 100,
			animatorWidth: 502,
			cLine: 30,
			map: 'map',
			gid: 2561,
			pipes: 'pipe',
			water: 'waters',
			scale_maps: width / 768
		});
	} else

	// 1080 x 1420
	if (width <= 1080 && width > 810 && height <= 1420 && height > 1320) {
		data = Object.assign({}, data, {
			mapScreen: 6,
			pannel_margin_left: 75,
			intro_font: 50,
			ok_width: 230,
			button_dis: 100,
			animatorWidth: 502,
			cLine: 30,
			map: 'map',
			gid: 2561,
			pipes: 'pipe',
			water: 'waters',
			scale_maps: width / 768
		});
	}

	console.log(data);

	return data;
}