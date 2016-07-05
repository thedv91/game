var menuState = {

    create: function () {

        game.add.tileSprite(0, 0, 810, 640, "background");

        // add Tree
        var tree  =  game.add.image(150, -280, 'tree');
        tree.scale.set(1.1);

        // Add board
        var board  =  game.add.image(50, -135, 'board');
        board.scale.set(0.75);

        // Add Button
        var button  =  game.add.button(140, 430, 'start', this.start, this, 2, 1, 0);

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
        game.state.start('play');
    },
};