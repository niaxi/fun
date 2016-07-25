namespace('flappy.inputs');


flappy.inputs.touch = function(game) {
  
  function tap(cb, ctx) {
    return game.input.onTap.add(cb, ctx);
  }

  return {
    tap: tap
  };
};