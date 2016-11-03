import { Log } from 'utils/Log';

export default class BoxScore {
	constructor(game, x, y, label, score, style1 = {}, style2 = {}) {
		this.game = game;
		this.label = label;
		this.score = score;
		this.style1 = style1;
		this.style2 = style2;
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
			font: this.game.screenData.labelFontSize + 'px AvenirNextLTPro-HeavyCn',
			fill: '#3f5405',
			fontWeight: 'normal',
			align: 'center'
		};
		let style_score = {
			font: this.game.screenData.scoreFontSize + 'px AvenirNextLTPro-HeavyCn',
			fill: "#3f5405",
			align: 'center',
			fontWeight: 'bold'
		};

		this.labelTxt = this.game.add.text(0, 0, this.label, Object.assign({}, style_label, this.style1));
		this.labelTxt.anchor.setTo(0.5);

		this.scoreTxt = this.game.add.text(0, this.labelTxt.height, this.score, Object.assign({}, style_score, this.style2));
		this.scoreTxt.anchor.setTo(0.5);

		group.x = this.x;
		group.y = this.y;
		group.add(this.labelTxt);
		group.add(this.scoreTxt);

		return group;
	}
}