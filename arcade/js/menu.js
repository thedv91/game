var menuState = {

    create: function () {
        // reInit data
        moves = 0;
        time = 0;
        score = 0;
        level = 1;


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
        

        if(game.width <= 768) {
            var wally_margin_bottom = 390;
            var wally_scale = 0.7;
            wally_swing  = game.add.sprite(w/2 - 40 , h - wally_margin_bottom, 'wally-animation');

            tree = game.add.image(w / 2 - 745 / 2 + 10, h - 875, 'tree');

        }else{
            var wally_margin_bottom = 390;
            var wally_scale = 0.7;
            wally_swing  = game.add.sprite(w/2 + 50 , h - wally_margin_bottom, 'wally-animation');

            tree = game.add.image(w / 2 - 745 / 2 + 100, h - 875, 'tree');
        }

        
        wally_swing.scale.setTo(wally_scale);
        wally_swing.animations.add('swing');
        wally_swing.animations.play('swing', 20, true);

        // Add Button
        if(game.width <= 768) {
            var button_left = w/2 - 180/2;
            var button_height = h - 70;
            var rank_table_left = w/2 -145;
        }else{
            var rank_table_left = 50;
            var button_left = 120;
            var button_height = 430;
        }
        var button  =  game.add.button(0, button_height, 'start', this.start, this, 1, 0, 2);
        game.add.tween(button).to( { x: button_left }, 1000, Phaser.Easing.Bounce.Out, true);
        button.input.useHandCursor = true;

        this.createRankTable(rank_table_left,0);

    },

    resize: function () {
        w = game.width;
        h = game.height;
        // BG
        if(1208/w >= 814/h) {
            bg_h = h;
            bg_w = 1208*h/814;
        }else{
            bg_w = w;
            bg_h = 814*w/1208;
        }
        menu_bg.x = w/2;
        menu_bg.y = h;
        menu_bg.width = bg_w;
        menu_bg.height = bg_h;
        menu_bg.anchor.setTo(0.5,1);

        // Tree

        tree.x =  w/2 - 745/2 + 100;
        tree.y = h - 816;
    },

    createRankTable : function(x,y) {
        var _self = this;

        rank_table = game.add.group();
        rank_table.x = x;
        rank_table.y = y;


        var board  =  game.add.image(0, -175, 'board');
        board.scale.set(0.75);

        rank_table.add(board);


        // Text
        var style = { font: "26px AvenirNextLTProHeavyCn", fill: "#f6ecc9", boundsAlignH: "center", boundsAlignV: "middle" };
        var text = game.add.text(45, 55, "MATCH THE PAIRS", style);

        rank_table.add(text);

        var style_normal = { font: "bold 17px AvenirNextLTProCn", fill: "#f6ecc9", boundsAlignH: "center", boundsAlignV: "middle" };
        var style_title = { font: "bold 24px AvenirNextLTProCn", fill: "#f6ecc9", textDecoration: "underline", boundsAlignH: "center", boundsAlignV: "middle" };

        rank_table.add(game.make.text(75, 110, 'HALL OFF FAME',  style_title));

        var memory_email = localStorage.getItem('user_email');

        /*
        * type == 1: arcade mode
        * type == 0: kiosk mode
        * */
        $.ajax({
            type: "GET",
            url: "../api/public/memory/ranks",
            data: {
                'email': memory_email,
                'type': game_type
            },
            dataType: "JSON",
            success: function (response) {

               var users = response.tops;

                for (var i = 0; i < users.length; i++)
                {
                    rank_table.add(game.make.text(30, 160 + i * 28, _self.trimString(users[i].name.toUpperCase(),15),  style_normal));
                    rank_table.add(game.make.text(210, 160 + i * 28, users[i].time +' S',  style_normal));
                }

                var style_italic = { font: "14px AvenirNextLTProCnIt", fill: "#f6ecc9", boundsAlignH: "center", boundsAlignV: "middle" };
                
                if(response.rank != -1) {
                    rank_table.add(game.make.text(65, 342 , 'YOUR PREVIOUS RANKING: '+response.rank,  style_italic));
                }
            }
        });


    },
    // Trim string
    trimString: function (text,number_text) {
        if(jQuery.trim(text).length < number_text){
            var shortText = text;
        }else{
            var shortText = jQuery.trim(text).substring(0, number_text)+ "...";
        }

        return shortText;
    },
    // The start function calls the play state
    start: function () {
        // game.stateTransition.to('play');
        game.state.start('play');
        // game.state.start('play', true, false, 1);
    },
};