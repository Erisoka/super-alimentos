export default class Level3_Grupos extends Phaser.Scene {
    constructor() {
        super('Level3_Grupos');
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
            this.sound.play('click');
            this.scene.start('Level2_Lonchera');
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

        // Título del Nivel
        this.add.image(400, 100, 'title_n3').setScale(0.35).setDepth(10);

        // Personaje nutri (Depth 10)
        this.add.image(730, 480, 'nutri').setScale(0.2).setDepth(10);
        
        // Globo de texto (Depth 10)
        this.add.text(580, 410, '¡Clasifica cada alimento\nen su grupo correcto!', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#000000',
            backgroundColor: '#ffffff',
            align: 'center',
            padding: { x: 10, y: 10 }
        }).setOrigin(0.5).setDepth(10);

        // Don Chatarra (Oculto al inicio)
        this.chatarra = this.add.image(400, 300, 'chatarra').setScale(0.4).setDepth(50).setVisible(false);

        // Las 4 Canastas y Drop Zones (Y bajado a 300 para dar espacio al título)
        const gruposData = [
            { id: 'Frutas', x: 160 },
            { id: 'Verduras', x: 320 },
            { id: 'Proteínas', x: 480 },
            { id: 'Cereales', x: 640 }
        ];

        gruposData.forEach(grupo => {
            this.add.image(grupo.x, 300, 'canasta').setScale(0.4).setDepth(5);
            
            // Bajamos también el texto para que no tape el título
            this.add.text(grupo.x, 200, grupo.id, {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 6
            }).setOrigin(0.5).setDepth(5);

            const zoneWidth = 120;
            const zoneHeight = 120;
            // Se sincroniza la Y del dropzone con la canasta
            const dropZone = this.add.zone(grupo.x, 300, zoneWidth, zoneHeight).setRectangleDropZone(zoneWidth, zoneHeight);
            dropZone.grupoCorrecto = grupo.id;
        });

        // Bandeja inferior y Alimentos a Clasificar (Depth 10)
        this.add.rectangle(400, 530, 600, 120, 0xffffff, 0.5)
            .setStrokeStyle(4, 0xf5deb3)
            .setDepth(5);

        // Posiciones X disponibles en la bandeja, mezcladas aleatoriamente (más separadas)
        // Inicio en 200, separación de 130px: 200, 330, 460, 590
        const posicionesX = Phaser.Utils.Array.Shuffle([200, 330, 460, 590]);

        // Alimentos
        const alimentosData = [
            { id: 'banano', grupo: 'Frutas' },
            { id: 'brocoli', grupo: 'Verduras' },
            { id: 'carne', grupo: 'Proteínas' },
            { id: 'arroz', grupo: 'Cereales' }
        ];

        alimentosData.forEach((item, index) => {
            const alimento = this.add.image(posicionesX[index], 530, item.id)
                .setScale(0.15)
                .setDepth(10)
                .setInteractive({ draggable: true });
            alimento.grupoCorrecto = item.grupo;
        });

        // Eventos de Drag & Drop
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setDepth(20);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('drop', (pointer, gameObject, dropZone) => {
            if (gameObject.grupoCorrecto === dropZone.grupoCorrecto) {
                this.sound.play('success');
                this.score += 10;
                this.scoreText.setText(this.score);
                gameObject.destroy();

                if (this.score === 40) {
                    this.finalizarNivel();
                }
            } else {
                this.sound.play('error');
                gameObject.input.dropZone = false; 

                // Feedback visual de Don Chatarra
                this.chatarra.setVisible(true);
                this.time.delayedCall(1500, () => {
                    this.chatarra.setVisible(false);
                });
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

    finalizarNivel() {
        // Panel semitransparente oscuro
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7).setDepth(30);

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
        this.sound.play('win');

        // Texto alegre
        this.add.text(400, 200, '¡Genial! Cada grupo ayuda a\ntu cuerpo de forma diferente.', {
            fontFamily: 'Arial',
            fontSize: '40px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(30);

        // Personajes secundarios bailando
        const fruti = this.add.image(200, 450, 'frutina').setScale(0.25).setDepth(25);
        const verdurin = this.add.image(400, 480, 'verdurin').setScale(0.25).setDepth(25);
        const aguita = this.add.image(600, 450, 'aguita').setScale(0.25).setDepth(25);

        this.tweens.add({
            targets: [fruti, verdurin, aguita],
            angle: { from: -15, to: 15 },
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Botón interactivo Siguiente Nivel
        const btnNext = this.add.text(400, 500, '[ Siguiente Nivel ]', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#008800', // Fondo estilo botón
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setDepth(30).setInteractive({ useHandCursor: true });

        btnNext.on('pointerdown', () => {
            this.sound.play('click');
            this.scene.start('IntroLevel4');
        });
        
        btnNext.on('pointerover', () => {
            btnNext.setScale(1.1);
        });

        btnNext.on('pointerout', () => {
            btnNext.setScale(1);
        });
    }
}
