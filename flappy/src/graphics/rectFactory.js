namespace('flappy.graphics');


flappy.graphics.rectFactory = (function() {
  // imports
  var graphicsBuilderFactory = flappy.graphics.graphicsBuilderFactory;


  var textureDefaults = {
    x: 0,
    y: 0,
    width: 120,
    height: 40,
    radius: 10,
    line: {
      width: 1,
      color: 0xFFB3A,
      alpha: 1
    },
    fill: {
      color: 0x1B4067,
      alpha: 1
    },
    padding: 0
  }

  function makeRoundedRectTexture(gfx, options) {
    var opts = Object.assign({}, textureDefaults, options);
    var line = opts.line;
    var fill = opts.fill;

    return gfx
      .clear() 
      .padding(opts.padding)
      .lineStyle(line.width, line.color, line.alpha)
      .fill(fill.color, fill.alpha)
      .rrect(opts.x, opts.y, opts.width, opts.height, opts.radius)
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