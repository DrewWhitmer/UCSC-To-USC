class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    create(score) {
        game.settings = {
            playerSpeed: 300,
            speed: 5,
            batSpeed: 200,
            newObst: 300,
        }
        this.background = this.add.sprite(game.config.width/2, game.config.height/2,'overScreen');
        this.menuButton = this.add.sprite(game.config.width/2, game.config.height/2 + 95, 'menuButton');
        this.menuButton.setInteractive({
            useHandCursor: true,
        })
        this.menuButton.on('pointerdown', () => {this.scene.start("menuScene")});

        this.playButton = this.add.sprite(game.config.width/2, game.config.height/2 + 185, 'againButton');
        
        this.playButton.setInteractive({
            useHandCursor: true,
        })
        this.playButton.on('pointerdown', () => {this.scene.start("playScene")});
        this.scoreText = this.add.text(2*game.config.width/5 + 40, 2*game.config.height/5 - 10, score);
    }


}
