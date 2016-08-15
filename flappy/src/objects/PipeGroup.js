namespace('flappy.objects');


flappy.objects.PipeGroup = (function() {
  // imports
  var Pipe = flappy.objects.Pipe;


  function PipeGroup(game, parent) {
    Phaser.Group.call(this, game, parent);    
    var hole = Math.floor(Math.random() * 5) + 1;

    this.hasBeenCleared = false;

    for (var i=0; i<8; i++) {
      if (i != hole && i != hole + 1) {
        this.add(new Pipe(this.game, 400, i * 60 + 35));
      }
    }
    this.setAll('body.velocity.x', -200);
  }

  PipeGroup.prototype = Object.create(Phaser.Group.prototype);
  PipeGroup.prototype.constructor = PipeGroup;

  
  PipeGroup.prototype.update = function() {
    if (!this.exists) {
      return;
    }
    this.callAll('update');
    this.checkWorldBounds(); 
  };

  PipeGroup.prototype.checkWorldBounds = function() {
    if(this.exists && !this.getAt(0).inWorld) {
      this.setAll('body.velocity.x', 0);
      this.exists = false;  
    }
  };

  PipeGroup.prototype.reset = function(x, y) {
    var child;
    for (var i=0; i<this.children.length; i++) {
       child = this.getAt(i);
       child.reset(x, child.y);
    }
    this.setAll('body.velocity.x', -200);
    this.hasBeenCleared = false;
    this.exists = true;
  };
  
  PipeGroup.prototype.stop = function() {
    this.setAll('body.velocity.x', 0);
  };
  

  // exports 
  return PipeGroup;
})();