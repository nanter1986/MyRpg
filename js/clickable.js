function Clickable(x,y,yesClick,noClick,sprite){
	this.x=x;
	this.y=y;
	this.yesClick=yesClick;
	this.noClick=noClick;
	this.sprite=game.add.sprite(this.x,this.y,'sprite');
}
