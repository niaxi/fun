namespace('flappy.objects');


flappy.objects.Hud = (function() {
  // imports
  var updateText = flappy.commands.updateText;


  function Hud(game, store) {
    Phaser.Group.call(this, game);
    this.store = store;
    this.scoreText = game.add.text(20, 20, store.score,
      { font: '30px Arial', fill: '#ffffff' });
    this.add(this.scoreText);
  }

  Hud.prototype = Object.create(Phaser.Group.prototype);
  Hud.prototype.constructor = Hud;

  Hud.prototype.update = function() {
    this.scoreText.text = this.store.score;
  };


  // exports 
  return Hud;
})();