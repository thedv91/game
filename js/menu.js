var menuState = {

    create: function () {
        // reInit data
        moves = 0;
        time = 0;
        score = 0;

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


        var tree  =  game.add.image(w/2 - 745/2 + 50, h - 816 -30, 'tree');


        // Add board
        var board  =  game.add.image(50, -135, 'board');
        board.scale.set(0.75);

        // Add Button
        var button  =  game.add.button(120, 430, 'start', this.start, this, 1, 0, 2);
        button.input.useHandCursor = true;

        // Text
        var style = { font: "26px AvenirNextLTProHeavyCn", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        var text = game.add.text(95, 95, "MATCH THE PAIRS", style);
        this.createText();

    },
    createText : function() {
        var style_normal = { font: "bold 17px AvenirNextLTProCn", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        var style_title = { font: "bold 20px AvenirNextLTProCn", fill: "#fff", textDecoration: "underline", boundsAlignH: "center", boundsAlignV: "middle" };

        var nameUser = game.add.group();
        nameUser.add(game.make.text(130, 155, 'HALL OFF FAME',  style_title));



        $.ajax({
            type: "GET",
            url: "api/public/memory/ranks",
            dataType: "JSON",
            success: function (response) {

               var users = response.ranks;

                for (var i = 0; i < users.length; i++)
                {
                    nameUser.add(game.make.text(70, 200 + i * 28, users[i].name.toUpperCase(),  style_normal));
                    nameUser.add(game.make.text(250, 200 + i * 28, users[i].score +' PTS',  style_normal));
                }

            }
        });


    },
    // The start function calls the play state
    start: function () {
        // game.stateTransition.to('play');
        // game.state.start('play');
        game.state.start('play', true, false, 1);
    },
};