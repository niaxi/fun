namespace('flappy');


flappy.events = function(game) {

  function whenHit(a, b, cb, ctx) {
    return game.physics.arcade.overlap(
      a, b, cb, null, ctx);
  }

  // exports
  return {
    whenHit: whenHit
  };
};