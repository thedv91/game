import { Log } from './../utils/Log';

export default class BoxScore {
	constructor(game, x, y, label, score) {
		this.game = game;
		this.label = label;
		this.score = score;
		this.x = x || 0;
		this.y = y || 0;
		this.group = this.draw();
	}

	setScore(score) {
		this.scoreTxt.setText(score);
	}

	draw() {
		let group = this.game.add.group();

		let style_label = {
			font: '500 ' + this.game.screenData.font_score + 'px AvenirNextLTPro-HeavyCn',
			fill: "#fff"
		};
		let style_score = {
			font: '500 ' + this.game.screenData.font_score + 'px AvenirNextLTPro-HeavyCn',
			fill: "#fff",
			align: 'center'
		};

		this.labelTxt = this.game.add.text(0, 0, this.label, style_label);
		this.labelTxt.anchor.setTo(0.5);

		this.scoreTxt = this.game.add.text(0, this.labelTxt.height, this.score, style_score);
		this.scoreTxt.anchor.setTo(0.5);

		group.x = this.x;
		group.y = this.y;
		group.add(this.labelTxt);
		group.add(this.scoreTxt);

		return group;
	}
}