class Card extends Phaser.Sprite {
    constructor(game, x, y, key = null, face = null) {
        super(game, x, y, key, face);
        this.game = game;
        this.game.add.sprite(x, y);

        let back = this.game.add.sprite(0, 0, 'back');
        back.anchor.setTo(0.5);
        this.addChild(back);

    }
}