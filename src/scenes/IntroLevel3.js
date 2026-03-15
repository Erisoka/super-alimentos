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
            wordWrap: { width: 420 },
            lineSpacing: 10
        });

        // 3. Imágenes Ilustrativas (Derecha) - Refactorizado para evitar solapamiento
        
        // Primero la Canasta (Fondo de los personajes)
        this.add.image(620, 320, 'canasta_llena').setScale(0.32);

        // Luego la Pandilla (En frente de la canasta)
        this.add.image(470, 420, 'nutri').setScale(0.22).setAngle(-5); 
        this.add.image(550, 470, 'verdurin').setScale(0.18);
        this.add.image(700, 470, 'aguita').setScale(0.16);

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
