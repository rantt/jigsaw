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
	init: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);		
	},
  create: function() {
    this.game.world.setBounds(0, 0 ,Game.w ,Game.h);

    this.game.stage.backgroundColor = '#213D5E';
    this.game_won = false;

		// this.level = 1;

    if (difficulty === 'easy') {
      this.square = 3;
    }else if (difficulty === 'normal') {
      this.square = 5;
    }else if (difficulty === 'hard') {
      this.square = 10;
    }

    // this.puzzles = ['cat','prehistory','skyscrapers','boxing'];
    // this.puzzles = ['horse','cat','apple','flower',];

    this.puzzle = new Puzzle(this.game, level.toString(), this.square);  
		this.puzzle.scatter();

		this.preview_button = this.game.add.button(Game.w-200,0,this.makeBox(200,50), this.puzzle.preview_toggle,this.puzzle);
		this.preview_button.tint = 0xff00ff;
		this.game.add.bitmapText(Game.w-170,10,'minecraftia','Preview',24);

		this.menu_button = this.game.add.button(0,0,this.makeBox(200,50), this.gotoMenu,this);
		this.menu_button.tint = 0xff00ff;
		this.game.add.bitmapText(50,10,'minecraftia','Menu',24);

    // // Music
    // this.music = this.game.add.sound('music');
    // this.music.volume = 0.5;
    // this.music.play('',0,1,true);



    //Create Twitter button as invisible, show during win condition to post highscore
    this.twitterButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200,'twitter', this.twitter, this);
    this.twitterButton.anchor.set(0.5);
    this.twitterButton.visible = false;
  },
  gotoMenu: function() {
    this.game.state.start('Menu');
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

		if (this.puzzle.won === true && this.game_won === false) {
			this.puzzle.destroy();
      console.log(level);
      level = parseInt(level) + 1;
			// level += 1;
			if (level < 10) {
        this.puzzle = new Puzzle(this.game, level.toString(), this.square);
				this.puzzle.scatter();
			}else {
        this.game_won = true;
        level = 1;
      }
		}else {
      
      // this.game.state.start('Menu');
    }
		

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
  // render: function() {
  //   this.game.debug.body(this.piece);
  //   // game.debug.text('Health: ' + tri.health, 32, 96);
  // }

};
