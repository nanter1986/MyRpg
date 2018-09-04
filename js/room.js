function Room(game){
	Room.map=null;
	this.layer=null;
	this.cursors=null;	
	this.sprite=null;
	Room.music=null;
	//button booleans
	Room.leftActive=false;
	Room.rightActive=false;
	Room.upActive=false;
	Room.downActive=false;
	Room.firstActionActive=false;
	Room.secondActionActive=false;
	//button variables
	this.leftButton=null;
	this.rightButton=null;
	this.upButton=null;
	this.downButton=null;
	this.firstButton=null;
	this.secondButton=null;
	//characters
	Room.player=null;

	//https://phaser.io/examples/v2/input/virtual-gamecontroller
	//virtual controller
	this.preload=function(){
		console.log('preload');
		game.load.tilemap('map', 'assets/map.csv', null, Phaser.Tilemap.CSV);
		game.load.spritesheet('tiles', 'assets/basictiles.png');
		game.load.image('characters', 'assets/characters.png');
		game.load.image('up', 'assets/flatDark02.png');
		game.load.image('down', 'assets/flatDark09.png');
		game.load.image('left', 'assets/flatDark04.png');
		game.load.image('right', 'assets/flatDark05.png');
		game.load.image('a', 'assets/flatDark35.png');
		game.load.image('b', 'assets/flatDark36.png');
		game.load.spritesheet('char', 'assets/characters.png', 16, 16, 96);
		// https://github.com/photonstorm/phaser-examples/blob/master/examples/audio/play%20music.js
		//game.load.audio('boden', 'assets/dustymemories.mp3');
		console.log('preload end');
	};
	this.create=function(){
		console.log('create start');
		if (!game.device.desktop){ game.input.onDown.add(this.goFull, this); } //go fullscreen on mobile devices
		Room.map = game.add.tilemap('map', 16, 16);
		Room.map.addTilesetImage('tiles');
		Room.map.setCollisionBetween(0,7);
		Room.map.setTileIndexCallback(48, Room.enterDoor, this);
		// https://github.com/photonstorm/phaser-examples/blob/master/examples/tilemaps/tile%20callbacks.js
		this.layer = Room.map.createLayer(0);
		this.layer.resizeWorld();
		//this.layer.debug = true;
		this.sprite = game.add.sprite(40, 100, 'char',4);
		var chData=null;
		if(Room.loadData()==null){
			chData={
				'level':1
			};
            console.log('room load data is null');
		}else{
			chData=Room.loadData();
            console.log('room load data not null');
		}
		var tpCh=typeof chData.level;
		console.log('type of data:'+tpCh);
		game.debug.text("chData:"+chData+"type:"+tpCh, 32, 192);
		Room.player=new Player('nanter',this.sprite,chData);
		/*this.sprite.animations.add('left',[15,17],10,true);
		this.sprite.animations.add('right',[27,29],10,true);
		this.sprite.animations.add('down',[3,5],10,true);
		this.sprite.animations.add('up',[39,41],10,true);
		this.sprite.animations.play('walk', 50, true);*/
		game.physics.enable(Room.player.sprite, Phaser.Physics.ARCADE);
		Room.player.sprite.body.setSize(10, 14, 2, 1);
		game.camera.follow(Room.player.sprite);
		//Room.music = game.add.audio('boden');
		//Room.music.play();
		this.upButton= game.add.button(70, 420, 'up', null, this);
		this.downButton= game.add.button(70, 500, 'down', null, this);
		this.leftButton= game.add.button(10, 400, 'left', null, this);
		this.rightButton= game.add.button(80, 400, 'right', null, this);
		this.firstButton= game.add.button(550, 500, 'a', null, this);
		this.secondButton= game.add.button(600, 500, 'b', null, this);
		//buttonjump.events.onInputOver.add(function(){jump=true;});
		//buttonjump.events.onInputOut.add(function(){jump=false;});
		this.upButton.events.onInputDown.add(function(){
			Room.upActive=true;
			console.log("up button active:"+Room.upActive);
			game.debug.text("upActive"+Room.upActive, 32, 32);
		});
		this.upButton.events.onInputUp.add(function(){
			Room.upActive=false;
			console.log("up button stopped:"+Room.upActive);
			game.debug.text("upActive"+Room.upActive, 32, 32);
		});
		this.downButton.events.onInputDown.add(function(){
			Room.downActive=true;
			console.log("down button active"+Room.downActive);
			game.debug.text("downActive"+Room.downActive, 32, 32);
		});
		this.downButton.events.onInputUp.add(function(){
			Room.downActive=false;
			console.log("down button stopped"+Room.downActive);
			game.debug.text("downActive"+Room.downActive, 32, 32);
		});
		this.rightButton.events.onInputDown.add(function(){
			Room.rightActive=true;
			console.log("right button active:"+Room.rightActive);
			game.debug.text("rightActive"+Room.rightActive, 32, 32);
		});
		this.rightButton.events.onInputUp.add(function(){
			Room.rightActive=false;
			console.log("right button stopped:"+Room.rightActive);
			game.debug.text("rightActive"+Room.rightActive, 32, 32);
		});
		this.leftButton.events.onInputDown.add(function(){
			Room.leftActive=true;
			console.log("left button active"+Room.leftActive);
			game.debug.text("leftActive"+Room.leftActive, 32, 32);
		});
		this.leftButton.events.onInputUp.add(function(){
			Room.leftActive=false;
			console.log("left button stopped"+Room.leftActive);
			game.debug.text("leftActive"+Room.leftActive, 32, 32);
		});
		this.firstButton.events.onInputDown.add(function(){
			Room.firstActionActive=true;
			game.debug.text("firstActive"+Room.firstActionActive, 32, 32);
		});
		this.firstButton.events.onInputUp.add(function(){
			Room.firstActionActive=false;
			game.debug.text("firstActive"+Room.firstActionActive, 32, 32);
		});
		this.secondButton.events.onInputDown.add(function(){
			Room.secondActionActive=true;
			game.debug.text("secondActive"+Room.secondActionActive, 32, 32);
		});
		this.secondButton.events.onInputUp.add(function(){
			Room.secondActionActive=false;
			game.debug.text("secondActive"+Room.secondActionActive, 32, 32);
		});
		console.log(this.sprite);
		console.log(this.sprite.animations);
		this.cursors = game.input.keyboard.createCursorKeys();
		game.input.onTap.add(this.onTapping,this);
		console.log('create end');
		console.log("room created");
	};
	this.update=function(){
		console.log('update/'+this.upActive+this.downActive);
		game.debug.text("downActive:"+Room.downActive+"/upActive:"+Room.upActive, 32, 64);
		//game.debug.soundInfo(Room.music, 20, 96);
		game.debug.text('level:'+Room.player.level,32,128);
		game.physics.arcade.collide(this.sprite, this.layer);
		this.sprite.body.velocity.set(0);
		if (this.cursors.left.isDown || Room.leftActive===true)
		{
			Room.player.sprite.body.velocity.x = -100;
			Room.player.level+=1;
			Room.player.sprite.play('left');
		}
		else if (this.cursors.right.isDown || Room.rightActive===true)
		{
			Room.player.sprite.body.velocity.x = 100;
			Room.player.level+=1;
			Room.player.sprite.play('right');
		}
		else if (this.cursors.up.isDown || Room.upActive===true)
		{
			console.log("inside up else if");
			Room.player.sprite.body.velocity.y = -100;
			Room.player.level+=1;
			Room.player.sprite.play('up');
		}
		else if (this.cursors.down.isDown || Room.downActive===true)
		{
			//fix this
			Room.player.sprite.body.velocity.y = 100;
			Room.player.level+=1;
			Room.player.sprite.play('down');
		}
		else
		{
			Room.player.sprite.animations.stop();
		}
	};
	this.goFull=function(){
		game.scale.startFullScreen(false);
	};
	this.onTapping=function(pointer,doubleTap){
		console.log("tap/"+pointer.x+"/"+pointer.y);
	};
	Room.saveData=function(){
		game.debug.text("start of save", 32, 130);
		var testObject = Room.player.chData;
        console.log('testObject:'+testObject);
		var stringifiedTestObject=JSON.stringify(testObject);
        console.log('stringifiedTestObject:'+stringifiedTestObject);
		// Put the object into storage
		localStorage.setItem('player',stringifiedTestObject );
		game.debug.text("end of save", 32, 130);
	};
	Room.loadData=function(){
		// Retrieve the object from storage
		var retrievedObject = localStorage.getItem('player');
		console.log('retrievedObject: ', retrievedObject);
        var inflatedRetrievedObject = JSON.parse(retrievedObject);
        console.log('inflatedRetrievedObject: ', inflatedRetrievedObject);
		return retrievedObject;
	};
	Room.enterDoor=function(){
		game.debug.text("touched door", 32, 96);
		//save character data first
		Room.saveData();
		//door should lead to next room
		game.state.start('inside');

	};
}
