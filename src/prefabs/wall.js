class Wall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this).setOrigin(0,0)
        scene.physics.add.existing(this).setImmovable();
        this.scene = scene;
    }

    update() {
        this.y -= game.settings.speed;
        if(this.y <= -192) {
            this.scene.hasWalls = false;
            this.destroy();
        }
    }
}