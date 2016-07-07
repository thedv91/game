import Phaser from 'phaser';
import val from './../variables';

export default class extends Phaser.State {
    
    constructor() {
        super();
        this.okBtn;
        this.menuIntro;
        this.instructions;
        this.text_pause;
        this.menu;
        this.text_pause;
        this.endthis;
        this.continuethis;

        if (val.w > 1000) {
            this.TILE_SIZE = 120;
        } else {
            this.TILE_SIZE = 70;
        }
    }

    init() {
        console.log('Level ' + val.level);
    }
    create() {
        let _self = this;

        this.input.onDown.add(this.unpause, self);

        let text_option = {
            left: 70,
            top: this.world.height - 110,
            content: 'LEVEL ' + val.level
        };
        this.initBackground(text_option);


        // Show intro screen when loaded
        if (val.level == 1) {
            setTimeout(function () {
                _self.createIntro();
            }, 200);
        } else {
            setTimeout(function () {
                _self.initGame();
            }, 200);

        }

    }

    initBackground(text_option) {

        let bg_w, bg_h;

        if (1208 / val.w >= 814 / val.h) {
            bg_h = val.h;
            bg_w = 1208 * val.h / 814;
        } else {
            bg_w = val.w;
            bg_h = 814 * val.w / 1208;
        }
        let menu_bg = this.add.image(val.w / 2, val.h, "background");
        menu_bg.width = bg_w;
        menu_bg.height = bg_h;
        menu_bg.anchor.setTo(0.5, 1);

        // add Tree
        let tree = this.cache.getImage('bg_play');
        tree = this.add.image(val.w / 2 - tree.width / 2 + 50, val.h - tree.height - 30, 'bg_play');

        // Add top menu
        // Here we create the ground.
        let platforms = this.add.group();
        let ground = platforms.create(0, 0, 'ground');
        ground.width = val.w;
        ground.height = 70;


        // Add text "Match the pairs" on top screen
        let style = { font: "bold 36px AvenirNextLTProHeavyCn", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.text = this.add.text(this.world.centerX, 38, "MATCH THE PAIRS", style);
        this.text.anchor.set(0.5);

        // Addd menu button
        let menuBtn = this.add.button(this.world.width - 160, 15, 'menu-btn', this.clickMenu, this, 1, 0, 2);
        menuBtn.scale.setTo(0.75);
        menuBtn.input.useHandCursor = true;

        // Add Level table

        let levelTable = this.add.image(50, this.world.height - 150, 'level-table');
        levelTable.scale.setTo(0.4);

        let style_level = { font: "bold 24px AvenirNextLTProHeavyCn", fill: "#875d25", boundsAlignH: "center", boundsAlignV: "middle" };
        this.text_level = this.add.text(text_option.left, text_option.top, text_option.content, style_level);
    }

    /*
    * Update time
    * */
    updateTime() {

        val.time++;
        val.time_counter.setText(val.time + 's');
    }

    /*
    * Main Game Play
    * */
    initGamePlay(row, col) {

        let total_card = row * col;


        for (let i = 0; i < total_card / 2; i++) {
            val.images.push(this.add.sprite(0, 0, '' + i));
            val.images.push(this.add.sprite(0, 0, '' + i));
        }

        this.shuffle(val.images);

        let left = val.w / 2 - col * this.TILE_SIZE / 2;
        let top;
        if (val.h < 1000) {
            top = val.h / 2 - row * this.TILE_SIZE / 2 - 100;
        } else {
            top = val.h / 2 - row * this.TILE_SIZE / 2;
        }


        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                let idx = i * col + j;
                val.cards[idx] = this.add.sprite(left + j * this.TILE_SIZE, top + i * this.TILE_SIZE, 'back');
                val.cards[idx].width = this.TILE_SIZE;
                val.cards[idx].height = this.TILE_SIZE;
                val.cards[idx].index = idx;

                val.images[idx].x = left + j * this.TILE_SIZE;
                val.images[idx].y = top + i * this.TILE_SIZE;
                val.images[idx].width = this.TILE_SIZE;
                val.images[idx].height = this.TILE_SIZE;
                val.images[idx].visible = false;

                val.cards[idx].inputEnabled = true;
                val.cards[idx].events.onInputDown.add(this.doClick.bind(this));
                val.cards[idx].events.onInputOver.add(function (sprite) { sprite.alpha = 0.5; });
                val.cards[idx].events.onInputOut.add(function (sprite) { sprite.alpha = 1.0; });
            }
        }
    }

    doClick(sprite) {
        var self = this;
        val.moves++;
        val.move_counter.text = val.moves;

        if (val.firstClick === null) {
            val.firstClick = sprite.index;
        } else if (val.secondClick === null) {

            val.secondClick = sprite.index;


            if (val.images[val.firstClick].key === val.images[val.secondClick].key) {
                val.total_open = val.total_open + 2;
                val.firstClick = null; val.secondClick = null;

                // we have a match
                val.score += 1;


                if (val.total_open === val.number_col * val.number_row) {

                    setTimeout(function () {
                        val.cards = [];
                        val.images = [];
                        if (val.level == 5) {
                            self.state.start('win');
                        } else {
                            val.level = val.level + 1;
                            self.state.start('play', true, false, val.level);
                        }
                        // We start the win state

                    }, 100);

                }
            }
            else {
                // no match
                //score -= 5;
                val.noMatch = true;
            }
        }
        else {
            return; // don't allow a third click, instead wait for the update loop to flip back after 0.5 seconds
        }

        val.clickTime = sprite.game.time.totalElapsedSeconds();
        sprite.visible = false;
        val.images[sprite.index].visible = true;
    }

    shuffle(o) {
        for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    /*
    *  Manager Time and Move
    * */
    managerTime() {

        val.is_playing = 1;

        let style = { font: "20px AvenirNextLTProHeavyCn", fill: "#7d5c2e", tabs: 20 };
        let style_bottom = { font: "bold 32px AvenirNextLTProHeavyCn", fill: "#755425", tabs: 20 };

        val.timeBg = this.add.sprite(val.w, 100, 'time-bg');
        val.timeBg.width = 198;
        val.timeBg.height = 116;

        val.timeBg.addChild(this.add.text(30, 10, "MOVES \t\t TIME", style));
        val.move_counter = this.add.text(45, 40, "" + val.moves + "", style_bottom);
        val.timeBg.addChild(val.move_counter);

        val.time_counter = this.add.text(120, 40, val.time + "s", style_bottom);
        val.timeBg.addChild(val.time_counter);

    }

    /*
    *  Show intructions Game
    * */
    createIntro() {

        this.menuIntro = this.add.sprite(val.w / 2, val.h / 2, 'pause');
        this.menuIntro.anchor.setTo(0.5, 0.5);
        this.menuIntro.scale.setTo(2, 1.5);
        this.menuIntro.alpha = 0.95;

        //Text Bold
        let text_bold = { font: "32px AvenirNextLTProHeavyCn", fill: "#000", align: "center" };
        this.instructions = this.add.text(val.w / 2, val.h / 2 - 100, 'INSTRUCTIONS', text_bold);
        this.instructions.anchor.set(0.5, 1);

        // Add text in center pause game
        let style_level = { font: "bold 24px AvenirNextLTProHeavyCn", fill: "#1d5e00", align: "center" };
        this.text_pause = this.add.text(val.w / 2, val.h / 2 + 60, "TAP ON THE BOXES \nTO FIND MATCHING PAIRS IN " +
            "\nTHE FEWEST NUMBER OF MOVES \nAND THE SHORTEST TIME POSSIBLE", style_level);
        this.text_pause.anchor.set(0.5, 1);
        this.text_pause.lineSpacing = 3;



        this.okBtn = this.add.button(val.w / 2, val.h / 2 + 120, 'ok', '', '', 1, 0, 2);
        this.okBtn.anchor.set(0.5);
        this.okBtn.onInputDown.add(this.initGame, this);
        this.okBtn.input.useHandCursor = true;
    }

    initGame() {

        let _self = this;
        this.okBtn.destroy();
        this.menuIntro.destroy();
        this.instructions.destroy();
        this.text_pause.destroy();

        this.time.events.loop(Phaser.Timer.SECOND, _self.updateTime, _self);

        _self.managerTime();

        switch (val.level) {
            case 1:
                val.number_row = 4;
                val.number_col = 4;
                break;
            case 2:
                val.number_row = 4;
                val.number_col = 5;
                break;
            case 3:
                val.number_row = 5;
                val.number_col = 6;
                break;
            case 4:
                val.number_row = 6;
                val.number_col = 5;
                break;
            case 5:
                val.number_row = 6;
                val.number_col = 6;
                break;
            default:
                val.number_row = 4;
                val.number_col = 4;
                break;
        }
        _self.initGamePlay(val.number_row, val.number_col);

    }

    /*
    * Click Menu button
    * */
    clickMenu() {

        // When the paus button is pressed, we pause the game
        this.paused = true;

        // Then add the menu
        this.menu = this.add.sprite(val.w / 2, val.h / 2, 'pause');
        this.menu.anchor.setTo(0.5, 0.5);
        this.menu.scale.setTo(2, 1.5);
        this.menu.alpha = 0.8;

        // Add text in center pause game
        let style_level = { font: "bold 24px AvenirNextLTProHeavyCn", fill: "#875d25", boundsAlignH: "center", boundsAlignV: "middle" };
        this.text_pause = this.add.text(val.w / 2, val.h / 2, "GOING TO THE MENU \nWILL END THE GAME", style_level);
        this.text_pause.anchor.set(0.5, 1);


        // Add two button
        this.endGame = this.add.button(w / 2 - 180, h / 2 + 50, 'end-game');
        // endthis.scale.setTo(0.25);
        this.endthis.input.useHandCursor = true;

        this.continueGame = this.add.button(w / 2 + 20, h / 2 + 50, 'continue');
        // continuethis.scale.setTo(0.25);
        this.continuethis.input.useHandCursor = true;

    }

    // And finally the method that handels the pause menu
    unpause(event) {
        // Only act if paused
        if (this.paused) {

            // Click to Ok Btn
            let m1 = val.w / 2 - 60, m2 = val.w / 2 + 60,
                n1 = val.h / 2 + 120 - 60, n2 = val.h / 2 + 120 + 50 + 60;

            // Click end Game, redirect to 'menu' stage
            if (event.x > m1 && event.x < m2 && event.y > n1 && event.y < n2) {

                this.menuIntro.destroy();
                this.instructions.destroy();
                this.text_pause.destroy();
                this.okBtn.destroy();

                // Unpause the game
                this.paused = false;
            }


            // Click to End Game
            let x1 = w / 2 - 180, x2 = w / 2 - 180 + 120,
                y1 = h / 2 + 50, y2 = h / 2 + 50 + 50;

            // Click end Game, redirect to 'menu' stage
            if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) {
                // Unpause the game
                this.paused = false;

                // remove All image card
                val.cards = [];
                val.images = [];
                val.moves = 0;
                val.time = 0;
                val.score = 0;

                // this.state.start('menu');
                this.stateTransition.to('menu');
            }

            // Click Continue, redirect to 'menu' stage
            let u1 = val.w / 2 + 20, u2 = val.w / 2 + 20 + 120,
                v1 = val.h / 2 + 50, v2 = val.h / 2 + 50 + 50;


            if (event.x > u1 && event.x < u2 && event.y > v1 && event.y < v2) {
                // this.state.start('menu');
                this.menu.destroy();
                this.text_pause.destroy();
                this.endthis.destroy();
                this.continuethis.destroy();

                // Unpause the game
                this.paused = false;
            }
        }
    }

    update() {

        if (val.noMatch) {
            if (this.time.totalElapsedSeconds() - val.clickTime > 0.5) {
                val.noMatch = false;
                val.cards[val.firstClick].visible = true;
                val.cards[val.firstClick].alpha = 1.0;
                val.cards[val.secondClick].visible = true;
                val.cards[val.secondClick].alpha = 1.0;

                val.images[val.firstClick].visible = false;
                val.images[val.secondClick].visible = false;

                val.firstClick = null; val.secondClick = null;
            }
        }

        if (val.is_playing) {
            if (val.timeBg.x > val.w - 198) {
                val.timeBg.x -= 6;
            }
        }

    }

    toWinStage() {
        val.cards = [];
        val.images = [];
        // We start the win state
        this.state.start('win');
    }
}