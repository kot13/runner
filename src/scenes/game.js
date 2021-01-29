import Phaser from 'phaser'

let gameOptions = {
    spawnCoinRange: [0, 200],
    spawnTimberRange: [50, 50],
    playerGravity: 900,
    jumpForce: 500,
    playerStartPosition: 50,
    playerY: 706.64
}

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    init() {
        this.score = 0;
        this.killed = false;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.bg7 = this.add.tileSprite(0, 0, width, height, "bg7");
        this.bg7.setOrigin(0, 0);
        this.bg7.setScrollFactor(0);

        this.bg6 = this.add.tileSprite(0, 0, width, height, "bg6");
        this.bg6.setOrigin(0, 0);
        this.bg6.setScrollFactor(0);

        this.bg5 = this.add.tileSprite(0, 0, width, height, "bg5");
        this.bg5.setOrigin(0, 0);
        this.bg5.setScrollFactor(0);

        this.bg4 = this.add.tileSprite(0, 0, width, height, "bg4");
        this.bg4.setOrigin(0, 0);
        this.bg4.setScrollFactor(0);

        this.bg3 = this.add.tileSprite(0, 0, width, height, "bg3");
        this.bg3.setOrigin(0, 0);
        this.bg3.setScrollFactor(0);

        this.bg2 = this.add.tileSprite(0, 0, width, height, "bg2");
        this.bg2.setOrigin(0, 0);
        this.bg2.setScrollFactor(0);

        this.bg1 = this.add.tileSprite(0, 0, width, height, "bg1");
        this.bg1.setOrigin(0, 0);
        this.bg1.setScrollFactor(0);

        this.ground2 = this.add.tileSprite(0, 0, width, height, "ground2");
        this.ground2.setOrigin(0, 0);
        this.ground2.setScrollFactor(0);

        this.ground1 = this.add.tileSprite(0, 0, width, height, "ground1");
        this.ground1.setOrigin(0, 0);
        this.ground1.setScrollFactor(0);
        this.ground1.setDepth(1);

        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", { frames: [ 0, 1, 2, 3, 2, 1 ] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "die",
            frames: this.anims.generateFrameNumbers("player", { frames: [ 4 ] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "rotate",
            frames: this.anims.generateFrameNumbers("coins", { frames: [ 0, 1, 2, 3, 2, 1 ] }),
            frameRate: 10,
            repeat: -1
        });

        this.scoreLabel = this.add.text(10, 10, `Score: ${this.score}`, {
            fontSize: 24,
            color: '#080808',
            backgroundColor: '#F8E71C',
            shadow: { fill: true, blur: 0, offsetY: 0 },
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        })
        .setScrollFactor(0);

        this.coinGroup = this.add.group();
        this.timberGroup = this.add.group();

        this.spawnCoin(width / 2);
        this.spawnTimber(width);

        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, gameOptions.playerY, "player");
        this.player.setGravityY(gameOptions.playerGravity);
        this.player.setScale(0.7);
        this.player.play("run");
        this.player.setCollideWorldBounds(true);
        this.player.setVelocityX(200);
        this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.7);

        this.input.on("pointerdown", this.jump, this);

        this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 55);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);
        this.cameras.main.followOffset.set(-150, 0);

        this.physics.add.overlap(this.coinGroup, this.player, this.handleCollectCoin, undefined, this);
        this.physics.add.overlap(this.timberGroup, this.player, this.handleOverlapTimber, undefined, this);
    }

    jump() {
        if (this.player.y == gameOptions.playerY) {
            this.player.setVelocityY(gameOptions.jumpForce * -1);
        }
    }

    spawnCoin(posX) {
        let coin = this.physics.add.sprite(posX, Phaser.Math.Between(this.scale.height - 200, this.scale.height - 100), "coins");
        coin.setImmovable(true);
        coin.play("rotate");
        coin.body.setCircle(coin.body.width * 0.5);
        this.coinGroup.add(coin);

        this.nextCoinDistance = posX + Phaser.Math.Between(gameOptions.spawnCoinRange[0], gameOptions.spawnCoinRange[1]);
    }

    spawnTimber(posX) {
        let timber = this.physics.add.sprite(posX, this.scale.height - 60, "timber");
        timber.setImmovable(true);
        timber.body.setCircle(timber.body.width * 0.5);
        this.timberGroup.add(timber);

        this.nextTimberDistance = posX + Phaser.Math.Between(gameOptions.spawnTimberRange[0], gameOptions.spawnTimberRange[1]);
    }

    handleCollectCoin(coin, player) {
        this.sound.add('pickup').play();

        this.coinGroup.killAndHide(coin);
        coin.body.enable = false;

        ++this.score;
        this.scoreLabel.text = `Score: ${this.score}`;
    }

    handleOverlapTimber(timber, player) {
        if (!this.killed) {
            player.play('die');
            player.body.setAccelerationY(0);
            player.body.setVelocity(1000, 0);

            this.player.body.setSize(this.player.width, this.player.height * 0.3);
            this.killed = true;
        }
    }

    update() {
        this.bg1.setTilePosition(this.cameras.main.scrollX * .6);
        this.bg2.setTilePosition(this.cameras.main.scrollX * .6);
        this.bg3.setTilePosition(this.cameras.main.scrollX * .3);
        this.bg4.setTilePosition(this.cameras.main.scrollX * .3);

        this.ground1.setTilePosition(this.cameras.main.scrollX);
        this.ground2.setTilePosition(this.cameras.main.scrollX * .9);

        if (this.cameras.main.scrollX > this.nextCoinDistance) {
            this.spawnCoin(this.cameras.main.scrollX + this.scale.width);
        }

        if (this.cameras.main.scrollX > this.nextTimberDistance) {
            this.spawnTimber(this.cameras.main.scrollX + this.scale.width);
        }

        if (this.killed) {
            this.player.body.velocity.x *= 0.98;

            if (this.player.body.velocity.x < 5) {
                this.player.body.setVelocity(0, 0);
                this.scene.start('gameover');
            }
        }
    }
};