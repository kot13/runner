import Phaser from 'phaser'

export default class Splash extends Phaser.Scene {

    constructor() {
        super('splash');
    }

    preload() {
        this.load.spritesheet("player", "player/fat2.png", { frameWidth: 118, frameHeight: 128 });
        this.load.spritesheet("coins", "objects/coins.png", { frameWidth: 40, frameHeight: 44.5 });

        this.load.image("timber", "objects/timber.png");

        this.load.image("ground1", "backgrounds/trees1.png");
        this.load.image("ground2", "backgrounds/trees2.png");
        this.load.image("bg1", "backgrounds/trees3.png");
        this.load.image("bg2", "backgrounds/trees4.png");
        this.load.image("bg3", "backgrounds/trees5.png");
        this.load.image("bg4", "backgrounds/trees6.png");
        this.load.image("bg5", "backgrounds/trees7.png");
        this.load.image("bg6", "backgrounds/trees8.png");
        this.load.image("bg7", "backgrounds/trees9.png");

        this.load.audio('pickup', [
            'sound/pickup.mp3'
        ]);
    }

    create() {
        this.scene.start('game');
    }
}
