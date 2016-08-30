import Phaser from 'phaser';

export default class extends Phaser.State {
	create() {
        let _self = this;

        this.input.onDown.add(playState.unpause, self);

        let text_option = {
            left: 70,
            top: this.world.height - 125,
            content: 'THANK \n   YOU'
        };
        playState.initBackground(text_option);

        let style = { font: "24px AvenirNextLTProHeavyCn", boundsAlignH: "center", boundsAlignV: "middle", fill: "#9bcd16" };
        let style_white = { font: "bold 40px AvenirNextLTProHeavyCn", boundsAlignH: "center", boundsAlignV: "middle", fill: "#fff", tabs: 100 };

        text_winner = this.add.text(0, 0, "MOVES      TIME      SCORE", style);
        text_winner.setTextBounds(0, 100, w, 100);
        // text_winner.anchor.setTo(0.5);

        scrore_winner = this.add.text(40, 0, moves + "\t" + time + "s" + "\t" + score, style_white);
        scrore_winner.setTextBounds(0, 100, w, 200);

        // User name
        nameUser = this.createInput(this.world.centerX + 100, 280);
        nameUser.anchor.set(0.5);
        nameUser.canvasInput.value('');
        nameUser.canvasInput.focus();
        this.add.tween(nameUser);

        // User Emaik
        emailUser = this.createInput(this.world.centerX + 100, 330);
        emailUser.anchor.set(0.5);
        emailUser.canvasInput.value('');
        this.add.tween(emailUser);

        info_winner = this.add.text(w / 2 - 130, 310, " NAME:\nEMAIL:", style);
        info_winner.anchor.setTo(0.5);
        info_winner.lineSpacing = 10;

        let submitBtn = this.add.button(w / 2 + 100, 390, 'submit', this.submitInfo, this, 1, 0, 2);
        submitBtn.input.useHandCursor = true;
        submitBtn.anchor.setTo(0.5);

    }

    finalScore(moves, time) {
        return moves + time;
    }

    submitInfo() {
        let flag = true;
        let user_name = nameUser.canvasInput.value();
        let user_email = emailUser.canvasInput.value();
        if (user_name.trim() == "" || user_name.trim() == undefined) {
            nameUser.canvasInput.backgroundColor('#ffc6c6');
            flag = false;
        } else {
            nameUser.canvasInput.backgroundColor('#fff');
        }

        if (user_email.trim() == "" || user_email.trim() == undefined) {
            emailUser.canvasInput.backgroundColor('#ffc6c6');
            flag = false;
        } else {
            emailUser.canvasInput.backgroundColor('#fff');
        }

        if (flag == false) {
            return false;
        }

        let score = this.finalScore(moves, time);


        let params = {
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
                if (response.status == 1) {

                    this.state.start('menu');
                } else {
                    console.log('Something error on save Data');
                }
            }
        });

        // console.log(user_name,user_email);
    }

    inputFocus(sprite) {
        sprite.canvasInput.focus();
    }



    createInput(x, y) {
        let bmd = this.add.bitmapData(350, 40);
        let myInput = this.add.sprite(x, y, bmd);

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
            boxShadow: null,
            selectionColor: '#fff',
            borderRadius: 10,
            placeHolder: '',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)'
        });
        myInput.inputEnabled = true;
        myInput.input.useHandCursor = true;
        myInput.events.onInputUp.add(this.inputFocus, this);

        return myInput;
    }

    // The restart function calls the menu state
    restart() {
        this.state.start('menu');
    }
}