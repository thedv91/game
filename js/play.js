var playState = {

    create: function() {
        var _self = this;

        game.input.onDown.add(this.unpause, self);

        game.time.events.loop(Phaser.Timer.SECOND, this.updateTime, this);


        this.initBackground();

        _self.managerTime();

        // Show intro screen when loaded
        setTimeout(function(){
            _self.createIntro();
        },200);

        // Game Play
        _self.initGamePlay(number_row, number_col);

    },

    initBackground : function () {
        // Background Image
        game.add.tileSprite(0, 0, 810, 640, "background");

        // Add tree
        var tree  =  game.add.image(150, 0, 'tree');
        tree.scale.set(0.8);

        // Add top menu
        // Here we create the ground.
        var  platforms = game.add.group();
        var ground = platforms.create(0,0, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2.1,2);

        // Add text "Match the pairs" on top screen
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(game.world.centerX, 30, "MATCH THE PAIRS", style);
        text.anchor.set(0.5);

        // Addd menu button
        var menuBtn = game.add.button(game.world.width - 120, 15,'menu-btn',this.clickMenu, this, 2, 1, 0);
        menuBtn.scale.setTo(0.25);
        menuBtn.input.useHandCursor = true;

        // Add Level table

        var levelTable = game.add.image(50,game.world.height - 150,'level-table');
        levelTable.scale.setTo(0.4);

        var style_level = { font: "bold 24px Arial", fill: "#875d25", boundsAlignH: "center", boundsAlignV: "middle" };
        text_level = game.add.text(60, game.world.height - 110, "LEVEL 1", style_level);
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

        var TILE_SIZE = 70;

        var total_card = row*col;

        for (var i = 0; i < total_card/2; i++) {
            images.push(this.game.add.sprite(0,0,''+i));
            images.push(this.game.add.sprite(0,0,''+i));
        }

        this.shuffle(images);

        var left = 300;
        var top = 120;

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
                // we have a match
                score += 1;
                firstClick = null; secondClick = null;

                if(score == number_col*number_row/2){
                    game.state.start('win');
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

        var style = { font: "bold 28px Courier", fill: "#3e434a", tabs: 400 };
        var style_bottom = { font: "bold 40px Courier", fill: "#3e434a", tabs: 400 };

        timeBg = game.add.sprite(w - 200, 100, 'time-bg');
        timeBg.width = 200;
        timeBg.height = 80;

        timeBg.addChild(game.add.text(30, 10, "MOVES\t\t\tTIME", style));
        move_counter = game.add.text(45, 55, ""+moves+"", style_bottom);
        timeBg.addChild(move_counter);

        time_counter = game.add.text(180, 55, time+"s", style_bottom);
        timeBg.addChild(time_counter);

    },

    /*
    *  Show intructions Game
    * */
    createIntro: function () {

        game.paused = true;
        // Then add the menu
        menuIntro = game.add.sprite(w/2, h/2, 'pause');
        menuIntro.anchor.setTo(0.5, 0.5);
        menuIntro.scale.setTo(2,1.5);
        menuIntro.alpha = 0.8;

        //Text Bold
        var text_bold = { font: "bold 32px Arial", fill: "#3e434a",align: "center" };
        instructions = game.add.text(w/2, h/2 - 100, 'INSTRUCTIONS', text_bold);
        instructions.anchor.set(0.5,1);

        // Add text in center pause game
        var style_level = { font: "bold 24px Arial", fill: "#1d5e00",align: "center" };
        text_pause = game.add.text(w/2, h/2 + 50, "TAP ON THE BOXES \nTO FIND MATCHING PAIRS IN " +
            "\nTHE FEWEST NUMBER OF MOVES \nAND THE SHORTEST TIME POSSIBLE", style_level);
        text_pause.anchor.set(0.5,1);
        text_pause.lineSpacing = 10;


        // Add ok btn
        okBtn = game.add.button(w/2, h/2 + 120,'ok');
        // endGame.scale.setTo(0.25);
        okBtn.anchor.set(0.5);
        okBtn.input.useHandCursor = true;
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
        var style_level = { font: "bold 24px Arial", fill: "#875d25", boundsAlignH: "center", boundsAlignV: "middle" };
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

                game.state.start('menu');
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

    },

    Win: function() {
        // We start the win state
        game.state.start('win');
    }

}