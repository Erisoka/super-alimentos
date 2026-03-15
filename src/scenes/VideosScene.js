export default class VideosScene extends Phaser.Scene {
    constructor() {
        super('VideosScene');
    }

    create() {
        // Fondo (Depth 0)
        this.add.image(400, 300, 'bg_menu').setDisplaySize(800, 600).setDepth(0);

        // Botón Back (Depth 10)
        const btnBack = this.add.image(50, 50, 'btn_back')
            .setInteractive({ useHandCursor: true })
            .setScale(0.1)
            .setDepth(10);
        
        btnBack.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        // Título Principal
        this.add.text(400, 100, '¡Aprende más con estos videos!', {
            fontFamily: 'Arial',
            fontSize: '36px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5).setDepth(10);

        // Videos y Miniaturas
        
        // --- Video 1 ---
        const thumb1 = this.add.image(150, 300, 'thumb1')
            .setInteractive({ useHandCursor: true })
            .setDisplaySize(220, 130)
            .setDepth(5);
            
        this.add.text(150, 400, 'El Semáforo de\nlos alimentos', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(10);

        thumb1.on('pointerdown', () => {
            window.open('https://youtube.com/shorts/q0izUl7caKw', '_blank');
        });

        // --- Video 2 ---
        const thumb2 = this.add.image(400, 300, 'thumb2')
            .setInteractive({ useHandCursor: true })
            .setDisplaySize(220, 130)
            .setDepth(5);
            
        this.add.text(400, 400, '¿Qué es la\ncomida chatarra?', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(10);

        thumb2.on('pointerdown', () => {
            window.open('https://www.youtube.com/watch?v=apCEJ1ySD5M', '_blank');
        });

        // --- Video 3 ---
        const thumb3 = this.add.image(650, 300, 'thumb3')
            .setInteractive({ useHandCursor: true })
            .setDisplaySize(220, 130)
            .setDepth(5);
            
        this.add.text(650, 400, 'Cuento: Rico y la\ncomida chatarra', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(10);

        thumb3.on('pointerdown', () => {
            window.open('https://www.youtube.com/watch?v=t_VVWwb3Vys', '_blank');
        });
        
        // Animación Hover adaptada para DisplaySize
        const applyHover = (thumb) => {
            // Guardamos tamaño original
            const baseW = 220;
            const baseH = 130;
            
            thumb.on('pointerover', () => {
                this.tweens.add({
                    targets: thumb,
                    displayWidth: baseW * 1.1,
                    displayHeight: baseH * 1.1,
                    duration: 150,
                    ease: 'Power1'
                });
            });
            thumb.on('pointerout', () => {
                this.tweens.add({
                    targets: thumb,
                    displayWidth: baseW,
                    displayHeight: baseH,
                    duration: 150,
                    ease: 'Power1'
                });
            });
        };
        
        applyHover(thumb1);
        applyHover(thumb2);
        applyHover(thumb3);
    }
}
