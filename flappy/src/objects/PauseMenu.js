namespace('flappy.objects');


flappy.objects.PauseMenu = (function() {
  // imports
  var textureMaker = flappy.factories.textureMaker;


  function PauseMenu(game, store, env) {
    Phaser.Group.call(this, game);
    this.store = store;
    var graphics = textureMaker.quickBuilder(game);

    this.add(game.add.sprite(0, 0, makeOverlayTexture(graphics, env)));
    this.add(game.add.sprite(60, 70, makeBackgroundTexture(graphics)));

    this.resumeButton = game.add.existing(new GraphicsButton(game, 140, 280, null, "▶  Resume", cb, this));
    this.resumeButton.inputEnabled = true;
    this.add(this.resumeButton);
    this.restartButton = game.add.existing(new GraphicsButton(game, 260, 280, null, "↺  Restart"));
    this.add(this.restartButton);
    this.quitButton = game.add.existing(new GraphicsButton(game, 200, 340, null, "×  Quit"));
    this.add(this.quitButton);

    graphics.destroy();

    this.pauseText =  game.add.text(80, 120, "Paused",
      { font: '70px Arial', fill: '#ffffff' });
    this.add(this.pauseText);
  }

  function cb() {
    console.log('resume');
  }

  PauseMenu.prototype = Object.create(Phaser.Group.prototype);
  PauseMenu.prototype.constructor = PauseMenu;

  PauseMenu.prototype.update = function() {
    // this.scoreText.text = this.store.score;
  };


  function makeOverlayTexture(graphics, parent) {
    return graphics
      .clear()
      .padding(0)
      .fill(0x000000, 0.5)
      .rect(0, 0, parent.width, parent.height)
      .toTexture();
  }

  function makeBackgroundTexture(graphics) {
    return graphics
      .clear() 
      .padding(0)
      .lineStyle(1, 0x999999)
      .fill(0x000000, 0.5)
      .rect(0, 0, 280, 320)
      .toTexture();
  }

  function makeButtonTexture(graphics) {
    return graphics
      .clear() 
      .padding(0)
      .lineStyle(1, 0xFFB3A)
      .fill(0x1B4067, 1)
      .rrect(0, 0, 100, 40, 10)
      .toTexture();
  }


  function GraphicsButton(game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
    var graphics;
    if (!key) {
      graphics = textureMaker.quickBuilder(game);
      key = makeButtonTexture(graphics)
      graphics.destroy();
    }
    Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
    this.anchor.setTo( 0.5, 0.5 );
    this.label = new Phaser.Text(game, 0, 0, label, { font: '16px Arial', fill: '#ffffff' });
    this.label.anchor.setTo( 0.5, 0.4 );
    this.addChild(this.label);    
    // this.setLabel( label );
  }
  GraphicsButton.prototype = Object.create(Phaser.Button.prototype);
  GraphicsButton.prototype.constructor = GraphicsButton;

  // exports 
  return PauseMenu;
})();