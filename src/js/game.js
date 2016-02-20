/*global Game*/

// var game = new Phaser.Game(Game.w, Game.h, Phaser.AUTO, 'game');
var game = new Phaser.Game(Game.w, Game.h, Phaser.CANVAS, 'game');


game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Menu', Game.Menu);
game.state.add('Gallery', Game.Gallery);
game.state.add('Play', Game.Play);

game.state.start('Boot');
