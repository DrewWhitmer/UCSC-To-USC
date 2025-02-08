class Wall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

    }

    update() {
        this.y -= game.settings.speed;
    }
}