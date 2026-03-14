export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    create() {
        // Fondo centrado y ajustado al tamaño del lienzo
        this.add.image(400, 300, 'bg_menu').setDisplaySize(800, 600);

        // Título escalado en la parte superior
        this.add.image(400, 120, 'title').setScale(0.8);

        // Botón de jugar interactivo
        const btnPlay = this.add.image(400, 350, 'btn_play')
            .setInteractive({ useHandCursor: true });

        // Eventos del botón
        btnPlay.on('pointerdown', () => {
            this.scene.start('Level1_Semaforo');
        });

        btnPlay.on('pointerover', () => {
            btnPlay.setScale(1.1);
        });

        btnPlay.on('pointerout', () => {
            btnPlay.setScale(1);
        });

        // Personajes alrededor del botón (tamaño ajustado)
        this.add.image(180, 250, 'nutri').setScale(0.4);
        this.add.image(620, 250, 'frutina').setScale(0.4);
        this.add.image(180, 480, 'verdurin').setScale(0.4);
        this.add.image(620, 480, 'aguita').setScale(0.4);
    }
}
