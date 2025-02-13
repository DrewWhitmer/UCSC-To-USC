class Bat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this).setOrigin(0,0);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.anims.create({
            key: 'fly',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bat', { start: 0, end: 3}),
        })
        this.anims.play('fly');
        if(Phaser.Math.Between(0,1) == 0) {
            this.body.setVelocityX(game.settings.batSpeed);
        } else {
            this.body.setVelocityX(-game.settings.batSpeed);
        }
    }

    update() {
        this.y -= game.settings.speed;
        //destroy bat if out of bounds
        if(this.y <= -64) {
            this.scene.hasBat = false;
            this.destroy();
        }
        //if it hits the edge of a screen go the opposite direction
        if(this.x <= 0) {
            this.body.setVelocityX(game.settings.batSpeed);
        }
        if(this.x >= game.config.width - 64) {
            this.body.setVelocityX(-game.settings.batSpeed);
        }
    }
}