export default class BaseState extends Phaser.State {
    constructor() {
        super();
        var width = this.game.width;
        var height = this.game.height;

        if (width <= 414) {
            this.mapScreen = 1;
        }

        if (width <= 768 & width > 414 && height <= 1024) {
            this.mapScreen = 2;
        }

        if (width <= 810 && width > 768 && height <= 640) {
            this.mapScreen = 3;
        }

        if (width <= 1080 && width > 810 && height <= 1020) {
            this.mapScreen = 4;
        }

        if (width <= 1080 && height <= 1320 && height > 1020) {
            this.mapScreen = 5;
        }

        if (width <= 1080 && height <= 1420 && height > 1320) {
            this.mapScreen = 6;
        }
        

    }
}