function Room(){
	this.map=null;
	this.layer=null;
	this.cursors=null;
	this.sprite=game.add.sprite(200, 150, 'robot');
	step:0,
	movable:true,
	direction:0,
	this.stay=['robot'];
	this.left=['left1','left2','left3'];
	this.help="";
	currentCharacterFrame:'robot',
	preload:function(){
		console.log('preload');
		game.load.tilemap('map', 'assets/map.csv', null, Phaser.Tilemap.CSV);
		game.load.image('tiles', 'assets/basictiles.png');
		game.load.image('characters', 'assets/characters.png');
		console.log('preload end');
	},
	create:function(){
		console.log('create start');
		if (!game.device.desktop){ game.input.onDown.add(this.gofull, this); } //go fullscreen on mobile devices
		map = game.add.tilemap('map', 16, 16);
		map.addTilesetImage('tiles');
		layer = map.createLayer(0);
		layer.resizeWorld();
		this.help = game.add.text(16, 16, 'Arrows to scroll', { font: '14px Arial', fill: '#ffffff' });
		help.fixedToCamera = true;
		cursors = game.input.keyboard.createCursorKeys();
		console.log(this.sprite);
		this.sprite.anchor.set(0.5,0.5);
		this.sprite.scale.setTo(2,2);
		this.sprite.inputEnabled=true;
		game.camera.follow(this.sprite);
		game.input.onTap.add(this.onTapping,this);
		console.log(this.currentCharacterFrame);
		console.log('create end');
	},
	update:function(){
		console.log('update');
		this.sprite.loadTexture(this.currentCharacterFrame);
		if(this.direction==0){
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


	},
	animate:function(arrayOfFrames){
		//animates any number of frames
		var length=arrayOfFrames.length;
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
		return frame;
	},
	gofull:function(){
		game.scale.startFullScreen(false);
	},
	onTapping:function(pointer,doubleTap){
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
	noClick:function(){
		this.popup.destroy();
		this.yes.destroy();
		this.no.destroy();
		this.text.destroy();
		this.popupOnscreen=false;
		this.delayForPopup=10;

	},
	yesClick:function(){
		this.popup.destroy();
		this.yes.destroy();
		this.no.destroy();
		this.text.destroy();
		this.popupOnscreen=false;
		this.delayForPopup=10;
		game.state.start('outside');

	}

}
