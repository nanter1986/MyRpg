function Room(){
	this.map=null,
	this.layer=null,
	this.cursors=null,
	this.help =null, 	
	this.sprite=null,
	this.preload=function(){
		console.log('preload');
		game.load.tilemap('map', 'assets/map.csv', null, Phaser.Tilemap.CSV);
		game.load.spritesheet('tiles', 'assets/basictiles.png');
		game.load.image('characters', 'assets/characters.png');
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
		console.log(this.sprite);
		console.log(this.sprite.animations);
		this.help = game.add.text(16, 16, 'Arrows to scroll', { font: '14px Arial', fill: '#ffffff' });
		this.help.fixedToCamera = true;
		this.cursors = game.input.keyboard.createCursorKeys();
		game.input.onTap.add(this.onTapping,this);
		console.log('create end');
		console.log("room created");
	},
	this.update=function(){
		console.log('update');
		game.physics.arcade.collide(this.sprite, this.layer);
		this.sprite.body.velocity.set(0);
		if (this.cursors.left.isDown)
		{
			this.sprite.body.velocity.x = -100;
			this.sprite.play('left');
		}
		else if (this.cursors.right.isDown)
		{
			this.sprite.body.velocity.x = 100;
			this.sprite.play('right');
		}
		else if (this.cursors.up.isDown)
		{
			this.sprite.body.velocity.y = -100;
			this.sprite.play('up');
		}
		else if (this.cursors.down.isDown)
		{
			this.sprite.body.velocity.y = 100;
			this.sprite.play('down');
		}
		else
		{
			this.sprite.animations.stop();
		}

		/*	if(this.direction==0){
			this.currentCharacterFrame=this.animate(this.stay);
			}else if(this.direction==-1){
			this.currentCharacterFrame=this.animate(this.left);
			}else if(this.direction==1){	
			this.currentCharacterFrame=this.animate(this.left);
			}
			if(this.destination+5<this.sprite.x){
			this.sprite.x-=5;
			this.direction=-1;
			}else if(this.destination-5>this.sprite.x){
			this.sprite.x+=5;
			this.direction=1;
			}else{
			this.destination=this.sprite.x;
			this.movable=true;
			this.direction=0;
			}
			if(this.delayForPopup>0){
			this.delayForPopup--;	
			}

*/
	},
	this.animate=function(arrayOfFrames){
		//animates any number of frames
		/*	var length=arrayOfFrames.length;
			console.log('1');
			var frame;
			console.log('2');
			var index=this.step%length;
			console.log('step:'+this.step+'/index:'+index+'/length:'+length);
			frame=arrayOfFrames[index];
			console.log(frame);
			this.step++;
			if(this.step>=length){
			console.log('3');
			this.step=0;
			}
			return frame;*/
	},
	this.gofull=function(){
		game.scale.startFullScreen(false);
	},
	this.onTapping=function(pointer,doubleTap){
		console.log("tap");
		if(this.movable && this.popupOnscreen==false && this.delayForPopup==0){
			this.movable=false;
			var mX=pointer.x;
			this.destination=mX;
			if(this.destination>=420 && this.destination<=530 && this.sprite.x>=420 && this.sprite.x<=530){
				this.text.text="door found";
				this.popup=game.add.sprite(game.world.centerX,game.world.centerY,'box');
				this.popup.alpha=0.8;
				this.popup.anchor.set(0.5);
				var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: this.popup.width, align: "center", backgroundColor: "#ffff00" };
				this.text = game.add.text(this.popup.x, this.popup.y-20, "Enter Door?", style);
				this.text.anchor.set(0.5);
				this.yes=game.add.sprite(this.text.x-120,this.text.y-40,'yes');
				this.no=game.add.sprite(this.text.x,this.text.y-40,'no');
				this.no.inputEnabled = true;
				this.yes.inputEnabled = true;
				this.popupOnscreen=true;
				this.no.events.onInputDown.add(this.noClick, this);
				this.yes.events.onInputDown.add(this.yesClick, this);
			}
		}
		if(this.destination<this.sprite.x){
			this.sprite.scale.x=-2;
		}else{
			this.sprite.scale.x=2;	
		}
		//sprite.x=pointer.x;

	},
	this.noClick=function(){
		this.popup.destroy();
		this.yes.destroy();
		this.no.destroy();
		this.text.destroy();
		this.popupOnscreen=false;
		this.delayForPopup=10;

	},
	this.yesClick=function(){
		this.popup.destroy();
		this.yes.destroy();
		this.no.destroy();
		this.text.destroy();
		this.popupOnscreen=false;
		this.delayForPopup=10;
		game.state.start('outside');

	}

}
