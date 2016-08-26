namespace('flappy.factories');


flappy.factories.textureMaker = (function() {

  function graphicsBuilder(game, graphics) {

    return {
      clear: function() {
        graphics.clear();
        return this;
      },

      padding: function(value) {
        graphics.boundsPadding = value;
        return this;
      },
      
      lineStyle: function(width, color, alpha) {
        graphics.lineStyle(width, color, alpha);
        return this;
      },
      
      fill: function(color, alpha) {
        graphics.beginFill(color, alpha);
        return this;
      },
      
      circle: function(x, y, diameter) {
        graphics.drawCircle(x, y, diameter);
        return this;
      },
      
      rect: function(x, y, width, height) {
        graphics.drawRect(x, y, width, height);
        return this;
      },
      
      rrect: function(x, y, width, height, radius) {
        graphics.drawRoundedRect(x, y, width, height, radius);
        return this;
      },
      
      square: function(x, y, width) {
        return rect(x, y, width, width);
      },

      draw: function(name, data) {
        var name = name || 'bob';
        var data = data || [
          ' 333 ',
          ' 777 ',
          'E333E',
          ' 333 ',
          ' 3 3 '];

        return game.create.texture(name, data);
      },
      
      toTexture: function() {
        return graphics.generateTexture();
      },

      toSprite: function(x, y) {
        return game.make.sprite(this.toTexture());
      },

      destroy: function() {
        graphics.destroy();
      }
    };
  }


  function quickBuilder(game) {
    var graphics = new Phaser.Graphics(game, 0, 0);
    return graphicsBuilder(game, graphics);
  }


  function makeSquare() {
    var graphics = new Phaser.Graphics(game, 0, 0);
    graphics.boundsPadding = 0;
    graphics.lineStyle(3, 0x000000);
    graphics.beginFill(0xD2BE27, 1);
    // graphics.drawCircle(0, 0, 80);
    graphics.drawRect(60, 70, 47, 47);
    var sprite = game.add.sprite(60, 80, graphics.generateTexture());
    // game.physics.arcade.enable(sprite);
    graphics.destroy();
  }
  

  // exports 
  return {
    graphicsBuilder: graphicsBuilder,
    quickBuilder: quickBuilder
  };
})();