class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        //create keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/10, 'faller');
        this.player.setAngularVelocity(1000);
    }

    update() {
        //movement
        if (keyLEFT.isDown) {
            this.player.x -= game.settings.playerSpeed;
        }
        if (keyRIGHT.isDown) {
            this.player.x += game.settings.playerSpeed;
        }
    }
}