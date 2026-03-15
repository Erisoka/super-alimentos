import BootScene from './scenes/BootScene.js';
import PreloaderScene from './scenes/PreloaderScene.js';
import MainMenu from './scenes/MainMenu.js';
import Level1_Semaforo from './scenes/Level1_Semaforo.js';
import Level2_Lonchera from './scenes/Level2_Lonchera.js';
import Level3_Grupos from './scenes/Level3_Grupos.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#87CEEB',
    render: {
        pixelArt: false,
        antialias: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [BootScene, PreloaderScene, MainMenu, Level1_Semaforo, Level2_Lonchera, Level3_Grupos]
};

const game = new Phaser.Game(config);

export default game;
