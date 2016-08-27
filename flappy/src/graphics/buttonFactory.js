namespace('flappy.graphics');


flappy.graphics.buttonFactory = (function() {
  // imports
  var Button = flappy.graphics.Button; 
  var graphicsBuilderFactory = flappy.graphics.graphicsBuilderFactory;
  var rectFactory = flappy.graphics.rectFactory;


  function makeButton(game, x, y, label, graphicsOpts, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
    key = rectFactory.generateSpriteIfNoneProvided(game, key, graphicsOpts);
    return new Button(game, x, y, label, key);
  }

  function addButton(game, x, y, label, graphicsOpts, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
    var button = makeButton(game, x, y, label, graphicsOpts, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
    return game.add.existing(button);
  }


  // exports 
  return {
    make: makeButton,
    add: addButton
  };
})();