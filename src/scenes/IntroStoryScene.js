export default class IntroStoryScene extends Phaser.Scene {
    constructor() {
        super('IntroStoryScene');
    }

    create() {
        // 1. Fondo
        this.add.image(400, 300, 'bg_menu').setDisplaySize(800, 600);
        this.add.rectangle(400, 300, 800, 600, 0x8bc34a).setAlpha(0.95);

        // 2. Títulos
        this.add.text(400, 50, 'La Aventura de los Súper Alimentos', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(40, 110, 'Historia del juego', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#004d40',
            fontWeight: 'bold'
        }).setOrigin(0, 0.5);

        // 3. Texto de la Historia (Izquierda) - Ajuste de ancho y posición para evitar solapamiento
        const historiaTexto = 'En el Reino de la Salud vive Nutri, el pequeño explorador, quien quiere ayudar a los niños a descubrir cuáles alimentos les dan energía, fuerza y salud.\n\nPero el reino tiene un problema: muchos niños están comiendo alimentos que no ayudan a su cuerpo.\n\nPara solucionarlo, Nutri invita a los jugadores a superar misiones y niveles, donde aprenderán a elegir alimentos saludables y construir buenos hábitos alimenticios.\n\nCada misión completada dará estrellas de salud.';

        this.add.text(35, 160, historiaTexto, {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#111111',
            wordWrap: { width: 340 },
            lineSpacing: 8
        });

        // 4. Imagen (Derecha) - Reducción de escala y ajuste de posición
        this.add.image(590, 310, 'intro_historia').setScale(0.32);

        // 5. Botón de Continuar
        const btnContinue = this.add.text(600, 520, '[ Continuar ]', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btnContinue.on('pointerdown', () => {
            this.sound.play('click');
            this.scene.start('IntroCharactersScene');
        });

        // Efecto hover para el botón
        btnContinue.on('pointerover', () => btnContinue.setScale(1.1));
        btnContinue.on('pointerout', () => btnContinue.setScale(1));
    }
}
