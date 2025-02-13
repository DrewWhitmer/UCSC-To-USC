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
        this.load.image('menuBackground', './assets/images/Menu-Background.png');
        this.load.image('playButton', './assets/images/Play-Button.png');
        this.load.image('title', './assets/images/Title.png');
        this.load.image('ground', './assets/images/Menu-Ground-Spritesheet.png',);
        this.load.image('leftArrow', './assets/images/Left-Arrow.png');
        this.load.image('rightArrow', './assets/images/Right-Arrow.png');
        this.load.image('fasterText', './assets/images/Faster-Text.png');
        this.load.spritesheet('bat', './assets/images/Bat-Spritesheet.png', {
            frameWidth: 64,
            frameHeight: 64,
        })
        this.load.spritesheet('walkingPlayer', './assets/images/Player-Walking-Spritesheet.png', {
            frameWidth: 64,
            frameHeight: 64,
        })

        //load music/sfx (sfx made with jfxr, music gotten from opengameart.org)
        this.load.audio('crack', './assets/sounds/Crack.wav');
        this.load.audio('crash', './assets/sounds/Crash.wav');
        this.load.audio('fall', './assets/sounds/Fall-Sound.wav');
        this.load.audio('fallMusic', './assets/sounds/Fall-Music.ogg');
        this.load.audio('walkMusic', './assets/sounds/Walk-Music.ogg');

    }

    create(num) {
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
            speedUp: 1500,
        }
        //create music
        this.music = this.sound.add('walkMusic');
        this.music.loop = true;
        this.music.play();
        //create menu
        this.background = this.add.tileSprite(0, -50, game.config.width, game.config.height, 'menuBackground').setOrigin(0,0);
        this.title = this.add.sprite(game.config.width/2, game.config.height/5, 'title');
        this.ground = this.add.sprite(0, game.config.height -50, 'ground').setOrigin(0,0);
        this.player = this.add.sprite(game.config.width/2, game.config.height - 50, 'walkingPlayer', 0);
        this.panic = false;
        this.isFalling = false;
        this.player.anims.create({
            key: 'walk',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('walkingPlayer'),
        })
        this.player.anims.play('walk');
        this.add.text(0,9*game.config.height/10, "music written and produced \nby Ove Melaa \n(Omsofware@hotmail.com) \nfrom opengameart.org\nall other assets by Drew Whitmer",
            {
                fontFamily: 'Georgia',
                fontSize: 10,
                color: '#000000',
            }
        )



        this.playButton = this.add.sprite(game.config.width/2, game.config.height/2 + 185, 'playButton');
        //start scene when play button is pressed
        this.playButton.setInteractive({
            useHandCursor: true,
        })
        this.playButton.on('pointerdown', () => {
            this.music.stop()
            this.playButton.destroy(),
            this.player.anims.stop();
            this.ground.x -= 480;
            this.panic = true;
            this.sound.play('crack')
            this.clock = this.time.delayedCall(1000, () => {
                this.ground.x -= 480,
                this.player.destroy();
                this.player = this.add.sprite(game.config.width/2, game.config.height - 50, 'faller');
                this.player.angle = -15;
                this.isFalling = true;
                this.sound.play('fall');
            }, null, this);
            this.clock = this.time.delayedCall(2500, () => {this.scene.start("playScene", num);}, null, this);
        });
    }

    update() {
        if(this.isFalling) {
            this.player.y++;
        }
        if(!this.panic) {
            this.background.tilePositionX += 1;
        }
    }
}