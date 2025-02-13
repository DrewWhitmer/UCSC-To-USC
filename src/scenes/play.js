class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create(num) {
        //create keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //background
        this.background = this.add.tileSprite(0, 0, 576, 1152, 'background').setOrigin(.08,0);

        //create player
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/10, 'faller');
        this.player.setAngularVelocity(1000);
        this.player.body.setCollideWorldBounds(true)

        //add score
        this.score = 0;
        this.scoreText = this.add.text(0, 0, this.score, {
            fontFamily: 'Georgia',
            fontSize: 30,
            color: '#FF0000',
        })
        if(typeof num === 'object'){
            num = 0;
        }
        //create music
        this.music = this.sound.add('fallMusic');
        this.music.loop = true;
        this.music.play();

        //variables
        this.highScore = num;
        this.moving = false;
        this.hasWalls = false;
        this.hasBat = false;
        this.num = 0;

        //show players control at start if it is their first time
        if (this.highScore == 0) {
            this.leftArrow = this.add.sprite(150, game.config.height/2, 'leftArrow')
            this.rightArrow = this.add.sprite(game.config.width - 150, game.config.height/2, 'rightArrow');
            this.clock = this.time.delayedCall(3000, () => {
                this.leftArrow.destroy();
                this.rightArrow.destroy();
            }, null, this);
        }   
    }

    update() {
        //movement
        this.moving = false;
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

        this.background.tilePositionY += game.settings.speed;
        if(this.hasWalls) {
            this.wall1.update();
            this.wall2.update();
        }
        if(this.hasBat) {
            this.bat.update();
        }
        //scoring + creating obstacles
        this.scoreText.text = this.score;
        this.score++;
        if(this.score%game.settings.newObst == 0 && !(this.score%this.game.settings.speedUp == 0)) {
            if(Phaser.Math.Between(0,1) == 0) {
                this.createWalls();
            } else {
                this.createBat();
            }
            this.children.bringToTop(this.scoreText);
        } else if(this.score%this.game.settings.speedUp == 0) {
            game.settings.speed++;
            this.fasterText = this.add.sprite(game.config.width/2, game.config.height/2, 'fasterText');
            this.clock = this.time.delayedCall(500, () => {this.fasterText.destroy()}, null, this);
            this.clock = this.time.delayedCall(1000, () => {this.fasterText = this.add.sprite(game.config.width/2, game.config.height/2, 'fasterText')}, null, this);
            this.clock = this.time.delayedCall(1500, () => {this.fasterText.destroy()}, null, this);
            this.clock = this.time.delayedCall(2000, () => {this.fasterText = this.add.sprite(game.config.width/2, game.config.height/2, 'fasterText')}, null, this);
            this.clock = this.time.delayedCall(2500, () => {this.fasterText.destroy()}, null, this);
        }
    }

    createWalls() {
        this.num = Phaser.Math.Between(0,2);
        if(this.num == 0) {
            this.wall1 = new Wall(this, 0, game.config.height, 'wall');
            this.wall2 = new Wall(this, game.config.width/3, game.config.height, 'wall');
        }
        if(this.num == 1) {
            this.wall1 = new Wall(this, 0, game.config.height, 'wall');
            this.wall2 = new Wall(this, 2*game.config.width/3, game.config.height, 'wall');
        }
        if(this.num == 2) {
            this.wall1 = new Wall(this, game.config.width/3, game.config.height, 'wall');
            this.wall2 = new Wall(this, 2*game.config.width/3, game.config.height, 'wall');
        }
        this.physics.add.collider(this.player,this.wall1, () => {
            this.gameOver();
        })
        this.physics.add.collider(this.player,this.wall2, () => {
            this.gameOver();
        })
        this.hasWalls = true;
        
    }

    createBat() {
        this.bat = new Bat(this, game.config.width/2, game.config.height, 'bat', 0);
        this.physics.add.collider(this.player,this.bat, () => {
            this.gameOver();
        })
        this.hasBat = true;
    }

    gameOver() {
        this.music.stop();
        this.scene.pause();
        this.sound.play('crash');
        this.scene.launch('gameOverScene', {
            score: this.score,
            highScore: this.highScore,
        });
    }
}