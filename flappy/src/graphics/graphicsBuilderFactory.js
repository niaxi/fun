namespace('flappy.graphics');


flappy.graphics.graphicsBuilderFactory = (function() {
  // imports
  var graphicsBuilder = flappy.graphics.graphicsBuilder;


  function graphicsBuilderFactory(game) {
    var graphics = new Phaser.Graphics(game, 0, 0);
    return graphicsBuilder(game, graphics);
  }
  

  // exports
  return graphicsBuilderFactory;
})();