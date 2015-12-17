/*global Game*/
Game.Menu = function(game){
  this.game = game;
};

Game.Menu.prototype =  {
    create: function() {

        this.title = this.game.add.sprite(Game.w/2,Game.h/2-100,'title');
        this.title.anchor.setTo(0.5,0.5);

        this.instructions = this.game.add.sprite(Game.w/2+200,200,'instructions');
        this.instructions.scale.x = 0.5;
        this.instructions.scale.y = 0.5;

        // Start Message

        var clickText = this.game.add.bitmapText(Game.w/2, Game.h/2-50, 'minecraftia', '~click to start~', 24); 

    },
    update: function() {
      //Click to Start
      if (this.game.input.activePointer.isDown){
        this.game.state.start('Play');
      }
    }
};
