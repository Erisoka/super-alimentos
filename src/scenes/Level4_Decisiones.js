export default class Level4_Decisiones extends Phaser.Scene {
    constructor() {
        super('Level4_Decisiones');
    }

    create() {
        this.add.image(400, 300, 'bg_menu').setAlpha(0.6).setDisplaySize(800, 600).setDepth(0);

        this.add.text(400, 300, 'Nivel 4: Decisiones\n(En construcción)', { 
            fontFamily: 'Arial',
            fontSize: '32px', 
            color: '#fff', 
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        const btnBack = this.add.image(40, 40, 'btn_back')
            .setInteractive({ useHandCursor: true })
            .setScale(0.1)
            .setDepth(10);
        
        btnBack.on('pointerdown', () => {
            this.scene.start('Level3_Grupos');
        });
    }
}
