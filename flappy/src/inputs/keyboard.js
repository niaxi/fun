namespace('flappy.inputs');


flappy.inputs.keyboard = function(game) {

  var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  var escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
  
  function spaceKeyDown(cb, ctx) {
    return spaceKey.onDown.add(cb, ctx);
  }

  function escKeyDown(cb, ctx) {
    return escKey.onDown.add(cb, ctx);
  }

  return {
    spaceKeyDown: spaceKeyDown,
    escKeyDown: escKeyDown
  };
};