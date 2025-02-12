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
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/10, 'faller');
        this.player.setAngularVelocity(1000);
        this.player.body.setCollideWorldBounds(true)

        this.moving = false;
        this.speed = game.settings.playerSpeed;
        this.hasWalls = false;
        this.hasBat = false;
        this.num = 0;
        this.score = 0;
        this.createBat();
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

        this.background.tilePositionY += game.settings.speed;
        if(this.hasWalls) {
            this.wall1.update();
            this.wall2.update();
        }
        if(this.hasBat) {
            this.bat.update();
        }
        this.score++;
        if(this.score%game.settings.newObst == 0) {
            if(Phaser.Math.Between(0,1) == 0) {
                this.createWalls();
            } else {
                this.createBat();
            }
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
        this.scene.pause();
        this.scene.launch('gameOverScene', this.score);
    }
}