namespace('flappy.objects');


flappy.objects.bird = function(game, sprite) {
  // imports
  var moveY = flappy.commands.moveY;
  var applyGravity = flappy.commands.applyGravity;


  function jump() {
    game.add.tween(sprite).to({angle:-20}, 100).start();
    return moveY(sprite, -350);
  }

  function fall() {
    applyGravity(sprite, 1000);
  }


  // exports 
  return {
    sprite: sprite,
    jump: jump,
    fall: fall
  };
};