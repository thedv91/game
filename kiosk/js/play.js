var playState = {

    init: function (level) {

        if (!level) {
            level = 1;
        }

    },
    create: function () {
        var _self = this;
        enableClickMenu = false;

        // Config for panel
        if (game.width <= 810) {
            panel_height = 57;
        } else {
            panel_height = 90;
        }
        match_the_pair_left = w / 2;

        if (game.width <= 500) {
            panel_margin_left = 12;
            intro_margin_top = 135;
            bold_font = "26px";
            intro_font = '20px';
            menu_font = '26px';
            button_ok_margin = 40;
            match_the_pair_left = w / 4;
            tree_margin_bottom = 90;
        }
        if (game.width > 500 && game.width <= 820) {
            panel_margin_left = 30;
            intro_margin_top = 90;
            bold_font = "30px";
            intro_font = '32px';
            menu_font = '32px';
            button_ok_margin = 40;
            tree_margin_bottom = 65;
        }
        if (game.width > 820) {
            intro_margin_top = 90;
            panel_margin_left = 44;
            bold_font = "42px";
            intro_font = '42px';
            menu_font = '42px';
            button_ok_margin = 60;
            tree_margin_bottom = 65;
        }



        // game.input.onDown.add(this.unpause, self);


        initBg = this.initBackground();

        // Show intro screen when loaded
        if (level == 1) {
            setTimeout(function () {
                _self.createIntro();
            }, 200);
        } else {
            setTimeout(function () {
                _self.initGame();
            }, 200);

        }

    },

    resize: function () {
        w = game.width;
        h = game.height;

        // BG
        if (1208 / w >= 814 / h) {
            bg_h = h;
            bg_w = 1208 * h / 814;
        } else {
            bg_w = w;
            bg_h = 814 * w / 1208;
        }
        menu_bg.x = w / 2;
        menu_bg.y = h;
        menu_bg.width = bg_w;
        menu_bg.height = bg_h;
        menu_bg.anchor.setTo(0.5, 1);

        // Tree
        tree_play.x = w / 2 - tree_play.width / 2;
        tree_play.y = h - tree_play.height - 30;


        // Resize main Game
        margin_left = w / 2 - number_col * TILE_SIZE / 2;

        if (h < 1000) {

            margin_top = h / 2 - number_row * TILE_SIZE / 2 - 200;


            if ((number_row == 6 && number_col == 5) || (number_row == 5 && number_col == 6)) {
                margin_top = h / 2 - number_row * TILE_SIZE / 2 - 60;

            }

            if (number_row == 6 && number_col == 6) {
                margin_top = h / 2 - number_row * TILE_SIZE / 2 - 60;
            }

        } else {

            margin_top = h / 2 - number_row * TILE_SIZE / 2;
        }



        for (var i = 0; i < number_row; i++) {
            for (var j = 0; j < number_col; j++) {
                var idx = i * number_col + j;

                movies[idx].x = margin_left + j * TILE_SIZE + TILE_SIZE / 2;
                movies[idx].y = margin_top + i * TILE_SIZE;
            }
        }

        // Ground scale
        ground.width = w;
        text.x = w / 2;
        menuBtn.x = w - 160;
        timeBg.x = w;

    },

    initBackground: function () {

        var bg_w, bg_h;

        if (1208 / w >= 814 / h) {
            bg_h = h;
            bg_w = 1208 * h / 814;
        } else {
            bg_w = w;
            bg_h = 814 * w / 1208;
        }
        menu_bg = game.add.image(w / 2, h, "play_bg");
        menu_bg.width = bg_w;
        menu_bg.height = bg_h;
        menu_bg.anchor.setTo(0.5, 1);


        // Add wally swing

        if (h >= 768) {
            var wally_margin_bottom = 400;
            var wally_scale = 0.7;
        } else {
            var wally_margin_bottom = 305;
            var wally_scale = 0.5;
        }

        wally_swing = game.add.sprite(w / 2 - 10, h - wally_margin_bottom, 'wally-animation');
        wally_swing.scale.setTo(wally_scale);
        wally_swing.animations.add('swing');
        wally_swing.animations.play('swing', 20, true);

        // add Tree
        tree_play = game.cache.getImage('bg_play');
        tree_play = game.add.image(w / 2 - tree_play.width / 2, h - tree_play.height - tree_margin_bottom, 'bg_play');

        // Add top menu
        // Here we create the ground.
        var platforms = game.add.group();
        ground = platforms.create(0, 0, 'ground');
        ground.width = w;
        ground.height = panel_height;


        // Add text "Match the pairs" on top screen
        var style = { font: "bold 36px AvenirNextLTProHeavyCn", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        if (game.width <= 500) {
            text = game.add.text(10, panel_height / 4, "MATCH THE PAIRS", {
                font: "bold 28px AvenirNextLTProHeavyCn",
                fill: "#fff",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });
            // text.anchor.set(1,0.5);
        } else {

            text = game.add.text(match_the_pair_left, panel_height / 2, "MATCH THE PAIRS", style);
            text.anchor.set(0.5);

        }

        // Addd menu button
        menuBtn = game.add.button(game.world.width - 160, panel_height / 2 - 18, 'menu-btn', this.clickMenu, this);
        menuBtn.input.useHandCursor = true;
    },

    /*
     * Update time
     * */
    updateTime: function () {

        time++;
        // text_bottom.text = level+' \t'+moves+' \t'+time+'s';

        text_level_number.text = level;
        text_moves_number.text = moves;
        text_time_number.text = time + 's';
    },

    /*
     * Main Game Play
     * */
    initGamePlay: function (row, col) {


        var total_card = row * col;
        cards = [];
        images = [];
        movies = [];
        total_open = 0;


        for (var i = 0; i < total_card / 2; i++) {
            images.push(this.game.add.sprite(0, 0, '' + i));
            images.push(this.game.add.sprite(0, 0, '' + i));
        }

        this.shuffle(images);


        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var idx = i * col + j;
                // cards[idx] = this.game.add.sprite(left + j*TILE_SIZE, top + i*TILE_SIZE,'back');
                cards[idx] = this.game.add.sprite(0, 0, 'back');
                cards[idx].anchor.setTo(0.5, 0.5);
                cards[idx].scale.x = 1;
                cards[idx].scale.setTo(TILE_SIZE / cards[idx]._frame.width);


                images[idx].scale.setTo(TILE_SIZE / images[idx]._frame.width);
                images[idx].anchor.setTo(0.5, 0.5);


                movies[idx] = game.add.sprite(margin_left + j * TILE_SIZE + TILE_SIZE / 2, margin_top + i * TILE_SIZE);
                // movies[idx] = game.add.sprite(j*TILE_SIZE, margin_top + i*TILE_SIZE);
                // movies[idx].x = j*TILE_SIZE;
                movies[idx].addChild(images[idx]);
                movies[idx].addChild(cards[idx]);
                movies[idx].events.onInputDown.add(this.doClick, this);
                movies[idx].inputEnabled = true;
                movies[idx].index = idx;

                movies[idx].input.useHandCursor = true;

                game.physics.arcade.enable(movies[idx]);
                game.physics.arcade.enable(images[idx]);
                game.physics.arcade.enable(cards[idx]);
            }
        }


    },
    flipCard: function (sprite, pointer) {
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

    flipFake: function (sprite) {
        var tween = game.add.tween(sprite.scale).to({
            x: 1
        }, 200, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(function () {
            click = true;
            sprite.up = !sprite.up;
        }, this);
    },

    flipFakeCorrect: function (sprite) {
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
            text_moves_number.text = moves;

            this.flipCard(sprite);

            firstClick = sprite.index;
        }
        else if (secondClick == null) {

            moves++;
            text_moves_number.text = moves;
            this.flipCard(sprite);

            secondClick = sprite.index;
            if (secondClick == firstClick) {
                secondClick = null;
                firstClick = null;
                return;
            }


            if (images[firstClick].key === images[secondClick].key) {

                setTimeout(function () {
                    _self.flipFakeCorrect(movies[firstClick]);
                    _self.flipFakeCorrect(movies[secondClick]);

                    // firstClick = null; secondClick = null;
                }, 800);
                setTimeout(function () {
                    firstClick = null; secondClick = null;
                }, 1000);

                total_open = total_open + 2;

                // we have a match
                score += 1;


                if (total_open == number_col * number_row) {

                    setTimeout(function () {
                        cards = [];
                        images = [];
                        movies = [];
                        game.state.start('win');

                        // We start the win state

                    }, 1000);

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

    shuffle: function (o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    },

    /*
     *  Manager Time and Move
     * */
    managerTime: function () {

        is_playing = 1;

        var style = { font: "24px AvenirNextLTProHeavyCn", fill: "#3f5405", boundsAlignH: "center", boundsAlignV: "top" };
        var style_bottom = { font: "bold 40px AvenirNextLTProHeavyCn", fill: "#3f5405", boundsAlignH: "center", boundsAlignV: "top" };

        manager_time = game.add.group();
        manager_time.x = 0;
        manager_time.y = h - 70;


        var text_level = game.add.text(0, 0, 'LEVEL \n', style);
        text_level.setTextBounds(0, 0, 0, 0);
        text_level_number = game.add.text(0, 25, level, style_bottom);
        text_level_number.setTextBounds(0, 0, 0, 0);

        var text_moves = game.add.text(text_level.width + 20, 0, 'MOVES', style);
        text_moves.setTextBounds(0, 0, 0, 0);
        text_moves_number = game.add.text(text_level.width + 20, 25, moves, style_bottom);
        text_moves_number.setTextBounds(0, 0, 0, 0);


        var text_time = game.add.text(text_level.width + text_moves.width + 30, 0, 'TIME', style);
        text_time.setTextBounds(0, 0, 0, 0);
        text_time_number = game.add.text(text_level.width + text_moves.width + 30, 25, time + 's', style_bottom);
        text_time_number.setTextBounds(0, 0, 0, 0);


        // Add Level table
        // var text_top = game.add.text(0, 0, 'LEVEL \tMOVES \tTIME', style);
        // text_top.anchor.setTo(0.5);

        // text_bottom = game.add.text(25, 35, level+' \t'+moves+' \t'+time+'s', style_bottom);
        // text_bottom.anchor.setTo(0.5);

        // manager_time.add(text_top);
        // manager_time.add(text_bottom);

        manager_time.add(text_level);
        manager_time.add(text_level_number);
        manager_time.add(text_moves);
        manager_time.add(text_moves_number);
        manager_time.add(text_time);
        manager_time.add(text_time_number);

        let temp = (text_level.width + text_moves.width + text_time.width) / 2;
        game.add.tween(manager_time).to({ x: w / 2 - temp }, 1000, Phaser.Easing.Bounce.Out, true);

    },

    /*
     *  Show intructions Game
     * */

    createIntro: function () {

        menuIntro = game.add.sprite(panel_margin_left, 0, 'pause');
        menuIntro.width = game.width - panel_margin_left * 2;
        menuIntro.height = game.height - panel_height - 50;
        menuIntro.alpha = 0.95;

        game.add.tween(menuIntro).to({ y: panel_height + 25 }, 500, Phaser.Easing.Back.Out, true);

        //Text Bold
        var text_bold = { font: bold_font + " AvenirNextLTProHeavyCn", fill: "#3f5405", align: "center" };
        instructions = game.add.text(w / 2, 0, 'INSTRUCTIONS', text_bold);
        instructions.anchor.set(0.5, 1);

        game.add.tween(instructions).to({ y: h / 2 - intro_margin_top }, 1000, Phaser.Easing.Back.Out, true);

        lineHR = game.add.tileSprite(w / 2, 0, instructions.width, 2, 'green-dark');
        lineHR.anchor.setTo(0.5, 1);
        game.add.tween(lineHR).to({ y: h / 2 - intro_margin_top }, 1000, Phaser.Easing.Back.Out, true);


        // Add text in center pause game
        var style_level = { font: "bold " + intro_font + " AvenirNextLTProHeavyCn", fill: "#3f5405", align: "center" };
        text_pause = game.add.text(w / 2, 0, "TAP ON THE BOXES \nTO FIND THE MATCHING PAIRS IN " +
            "\nTHE FEWEST NUMBER OF MOVES \nAND THE SHORTEST TIME POSSIBLE", style_level);
        text_pause.anchor.set(0.5, 1);
        text_pause.lineSpacing = 1;


        game.add.tween(text_pause).to({ y: h / 2 - intro_margin_top + text_pause.height + 20 }, 1000, Phaser.Easing.Back.Out, true);


        okBtn = game.add.button(w / 2, 0, 'ok', '', '');
        okBtn.anchor.set(0.5);
        okBtn.onInputDown.add(this.initGame, this);
        okBtn.input.useHandCursor = true;

        game.add.tween(okBtn).to({ y: h / 2 - intro_margin_top + text_pause.height + 20 + button_ok_margin }, 1000, Phaser.Easing.Back.Out, true);
    },

    initGame: function () {

        var _self = this;
        enableClickMenu = true;
        okBtn.destroy();
        menuIntro.destroy();
        instructions.destroy();
        lineHR.destroy();
        text_pause.destroy();

        game.time.events.loop(Phaser.Timer.SECOND, _self.updateTime, _self);

        _self.managerTime();

        switch (level) {
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

        if (game.width < 500) {
            TILE_SIZE = (5 * w / 6) / number_col;
        } else {
            TILE_SIZE = (3 * h / 7) / number_row;
        }


        margin_left = w / 2 - number_col * TILE_SIZE / 2;

        if (h < 1000) {

            margin_top = h / 2 - number_row * TILE_SIZE / 2 - 120;


            if ((number_col == 6 && number_col == 5) || (number_col == 5 && number_col == 6)) {

                margin_top = h / 2 - number_row * TILE_SIZE / 2 - 90;


            }

            if (number_row == 6 && number_col == 6) {
                margin_top = h / 2 - number_row * TILE_SIZE / 2 - 100;
            }

        } else {

            margin_top = h / 2 - number_row * TILE_SIZE / 2;
        }

        if ((margin_top - TILE_SIZE / 2) <= panel_height) {
            margin_top = panel_height + TILE_SIZE / 2 + 10;
        }

        _self.initGamePlay(number_row, number_col);


    },

    /*
     * Click Menu button
     * */
    clickMenu: function () {

        if (!enableClickMenu) return false;
        enableClickMenu = false;
        game.time.events.pause();

        // Then add the menu
        menu = game.add.sprite(panel_margin_left, 0, 'pause');
        menu.width = game.width - panel_margin_left * 2;
        menu.height = game.height - panel_height - 50;
        menu.alpha = 0.95;

        game.add.tween(menu).to({ y: panel_height + 25 }, 1000, Phaser.Easing.Bounce.Out, true);

        // Add text in center pause game
        var style_level = { font: "bold " + menu_font + " AvenirNextLTProHeavyCn", fill: "#455912", boundsAlignH: "center", boundsAlignV: "middle" };
        text_pause = game.add.text(w / 2, 0, "GOING TO THE MENU \nWILL END THE GAME", style_level);
        text_pause.anchor.set(0.5, 1);

        game.add.tween(text_pause).to({ y: h / 2 }, 1000, Phaser.Easing.Bounce.Out, true);

        // Add two button
        endGame = game.add.button(w / 2 - 160, 0, 'end-game', this.clickEndGame);
        // endGame.scale.setTo(0.25);
        endGame.input.useHandCursor = true;
        game.add.tween(endGame).to({ y: h / 2 + 50 }, 1000, Phaser.Easing.Bounce.Out, true);

        continueGame = game.add.button(w / 2, 0, 'continue', this.clickContinueGame);
        // continueGame.scale.setTo(0.25);
        continueGame.input.useHandCursor = true;
        game.add.tween(continueGame).to({ y: h / 2 + 50 }, 1000, Phaser.Easing.Bounce.Out, true);

    },

    clickContinueGame: function () {
        enableClickMenu = true;
        menu.destroy();
        text_pause.destroy();
        endGame.destroy();
        continueGame.destroy();
        game.time.events.resume();
    },

    clickEndGame: function () {
        // remove All image card
        cards = [];
        images = [];
        moves = 0;
        time = 0;
        score = 0;

        // game.state.start('menu');
        game.stateTransition.to('menu');
    },

    update: function () {

        if (noMatch) {
            if (this.game.time.totalElapsedSeconds() - clickTime > 1) {
                noMatch = false;

                this.flipCard(movies[firstClick]);
                this.flipCard(movies[secondClick]);

                firstClick = null; secondClick = null;
            }
        }


    },

    toWinStage: function () {
        cards = [];
        images = [];
        // We start the win state
        game.state.start('win');
    }

}