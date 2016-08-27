namespace('flappy.graphics');


flappy.graphics.textureFactory = (function() {
  // imports
  var graphicsBuilderFactory = flappy.graphics.graphicsBuilderFactory;


  function makeOverlayTexture(gfx, parent) {
    return gfx
      .clear()
      .padding(0)
      .fill(0x000000, 0.5)
      .rect(0, 0, parent.width, parent.height)
      .toTexture();
  }

  function makeBackgroundTexture(gfx) {
    return gfx
      .clear() 
      .padding(0)
      .lineStyle(1, 0x999999)
      .fill(0x000000, 0.5)
      .rect(0, 0, 280, 320)
      .toTexture();
  }

  function addOverlay(game, x, y, parent) {
    var gfx = graphicsBuilderFactory(game);
    var sprite = game.add.sprite(x, y, makeOverlayTexture(gfx, parent));
    gfx.destroy();
    return sprite;
  }

  function addBackground(game, x, y) {
    var gfx = graphicsBuilderFactory(game);
    var sprite = game.add.sprite(x, y, makeBackgroundTexture(gfx));
    gfx.destroy();
    return sprite;
  }


  // exports 
  return {
    makeOverlayTexture: makeOverlayTexture,
    makeBackgroundTexture: makeBackgroundTexture,
    addOverlay: addOverlay,
    addBackground: addBackground
  };
})();