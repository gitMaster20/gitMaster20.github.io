'use strict';

let player = null; 

// game config
let config = {
	type: Phaser.AUTO,
	width: 1330,
	height: 640,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

let game = new Phaser.Game(config);


function preload() {
	this.load.image('genka_left_stand', 'App/assets/images/genka_left_stand.png');
}

function create() {
	player = this.physics.add.sprite(650, 320, 'genka_left_stand');

	player.setBounce(0.2);
	player.setCollideWorldBounds(true);
	player.body.setGravityY(300);
	
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

	// platforms
	let platforms = this.physics.add.staticGroup();
		platforms.create(400, 500, 'ground').setScale(2).refreshBody();
		platforms.create(600, 400, 'ground');
		platforms.create(50, 250, 'ground');
		platforms.create(650, 450, 'ground');
		platforms.create(750, 220, 'ground');

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

