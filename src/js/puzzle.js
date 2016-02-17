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
        this.background.push(this.makeBox(this.offsetX+j*this.tile_width, this.offsetY+i*this.tile_height,this.tile_width, this.tile_height));
			}
		}

    //Draw Pieces except the top-left corner
    for (var i = 0; i < this.square;i++) {
      for (var j = 0; j < this.square;j++) {
        var piece = new PuzzlePiece(this.game, this.offsetX+j*this.tile_width, this.offsetY+i*this.tile_height, j, i, this.tile_width, this.tile_height,pic);
        this.pieces.push(piece);
      }
    }
};

Puzzle.prototype = Puzzle.prototype.constructor = Puzzle;
Puzzle.prototype = {
  makeBox: function(x,y,width, height) {
		var box = this.game.add.graphics(width, height);
		//fill and linestyle
		box.beginFill(0xFFFFFF);
		box.lineStyle(2, 0xFF00FF, 1);
		box.drawRect(x-(width), y-(height), width, height);

		return box;
  }
};
