class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        //create keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //background
        this.background = this.add.tileSprite(0, 0, 576, 1152, 'background').setOrigin(.08,0);

        //create player
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/20, 'faller');
        this.player.setAngularVelocity(1000);
        this.player.body.setCollideWorldBounds(true)

        this.moving = false;

    }

    update() {
        this.moving = false;
        //movement
        if (keyLEFT.isDown) {
            this.player.body.setVelocityX(-game.settings.playerSpeed);
            this.moving = true;
        }
        if (keyRIGHT.isDown) {
            this.player.body.setVelocityX(game.settings.playerSpeed);
            this.moving = true;
        }

        if(!this.moving) {
            this.player.body.setVelocityX(0);
        }
    }
}