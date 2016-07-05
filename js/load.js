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
        game.load.image('background', 'assets/images/sky.png?asdf');
        game.load.image('board', 'assets/images/board.png');
        game.load.image('tree', 'assets/images/tree.png');
        game.load.image('start', 'assets/images/start.png');
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        // Game Play
        game.load.image('ground', 'assets/images/platform.png');
        game.load.image('menu-btn', 'assets/images/menu-button.png');
        game.load.image('level-table', 'assets/images/banggo.png');
        game.load.image('pause', 'assets/images/pause.png');
        game.load.image('end-game', 'assets/images/end-game.png');
        game.load.image('continue', 'assets/images/continue.png');
        game.load.image('ok', 'assets/images/ok.png');
        game.load.image('time-bg', 'assets/images/orange.jpg');

        // Flip Card
        game.load.image('back', 'assets/back.png');
        game.load.image('0', 'assets/0.png');
        game.load.image('1', 'assets/1.png');
        game.load.image('2', 'assets/2.png');
        game.load.image('3', 'assets/3.png');
        game.load.image('4', 'assets/4.png');
        game.load.image('5', 'assets/5.png');
        game.load.image('6', 'assets/6.png');
        game.load.image('7', 'assets/7.png');
        game.load.image('8', 'assets/8.png');
        game.load.image('9', 'assets/9.png');

        // End Game
        game.load.image('submit', 'assets/images/submit.png');

    },

    create: function() {
        // Call the menu state
        game.state.start('menu');
        // game.state.start('play');
        // game.state.start('win');
    }
};