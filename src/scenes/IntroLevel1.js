export default class IntroLevel1 extends Phaser.Scene {
    constructor() {
        super('IntroLevel1');
    }

    create() {
        // Fondo base para mantener consistencia
        this.add.image(400, 300, 'bg_menu').setAlpha(0.6).setDisplaySize(800, 600);
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.5);

        this.add.text(400, 300, 'Intro Nivel 1\n(En construcción)', { 
            fontFamily: 'Arial',
            fontSize: '32px', 
            color: '#ffffff', 
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Botón temporal para no quedar atrapado
        const btnNext = this.add.text(400, 500, '[ Comenzar Nivel 1 ]', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#008800',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btnNext.on('pointerdown', () => {
            this.sound.play('click');
            this.scene.start('Level1_Semaforo');
        });
    }
}
