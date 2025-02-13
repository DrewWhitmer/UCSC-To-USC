'use strict'

// name: Drew Whitmer
// game: The Fall
// hours: 20
// creative tilt:
// For the technical side of things, I am proud of how I managed to layer one scene on top of the other once the game ends in order
// to make it so the player sees how they died.
// For the artistic side of things, I am proud of the way the title screen has an animation that plays behind it, as well as the animation
// that plays after you press 'play'.



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