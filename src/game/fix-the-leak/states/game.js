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

	init(level, score, time){
		this.level = level;
		this.score_game = score;
		this.time_play = time;
		this.smallScreen = false;

		// mapScreen = 1 => device width < 500
		// mapScreen = 2 => device width >= 500 && device width < 800
		// mapScreen = 3 => device width >= 800 
		this.mapScreen = 3;

		this.w = this.game.width;
		this.h = this.game.height;

		// Mobile
		if(this.game.width <= 500){
			this.pannel_margin_left = 30;
			this.intro_font = 22;
			this.ok_width = 125;
			this.button_dis = 80;
			this.animatorWidth = 210;
			this.smallScreen = true;
			this.mapScreen = 1;
        }

        if(this.game.width >= 500 && this.game.width < 800) {
        	this.mapScreen = 2;
        }

        //  860 x 410
        if(this.game.width > 500 && this.game.width <= 820 && this.game.height < 800 ){
        	this.pannel_margin_left = 40;
        	this.intro_font = 27;
        	this.ok_width = 130;
        	this.button_dis = 100;
        	this.animatorWidth = 270;
        }

        // Tablet
        if(this.game.width > 500 && this.game.width <= 820 && this.game.height >= 800 ){
        	this.pannel_margin_left = 40;
        	this.intro_font = 40;
        	this.ok_width = 170;
        	this.button_dis = 100;
        	this.animatorWidth = 385;
        }

        // Windows
        if(this.game.width > 820) {
        	this.pannel_margin_left = 75;
        	this.intro_font = 50;
        	this.ok_width = 230;
        	this.button_dis = 100;
        	this.animatorWidth = 502;
        }


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
			setTimeout(function(){
				_self.menuButton.lock = false;	
			},600);
			

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
        
        if(this.smallScreen) {
			this.text_score.setText(''+this.time_play+'s\t'+this.score_game);
        }else{
        	this.text_score.setText('  '+this.level+'\t'+this.time_play+'s\t'+this.score_game);	
        }
        
    }

	_drawScore(){
		var style_top = { font: '600 27px AvenirNextLTPro-HeavyCn', fill: "#fff", tabs: 100 };
		var style_under = { font: '600 40px AvenirNextLTPro-HeavyCn', fill: "#fff", tabs: 100 };

		if(this.smallScreen) {

			var text_top = this.add.text(this.game.width /2 + 40, this.game.height - 190, "LEVEL", style_top);
    		this.text_score_top = this.add.text(this.game.width /2 + 60, this.game.height - 150, this.level, style_under);

			var text = this.add.text(this.game.width /2, this.game.height - 100, "TIME\tSCORE", style_top);
    		this.text_score = this.add.text(this.game.width /2, this.game.height - 70, '  '+this.time_play+'s\t'+this.score_game, style_under);

		}else{

			var text = this.add.text(this.game.width /2, this.game.height - 100, "LEVEL\tTIME\tSCORE", style_top);
    		this.text_score = this.add.text(this.game.width /2, this.game.height - 70, '  '+this.level+'\t'+this.time_play+'s\t'+this.score_game, style_under);

		}
	}

	_drawBackground() {
		if(1420/this.w >= 1420/this.h) {
            var bg_h = this.h;
            var bg_w = 1420*this.h/1420;
        }else{
            var bg_w = this.w;
            var bg_h = 1420*this.w/1420;
        }

        let bg = this.game.add.image(this.w/2, this.h, "background");
        bg.width = bg_w;
        bg.height = bg_h;
        bg.anchor.setTo(0.5,1);


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
		let scale_maps;
		let map;
		let layer;


		if(this.mapScreen == 3) {
			map = this.add.tilemap('map');
			map.addTilesetImage('pipe');
			map.addTilesetImage('water');
			scale_maps = this.game.width / 768;
		}

		if(this.mapScreen == 2){
			 map = this.add.tilemap('map-normal');
			 map.addTilesetImage('pipe_normal');
			 map.addTilesetImage('water-normal');
			 scale_maps = this.game.width / 492;
		}

		if(this.mapScreen == 1) {
			 map = this.add.tilemap('map-small');
			 map.addTilesetImage('pipe_small');
			 map.addTilesetImage('water-small');
			 scale_maps = this.game.width / 408;	
		}


		layer = map.createLayer('Tile Layer 1');
		layer.fixedToCamera = false;
		layer.scale.setTo(scale_maps);
		layer.x = 0;
		layer.y = this.panelHeight;
		console.log(layer.width);
		console.log(this.game.width);
		layer.resizeWorld();
		

		this.game.physics.startSystem(Phaser.Physics.ARCADE);


		this.waters = this.game.add.group();
		this.waters.enableBody = true;


		//  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
		if(this.mapScreen == 3){
				map.createFromObjects('Object Layer 1', 2561, 'water', 0, true, false, this.waters);
		}
		if(this.mapScreen == 2){
			map.createFromObjects('Object Layer 1', 1067, 'water', 0, true, false, this.waters);
		}
		if(this.mapScreen == 1) {
			map.createFromObjects('Object Layer 1', 1293, 'water', 0, true, false, this.waters);
		}

		
		this.waters.scale.setTo(scale_maps);

		this.waters_group = this.waters.children;

		
		for (var i = this.waters_group.length - 1; i >= 0; i--) {
			this.waters_group[i].y = this.waters_group[i].y + this.panelHeight;
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

		if(this.smallScreen){
			this.text_score.setText(''+this.time_play+'s\t'+this.score_game);
		}else{
			this.text_score.setText('  '+this.level+'\t'+this.time_play+'s\t'+this.score_game);	
		}
		

		// Go to level 2 - 20
		if(this.score_game == 20){
			this.level = this.level + 1;
			// this.state.start('game-over', true, false, this.score_game, this.time_play);

            this.state.start('game', true, false, this.level, this.score_game,this.time_play);
		}

		// Go to level 3 - 45
		if(this.score_game == 45){
			this.level = this.level + 1;
            this.state.start('game', true, false, this.level, this.score_game,this.time_play);
		}

		// Go to level 4 - 75
		if(this.score_game == 75){
			this.level = this.level + 1;
            this.state.start('game', true, false, this.level, this.score_game,this.time_play);
		}

		// Go to level 5 - 110
		if(this.score_game == 110){
			this.level = this.level + 1;
            this.state.start('game', true, false, this.level, this.score_game,this.time_play);
		}

		// Go to submit score table - 150
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
		let cc = this.add.sprite(0, 0, 'animator-end');
		cc.anchor.setTo(0.5);
		cc.scale.setTo(this.animatorWidth/502);
		cc.bottom = this.game.height;
		cc.left = 0;
		return cc;
	}

	_drawIntroduction() {
		const panelWidth = this.game.width - 2 * this.pannel_margin_left,
			overlayHeight = this.game.height - this.panelHeight,
			panelHeight = overlayHeight - 50;

		let cc = this.add.group();
		cc.x = -this.game.width;
		cc.alpha = 0;
		cc.width = this.game.width;
		let bg = this.add.sprite(this.pannel_margin_left, this.panelHeight + 25,'pause');
		bg.width = panelWidth;
		bg.height = panelHeight;
		bg.alpha = 0.9;


		const style = {
			font: '600 '+this.intro_font+'px AvenirNextLTPro-HeavyCn',
			fill: '#000000',
			align: 'center'
		};

		const text1 = this.add.text(this.game.width / 2, panelHeight/3 + this.panelHeight + 25, 'INSTRUCTIONS', style);
		text1.anchor.setTo(0.5);
		const text2 = this.add.text(this.game.width / 2, panelHeight/3 + text1.height + this.panelHeight + 40 + 1.3 * this.intro_font, 'TAP ON THE LEAKS TO FIX THEM. \nFIX AS MANY LEAKS AS YOU CAN \nWITHIN THE ALLOCATED TIME.', style);
		text2.anchor.setTo(0.5);

		this.okButton = this.add.button(this.game.width / 2, panelHeight/3 + text2.height + this.panelHeight + 70 + 1.5 *this.intro_font, 'ok-button', this.actionOkOnClick.bind(this));
		this.okButton.anchor.setTo(0.5);
		this.okButton.alpha = 1;
		this.okButton.lock = true;

		let button_scale = this.ok_width / 124;
		this.okButton.scale.setTo(button_scale);

		cc.addChild(bg);
		cc.addChild(text1);
		cc.addChild(text2);
		cc.addChild(this.okButton);

		return cc;
	}

	_drawPauseGame() {

		const panelWidth = this.game.width - 2 * this.pannel_margin_left,
			overlayHeight = this.game.height - this.panelHeight,
			panelHeight = overlayHeight - 50;

		let cc = this.add.group();
		cc.x = -this.game.width;
		cc.alpha = 0;
		cc.width = this.game.width;
		let bg = this.add.sprite(this.pannel_margin_left, this.panelHeight + 25,'pause');
		bg.width = panelWidth;
		bg.height = panelHeight;
		bg.alpha = 0.9;


		const style = {
			font: '600 '+this.intro_font+'px AvenirNextLTPro-HeavyCn',
			fill: '#000000',
			align: 'center'
		};

	
		const text2 = this.add.text(this.game.width / 2, panelHeight/3 + this.panelHeight + 25, 'GOING TO THE MENU \nWILL END THE GAME', style);
		text2.anchor.setTo(0.5);

		// End Game Btn
		this.endGameBtn = this.add.button(this.game.width / 2 - this.button_dis, panelHeight/3 + text2.height + this.panelHeight + 40 + 1.3 * this.intro_font, 'end-game', this.actionEndGameClick.bind(this), this, 1, 0, 2);
		this.endGameBtn.anchor.setTo(0.5);
		this.endGameBtn.alpha = 1;
		this.endGameBtn.lock = true;

		// Continue Btn
		this.continueBtn = this.add.button(this.game.width / 2 + this.button_dis, panelHeight/3 + text2.height + this.panelHeight + 40 + 1.3 * this.intro_font, 'continue', this.actionContinueClick.bind(this), this, 1, 0, 2);
		this.continueBtn.anchor.setTo(0.5);
		this.continueBtn.alpha = 0;
		this.continueBtn.lock = true;

		cc.addChild(bg);
		cc.addChild(text2);
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
			this.menuButton.lock = false;
		});	
	}

	_drawPanel() {
		let cc = this.add.tileSprite(0, 0, this.game.width, this.panelHeight, 'blue');
		cc.y = -this.panelHeight;
		this.menuButton = this.add.button(0, this.panelHeight / 2, 'menu-button', this.actionMenuOnClick.bind(this));
		this.menuButton.scale.setTo(0.6);
		this.menuButton.anchor.setTo(0.5);
		this.menuButton.right = this.game.width - this.menuButton.offsetX;
		this.menuButton.lock = true;

		const style = {
			font: '600 38px AvenirNextLTPro-UltLtCn',
			fill: '#FFFFFF',
			wordWrap: true,
			wordWrapWidth: this.game.width,
			align: 'center'
		};
		
		let text;
		if(this.smallScreen) {

			text = this.add.text(50, 10 , 'FIX THE LEAK', style);
			text.y = (this.panelHeight - text.height) /2;
		} else {
			text = this.add.text(this.game.width / 2, this.panelHeight / 2, 'FIX THE LEAK', style);	
			text.anchor.setTo(0.5);
		}


		cc.addChild(text);
		cc.addChild(this.menuButton);

		let tween = this.add.tween(cc);

		tween.to({
			y: 0
		}, 500, Phaser.Easing.Bounce.Out, true);

		tween.onComplete.add(() => {
			this.menuButton.lock = true;
		});

		return cc;
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

		console.log(this.menuButton.lock);
		if (!this.menuButton.lock) {
			this.menuButton.lock = true;
			let tween = this.add.tween(this.pauseGame);
			tween.to({
				x: 0,
				alpha: 1
			}, 1000, Phaser.Easing.Exponential.Out, true);

			tween.onComplete.add(() => {
				this.menuButton.lock = true;
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