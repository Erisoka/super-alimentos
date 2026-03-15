export default class IntroLevel2 extends Phaser.Scene {
    constructor() {
        super('IntroLevel2');
    }

    create() {
        // 1. Fondo y Título
        this.add.image(400, 300, 'bg_menu').setDisplaySize(800, 600);
        this.add.rectangle(400, 300, 800, 600, 0x8bc34a).setAlpha(0.95);

        this.add.text(400, 60, 'Nivel 2: La Lonchera Saludable', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#000000',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // 2. Texto Explicativo (Izquierda)
        const explicacion = 'Introducción del nivel:\nNutri dice: "Cuando vamos a la escuela necesitamos energía para aprender, jugar y crecer. Por eso nuestra lonchera debe tener alimentos saludables."\n\nObjetivo:\nConstruir una lonchera equilibrada.';

        this.add.text(50, 150, explicacion, {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#111111',
            wordWrap: { width: 450 },
            lineSpacing: 10
        });

        // 3. Imágenes Ilustrativas (Derecha)
        this.add.image(650, 300, 'lonchera').setScale(0.4);
        this.add.image(500, 400, 'nutri').setScale(0.2);
        this.add.image(600, 450, 'frutina').setScale(0.15);

        // 4. Botón para Iniciar el Nivel
        const btnStart = this.add.text(650, 520, '[ ¡Comenzar! ]', {
            fontFamily: 'Arial',
            fontSize: '26px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btnStart.on('pointerdown', () => {
            this.sound.play('click');
            this.scene.start('Level2_Lonchera');
        });

        // Efectos del botón
        btnStart.on('pointerover', () => btnStart.setScale(1.1));
        btnStart.on('pointerout', () => btnStart.setScale(1));
    }
}
