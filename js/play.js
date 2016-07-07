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
        var menu_bg = game.add.image(w/2, h, "background");
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
        ground.height = 70;


        // Add text "Match the pairs" on top screen
        var style = { font: "bold 36px AvenirNextLTProHeavyCn", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(game.world.centerX, 38, "MATCH THE PAIRS", style);
        text.anchor.set(0.5);

        // Addd menu button
        var menuBtn = game.add.button(game.world.width - 160, 15,'menu-btn',this.clickMenu, this, 1, 0, 2);
        menuBtn.scale.setTo(0.75);
        menuBtn.input.useHandCursor = true;

        // Add Level table

        var levelTable = game.add.image(50,game.world.height - 150,'level-table');
        levelTable.scale.setTo(0.4);

        var style_level = { font: "bold 24px AvenirNextLTProHeavyCn", fill: "#875d25", boundsAlignH: "center", boundsAlignV: "middle" };
        text_level = game.add.text(text_option.left, text_option.top, text_option.content, style_level);
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

        var total_card = row*col;
        cards = [];
        images = [];
        total_open = 0;


        for (var i = 0; i < total_card/2; i++) {
            images.push(this.game.add.sprite(0,0,''+i));
            images.push(this.game.add.sprite(0,0,''+i));
        }

        this.shuffle(images);

        var left = w/2 - col*TILE_SIZE/2;

        if(h < 1000) {
            var top = h/2 - row*TILE_SIZE/2 - 100;
        }else{
            var top = h/2 - row*TILE_SIZE/2;
        }


        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var idx = i*col+j;
                cards[idx] = this.game.add.sprite(left + j*TILE_SIZE, top + i*TILE_SIZE,'back');
                cards[idx].width = TILE_SIZE;
                cards[idx].height = TILE_SIZE;
                cards[idx].index = idx;

                images[idx].x = left + j*TILE_SIZE;
                images[idx].y = top + i*TILE_SIZE;
                images[idx].width = TILE_SIZE;
                images[idx].height = TILE_SIZE;
                images[idx].visible = false;

                cards[idx].inputEnabled = true;
                cards[idx].events.onInputDown.add(this.doClick);
                cards[idx].events.onInputOver.add(function(sprite) { sprite.alpha = 0.5; });
                cards[idx].events.onInputOut.add(function(sprite) { sprite.alpha = 1.0; });
            }
        }
    },

    doClick: function (sprite) {
        
        moves++;
        move_counter.text = moves;

        if (firstClick == null) {
            firstClick = sprite.index;
        }
        else if (secondClick == null) {

            secondClick = sprite.index;


            if (images[firstClick].key === images[secondClick].key) {
                total_open = total_open + 2;
                firstClick = null; secondClick = null;

                // we have a match
                score += 1;


                if(total_open == number_col*number_row){

                    setTimeout(function () {
                        cards = [];
                        images = [];
                        if(level == 5){
                            game.state.start('win');
                        }else{
                            level = level + 1;
                             game.state.start('play', true, false, level);
                        }
                        // We start the win state

                    },100);

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
        sprite.visible = false;
        images[sprite.index].visible = true;
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

        menuIntro = game.add.sprite(w/2, h/2, 'pause');
        menuIntro.anchor.setTo(0.5, 0.5);
        menuIntro.scale.setTo(2,1.5);
        menuIntro.alpha = 0.95;

        //Text Bold
        var text_bold = { font: "32px AvenirNextLTProHeavyCn", fill: "#000",align: "center" };
        instructions = game.add.text(w/2, h/2 - 100, 'INSTRUCTIONS', text_bold);
        instructions.anchor.set(0.5,1);

        // Add text in center pause game
        var style_level = { font: "bold 24px AvenirNextLTProHeavyCn", fill: "#1d5e00",align: "center" };
        text_pause = game.add.text(w/2, h/2 + 60, "TAP ON THE BOXES \nTO FIND MATCHING PAIRS IN " +
            "\nTHE FEWEST NUMBER OF MOVES \nAND THE SHORTEST TIME POSSIBLE", style_level);
        text_pause.anchor.set(0.5,1);
        text_pause.lineSpacing = 3;



        okBtn =  game.add.button(w/2, h/2 + 120, 'ok','','', 1, 0, 2);
        okBtn.anchor.set(0.5);
        okBtn.onInputDown.add(this.initGame,this);
        okBtn.input.useHandCursor = true;
    },

    initGame : function () {

        var _self = this;
        okBtn.destroy();
        menuIntro.destroy();
        instructions.destroy();
        text_pause.destroy();

        game.time.events.loop(Phaser.Timer.SECOND, _self.updateTime, _self);

        _self.managerTime();

        switch(level) {
            case 1:
                number_row = 4;
                number_col = 4;
                break;
            case 2:
                number_row = 4;
                number_col = 5;
                break;
            case 3:
                number_row = 5;
                number_col = 6;
                break;
            case 4:
                number_row = 6;
                number_col = 5;
                break;
            case 5:
                number_row = 6;
                number_col = 6;
                break;
            default:
                number_row = 4;
                number_col = 4;
                break;
        }
        _self.initGamePlay(number_row, number_col);

    },

    /*
    * Click Menu button
    * */
    clickMenu : function () {

        // When the paus button is pressed, we pause the game
        game.paused = true;

        // Then add the menu
        menu = game.add.sprite(w/2, h/2, 'pause');
        menu.anchor.setTo(0.5, 0.5);
        menu.scale.setTo(2,1.5);
        menu.alpha = 0.8;

        // Add text in center pause game
        var style_level = { font: "bold 24px AvenirNextLTProHeavyCn", fill: "#875d25", boundsAlignH: "center", boundsAlignV: "middle" };
        text_pause = game.add.text(w/2, h/2, "GOING TO THE MENU \nWILL END THE GAME", style_level);
        text_pause.anchor.set(0.5,1);


        // Add two button
        endGame = game.add.button(w/2 - 180, h/2 + 50,'end-game');
        // endGame.scale.setTo(0.25);
        endGame.input.useHandCursor = true;

        continueGame = game.add.button(w/2 + 20, h/2 + 50,'continue');
        // continueGame.scale.setTo(0.25);
        continueGame.input.useHandCursor = true;

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
            if (this.game.time.totalElapsedSeconds() - clickTime > 0.5) {
                noMatch = false;
                cards[firstClick].visible = true;
                cards[firstClick].alpha = 1.0;
                cards[secondClick].visible = true;
                cards[secondClick].alpha = 1.0;

                images[firstClick].visible = false;
                images[secondClick].visible = false;

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