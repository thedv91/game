var loadState= {

    // The preload function is another standard Phaser function that we
    // use to define and load our assets
    preload: function() {

        // Add a loading label on the screen
        var loadingLabel = game.add.text(80, 150, 'loading...',
            {font: '30px Courier', fill: '#ffffff'});

        // Load all assets. The first parameter is the variable that
        // will point to the image, and the second parameter is the

        // Menu Stage
        game.load.image('background', 'assets/images/sky.png');
        game.load.image('play_bg', 'assets/images/play_bg.png');
        game.load.image('board', 'assets/images/board.png');
        game.load.image('tree', 'assets/images/tree.png');
        game.load.spritesheet('start', 'assets/images/start.png', 169, 60);
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        // Game Play
        game.load.image('ground', 'assets/images/platform.png');
        game.load.image('menu-btn', 'assets/images/menu-button.png');
        game.load.image('level-table', 'assets/images/banggo.png');
        game.load.image('pause', 'assets/images/pause.png');
        game.load.image('end-game', 'assets/images/end-game.png');
        game.load.image('continue', 'assets/images/continue.png');
        game.load.image('ok', 'assets/images/ok.png');
        game.load.image('time-bg', 'assets/images/orange.png');

        // Flip Card
        game.load.image('back', 'assets/back.png');
        for(var i=0; i<= 12; i++){
            game.load.image(''+i+'', 'assets/items/'+i+'.png');
        }

        // End Game
        game.load.image('submit', 'assets/images/submit.png');

    },

    create: function() {
        // Call the menu state
        // game.state.start('menu');
        game.state.start('play');
        // game.state.start('win');
    }
};