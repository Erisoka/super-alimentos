export default class Level1_Semaforo extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1_Semaforo' });
    }

    init() {
        this.score = 0;
    }

    create() {
        // Fondo (Depth 0)
        this.add.image(400, 300, 'bg_menu').setAlpha(0.6).setDisplaySize(800, 600).setDepth(0);

        // HUD Superior (Depth 10)
        const btnBack = this.add.image(50, 50, 'btn_back')
            .setInteractive({ useHandCursor: true })
            .setScale(0.1)
            .setDepth(10);
        
        btnBack.on('pointerdown', () => {
            this.sound.play('click');
            this.scene.start('MainMenu');
        });

        const btnPause = this.add.image(120, 50, 'btn_pause')
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

        // Área Central y Semáforo (Depth 5)
        this.add.image(400, 240, 'semaforo').setScale(0.5).setDepth(5);

        // Zonas de Caída (Drop Zones) encima de los colores del semáforo
        const zoneWidth = 100;
        const zoneHeight = 100;
        
        // Zona Roja (arriba)
        const zonaRoja = this.add.zone(400, 130, zoneWidth, zoneHeight).setRectangleDropZone(zoneWidth, zoneHeight);
        zonaRoja.colorCorrecto = 'rojo';

        // Zona Amarilla (medio)
        const zonaAmarilla = this.add.zone(400, 240, zoneWidth, zoneHeight).setRectangleDropZone(zoneWidth, zoneHeight);
        zonaAmarilla.colorCorrecto = 'amarillo';

        // Zona Verde (abajo). Ajustamos la Y restando 40 px acorde a tu solicitud.
        const zonaVerde = this.add.zone(400, 310, zoneWidth, zoneHeight).setRectangleDropZone(zoneWidth, zoneHeight);
        zonaVerde.colorCorrecto = 'verde';

        // Bandeja inferior y Alimentos (Depth 10)
        this.add.rectangle(400, 530, 600, 120, 0xffffff, 0.5)
            .setStrokeStyle(4, 0xf5deb3)
            .setDepth(5);

        // Creación y configuración de alimentos
        const manzana = this.add.image(200, 530, 'manzana').setScale(0.15).setDepth(10).setInteractive({ draggable: true });
        manzana.colorCorrecto = 'verde';

        const huevo = this.add.image(300, 530, 'huevo').setScale(0.15).setDepth(10).setInteractive({ draggable: true });
        huevo.colorCorrecto = 'amarillo';

        const pizza = this.add.image(400, 530, 'pizza').setScale(0.1).setDepth(10).setInteractive({ draggable: true });
        pizza.colorCorrecto = 'rojo';

        const agua = this.add.image(500, 530, 'agua').setScale(0.15).setDepth(10).setInteractive({ draggable: true });
        agua.colorCorrecto = 'verde';

        const dulces = this.add.image(600, 530, 'dulces').setScale(0.15).setDepth(10).setInteractive({ draggable: true });
        dulces.colorCorrecto = 'rojo';

        // Personaje Nutri guardado en this para poder animarlo luego (Depth 10)
        this.nutri = this.add.image(730, 480, 'nutri').setScale(0.2).setDepth(10);

        // Texto sobre el personaje
        this.add.text(580, 380, '¡Hola! Arrastra los\nalimentos al color correcto.', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#000000',
            backgroundColor: '#ffffff',
            align: 'center',
            padding: { x: 10, y: 10 }
        }).setOrigin(0.5).setDepth(10);

        // Eventos de Drag & Drop
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setDepth(20);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('drop', (pointer, gameObject, dropZone) => {
            if (gameObject.colorCorrecto === dropZone.colorCorrecto) {
                this.sound.play('success');
                this.score += 10;
                this.scoreText.setText(this.score);
                gameObject.destroy();

                // Validación de victoria
                if (this.score === 50) {
                    this.mostrarVictoria();
                }
            } else {
                this.sound.play('error');
                gameObject.input.dropZone = false; 
            }
        });

        this.input.on('dragend', (pointer, gameObject, dropped) => {
            if (!dropped || gameObject.input.dropZone === false) {
                this.tweens.add({
                    targets: gameObject,
                    x: gameObject.input.dragStartX,
                    y: gameObject.input.dragStartY,
                    duration: 300,
                    ease: 'Power2'
                });
                gameObject.setDepth(10);
            }
        });
    }

    mostrarVictoria() {
        this.sound.play('win');
        // Panel semitransparente oscuro
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7).setDepth(30);

        // Efecto de Confeti (Partículas)
        const confeti = this.add.particles(400, 100, 'star', {
            speed: { min: 100, max: 400 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.15, end: 0 },
            lifespan: 2500,
            gravityY: 300,
            quantity: 3,
            tint: [ 0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff ],
            emitting: true
        });
        confeti.setDepth(30);

        // Texto alegre
        this.add.text(400, 200, '¡Excelente!\nAyudaste a Nutri', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#ffffff',
            stroke: '#ff9900', // Borde naranja
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(30);

        // Animación de Nutri
        this.nutri.setDepth(30).setPosition(400, 300); // Ponemos a nutri al frente
        
        this.tweens.add({
            targets: this.nutri,
            y: this.nutri.y - 50,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.inOut'
        });

        // Personajes secundarios
        const fruti = this.add.image(200, 450, 'frutina').setScale(0.3).setDepth(25);
        const aguita = this.add.image(600, 450, 'aguita').setScale(0.3).setDepth(25);

        // Tween de salto
        this.tweens.add({
            targets: [fruti, aguita],
            y: '-=30',
            duration: 400,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Botón interactivo Siguiente Nivel
        const btnNext = this.add.text(400, 420, '[ Siguiente Nivel ]', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#008800', // Fondo estilo botón
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setDepth(30).setInteractive({ useHandCursor: true });

        btnNext.on('pointerdown', () => {
            this.sound.play('click');
            this.scene.start('Level2_Lonchera');
        });
        
        btnNext.on('pointerover', () => {
            btnNext.setScale(1.1);
        });

        btnNext.on('pointerout', () => {
            btnNext.setScale(1);
        });
    }
}
