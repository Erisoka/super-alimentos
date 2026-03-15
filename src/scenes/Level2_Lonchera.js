export default class Level2_Lonchera extends Phaser.Scene {
    constructor() {
        super('Level2_Lonchera');
    }
    create() {
        this.add.text(400, 300, 'Nivel 2: La Lonchera\n(En construcción)', { fontSize: '32px', color: '#fff', align: 'center' }).setOrigin(0.5);
    }
}