/*global Game*/

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */

// // Choose Random integer in a range
// function rand (min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// var musicOn = true;


var wKey;
var aKey;
var sKey;
var dKey;
var score = 0;

Game.Play = function(game) {
  this.game = game;
};

Game.Play.prototype = {
  create: function() {
    this.game.world.setBounds(0, 0 ,Game.w ,Game.h);

    this.game.stage.backgroundColor = '#202020';

    // this.puzzle = new Puzzle(this.game, 'cat', 3);  


    var width = 400;
    var height = 400; 

    var bmdwidth = Math.floor(width*1.30);
    var bmdheight = Math.floor(height*1.30);
		console.log(bmdwidth, bmdheight);

    var tl = {x: Math.floor(width*0.15), y: Math.floor(height*0.15)}; 
    var tr = {x: (width+Math.floor(width*0.15)), y: (Math.floor(height*0.15))};
    var bl = {x: Math.floor(width*0.15), y: (height+Math.floor(height*0.15))};
    var br = {x: (width+Math.floor(width*0.15)), y: (height+Math.floor(height*0.15))};

    console.log( tl.x, tl.y);
    console.log( tr.x, tr.y);
    console.log( bl.x, bl.y);
    console.log( br.x, br.y);

    this.left_side=this.bottom_side=0;

    this.left_side = -1;
    this.bottom_side = 1;
    
    this.piecebmd = this.game.add.bitmapData(bmdwidth,bmdheight);
    this.piecebmd.ctx.clearRect(0, 0, bmdwidth, bmdheight);
    this.piecebmd.ctx.strokeStyle = '#FFF';
    this.piecebmd.ctx.fillStyle = '#dcdcdc';
    this.piecebmd.ctx.lineWidth = 2;
    this.piecebmd.ctx.fill();
    this.piecebmd.ctx.beginPath();

    if (this.left_side === 0) {
      //left side flat
      console.log('inhere');
      this.piecebmd.ctx.moveTo(tl.x,tl.y);
      this.piecebmd.ctx.lineTo(bl.x,bl.y);
      console.log(bl.x, bl.y);
    }else if (this.left_side === -1){
      //left side cave
      this.piecebmd.ctx.moveTo(tl.x,tl.y);
      this.piecebmd.ctx.lineTo(tl.x,Math.floor(tl.y+height/3));
      this.piecebmd.ctx.lineTo(Math.floor(tl.x+width*0.1),Math.floor(tl.y+height/3));
      this.piecebmd.ctx.lineTo(Math.floor(tl.x+width*0.15),Math.floor(tl.y+height/3+height/6));
      this.piecebmd.ctx.lineTo(Math.floor(tl.x+width*0.10),Math.floor(tl.y+height/3+2*height/6));
      this.piecebmd.ctx.lineTo(tl.x,Math.floor(tl.y+height/3+2*height/6));
      this.piecebmd.ctx.lineTo(bl.x,bl.y);
    }else if (this.left_side === 1) {
      //left side mountain
      this.piecebmd.ctx.moveTo(tl.x,tl.y);
      this.piecebmd.ctx.lineTo(tl.x,Math.floor(tl.y+height/3));
      this.piecebmd.ctx.lineTo(Math.floor(tl.x-width*0.1),Math.floor(tl.y+height/3));
      this.piecebmd.ctx.lineTo(Math.floor(tl.x-width*0.15),Math.floor(tl.y+height/3+height/6));
      this.piecebmd.ctx.lineTo(Math.floor(tl.x-width*0.10),Math.floor(tl.y+height/3+2*height/6));
      this.piecebmd.ctx.lineTo(tl.x,Math.floor(tl.y+height/3+2*height/6));
      this.piecebmd.ctx.lineTo(bl.x,bl.y);
    }

    if (this.bottom_side === 0) {
      //bottom side flat
      this.piecebmd.ctx.lineTo(br.x, br.y); 
    }else if (this.bottom_side === -1) {
			//bootom side mountain
      this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3), bl.y); 
      this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3), Math.floor(bl.y+width*0.1)); 
      this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3+width/6), Math.floor(bl.y+width*0.15)); 
      this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3+2*width/6), Math.floor(bl.y+width*0.1)); 
      this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3+2*width/6), bl.y); 
      this.piecebmd.ctx.lineTo(br.x, bl.y); 
    }else if (this.bottom_side === 1) {
      this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3), bl.y); 
      this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3), Math.floor(bl.y-width*0.1)); 
      this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3+width/6), Math.floor(bl.y-width*0.15)); 
      this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3+2*width/6), Math.floor(bl.y-width*0.1)); 
      this.piecebmd.ctx.lineTo(Math.floor(bl.x+width/3+2*width/6), bl.y); 
      this.piecebmd.ctx.lineTo(br.x, bl.y); 
		}

    // //bottom side cave
    // this.piecebmd.ctx.lineTo(Math.floor(width/3),height);
    // this.piecebmd.ctx.lineTo(Math.floor(width/3),height-Math.floor(height*0.1));
    // this.piecebmd.ctx.lineTo(Math.floor(width/3)+Math.floor(width/6),height-Math.floor(height*0.15));
    // this.piecebmd.ctx.lineTo(Math.floor(width/3)+Math.floor(width/6),height-Math.floor(height*0.15));
    // this.piecebmd.ctx.lineTo(Math.floor(width/3)+2*Math.floor(width/6),height-Math.floor(height*0.1));
    // this.piecebmd.ctx.lineTo(Math.floor(width/3)+2*Math.floor(width/6),height);
    // this.piecebmd.ctx.lineTo(width,height);
    //
    
    // //bottom side cave
    // this.piecebmd.ctx.lineTo(this.left_offset,height-Math.floor(height*0.15));
    // this.piecebmd.ctx.lineTo(this.left_offset+Math.floor(width/3),height-Math.floor(height*0.15));
    // this.piecebmd.ctx.lineTo(this.left_offset+Math.floor(width/3),height-Math.floor(height*0.05));
    // this.piecebmd.ctx.lineTo(this.left_offset+Math.floor(width/3)+Math.floor(width/6),height);
    // this.piecebmd.ctx.lineTo(this.left_offset+Math.floor(width/3)+2*Math.floor(width/6),height-Math.floor(height*0.05));
    // this.piecebmd.ctx.lineTo(this.left_offset+Math.floor(width/3)+2*Math.floor(width/6),height-Math.floor(height*0.15));
    // this.piecebmd.ctx.lineTo(this.left_offset+width,height-Math.floor(height*0.15));



    //right side flat
    this.piecebmd.ctx.lineTo(tr.x, tr.y);
    //top side flat
    this.piecebmd.ctx.lineTo(tl.x, tl.y);
    this.piecebmd.ctx.fill();

    this.box = this.game.add.sprite(Game.w/2, Game.h/2, this.makeBox(bmdwidth,bmdheight)).anchor.setTo(0.5);
    this.piece = this.game.add.sprite(Game.w/2, Game.h/2, this.piecebmd).anchor.setTo(0.5);
    


    // // Music
    // this.music = this.game.add.sound('music');
    // this.music.volume = 0.5;
    // this.music.play('',0,1,true);

    //Setup WASD and extra keys
    wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    // muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);


    //Create Twitter button as invisible, show during win condition to post highscore
    this.twitterButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200,'twitter', this.twitter, this);
    this.twitterButton.anchor.set(0.5);
    this.twitterButton.visible = false;
  },
    makeBox: function(x,y) {
      var bmd = this.game.add.bitmapData(x, y);
      bmd.ctx.beginPath();
      bmd.ctx.rect(0, 0, x, y);
      bmd.ctx.fillStyle = '#fff';
      bmd.ctx.fill();
      return bmd;
    },
  update: function() {

    // // Toggle Music
    // muteKey.onDown.add(this.toggleMute, this);

  },
  twitter: function() {
    //Popup twitter window to post highscore
    var game_url = 'http://www.divideby5.com/games/GAMETITLE/'; 
    var twitter_name = 'rantt_';
    var tags = ['1GAM'];

    window.open('http://twitter.com/share?text=My+best+score+is+'+score+'+playing+GAME+TITLE+See+if+you+can+beat+it.+at&via='+twitter_name+'&url='+game_url+'&hashtags='+tags.join(','), '_blank');
  },

  // toggleMute: function() {
  //   if (musicOn == true) {
  //     musicOn = false;
  //     this.music.volume = 0;
  //   }else {
  //     musicOn = true;
  //     this.music.volume = 0.5;
  //   }
  // },
  render: function() {
    this.game.debug.body(this.piece);
    // game.debug.text('Health: ' + tri.health, 32, 96);
  }

};
