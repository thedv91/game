/*
 * InputField
 */
import Phaser, {PhaserTextStyle } from 'phaser';

export default class InputField extends Phaser.Sprite {


    constructor(game, ...args) {
        super(game, ...args);

        this.focusOutOnEnter = true;
        this.placeHolder = null;
        this.box = null;
        this.textMask = null;
        this.focus = false;
        this.cursor = null;
        this.text = null;

        this.offscreenText = null;

        this.value = '';

        this.inputOptions = args.inputOptions;

        this.domElement = null;

        this.selection = null;

        this.windowScale = 1;

        this.blockInput = true;

        this.inputOptions = args.inputOptions;
        this.inputOptions.width = args.inputOptions.width || 150;
        this.inputOptions.padding = args.inputOptions.padding || 0;
        this.inputOptions.textAlign = args.inputOptions.textAlign || 'left';
        this.inputOptions.type = args.inputOptions.type;
        this.inputOptions.borderRadius = args.inputOptions.borderRadius || 0;
        this.inputOptions.height = args.inputOptions.height || 14;
        this.inputOptions.fillAlpha = (args.inputOptions.fillAlpha === undefined) ? 1 : args.inputOptions.fillAlpha;
        this.inputOptions.selectionColor = args.inputOptions.selectionColor || 'rgba(179, 212, 253, 0.8)';
        this.inputOptions.zoom = (!game.device.desktop) ? args.inputOptions.zoom || false : false;

        // TODO:
        //   1. Edit constructor parameters accordingly.
        //   2. Adjust object properties.

        //create the input box
        this.box = new InputBox(this.game, args.inputOptions);
        this.setTexture(this.box.generateTexture());

        //create the mask that will be used for the texts
        this.textMask = new TextMask(this.game, args.inputOptions);
        this.addChild(this.textMask);

        //Create the hidden dom elements
        this.domElement = new InputElement(this.game, 'phaser-input-' + (Math.random() * 10000 | 0).toString(),
            this.inputOptions.type, this.value);
        this.domElement.setMax(this.inputOptions.max, this.inputOptions.min);

        this.selection = new SelectionHighlight(this.game, this.inputOptions);
        this.addChild(this.selection);

        if (inputOptions.placeHolder && inputOptions.placeHolder.length > 0) {
            this.placeHolder = new Phaser.Text(game, this.inputOptions.padding, this.inputOptions.padding,
                inputOptions.placeHolder, new PhaserTextStyle({
                    font: inputOptions.font || '14px Arial',
                    fontWeight: inputOptions.fontWeight || 'normal',
                    fill: inputOptions.placeHolderColor || '#bfbebd'
                })
            );
            this.placeHolder.mask = this.textMask;
            this.addChild(this.placeHolder);
        }

        this.cursor = new Phaser.Text(game, this.inputOptions.padding, this.inputOptions.padding - 2, '|', new Phaser.PhaserTextStyle({
            font: inputOptions.font || '14px Arial',
            fontWeight: inputOptions.fontWeight || 'normal',
            fill: inputOptions.cursorColor || '#000000'
        }));
        this.cursor.visible = false;
        this.addChild(this.cursor);

        this.text = new Phaser.Text(game, this.inputOptions.padding, this.inputOptions.padding, '', new Phaser.PhaserTextStyle({
            font: inputOptions.font || '14px Arial',
            fontWeight: inputOptions.fontWeight || 'normal',
            fill: inputOptions.fill || '#000000'
        }));
        this.text.mask = this.textMask;
        this.addChild(this.text);

        this.offscreenText = new Phaser.Text(game, this.inputOptions.padding, this.inputOptions.padding, '', new Phaser.PhaserTextStyle({
            font: inputOptions.font || '14px Arial',
            fontWeight: inputOptions.fontWeight || 'normal',
            fill: inputOptions.fill || '#000000'
        }));

        switch (this.inputOptions.textAlign) {
            case 'left':
                this.text.anchor.set(0, 0);
                this.cursor.x = this.inputOptions.padding + this.getCaretPosition();
                break;
            case 'center':
                this.text.anchor.set(0.5, 0);
                this.text.x += this.inputOptions.width / 2;
                this.cursor.x = this.inputOptions.padding + this.inputOptions.width / 2 - this.text.width / 2 + this.getCaretPosition();
                break;
            case 'right':
                this.text.anchor.set(1, 0);
                this.text.x += this.inputOptions.width;
                this.cursor.x = this.inputOptions.padding + this.inputOptions.width;
                break;
        }

    }
}