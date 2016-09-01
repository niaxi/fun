namespace('flappy.objects');


flappy.objects.GameOverMenu = (function() {
  // imports
  var textureFactory = flappy.graphics.textureFactory;
  var buttonFactory = flappy.graphics.buttonFactory;


  function GameOverMenu(game, store) {
    Phaser.Group.call(this, game);
    this.store = store;

    // this.add(textureFactory.addOverlay(game, 0, 0, store.env));
    this.add(textureFactory.addBackground(game, 60, 70));

    this.playAgainButton = buttonFactory.add(game, 130, 280, "↺  Play Again");
    this.add(this.playAgainButton);
    this.quitButton = buttonFactory.add(game, 270, 280, "×  Quit");
    this.add(this.quitButton);

    this.titleText =  game.add.text(80, 120, "Game Over",
      { font: '40px Arial', fill: '#ffffff' });
    this.add(this.titleText);
  }

  GameOverMenu.prototype = Object.create(Phaser.Group.prototype);
  GameOverMenu.prototype.constructor = GameOverMenu;

  GameOverMenu.prototype.update = function() {
    // this.scoreText.text = this.store.score;
  };


  // exports 
  return GameOverMenu;
})();