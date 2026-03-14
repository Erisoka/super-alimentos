export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });
    }

    preload() {
        this.load.image('bg_menu', 'assets/images/bg_menu.png');
        this.load.image('title', 'assets/images/title.png');
        this.load.image('btn_play', 'assets/images/btn_play.png');
        this.load.image('nutri', 'assets/images/nutri.png');
        this.load.image('frutina', 'assets/images/fruti.png');
        this.load.image('verdurin', 'assets/images/verdurin.png');
        this.load.image('aguita', 'assets/images/aguita.png');
    }

    create() {
        this.scene.start('MainMenu');
    }
}
