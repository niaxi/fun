namespace('flappy.objects');


flappy.objects.Bird = (function() {

  function Bird(game, x, y) {
    this.enabled = true;
    this.originalX = x;
    this.originalY = y;
    Phaser.Sprite.call(this, game, x, y, 'bird');
    this.anchor.setTo(-0.2, 0.5);
    
    this.game.physics.arcade.enable(this);
    this.game.add.existing(this);
  }

  Bird.prototype = Object.create(Phaser.Sprite.prototype);
  Bird.prototype.constructor = Bird;

  Bird.prototype.update = function() {
    if (!this.enabled) {
      return;
    }
    if (this.angle < 20) {
      this.angle += 1;
    }
  }

  Bird.prototype.reset = function() {
    Phaser.Sprite.prototype.reset.call(this, this.originalX, this.originalY);
  }

  Bird.prototype.jump = function() {
    if (!this.enabled) {
      return;
    }
    if (this.game) {
      this.game.add.tween(this).to({angle:-20}, 100).start();
    } else {
      console.log(this);
    }
    if (this.body) {
      this.body.velocity.y = -350;
    } else {
      console.log(this);
    }
  }

  Bird.prototype.disable = function() {
    this.enabled = false;
  }

  Bird.prototype.enable = function() {
    this.enabled = true;
  }
  

  // exports 
  return Bird;
})();