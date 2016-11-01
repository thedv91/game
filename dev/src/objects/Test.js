/*
 * Test
 */

export default class Test extends Phaser.Sprite {

  constructor(game, ...args) {
    super(game, ...args);

    this.load.spritesheet('button', 'button', 124, 56);
    // TODO:
    //   1. Edit constructor parameters accordingly.
    //   2. Adjust object properties.
  }

}
