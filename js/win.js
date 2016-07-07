var winState = {

    create: function() {
        var _self = this;

        game.input.onDown.add(playState.unpause, self);

        var text_option = {
            left : 70,
            top : game.world.height - 125,
            content : 'THANK \n   YOU'
        };
        playState.initBackground(text_option);

        var style = { font: "24px AvenirNextLTProHeavyCn",boundsAlignH: "center",  boundsAlignV: "middle", fill: "#9bcd16" };
        var style_white = { font: "bold 40px AvenirNextLTProHeavyCn",boundsAlignH: "center",  boundsAlignV: "middle", fill: "#fff", tabs: 100 };

        text_winner = game.add.text(0, 0, "MOVES      TIME      SCORE", style);
        text_winner.setTextBounds(0, 100, w, 100);
        // text_winner.anchor.setTo(0.5);

        scrore_winner = game.add.text(40, 0, moves+"\t"+time+"s"+"\t"+score, style_white);
        scrore_winner.setTextBounds(0, 100, w, 200);

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

        info_winner = game.add.text(w/2-130, 310, " NAME:\nEMAIL:", style);
        info_winner.anchor.setTo(0.5);
        info_winner.lineSpacing = 10;

        var submitBtn  =  game.add.button(w/2+100, 390, 'submit', this.submitInfo, this, 1, 0, 2);
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



    createInput: function(x, y){
        var bmd = this.add.bitmapData(350, 40);
        var myInput = this.game.add.sprite(x, y, bmd);

        myInput.canvasInput = new CanvasInput({
            canvas: bmd.canvas,
            id: '',
            fontSize: 24,
            // height : 30,
            fontFamily: 'AvenirNextLTProHeavyCn',
            fontColor: '#212121',
            width: 340,
            backgroundColor: '#fff',
            padding: 4,
            borderWidth: 0,
            borderColor: '#fff',
            boxShadow : null,
            selectionColor: '#fff',
            borderRadius: 10,
            placeHolder: '',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)'
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