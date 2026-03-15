export default class IntroCharactersScene extends Phaser.Scene {
    constructor() { super('IntroCharactersScene'); }
    create() {
        this.add.text(400, 300, 'Pantalla de Personajes\n(En construcción)', { 
            fontSize: '32px', 
            color: '#fff', 
            align: 'center' 
        }).setOrigin(0.5);
    }
}
