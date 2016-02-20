function rand (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Puzzle = function(game, pic, square) {
  this.game = game;
  this.pic = pic;
  this.square = square;

    //load source image to get image height/width properties
    var src_image = this.game.add.image(0, 0, pic);
    src_image.visible = false;

    var w = src_image.width;
    var h = src_image.height;

    this.offsetX = (Game.w - w)/2; 
    this.offsetY = (Game.h - h)/2; 

    this.tile_width = Math.floor(w/this.square);
    this.tile_height = Math.floor(h/this.square);

    this.pieces = [];
    this.background = [];
		this.piece_list = {};

    //Setup Background Game Board
    for (var i = 0; i < this.square;i++) {
      for (var j = 0; j < this.square;j++) {
        // this.background.push(this.makeBox(this.offsetX+j*this.tile_width, this.offsetY+i*this.tile_height,this.tile_width, this.tile_height));

				var space = this.game.add.sprite(this.offsetX+j*this.tile_width,this.offsetY+i*this.tile_height, this.makeBox(this.tile_width, this.tile_height));
				space.j = j;
				space.i = i;
				space.inputEnabled = true;
				space.input.enableDrag(true);

        this.background.push(this.makeBox(this.offsetX+j*this.tile_width, this.offsetY+i*this.tile_height,this.tile_width, this.tile_height));
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

        //above
        if (this.piece_list[j+'_'+(i-1)] !== undefined) {
          sides.ts = this.piece_list[j+'_'+(i-1)].bottom_side * -1;
        }else {
          sides.ts = choice[rand(0,1)]; 
        }

        //left
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
				
        this.pieces.push(piece);
        this.piece_list[j+'_'+i] = piece;

      }
    }
};

Puzzle.prototype = Puzzle.prototype.constructor = Puzzle;

Puzzle.prototype = {
  makeBox: function(x,y) {
      var bmd = this.game.add.bitmapData(x, y);
      bmd.ctx.beginPath();
      bmd.ctx.rect(0, 0, x, y);
      bmd.ctx.fillStyle = '#dcdcdc';
			bmd.ctx.lineStyle = 4;
      bmd.ctx.strokeStyle = '#ff00ff';
      bmd.ctx.fill();
      return bmd;
    },
  // makeBox: function(x,y,width, height) {
	// 	var box = this.game.add.graphics(width, height);
	// 	//fill and linestyle
	// 	box.beginFill(0xFFFFFF);
	// 	box.lineStyle(2, 0xFF00FF, 1);
	// 	box.drawRect(x-(width), y-(height), width, height);
  //
	// 	return box;
  // }
};
