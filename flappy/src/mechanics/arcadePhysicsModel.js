namespace('flappy.mechanics');


flappy.mechanics.arcadePhysicsModel = function(game) {

  function start(value) {
    game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  function gravity(value) {
    game.physics.arcade.gravity.y = value;
  }

  function enable(sprites) {
    if (!sprites) {
      return;
    }
    if (sprites.constructor === Array) {
      for (var i=0; i<sprites.length; i++) {
        game.physics.arcade.enable(sprites[i]);
      }
    } else {
      game.physics.arcade.enable(sprites);
    }
  }

  // exports
  return {
    start: start,
    enable: enable,
    gravity: gravity
  };
};