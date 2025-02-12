class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    create(obj) {
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
        if(obj.score > obj.highScore) {
            obj.highScore = obj.score;
        }
        this.highScoreText = this.add.text(2*game.config.width/5 + 100, 2*game.config.height/5 + 43, obj.highScore, {
            fontFamily: 'Georgia',
            fontSize: 24,
            color: '#000000',
        });
        
        
        this.menuButton.on('pointerdown', () => {this.scene.start("menuScene", obj.highScore)});

        this.playButton = this.add.sprite(game.config.width/2, game.config.height/2 + 185, 'againButton');
        
        this.playButton.setInteractive({
            useHandCursor: true,
        })
        this.playButton.on('pointerdown', () => {this.scene.start("playScene", obj.highScore)});
        this.scoreText = this.add.text(2*game.config.width/5 + 15, 2*game.config.height/5 - 17, obj.score, {
            fontFamily: 'Georgia',
            fontSize: 24,
            color: '#000000',
        });
        
    }


}
