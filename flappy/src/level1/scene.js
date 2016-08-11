namespace('flappy.level1');


flappy.level1.scene = function(game, options) {
  options = options || {
    backgroundColor: '#71c5cf',
    score: 0
  };

  var pipes = game.add.group();

  game.stage.backgroundColor = options.backgroundColor;
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 1200;


  // exports
  return {};
};