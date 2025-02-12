class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        //load images
        this.load.image('faller', './assets/images/Player-Falling.png');
        this.load.image('background', './assets/images/Background.png');
        this.load.image('wall', './assets/images/Wall.png');
        this.load.image('againButton', './assets/images/Again-Button.png');
        this.load.image('menuButton', './assets/images/Menu-Button.png');
        this.load.image('overScreen', './assets/images/Game-Over-Screen.png');
        this.load.spritesheet('bat', './assets/images/Bat-Spritesheet.png', {
            frameWidth: 64,
            frameHeight: 64,
        })
    }

    create() {
        //create keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //settings
        game.settings = {
            playerSpeed: 300,
            speed: 5,
            batSpeed: 200,
            newObst: 300,
        }

        //start scene
        this.scene.start("playScene");
    }
}