var winState = {

    create: function() {
        var _self = this;

        game.input.onDown.add(this.unpause, self);

        this.initBackground();

        var style = { font: "bold 32px Courier", fill: "#70fb00", tabs: 400 };
        var style_white = { font: "bold 40px Courier", fill: "#fff", tabs: 400 };

        text_winner = game.add.text(w/2, 170, "MOVES\t\t\tTIME", style);
        text_winner.anchor.setTo(0.5);

        scrore_winner = game.add.text(w/2 + 10, 210, moves+"\t\t\t\t"+time+"s", style_white);
        scrore_winner.anchor.setTo(0.5);

        // User name
        nameUser = this.createInput(game.world.centerX+100, 280);
        nameUser.anchor.set(0.5);
        nameUser.canvasInput.value('');
        nameUser.canvasInput.focus();
        game.add.tween(nameUser);

        // User Emaik
        emailUser = this.createInput(game.world.centerX+100, 330);
        emailUser.anchor.set(0.5);
        emailUser.canvasInput.value('');
        game.add.tween(emailUser);

        info_winner = game.add.text(w/2-130, 295, " NAME:\nEMAIL:", style);
        info_winner.anchor.setTo(0.5);
        info_winner.lineSpacing = 10;

        var submitBtn  =  game.add.button(w/2+100, 390, 'submit', this.submitInfo, this, 2, 1, 0);
        submitBtn.input.useHandCursor = true;
        submitBtn.anchor.setTo(0.5);

    },

    finalScore: function (moves, time) {
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
            time: time
        };

        $.ajax({
            type: "POST",
            url: "api/public/memory/save-info",
            dataType: "JSON",
            data: params,
            success: function (response) {
                if(response.status == 1) {
                   
                    game.state.start('menu');
                }else{
                    console.log('Something error on save Data');
                }
            }
        });

        // console.log(user_name,user_email);
    },

    inputFocus: function(sprite){
        sprite.canvasInput.focus();
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

        var style_level = { font: "bold 24px Arial", fill: "#875d25", align: "center" };
        text_level = game.add.text(60, game.world.height - 110, "THANK \nYOU", style_level);
    },

    createInput: function(x, y){
        var bmd = this.add.bitmapData(350, 50);
        var myInput = this.game.add.sprite(x, y, bmd);

        myInput.canvasInput = new CanvasInput({
            canvas: bmd.canvas,
            id: '',
            fontSize: 24,
            fontFamily: 'Arial',
            fontColor: '#212121',
            fontWeight: 'bold',
            width: 400,
            //padding: 4,
            borderWidth: 1,
            // borderColor: '#000',
            //borderRadius: 3,
            //boxShadow: '1px 1px 0px #fff',
            //innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: ''
        });
        myInput.inputEnabled = true;
        myInput.input.useHandCursor = true;
        myInput.events.onInputUp.add(this.inputFocus, this);

        return myInput;
    },

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
    // The restart function calls the menu state
    restart: function () {
        game.state.start('menu');
    }
}