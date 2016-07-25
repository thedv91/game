var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/tilemaps/maps/pipe.json', null, Phaser.Tilemap.TILED_JSON);


    game.load.image('pipe', 'assets/tilemaps/tiles/pipe.png');
    game.load.image('water', 'assets/tilemaps/tiles/water.png');
    


}

var cursors;
var map;
var coins;

var layer;
var sprite;

var waters_group;

function create() {

    map = game.add.tilemap('map');


    map.addTilesetImage('pipe');
    map.addTilesetImage('water');

    layer = map.createLayer('Tile Layer 1');

    layer.resizeWorld();


    game.physics.startSystem(Phaser.Physics.ARCADE);


     //Here we create our coins group
    waters = game.add.group();
    waters.enableBody = true;

    // //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
    map.createFromObjects('Object Layer 1', 1601, 'water', 0, true, false, waters);
    console.log(waters);

    // //  Add animations to all of the coin sprites
    // coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    // coins.callAll('animations.play', 'animations', 'spin');

    
    waters_group = waters.children;

    var rand_idx = Math.floor(Math.random()*waters_group.length);
    for (var i = waters_group.length - 1; i >= 0; i--) {
        waters_group[i].visible = false;
        waters_group[i].inputEnabled = true
        waters_group[i].input.useHandCursor = true;

        waters_group[i].inputEnabled = true;
        waters_group[i].events.onInputDown.add(listener, this);

        waters_group[rand_idx].visible =true;

    }

}

function resetImg() {
    waters_group = waters.children;

    var rand_idx = Math.floor(Math.random()*waters_group.length);
    for (var i = waters_group.length - 1; i >= 0; i--) {
        waters_group[i].visible = false;
        waters_group[rand_idx].visible =true;

        waters_group[i].inputEnabled = true;

    }
}

function listener(sprite) {
    var _self = this;

    sprite.visible = false;
    setTimeout(function(){
        resetImg();
    },100);
}

function update() {

/*    game.physics.arcade.collide(sprite, layer);
    game.physics.arcade.overlap(sprite, coins, collectCoin, null, this);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;
    sprite.body.angularVelocity = 0;

    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 300;
    }

    if (cursors.up.isDown)
    {
        game.physics.arcade.velocityFromAngle(sprite.angle, 300, sprite.body.velocity);
    }
*/
}

function collectCoin(player, coin) {

    coin.kill();

}

function render() {

    // game.debug.body(sprite);

}