function rand (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Puzzle = function(game, pic, square) {
  this.game = game;
  this.pic = pic;
  this.square = square;
	this.won = false;

    //load source image to get image height/width properties
    this.src_image = this.game.add.image(Game.w/2, Game.h/2, pic);
		this.src_image.anchor.setTo(0.5);
    this.src_image.visible = false;

    var w = this.src_image.width;
    var h = this.src_image.height;

    //User to center piece
    this.offsetX = (Game.w - w)/2; 
    this.offsetY = (Game.h - h)/2; 

    this.tile_width = Math.floor(w/this.square);
    this.tile_height = Math.floor(h/this.square);

    this.pieces = [];
		this.slots = [];
    this.background = {};
		this.piece_list = {};

    //Setup Background Game Board
    for (var i = 0; i < this.square;i++) {
      for (var j = 0; j < this.square;j++) {

				var slot = this.game.add.sprite(this.offsetX+j*this.tile_width,this.offsetY+i*this.tile_height, this.makeBox(this.tile_width, this.tile_height));
				slot.j = j;
				slot.i = i;
				this.background[j+'_'+i] = slot;
				this.slots.push(slot);
			}
		}

    // Offset for puzzle sizes
    // 0 - flat
    // -1 - valley 
    // 1 - hill
    var choice = [-1, 1]; 

    for (var i = 0; i < this.square;i++) {
      for (var j = 0; j < this.square;j++) {

        var sides = {ls: 0, bs: 0, rs: 0, ts: 0};

        //above - choose piece to fit the above piece
        if (this.piece_list[j+'_'+(i-1)] !== undefined) {
          sides.ts = this.piece_list[j+'_'+(i-1)].bottom_side * -1;
        }else {
          sides.ts = choice[rand(0,1)]; 
        }

        //left - choose piece to fit the left piece
        if (this.piece_list[(j-1)+'_'+i] !== undefined) {
          sides.ls = this.piece_list[(j-1)+'_'+i].right_side * -1;
        }else {
          sides.ls = choice[rand(0,1)]; 
        }

        //bottom
        sides.bs = choice[rand(0,1)];

        //right
        sides.rs = choice[rand(0,1)];

        if (j === (this.square -1)) { sides.rs = 0; }
        if (i === 0) { sides.ts = 0; }
        if (i === (this.square - 1)) { sides.bs = 0; }
        if (j === 0) { sides.ls = 0; }

        var piece = new PuzzlePiece(this.game, this.offsetX+j*this.tile_width, this.offsetY+i*this.tile_height, j, i, this.tile_width, this.tile_height,pic, sides);

				piece.events.onDragStart.add(this.onDragStart, this);
				piece.events.onDragStop.add(this.onDragStop, this);
				
        this.pieces.push(piece);
        this.piece_list[j+'_'+i] = piece;

      }
    }
};

Puzzle.prototype = Puzzle.prototype.constructor = Puzzle;

Puzzle.prototype = {
	onDragStart: function(sprite, pointer) {
    this.game.world.bringToTop(sprite);
	},
	onDragStop: function(piece, pointer) {
	
		var slot = this.background[piece.j+'_'+piece.i];

		if (Phaser.Rectangle.intersects(piece.getBounds(), slot.getBounds())) {
      //Disable and place piece
			this.game.world.sendToBack(piece);
			slot.visible = false;
			piece.inputEnabled = false;
			piece.input.enableDrag(false);
			piece.x = piece.initialX;
			piece.y = piece.initialY;
			this.slots.forEach(function(slot) {
				this.game.world.sendToBack(slot);
			},this);

			this.won = this.checkWin();
		}

	},
	checkWin: function() {
		var won = true;
		for(var i=0; i< this.pieces.length;i++) {
			if (this.pieces[i].x !== this.pieces[i].initialX && this.pieces[i].y !== this.pieces[i].initialY) {
				won = false;
				}
		}
		return won;
	},
	scatter: function() {
		for (var s=0; s < this.pieces.length;s++) {
			var piece = this.pieces[s];
			piece.x = rand(0, Game.w-this.tile_width/2);
			piece.y = rand(this.tile_height/2, Game.h-this.tile_height/2);

		}
	},
	destroy: function() {
		this.slots.forEach(function(slot) {
			slot.destroy();
		},this);
		this.pieces.forEach(function(piece) {
			piece.destroy();
		},this);
	},
	preview_toggle: function() {
		if (this.src_image.visible === false) {
			this.src_image.visible = true;
			this.game.world.bringToTop(this.src_image);
			this.pieces.forEach(function(piece) {
				piece.visible = false;
			},this);
		}else {
			this.src_image.visible = false;
			this.pieces.forEach(function(piece) {
				piece.visible = true;
			},this);
		}
	},
  makeBox: function(x,y) {
      var bmd = this.game.add.bitmapData(x, y);
      bmd.ctx.beginPath();
      bmd.ctx.rect(0, 0, x, y);
      bmd.ctx.fillStyle = '#202020';
			bmd.ctx.lineStyle = 4;
      bmd.ctx.strokeStyle = '#ff00ff';
      bmd.ctx.fill();
      return bmd;
    },
};
