namespace('flappy.objects');


flappy.objects.Bird = (function() {

  function Bird(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'bird');
    this.anchor.setTo(-0.2, 0.5);
    
    this.game.physics.arcade.enable(this);
    this.game.add.existing(this);
  }

  Bird.prototype = Object.create(Phaser.Sprite.prototype);
  Bird.prototype.constructor = Bird;

  Bird.prototype.update = function() {
    if (this.angle < 20) {
      this.angle += 1;
    }
  }

  Bird.prototype.jump = function() {
    this.game.add.tween(this).to({angle:-20}, 100).start();
    return this.body.velocity.y = -350;
  }


  // exports 
  return Bird;
})();