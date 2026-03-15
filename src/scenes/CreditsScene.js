export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    create() {
        // 1. Fondo y Botón de Retorno
        this.add.image(400, 300, 'bg_menu').setTint(0x333333).setDisplaySize(800, 600);

        const btnBack = this.add.image(50, 50, 'btn_back')
            .setInteractive({ useHandCursor: true })
            .setScale(0.1);

        btnBack.on('pointerdown', () => {
            this.sound.play('click');
            this.scene.start('MainMenu');
        });

        // 2. Encabezado Institucional (Centro Superior)
        this.add.text(400, 50, 'Fundación Universitaria Colombo Germana', {
            fontFamily: 'Arial',
            fontSize: '26px',
            color: '#FFD700',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        this.add.text(400, 85, 'Facultad de Ciencias Humanas y Sociales', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(400, 110, 'Educación Infantil', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(400, 135, 'Alimentación y nutrición infantil 3005007', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#aed581'
        }).setOrigin(0.5);

        // 3. Equipo Desarrollador (Centro de la pantalla)
        this.add.text(400, 210, 'Desarrollado por:', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FFD700',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Integrante 1 (Izquierda)
        this.add.image(250, 320, 'foto_doralba').setDisplaySize(120, 120);
        this.add.text(250, 410, 'Doralba Andrade', {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Integrante 2 (Derecha)
        this.add.image(550, 320, 'foto_vanessa').setDisplaySize(120, 120);
        this.add.text(550, 410, 'Vanessa Jiménez', {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // 4. Docente y Pie de Página (Parte Inferior)
        this.add.text(400, 500, 'Docente: Mg. Jenny Paola Pulido Páez', {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#FFD700'
        }).setOrigin(0.5);

        this.add.text(400, 560, 'La Aventura de los Súper Alimentos - 2026', {
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#cccccc'
        }).setOrigin(0.5);
    }
}
