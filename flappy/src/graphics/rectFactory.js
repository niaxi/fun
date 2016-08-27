namespace('flappy.graphics');


flappy.graphics.rectFactory = (function() {
  // imports
  var graphicsBuilderFactory = flappy.graphics.graphicsBuilderFactory;


  function makeRoundedRectTexture(gfx, opts) {
    var x = opts && opts.x || 0;
    var y = opts && opts.y || 0;
    var width = opts && opts.width || 120;
    var height = opts && opts.height || 40;
    var radius = opts && opts.radius || 10;

    return gfx
      .clear() 
      .padding(0)
      .lineStyle(1, 0xFFB3A)
      .fill(0x1B4067, 1)
      .rrect(x, y, width, height, radius)
      .toTexture();
  }

  function generateSpriteIfNoneProvided(game, key, graphicsOpts) {
    var gfx;
    if (key) {
      return key;
    }
    
    gfx = graphicsBuilderFactory(game);
    key = makeRoundedRectTexture(gfx, graphicsOpts)
    gfx.destroy();
    return key
  }

  function makeRoundedRect(game, x, y, graphicsOpts, key) {
    key = generateSpriteIfNoneProvided(game, key, graphicsOpts);
    return game.make.sprite(x, y, key);
  }

  function addRoundedRect(game, x, y, graphicsOpts, key) {
    var bar = makeRoundedRect(game, x, y, graphicsOpts, key);
    return game.add.existing(bar);
  }


  // exports 
  return {
    makeRoundedRectTexture: makeRoundedRectTexture,
    generateSpriteIfNoneProvided: generateSpriteIfNoneProvided,
    make: makeRoundedRect,
    add: addRoundedRect
  };
})();