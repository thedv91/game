var playState = {

    init: function(level) {
        console.log('Level '+level);
    },
    create: function() {
        var _self = this;

        game.input.onDown.add(this.unpause, self);

        var text_option = {
            left : 70,
            top: game.world.height - 110,
            content : 'LEVEL '+level
        };
        this.initBackground(text_option);


        // Show intro screen when loaded
        if(level == 1) {
            setTimeout(function(){
                _self.createIntro();
            },200);
        }else{
            setTimeout(function(){
                _self.initGame();
            },200);

        }

    },

    initBackground : function (text_option) {

        var bg_w,bg_h;

        if(1208/w >= 814/h) {
            bg_h = h;
            bg_w = 1208*h/814;
        }else{
            bg_w = w;
            bg_h = 814*w/1208;
        }
        menu_bg = game.add.image(w/2, h, "play_bg");
        menu_bg.width = bg_w;
        menu_bg.height = bg_h;
        menu_bg.anchor.setTo(0.5,1);

        // add Tree
        var tree = game.cache.getImage('bg_play');
        var tree  =  game.add.image(w/2 - tree.width/2 + 50, h - tree.height -30, 'bg_play');

        // Add top menu
        // Here we create the ground.
        var  platforms = game.add.group();
        var ground = platforms.create(0,0, 'ground');
        ground.width = w;
        ground.height = 60;

         // Add text "Match the pairs" on top screen
        var style = { font: "bold 36px AvenirNextLTProHeavyCn", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(w/2, 32, "MATCH THE PAIRS", style);
        text.anchor.set(0.5);

        // Addd menu button
        menuBtn = game.add.button(game.world.width - 160, 12,'menu-btn',this.clickMenu, this);
        menuBtn.input.useHandCursor = true;

        // Add Level table

        var style_level = { font: "bold 24px AvenirNextLTProHeavyCn", fill: "#3f5405", boundsAlignH: "center", boundsAlignV: "middle" };

        text_level = game.add.text(0, h, text_option.content, style_level);
        text_level.anchor.setTo(0.5,1);

        game.add.tween(text_level).to( { x: w/2 }, 1000, Phaser.Easing.Bounce.Out, true);
    },

    /*
     * Update time
     * */
    updateTime: function(){

        time++;
        time_counter.setText(time + 's');
    },

    /*
     * Main Game Play
     * */
    initGamePlay: function (row, col) {

        if(row == 6 && col ==6) {
            TILE_SIZE = 50;
        }
        if(row == 6 && col ==5) {
            TILE_SIZE = 50;
        }

        var total_card = row*col;
        cards = [];
        images = [];
        movies = [];
        total_open = 0;


        for (var i = 0; i < total_card/2; i++) {
            images.push(this.game.add.sprite(0,0,''+i));
            images.push(this.game.add.sprite(0,0,''+i));
        }

        this.shuffle(images);

        var left = w/2 - col*TILE_SIZE/2;



        if(h < 1000) {
            var top = h/2 - row*TILE_SIZE/2 - 80;

            if((row == 6 && col ==5)|| (row == 5 && col ==6)) {
                var top = h/2 - row*TILE_SIZE/2 - 60;
            }

            if(row == 6 && col ==6) {
                var top = h/2 - row*TILE_SIZE/2 - 60;
            }

        }else{
            var top = h/2 - row*TILE_SIZE/2;
        }


        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var idx = i*col+j;
                // cards[idx] = this.game.add.sprite(left + j*TILE_SIZE, top + i*TILE_SIZE,'back');
                cards[idx] = this.game.add.sprite(0, 0,'back');
                cards[idx].anchor.setTo(0.5, 0.5);
                cards[idx].scale.x = -1;
                cards[idx].scale.setTo(TILE_SIZE/cards[idx]._frame.width);



                images[idx].scale.setTo(TILE_SIZE/images[idx]._frame.width);
                images[idx].anchor.setTo(0.5, 0.5);


                movies[idx] = game.add.sprite(left + j*TILE_SIZE + TILE_SIZE/2, top + i*TILE_SIZE);
                movies[idx].addChild(images[idx]);
                movies[idx].addChild(cards[idx]);
                movies[idx].events.onInputDown.add(this.doClick, this);
                movies[idx].inputEnabled = true;
                movies[idx].input.useHandCursor = true;
                movies[idx].index = idx;

                game.physics.arcade.enable(movies[idx]);
                game.physics.arcade.enable(images[idx]);
                game.physics.arcade.enable(cards[idx]);
            }
        }


    },
    flipCard : function(sprite, pointer) {
        sprite.up = sprite.up || false;
        /*if (click) {
         click = false;*/
        var tween = game.add.tween(sprite.scale).to({
            x: 0
        }, 100, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(function () {
            var back = sprite.getChildAt(1);
            if (sprite.up) {
                back.visible = true;
            } else {
                back.visible = false;
            }

            this.flipFake(sprite);
        }, this);
        // }

    },

    flipFake: function(sprite) {
        var tween = game.add.tween(sprite.scale).to({
            x: 1
        }, 200, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(function () {
            click = true;
            sprite.up = !sprite.up;
        }, this);
    },

    flipFakeCorrect: function(sprite) {
        var tween = game.add.tween(sprite.scale).to({
            x: 0
        }, 200, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(function () {
            click = true;
            sprite.up = !sprite.up;
        }, this);
    },

    doClick: function (sprite) {
        
        var _self = this;


        if (firstClick == null) {
            moves++;
            move_counter.text = moves;
            this.flipCard(sprite);

            firstClick = sprite.index;
        }
        else if (secondClick == null) {

            moves++;
            move_counter.text = moves;
            this.flipCard(sprite);

            secondClick = sprite.index;
            if(secondClick == firstClick ) {
                secondClick = null;
                firstClick = null;
                return;
            }


            if (images[firstClick].key === images[secondClick].key) {

                setTimeout(function () {
                    _self.flipFakeCorrect(movies[firstClick]);
                    _self.flipFakeCorrect(movies[secondClick]);

                    // firstClick = null; secondClick = null;
                },800);
                setTimeout(function () {
                    firstClick = null; secondClick = null;
                },1000);

                total_open = total_open + 2;

                // we have a match
                score += 1;


                if(total_open == number_col*number_row){

                    setTimeout(function () {
                        cards = [];
                        images = [];
                        movies = [];
                        game.state.start('win');
                    },1000);

                }
            }
            else {
                // no match
                //score -= 5;
                noMatch = true;
            }
        }
        else {
            return; // don't allow a third click, instead wait for the update loop to flip back after 0.5 seconds
        }

        clickTime = sprite.game.time.totalElapsedSeconds();
        // sprite.visible = false;
        // images[sprite.index].visible = true;
    },

    shuffle: function(o) {
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    },

    /*
     *  Manager Time and Move
     * */
    managerTime : function () {

        is_playing = 1;

        var style = { font: "20px AvenirNextLTProHeavyCn", fill: "#7d5c2e", tabs: 20 };
        var style_bottom = { font: "bold 32px AvenirNextLTProHeavyCn", fill: "#755425", tabs: 20 };

        timeBg = game.add.sprite(w, 100, 'time-bg');
        timeBg.width = 198;
        timeBg.height = 116;

        timeBg.addChild(game.add.text(30, 10, "MOVES \t\t TIME", style));
        move_counter = game.add.text(45, 40, ""+moves+"", style_bottom);
        timeBg.addChild(move_counter);

        time_counter = game.add.text(120, 40, time+"s", style_bottom);
        timeBg.addChild(time_counter);

    },

    /*
     *  Show intructions Game
     * */
    createIntro: function () {

        menuIntro = game.add.sprite(w/2,0, 'pause');
        menuIntro.anchor.setTo(0.5, 0.5);
        menuIntro.scale.setTo(2,1.5);
        menuIntro.alpha = 0.95;

        game.add.tween(menuIntro).to( { y: h/2 }, 1000, Phaser.Easing.Back.Out, true);

        //Text Bold
        var text_bold = { font: "42px AvenirNextLTProHeavyCn", fill: "#3f5405",align: "center" };
        instructions = game.add.text(w/2, 0, 'INSTRUCTIONS', text_bold);
        instructions.anchor.set(0.5,1);

        game.add.tween(instructions).to( { y: h/2 - 110 }, 1000, Phaser.Easing.Back.Out, true);

        // Add text in center pause game
        var style_level = { font: "bold 34px AvenirNextLTProHeavyCn", fill: "#3f5405",align: "center" };
        text_pause = game.add.text(w/2, 0, "TAP ON THE BOXES \nTO FIND MATCHING PAIRS IN " +
            "\nTHE FEWEST NUMBER OF MOVES \nAND THE SHORTEST TIME POSSIBLE", style_level);
        text_pause.anchor.set(0.5,1);
        text_pause.lineSpacing = 1;

        game.add.tween(text_pause).to( { y: h/2 + 90 }, 1000, Phaser.Easing.Back.Out, true);



        okBtn =  game.add.button(w/2, 0, 'ok','','');
        okBtn.anchor.set(0.5);
        okBtn.onInputDown.add(this.initGame,this);
        okBtn.input.useHandCursor = true;

        game.add.tween(okBtn).to( { y: h/2 + 135 }, 1000, Phaser.Easing.Back.Out, true);
    },

    initGame : function () {

        var _self = this;
        okBtn.destroy();
        menuIntro.destroy();
        instructions.destroy();
        text_pause.destroy();

        game.time.events.loop(Phaser.Timer.SECOND, _self.updateTime, _self);

        _self.managerTime();

        _self.initGamePlay(number_row, number_col);

    },

    /*
     * Click Menu button
     * */
    clickMenu : function () {

         // When the paus button is pressed, we pause the game
        setTimeout(function () {
            game.paused = true;
        },1000);


        // Then add the menu
        menu = game.add.sprite(w/2, 0, 'pause');
        menu.anchor.setTo(0.5, 0.5);
        menu.scale.setTo(2,1.5);
        menu.alpha = 0.95;

        game.add.tween(menu).to( { y: h/2 }, 1000, Phaser.Easing.Bounce.Out, true);

        // Add text in center pause game
        var style_level = { font: "bold 42px AvenirNextLTProHeavyCn", fill: "#455912", boundsAlignH: "center", boundsAlignV: "middle" };
        text_pause = game.add.text(w/2, 0, "GOING TO THE MENU \nWILL END THE GAME", style_level);
        text_pause.anchor.set(0.5,1);

        game.add.tween(text_pause).to( { y: h/2 }, 1000, Phaser.Easing.Bounce.Out, true);

        // Add two button
        endGame = game.add.button(w/2 - 180, 0,'end-game');
        // endGame.scale.setTo(0.25);
        endGame.input.useHandCursor = true;
        game.add.tween(endGame).to( { y: h/2 + 50 }, 1000, Phaser.Easing.Bounce.Out, true);

        continueGame = game.add.button(w/2 + 20, 0,'continue');
        // continueGame.scale.setTo(0.25);
        continueGame.input.useHandCursor = true;
        game.add.tween(continueGame).to( { y: h/2 + 50 }, 1000, Phaser.Easing.Bounce.Out, true);

    },

    // And finally the method that handels the pause menu
    unpause :function(event){
        // Only act if paused
        if(game.paused){

            // Click to Ok Btn
            var m1 = w/2 - 60 , m2 = w/2 + 60,
                n1 = h/2 + 120 - 60 , n2 = h/2 + 120 + 50 + 60;

            // Click end Game, redirect to 'menu' stage
            if(event.x > m1 && event.x < m2 && event.y > n1 && event.y < n2 ){

                menuIntro.destroy();
                instructions.destroy();
                text_pause.destroy();
                okBtn.destroy();

                // Unpause the game
                game.paused = false;
            }


            // Click to End Game
            var x1 = w/2 - 180 , x2 = w/2 - 180 + 120,
                y1 = h/2 + 50 , y2 = h/2 + 50 + 50;

            // Click end Game, redirect to 'menu' stage
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                // Unpause the game
                game.paused = false;

                // remove All image card
                cards = [];
                images = [];
                moves = 0;
                time = 0;
                score = 0;

                // game.state.start('menu');
                game.stateTransition.to('menu');
            }

            // Click Continue, redirect to 'menu' stage
            var u1 = w/2 + 20 , u2 = w/2 + 20  + 120,
                v1 = h/2 + 50 , v2 = h/2 + 50 + 50;


            if(event.x > u1 && event.x < u2 && event.y > v1 && event.y < v2 ){
                // game.state.start('menu');
                menu.destroy();
                text_pause.destroy();
                endGame.destroy();
                continueGame.destroy();

                // Unpause the game
                game.paused = false;
            }
        }
    },

    update: function() {

        if (noMatch) {
            if (this.game.time.totalElapsedSeconds() - clickTime > 1) {
                noMatch = false;

                this.flipCard(movies[firstClick]);
                this.flipCard(movies[secondClick]);

                firstClick = null; secondClick = null;
            }
        }

        if(is_playing) {
            if (timeBg.x > w - 198)
            {
                timeBg.x -= 6;
            }
        }

    },

    toWinStage: function() {
        cards = [];
        images = [];
        // We start the win state
        game.state.start('win');
    }

}