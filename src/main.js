'use strict'

let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    scene: [ Menu, Play, GameOver, ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    backgroundColor: '#FFFFFF',
    pixelArt: true,
}

let game = new Phaser.Game(config);

//reserve keyboard bindings
let keyENTER, keyLEFT, keyRIGHT;

//UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;