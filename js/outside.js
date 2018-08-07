var outsideState={
	text:null,
	counter:null,
	button:null,
	background:null,
	sprite:null,
	step:0,
	movable:true,
	destination:null,
	direction:0,
	stay:null,
	left:null,
	currentCharacterFrame:'robot',
	popup:null,
	yes:null,
	no:null,
	popupOnscreen:false,
	delayForPopup:0,
	preload:function(){
		console.log('preload');
		game.load.image('robot', 'assets/stand.png');
		game.load.image('box', 'assets/box.png');
		game.load.image('yes', 'assets/yes.png');
		game.load.image('no', 'assets/no.png');
		game.load.image('stepA', 'assets/stepA.png');
		game.load.image('stepB', 'assets/stepB.png');
		game.load.image('left1', 'assets/left1.png');
		game.load.image('left2', 'assets/left2.png');
		game.load.image('left3', 'assets/left3.png');
		game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
		game.load.image('background','assets/map.png');
		console.log('preload end');
	},
	create:function(){
		console.log('create start');
		if (!game.device.desktop){ game.input.onDown.add(this.gofull, this); } //go fullscreen on mobile devices
		//game.stage.backgroundColor = '#182d3b';
		this.background = game.add.sprite(0, 0, 'background');
		//this.background.scale.setTo(2,2);
		this.background.visible=true;
		this.sprite=game.add.sprite(200, 150, 'robot');
		console.log(this.sprite);
		this.sprite.anchor.set(0.5,0.5);
		this.sprite.scale.setTo(2,2);
		this.sprite.inputEnabled=true;
		this.destination=this.sprite.x;
		this.text = game.add.text(250, 80, '', { fill: '#ffffff' });
		//this.sprite.events.onInputDown.add(listener,this);
		game.camera.follow(this.sprite);
		game.input.onTap.add(this.onTapping,this);
		this.left=['left1','left2','left3'];
		this.stay=['robot'];
		this.currentCharacterFrame=this.stay[0];
		console.log(this.currentCharacterFrame);
		console.log('create end');
	},
	update:function(){
		console.log('update');
		this.sprite.loadTexture(this.currentCharacterFrame);
		//text.text='destination1'+destination;
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
