export default class Level2_Lonchera extends Phaser.Scene {
    constructor() {
        super('Level2_Lonchera');
    }

    init() {
        this.score = 0;
    }

    create() {
        // Fondo (Depth 0)
        this.add.image(400, 300, 'bg_menu').setAlpha(0.6).setDisplaySize(800, 600).setDepth(0);

        // HUD Superior (Depth 10)
        const btnBack = this.add.image(40, 40, 'btn_back')
            .setInteractive({ useHandCursor: true })
            .setScale(0.1)
            .setDepth(10);
        
        btnBack.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        const btnPause = this.add.image(110, 40, 'btn_pause')
            .setInteractive({ useHandCursor: true })
            .setScale(0.1)
            .setDepth(10);

        this.add.image(700, 40, 'star').setScale(0.15).setDepth(10);

        this.scoreText = this.add.text(740, 40, '0', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#fff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5, 0.5).setDepth(10);

        // Área Central: Lonchera (Depth 5)
        this.add.image(400, 260, 'lonchera').setScale(0.6).setDepth(5);

        // Bandeja inferior y Alimentos (Depth 10)
        this.add.rectangle(400, 530, 600, 120, 0xffffff, 0.5)
            .setStrokeStyle(4, 0xf5deb3)
            .setDepth(5);

        // Creación de alimentos distribuidos a lo largo del eje X
        this.add.image(150, 530, 'manzana').setScale(0.12).setDepth(10);
        this.add.image(230, 530, 'gaseosa').setScale(0.12).setDepth(10);
        this.add.image(310, 530, 'pan').setScale(0.12).setDepth(10);
        this.add.image(390, 530, 'agua').setScale(0.12).setDepth(10);
        this.add.image(470, 530, 'papas').setScale(0.12).setDepth(10);
        this.add.image(550, 530, 'yogur').setScale(0.12).setDepth(10);
        this.add.image(630, 530, 'dulces').setScale(0.12).setDepth(10);

        // Personaje Nutri (Depth 10)
        this.add.image(730, 480, 'nutri').setScale(0.2).setDepth(10);

        // Texto instructivo sobre el personaje
        this.add.text(580, 380, '¡Armemos una lonchera\npara tener mucha energía!\nElige los alimentos saludables.', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#000000',
            backgroundColor: '#ffffff',
            align: 'center',
            padding: { x: 10, y: 10 }
        }).setOrigin(0.5).setDepth(10);
    }
}