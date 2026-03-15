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

        // Interfaz del Nivel 1
        this.load.image('semaforo', 'assets/images/semaforo.png');
        this.load.image('btn_pause', 'assets/images/btn_pause.png');
        this.load.image('btn_back', 'assets/images/btn_back.png');
        this.load.image('star', 'assets/images/star.png');

        // Alimentos
        this.load.image('manzana', 'assets/images/manzana.png');
        this.load.image('agua', 'assets/images/agua.png');
        this.load.image('huevo', 'assets/images/huevo.png');
        this.load.image('pizza', 'assets/images/pizza.png');
        this.load.image('dulces', 'assets/images/dulces.png');

        // Nivel 2 - Lonchera
        this.load.image('lonchera', 'assets/images/lonchera.png');
        this.load.image('lonchera_llena', 'assets/images/lonchera_llena.png');
        this.load.image('yogur', 'assets/images/yogur.png');
        this.load.image('pan', 'assets/images/pan.png');
        this.load.image('gaseosa', 'assets/images/gaseosa.png');
        this.load.image('papas', 'assets/images/papas.png');
    }

    create() {
        this.scene.start('MainMenu');
    }
}
