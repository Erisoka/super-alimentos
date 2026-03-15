export default class Level4_Decisiones extends Phaser.Scene {
    constructor() {
        super('Level4_Decisiones');
    }

    init() {
        this.score = 0;
        this.preguntaActual = 0;
    }

    create() {
        // 1. Variables y Estructura
        this.preguntas = [
            { texto: 'En el recreo tienes hambre.\n¿Qué eliges?', imgA: 'manzana', imgB: 'dulces', correcta: 'A' },
            { texto: 'Tienes mucha sed después de jugar.\n¿Qué bebes?', imgA: 'gaseosa', imgB: 'agua', correcta: 'B' },
            { texto: 'Para empezar el día con fuerza.\n¿Qué prefieres?', imgA: 'huevo', imgB: 'dona', correcta: 'A' },
            { texto: 'A la hora del almuerzo.\n¿Qué te da más energía?', imgA: 'hamburguesa', imgB: 'carne', correcta: 'B' },
            { texto: 'Un antojo por la tarde.\n¿Qué es mejor?', imgA: 'yogur', imgB: 'papas', correcta: 'A' }
        ];

        // 2. Interfaz Base
        // Fondo (Depth 0)
        this.add.image(400, 300, 'bg_menu').setAlpha(0.6).setDisplaySize(800, 600).setDepth(0);

        // HUD Superior (Depth 10)
        const btnBack = this.add.image(40, 40, 'btn_back')
            .setInteractive({ useHandCursor: true })
            .setScale(0.1)
            .setDepth(10);
        
        btnBack.on('pointerdown', () => {
            this.sound.play('click');
            this.scene.start('Level3_Grupos');
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
        this.add.image(400, 100, 'title_n4').setScale(0.35).setDepth(10);

        // Personaje nutri (Depth 10)
        this.nutri = this.add.image(730, 480, 'nutri').setScale(0.2).setDepth(10);
        
        // Globo de texto para errores (Depth 30 para estar siempre encima de Chatarra)
        this.globoNutri = this.add.text(400, 270, '', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            stroke: '#ff0000',
            strokeThickness: 3,
            align: 'center',
            padding: { x: 15, y: 15 }
        }).setOrigin(0.5).setDepth(30);
        this.globoNutri.setVisible(false);

        // Pizarra y Pregunta (Depth 5 y 10) - Bajado 50px
        this.add.image(400, 330, 'pizarra').setScale(0.7).setDepth(5);
        
        this.textoPregunta = this.add.text(400, 200, '', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#ffffff',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(10);

        this.chatarra = this.add.image(400, 350, 'chatarra').setScale(0.4).setDepth(20);
        this.chatarra.setVisible(false);

        // 3. Contenedores Visuales de A y B (Áreas Invisibles)
        
        // Opción A - Bajadas 50px
        this.zonaA = this.add.zone(250, 370, 150, 200).setInteractive({ useHandCursor: true });
            
        this.imgOpA = this.add.image(250, 350, 'manzana').setScale(0.15).setDepth(7);
        
        this.textOptionA = this.add.text(250, 430, 'A', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#ff4500', 
            padding: { x: 10, y: 5 },
            fixedWidth: 40,
            align: 'center'
        }).setOrigin(0.5).setDepth(7);

        // Opción B - Bajadas 50px
        this.zonaB = this.add.zone(550, 370, 150, 200).setInteractive({ useHandCursor: true });
            
        this.imgOpB = this.add.image(550, 350, 'dulces').setScale(0.15).setDepth(7);
        
        this.textOptionB = this.add.text(550, 430, 'B', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#008000', 
            padding: { x: 10, y: 5 },
            fixedWidth: 40,
            align: 'center'
        }).setOrigin(0.5).setDepth(7);

        // LÓGICA DE INTERACCIÓN
        this.zonaA.on('pointerdown', () => this.verificarRespuesta('A'));
        this.zonaB.on('pointerdown', () => this.verificarRespuesta('B'));

        // Iniciar el ciclo de preguntas
        this.cargarPregunta();
    }

    // 4. Método cargarPregunta
    cargarPregunta() {
        const datos = this.preguntas[this.preguntaActual];
        
        // Actualizar textos e imágenes
        this.textoPregunta.setText(datos.texto);
        this.imgOpA.setTexture(datos.imgA);
        this.imgOpB.setTexture(datos.imgB);
        
        this.chatarra.setVisible(false);
    }

    // 5. Lógica de Respuesta
    verificarRespuesta(opcionElegida) {
        const datos = this.preguntas[this.preguntaActual];

        if (opcionElegida === datos.correcta) {
            this.sound.play('success');
            // Correcto
            this.score += 10;
            this.scoreText.setText(this.score);
            this.chatarra.setVisible(false);
            this.globoNutri.setVisible(false);
            
            this.preguntaActual++;
            
            if (this.preguntaActual === this.preguntas.length) {
                // Ya no hay más preguntas
                this.zonaA.disableInteractive();
                this.imgOpA.setVisible(false);
                this.textOptionA.setVisible(false);
                
                this.zonaB.disableInteractive();
                this.imgOpB.setVisible(false);
                this.textOptionB.setVisible(false);
                this.textoPregunta.setVisible(false);
                
                this.finalizarJuego();
            } else {
                this.cargarPregunta();
            }
        } else {
            this.sound.play('error');
            // Incorrecto
            this.globoNutri.setText('¡Los dulces no dan buena energía!\nIntenta de nuevo.');
            this.globoNutri.setVisible(true);
            
            const targetsTweens = opcionElegida === 'A' 
                ? [this.imgOpA, this.textOptionA] 
                : [this.imgOpB, this.textOptionB];

            this.tweens.add({
                targets: targetsTweens,
                x: '+=5',
                yoyo: true,
                repeat: 5,
                duration: 50
            });
            
            // Imagen chatarra en X: 400, Y: 430 (bajado 50px), Escala 0.5, Depth 15
            const chatarraImg = this.add.image(400, 430, 'chatarra').setScale(0.5).setDepth(15);
            this.tweens.add({
                targets: chatarraImg,
                alpha: 0,
                duration: 1500,
                onComplete: () => {
                    chatarraImg.destroy();
                    this.globoNutri.setVisible(false);
                }
            });
        }
    }

    // El Gran Cierre
    finalizarJuego() {
        // Panel oscuro semitransparente
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7).setDepth(30);

        // Efecto de Confeti (Partículas)
        const confeti = this.add.particles(400, 100, 'star', {
            speed: { min: 100, max: 400 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.15, end: 0 },
            lifespan: 2500,
            gravityY: 300,
            quantity: 5, 
            tint: [ 0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0xffa500 ],
            emitting: true
        });
        confeti.setDepth(30);
        this.sound.play('win');

        // La pandilla celebrando en la parte inferior
        const nutriVictor = this.add.image(150, 520, 'nutri').setScale(0.18).setDepth(40);
        const frutinaVictor = this.add.image(310, 520, 'frutina').setScale(0.18).setDepth(40);
        const verdurinVictor = this.add.image(490, 520, 'verdurin').setScale(0.18).setDepth(40);
        const aguitaVictor = this.add.image(650, 520, 'aguita').setScale(0.18).setDepth(40);
        
        this.nutri.setVisible(false); // Ocultar al nutri original

        // Animación de salto final
        this.tweens.add({
            targets: [nutriVictor, frutinaVictor, verdurinVictor, aguitaVictor],
            y: '-=20',
            duration: 400,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Mensaje final largo
        this.add.text(400, 160, '¡Felicitaciones!\nAhora sabes cómo elegir alimentos saludables.\nRecuerda comer frutas y verduras, beber agua\ny evitar demasiados dulces.\n¡Tu cuerpo te lo agradecerá!', {
            fontFamily: 'Arial',
            fontSize: '26px',
            color: '#ffffff',
            stroke: '#00AA00', // Borde verde grueso
            strokeThickness: 8,
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5).setDepth(32);

        // Botón a la Escena de Videos
        const btnVideo = this.add.image(400, 350, 'btn_video')
            .setInteractive({ useHandCursor: true })
            .setScale(0.3) 
            .setDepth(50);
            
        // Efecto pulso para el botón
        this.tweens.add({
            targets: btnVideo,
            scale: 0.35,
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        btnVideo.on('pointerdown', () => {
            this.sound.play('click');
            this.scene.start('VideosScene');
        });
    }
}
