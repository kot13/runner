import Phaser from 'phaser';

import Splash from './scenes/splash';
import Game from './scenes/game';
import GameOver from './scenes/gameover';

let game;

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        width: 395,
        height: 793,
        scene: [Splash, Game, GameOver],
        backgroundColor: 0x444444,
        physics: {
            default: "arcade",
            arcade: {
				debug: false
			}
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
};