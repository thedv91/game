import Phaser from 'phaser';
import val from './../variables';

class Game extends Phaser.State {
	constructor() {
		super();
		this.panelHeight = 60;
		this.endGameWidth = 300;


		this.drawPanelGlobal;

		this.text_score;
		this.time_play = 0;
		this.level = 1;
		this.score_game = 0;


	}
	init(level,score, time){
		this.level = level;
		this.score_game = score;
		this.time_play = time;

	}

	create() {
		var _self = this;
		this.drawPanelGlobal  = this._drawPanel();

		this._drawBackground();
		this.bgOverlay = this._drawOverlay();

		let music = this.add.audio('background', 1, false);

		setTimeout(() => {
			music.play();
		}, 600);

		this.map = this._drawPipes();
		this._drawAnimator();

		this.intro = this._drawIntroduction();
		this.panelEndGame = this._drawEndGame();
		this._drawPanel();
		this.pauseGame = this._drawPauseGame();

		/*setTimeout(() => {
			this._showPanelEndGame();
		}, 1000);*/

		this._drawScore();

		if(this.level == 1){
			_self._showIntroGame();		
		}else{

			for (var i = this.waters_group.length - 1; i >= 0; i--) {
				this.waters_group[i].visible = false;
			}
			setTimeout(function(){
				_self._startShowWater();
			},100);

			
			this.time.events.loop(Phaser.Timer.SECOND, this._updateTime, this);

		}
		
	}

	loadRender() {

	}

	loadUpdate() {

	}

	paused() {
		// console.log(1)	;
	}

	pauseUpdate() {

	}

	preload() {

	}

	preRender() {

	}

	render() {

	}

	resize() {

	}

	resumed() {

	}

	shutdown() {

	}

	update() {
		// if(this.time_play >= 10){
		// 	this.panelEndGame;
		// }
	}

	/**
	 * Custom function
	 */

	_initPoint() {
		let points = [{
			x: 480,
			y: 280
		}];
	}

	_updateTime() {
        this.time_play = this.time_play + 1;
        this.text_score.setText('  '+this.level+'\t'+this.time_play+'s\t'+this.score_game);
    }

	_drawScore(){
		var style_top = { font: '600 27px AvenirNextLTPro-HeavyCn', fill: "#fff", tabs: 100 };
		var style_under = { font: '600 40px AvenirNextLTPro-HeavyCn', fill: "#fff", tabs: 100 };

    	var text = this.add.text(this.game.width /2, this.game.height - 100, "LEVEL\tTIME\tSCORE", style_top);
    	this.text_score = this.add.text(this.game.width /2, this.game.height - 70, '  '+this.level+'\t'+this.time_play+'s\t'+this.score_game, style_under);
	}

	_drawBackground() {
		let bg = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
		bg.anchor.setTo(0.5, 0.5);
		bg.scale.setTo(1, 1);
		return bg;
	}

	_drawOverlay() {
		let cc = this.add.tileSprite(0, this.panelHeight, this.game.width, this.game.height - this.panelHeight, 'black');
		cc.alpha = 0.8;
		cc.top = this.game.height;

		let tween = this.add.tween(cc);
		tween.to({
			alpha: 0.8,
			top: this.panelHeight
		}, 500, Phaser.Easing.Bounce.Out, true);

		return cc;
	}

	_drawPipes() {
		/*let map = this.add.tilemap('pipe-maps');
		map.addTilesetImage('maps', 'tiles-maps');

		let layer = map.createLayer('pipes-maps');

		layer.resizeWorld();
		layer.fixedToCamera = false;
		layer.resize(this.world._width, this.world._height);
		layer.anchor.setTo(0.5);
		layer.x = (this.game.width / 2) - 50;
		layer.y = this.game.height / 2;
		return map;*/

		let map = this.add.tilemap('map');
		map.addTilesetImage('pipe');
		map.addTilesetImage('water');

		let layer = map.createLayer('Tile Layer 1');

		//layer.resizeWorld();
		/*layer.fixedToCamera = false;
		layer.resize(this.world._width, this.world._height);
		layer.anchor.setTo(0.5);
		layer.x = (this.game.width / 2);
		layer.y = this.game.height / 2;*/


		this.game.physics.startSystem(Phaser.Physics.ARCADE);


		//Here we create our coins group
		this.waters = this.game.add.group();
		this.waters.enableBody = true;

		// //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
		map.createFromObjects('Object Layer 1', 1601, 'water', 0, true, false, this.waters);

		this.waters_group = this.waters.children;

		
		for (var i = this.waters_group.length - 1; i >= 0; i--) {
			this.waters_group[i].visible = false;
			this.waters_group[i].inputEnabled = true;
			this.waters_group[i].input.useHandCursor = true;

			this.waters_group[i].inputEnabled = true;

			this.waters_group[i].events.onInputDown.add(this._clickWater, this);
		}

		return map;
	}

	// Start show water for Game Play
	_startShowWater() {
		var rands = this.array_rand(this.waters_group,3);
		this.waters_group[rands[0]].visible =true;
		this.waters_group[rands[1]].visible =true;
		this.waters_group[rands[2]].visible =true;
	}

	array_rand (input, num_req) {
	  var indexes = [];
	  var ticks = num_req || 1;
	  var checkDuplicate = function (input, value) {
	    var exist = false,
	      index = 0,
	      il = input.length;
	    while (index < il) {
	      if (input[index] === value) {
	        exist = true;
	        break;
	      }
	      index++;
	    }
	    return exist;
	  };

	  if (Object.prototype.toString.call(input) === '[object Array]' && ticks <= input.length) {
	    while (true) {
	      var rand = Math.floor((Math.random() * input.length));
	      if (indexes.length === ticks) {
	        break;
	      }
	      if (!checkDuplicate(indexes, rand)) {
	        indexes.push(rand);
	      }
	    }
	  } else {
	    indexes = null;
	  }

	  return ((ticks == 1) ? indexes.join() : indexes);
	}

	// Click Water 
	_clickWater(sprite) {
		var _self = this;

		sprite.visible = false;
		this.score_game++;
		this.text_score.setText('  '+this.level+'\t'+this.time_play+'s\t'+this.score_game);

		// Go to level 2
		if(this.score_game == 20){
			this.level = this.level + 1;
            this.state.start('game', true, false, this.level, this.score_game,this.time_play);
		}

		// Go to level 3
		if(this.score_game == 45){
			this.level = this.level + 1;
            this.state.start('game', true, false, this.level, this.score_game,this.time_play);
		}

		// Go to level 4
		if(this.score_game == 75){
			this.level = this.level + 1;
            this.state.start('game', true, false, this.level, this.score_game,this.time_play);
		}

		// Go to level 5
		if(this.score_game == 110){
			this.level = this.level + 1;
            this.state.start('game', true, false, this.level, this.score_game,this.time_play);
		}

		// Go to submit score table
		if(this.score_game == 150){
			this.time.events.pause();
			setTimeout(() => {
				this.state.start('game-over', true, false, this.score_game, this.time_play);
			}, 1000);
		}


		this._resetImg();
	}

	_resetImg() {
		this.waters_group = this.waters.children;

		var rand_idx = Math.floor(Math.random()*this.waters_group.length);
		if(this.waters_group[rand_idx].visible == true) {
				var rand_idx = Math.floor(Math.random()*this.waters_group.length);
				if(this.waters_group[rand_idx].visible == true) {
						var rand_idx = Math.floor(Math.random()*this.waters_group.length);
						this.waters_group[rand_idx].visible = true
				}else{
					this.waters_group[rand_idx].visible = true
				}
		}else{
			this.waters_group[rand_idx].visible = true
		}

	}

	_drawAnimator() {
		let cc = this.add.sprite(0, 0, 'animator');
		cc.anchor.setTo(0.5);
		cc.bottom = this.game.height - 20;
		cc.left = 20;
		return cc;
	}

	_drawIntroduction() {
		const panelWidth = this.game.width - 100,
			overlayHeight = this.game.height - this.panelHeight,
			panelHeight = overlayHeight - 50;

		let cc = this.add.group();
		cc.x = -this.game.width;
		cc.alpha = 0;
		let bg = this.add.tileSprite(50, this.panelHeight + 25, panelWidth, panelHeight, 'white');
		bg.alpha = 0.9;


		const style = {
			font: '600 27px AvenirNextLTPro-HeavyCn',
			fill: '#000000',
			wordWrap: true,
			wordWrapWidth: panelWidth - 200,
			align: 'center'
		};

		const text1 = this.add.text(panelWidth / 2, 90, 'INSTRUCTIONS', style);
		text1.anchor.setTo(0.5);
		const text2 = this.add.text(panelWidth / 2, 150, 'TAP ON THE LEAKS TO FIX THEM. FIX AS MANY LEAKS AS YOU CAN WITH', style);
		text2.anchor.setTo(0.5);

		this.okButton = this.add.button(this.game.width / 2, this.game.height / 2, 'ok-button', this.actionOkOnClick.bind(this), this, 1, 0, 2);
		this.okButton.scale.setTo(0.6);
		this.okButton.anchor.setTo(0.5);
		this.okButton.alpha = 1;
		this.okButton.lock = true;

		cc.addChild(bg);
		bg.addChild(text1);
		bg.addChild(text2);
		cc.addChild(this.okButton);

		return cc;
	}

	_drawPauseGame() {

		const panelWidth = this.game.width - 100,
			overlayHeight = this.game.height - this.panelHeight,
			panelHeight = overlayHeight - 50;

		let cc = this.add.group();
		cc.x = -this.game.width;
		cc.alpha = 0;
		let bg = this.add.tileSprite(50, this.panelHeight + 25, panelWidth, panelHeight, 'white');
		bg.alpha = 0.9;


		const style = {
			font: '600 27px AvenirNextLTPro-HeavyCn',
			fill: '#000000',
			wordWrap: true,
			wordWrapWidth: panelWidth - 200,
			align: 'center'
		};

	
		const text2 = this.add.text(panelWidth / 2, 150, 'GOING TO THE MENU \nWILL END THE GAME', style);
		text2.anchor.setTo(0.5);

		// End Game Btn
		this.endGameBtn = this.add.button(this.game.width / 2 - 100, this.game.height / 2, 'end-game', this.actionEndGameClick.bind(this), this, 1, 0, 2);
		this.endGameBtn.anchor.setTo(0.5);
		this.endGameBtn.alpha = 1;
		this.endGameBtn.lock = true;

		// Continue Btn
		this.continueBtn = this.add.button(this.game.width / 2 + 100, this.game.height / 2, 'continue', this.actionContinueClick.bind(this), this, 1, 0, 2);
		this.continueBtn.anchor.setTo(0.5);
		this.continueBtn.alpha = 1;
		this.continueBtn.lock = true;

		cc.addChild(bg);
		bg.addChild(text2);
		cc.addChild(this.endGameBtn);
		cc.addChild(this.continueBtn);

		return cc;
	}

	actionEndGameClick() {

		let tween_pause = this.add.tween(this.pauseGame);


		tween_pause.to({
			y: -100,
			alpha: 0
		}, 30, Phaser.Easing.Cubic.InOut, true);

		tween_pause.onComplete.add(() => {
			this.level = 1;
			this.score_game = 0;
			this.time_play = 0;

			this.state.start('intro');
		});
	}

	actionContinueClick(){
		let tween_pause = this.add.tween(this.pauseGame);


		tween_pause.to({
			x: 0,
			alpha: 0
		}, 1000, Phaser.Easing.Cubic.InOut, true);

		tween_pause.onComplete.add(() => {
			this.time.events.resume();
		});	
	}

	_drawPanel() {
		let cc = this.add.tileSprite(0, 0, this.game.width, this.panelHeight, 'blue');
		cc.y = -this.panelHeight;
		this.menuButton = this.add.button(0, this.panelHeight / 2, 'menu-button', this.actionMenuOnClick.bind(this), this, 1, 0, 2);
		this.menuButton.scale.setTo(0.6);
		this.menuButton.anchor.setTo(0.5);
		this.menuButton.right = this.game.width - this.menuButton.offsetX;
		this.menuButton.lock = false;

		const style = {
			font: '600 38px AvenirNextLTPro-UltLtCn',
			fill: '#FFFFFF',
			wordWrap: true,
			wordWrapWidth: this.game.width,
			align: 'center'
		};
		let text = this.add.text(this.game.width / 2, this.panelHeight / 2, 'FIX THE LEAK', style);
		text.anchor.setTo(0.5);
		cc.addChild(text);
		cc.addChild(this.menuButton);

		let tween = this.add.tween(cc);
		tween.to({
			y: 0
		}, 500, Phaser.Easing.Bounce.Out, true);

		tween.onComplete.add(() => {
			this.menuButton.lock = false;
		});

		return cc;
	}

	_drawEndGame() {
		let cc = this.add.group();
		cc.width = this.endGameWidth;

		let txtScore = this.createText(cc._width / 2, 0, 'SCORE:', {
			font: '600 27px AvenirNextLTPro-HeavyCn',
			fill: '#FFFFFF',
			stroke: '#000000',
			strokeThickness: 3
		});
		txtScore.anchor.setTo(0.5);

		let totalScore = this.createText(cc._width / 2, 60, '230', {
			font: '600 70px AvenirNextLTPro-HeavyCn',
			fill: '#FFFFFF',
			stroke: '#000000',
			strokeThickness: 6
		});
		totalScore.anchor.setTo(0.5);

		let txtName = this.createText(cc._width / 2, 120, 'NAME:', {
			fill: '#46c6f2'
		});
		txtName.anchor.setTo(0.5);
		this.nameInput = this.createInput(0, 140, {
			placeHolder: '',
			width: this.endGameWidth
		});

		let txtEmail = this.createText(cc._width / 2, 210, 'EMAIL:', {
			fill: '#46c6f2'
		});
		txtEmail.anchor.setTo(0.5);
		this.emailInput = this.createInput(0, 230, {
			placeHolder: '',
			width: this.endGameWidth
		});

		let button = this.add.button(cc._width / 2, 320, 'submit-button', this.actionSubmitOnClick.bind(this), this, 1, 0, 2);
		button.anchor.setTo(0.5);
		button.scale.setTo(0.8);

		cc.addChild(txtScore);
		cc.addChild(totalScore);
		cc.addChild(txtName);
		cc.addChild(this.nameInput);
		cc.addChild(txtEmail);
		cc.addChild(this.emailInput);
		cc.addChild(button);
		cc.centerX = this.game.width / 2;
		cc.centerY = this.game.height / 2;
		cc.scale.setTo(0);
		return cc;

	}
	createInput(x = 0, y = 0, options = {}) {
		Object.assign
		let myInput = this.game.add.inputField(x, y, Object.assign({}, {
			font: '18px Arial',
			fill: '#212121',
			fontWeight: 'bold',
			width: 150,
			padding: 8,
			borderWidth: 1,
			borderColor: '#000',
			height: 20,
			borderRadius: 6,
			type: Fabrique.InputType.text
		}, options));

		return myInput;
	}

	createText(x = 0, y = 0, txt, options = {}) {
		let style = {
			font: '600 27px AvenirNextLTPro-HeavyCn',
			fill: '#000000',
			wordWrap: true,
			wordWrapWidth: 200,
			align: 'center'
		};

		let text = this.add.text(x, y, txt, Object.assign({}, style, options));
		return text;
	}

	_showPanelEndGame() {
		this.map.destroy;

		/*let tween_map = this.add.tween(this._drawPipes);

		console.log(tween_map)
		tween_map.to({
			x: this.world.width,
		}, 1000, Phaser.Easing.Cubic.Out, true);

		tween_map.onComplete.add(() => {


			let tween = this.add.tween(this.panelEndGame.scale);
			tween.to({
				x: 1,
				y: 1
			}, 1000, Phaser.Easing.Cubic.Out, true);

			tween.onComplete.add(() => {

			});

		});*/

		
	}


	_showIntroGame() {

		this.menuButton.lock = true;
		let tween = this.add.tween(this.intro);
		tween.to({
			x: 0,
			alpha: 1
		}, 1000, Phaser.Easing.Exponential.Out, true);

		tween.onComplete.add(() => {
			this.okButton.lock = false;
		});

	}
	actionMenuOnClick() {

		if (!this.menuButton.lock) {
			this.menuButton.lock = true;
			let tween = this.add.tween(this.pauseGame);
			tween.to({
				x: 0,
				alpha: 1
			}, 1000, Phaser.Easing.Exponential.Out, true);

			tween.onComplete.add(() => {
				this.menuButton.lock = false;
				this.time.events.pause();
			});
		}

	}

	actionOkOnClick() {
		if (!this.okButton.lock) {
			this.okButton.lock = true;
			let tween = this.add.tween(this.intro);
			tween.to({
				x: this.game.width,
				alpha: 0
			}, 1000, Phaser.Easing.Cubic.Out, true);

			tween.onComplete.add(() => {
				this.intro.x = -this.game.width;
				this.menuButton.lock = false;

				this.paused = false;
				this.time.events.loop(Phaser.Timer.SECOND, this._updateTime, this);
				
				this._startShowWater();
			});
		}
	}

	actionSubmitOnClick() {
		let tween = this.add.tween(this.panelEndGame.scale);
		tween.to({
			x: 0,
			y: 0
		}, 300, Phaser.Easing.Quadratic.Out, true);

		tween.onComplete.add(() => {

		});

		// fetch(val.baseUrl + 'api/v1/fix-the-leak', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Accept': 'application/json',
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		score: 340,
		// 		name: this.nameInput.value,
		// 		email: this.emailInput.value,
		// 	})
		// }).then((response) => {
		// 	return response.json();
		// }).then((json) => {
		// 	console.log(json);
		// }).catch((ex) => {
		// 	console.log('parsing failed', ex);
		// });
	}
}


export default Game;