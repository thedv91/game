var winState = {

    create: function() {
        var _self = this;

        enableClickMenu = true;
        // Config for panel
        if(game.width <= 810){
            panel_height = 57;
        }else{
            panel_height = 90;
        }
        match_the_pair_left = w/2;

        if(game.width <= 500)
        {
            panel_margin_left = 12;
            intro_font = '20px';
            menu_font = '26px';
            match_the_pair_left = w/4;
            font_thanks = '40px';

            // Config for input
            input_width = 180;
            input_height = 18;
            info_winner_left = w/2 - 120;
        }
        if(game.width > 500 && game.width <= 820){
            panel_margin_left = 30;
            intro_font = '30px';
            menu_font = '32px';
            font_thanks = '40px';

            // Config for input
            input_width = 300;
            input_height = 20;
            info_winner_left = w/2 - 180;
        }
        if(game.width > 820) {
           panel_margin_left = 44;
            intro_font = '34px';
            menu_font = '42px';
            font_thanks = '48px';

            // Config for input
            input_width = 400;
            input_height = 25;
            info_winner_left = w/2 - 240;
        }




        playState.initBackground();

        // Draw Thank You

        var thank_you = game.add.text(w/2, h, 'THANK YOU', {
            font: font_thanks+" AvenirNextLTProHeavyCn",
            fill: "#3f5405"
        });
        thank_you.anchor.setTo(0.5,1);

        text_winner = game.add.text(game.world.centerX, panel_height + 50, "MOVES \tTIME", {
            font: menu_font+" AvenirNextLTProHeavyCn",
            fill: "#b0da40",
            align: "center",
            tabs: 70
        });



        // scrore_winner = game.add.text(game.world.centerX + 35, panel_height + 100, 152+" \t"+532+"s", {
        scrore_winner = game.add.text(game.world.centerX + 35, panel_height + 100, moves+" \t"+time+"s", {
            font: font_thanks+" AvenirNextLTProHeavyCn",
            fill: "#fff",
            tabs: 70
        });

        text_winner.anchor.set(0.5);
        scrore_winner.anchor.set(0.5);

        // User name
        /*nameUser = this.createInput(game.world.centerX- input_width/2, panel_height + 150 - input_height /2, {
            placeHolder: '',
            width: input_width,
            height : input_height
        });*/


        nameUser = this.createInput(game.world.centerX- input_width/2, panel_height + 150 - input_height /2,input_width,input_height);

        if(localStorage.getItem('user_name')){
            nameUser.canvasInput.value(localStorage.getItem('user_name'));
        }else{
            nameUser.canvasInput.value("");
        }
        game.add.tween(nameUser);

        //User Email
        emailUser = this.createInput(game.world.centerX- input_width/2, panel_height + 200 - input_height /2,input_width,input_height);

        if(localStorage.getItem('user_email')){
            emailUser.canvasInput.value(localStorage.getItem('user_email'));
        }else{
            emailUser.canvasInput.value('');
        }

        game.add.tween(emailUser);

        info_winner = game.add.text(info_winner_left, panel_height + 190, " NAME:\nEMAIL:", {
            font: "30px AvenirNextLTProHeavyCn",
            fill: "#b0da40",
            tabs: 140
        });

        info_winner.anchor.setTo(0.5);
        info_winner.lineSpacing = 10;

        var submitBtn  =  game.add.button(w/2, panel_height + 270 , 'submit', this.submitInfo, this);
        submitBtn.input.useHandCursor = true;
        submitBtn.anchor.setTo(0.5);
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
        tree_play.x = w/2 - tree_play.width/2 ;
        tree_play.y = h - tree_play.height -30;


        // Ground scale
        ground.width = w;
        text.x = w/2;
        menuBtn.x = w -160;

        // submit form
        scrore_winner.x = w/2;
        text_winner.x = w/2;
        info_winner.x = w/2 -185;
        emailUser.x = w/2 + 40;
        nameUser.x = w/2 + 40;

    },

    finalScore: function (moves, time) {
        // var score = 1000 000 00001/(moves + time * 2)
        return moves+time;
    },

    submitInfo: function () {
        var flag = true;
        var user_name = nameUser.canvasInput.value();
        var user_email = emailUser.canvasInput.value();
        
        if(user_name.trim() == "" || user_name.trim() == undefined){
            nameUser.canvasInput.backgroundColor('#ffc6c6');
            flag = false;
        }else{
            nameUser.canvasInput.backgroundColor('#fff');
        }

        if(user_email.trim() == "" || user_email.trim() == undefined){
            emailUser.canvasInput.backgroundColor('#ffc6c6');
            flag = false;
        }else{
            emailUser.canvasInput.backgroundColor('#fff');
        }

        if(flag == false){
            return false;
        }

        var score = this.finalScore(moves,time);


        var params = {
            user_name: user_name,
            user_email: user_email,
            score: score,
            moves: moves,
            time: time,
            type: game_type
        };

        $.ajax({
            type: "POST",
            url: "../api/public/memory/save-info",
            dataType: "JSON",
            data: params,
            success: function (response) {
                if(response.status == 1) {
                   localStorage.setItem('user_name',user_name);
                   localStorage.setItem('user_email',user_email);

                   setTimeout(function () {
                       game.state.start('menu');
                   });

                }else{
                    console.log('Something error on save Data');
                }
            }
        });

    },

    inputFocus: function(sprite){
        sprite.canvasInput.focus();
    },



    createInput: function(x, y, width, height){
        var bmd = this.add.bitmapData(500, 42);
        var myInput = this.game.add.sprite(x, y, bmd);

        myInput.canvasInput = new CanvasInput({
            canvas: bmd.canvas,
            font: '24px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: width,
            borderWidth: 0,
            borderColor: '#fff',
            backgroundColor: '#fff',
            height: height,
            borderRadius: 6,
        });
        myInput.inputEnabled = true;
        myInput.input.useHandCursor = true;
        myInput.events.onInputUp.add(this.inputFocus, this);

        return myInput;
    },
    // The restart function calls the menu state
    restart: function () {
        game.state.start('menu');
    }
}