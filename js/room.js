function Room(game){
	this.map=null;
	this.layer=null;
	this.cursors=null;	
	this.sprite=null;
	//button booleans
	this.leftActive=false;
	this.rightActive=false;
	this.upActive=false;
	this.downActive=false;
	this.firstActionActive=false;
	this.secondActionActive=false;
	//button variables
	this.leftButton=null;
	this.rightButton=null;
	this.upButton=null;
	this.downButton=null;
	this.firstButton=null;
	this.secondButton=null;

	//https://phaser.io/examples/v2/input/virtual-gamecontroller
	//virtual controller
	this.preload=function(){
		console.log('preload');
		game.load.tilemap('map', 'assets/map.csv', null, Phaser.Tilemap.CSV);
		game.load.spritesheet('tiles', 'assets/basictiles.png');
		game.load.image('characters', 'assets/characters.png');
		game.load.image('up', 'assets/flatDark09.png');
		game.load.image('down', 'assets/flatDark02.png');
		game.load.image('left', 'assets/flatDark04.png');
		game.load.image('right', 'assets/flatDark05.png');
		game.load.image('a', 'assets/flatDark35.png');
		game.load.image('b', 'assets/flatDark36.png');
		game.load.spritesheet('char', 'assets/characters.png', 16, 16, 96);
		console.log('preload end');
	},
	this.create=function(){
		console.log('create start');
		if (!game.device.desktop){ game.input.onDown.add(this.gofull, this); } //go fullscreen on mobile devices
		this.map = game.add.tilemap('map', 16, 16);
		this.map.addTilesetImage('tiles');
		this.map.setCollisionBetween(0,7);
		this.layer = this.map.createLayer(0);
		this.layer.resizeWorld();
		//this.layer.debug = true;
		this.sprite = game.add.sprite(40, 100, 'char',4);
		this.sprite.animations.add('left',[15,17],10,true);
		this.sprite.animations.add('right',[27,29],10,true);
		this.sprite.animations.add('down',[3,5],10,true);
		this.sprite.animations.add('up',[39,41],10,true);
		this.sprite.animations.play('walk', 50, true);
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.setSize(10, 14, 2, 1);
		game.camera.follow(this.sprite);
		this.upButton= game.add.button(200, 500, 'up', null, this);
		this.downButton= game.add.button(200, 300, 'down', null, this);
		this.leftButton= game.add.button(100, 400, 'left', null, this);
		this.rightButton= game.add.button(300, 400, 'right', null, this);
		this.firstButton= game.add.button(400, 500, 'a', null, this);
		this.secondButton= game.add.button(600, 500, 'b', null, this);
		//buttonjump.events.onInputOver.add(function(){jump=true;});
		//buttonjump.events.onInputOut.add(function(){jump=false;});
		this.upButton.events.onInputDown.add(function(){
			this.upActive=true;
			console.log("up button active:"+this.upActive);
			game.debug.text("upActive"+this.upActive, 32, 32);
		});
		this.upButton.events.onInputUp.add(function(){
			this.upActive=false;
			console.log("up button stopped:"+this.upActive);
			game.debug.text("upActive"+this.upActive, 32, 32);
		});
		this.downButton.events.onInputDown.add(function(){
			this.downActive=true;
			console.log("down button active"+this.downActive);
			game.debug.text("downActive"+this.downActive, 32, 32);
		});
		this.downButton.events.onInputUp.add(function(){
			this.downActive=false;
			console.log("down button stopped"+this.downActive);
			game.debug.text("downActive"+this.downActive, 32, 32);
		});
		console.log(this.sprite);
		console.log(this.sprite.animations);
		this.cursors = game.input.keyboard.createCursorKeys();
		game.input.onTap.add(this.onTapping,this);
		console.log('create end');
		console.log("room created");
	},
	this.update=function(){
		console.log('update/'+this.upActive+this.downActive);
		game.debug.text("downActive:"+this.downActive+"/upActive:"+this.upActive, 32, 64);
		game.physics.arcade.collide(this.sprite, this.layer);
		this.sprite.body.velocity.set(0);
		if (this.cursors.left.isDown || this.leftActive==true)
		{
			this.sprite.body.velocity.x = -100;
			this.sprite.play('left');
		}
		else if (this.cursors.right.isDown || this.rightActive==true)
		{
			this.sprite.body.velocity.x = 100;
			this.sprite.play('right');
		}
		else if (this.cursors.up.isDown || this.upActive==true)
		{
			console.log("inside up else if")
			this.sprite.body.velocity.y = -100;
			this.sprite.play('up');
		}
		else if (this.cursors.down.isDown || this.downActive==true)
		{
			//fix this
			this.sprite.body.velocity.y = 100;
			this.sprite.play('down');
		}
		else
		{
			this.sprite.animations.stop();
		}
	},
	this.gofull=function(){
		game.scale.startFullScreen(false);
	},
	this.onTapping=function(pointer,doubleTap){
		console.log("tap/"+pointer.x+"/"+pointer.y);
	}
}
