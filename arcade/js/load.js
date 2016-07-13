var loadState= {

    // The preload function is another standard Phaser function that we
    // use to define and load our assets
    preload: function() {
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        
        game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true;
        w = game.width;
        h = game.height;
        // Add a loading label on the screen
        var loadingLabel = game.add.text(80, 150, 'loading...',
            {font: '30px Courier', fill: '#ffffff'});

        // Load all assets. The first parameter is the variable that
        // will point to the image, and the second parameter is the

        if(h > 1000){
            game.load.image('bg_play', 'assets/images/big_screen/bg_play.png');
        }else{
            game.load.image('bg_play', 'assets/images/small_screen/bg_play.png');
        }
        // Menu Stage
        game.load.image('background', 'assets/images/wallys-background.png');
        game.load.image('board', 'assets/images/board.png');
        game.load.image('tree', 'assets/images/tree.png?f');

        game.load.spritesheet('start', 'assets/images/start.png?sd', 170, 60);
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        // Game Play
        game.load.image('ground', 'assets/images/platform.png');
        game.load.spritesheet('menu-btn', 'assets/images/menu-button.png?ddf', 170, 60);
        game.load.image('level-table', 'assets/images/banggo.png');
        game.load.image('pause', 'assets/images/pause.png?asd');
        game.load.image('end-game', 'assets/images/end-game.png');
        game.load.image('continue', 'assets/images/continue.png');
        game.load.spritesheet('ok', 'assets/images/ok.png?ddf', 170, 60);
        game.load.image('time-bg', 'assets/images/orange.png');

        // Flip Card
        game.load.image('back', 'assets/back.png?Sdsfs');
        for(var i=0; i<= 18; i++){
            game.load.image(''+i+'', 'assets/items/'+i+'.png');
        }

        // End Game
        game.load.spritesheet('submit', 'assets/images/submit.png?df',170, 60);

    },

    create: function() {
        // Call the menu state
        game.state.start('menu');
        // game.state.start('play');
        // game.state.start('win');
    }
};