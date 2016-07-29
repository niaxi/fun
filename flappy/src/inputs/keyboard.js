namespace('flappy.inputs');


flappy.inputs.keyboard = function(game) {

  var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  var escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
  var fluentApi = {
    spaceKeyDown: spaceKeyDown,
    escKeyDown: escKeyDown
  };
  
  function spaceKeyDown(cb, ctx) {
    spaceKey.onDown.add(cb, ctx);
    return fluentApi;
  }

  function escKeyDown(cb, ctx) {
    escKey.onDown.add(cb, ctx);
    return fluentApi;    
  }

  return fluentApi;
};