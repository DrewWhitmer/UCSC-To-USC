class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        //load images
        this.load.image('faller', './assets/images/Player-Falling.png');
        this.load.image('background', './assets/images/Background.png');
        this.load.image('wall', './assets/images/Wall.png');
    }

    create() {
        //create keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //settings
        game.settings = {
            playerSpeed: 300,
            speed: 3,
        }

        //start scene
        this.scene.start("playScene");
    }
}