// The first two integers are the dimensions of the game screen as x
// and y values. We are setting it to 640 pixels across, and 480 pixels
// down. Note also that the 'gameDiv' parameter matches the div element
// defined in our index.html file


/* Kiosk Mode*/

/* Arcade Mode */

/*var w = 810;
var h = 640;*/

/*var w = 414;
var h = 736;*/

/*var w = 768;
var h = 1024;*/

var w, h, menu_bg, margin_left, margin_top, TILE_SIZE;



var game = new Phaser.Game("100%","100%", Phaser.CANVAS, 'gameDiv');



// Init Item
var timeBg;
// check if game is playing
var is_playing = 0;
var total_open = 0;

// Init variable for menu stage
var rank_table;

// Here we add each state. We give it a casual name that we use when
var firstClick, secondClick;
var noMatch, clickTime;
var score = 0;
var cards = [];
var images = [];
var movies = [];
var time = 0;
var moves = 0;
var number_row = 2;
var number_col = 2;
var level = 1;
var game_type = 1;

var click = true;



game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

// After all of the states are added, we start the game by calling the
// boot state
game.state.start('boot');