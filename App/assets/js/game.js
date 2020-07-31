'use strict';

let player = null; 

// game config
let config = {
	type: Phaser.AUTO,
	width: 1350,
	height: 640,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false 
        }
    },
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

if (window.innerWidth >= config.width && window.innerHeight >= config.height) {
	document.body.style.overflow = 'hidden';
}

let game = new Phaser.Game(config);


function preload() {
	this.load.image('sky', 'App/assets/images/world/sky.jpg')
	this.load.image('genka_left_stand', 'App/assets/images/sprites/player_left/genka_left_stand.png');
	this.load.spritesheet('grass', 'App/assets/images/world/grass.jpg', { frameWidth: config.width, frameHeight: 70 });	
}

function create() {
	// sprites
	this.anims.create({
		key: 'left',
		frames: this.anims.generateFrameNumbers('duck', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});

	this.anims.create({
	    key: 'turn',
	    frames: [ { key: 'duck', frame: 4 } ],
	    frameRate: 20
	});

	this.anims.create({
	    key: 'right',
	    frames: this.anims.generateFrameNumbers('duck', { start: 5, end: 8 }),
	    frameRate: 10,
	    repeat: -1
	});

	//sky
	this.add.image(config.width / 2, config.height / 2, 'sky').setScale(1.3);

	// platforms
	let platforms = this.physics.add.staticGroup();
		platforms.create(config.width / 2, config.height - 10, 'grass').setScale(1).refreshBody();
		
	// player
		player = this.physics.add.sprite(650, 320, 'genka_left_stand');

		player.setBounce(0.2);
		player.setCollideWorldBounds(true);
		player.body.setGravityY(300);
		
	// set player and platforms collision
	this.physics.add.collider(player, platforms);

	


}

function update() {

	// player moving
	let cursors = this.input.keyboard.createCursorKeys();

	if (cursors.left.isDown) {
		player.setVelocityX(-160);
	} else if (cursors.right.isDown) {
		player.setVelocityX(160);
	} else {
		player.setVelocityX(0);
	}

	if (cursors.up.isDown && player.body.touching.down) {
		player.setVelocityY(-330);
	}
}

