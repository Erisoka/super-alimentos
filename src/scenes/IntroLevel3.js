export default class IntroLevel3 extends Phaser.Scene {
    constructor() {
        super('IntroLevel3');
    }

    create() {
        // 1. Fondo y Título
        this.add.image(400, 300, 'bg_menu').setDisplaySize(800, 600);
        this.add.rectangle(400, 300, 800, 600, 0x8bc34a).setAlpha(0.95);

        this.add.text(400, 60, 'Nivel 3: Los grupos de alimentos', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#000000',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // 2. Texto Explicativo (Izquierda)
        const explicacion = 'Introducción del nivel:\nNutri explica: "Los alimentos se dividen en grupos. Cada grupo ayuda a nuestro cuerpo de diferentes maneras."\n\nObjetivo:\nClasificar alimentos por grupos.';

        this.add.text(50, 150, explicacion, {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#111111',
            wordWrap: { width: 450 },
            lineSpacing: 10
        });

        // 3. Imágenes Ilustrativas (Derecha)
        // Al colocar los alimentos antes que la canasta, aparecerán "dentro" si se posicionan detrás
        this.add.image(620, 260, 'banano').setScale(0.12).setAngle(-15);
        this.add.image(680, 260, 'brocoli').setScale(0.12).setAngle(15);
        this.add.image(650, 300, 'canasta').setScale(0.4);
        
        this.add.image(500, 400, 'nutri').setScale(0.2);

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
            this.scene.start('Level3_Grupos');
        });

        // Efectos del botón
        btnStart.on('pointerover', () => btnStart.setScale(1.1));
        btnStart.on('pointerout', () => btnStart.setScale(1));
    }
}
