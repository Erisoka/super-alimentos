export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    create() {
        this.add.text(400, 300, 'Cargando El Reino de la Salud...', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5, 0.5);

        // ESTA ES LA LÍNEA MÁGICA QUE FALTA:
        this.scene.start('PreloaderScene');
    }
}
