import Phaser from 'phaser';

import Splash from './scenes/splash';
import Game from './scenes/game';
import GameOver from './scenes/gameover';

let game;
const gameHeight = 793;
const gameWidth = 446;
const gameRatio = 9/16;

function scaleGame() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let scale = 1;

    if (windowWidth / windowHeight > gameRatio) {
        scale = windowHeight / gameHeight;
        let newWidth = (windowWidth / (windowWidth * scale)) * windowWidth;

        document.getElementById('gamefield').style.cssText = 'transform: scale('+scale+');transform-origin: 0 0;-moz-transform: scale('+scale+');-moz-transform-origin: 0 0;width: '+newWidth+'px; overflow:hidden';
    } else {
        scale = windowWidth / gameWidth;
        let newWidth = gameWidth;
        let paddingTop = (windowHeight - gameHeight*scale) / 2;

        document.getElementById('gamefield').style.cssText = 'transform: scale('+scale+');transform-origin: 0 0;-moz-transform: scale('+scale+');-moz-transform-origin: 0 0;width: '+newWidth+'px; overflow:hidden;padding-top:'+paddingTop+'px;';
    }
}

window.onload = function() {
    scaleGame()

    let gameConfig = {
        type: Phaser.AUTO,
        width: gameWidth,
        height: gameHeight,
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

window.onresize = function(event) {
    scaleGame();
};