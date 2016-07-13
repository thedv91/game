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
        menu_bg = game.add.image(w/2, h, "background");
        menu_bg.width = bg_w;
        menu_bg.height = bg_h;
        menu_bg.anchor.setTo(0.5,1);


        tree  =  game.add.image(w/2 - 745/2 + 100, h - 816, 'tree');
        // tree.scale.set(1.05);


        // Add board
        var board  =  game.add.image(50, -135, 'board');
        board.scale.set(0.75);

        // Add Button
        var button  =  game.add.button(120, 430, 'start', this.start, this, 1, 0, 2);
        button.input.useHandCursor = true;

        // Text
        var style = { font: "26px AvenirNextLTProHeavyCn", fill: "#f6ecc9", boundsAlignH: "center", boundsAlignV: "middle" };
        var text = game.add.text(95, 95, "MATCH THE PAIRS", style);
        this.createText();

    },

    resize: function () {
        w = game.width;
        h = game.height;
        console.log(game.height);
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

    createText : function() {
        var _self = this;
        var style_normal = { font: "bold 17px AvenirNextLTProCn", fill: "#f6ecc9", boundsAlignH: "center", boundsAlignV: "middle" };
        var style_title = { font: "bold 20px AvenirNextLTProCn", fill: "#f6ecc9", textDecoration: "underline", boundsAlignH: "center", boundsAlignV: "middle" };

        var nameUser = game.add.group();
        nameUser.add(game.make.text(130, 155, 'HALL OFF FAME',  style_title));



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
                    nameUser.add(game.make.text(70, 200 + i * 28, _self.trimString(users[i].name.toUpperCase(),15),  style_normal));
                    nameUser.add(game.make.text(250, 200 + i * 28, users[i].time +' S',  style_normal));
                }

                var style_italic = { font: "14px AvenirNextLTProCnIt", fill: "#f6ecc9", boundsAlignH: "center", boundsAlignV: "middle" };
                
                if(response.rank != -1) {
                    nameUser.add(game.make.text(120, 383 , 'YOUR PREVIOUS RANKING: '+response.rank,  style_italic));
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
        // game.state.start('play');
        game.state.start('play', true, false, 1);
    },
};