'use strict';

let player = null, shrek = null; 

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
	this.load.spritesheet('grass', 'App/assets/images/world/grass.jpg', { frameWidth: config.width, frameHeight: 70 });	
	this.load.spritesheet('genka_right_run', 'App/assets/images/sprites/player_left/right_run.png', {frameWidth: 95, frameHeight: 123});	
	this.load.image('shrek', 'App/assets/images/shrek.png');	
}

function create() {
	// sprites
	this.anims.create({
    	key: 'left',
	    frames: this.anims.generateFrameNumbers('genka_right_run', { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
	    frameRate: 15,
	    repeat: -1
	});

	this.anims.create({
	    key: 'stand',
	    frames: [ { key: 'genka_right_run', frame: 0 } ],
	    frameRate: 15
	});

	this.anims.create({
	    key: 'right',
	    frames: this.anims.generateFrameNumbers('genka_right_run', { frames: [0, 1, 2, 3, 4, 5, 6, 7]}),
	    frameRate: 15,
	    repeat: -1
	});

	//sky
	this.add.image(config.width / 2, config.height / 2, 'sky').setScale(1.3);

	// platforms
	let platforms = this.physics.add.staticGroup();
		platforms.create(config.width / 2, config.height - 10, 'grass').setScale(1).refreshBody();
		
	// player
		player = this.physics.add.sprite(650, 320, 'genka_right_run', 0);

		player.setBounce(0.2);
		player.setCollideWorldBounds(true);
		player.body.setGravityY(300);
		
	// set player and platforms collision
	this.physics.add.collider(player, platforms);

	// create shrek
	shrek = this.physics.add.image(200, 200, 'shrek');
	shrek.setVelocity(200, 200);
	shrek.setBounce(1.4, 1.4);
	shrek.setScale(0.1).refreshBody();
	shrek.setCollideWorldBounds(true);
	
	this.physics.add.collider(shrek, platforms);
	this.physics.add.collider(player, shrek);
}

function update() {

	// player moving
	let cursors = this.input.keyboard.createCursorKeys();
	
	if (cursors.left.isDown) {
		player.setVelocityX(-200);
		player.anims.play('left', true);
		player.flipX = true;
	} else if (cursors.right.isDown) {
		player.setVelocityX(200);
		player.anims.play('right', true);
		player.flipX = false;
	} else {
		player.setVelocityX(0);
		player.anims.play('stand');
	}

	if (cursors.up.isDown && player.body.touching.down) {
		player.setVelocityY(-330);
	}

}

