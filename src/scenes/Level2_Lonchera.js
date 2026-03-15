export default class Level2_Lonchera extends Phaser.Scene {
    constructor() {
        super('Level2_Lonchera');
    }

    init() {
        this.score = 0;
        this.saludablesRecolectados = 0;
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
            this.scene.start('Level1_Semaforo');
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
        this.add.image(400, 100, 'title_n2').setScale(0.35).setDepth(10);

        // Área Central: Lonchera (Depth 5) - Lo bajamos a Y=305 para dar espacio al título
        this.loncheraVacia = this.add.image(400, 305, 'lonchera').setScale(0.6).setDepth(5);

        // Bandeja inferior y Alimentos (Depth 10)
        this.add.rectangle(400, 530, 600, 120, 0xffffff, 0.5)
            .setStrokeStyle(4, 0xf5deb3)
            .setDepth(5);

        // Texto instructivo sobre el personaje
        this.textoInstrucciones = this.add.text(640, 320, '¡Armemos una lonchera\npara tener mucha energía!\nElige los alimentos saludables.', {
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#000000',
            backgroundColor: '#ffffff',
            align: 'center',
            padding: { x: 10, y: 10 }
        }).setOrigin(0.5).setDepth(10);

        // Personaje Nutri (Depth 10)
        this.add.image(730, 480, 'nutri').setScale(0.2).setDepth(10);

        // Configuramos los alimentos y si son saludables (true/false)
        // Ajuste de espaciado para evitar superposición (rango 120-680, espacio ~93px)
        const alimentosData = [
            { id: 'manzana', x: 120, saludable: true },
            { id: 'gaseosa', x: 213, saludable: false },
            { id: 'pan',     x: 306, saludable: true },
            { id: 'agua',    x: 399, saludable: true },
            { id: 'papas',   x: 492, saludable: false },
            { id: 'yogur',   x: 585, saludable: true },
            { id: 'dulces',  x: 678, saludable: false }
        ];

        alimentosData.forEach(item => {
            const alimento = this.add.image(item.x, 530, item.id)
                .setScale(0.25)
                .setDepth(10)
                .setInteractive({ useHandCursor: true });

            alimento.on('pointerdown', () => {
                if (item.saludable) {
                    this.sound.play('success');
                    // Sumamos 10 puntos e inhabilitamos el clic
                    this.score += 10;
                    this.scoreText.setText(this.score);
                    alimento.disableInteractive();

                    // Vuela hacia la lonchera y desaparece (ajuste de escala final suave para 0.25)
                    this.tweens.add({
                        targets: alimento,
                        x: 400,
                        y: 305,
                        scale: 0.1,
                        alpha: 0,
                        duration: 600,
                        ease: 'Power2',
                        onComplete: () => {
                            alimento.destroy();
                            this.saludablesRecolectados++;
                            
                            // Validar si ganamos (4 alimentos saludables)
                            if (this.saludablesRecolectados === 4) {
                                this.finalizarNivel();
                            }
                        }
                    });
                } else {
                    this.sound.play('error');
                    // Alimento NO saludable
                    this.textoInstrucciones.setText('¡Cuidado! Ese alimento tiene\nmucha azúcar o grasa.');
                    
                    // Efecto de temblor (shake)
                    this.tweens.add({
                        targets: alimento,
                        x: '+=5', // Mueve 5 píxeles a la derecha
                        yoyo: true, // Vuelve a su posición original
                        repeat: 5, // Repite 5 veces (ida y vuelta)
                        duration: 50
                    });
                }
            });
        });
    }

    finalizarNivel() {
        // Ocultar lonchera vacía
        this.loncheraVacia.setVisible(false);

        // Panel oscuro semitransparente (Depth 19 para tapar fondo, pero dejar la lonchera en 20 visible y resaltada)
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7).setDepth(19);

        // Mostrar lonchera llena (Depth 20)
        const loncheraLlena = this.add.image(400, 305, 'lonchera_llena').setScale(0.6).setDepth(20);
        loncheraLlena.setAlpha(0); // Empezar invisible para el efecto
        
        // Animación de aparición (Fade In)
        this.tweens.add({
            targets: loncheraLlena,
            alpha: 1,
            duration: 400,
            onComplete: () => {
                // Animación de celebración (latidos)
                this.tweens.add({
                    targets: loncheraLlena,
                    scale: 0.65,
                    yoyo: true,
                    repeat: 3, // Repite 3 veces el latido
                    duration: 250,
                    onComplete: () => {
                        // Queda fija en la pantalla al 100% de opacidad y escala normal
                        loncheraLlena.setScale(0.6);
                        loncheraLlena.setAlpha(1);
                    }
                });
            }
        });

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

        // Invocar a la pandilla
        const frutina = this.add.image(150, 480, 'frutina').setScale(0.25).setDepth(25);
        const verdurin = this.add.image(280, 500, 'verdurin').setScale(0.25).setDepth(25);
        const aguita = this.add.image(520, 500, 'aguita').setScale(0.25).setDepth(25);

        // Animación de latido / pulso
        this.tweens.add({
            targets: [frutina, verdurin, aguita],
            scaleX: 0.28,
            scaleY: 0.28,
            duration: 400,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        const mensajeVictoria = this.add.text(400, 120, '¡Excelente!\nHas preparado una lonchera\nque te dará mucha energía.', {
            fontFamily: 'Arial',
            fontSize: '42px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(30);

        // Personaje Nutri en su esquina (Depth 21)
        this.add.image(730, 480, 'nutri').setScale(0.2).setDepth(21);

        // Botón Siguiente Nivel (Depth 25)
        const btnSiguiente = this.add.text(400, 450, '[ Siguiente Nivel ]', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#FFFFFF',
            backgroundColor: '#4CAF50',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true }).setDepth(25);

        btnSiguiente.on('pointerdown', () => {
            this.sound.play('click');
            this.scene.start('IntroLevel3');
        });
    }
}