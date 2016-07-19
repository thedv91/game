import Phaser from 'phaser';
import $ from 'jquery';
import variables from './../variables';

export default class extends Phaser.State {
    create() {

        let bg_w, bg_h;

        if (1208 / variables.w >= 814 / variables.h) {
            bg_h = variables.h;
            bg_w = 1208 * variables.h / 814;
        } else {
            bg_w = variables.w;
            bg_h = 814 * variables.w / 1208;
        }
        let menu_bg = this.add.image(variables.w / 2, variables.h, "background");
        menu_bg.width = bg_w;
        menu_bg.height = bg_h;
        menu_bg.anchor.setTo(0.5, 1);


        let tree = this.add.image(variables.w / 2 - 745 / 2 + 50, variables.h - 816 - 30, 'tree');


        // Add board
        let board = this.add.image(50, -135, 'board');
        board.scale.set(0.75);

        // Add Button
        let button = this.add.button(120, 430, 'start', this.start, this, 1, 0, 2);
        button.input.useHandCursor = true;

        // Text
        var style = { font: "26px AvenirNextLTProHeavyCn", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        var text = this.add.text(95, 95, "MATCH THE PAIRS", style);
        this.createText();

    }
    createText() {
        let style_normal = { font: "bold 17px AvenirNextLTProCn", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        let style_title = { font: "bold 20px AvenirNextLTProCn", fill: "#fff", textDecoration: "underline", boundsAlignH: "center", boundsAlignV: "middle" };

        let nameUser = this.add.group();
        nameUser.add(this.make.text(130, 155, 'HALL OFF FAME', style_title));


        var _self = this;
        $.ajax({
            type: "GET",
            url: "api/public/memory/ranks",
            dataType: "JSON",
            success: function (response) {

                let users = response.ranks;

                for (let i = 0; i < users.length; i++) {
                    nameUser.add(_self.make.text(70, 200 + i * 28, users[i].name.toUpperCase(), style_normal));
                    nameUser.add(_self.make.text(250, 200 + i * 28, users[i].score + ' PTS', style_normal));
                }

            }
        });


    }
    // The start function calls the play state
    start() {
        this.state.start('play', true, false, 1);
    }
}