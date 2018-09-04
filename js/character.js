function Character(chName,sprite,chData){
    this.chName=chName;
    this.chData=chData;
    this.sprite = sprite;
}

function Player(chName,sprite,chData){
    Character.call(this,chName,sprite,chData);
    this.sprite.animations.add('left',[15,17],10,true);
    this.sprite.animations.add('right',[27,29],10,true);
    this.sprite.animations.add('down',[3,5],10,true);
    this.sprite.animations.add('up',[39,41],10,true);
    this.sprite.animations.play('walk', 50, true);
    this.level=Number(chData.level);
    console.log('level of character'+this.level);
}

function npcCharacter(chName,sprite,chData){
    Character.call(this,chName,sprite,chData);
}

function hostileCharacter(chName,sprite,chData){
    Character.call(this,chName,sprite,chData);
}
