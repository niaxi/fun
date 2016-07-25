namespace('flappy.level1');


flappy.level1.scene = function(game, options) {
  options = options || {
    backgroundColor: '#71c5cf',
    score: 0
  };

  var score = game.add.text(20, 20, options.score,
      { font: '30px Arial', fill: '#ffffff' });

  var bird = game.add.sprite(100, 245, 'bird');
  bird.anchor.setTo(-0.2, 0.5);

  var pipes = game.add.group();


  game.stage.backgroundColor = options.backgroundColor;
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(bird);


  function createPipe(x, y) {
    var pipe = game.add.sprite(x, y, 'pipe');
    game.physics.arcade.enable(pipe);
    
    // velocity to make pipe move left
    pipe.body.velocity.x = -200;
    
    // auto kill pipe when no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
    
    return pipe;
  }

  function spawnRowOfPipes() {
    var hole = Math.floor(Math.random() * 5) + 1;
    
    for (var i=0; i<8; i++) {
      if (i != hole && i != hole + 1) {
        pipes.add(createPipe(400, i * 60 + 10));
      }
    }
  }


  // exports
  return {
    score: score,
    bird: bird,
    pipes: pipes,
    spawnRowOfPipes: spawnRowOfPipes
  };
};