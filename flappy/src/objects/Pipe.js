namespace('flappy.objects');


flappy.objects.Pipe = (function() {

  function Pipe(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'pipe');
    this.anchor.setTo(0.5, 0.5);
    
    this.game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;

    this.game.add.existing(this);
  }

  Pipe.prototype = Object.create(Phaser.Sprite.prototype);
  Pipe.prototype.constructor = Pipe;


  // exports 
  return Pipe;
})();