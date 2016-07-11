// The first two integers are the dimensions of the game screen as x
// and y values. We are setting it to 640 pixels across, and 480 pixels
// down. Note also that the 'gameDiv' parameter matches the div element
// defined in our index.html file


/* Kiosk Mode*/
var w = 1080;
var h = 1420;

/* Arcade Mode */

/*var w = 810;
var h = 640;*/

/*var w = 414;
var h = 736;*/

/*var w = 768;
var h = 1024;*/





//var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameDiv');
var game = new Phaser.Game(w, h, Phaser.CANVAS, 'gameDiv');
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

// Init Item
var timeBg;
// check if game is playing
var is_playing = 0;
var total_open = 0;

// Here we add each state. We give it a casual name that we use when
var firstClick, secondClick;
var noMatch, clickTime;
var score = 0;
var cards = [];
var images = [];
var movies = [];
var time = 0;
var moves = 0;
var number_row = 4;
var number_col = 4;
var level = 1;


if(w > 1000){
    TILE_SIZE = 120;
}else{
    TILE_SIZE = 70;
}





// calling it (i.e. 'boot'), and an official name that we use when
// defining it (i.e. bootState), as you'll see in the boot.js file
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

// After all of the states are added, we start the game by calling the
// boot state
game.state.start('boot');