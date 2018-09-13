function Room1(game){
    //Preroom.call(this,game);
    Room1.map=null;
    this.layer=null;
    this.cursors=null;
    this.sprite=null;
    Room1.music=null;
    //button booleans
    Room1.leftActive=false;
    Room1.rightActive=false;
    Room1.upActive=false;
    Room1.downActive=false;
    Room1.firstActionActive=false;
    Room1.secondActionActive=false;
    //button variables
    this.leftButton=null;
    this.rightButton=null;
    this.upButton=null;
    this.downButton=null;
    this.firstButton=null;
    this.secondButton=null;
    //characters
    Room1.player=null;
    //https://phaser.io/examples/v2/input/virtual-gamecontroller
    //virtual controller
    this.preload=function(){
        console.log('preload');
        game.load.tilemap('map', 'assets/house.csv', null, Phaser.Tilemap.CSV);
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
        Room1.map = game.add.tilemap('map', 16, 16);
        Room1.map.addTilesetImage('tiles');
        Room1.map.setCollisionBetween(0,7);
        Room1.map.setTileIndexCallback(48, Room1.enterDoor, this);
        // https://github.com/photonstorm/phaser-examples/blob/master/examples/tilemaps/tile%20callbacks.js
        this.layer = Room1.map.createLayer(0);
        this.layer.resizeWorld();
        //this.layer.debug = true;
        this.sprite = game.add.sprite(40, 100, 'char',4);
        var chData=null;
        if(Room1.loadData()==null){
            chData={
                'level':1
            };
            console.log('room load data is null');
        }else{
            chData=Room1.loadData();
            console.log('room load data not null');
        }
        var tpCh=typeof chData['level'];
        console.log('loaded data:'+chData);
        console.log('type of data:'+tpCh);
        console.log('type after number():'+Number(chData['level']));
        game.debug.text("chData:"+chData+"type:"+tpCh, 32, 192);
        Room1.player=new Player('nanter',this.sprite,chData);
        /*this.sprite.animations.add('left',[15,17],10,true);
        this.sprite.animations.add('right',[27,29],10,true);
        this.sprite.animations.add('down',[3,5],10,true);
        this.sprite.animations.add('up',[39,41],10,true);
        this.sprite.animations.play('walk', 50, true);*/
        game.physics.enable(Room1.player.sprite, Phaser.Physics.ARCADE);
        Room1.player.sprite.body.setSize(10, 14, 2, 1);
        game.camera.follow(Room1.player.sprite);
        //Room1.music = game.add.audio('boden');
        //Room1.music.play();
        this.upButton= game.add.button(70, 420, 'up', null, this);
        this.downButton= game.add.button(70, 500, 'down', null, this);
        this.leftButton= game.add.button(10, 400, 'left', null, this);
        this.rightButton= game.add.button(80, 400, 'right', null, this);
        this.firstButton= game.add.button(550, 500, 'a', null, this);
        this.secondButton= game.add.button(600, 500, 'b', null, this);
        //buttonjump.events.onInputOver.add(function(){jump=true;});
        //buttonjump.events.onInputOut.add(function(){jump=false;});
        this.upButton.events.onInputDown.add(function(){
            Room1.upActive=true;
            console.log("up button active:"+Room1.upActive);
            game.debug.text("upActive"+Room1.upActive, 32, 32);
        });
        this.upButton.events.onInputUp.add(function(){
            Room1.upActive=false;
            console.log("up button stopped:"+Room1.upActive);
            game.debug.text("upActive"+Room1.upActive, 32, 32);
        });
        this.downButton.events.onInputDown.add(function(){
            Room1.downActive=true;
            console.log("down button active"+Room1.downActive);
            game.debug.text("downActive"+Room1.downActive, 32, 32);
        });
        this.downButton.events.onInputUp.add(function(){
            Room1.downActive=false;
            console.log("down button stopped"+Room1.downActive);
            game.debug.text("downActive"+Room1.downActive, 32, 32);
        });
        this.rightButton.events.onInputDown.add(function(){
            Room1.rightActive=true;
            console.log("right button active:"+Room1.rightActive);
            game.debug.text("rightActive"+Room1.rightActive, 32, 32);
        });
        this.rightButton.events.onInputUp.add(function(){
            Room1.rightActive=false;
            console.log("right button stopped:"+Room1.rightActive);
            game.debug.text("rightActive"+Room1.rightActive, 32, 32);
        });
        this.leftButton.events.onInputDown.add(function(){
            Room1.leftActive=true;
            console.log("left button active"+Room1.leftActive);
            game.debug.text("leftActive"+Room1.leftActive, 32, 32);
        });
        this.leftButton.events.onInputUp.add(function(){
            Room1.leftActive=false;
            console.log("left button stopped"+Room1.leftActive);
            game.debug.text("leftActive"+Room1.leftActive, 32, 32);
        });
        this.firstButton.events.onInputDown.add(function(){
            Room1.firstActionActive=true;
            game.debug.text("firstActive"+Room1.firstActionActive, 32, 32);
        });
        this.firstButton.events.onInputUp.add(function(){
            Room1.firstActionActive=false;
            game.debug.text("firstActive"+Room1.firstActionActive, 32, 32);
        });
        this.secondButton.events.onInputDown.add(function(){
            Room1.secondActionActive=true;
            game.debug.text("secondActive"+Room1.secondActionActive, 32, 32);
        });
        this.secondButton.events.onInputUp.add(function(){
            Room1.secondActionActive=false;
            game.debug.text("secondActive"+Room1.secondActionActive, 32, 32);
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
        game.debug.text("downActive:"+Room1.downActive+"/upActive:"+Room1.upActive, 32, 64);
        //game.debug.soundInfo(Room1.music, 20, 96);
        game.debug.text('level:'+Room1.player.chData.level,32,128);
        game.physics.arcade.collide(this.sprite, this.layer);
        this.sprite.body.velocity.set(0);
        if (this.cursors.left.isDown || Room1.leftActive===true)
        {
            Room1.player.sprite.body.velocity.x = -100;
            Room1.player.chData.level+=1;
            Room1.player.sprite.play('left');
        }
        else if (this.cursors.right.isDown || Room1.rightActive===true)
        {
            Room1.player.sprite.body.velocity.x = 100;
            Room1.player.chData.level+=1;
            Room1.player.sprite.play('right');
        }
        else if (this.cursors.up.isDown || Room1.upActive===true)
        {
            console.log("inside up else if");
            Room1.player.sprite.body.velocity.y = -100;
            Room1.player.chData.level+=1;
            Room1.player.sprite.play('up');
        }
        else if (this.cursors.down.isDown || Room1.downActive===true)
        {
            //fix this
            Room1.player.sprite.body.velocity.y = 100;
            Room1.player.chData.level+=1;
            Room1.player.sprite.play('down');
        }
        else
        {
            Room1.player.sprite.animations.stop();
        }
    };
    this.goFull=function(){
        game.scale.startFullScreen(false);
    };
    this.onTapping=function(pointer,doubleTap){
        console.log("tap/"+pointer.x+"/"+pointer.y);
    };
    Room1.saveData=function(){
        game.debug.text("start of save", 32, 130);
        console.log('player level before saving:'+ Room1.player.chData);
        var testObject = Room1.player.chData;
        console.log('testObject:'+testObject);
        var stringifiedTestObject=JSON.stringify(testObject);
        console.log('stringifiedTestObject:'+stringifiedTestObject);
        // Put the object into storage
        localStorage.setItem('player',stringifiedTestObject);
        game.debug.text("end of save", 32, 130);
    };
    Room1.loadData=function(){
        // Retrieve the object from storage
        var retrievedObject = localStorage.getItem('player');
        console.log('retrievedObject: ', retrievedObject);
        var inflatedRetrievedObject = JSON.parse(retrievedObject);
        console.log('inflatedRetrievedObject: ', inflatedRetrievedObject);
        return inflatedRetrievedObject;
    };
    Room1.enterDoor=function(){
        game.debug.text("touched door", 32, 96);
        //save character data first
        Room1.saveData();
        //door should lead to next room
        game.state.start('inside');

    };
}
