export default class IntroCharactersScene extends Phaser.Scene {
    constructor() {
        super('IntroCharactersScene');
    }

    create() {
        // 1. Fondo y Título
        this.add.image(400, 300, 'bg_menu').setDisplaySize(800, 600);
        this.add.rectangle(400, 300, 800, 600, 0x8bc34a).setAlpha(0.95);

        this.add.text(400, 50, 'Personajes del juego', {
            fontFamily: 'Arial',
            fontSize: '36px',
            color: '#000000',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Estilos Comunes
        const textStyle = {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#111111',
            lineSpacing: 4
        };

        // 2. Lista de Personajes (Izquierda)
        
        // Nutri
        this.add.image(80, 140, 'nutri').setScale(0.12);
        this.add.text(140, 130, 'Nutri – El guía del juego que explica\ncada misión.', textStyle);

        // Frutina
        this.add.image(80, 220, 'frutina').setScale(0.15);
        this.add.text(140, 210, 'Frutina – Representa las frutas y\nenseña por qué son importantes.', textStyle);

        // Verdurín
        this.add.image(80, 300, 'verdurin').setScale(0.15);
        this.add.text(140, 290, 'Verdurín – Explica la importancia\nde las verduras.', textStyle);

        // Agüita
        this.add.image(80, 380, 'aguita').setScale(0.15);
        this.add.text(140, 370, 'Agüita – Recuerda beber\nsuficiente agua.', textStyle);

        // Don Chatarra
        // Intentamos cargar la imagen 'chatarra' si existe, si no, un emoji
        const chatarra = this.add.image(80, 460, 'chatarra').setScale(0.15);
        // Si por alguna razón no carga bien o prefieres emoji, se puede ajustar
        this.add.text(140, 460, 'Don Chatarra – Personaje que aparece\ncuando se eligen alimentos poco\nsaludables.', textStyle);

        // 3. Imagen de Grupo (Derecha) - La pandilla unida
        this.add.image(600, 250, 'nutri').setScale(0.3);
        this.add.image(500, 350, 'frutina').setScale(0.25);
        this.add.image(600, 350, 'aguita').setScale(0.25);
        this.add.image(700, 350, 'verdurin').setScale(0.25);

        // 4. Botón de Continuar
        const btnContinue = this.add.text(600, 520, '[ Continuar ]', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btnContinue.on('pointerdown', () => {
            this.sound.play('click');
            this.scene.start('IntroLevel1');
        });

        // Efectos del botón
        btnContinue.on('pointerover', () => btnContinue.setScale(1.1));
        btnContinue.on('pointerout', () => btnContinue.setScale(1));
    }
}
