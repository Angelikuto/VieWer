class Scene extends Phaser.Scene {

    preload() {

        this.load.image('background', 'assets/images/background.png');

        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');

        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level3.json');

    }

    create() {

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(4, 2);

        // chargement de la map
        const map = this.add.tilemap('map');
        // chargement du tileset
        const tileset = map.addTilesetImage(
            'platformPack_tilesheet',
            'tiles'
        );

        this.platforms = map.createStaticLayer('Platforms', tileset, 0, 650);
        this.platforms.setCollisionByProperty({collides:true});
        this.platforms.setCollisionByExclusion(-1, true);

        this.player = new Player(this)

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setRoundPixels(true);
        this.cameras.main.setBounds(0,0,10000,8000);
        this.cameras.main.startFollow(this.player.player);

    }


    update() {

        if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.onFloor()) {
            this.player.jump()
            console.log("oui")
        }
        if (this.cursors.left.isDown) {
            this.player.moveLeft()
        } else if (this.cursors.right.isDown) {
            this.player.moveRight()
        } else {
            this.player.stop();
        }
        if ((this.cursors.shift.isDown && this.cursors.left.isDown )&& this.player.player.body.onFloor()){
            this.player.runLeft();
        }
        else if ((this.cursors.shift.isDown && this.cursors.right.isDown)&& this.player.player.body.onFloor()){
            this.player.runRight();
        }
    }
}