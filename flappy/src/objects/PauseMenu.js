namespace('flappy.objects');


flappy.objects.PauseMenu = (function() {
  // imports
  var textureFactory = flappy.graphics.textureFactory;
  var buttonFactory = flappy.graphics.buttonFactory;


  function PauseMenu(game, store) {
    Phaser.Group.call(this, game);
    this.store = store;

    this.add(textureFactory.addOverlay(game, 0, 0, store.env));
    this.add(textureFactory.addBackground(game, 60, 70));

    this.resumeButton = buttonFactory.add(game, 130, 280, "▶  Resume");
    this.resumeButton.inputEnabled = true;
    this.add(this.resumeButton);
    this.restartButton = buttonFactory.add(game, 270, 280, "↺  Restart");
    this.add(this.restartButton);
    this.quitButton = buttonFactory.add(game, 200, 340, "×  Quit");
    this.add(this.quitButton);

    this.titleText =  game.add.text(80, 120, "Paused",
      { font: '70px Arial', fill: '#ffffff' });
    this.add(this.titleText);
  }

  PauseMenu.prototype = Object.create(Phaser.Group.prototype);
  PauseMenu.prototype.constructor = PauseMenu;

  PauseMenu.prototype.update = function() {
    // this.scoreText.text = this.store.score;
  };


  // exports 
  return PauseMenu;
})();