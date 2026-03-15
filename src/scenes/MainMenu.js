export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    create() {
        // Iniciar BGM si no está sonando ya
        if (!this.sound.get('bgm')) {
            this.sound.play('bgm', { loop: true, volume: 0.3 });
        }

        // Fondo centrado y ajustado al tamaño del lienzo (Profundidad 0)
        this.add.image(400, 300, 'bg_menu').setDisplaySize(800, 600).setDepth(0);

        // Personajes (Profundidad 1) detrás de los botones
        this.add.image(150, 380, 'nutri').setScale(0.25).setDepth(1);
        this.add.image(200, 520, 'verdurin').setScale(0.25).setDepth(1);
        this.add.image(650, 380, 'frutina').setScale(0.25).setDepth(1);
        this.add.image(600, 520, 'aguita').setScale(0.25).setDepth(1);

        // Título escalado en la parte superior (Profundidad 10)
        this.add.image(400, 120, 'title').setScale(0.7).setDepth(10);

        // Botón de jugar interactivo (Profundidad 10)
        const btnPlay = this.add.image(400, 320, 'btn_play')
            .setDepth(10)
            .setInteractive({ useHandCursor: true });

        // Eventos del botón
        btnPlay.on('pointerdown', () => {
            this.sound.play('click');
            this.scene.start('IntroStoryScene');
        });

        btnPlay.on('pointerover', () => {
            btnPlay.setScale(1.1);
        });

        btnPlay.on('pointerout', () => {
            btnPlay.setScale(1);
        });

        // Botón gráfico de créditos
        const btnCreditos = this.add.image(750, 60, 'btn_creditos')
            .setDepth(20)
            .setScale(0.35)
            .setInteractive({ useHandCursor: true });

        btnCreditos.on('pointerdown', () => {
            this.sound.play('click');
            this.scene.start('CreditsScene');
        });

        btnCreditos.on('pointerover', () => {
            this.tweens.add({
                targets: btnCreditos,
                scale: 0.42,
                duration: 200,
                ease: 'Power2'
            });
        });

        btnCreditos.on('pointerout', () => {
            this.tweens.add({
                targets: btnCreditos,
                scale: 0.35,
                duration: 200,
                ease: 'Power2'
            });
        });
    }
}
